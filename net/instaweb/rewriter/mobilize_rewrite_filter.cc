/*
 * Copyright 2014 Google Inc.
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

// Author: stevensr@google.com (Ryan Stevens)

#include "net/instaweb/rewriter/public/mobilize_rewrite_filter.h"

#include <algorithm>

#include "base/logging.h"
#include "net/instaweb/rewriter/mobilize_cached.pb.h"
#include "net/instaweb/rewriter/public/domain_lawyer.h"
#include "net/instaweb/rewriter/public/mobilize_cached_finder.h"
#include "net/instaweb/rewriter/public/mobilize_filter_base.h"
#include "net/instaweb/rewriter/public/request_properties.h"
#include "net/instaweb/rewriter/public/rewrite_driver.h"
#include "net/instaweb/rewriter/public/rewrite_options.h"
#include "net/instaweb/rewriter/public/server_context.h"
#include "net/instaweb/rewriter/public/static_asset_manager.h"
#include "pagespeed/kernel/base/basictypes.h"
#include "pagespeed/kernel/base/escaping.h"
#include "pagespeed/kernel/base/statistics.h"
#include "pagespeed/kernel/base/string.h"
#include "pagespeed/kernel/base/string_util.h"
#include "pagespeed/kernel/html/html_element.h"
#include "pagespeed/kernel/html/html_node.h"
#include "pagespeed/kernel/http/google_url.h"

namespace net_instaweb {

const char MobilizeRewriteFilter::kPagesMobilized[] =
    "mobilization_pages_rewritten";
const char MobilizeRewriteFilter::kKeeperBlocks[] =
    "mobilization_keeper_blocks_found";
const char MobilizeRewriteFilter::kHeaderBlocks[] =
    "mobilization_header_blocks_found";
const char MobilizeRewriteFilter::kNavigationalBlocks[] =
    "mobilization_navigational_blocks_found";
const char MobilizeRewriteFilter::kContentBlocks[] =
    "mobilization_content_blocks_found";
const char MobilizeRewriteFilter::kMarginalBlocks[] =
    "mobilization_marginal_blocks_found";
const char MobilizeRewriteFilter::kDeletedElements[] =
    "mobilization_elements_deleted";

// JavaScript snippet to set the correct height for the spacer div.
//
// TODO(jmarantz): Move to this into its own JS bundle, so it is automatically
// minified by Closure Compiler when debug is off.
const char MobilizeRewriteFilter::kSetSpacerHeight[] =
    "\n(function() {\n"  // Hide temps in a function scope
    "  var spacer = document.getElementById('ps-spacer');\n"
    "  var docElt = document.documentElement;\n"
    "  var scale = window.innerWidth / docElt.clientWidth;\n"
    // See mobilize.css, .psmob-header-bar sets height to 10%, so divide by 10.
    "  var headerBarHeight = \n"
    "    Math.round(Math.max(docElt.clientHeight, docElt.clientWidth) * .1);\n"
    "  var newHeight = Math.round(headerBarHeight * scale) + 'px';\n"
    "  spacer.style.height = newHeight;\n"
    "})();";

namespace {

// The 'book' says to use add ",user-scalable=no" but jmarantz hates
// this.  I want to be able to zoom in.  Debate with the writers of
// that book will need to occur.
const char kViewportContent[] = "width=device-width";

const HtmlName::Keyword kPreserveNavTags[] = {HtmlName::kA};
const HtmlName::Keyword kTableTags[] = {
  HtmlName::kCaption, HtmlName::kCol, HtmlName::kColgroup, HtmlName::kTable,
  HtmlName::kTbody, HtmlName::kTd, HtmlName::kTfoot, HtmlName::kTh,
  HtmlName::kThead, HtmlName::kTr};
const HtmlName::Keyword kTableTagsToBr[] = {HtmlName::kTable, HtmlName::kTr};

#ifndef NDEBUG
void CheckKeywordsSorted(const HtmlName::Keyword* list, int len) {
  for (int i = 1; i < len; ++i) {
    DCHECK(list[i - 1] < list[i]);
  }
}
#endif  // #ifndef NDEBUG

GoogleString FormatColorForJs(const RewriteOptions::Color& color) {
  return StrCat("[",
                IntegerToString(color.r), ",",
                IntegerToString(color.g), ",",
                IntegerToString(color.b), "]");
}

void ConvertColor(const MobilizeCached::Color& color,
                  RewriteOptions::Color* out) {
  out->r = color.r();
  out->g = color.g();
  out->b = color.b();
}

}  // namespace

MobilizeRewriteFilter::MobilizeRewriteFilter(RewriteDriver* rewrite_driver)
    : CommonFilter(rewrite_driver),
      body_element_depth_(0),
      keeper_element_depth_(0),
      reached_reorder_containers_(false),
      added_viewport_(false),
      added_style_(false),
      added_containers_(false),
      added_mob_js_(false),
      added_progress_(false),
      added_spacer_(false),
      config_mode_(rewrite_driver->options()->mob_config()),
      in_script_(false),
      use_js_layout_(rewrite_driver->options()->mob_layout()),
      use_js_nav_(rewrite_driver->options()->mob_nav()),
      use_static_(rewrite_driver->options()->mob_static()),
      rewrite_js_(rewrite_driver->options()->Enabled(
          RewriteOptions::kRewriteJavascriptExternal)) {
  // If a domain proxy-suffix is specified, and it starts with ".",
  // then we'll remove the "." from that and use that as the location
  // of the shared static files (JS and CSS).  E.g.
  // for a proxy_suffix of ".suffix" we'll look for static files in
  // "//suffix/static/".
  StringPiece suffix(
      rewrite_driver->options()->domain_lawyer()->proxy_suffix());
  if (!suffix.empty() && suffix.starts_with(".")) {
    suffix.remove_prefix(1);
    static_file_prefix_ = StrCat("//", suffix, "/static/");
  } else {
    use_static_ = false;
  }
  Statistics* stats = rewrite_driver->statistics();
  num_pages_mobilized_ = stats->GetVariable(kPagesMobilized);
  num_keeper_blocks_ = stats->GetVariable(kKeeperBlocks);
  num_header_blocks_ = stats->GetVariable(kHeaderBlocks);
  num_navigational_blocks_ = stats->GetVariable(kNavigationalBlocks);
  num_content_blocks_ = stats->GetVariable(kContentBlocks);
  num_marginal_blocks_ = stats->GetVariable(kMarginalBlocks);
  num_elements_deleted_ = stats->GetVariable(kDeletedElements);
#ifndef NDEBUG
  CheckKeywordsSorted(kPreserveNavTags, arraysize(kPreserveNavTags));
  CheckKeywordsSorted(kTableTags, arraysize(kTableTags));
  CheckKeywordsSorted(kTableTagsToBr, arraysize(kTableTagsToBr));
#endif  // #ifndef NDEBUG
}

MobilizeRewriteFilter::~MobilizeRewriteFilter() {}

void MobilizeRewriteFilter::InitStats(Statistics* statistics) {
  statistics->AddVariable(kPagesMobilized);
  statistics->AddVariable(kKeeperBlocks);
  statistics->AddVariable(kHeaderBlocks);
  statistics->AddVariable(kNavigationalBlocks);
  statistics->AddVariable(kContentBlocks);
  statistics->AddVariable(kMarginalBlocks);
  statistics->AddVariable(kDeletedElements);
}

bool MobilizeRewriteFilter::IsApplicableFor(RewriteDriver* driver) {
  // Note: we may need to narrow the set of applicable user agents here, but for
  // now we (very) optimistically assume that our JS works on any mobile UA.
  // TODO(jmaessen): Some debate over whether to include tablet UAs here.  We
  // almost certainly want touch-friendliness, but the geometric constraints are
  // very different and we probably want to turn off almost all non-navigational
  // mobilization.
  // TODO(jmaessen): If we want to inject instrumentation on desktop pages to
  // beacon back data useful for mobile page views, this should change and we'll
  // want to check at code injection points instead.
  return driver->options()->mob_always() ||
         driver->request_properties()->IsMobile();
}

void MobilizeRewriteFilter::DetermineEnabled(GoogleString* disabled_reason) {
  if (!IsApplicableFor(driver())) {
    disabled_reason->assign("Not a mobile User Agent.");
    set_is_enabled(false);
  }
}

void MobilizeRewriteFilter::StartDocumentImpl() {
}

void MobilizeRewriteFilter::EndDocument() {
  num_pages_mobilized_->Add(1);
  body_element_depth_ = 0;
  keeper_element_depth_ = 0;
  reached_reorder_containers_ = false;
  added_viewport_ = false;
  added_style_ = false;
  added_containers_ = false;
  added_mob_js_ = false;
  added_progress_ = false;
  added_spacer_ = false;
  in_script_ = false;
}

void MobilizeRewriteFilter::StartElementImpl(HtmlElement* element) {
  HtmlName::Keyword keyword = element->keyword();

  // Unminify jquery for javascript debugging.
  if (keyword == HtmlName::kScript) {
    in_script_ = true;

#if 0
    // Uncomment to translate jquery.min.js to jquery.js for debugging.
    // Alternatively, do this only if this is served from google APIs where
    // we know we have access to both versions.
    HtmlElement::Attribute* src_attribute =
        element->FindAttribute(HtmlName::kSrc);
    if (src_attribute != NULL) {
      StringPiece src(src_attribute->DecodedValueOrNull());
      if (src.find("jquery.min.js") != StringPiece::npos) {
        GoogleString new_value = src.as_string();
        GlobalReplaceSubstring("/jquery.min.js", "/jquery.js", &new_value);
        src_attribute->SetValue(new_value);
      }
    }
#endif
  }
  if (keyword == HtmlName::kMeta) {
    // Remove any existing viewport tags, other than the one we created
    // at start of head.
    StringPiece name(element->EscapedAttributeValue(HtmlName::kName));
    if (name == "viewport") {
      driver()->DeleteNode(element);
      num_elements_deleted_->Add(1);
    }
  } else if (keyword == HtmlName::kHead) {
    // <meta name="viewport"... />
    if (!added_viewport_) {
      added_viewport_ = true;

      // Transmit to the mobilization scripts whether they are run in debug
      // mode or not by setting 'psDebugMode'.
      //
      // Also, transmit to the mobilization scripts whether navigation is
      // enabled.  That is bundled into the same JS compile unit as the
      // layout, so we cannot do a 'undefined' check in JS to determine
      // whether it was enabled.
      const RewriteOptions* options = driver()->options();
      GoogleString src = StrCat(
          "var psDebugMode=", (driver()->DebugMode() ? "true;" : "false;"),
          "var psNavMode=", (use_js_nav_ ? "true;" : "false;"),
          "var psConfigMode=", (config_mode_ ? "true;" : "false;"));
      StrAppend(
          &src,
          "var psLayoutMode=", (use_js_layout_ ? "true;" : "false;"),
          "var psStaticJs=", (use_static_ ? "true;" : "false;"));
      const GoogleString& phone = options->mob_phone_number();
      const GoogleString& map_location = options->mob_map_location();
      if (!phone.empty() || !map_location.empty()) {
        StrAppend(&src, "var psConversionId=",
                  Integer64ToString(options->mob_conversion_id()),
                  ";");
      }
      if (!phone.empty()) {
        GoogleString label, escaped_phone;
        EscapeToJsStringLiteral(phone, false, &escaped_phone);
        EscapeToJsStringLiteral(options->mob_phone_conversion_label(), false,
                                &label);
        StrAppend(&src, "var psPhoneNumber='", escaped_phone, "';"
                  "var psPhoneConversionLabel='", label, "';");
      }
      if (!map_location.empty()) {
        GoogleString label, escaped_map_location;
        EscapeToJsStringLiteral(map_location, false, &escaped_map_location);
        EscapeToJsStringLiteral(options->mob_map_conversion_label(), false,
                                &label);
        StrAppend(&src, "var psMapLocation='", escaped_map_location, "';"
                  "var psMapConversionLabel='", label, "';");
      }

      // See if we have a precomputed theme, either via options or pcache.
      bool has_mob_theme = false;
      RewriteOptions::Color background_color, foreground_color;
      GoogleString logo_url;
      if (options->has_mob_theme()) {
        has_mob_theme = true;
        background_color = options->mob_theme().background_color;
        foreground_color = options->mob_theme().foreground_color;
        logo_url = options->mob_theme().logo_url;
      } else {
        MobilizeCachedFinder* finder =
            driver()->server_context()->mobilize_cached_finder();
        MobilizeCached out;
        if (finder &&
            finder->GetMobilizeCachedFromPropertyCache(driver(), &out)) {
          has_mob_theme =
              out.has_background_color() && out.has_foreground_color();
          ConvertColor(out.background_color(), &background_color);
          ConvertColor(out.foreground_color(), &foreground_color);
          logo_url = out.foreground_image_url();
        }
      }

      if (has_mob_theme) {
         StrAppend(&src, "var psMobBackgroundColor=",
                   FormatColorForJs(background_color), ";");
         StrAppend(&src, "var psMobForegroundColor=",
                   FormatColorForJs(foreground_color), ";");
        if (!logo_url.empty()) {
          GoogleString escaped_logo_url;
          EscapeToJsStringLiteral(logo_url, false, &escaped_logo_url);
          StrAppend(&src, "var psMobLogoUrl='", escaped_logo_url, "';");
        } else {
          StrAppend(&src, "var psMobLogoUrl=null;");
        }
      } else {
        StrAppend(&src, "var psMobBackgroundColor=null;");
        StrAppend(&src, "var psMobForegroundColor=null;");
      }
      if (options->Enabled(RewriteOptions::kMobilizePrecompute)) {
        StrAppend(&src, "var psMobPrecompute=true;");
      }
      GoogleString escaped_mob_beacon_url;
      EscapeToJsStringLiteral(options->mob_beacon_url(), false /* add_quotes */,
                              &escaped_mob_beacon_url);
      StrAppend(&src, "var psMobBeaconUrl='", escaped_mob_beacon_url, "';");
      driver()->InsertScriptAfterCurrent(src, false);

      // TODO(jmarantz): Consider waiting to see if we have a charset directive
      // and move this after that.  This requires some constraints on when
      // flushes occur.  As we sort out our 'flush' strategy we should ensure
      // the charset is declared as early as possible.
      //
      // OTOH convert_meta_tags should make that moot by copying the
      // charset into the HTTP headers, so maybe that filter should
      // be a prereq of this one.
      if (use_js_layout_) {
        HtmlElement* added_viewport_element = driver()->NewElement(
            element, HtmlName::kMeta);
        added_viewport_element->set_style(HtmlElement::BRIEF_CLOSE);
        added_viewport_element->AddAttribute(
            driver()->MakeName(HtmlName::kName), "viewport",
            HtmlElement::SINGLE_QUOTE);
        added_viewport_element->AddAttribute(
            driver()->MakeName(HtmlName::kContent), kViewportContent,
            HtmlElement::SINGLE_QUOTE);
        driver()->InsertNodeAfterCurrent(added_viewport_element);
      }

      if (use_js_layout_) {
        if (use_static_) {
          // Include the base closure file to allow goog.provide etc to work.
          driver()->InsertScriptAfterCurrent(
              StrCat(static_file_prefix_, "goog/base.js"), true);

          // Hijack XHR early so that we don't miss mobilizing any responses.
          // TODO(jmarantz): Move this block to inject before the first script.
          GoogleString script_path = StrCat(
              static_file_prefix_, "mobilize_xhr.js");
          driver()->InsertScriptAfterCurrent(script_path, true);
        } else {
          StaticAssetManager* manager =
              driver()->server_context()->static_asset_manager();
          StringPiece js = manager->GetAssetUrl(
              StaticAssetEnum::MOBILIZE_XHR_JS, driver()->options());
          driver()->InsertScriptAfterCurrent(js, true);
        }
      }
    }
  } else if (keyword == HtmlName::kBody) {
    ++body_element_depth_;
    if (!added_spacer_) {
      added_spacer_ = true;

      HtmlElement* spacer = driver()->NewElement(element, HtmlName::kDiv);
      driver()->InsertNodeAfterCurrent(spacer);
      driver()->AddAttribute(spacer, HtmlName::kId, "ps-spacer");
      driver()->AddAttribute(spacer, HtmlName::kClass,
                             "psmob-header-spacer-div");
      driver()->InsertScriptAfterCurrent(kSetSpacerHeight, false);
    }

    if (use_js_layout_ && !added_progress_) {
      added_progress_ = true;
      HtmlElement* scrim = driver()->NewElement(element, HtmlName::kDiv);
      scrim->set_style(HtmlElement::EXPLICIT_CLOSE);
      driver()->InsertNodeAfterCurrent(scrim);
      driver()->AddAttribute(scrim, HtmlName::kId, "ps-progress-scrim");
      driver()->AddAttribute(scrim, HtmlName::kClass, "psProgressScrim");

      HtmlElement* remove_bar = driver()->AppendAnchor(
          "javascript:psRemoveProgressBar();",
          "Remove Progress Bar (doesn't stop mobilization)",
          scrim);
      driver()->AddAttribute(remove_bar, HtmlName::kId,
                             "ps-progress-remove");
      if (!driver()->DebugMode()) {
        driver()->AppendChild(
            scrim, driver()->NewElement(scrim, HtmlName::kBr));
        driver()->AppendAnchor(
            "javascript:psSetDebugMode();",
            "Show Debug Log In Progress Bar",
            scrim);
        driver()->AddAttribute(remove_bar, HtmlName::kId,
                               "ps-progress-show-log");
      }

      const GoogleUrl& gurl = driver()->google_url();
      GoogleString origin_url, host;
      if (gurl.IsWebValid() &&
          driver()->options()->domain_lawyer()->StripProxySuffix(
              gurl, &origin_url, &host)) {
        driver()->AppendChild(
            scrim, driver()->NewElement(scrim, HtmlName::kBr));
        driver()->AppendAnchor(
            origin_url,
            "Abort mobilization and load page from origin",
            scrim);
      }
      HtmlElement* bar = driver()->NewElement(scrim, HtmlName::kDiv);
      driver()->AddAttribute(bar, HtmlName::kClass, "psProgressBar");
      driver()->AppendChild(scrim, bar);
      HtmlElement* span = driver()->NewElement(bar, HtmlName::kSpan);
      driver()->AddAttribute(span, HtmlName::kId, "ps-progress-span");
      driver()->AddAttribute(span, HtmlName::kClass, "psProgressSpan");
      driver()->AppendChild(bar, span);
      HtmlElement* log = driver()->NewElement(scrim, HtmlName::kPre);
      driver()->AddAttribute(log, HtmlName::kId, "ps-progress-log");
      driver()->AddAttribute(log, HtmlName::kClass, "psProgressLog");
      driver()->AppendChild(scrim, log);
    }
  } else {
    MobileRole::Level element_role = GetMobileRole(element);
    if (element_role != MobileRole::kInvalid) {
      if (keeper_element_depth_ == 0) {
        LogEncounteredBlock(element_role);
      }
      if (element_role == MobileRole::kKeeper) {
        ++keeper_element_depth_;
      }
    }
  }
}

