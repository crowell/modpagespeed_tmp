/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Author: sligocki@google.com (Shawn Ligocki)

#include "net/instaweb/http/public/cache_url_async_fetcher.h"

#include <cstddef>

#include "net/instaweb/http/public/async_fetch.h"
#include "net/instaweb/http/public/content_type.h"
#include "net/instaweb/http/public/counting_url_async_fetcher.h"
#include "net/instaweb/http/public/fake_url_async_fetcher.h"
#include "net/instaweb/http/public/http_cache.h"
#include "net/instaweb/http/public/http_value.h"
#include "net/instaweb/http/public/log_record.h"
#include "net/instaweb/http/public/logging_proto_impl.h"
#include "net/instaweb/http/public/meta_data.h"
#include "net/instaweb/http/public/mock_url_fetcher.h"
#include "net/instaweb/http/public/request_context.h"
#include "net/instaweb/http/public/request_headers.h"
#include "net/instaweb/http/public/response_headers.h"
#include "net/instaweb/util/public/abstract_mutex.h"  // for ScopedMutex
#include "net/instaweb/util/public/gtest.h"
#include "net/instaweb/util/public/lru_cache.h"
#include "net/instaweb/util/public/mock_hasher.h"
#include "net/instaweb/util/public/mock_timer.h"
#include "net/instaweb/util/public/null_message_handler.h"
#include "net/instaweb/util/public/scoped_ptr.h"
#include "net/instaweb/util/public/simple_stats.h"
#include "net/instaweb/util/public/statistics.h"
#include "net/instaweb/util/public/string_util.h"
#include "net/instaweb/util/public/thread_system.h"
#include "net/instaweb/util/public/timer.h"

namespace net_instaweb {

namespace {

class MockFetch : public AsyncFetch {
 public:
  MockFetch(ThreadSystem* threads,
            GoogleString* content,
            bool* done,
            bool* success,
            bool* is_origin_cacheable)
      : AsyncFetch(RequestContext::NewTestRequestContext(threads)),
        content_(content),
        done_(done),
        success_(success),
        is_origin_cacheable_(is_origin_cacheable),
        cache_result_valid_(true) {
  }

  virtual ~MockFetch() {}

  virtual void HandleHeadersComplete() {
    // Make sure that we've called response_headers()->ComputeCaching() before
    // this and that this call succeeds.
    response_headers()->IsCacheable();
  }

  virtual bool HandleWrite(const StringPiece& content,
                           MessageHandler* handler) {
    content.AppendToString(content_);
    return true;
  }
  virtual bool HandleFlush(MessageHandler* handler) {
    return true;
  }

  // Fetch complete.
  virtual void HandleDone(bool success) {
    {
      ScopedMutex lock(log_record()->mutex());
      *is_origin_cacheable_ = log_record()->logging_info()->
          is_original_resource_cacheable();
      *success_ = success;
      *done_ = true;
    }
    delete this;
  }

  virtual bool IsCachedResultValid(const ResponseHeaders& headers) {
    // We simply override AsyncFetch and stub this.
    return cache_result_valid_;
  }

  void set_cache_result_valid(bool cache_result_valid) {
    cache_result_valid_ = cache_result_valid;
  }

 private:
  GoogleString* content_;
  bool* done_;
  bool* success_;
  bool* is_origin_cacheable_;
  bool cache_result_valid_;

  DISALLOW_COPY_AND_ASSIGN(MockFetch);
};

class CacheUrlAsyncFetcherTest : public ::testing::Test {
 protected:
  // Helper class for calling Get and Query methods on cache implementations
  // that are blocking in nature (e.g. in-memory LRU or blocking file-system).
  class Callback : public HTTPCache::Callback {
   public:
    Callback() : HTTPCache::Callback(RequestContextPtr(NULL)) { Reset(); }
    Callback* Reset() {
      called_ = false;
      result_ = HTTPCache::kNotFound;
      cache_valid_ = true;
      fresh_ = true;
      return this;
    }
    virtual void Done(HTTPCache::FindResult result) {
      called_ = true;
      result_ = result;
    }
    virtual bool IsCacheValid(const GoogleString& key,
                              const ResponseHeaders& headers) {
      // For unit testing, we are simply stubbing IsCacheValid.
      return cache_valid_;
    }
    virtual bool IsFresh(const ResponseHeaders& headers) {
      // For unit testing, we are simply stubbing IsFresh.
      return fresh_;
    }
    bool called_;
    HTTPCache::FindResult result_;
    bool cache_valid_;
    bool fresh_;
  };

