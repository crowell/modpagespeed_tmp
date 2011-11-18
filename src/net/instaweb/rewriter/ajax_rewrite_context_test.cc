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

// Author: nikhilmadan@google.com (Nikhil Madan)

#include "net/instaweb/rewriter/public/ajax_rewrite_context.h"

#include "net/instaweb/htmlparse/public/html_element.h"
#include "net/instaweb/http/public/content_type.h"
#include "net/instaweb/http/public/counting_url_async_fetcher.h"
#include "net/instaweb/http/public/http_cache.h"
#include "net/instaweb/http/public/meta_data.h"
#include "net/instaweb/http/public/mock_url_fetcher.h"
#include "net/instaweb/http/public/request_headers.h"
#include "net/instaweb/http/public/response_headers.h"
#include "net/instaweb/http/public/url_async_fetcher.h"
#include "net/instaweb/rewriter/public/resource_manager_test_base.h"
#include "net/instaweb/rewriter/public/rewrite_driver.h"
#include "net/instaweb/rewriter/public/rewrite_options.h"
#include "net/instaweb/rewriter/public/simple_text_filter.h"
#include "net/instaweb/util/public/gtest.h"
#include "net/instaweb/util/public/lru_cache.h"
#include "net/instaweb/util/public/mock_timer.h"
#include "net/instaweb/util/public/ref_counted_ptr.h"
#include "net/instaweb/util/public/statistics.h"
#include "net/instaweb/util/public/string_util.h"
#include "net/instaweb/util/worker_test_base.h"
#include "net/instaweb/util/public/timer.h"

namespace net_instaweb {

class MessageHandler;

namespace {

// Mock rewriter that appends colon followed by rewriter id to the input
// string. These are used since we need to use specific image / js / css
// rewriters with a specific id, but don't want to test their entire
// functionality.
class MockRewriter : public SimpleTextFilter::Rewriter {
 public:
  explicit MockRewriter(const char* id) : id_(id) {
    ClearStats();
  }

  // Stats.
  int num_rewrites() const { return num_rewrites_; }
  void ClearStats() { num_rewrites_ = 0; }

 protected:
  REFCOUNT_FRIEND_DECLARATION(MockRewriter);
  virtual ~MockRewriter() {}

  virtual bool RewriteText(const StringPiece& url, const StringPiece& in,
                           GoogleString* out,
                           ResourceManager* resource_manager) {
    ++num_rewrites_;
    StrAppend(out, in, ":", id_);
    return true;
  }
  virtual HtmlElement::Attribute* FindResourceAttribute(HtmlElement* element) {
    return NULL;
  }
  virtual OutputResourceKind kind() const { return kRewrittenResource; }
  virtual const char* id() const { return id_; }
  virtual const char* name() const { return "MockFilter"; }

 private:
  OutputResourceKind kind_;
  const char* id_;
  int num_rewrites_;

  DISALLOW_COPY_AND_ASSIGN(MockRewriter);
};

class MockFetch : public AsyncFetch {
 public:
  explicit MockFetch(WorkerTestBase::SyncPoint* sync)
      : done_(false),
        success_(false),
        sync_(sync) { }

  virtual ~MockFetch() {}

  virtual void HeadersComplete() {}
  virtual bool Write(const StringPiece& content, MessageHandler* handler) {
    content.AppendToString(&content_);
    return true;
  }
  virtual bool Flush(MessageHandler* handler) {
    return true;
  }

  // Fetch complete.
  virtual void Done(bool success) {
    response_headers_.ComputeCaching();
    done_ = true;
    success_ = success;
    sync_->Notify();
  }
  ResponseHeaders* response_headers() { return &response_headers_; }
  StringPiece content() { return content_; }
  bool done() { return done_; }
  bool success() { return success_; }

 private:
  ResponseHeaders response_headers_;
  GoogleString content_;
  bool done_;
  bool success_;
  WorkerTestBase::SyncPoint* sync_;

  DISALLOW_COPY_AND_ASSIGN(MockFetch);
};

class AjaxRewriteContextTest : public ResourceManagerTestBase {
 protected:
  AjaxRewriteContextTest()
      : cache_html_url_("http://www.example.com/cacheable.html"),
        cache_jpg_url_("http://www.example.com/cacheable.jpg"),
        cache_png_url_("http://www.example.com/cacheable.png"),
        cache_js_url_("http://www.example.com/cacheable.js"),
        cache_css_url_("http://www.example.com/cacheable.css"),
        nocache_html_url_("http://www.example.com/nocacheable.html"),
        bad_url_("http://www.example.com/bad.url"),
        cache_body_("good"), nocache_body_("bad"), bad_body_("ugly"),
        ttl_ms_(Timer::kHourMs) {}