void MobilizeRewriteFilter::AddStaticScript(StringPiece script) {
  // TODO(jmarantz): Consider using CommonFilter::InsertNodeAtBodyEnd.
  // TODO(jmarantz): Integrate with StaticAssetManager.
  GoogleString script_path = StrCat(static_file_prefix_, script);
  driver()->InsertScriptBeforeCurrent(script_path, true);
}

void MobilizeRewriteFilter::EndElementImpl(HtmlElement* element) {
  HtmlName::Keyword keyword = element->keyword();

  if (keyword == HtmlName::kScript) {
    in_script_ = false;
  }

  if (keyword == HtmlName::kBody) {
    --body_element_depth_;
    if (body_element_depth_ == 0) {
      if (!added_mob_js_) {
        added_mob_js_ = true;
        if (use_static_) {
          // If we had layout enabled we would have added base.js earlier
          // before hijacking XHR.  But we'll still need base.js event if
          // we are not doing layout -- but we don't need it blocking in
          // the head.
          if (!use_js_layout_) {
            AddStaticScript("goog/base.js");
          }

          AddStaticScript("mobilize_util.js");
          AddStaticScript("mobilize_color.js");
          AddStaticScript("mobilize_dialer.js");
          AddStaticScript("mobilize_logo.js");
          AddStaticScript("mobilize_theme.js");
          AddStaticScript("mobilize_layout.js");
          AddStaticScript("mobilize_nav.js");
          AddStaticScript("mobilize.js");
        } else {
          StaticAssetManager* manager =
              driver()->server_context()->static_asset_manager();
          StringPiece js = manager->GetAssetUrl(
              StaticAssetEnum::MOBILIZE_JS, driver()->options());
          driver()->InsertScriptBeforeCurrent(js, true);
        }
      }
      reached_reorder_containers_ = false;
    }
  } else if (body_element_depth_ == 0 && keyword == HtmlName::kHead) {
    // TODO(jmarantz): this uses AppendChild, but probably should use
    // InsertBeforeCurrent to make it work with flush windows.
    AddStyle(element);

    // TODO(jmarantz): if we want to debug with Closure constructs, uncomment:
    // HtmlElement* script_element =
    //     driver()->NewElement(element, HtmlName::kScript);
    // driver()->AppendChild(element, script_element);
    // driver()->AddAttribute(script_element, HtmlName::kSrc,
    //                        StrCat(static_file_prefix_, "closure/base.js"));
  } else if (keeper_element_depth_ > 0) {
    MobileRole::Level element_role = GetMobileRole(element);
    if (element_role == MobileRole::kKeeper) {
      --keeper_element_depth_;
    }
  }
}