  CacheUrlAsyncFetcherTest()
      : mock_async_fetcher_(&mock_fetcher_),
        counting_fetcher_(&mock_async_fetcher_),
        lru_cache_(1000),
        timer_(MockTimer::kApr_5_2010_ms),
        cache_url_("http://www.example.com/cacheable.html"),
        cache_https_html_url_("https://www.example.com/cacheable.html"),
        cache_https_css_url_("https://www.example.com/cacheable.css"),
        nocache_url_("http://www.example.com/non-cacheable.jpg"),
        bad_url_("http://www.example.com/bad.url"),
        etag_url_("http://www.example.com/etag.jpg"),
        last_modified_url_("http://www.example.com/not_modified.jpg"),
        etag_and_last_modified_url_("http://www.example.com/double.jpg"),
        conditional_last_modified_url_(
            "http://www.example.com/cond_not_modified.jpg"),
        conditional_etag_url_("http://www.example.com/cond_etag.jpg"),
        implicit_cache_url_("http://www.example.com/implicit_cache.jpg"),
        vary_url_("http://www.example.com/vary"),
        cache_body_("good"), nocache_body_("bad"), bad_body_("ugly"),
        vary_body_("vary"),
        etag_("123456790ABCDEF"),
        ttl_ms_(Timer::kHourMs),
        implicit_cache_ttl_ms_(500 * Timer::kSecondMs),
        cache_result_valid_(true),
        thread_system_(ThreadSystem::CreateThreadSystem()) {
    HTTPCache::InitStats(&statistics_);
    http_cache_.reset(new HTTPCache(&lru_cache_, &timer_, &mock_hasher_,
                                    &statistics_));
    cache_fetcher_.reset(
        new CacheUrlAsyncFetcher(http_cache_.get(), &counting_fetcher_));
    // Enable serving of stale content if the fetch fails.
    cache_fetcher_->set_serve_stale_if_fetch_error(true);

    Variable* fallback_responses_served = statistics_.AddVariable(
        "fallback_responses_served");
    cache_fetcher_->set_fallback_responses_served(fallback_responses_served);

    Variable* num_conditional_refreshes = statistics_.AddVariable(
        "num_conditional_refreshes");
    cache_fetcher_->set_num_conditional_refreshes(num_conditional_refreshes);

    int64 now_ms = timer_.NowMs();

    // Set fetcher result and headers.
    ResponseHeaders cache_headers;
    SetDefaultHeaders(kContentTypeHtml, &cache_headers);
    cache_headers.SetDateAndCaching(now_ms, ttl_ms_);
    mock_fetcher_.SetResponse(cache_url_, cache_headers, cache_body_);
    mock_fetcher_.SetResponse(cache_https_html_url_, cache_headers,
                              cache_body_);
    cache_headers.Replace(HttpAttributes::kContentType,
                          kContentTypeCss.mime_type());
    mock_fetcher_.SetResponse(cache_https_css_url_, cache_headers,
                              cache_body_);

    ResponseHeaders nocache_headers;
    SetDefaultHeaders(kContentTypeJpeg, &nocache_headers);
    nocache_headers.SetDate(now_ms);
    nocache_headers.Replace(HttpAttributes::kCacheControl, "no-cache");
    mock_fetcher_.SetResponse(nocache_url_, nocache_headers, nocache_body_);

    ResponseHeaders bad_headers;
    bad_headers.set_first_line(1, 1, 404, "Not Found");
    bad_headers.SetDate(now_ms);
    mock_fetcher_.SetResponse(bad_url_, bad_headers, bad_body_);

    ResponseHeaders etag_headers;
    etag_headers.CopyFrom(cache_headers);
    etag_headers.Add(HttpAttributes::kEtag, etag_);
    mock_fetcher_.SetResponse(etag_url_, etag_headers, cache_body_);

    ResponseHeaders last_modified_headers;
    last_modified_headers.CopyFrom(cache_headers);
    last_modified_headers.SetLastModified(
        MockTimer::kApr_5_2010_ms - 2 * Timer::kDayMs);
    mock_fetcher_.SetResponse(last_modified_url_, last_modified_headers,
                              cache_body_);

    ResponseHeaders etag_and_last_modified_headers;
    etag_and_last_modified_headers.CopyFrom(last_modified_headers);
    etag_and_last_modified_headers.Add(HttpAttributes::kEtag, etag_);
    mock_fetcher_.SetResponse(etag_and_last_modified_url_,
        etag_and_last_modified_headers, cache_body_);

    mock_fetcher_.SetConditionalResponse(conditional_last_modified_url_,
        MockTimer::kApr_5_2010_ms - 2 * Timer::kDayMs, "",
        last_modified_headers, cache_body_);

    mock_fetcher_.SetConditionalResponse(conditional_etag_url_,
        -1 , etag_, etag_headers, cache_body_);

    ResponseHeaders implicit_cache_headers;
    SetDefaultHeaders(kContentTypeJpeg, &implicit_cache_headers);
    implicit_cache_headers.SetDate(now_ms);
    implicit_cache_headers.Add(HttpAttributes::kEtag, etag_);
    mock_fetcher_.SetConditionalResponse(implicit_cache_url_, -1, etag_,
                                         implicit_cache_headers, cache_body_);

    mutable_vary_headers_.SetDateAndCaching(now_ms, ttl_ms_);
    mutable_vary_headers_.SetStatusAndReason(HttpStatus::kOK);
    mutable_vary_headers_.Add(HttpAttributes::kContentType,
                              kContentTypePng.mime_type());
    mock_fetcher_.SetResponse(vary_url_, mutable_vary_headers_, vary_body_);
  }

  HTTPCache::FindResult FindWithCallback(
      const GoogleString& key, HTTPValue* value, ResponseHeaders* headers,
      MessageHandler* handler, Callback* callback) {
    http_cache_->Find(key, handler, callback);
    EXPECT_TRUE(callback->called_);
    if (callback->result_ == HTTPCache::kFound) {
      value->Link(callback->http_value());
    }
    headers->CopyFrom(*callback->response_headers());
    return callback->result_;
  }

  HTTPCache::FindResult Find(const GoogleString& key, HTTPValue* value,
                             ResponseHeaders* headers,
                             MessageHandler* handler) {
    Callback callback;
    return FindWithCallback(key, value, headers, handler, &callback);
  }

  HTTPCache::FindResult Find(const GoogleString& key, HTTPValue* value,
                             ResponseHeaders* headers,
                             MessageHandler* handler, bool cache_valid) {
    Callback callback;
    callback.cache_valid_ = cache_valid;
    return FindWithCallback(key, value, headers, handler, &callback);
  }

  enum FetchType {
    kBackendFetch = 0,
    kFallbackFetch = 1,
  };

  void SetDefaultHeaders(const ContentType& content_type,
                         ResponseHeaders* header) const {
    header->set_major_version(1);
    header->set_minor_version(1);
    header->SetStatusAndReason(HttpStatus::kOK);

    header->Replace(HttpAttributes::kContentType, content_type.mime_type());
  }

