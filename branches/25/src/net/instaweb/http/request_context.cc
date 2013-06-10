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

// Author: piatek@google.com (Michael Piatek)

#include "net/instaweb/http/public/request_context.h"

#include "base/logging.h"
#include "net/instaweb/http/public/log_record.h"
#include "net/instaweb/util/public/request_trace.h"
#include "net/instaweb/util/public/thread_system.h"

namespace net_instaweb {

RequestContext::RequestContext(AbstractMutex* logging_mutex)
    : log_record_(new LogRecord(logging_mutex)),
      root_trace_context_(NULL),
      using_spdy_(false) {
}

RequestContext::RequestContext()
    : log_record_(NULL),
      root_trace_context_(NULL),
      using_spdy_(false) {
}

RequestContext::~RequestContext() {
  // Please do not add non-diagnostic functionality here.
  //
  // RequestContexts are reference counted, and doing work in the dtor will
  // result in actions being taken at unpredictable times, leading to difficult
  // to diagnose performance and correctness bugs.
}

RequestContextPtr RequestContext::NewTestRequestContext(
    ThreadSystem* thread_system) {
  return RequestContextPtr(new RequestContext(thread_system->NewMutex()));
}

void RequestContext::set_root_trace_context(RequestTrace* x) {
  root_trace_context_.reset(x);
}

LogRecord* RequestContext::log_record() {
  DCHECK(log_record_.get() != NULL);
  return log_record_.get();
}

void RequestContext::set_log_record(LogRecord* l) {
  CHECK(log_record_.get() == NULL);
  log_record_.reset(l);
}

void RequestContext::ReleaseDependentTraceContext(RequestTrace* t) {
  if (t != NULL) {
    delete t;
  }
}

}  // namespace net_instaweb