  virtual ~AjaxRewriteContextTest() {}

  virtual void SetUp() {
    ResourceManagerTestBase::SetUp();
    SetAsynchronousRewrites(true);
    mock_url_fetcher()->set_fail_on_unexpected(false);

    // Set fetcher result and headers.
    AddResponse(cache_html_url_, kContentTypeHtml, cache_body_, start_time_ms(),
                ttl_ms_);
    AddResponse(cache_jpg_url_, kContentTypeJpeg, cache_body_, start_time_ms(),
                ttl_ms_);
    AddResponse(cache_png_url_, kContentTypePng, cache_body_, start_time_ms(),
                ttl_ms_);
    AddResponse(cache_js_url_, kContentTypeJavascript, cache_body_,
                start_time_ms(), ttl_ms_);
    AddResponse(cache_css_url_, kContentTypeCss, cache_body_, start_time_ms(),
                ttl_ms_);
    AddResponse(nocache_html_url_, kContentTypeHtml, nocache_body_,
                start_time_ms(), -1);

    ResponseHeaders bad_headers;
    bad_headers.set_first_line(1, 1, 404, "Not Found");
    bad_headers.SetDate(start_time_ms());
    mock_url_fetcher()->SetResponse(bad_url_, bad_headers, bad_body_);

    img_filter_ = new MockRewriter(RewriteOptions::kImageCompressionId);
    js_filter_ = new MockRewriter(RewriteOptions::kJavascriptMinId);
    css_filter_ = new MockRewriter(RewriteOptions::kCssFilterId);

    rewrite_driver()->AddRewriteFilter(
        new SimpleTextFilter(img_filter_, rewrite_driver()));
    rewrite_driver()->AddRewriteFilter(
        new SimpleTextFilter(js_filter_, rewrite_driver()));
    rewrite_driver()->AddRewriteFilter(
        new SimpleTextFilter(css_filter_, rewrite_driver()));
    rewrite_driver()->AddFilters();

    options()->ClearSignatureForTesting();
    options()->EnableFilter(RewriteOptions::kRecompressImages);
    options()->EnableFilter(RewriteOptions::kRewriteJavascript);
    options()->EnableFilter(RewriteOptions::kRewriteCss);
    options()->set_ajax_rewriting_enabled(true);
    resource_manager()->ComputeSignature(options());
  }

  void AddResponse(const GoogleString& url, const ContentType& content_type,
                   const GoogleString& body, int64 now_ms, int64 ttl_ms) {
    ResponseHeaders response_headers;
    SetDefaultHeaders(content_type, &response_headers);
    if (ttl_ms > 0) {
      response_headers.SetDateAndCaching(now_ms, ttl_ms);
    } else {
      response_headers.SetDate(now_ms);
      response_headers.Replace(HttpAttributes::kCacheControl, "no-cache");
    }
    mock_url_fetcher()->SetResponse(url, response_headers, body);
  }

  void SetDefaultHeaders(const ContentType& content_type,
                         ResponseHeaders* header) const {
    header->set_major_version(1);
    header->set_minor_version(1);
    header->SetStatusAndReason(HttpStatus::kOK);

    header->Replace(HttpAttributes::kContentType, content_type.mime_type());
  }

  void FetchAndCheckResponse(const GoogleString& url,
                             const GoogleString& expected_body,
                             bool expected_success,
                             int64 expected_ttl) {
    WorkerTestBase::SyncPoint sync(resource_manager()->thread_system());
    MockFetch mock_fetch(&sync);

    rewrite_driver()->Clear();
    rewrite_driver()->set_async_fetcher(counting_url_async_fetcher());
    rewrite_driver()->FetchResource(url, RequestHeaders(),
        mock_fetch.response_headers(), &mock_fetch);
    sync.Wait();
    rewrite_driver()->WaitForShutDown();
    EXPECT_TRUE(mock_fetch.done());
    EXPECT_EQ(expected_success, mock_fetch.success());
    EXPECT_EQ(expected_body, mock_fetch.content());
    EXPECT_EQ(expected_ttl,
              mock_fetch.response_headers()->cache_ttl_ms());
    if (mock_fetch.success()) {
      EXPECT_EQ(start_time_ms(),
                mock_fetch.response_headers()->date_ms());
    }
  }