  // cache_result_valid_ == false implies that MockFetch will return false for
  // IsCachedResultValid and thus the cache is invalidated.
  void FetchAndValidate(const StringPiece& url,
                        const RequestHeaders& request_headers,
                        bool success,
                        HttpStatus::Code code,
                        const StringPiece& expected_response,
                        FetchType fetch_type,
                        bool is_original_resource_cacheable) {
    GoogleString fetch_content;
    bool fetch_done = false;
    bool fetch_success = false;
    bool is_cacheable = false;
    ResponseHeaders fetch_response_headers;
    fetch_response_headers.set_implicit_cache_ttl_ms(implicit_cache_ttl_ms_);
    MockFetch* fetch = new MockFetch(
        thread_system_.get(), &fetch_content, &fetch_done, &fetch_success,
        &is_cacheable);
    fetch->set_cache_result_valid(cache_result_valid_);
    fetch->request_headers()->CopyFrom(request_headers);
    fetch->set_response_headers(&fetch_response_headers);
    // TODO(sligocki): Make Fetch take a StringPiece.
    cache_fetcher_->Fetch(url.as_string(), &handler_, fetch);
    // Implementation with LRUCache and FakeUrlAsyncFetcher should
    // call callbacks synchronously.
    EXPECT_TRUE(fetch_done);
    EXPECT_EQ(success, fetch_success);
    if (success) {
      EXPECT_TRUE(fetch_response_headers.has_status_code());
      EXPECT_EQ(code, fetch_response_headers.status_code());
      EXPECT_EQ(implicit_cache_ttl_ms_,
                fetch_response_headers.implicit_cache_ttl_ms());
    }
    EXPECT_EQ(is_original_resource_cacheable, is_cacheable) << url;
    if (fetch_type == kFallbackFetch) {
      EXPECT_STREQ(
          FallbackSharedAsyncFetch::kStaleWarningHeaderValue,
          fetch_response_headers.Lookup1(HttpAttributes::kWarning));
    }
    // TODO(sligocki): Move this out of this function and just check at caller.
    EXPECT_STREQ(expected_response, fetch_content);
  }

  void ClearStats() {
    statistics_.Clear();
    counting_fetcher_.Clear();
  }

  void ExpectNoCacheWithOriginalCacheable(
      const StringPiece& url, const StringPiece& expected_body) {
    RequestHeaders request_headers;
    ExpectNoCacheWithRequestHeadersAndIsOriginalCacheable(
        url, expected_body, request_headers, true, true);
  }

  void ExpectNoCache(const StringPiece& url, const StringPiece& expected_body) {
    RequestHeaders request_headers;
    ExpectNoCacheWithRequestHeadersAndIsOriginalCacheable(
        url, expected_body, request_headers, false, true);
  }


  void ExpectNoCacheWithRequestHeaders(const StringPiece& url,
                                       const StringPiece& expected_body,
                                       const RequestHeaders& request_headers) {
    ExpectNoCacheWithRequestHeadersAndIsOriginalCacheable(
        url, expected_body, request_headers, false, true);
  }

  void ExpectNoCacheWithRequestHeadersAndIsOriginalCacheable(
      const StringPiece& url,
      const StringPiece& expected_body,
      const RequestHeaders& request_headers,
      bool is_original_cacheable,
      bool is_servable_from_cache) {
    ClearStats();
    FetchAndValidate(url, request_headers, true, HttpStatus::kOK,
                     expected_body, kBackendFetch, is_original_cacheable);
    // First fetch misses initial cache lookup ...
    EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
    EXPECT_EQ(0, http_cache_->cache_hits()->Get());
    EXPECT_EQ(is_servable_from_cache ? 1 : 0,
              http_cache_->cache_misses()->Get());
    // ... succeeds at fetch ...
    EXPECT_EQ(1, counting_fetcher_.fetch_count());
    // ... but isn't inserted into the cache, because it's not cacheable.
    EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

    ClearStats();
    FetchAndValidate(url, request_headers, true, HttpStatus::kOK,
                     expected_body, kBackendFetch, is_original_cacheable);
    // We don't cache it because it has no Cache-Control header set, so the
    // same thing should happen as first fetch.
    EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
    EXPECT_EQ(0, http_cache_->cache_hits()->Get());
    EXPECT_EQ(is_servable_from_cache ? 1 : 0,
              http_cache_->cache_misses()->Get());
    EXPECT_EQ(1, counting_fetcher_.fetch_count());
    EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  }

  void ExpectNoCacheWithMethodAndIsServable(const StringPiece& url,
                                            const StringPiece& expected_body,
                                            RequestHeaders::Method method,
                                            bool servable_from_cache) {
    RequestHeaders request_header;
    request_header.set_method(method);
    ExpectNoCacheWithRequestHeadersAndIsOriginalCacheable(
        url, expected_body, request_header, false, servable_from_cache);
  }

  void ExpectNoCacheWithMethod(const StringPiece& url,
                               const StringPiece& expected_body,
                               RequestHeaders::Method method) {
    ExpectNoCacheWithMethodAndIsServable(url, expected_body, method, false);
  }

  void ExpectCache(const StringPiece& url, const StringPiece& expected_body) {
    RequestHeaders request_headers;
    ExpectCacheWithRequestHeaders(url, expected_body, request_headers);
  }

  void ExpectCacheWithRequestHeaders(const StringPiece& url,
                                     const StringPiece& expected_body,
                                     const RequestHeaders& request_headers) {
    ClearStats();
    FetchAndValidate(url, request_headers, true, HttpStatus::kOK,
                     expected_body, kBackendFetch, true);
    // First fetch misses initial cache lookup ...
    EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
    EXPECT_EQ(0, http_cache_->cache_hits()->Get());
    EXPECT_EQ(1, http_cache_->cache_misses()->Get());
    // ... succeeds at fetch ...
    EXPECT_EQ(1, counting_fetcher_.fetch_count());
    // ... and inserts result into cache.
    EXPECT_EQ(1, http_cache_->cache_inserts()->Get());

    ClearStats();
    FetchAndValidate(url, request_headers, true, HttpStatus::kOK,
                     expected_body, kBackendFetch, true);
    // So second fetch hits initial cache lookup ...
    EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
    EXPECT_EQ(1, http_cache_->cache_hits()->Get());
    EXPECT_EQ(0, http_cache_->cache_misses()->Get());
    // ... and no extra fetches or inserts
    EXPECT_EQ(0, counting_fetcher_.fetch_count());
    EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  }

