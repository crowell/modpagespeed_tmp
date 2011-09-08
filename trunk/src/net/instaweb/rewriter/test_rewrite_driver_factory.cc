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

// Author: jmarantz@google.com (Joshua Marantz)

#include "net/instaweb/rewriter/public/test_rewrite_driver_factory.h"

#include "base/logging.h"
#include "net/instaweb/http/public/counting_url_async_fetcher.h"
#include "net/instaweb/http/public/fake_url_async_fetcher.h"
#include "net/instaweb/http/public/mock_url_fetcher.h"
#include "net/instaweb/http/public/url_fetcher.h"  // for UrlFetcher
#include "net/instaweb/http/public/wait_url_async_fetcher.h"
#include "net/instaweb/rewriter/public/rewrite_driver.h"
#include "net/instaweb/util/public/lru_cache.h"
#include "net/instaweb/util/public/mem_file_system.h"
#include "net/instaweb/util/public/mock_hasher.h"
#include "net/instaweb/util/public/mock_message_handler.h"
#include "net/instaweb/util/public/mock_timer.h"
#include "net/instaweb/util/public/string.h"
#include "net/instaweb/util/public/thread_system.h"

namespace net_instaweb {

class RequestHeaders;
class ResponseHeaders;
class Writer;

namespace {

const int kCacheSize  = 10*1000*1000;

// This class is used to paper-over an unfortunate design choice in
// RewriteDriverFactory about fetcher ownership.  We'd like to share
// the Mock Fetcher between multiple TestRewriteDriverFactory instances.
// But this results in double-deletion problems on shutdown as each
// factory keeps its fetcher in a scoped_ptr or has equivalent logic.
//
// This should be fixed properly but for now we can introduce the
// right ownership semantics by interposing a transparent ProxyFetcher
// which is allocated per-factory, but references a real fetcher.
class ProxyUrlFetcher : public UrlFetcher {
 public:
  explicit ProxyUrlFetcher(UrlFetcher* fetcher) : fetcher_(fetcher) {}
  virtual ~ProxyUrlFetcher() {}
  virtual bool StreamingFetchUrl(const GoogleString& url,
                                 const RequestHeaders& request_headers,
                                 ResponseHeaders* response_headers,
                                 Writer* response_writer,
                                 MessageHandler* message_handler) {
    return fetcher_->StreamingFetchUrl(url,
                                       request_headers,
                                       response_headers,
                                       response_writer,
                                       message_handler);
  }

 private:
  UrlFetcher* fetcher_;
};

}  // namespace

TestRewriteDriverFactory::TestRewriteDriverFactory(
    const StringPiece& temp_dir, MockUrlFetcher* mock_fetcher)
  : mock_timer_(NULL),
    lru_cache_(NULL),
    proxy_url_fetcher_(NULL),
    mock_url_fetcher_(mock_fetcher),
    mock_url_async_fetcher_(NULL),
    counting_url_async_fetcher_(NULL),
    mock_time_cache_(mock_timer_, lru_cache_),
    mem_file_system_(NULL),
    mock_hasher_(NULL),
    mock_message_handler_(NULL),
    mock_html_message_handler_(NULL) {
  set_filename_prefix(StrCat(temp_dir, "/"));
}

TestRewriteDriverFactory::~TestRewriteDriverFactory() {
}

void TestRewriteDriverFactory::SetupWaitFetcher() {
  wait_url_async_fetcher_.reset(new WaitUrlAsyncFetcher(
      mock_url_fetcher_, thread_system()->NewMutex()));
  counting_url_async_fetcher_->set_fetcher(wait_url_async_fetcher_.get());
}

void TestRewriteDriverFactory::CallFetcherCallbacksForDriver(
    RewriteDriver* driver) {
  // Temporarily change the delayed-fetcher's mode so that it calls
  // callbacks immediately.  This is so that any further fetches
  // queued from a Done callback are immediately executed, until the
  // end of this method when we reset the state back to whatever it
  // was previously.
  bool pass_through_mode = wait_url_async_fetcher_->SetPassThroughMode(true);

  // TODO(jmarantz): parameterize whether this is to be used for
  // simulating delayed fetches for a ResourceFetch, in which case
  // we'll want WaitForCompletion, or whether this is to be used for
  // simulation of Rewrites, in which case we can do a TimedWait
  // according to the needs of the simulation.
  driver->WaitForCompletion();
  wait_url_async_fetcher_->SetPassThroughMode(pass_through_mode);
  driver->Clear();
}

UrlFetcher* TestRewriteDriverFactory::DefaultUrlFetcher() {
  DCHECK(proxy_url_fetcher_ == NULL);
  proxy_url_fetcher_ = new ProxyUrlFetcher(mock_url_fetcher_);
  return proxy_url_fetcher_;
}

UrlAsyncFetcher* TestRewriteDriverFactory::DefaultAsyncUrlFetcher() {
  DCHECK(counting_url_async_fetcher_ == NULL);
  mock_url_async_fetcher_.reset(new FakeUrlAsyncFetcher(mock_url_fetcher_));
  counting_url_async_fetcher_ = new CountingUrlAsyncFetcher(
      mock_url_async_fetcher_.get());
  return counting_url_async_fetcher_;
}

FileSystem* TestRewriteDriverFactory::DefaultFileSystem() {
  DCHECK(mem_file_system_ == NULL);
  timer();  // ensures that mock_timer_ is initialized.
  mem_file_system_ = new MemFileSystem(mock_timer_);
  return mem_file_system_;
}

Timer* TestRewriteDriverFactory::DefaultTimer() {
  DCHECK(mock_timer_ == NULL);
  mock_timer_ = new MockTimer(0);
  return mock_timer_;
}

CacheInterface* TestRewriteDriverFactory::DefaultCacheInterface() {
  DCHECK(lru_cache_ == NULL);
  lru_cache_ = new LRUCache(kCacheSize);
  return lru_cache_;
}

Hasher* TestRewriteDriverFactory::NewHasher() {
  DCHECK(mock_hasher_ == NULL);
  mock_hasher_ = new MockHasher;
  return mock_hasher_;
}

MessageHandler* TestRewriteDriverFactory::DefaultMessageHandler() {
  DCHECK(mock_message_handler_ == NULL);
  mock_message_handler_ = new MockMessageHandler;
  return mock_message_handler_;
}

MessageHandler* TestRewriteDriverFactory::DefaultHtmlParseMessageHandler() {
  DCHECK(mock_html_message_handler_ == NULL);
  mock_html_message_handler_ = new MockMessageHandler;
  return mock_html_message_handler_;
}

}  // namespace net_instaweb