  void ClearStats() {
    img_filter_->ClearStats();
    js_filter_->ClearStats();
    css_filter_->ClearStats();
    ResourceManagerTestBase::ClearStats();
  }

  void CheckStats(int fetches, int http_cache_hits, int http_cache_misses,
      int http_cache_inserts, int lru_cache_hits, int lru_cache_misses,
      int lru_cache_inserts, int num_img_rewrites, int num_js_rewrites,
      int num_css_rewrites) {
    EXPECT_EQ(fetches, counting_url_async_fetcher()->fetch_count());
    EXPECT_EQ(http_cache_hits, http_cache()->cache_hits()->Get());
    EXPECT_EQ(http_cache_misses, http_cache()->cache_misses()->Get());
    EXPECT_EQ(http_cache_inserts, http_cache()->cache_inserts()->Get());
    EXPECT_EQ(lru_cache_hits, lru_cache()->num_hits());
    EXPECT_EQ(lru_cache_misses, lru_cache()->num_misses());
    EXPECT_EQ(lru_cache_inserts, lru_cache()->num_inserts());
    EXPECT_EQ(num_img_rewrites, img_filter_->num_rewrites());
    EXPECT_EQ(num_js_rewrites, js_filter_->num_rewrites());
    EXPECT_EQ(num_css_rewrites, css_filter_->num_rewrites());
  }

  MockRewriter* img_filter_;
  MockRewriter* js_filter_;
  MockRewriter* css_filter_;

  const GoogleString cache_html_url_;
  const GoogleString cache_jpg_url_;
  const GoogleString cache_png_url_;
  const GoogleString cache_js_url_;
  const GoogleString cache_css_url_;

  const GoogleString nocache_html_url_;
  const GoogleString bad_url_;

  const GoogleString cache_body_;
  const GoogleString nocache_body_;
  const GoogleString bad_body_;

