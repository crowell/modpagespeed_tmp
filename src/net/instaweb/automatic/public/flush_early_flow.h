/*
 * Copyright 2012 Google Inc.
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

// Author: mmohabey@google.com (Megha Mohabey)

#ifndef NET_INSTAWEB_AUTOMATIC_PUBLIC_FLUSH_EARLY_FLOW_H_
#define NET_INSTAWEB_AUTOMATIC_PUBLIC_FLUSH_EARLY_FLOW_H_

#include "net/instaweb/util/public/basictypes.h"
#include "pagespeed/kernel/base/string.h"
#include "pagespeed/kernel/base/string_util.h"
#include "pagespeed/kernel/base/string_writer.h"

namespace net_instaweb {

class AsyncFetch;
class FlushEarlyInfo;
class Histogram;
class MessageHandler;
class ProxyFetchPropertyCallbackCollector;
class ProxyFetchFactory;
class ServerContext;
class RewriteDriver;
class Statistics;
class TimedVariable;

// FlushEarlyFlow manages the flow for the rewriters which flush a response to
// the client before receiving a response from the origin server. If a request
// can be responded to early, then FlushEarlyFlow is initiated. It also has
// helper functions to update the property cache with the response headers which
// are used when a request is responded to early.
class FlushEarlyFlow {
 public:
  static const char kNumRequestsFlushedEarly[];
  static const char kNumResourcesFlushedEarly[];
  static const char kFlushEarlyRewriteLatencyMs[];
  static const char kNumFlushEarlyHttpStatusCodeDeemedUnstable[];
  static const char kNumFlushEarlyRequestsRedirected[];
  static const char kRedirectPageJs[];

  static void TryStart(
      const GoogleString& url,
      AsyncFetch** base_fetch,
      RewriteDriver* driver,
      ProxyFetchFactory* factory,
      ProxyFetchPropertyCallbackCollector* property_callback);

  static void InitStats(Statistics* stats);

  virtual ~FlushEarlyFlow();

 private:
  class FlushEarlyAsyncFetch;
  // Flushes some response for this request before receiving the fetch response
  // from the origin server.
  void FlushEarly();

  // Cancels the flush early flow.
  void Cancel();

  FlushEarlyFlow(const GoogleString& url,
                 AsyncFetch* base_fetch,
                 FlushEarlyAsyncFetch* flush_early_fetch,
                 RewriteDriver* driver,
                 ProxyFetchFactory* factory,
                 ProxyFetchPropertyCallbackCollector* property_cache_callback);

  // Generates response headers from previous values stored in property cache.
  void GenerateResponseHeaders(const FlushEarlyInfo& flush_early_info);

  // Callback that is invoked after we rewrite the early head.
  // start_time_ms indicates the time we started rewriting the flush early
  // head. This is set to -1 if is_experimental_hit is false.
  void FlushEarlyRewriteDone(int64 start_time_ms,
                             RewriteDriver* flush_early_driver);

  void Write(const StringPiece& val);

  GoogleString url_;
  GoogleString dummy_head_;
  StringWriter dummy_head_writer_;
  int num_resources_flushed_;
  int num_rewritten_resources_;
  int64 average_fetch_time_;

  AsyncFetch* base_fetch_;
  FlushEarlyAsyncFetch* flush_early_fetch_;
  RewriteDriver* driver_;
  ProxyFetchFactory* factory_;
  ServerContext* server_context_;
  ProxyFetchPropertyCallbackCollector* property_cache_callback_;
  bool should_flush_early_lazyload_script_;
  MessageHandler* handler_;
  bool is_mobile_user_agent_;

  TimedVariable* num_requests_flushed_early_;
  TimedVariable* num_resources_flushed_early_;
  TimedVariable* num_flush_early_http_status_code_deemed_unstable_;
  Histogram* flush_early_rewrite_latency_ms_;

  DISALLOW_COPY_AND_ASSIGN(FlushEarlyFlow);
};

}  // namespace net_instaweb

#endif  // NET_INSTAWEB_AUTOMATIC_PUBLIC_FLUSH_EARLY_FLOW_H_