  void ExpectServedFromCache(const StringPiece& url,
                            const StringPiece& expected_body) {
    RequestHeaders request_headers;
    ExpectServedFromCacheWithRequestHeaders(url, expected_body,
                                            request_headers);
  }

  void ExpectServedFromCacheWithRequestHeaders(
      const StringPiece& url,
      const StringPiece& expected_body,
      const RequestHeaders& request_headers) {
    ClearStats();
    FetchAndValidate(url, request_headers, true, HttpStatus::kOK,
                     expected_body, kBackendFetch, true);
    // First fetch hits the cache.
    EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
    EXPECT_EQ(1, http_cache_->cache_hits()->Get());
    EXPECT_EQ(0, http_cache_->cache_misses()->Get());
    // ... and no extra fetches or inserts
    EXPECT_EQ(0, counting_fetcher_.fetch_count());
    EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  }

  SimpleStats statistics_;

  MockUrlFetcher mock_fetcher_;
  FakeUrlAsyncFetcher mock_async_fetcher_;
  CountingUrlAsyncFetcher counting_fetcher_;

  LRUCache lru_cache_;
  MockTimer timer_;
  MockHasher mock_hasher_;
  scoped_ptr<HTTPCache> http_cache_;

  scoped_ptr<CacheUrlAsyncFetcher> cache_fetcher_;

  NullMessageHandler handler_;
  RequestHeaders empty_request_headers_;

  const GoogleString cache_url_;
  const GoogleString cache_https_html_url_;
  const GoogleString cache_https_css_url_;
  const GoogleString nocache_url_;
  const GoogleString bad_url_;
  const GoogleString etag_url_;
  const GoogleString last_modified_url_;
  const GoogleString etag_and_last_modified_url_;
  const GoogleString conditional_last_modified_url_;
  const GoogleString conditional_etag_url_;
  const GoogleString implicit_cache_url_;
  const GoogleString vary_url_;

  ResponseHeaders mutable_vary_headers_;

  const GoogleString cache_body_;
  const GoogleString nocache_body_;
  const GoogleString bad_body_;
  const GoogleString vary_body_;

  const GoogleString etag_;

  const int ttl_ms_;
  int64 implicit_cache_ttl_ms_;

  bool cache_result_valid_;

  scoped_ptr<ThreadSystem> thread_system_;
};

TEST_F(CacheUrlAsyncFetcherTest, CacheableUrl) {
  ClearStats();
  FetchAndValidate(cache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // First fetch misses initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  // ... and inserts result into cache.
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());

  ClearStats();
  FetchAndValidate(cache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // Second fetch hits initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  // ... and no extra fetches or inserts are needed.
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());

  // Induce a fetch failure so we are forced to serve stale data from the cache.
  mock_fetcher_.Disable();

  timer_.AdvanceMs(2 * ttl_ms_);
  ClearStats();
  FetchAndValidate(cache_url_, empty_request_headers_, false,
                   HttpStatus::kNotFound, "", kBackendFetch, false);
  // Cache entry is stale, so we must fetch again. However, the fetch fails.
  // Since the fetcher returns a 404 which is not a server error, we don't
  // return stale content.
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(1, counting_fetcher_.failure_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());

  // Re-enable the fetcher.
  mock_fetcher_.Enable();

  ClearStats();
  FetchAndValidate(cache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // Cache entry is stale, so we must fetch again. This time the fetch succeeds.
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());

  // Advance the time so that the response put into cache is now stale.
  timer_.AdvanceMs(2 * ttl_ms_);
  ClearStats();
  ResponseHeaders bad_headers;
  bad_headers.set_first_line(1, 1, 500, "Internal Server Error");
  bad_headers.SetDate(timer_.NowMs());
  mock_fetcher_.SetResponse(cache_url_, bad_headers, bad_body_);
  FetchAndValidate(cache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   cache_body_, kFallbackFetch, false);
  // Since a fallback is present in cache, we don't serve out the 500 and
  // instead serve out the stale response.
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(1, cache_fetcher_->fallback_responses_served()->Get());

  ClearStats();
  // Disable serving of stale content if the fetch fails.
  cache_fetcher_->set_serve_stale_if_fetch_error(false);
  FetchAndValidate(cache_url_, empty_request_headers_, true,
                   HttpStatus::kInternalServerError, bad_body_,
                   kBackendFetch, false);
  // Since serving of stale content is disabled, we serve out the 500 instead
  // of the fallback value.
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());

  // Enable serving of stale content if the fetch fails.
  cache_fetcher_->set_serve_stale_if_fetch_error(true);

  // Clear the LRU cache so that no fallback is available any more.
  lru_cache_.Clear();
  ClearStats();
  FetchAndValidate(cache_url_, empty_request_headers_, true,
                   HttpStatus::kInternalServerError, bad_body_,
                   kBackendFetch, false);
  // The fallback response is no longer available, hence we serve out the 500.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, CachingWithHttpsHtmlCachingEnabled) {
  // With caching of html on https enabled, both html and css hosted on https
  // get cached.
  ClearStats();
  ExpectCache(cache_https_html_url_, cache_body_);

  ClearStats();
  ExpectServedFromCache(cache_https_html_url_, cache_body_);

  ClearStats();
  ExpectCache(cache_https_css_url_, cache_body_);