  const int ttl_ms_;
};

TEST_F(AjaxRewriteContextTest, CacheableHtmlUrl) {
  // All these entries find no ajax rewrite metadata and no rewriting happens.
  ClearStats();
  FetchAndCheckResponse(cache_html_url_, cache_body_, true, ttl_ms_);
  // First fetch misses initial cache lookup, succeeds at fetch and inserts
  // result into cache.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 1 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  ClearStats();
  FetchAndCheckResponse(cache_html_url_, cache_body_, true, ttl_ms_);
  // Second fetch hits initial cache lookup and no extra fetches are needed.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 1 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  mock_timer()->AdvanceMs(2 * ttl_ms_);
  ClearStats();
  FetchAndCheckResponse(cache_html_url_, cache_body_, true, ttl_ms_);
  // Cache entry is stale, so we must fetch again.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 1 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);
}

TEST_F(AjaxRewriteContextTest, CacheableJpgUrl) {
  ClearStats();
  FetchAndCheckResponse(cache_jpg_url_, cache_body_, true, ttl_ms_);

  // First fetch misses initial cache lookup, succeeds at fetch and inserts
  // result into cache. Also, the resource gets rewritten and the rewritten
  // resource gets inserted into cache.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 1 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 2 /* lru_cache_misses */,
             3 /* lru_cache_inserts */, 1 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  ClearStats();
  FetchAndCheckResponse(cache_jpg_url_, "good:ic", true, ttl_ms_);
  // Second fetch hits the metadata cache and the rewritten resource is served
  // out.
  CheckStats(0 /* fetches */, 1 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             2 /* lru_cache_hits */, 0 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  mock_timer()->AdvanceMs(2 * ttl_ms_);
  ClearStats();
  FetchAndCheckResponse(cache_jpg_url_, cache_body_, true, ttl_ms_);
  // The metadata and cache entry is stale now. Fetch the content and serve it
  // out without rewriting. Don't attempt to rewrite the content as it is stale.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             1 /* lru_cache_hits */, 0 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);
}

TEST_F(AjaxRewriteContextTest, CacheablePngUrl) {
  ClearStats();
  FetchAndCheckResponse(cache_png_url_, cache_body_, true, ttl_ms_);

  // First fetch misses initial cache lookup, succeeds at fetch and inserts
  // result into cache. Also, the resource gets rewritten and the rewritten
  // resource gets inserted into cache.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 1 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 2 /* lru_cache_misses */,
             3 /* lru_cache_inserts */, 1 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  ClearStats();
  FetchAndCheckResponse(cache_png_url_, "good:ic", true, ttl_ms_);
  // Second fetch hits the metadata cache and the rewritten resource is served
  // out.
  CheckStats(0 /* fetches */, 1 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             2 /* lru_cache_hits */, 0 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  mock_timer()->AdvanceMs(2 * ttl_ms_);
  ClearStats();
  FetchAndCheckResponse(cache_png_url_, cache_body_, true, ttl_ms_);
  // The metadata and cache entry is stale now. Fetch the content and serve it
  // out without rewriting. Don't attempt to rewrite the content as it is stale.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             1 /* lru_cache_hits */, 0 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);
}

TEST_F(AjaxRewriteContextTest, CacheableJsUrl) {
  ClearStats();
  FetchAndCheckResponse(cache_js_url_, cache_body_, true, ttl_ms_);

  // First fetch misses initial cache lookup, succeeds at fetch and inserts
  // result into cache. Also, the resource gets rewritten and the rewritten
  // resource gets inserted into cache.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 1 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 2 /* lru_cache_misses */,
             3 /* lru_cache_inserts */, 0 /* image rewrites */,
             1 /* js rewrites */, 0 /* css rewrites */);

  ClearStats();
  FetchAndCheckResponse(cache_js_url_, "good:jm", true, ttl_ms_);
  // Second fetch hits the metadata cache and the rewritten resource is served
  // out.
  CheckStats(0 /* fetches */, 1 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             2 /* lru_cache_hits */, 0 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  mock_timer()->AdvanceMs(2 * ttl_ms_);
  ClearStats();
  FetchAndCheckResponse(cache_js_url_, cache_body_, true, ttl_ms_);
  // The metadata and cache entry is stale now. Fetch the content and serve it
  // out without rewriting. Don't attempt to rewrite the content as it is stale.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             1 /* lru_cache_hits */, 0 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);
  ClearStats();
  FetchAndCheckResponse(cache_js_url_, cache_body_, true, ttl_ms_);
}

TEST_F(AjaxRewriteContextTest, CacheableCssUrl) {
  ClearStats();
  FetchAndCheckResponse(cache_css_url_, cache_body_, true, ttl_ms_);

  // First fetch misses initial cache lookup, succeeds at fetch and inserts
  // result into cache. Also, the resource gets rewritten and the rewritten
  // resource gets inserted into cache.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 1 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 2 /* lru_cache_misses */,
             3 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 1 /* css rewrites */);

  ClearStats();
  FetchAndCheckResponse(cache_css_url_, "good:cf", true, ttl_ms_);
  // Second fetch hits the metadata cache and the rewritten resource is served
  // out.
  CheckStats(0 /* fetches */, 1 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             2 /* lru_cache_hits */, 0 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  mock_timer()->AdvanceMs(2 * ttl_ms_);
  ClearStats();
  FetchAndCheckResponse(cache_css_url_, cache_body_, true, ttl_ms_);
  // The metadata and cache entry is stale now. Fetch the content and serve it
  // out without rewriting. Don't attempt to rewrite the content as it is stale.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             1 /* lru_cache_hits */, 0 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);
  ClearStats();
  FetchAndCheckResponse(cache_css_url_, cache_body_, true, ttl_ms_);
}

TEST_F(AjaxRewriteContextTest, NonCacheableUrl) {
  ClearStats();
  FetchAndCheckResponse(nocache_html_url_, nocache_body_, true, 0);
  // First fetch misses initial cache lookup, succeeds at fetch and we don't
  // insert into cache because it's not cacheable. Don't attempt to rewrite
  // this since its not cacheable.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 1 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  ClearStats();
}

TEST_F(AjaxRewriteContextTest, BadUrl) {
  ClearStats();
  FetchAndCheckResponse(bad_url_, bad_body_, true, 0);
  // First fetch misses initial cache lookup, succeeds at fetch and we don't
  // insert into cache because it's not cacheable. Don't attempt to rewrite
  // this since its not cacheable.
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 1 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);

  ClearStats();
}

TEST_F(AjaxRewriteContextTest, FetchFailed) {
  ClearStats();
  FetchAndCheckResponse("http://www.notincache.com", "", false, 0);
  CheckStats(1 /* fetches */, 0 /* http_cache_hits */,
             0 /* http_cache_misses */, 0 /* http_cache_inserts */,
             0 /* lru_cache_hits */, 1 /* lru_cache_misses */,
             0 /* lru_cache_inserts */, 0 /* image rewrites */,
             0 /* js rewrites */, 0 /* css rewrites */);
  ClearStats();
}

}  // namespace

}  // namespace net_instaweb
