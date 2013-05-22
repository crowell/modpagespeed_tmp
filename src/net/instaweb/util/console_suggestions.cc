// Copyright 2013 Google Inc.
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
//
// Author: sligocki@google.com (Shawn Ligocki)

#include "net/instaweb/util/public/console_suggestions.h"

#include <algorithm>                    // for sort

#include "base/logging.h"
#include "net/instaweb/util/public/statistics.h"

namespace net_instaweb {

ConsoleSuggestionsFactory::~ConsoleSuggestionsFactory() {
}

// Stat helper functions.
int64 ConsoleSuggestionsFactory::StatValue(StringPiece var_name) {
  Variable* var = stats_->GetVariable(var_name);
  if (var == NULL) {
    LOG(DFATAL) << "Invalid statistics name: " << var_name;
    return 0;
  } else {
    return var->Get();
  }
}

double ConsoleSuggestionsFactory::StatRatio(StringPiece numerator,
                                            StringPiece denominator) {
  int64 denom_value = StatValue(denominator);
  if (denom_value == 0) {
    return 0.0;
  } else {
    double num_value = StatValue(numerator);
    return num_value / denom_value;
  }
}

// Returns ratio of bad / (good + bad).
double ConsoleSuggestionsFactory::StatSumRatio(StringPiece bad,
                                               StringPiece good) {
  int64 bad_value = StatValue(bad);
  int64 good_value = StatValue(good);
  int64 total = bad_value + good_value;
  if (total == 0) {
    return 0.0;
  } else {
    return static_cast<double>(bad_value) / total;
  }
}

namespace {

bool CompareSuggestions(ConsoleSuggestion a, ConsoleSuggestion b) {
  // Note: largest importance first.
  return (a.importance > b.importance);
}

}  // namespace

void ConsoleSuggestionsFactory::AddConsoleSuggestion(
    double stat_failure_ratio, const char* message_format,
    const GoogleString& doc_link) {
  suggestions_.push_back(ConsoleSuggestion(
      stat_failure_ratio,
      StringPrintf(message_format, stat_failure_ratio * 100),
      doc_link));
}

void ConsoleSuggestionsFactory::GenerateSuggestions() {
  // Cannot fetch resources.
  // TODO(sligocki): This should probably be in the Apache-specific code.
  AddConsoleSuggestion(StatRatio("serf_fetch_failure_count",
                                 "serf_fetch_request_count"),
                       "Resources not loaded because of fetch failure: %.2f%%",
                       // TODO(sligocki): Add doc links.
                       "");

  // Resource fetch failures.
  // TODO(sligocki): What does resource fetch failure mean?
  AddConsoleSuggestion(StatSumRatio("num_resource_fetch_failures",
                                    "num_resource_fetch_successes"),
                       "Resource fetch failure percent: %.2f%%",
                       "");

  // Domains are not authorized.
  AddConsoleSuggestion(StatSumRatio("resource_url_domain_rejections",
                                    "resource_url_domain_acceptances"),
                       "Resources not rewritten because domain wasn't "
                       "authorized: %.2f%%",
                       "");

  // Resources are not cacheable.
  AddConsoleSuggestion(
      StatSumRatio("num_cache_control_not_rewritable_resources",
                   "num_cache_control_rewritable_resources"),
      "Resources not rewritten because of restrictive Cache-Control "
      "headers: %.2f%%",
      "");

  // TODO(sligocki): Cache too small (High cache evictions).

  // TODO(sligocki): Resources accessed too infrequently.

  // Cache miss percent.
  AddConsoleSuggestion(StatSumRatio("cache_misses", "cache_hits"),
                       "Cache miss percent: %.2f%%",
                       "");

  // Cannot parse CSS.
  // TODO(sligocki): This counts per rewrite, it seems like it should count
  // per time CSS URL is seen in HTML.
  AddConsoleSuggestion(StatSumRatio("css_filter_parse_failures",
                                    "css_filter_blocks_rewritten"),
                       "CSS files not rewritten because of parse errors: "
                       "%.2f%%",
                       "");

  // Cannot parse JavaScript.
  AddConsoleSuggestion(StatSumRatio("javascript_minification_failures",
                                    "javascript_blocks_minified"),
                       "JavaScript minification failures: %.2f%%",
                       "");

  // TODO(sligocki): Image reading failure.

  // TODO(sligocki): CSS not combinable.

  // TODO(sligocki): Images not spriteable.

  // Most important suggestions first.
  std::sort(suggestions_.begin(), suggestions_.end(), CompareSuggestions);

  // TODO(sligocki): Strip suggestions down. For example, only display top
  // 10 suggestions. Or only display suggestions that are above some cutoff
  // of importance.
}

}  // namespace net_instaweb