  ClearStats();
  ExpectServedFromCache(cache_https_css_url_, cache_body_);
}


TEST_F(CacheUrlAsyncFetcherTest, CachingWithHttpsHtmlCachingDisabled) {
  // With caching of html on https enabled, html hosted on https does not get
  // cached, while css does get cached.
  http_cache_->set_disable_html_caching_on_https(true);
  ClearStats();
  ExpectNoCacheWithOriginalCacheable(cache_https_html_url_, cache_body_);

  ClearStats();
  ExpectCache(cache_https_css_url_, cache_body_);

  ClearStats();
  ExpectServedFromCache(cache_https_css_url_, cache_body_);
}

TEST_F(CacheUrlAsyncFetcherTest, CacheableUrlCacheInvalidation) {
  ClearStats();
  FetchAndValidate(cache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // First fetch misses initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  // ... and inserts result into cache.
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());

  ClearStats();
  FetchAndValidate(cache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // Second fetch hits initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  // ... and no extra fetches or inserts are needed.
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  ClearStats();
  // Invalidate cache and fetch.
  cache_result_valid_ = false;
  FetchAndValidate(cache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // Cache entry is invalid, so we must fetch again.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, NonCacheableUrl) {
  ClearStats();
  FetchAndValidate(nocache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   nocache_body_, kBackendFetch, false);
  // First fetch misses initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  // ... and we don't insert into cache because it's not cacheable.
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  // Same thing happens second time.
  ClearStats();
  FetchAndValidate(nocache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   nocache_body_, kBackendFetch, false);
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, CheckEtags) {
  RequestHeaders request_headers;
  ClearStats();
  FetchAndValidate(etag_url_, request_headers, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // First fetch misses initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  // ... and inserts result into cache.
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());

  ClearStats();
  FetchAndValidate(etag_url_, request_headers, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // Second fetch without the If-None-Match in the request hits initial cache
  // lookup ...
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  // ... and no extra fetches or inserts are needed.
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  ClearStats();
  request_headers.Add(HttpAttributes::kIfNoneMatch, etag_);
  FetchAndValidate(etag_url_, request_headers, true, HttpStatus::kNotModified,
                   "", kBackendFetch, true);
  // The Etag matches and a 304 is served out.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  ClearStats();
  request_headers.Replace(HttpAttributes::kIfNoneMatch, "mismatch");
  FetchAndValidate(etag_url_, request_headers, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // The Etag does not match and a 200 is served out.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, CheckLastModified) {
  RequestHeaders request_headers;
  ClearStats();
  FetchAndValidate(last_modified_url_, request_headers, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // First fetch misses initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  // ... and inserts result into cache.
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());

  ClearStats();
  FetchAndValidate(last_modified_url_, request_headers, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // Second fetch without the If-Modified-Since in the request hits initial
  // cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  // ... and no extra fetches or inserts are needed.
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  ClearStats();
  request_headers.Add(HttpAttributes::kIfModifiedSince,
                      "Sat, 03 Apr 2010 18:51:26 GMT");
  FetchAndValidate(last_modified_url_, request_headers, true,
                   HttpStatus::kNotModified, "", kBackendFetch, true);
  // The last modified timestamp matches and a 304 is served out.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  ClearStats();
  request_headers.Replace(HttpAttributes::kIfModifiedSince,
                          "Sat, 02 Apr 2010 18:51:26 GMT");
  FetchAndValidate(last_modified_url_, request_headers, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // The last modified timestamp does not match and a 200 is served out.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, CheckEtagAndLastModified) {
  RequestHeaders request_headers;
  ClearStats();
  FetchAndValidate(etag_and_last_modified_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // First fetch misses initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  // ... and inserts result into cache.
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());

  ClearStats();
  FetchAndValidate(etag_and_last_modified_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // Second fetch without the If-Modified-Since in the request hits initial
  // cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  // ... and no extra fetches or inserts are needed.
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  ClearStats();
  request_headers.Add(HttpAttributes::kIfModifiedSince,
                      "Sat, 03 Apr 2010 18:51:26 GMT");
  FetchAndValidate(etag_and_last_modified_url_, request_headers, true,
                   HttpStatus::kNotModified, "", kBackendFetch, true);
  // The last modified timestamp matches and a 304 is served out.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  ClearStats();
  request_headers.Add(HttpAttributes::kIfNoneMatch, "mismatch");
  FetchAndValidate(etag_and_last_modified_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // Even though the last modified timestamp matches, the Etag doesn't match
  // and a 200 is served out.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());

  ClearStats();
  request_headers.RemoveAll(HttpAttributes::kIfNoneMatch);
  request_headers.Replace(HttpAttributes::kIfModifiedSince,
                          "Sat, 02 Apr 2010 18:51:26 GMT");
  FetchAndValidate(etag_and_last_modified_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // The last modified timestamp does not match and a 200 is served out.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  ClearStats();
  request_headers.Add(HttpAttributes::kIfNoneMatch, etag_);
  FetchAndValidate(etag_and_last_modified_url_, request_headers, true,
                   HttpStatus::kNotModified, "", kBackendFetch, true);
  // The etag matches even though the last modified timestamp doesn't and a 304
  // is served out.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, CheckLastModifiedBased304Freshening) {
  RequestHeaders request_headers;
  ClearStats();
  FetchAndValidate(conditional_last_modified_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // First fetch misses initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(4, counting_fetcher_.byte_count());
  // ... and inserts result into cache.
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->num_conditional_refreshes()->Get());

  ClearStats();
  // Advance past expiration.
  timer_.AdvanceMs(2 * ttl_ms_);
  FetchAndValidate(conditional_last_modified_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // Second fetch without the If-Modified-Since in the request finds the expired
  // entry in cache, uses the Last-Modified header stored there in the outgoing
  // fetch ...
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... receives a 304 from the backend and updates the cache.
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, counting_fetcher_.byte_count());
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(1, cache_fetcher_->num_conditional_refreshes()->Get());

  ClearStats();
  FetchAndValidate(conditional_last_modified_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());

  ClearStats();
  // Advance past expiration.
  timer_.AdvanceMs(2 * ttl_ms_);
  // Send a request which already has an If-Modified-Since which is different
  // from the one in the cache and the fetcher.
  request_headers.Replace(HttpAttributes::kIfModifiedSince,
                          "Sat, 02 Apr 2010 18:51:26 GMT");
  FetchAndValidate(conditional_last_modified_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // The last modified timestamp does not match and a 200 is served out.
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(4, counting_fetcher_.byte_count());
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->num_conditional_refreshes()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, CheckEtagBased304Freshening) {
  RequestHeaders request_headers;
  ClearStats();
  FetchAndValidate(conditional_etag_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // First fetch misses initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(4, counting_fetcher_.byte_count());
  // ... and inserts result into cache.
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->num_conditional_refreshes()->Get());

  ClearStats();
  // Advance past expiration.
  timer_.AdvanceMs(2 * ttl_ms_);
  FetchAndValidate(conditional_etag_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // Second fetch without the If-None-Match in the request finds the expired
  // entry in cache, uses the Etag header stored there in the outgoing fetch ...
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... receives a 304 from the backend and updates the cache.
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, counting_fetcher_.byte_count());
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(1, cache_fetcher_->num_conditional_refreshes()->Get());

  ClearStats();
  // Advance past expiration.
  timer_.AdvanceMs(2 * ttl_ms_);
  // Send a request which already has an If-None-Match which is different
  // from the one in the cache and the fetcher.
  request_headers.Replace(HttpAttributes::kIfNoneMatch, "blah");
  FetchAndValidate(conditional_etag_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  // The last modified timestamp does not match and a 200 is served out.
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(4, counting_fetcher_.byte_count());
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->num_conditional_refreshes()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, Check304FresheningModifiedImplicitCacheTtl) {
  // First fetch misses initial cache lookup. The fetch succeeds and the result
  // is inserted in cache.
  RequestHeaders request_headers;
  ClearStats();
  FetchAndValidate(implicit_cache_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(4, counting_fetcher_.byte_count());
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->num_conditional_refreshes()->Get());

  ResponseHeaders response_headers;
  NullMessageHandler message_handler;
  HTTPValue value;
  StringPiece contents;
  ConstStringStarVector values;

  // Lookup the url in the cache and confirm the implicit cache ttl and the
  // max-age values are as expected.
  HTTPCache::FindResult found = Find(implicit_cache_url_, &value,
                                     &response_headers, &message_handler);
  EXPECT_EQ(HTTPCache::kFound, found);
  EXPECT_TRUE(response_headers.headers_complete());
  EXPECT_TRUE(value.ExtractContents(&contents));
  EXPECT_TRUE(response_headers.Lookup(HttpAttributes::kCacheControl, &values));
  EXPECT_EQ(static_cast<size_t>(1), values.size());
  EXPECT_EQ(GoogleString("max-age=500"), *(values[0]));
  EXPECT_EQ(cache_body_, contents);

  // Second fetch misses the cache. A conditional fetch is done and the result
  // is inserted in the cache again. Implicit cache ttl is still the same, and
  // hence the max-age is the same as well.
  ClearStats();
  // Advancing by implicit_cache_ttl_ms_.
  timer_.AdvanceMs(implicit_cache_ttl_ms_);
  FetchAndValidate(implicit_cache_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, counting_fetcher_.byte_count());
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(1, cache_fetcher_->num_conditional_refreshes()->Get());

  // Lookup the url in the cache and confirm the implicit cache ttl and max-age
  // values have not changed.
  found = Find(implicit_cache_url_, &value, &response_headers,
               &message_handler);
  EXPECT_EQ(HTTPCache::kFound, found);
  EXPECT_TRUE(response_headers.headers_complete());
  EXPECT_TRUE(value.ExtractContents(&contents));
  EXPECT_TRUE(response_headers.Lookup(HttpAttributes::kCacheControl, &values));
  EXPECT_EQ(static_cast<size_t>(1), values.size());
  EXPECT_EQ(GoogleString("max-age=500"), *(values[0]));
  EXPECT_EQ(cache_body_, contents);

  // Change the value of the implicit cache ttl to some other value.
  // Confirm that the new response after the conditional fetch is now
  // inserted in the cache with the new implicit cache ttl and max-age.
  implicit_cache_ttl_ms_ = 700 * Timer::kSecondMs;
  ClearStats();
  // Advancing by implicit_cache_ttl_ms_.
  timer_.AdvanceMs(implicit_cache_ttl_ms_);
  FetchAndValidate(implicit_cache_url_, request_headers, true,
                   HttpStatus::kOK, cache_body_, kBackendFetch, true);
  EXPECT_EQ(1, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, counting_fetcher_.byte_count());
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(1, cache_fetcher_->num_conditional_refreshes()->Get());

  found = Find(implicit_cache_url_, &value, &response_headers,
               &message_handler);
  EXPECT_EQ(HTTPCache::kFound, found);
  EXPECT_TRUE(response_headers.headers_complete());
  EXPECT_TRUE(value.ExtractContents(&contents));
  EXPECT_TRUE(response_headers.Lookup(HttpAttributes::kCacheControl, &values));
  EXPECT_EQ(static_cast<size_t>(1), values.size());
  EXPECT_EQ(GoogleString("max-age=700"), *(values[0]));
  EXPECT_EQ(cache_body_, contents);
}

TEST_F(CacheUrlAsyncFetcherTest, FetchFailedNoIgnore) {
  cache_fetcher_->set_ignore_recent_fetch_failed(kBackendFetch);

  ClearStats();
  FetchAndValidate(bad_url_, empty_request_headers_, true,
                   HttpStatus::kNotFound, bad_body_, kBackendFetch, false);
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  http_cache_->RememberFetchFailed(bad_url_, &handler_);
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());

  // bad_url_, is not fetched the second time.
  ClearStats();
  FetchAndValidate(bad_url_, empty_request_headers_, false,
                   HttpStatus::kNotFound, "", kBackendFetch, true);
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, FetchFailedIgnore) {
  cache_fetcher_->set_ignore_recent_fetch_failed(true);

  ClearStats();
  FetchAndValidate(bad_url_, empty_request_headers_, true,
                   HttpStatus::kNotFound, bad_body_, kBackendFetch, false);
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());

  http_cache_->RememberFetchFailed(bad_url_, &handler_);
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());

  // bad_url_, is fetched again the second time.
  ClearStats();
  FetchAndValidate(bad_url_, empty_request_headers_, true,
                   HttpStatus::kNotFound, bad_body_, kBackendFetch, false);
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, NoCacheHtmlOnEmptyHeader) {
  ResponseHeaders response_headers;
  SetDefaultHeaders(kContentTypeHtml, &response_headers);
  response_headers.SetDate(timer_.NowMs());
  response_headers.RemoveAll(HttpAttributes::kCacheControl);
  const char url[] = "http://www.example.com/foo.html";
  mock_fetcher_.SetResponse(url, response_headers, "");

  ExpectNoCache(url, "");
}

TEST_F(CacheUrlAsyncFetcherTest, DoCacheHtmlOnEmptyHeader) {
  // When an option is set. We do cache things with no caching headers.
  cache_fetcher_->set_default_cache_html(true);

  ResponseHeaders response_headers;
  SetDefaultHeaders(kContentTypeHtml, &response_headers);
  response_headers.SetDate(timer_.NowMs());
  response_headers.RemoveAll(HttpAttributes::kCacheControl);
  const char url[] = "http://www.example.com/foo.html";
  mock_fetcher_.SetResponse(url, response_headers, "");

  ExpectCache(url, "");
}

// Even when set_default_cache_html(true), we still don't cache responses
// with Set-Cookie headers.
TEST_F(CacheUrlAsyncFetcherTest, NoCacheSetCookie) {
  cache_fetcher_->set_default_cache_html(true);

  ResponseHeaders response_headers;
  SetDefaultHeaders(kContentTypeHtml, &response_headers);
  response_headers.SetDate(timer_.NowMs());
  response_headers.RemoveAll(HttpAttributes::kCacheControl);
  response_headers.Add(HttpAttributes::kSetCookie, "foo=bar");
  const char url[] = "http://www.example.com/foo.html";
  mock_fetcher_.SetResponse(url, response_headers, "");

  ExpectNoCache(url, "");
}

TEST_F(CacheUrlAsyncFetcherTest, CachePublicSansTtl) {
  // TODO(sligocki): Should this work without default_cache_html == true?
  cache_fetcher_->set_default_cache_html(true);

  ResponseHeaders response_headers;
  SetDefaultHeaders(kContentTypeHtml, &response_headers);
  response_headers.SetDate(timer_.NowMs());
  response_headers.Replace(HttpAttributes::kCacheControl, "public");
  const char url[] = "http://www.example.com/foo.html";
  mock_fetcher_.SetResponse(url, response_headers, "");

  ExpectCache(url, "");
}

TEST_F(CacheUrlAsyncFetcherTest, CacheVaryForNonHtml) {
  // The content type here is image/png.

  RequestHeaders request_headers_with_cookies;
  request_headers_with_cookies.Add(HttpAttributes::kCookie, "c");

  // Respect Vary is disabled. Vary: Accept-Encoding is cached.
  mutable_vary_headers_.Add(HttpAttributes::kVary, "Accept-Encoding");
  mock_fetcher_.SetResponse(vary_url_, mutable_vary_headers_, vary_body_);
  ExpectCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is enabled. Vary: Accept-Encoding is cached.
  cache_fetcher_->set_respect_vary(true);
  ExpectCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is enabled. Vary: Accept-Encoding,User-Agent is not cached.
  mutable_vary_headers_.Add(HttpAttributes::kVary, "User-Agent");
  mock_fetcher_.SetResponse(vary_url_, mutable_vary_headers_, vary_body_);
  ExpectNoCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is disabled. Vary: Accept-Encoding,User-Agent is cached.
  cache_fetcher_->set_respect_vary(false);
  ExpectCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is disabled. Vary: Cookie is cached. Note that the request has
  // no cookies.
  mutable_vary_headers_.Replace(HttpAttributes::kVary, "Cookie");
  mock_fetcher_.SetResponse(vary_url_, mutable_vary_headers_, vary_body_);
  ExpectCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is enabled. Vary: Cookie is cached. Note that the request has
  // no cookies.
  cache_fetcher_->set_respect_vary(true);
  ExpectCache(vary_url_, vary_body_);

  // Without clearing the cache send a request with cookies in the request. This
  // is not served from cahce.
  ExpectNoCacheWithRequestHeaders(vary_url_, vary_body_,
                                  request_headers_with_cookies);
  lru_cache_.Clear();

  // Respect Vary is enabled. Vary: Cookie is not cached since the request
  // has cookies set.
  ExpectNoCacheWithRequestHeaders(vary_url_, vary_body_,
                                  request_headers_with_cookies);
  lru_cache_.Clear();

  // Respect Vary is disabled. Vary: Cookie is cached even though the request
  // has cookies set.
  cache_fetcher_->set_respect_vary(false);
  ExpectCacheWithRequestHeaders(vary_url_, vary_body_,
                                request_headers_with_cookies);

  // Without clearing the cache, change respect vary to true. We should not
  // fetch the response that was inserted into the cache above.
  cache_fetcher_->set_respect_vary(true);
  ExpectNoCacheWithRequestHeaders(vary_url_, vary_body_,
                                  request_headers_with_cookies);

  lru_cache_.Clear();
}

TEST_F(CacheUrlAsyncFetcherTest, CacheVaryForHtml) {
  // The content type here is text/html. Unlike PNG and other resources, we
  // always respect Vary:Cookie on HTML even if RespectVary is off.

  mutable_vary_headers_.Replace(HttpAttributes::kContentType,
                                kContentTypeHtml.mime_type());

  RequestHeaders request_headers_with_cookies;
  request_headers_with_cookies.Add(HttpAttributes::kCookie, "c");

  // Respect Vary is disabled. Vary: Accept-Encoding is cached.
  mutable_vary_headers_.Add(HttpAttributes::kVary, "Accept-Encoding");
  mock_fetcher_.SetResponse(vary_url_, mutable_vary_headers_, vary_body_);
  ExpectCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is enabled. Vary: Accept-Encoding is cached.
  cache_fetcher_->set_respect_vary(true);
  ExpectCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is enabled. Vary: Accept-Encoding,User-Agent is not cached.
  mutable_vary_headers_.Add(HttpAttributes::kVary, "User-Agent");
  mock_fetcher_.SetResponse(vary_url_, mutable_vary_headers_, vary_body_);
  ExpectNoCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is disabled. Vary: Accept-Encoding,User-Agent is not cached.
  cache_fetcher_->set_respect_vary(false);
  ExpectNoCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is disabled. Vary: Cookie is cached. Note that the request has
  // no cookies.
  mutable_vary_headers_.Replace(HttpAttributes::kVary, "Cookie");
  mock_fetcher_.SetResponse(vary_url_, mutable_vary_headers_, vary_body_);
  ExpectCache(vary_url_, vary_body_);
  lru_cache_.Clear();

  // Respect Vary is enabled. Vary: Cookie is cached. Note that the request has
  // no cookies.
  cache_fetcher_->set_respect_vary(true);
  ExpectCache(vary_url_, vary_body_);

  // Without clearing the cache send a request with cookies in the request. This
  // is not served from cahce.
  ExpectNoCacheWithRequestHeaders(vary_url_, vary_body_,
                                  request_headers_with_cookies);
  lru_cache_.Clear();

  // Respect Vary is enabled. Vary: Cookie is not cached since the request
  // has cookies set.
  ExpectNoCacheWithRequestHeaders(vary_url_, vary_body_,
                                  request_headers_with_cookies);
  lru_cache_.Clear();

  // Respect Vary is disabled. Vary: Cookie is not cached since the request has
  // cookies set.
  cache_fetcher_->set_respect_vary(false);
  ExpectNoCacheWithRequestHeaders(vary_url_, vary_body_,
                                  request_headers_with_cookies);
  lru_cache_.Clear();
}

TEST_F(CacheUrlAsyncFetcherTest, HeadServedFromCache) {
  ClearStats();

  // Issue a HEAD request.
  RequestHeaders head_request;
  head_request.set_method(RequestHeaders::kHead);
  FetchAndValidate(cache_url_, head_request, true, HttpStatus::kOK,
                   "", kBackendFetch, false);
  // First fetch misses initial cache lookup ...
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  // ... but should not be inserted into the cache ...
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());

  ClearStats();
  // Issue another HEAD request.
  FetchAndValidate(cache_url_, head_request, true, HttpStatus::kOK,
                   "", kBackendFetch, false);
  // Second fetch should miss again ...
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());

  ClearStats();
  // Now issue a GET.
  FetchAndValidate(cache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  // Should miss the cache.
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(0, http_cache_->cache_hits()->Get());
  EXPECT_EQ(1, http_cache_->cache_misses()->Get());
  // ... succeeds at fetch ...
  EXPECT_EQ(1, counting_fetcher_.fetch_count());
  // ... and inserts result into cache.
  EXPECT_EQ(1, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());

  ClearStats();
  // Issue the HEAD request again, this time it should be served from cache.
  FetchAndValidate(cache_url_, head_request, true, HttpStatus::kOK,
                   "", kBackendFetch, false);
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());

  ClearStats();
  // Replay the GET and ensure the HEAD request has not affected its cache
  // value.
  FetchAndValidate(cache_url_, empty_request_headers_, true, HttpStatus::kOK,
                   cache_body_, kBackendFetch, true);
  EXPECT_EQ(0, http_cache_->cache_expirations()->Get());
  EXPECT_EQ(1, http_cache_->cache_hits()->Get());
  EXPECT_EQ(0, http_cache_->cache_misses()->Get());
  EXPECT_EQ(0, counting_fetcher_.fetch_count());
  EXPECT_EQ(0, http_cache_->cache_inserts()->Get());
  EXPECT_EQ(0, cache_fetcher_->fallback_responses_served()->Get());
}

TEST_F(CacheUrlAsyncFetcherTest, OPTIONS) {
  ExpectNoCacheWithMethod(cache_url_, cache_body_, RequestHeaders::kOptions);
}

TEST_F(CacheUrlAsyncFetcherTest, GET) {
  // This is already tested above, but leave in for completeness.
  RequestHeaders request_header;
  request_header.set_method(RequestHeaders::kGet);
  ExpectCacheWithRequestHeaders(cache_url_, cache_body_, request_header);
}

TEST_F(CacheUrlAsyncFetcherTest, HEAD) {
  ExpectNoCacheWithMethodAndIsServable(
      cache_url_, "", RequestHeaders::kHead, true);
}

TEST_F(CacheUrlAsyncFetcherTest, POST) {
  ExpectNoCacheWithMethod(cache_url_, cache_body_, RequestHeaders::kPost);
}

TEST_F(CacheUrlAsyncFetcherTest, PUT) {
  ExpectNoCacheWithMethod(cache_url_, cache_body_, RequestHeaders::kPut);
}

TEST_F(CacheUrlAsyncFetcherTest, DELETE) {
  ExpectNoCacheWithMethod(cache_url_, cache_body_, RequestHeaders::kDelete);
}

TEST_F(CacheUrlAsyncFetcherTest, TRACE) {
  ExpectNoCacheWithMethod(cache_url_, cache_body_, RequestHeaders::kTrace);
}

TEST_F(CacheUrlAsyncFetcherTest, CONNECT) {
  ExpectNoCacheWithMethod(cache_url_, cache_body_, RequestHeaders::kConnect);
}

TEST_F(CacheUrlAsyncFetcherTest, PATCH) {
  ExpectNoCacheWithMethod(cache_url_, cache_body_, RequestHeaders::kPatch);
}

TEST_F(CacheUrlAsyncFetcherTest, ERROR) {
  ExpectNoCacheWithMethod(cache_url_, cache_body_, RequestHeaders::kError);
}

}  // namespace

}  // namespace net_instaweb
