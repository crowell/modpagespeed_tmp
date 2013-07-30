// Copyright 2011 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Author: jmarantz@google.com (Joshua Marantz)

#ifndef PAGESPEED_KERNEL_HTTP_REQUEST_HEADERS_H_
#define PAGESPEED_KERNEL_HTTP_REQUEST_HEADERS_H_

#include "pagespeed/kernel/base/basictypes.h"
#include "pagespeed/kernel/base/string.h"
#include "pagespeed/kernel/base/string_util.h"
#include "pagespeed/kernel/http/headers.h"

namespace net_instaweb {

class HttpRequestHeaders;
class MessageHandler;
class Writer;

// Read/write API for HTTP request (RequestHeaders is a misnomer).
class RequestHeaders : public Headers<HttpRequestHeaders> {
 public:
  enum Method { kOptions, kGet, kHead, kPost, kPut, kDelete, kTrace, kConnect,
                kPatch, kPurge, kError };

  RequestHeaders();

  void Clear();
  void CopyFrom(const RequestHeaders& other);

  GoogleString ToString() const;
  Method method() const;
  const char* method_string() const;
  void set_method(Method method);

  // This is encoded message body, a rewriter or fetcher
  // may opt to translate to entity-body only after removing
  // header which has encoding information.
  const GoogleString& message_body() const;
  void set_message_body(const GoogleString& data);

  using Headers<HttpRequestHeaders>::WriteAsHttp;
  bool WriteAsHttp(const StringPiece& url, Writer* writer,
                   MessageHandler* handler) const;

  // Determines whether a request header accepts gzipped content.
  bool AcceptsGzip() const;

  // Returns true if these request headers are for an XmlHttp request (i.e. ajax
  // request).  This mechanism is not reliable because sometimes this header is
  // not set even for XmlHttp requests.
  bool IsXmlHttpRequest() const;

  // Calling this method on an object that will not have any mutating
  // operations called on it afterwards will ensure that it will not do any
  // lazy initialization behind the scenes.
  void PopulateLazyCaches() { PopulateMap(); }

 private:
  DISALLOW_COPY_AND_ASSIGN(RequestHeaders);
};

}  // namespace net_instaweb

#endif  // PAGESPEED_KERNEL_HTTP_REQUEST_HEADERS_H_
