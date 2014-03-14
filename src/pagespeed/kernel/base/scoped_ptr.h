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

// Author: lsong@google.com (Libo Song)

#ifndef PAGESPEED_KERNEL_BASE_SCOPED_PTR_H_
#define PAGESPEED_KERNEL_BASE_SCOPED_PTR_H_


// Chromium has moved scoped_ptr.h from base directory to base/memory.
// Thankfully, even older version we built against had it available in
// base/memory, just with the compatibility alias still available.
#include "base/memory/scoped_ptr.h"

#if !defined(CHROMIUM_REVISION) || CHROMIUM_REVISION <= 194649
#define INSTAWEB_HAVE_SCOPED_ARRAY
#endif


#if !defined(INSTAWEB_HAVE_SCOPED_ARRAY)
namespace net_instaweb {
template<typename T> class scoped_array : public scoped_ptr<T[]> {
 public:
  scoped_array() : scoped_ptr<T[]>() {}
  explicit scoped_array(T* t) : scoped_ptr<T[]>(t) {}
};

}
#endif

#endif  // PAGESPEED_KERNEL_BASE_SCOPED_PTR_H_