void MobilizeRewriteFilter::Characters(HtmlCharactersNode* characters) {
  if (in_script_) {
    // This is a temporary hack for removing a SPOF from
    // http://www.cardpersonalizzate.it/, whose reference
    // to a file in e.mouseflow.com hangs and stops the
    // browser from making progress.
    GoogleString* contents = characters->mutable_contents();
    if (contents->find("//e.mouseflow.com/projects") != GoogleString::npos) {
      *contents = StrCat("/*", *contents, "*/");
    }
  }
}

void MobilizeRewriteFilter::AppendStylesheet(const StringPiece& css_file_name,
                                             StaticAssetEnum::StaticAsset asset,
                                             HtmlElement* element) {
  HtmlElement* link = driver()->NewElement(element, HtmlName::kLink);
  driver()->AppendChild(element, link);
  driver()->AddAttribute(link, HtmlName::kRel, "stylesheet");
  if (use_static_) {
    driver()->AddAttribute(link, HtmlName::kHref, StrCat(static_file_prefix_,
                                                         css_file_name));
  } else {
    StaticAssetManager* manager =
        driver()->server_context()->static_asset_manager();
    StringPiece css = manager->GetAssetUrl(asset, driver()->options());
    driver()->AddAttribute(link, HtmlName::kHref, css);
  }
}

