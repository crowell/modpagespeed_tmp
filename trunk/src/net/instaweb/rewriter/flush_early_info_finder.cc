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

#include "net/instaweb/rewriter/public/flush_early_info_finder.h"

#include "net/instaweb/rewriter/flush_early.pb.h"
#include "net/instaweb/rewriter/public/rewrite_driver.h"
#include "net/instaweb/rewriter/public/server_context.h"
#include "net/instaweb/util/public/message_handler.h"
#include "net/instaweb/util/public/property_cache.h"
#include "net/instaweb/util/public/proto_util.h"
#include "net/instaweb/util/public/string.h"
#include "net/instaweb/util/public/string_util.h"

namespace net_instaweb {

const char FlushEarlyInfoFinder::kFlushEarlyRenderPropertyName[] =
    "flush_early_render";

FlushEarlyInfoFinder::~FlushEarlyInfoFinder() {
}

void FlushEarlyInfoFinder::UpdateFlushEarlyInfoInDriver(RewriteDriver* driver) {
  if (driver->flush_early_render_info() != NULL) {
    return;
  }
  PropertyCache* property_cache =
      driver->server_context()->page_property_cache();
  const PropertyCache::Cohort* cohort = property_cache->GetCohort(GetCohort());
  PropertyPage* page = driver->property_page();
  if (page != NULL && cohort != NULL) {
    PropertyValue* property_value = page->GetProperty(
        cohort, kFlushEarlyRenderPropertyName);
    int64 cache_ttl_ms =
      driver->options()->finder_properties_cache_expiration_time_ms();
    if (property_value->has_value() && !property_cache->IsExpired(
          property_value, cache_ttl_ms)) {
      FlushEarlyRenderInfo* flush_early_render_info = new FlushEarlyRenderInfo;
      StringPiece value = property_value->value();
      ArrayInputStream property_stream(value.data(), value.size());
      if (!flush_early_render_info->ParseFromZeroCopyStream(&property_stream)) {
        driver->message_handler()->Message(kError, "Parsing value from cache "
                                           "into FlushEarlyRenderInfo failed.");
        delete flush_early_render_info;
      } else {
        // Force a computation if the value is imminently expiry.
        if (property_cache->IsImminentlyExpiring(
            property_value, cache_ttl_ms)) {
          driver->enable_must_compute_finder_properties();
        }
        driver->set_flush_early_render_info(flush_early_render_info);
        return;
      }
    }
    driver->enable_must_compute_finder_properties();
  }
}

void FlushEarlyInfoFinder::ComputeFlushEarlyInfo(RewriteDriver* driver) {
  // Default interface is empty and derived classes can override.
}

const char* FlushEarlyInfoFinder::GetCharset(
    const RewriteDriver* driver) {
  FlushEarlyRenderInfo* flush_early_render_info =
      driver->flush_early_render_info();
  if (flush_early_render_info != NULL) {
    return flush_early_render_info->charset().c_str();
  }
  return "";
}

void FlushEarlyInfoFinder::UpdateFlushEarlyInfoCacheEntry(
    RewriteDriver* driver,
    FlushEarlyRenderInfo* flush_early_render_info) {
  PropertyCache* property_cache =
      driver->server_context()->page_property_cache();
  PropertyPage* page = driver->property_page();
  if (property_cache != NULL && page != NULL) {
    const PropertyCache::Cohort* cohort = property_cache->GetCohort(
        GetCohort());
    if (cohort != NULL) {
      flush_early_render_info->set_updated(true);
      PropertyValue* property_value = page->GetProperty(
          cohort, kFlushEarlyRenderPropertyName);
      GoogleString value;
      {
        StringOutputStream sstream(&value);  // finalizes in destructor
        flush_early_render_info->SerializeToZeroCopyStream(&sstream);
      }
      property_cache->UpdateValue(value, property_value);
    } else {
      driver->message_handler()->Message(kWarning, "FlushEarly FinderCohort is"
                                         "NULL.");
    }
  }
}

}  // namespace net_instaweb
