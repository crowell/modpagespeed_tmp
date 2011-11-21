/*
 * Copyright 2010 Google Inc.
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

// Author: gagansingh@google.com (Gagan Singh)

#ifndef NET_INSTAWEB_REWRITER_PUBLIC_JS_DISABLE_FILTER_H_
#define NET_INSTAWEB_REWRITER_PUBLIC_JS_DISABLE_FILTER_H_

#include "net/instaweb/htmlparse/public/empty_html_filter.h"
#include "net/instaweb/util/public/basictypes.h"
#include "net/instaweb/util/public/string.h"

namespace net_instaweb {

class RewriteDriver;

// Disables javscript by converting input html:
//   <script src="1.js">var a = 1...</script>
// to:
//   <noscript disabled="true">
//     <script src="1.js">var a = 1...</script>
//   </noscript>
//
class JsDisableFilter : public EmptyHtmlFilter {
 public:
  explicit JsDisableFilter(RewriteDriver* driver);
  ~JsDisableFilter();

  virtual void StartElement(HtmlElement* element);
  virtual void EndElement(HtmlElement* element);

  virtual const char* Name() const {
    return "JsDisableFilter";
  }

 private:
  RewriteDriver* rewrite_driver_;

  DISALLOW_COPY_AND_ASSIGN(JsDisableFilter);
};

}  // namespace net_instaweb

#endif  // NET_INSTAWEB_REWRITER_PUBLIC_JS_DISABLE_FILTER_H_