void MobilizeRewriteFilter::AddStyle(HtmlElement* element) {
  if (!added_style_) {
    added_style_ = true;
    AppendStylesheet("mobilize.css", StaticAssetEnum::MOBILIZE_CSS, element);
    if (use_js_layout_) {
      AppendStylesheet("mobilize_layout.css",
                       StaticAssetEnum::MOBILIZE_LAYOUT_CSS, element);
    }
  }
}

MobileRole::Level MobilizeRewriteFilter::GetMobileRole(
    HtmlElement* element) {
  HtmlElement::Attribute* mobile_role_attribute =
      element->FindAttribute(HtmlName::kDataMobileRole);
  if (mobile_role_attribute) {
    return MobileRoleData::LevelFromString(
        mobile_role_attribute->escaped_value());
  } else {
    if (MobilizeFilterBase::IsKeeperTag(element->keyword())) {
      return MobileRole::kKeeper;
    }
    return MobileRole::kInvalid;
  }
}

bool MobilizeRewriteFilter::CheckForKeyword(
    const HtmlName::Keyword* sorted_list, int len, HtmlName::Keyword keyword) {
  return std::binary_search(sorted_list, sorted_list+len, keyword);
}

void MobilizeRewriteFilter::LogEncounteredBlock(MobileRole::Level level) {
  switch (level) {
    case MobileRole::kKeeper:
      num_keeper_blocks_->Add(1);
      break;
    case MobileRole::kHeader:
      num_header_blocks_->Add(1);
      break;
    case MobileRole::kNavigational:
      num_navigational_blocks_->Add(1);
      break;
    case MobileRole::kContent:
      num_content_blocks_->Add(1);
      break;
    case MobileRole::kMarginal:
      num_marginal_blocks_->Add(1);
      break;
    case MobileRole::kInvalid:
    case MobileRole::kUnassigned:
      // Should not happen.
      LOG(DFATAL) << "Attepted to move kInvalid or kUnassigned element";
      break;
  }
}

}  // namespace net_instaweb
