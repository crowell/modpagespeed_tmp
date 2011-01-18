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

// Author: sligocki@google.com (Shawn Ligocki)
//
// A collection of content-types and their attributes.

#ifndef NET_INSTAWEB_UTIL_PUBLIC_CONTENT_TYPE_H_
#define NET_INSTAWEB_UTIL_PUBLIC_CONTENT_TYPE_H_

#include "net/instaweb/util/public/string_util.h"

namespace net_instaweb {

struct ContentType {
 public:
  enum Type {
    kHtml,
    kXhtml,
    kCeHtml,  // See http://en.wikipedia.org/wiki/CE-HTML
    kJavascript,
    kCss,
    kText,
    kXml,
    kPng,
    kGif,
    kJpeg,
  };

  const char* mime_type() const { return mime_type_; }
  const char* file_extension() const { return file_extension_; }
  Type type() const { return type_; }

  // Return true iff this content type is HTML, or XHTML, or some other such
  // thing (e.g. CE-HTML) that we can rewrite.
  bool IsHtmlLike() const;

  // Return true iff this content type is XML of some kind (either XHTML or
  // some other XML).
  bool IsXmlLike() const;

  // These fields should be private; we leave them public only so we can use
  // struct literals in content_type.cc.  Other code should use the above
  // accessor methods instead of accessing these fields directly.
  const char* mime_type_;
  const char* file_extension_;  // includes ".", e.g. ".ext"
  Type type_;
};

// HTML-like (i.e. rewritable) text:
extern const ContentType& kContentTypeHtml;
extern const ContentType& kContentTypeXhtml;
extern const ContentType& kContentTypeCeHtml;
// Other text:
extern const ContentType& kContentTypeJavascript;
extern const ContentType& kContentTypeCss;
extern const ContentType& kContentTypeText;
extern const ContentType& kContentTypeXml;
// Images:
extern const ContentType& kContentTypePng;
extern const ContentType& kContentTypeGif;
extern const ContentType& kContentTypeJpeg;

// Given a name (file or url), see if it has the canonical extension
// corresponding to a particular content type.
const ContentType* NameExtensionToContentType(const StringPiece& name);
const ContentType* MimeTypeToContentType(const StringPiece& mime_type);

}  // namespace net_instaweb

#endif  // NET_INSTAWEB_UTIL_PUBLIC_CONTENT_TYPE_H_
