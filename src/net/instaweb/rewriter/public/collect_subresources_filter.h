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

#ifndef NET_INSTAWEB_REWRITER_PUBLIC_COLLECT_SUBRESOURCES_FILTER_H_
#define NET_INSTAWEB_REWRITER_PUBLIC_COLLECT_SUBRESOURCES_FILTER_H_

#include "net/instaweb/htmlparse/public/html_element.h"
#include "net/instaweb/rewriter/public/rewrite_filter.h"
#include "net/instaweb/util/public/basictypes.h"
#include "net/instaweb/util/public/string_util.h"

namespace net_instaweb {

class FlushEarlyInfo;
class PropertyCache;
class RewriteDriver;

// CollectSubresourcesFilter gets all the rewritten subresources in the head
// section of the document and stores them in property cache. The resources
// are then flushed early in FlushEarlyFlow in the form of a dummy HEAD which
// induces early downloading of the sub resources by the browser.
class CollectSubresourcesFilter : public RewriteFilter {
 public:
  explicit CollectSubresourcesFilter(RewriteDriver* rewrite_driver);
  virtual ~CollectSubresourcesFilter();

  virtual void StartDocumentImpl();
  virtual void StartElementImpl(HtmlElement* element);
  virtual void EndElementImpl(HtmlElement* element);

  virtual const char* Name() const { return "CollectSubresourcesFilter"; }
  virtual const char* id() const { return "fs"; }

  static void AddSubresourcesToFlushEarlyInfo(
      const std::map<int, FlushEarlyResource>& subresources,
      FlushEarlyInfo* info);

 private:
  // Creates a rewrite context for the subresource.
  void CreateSubresourceContext(StringPiece url, HtmlElement* elt,
                                HtmlElement::Attribute* attr);

  class Context;

  bool in_first_head_;
  bool seen_first_head_;
  int num_resources_;
  PropertyCache* property_cache_;

  DISALLOW_COPY_AND_ASSIGN(CollectSubresourcesFilter);
};

}  // namespace net_instaweb
#endif  // NET_INSTAWEB_REWRITER_PUBLIC_COLLECT_SUBRESOURCES_FILTER_H_
