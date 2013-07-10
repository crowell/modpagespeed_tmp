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

#include "net/instaweb/rewriter/public/rewrite_options.h"

#include <algorithm>
#include <cstddef>
#include <set>
#include <utility>

#include "base/logging.h"
#include "net/instaweb/http/public/request_headers.h"
#include "net/instaweb/http/public/semantic_type.h"
#include "net/instaweb/rewriter/public/domain_lawyer.h"
#include "net/instaweb/rewriter/public/experiment_util.h"
#include "net/instaweb/rewriter/public/file_load_policy.h"
#include "net/instaweb/util/public/abstract_mutex.h"
#include "net/instaweb/util/public/basictypes.h"
#include "net/instaweb/util/public/dynamic_annotations.h"  // RunningOnValgrind
#include "net/instaweb/util/public/google_url.h"
#include "net/instaweb/util/public/hasher.h"
#include "net/instaweb/util/public/message_handler.h"
#include "net/instaweb/util/public/null_rw_lock.h"
#include "net/instaweb/util/public/stl_util.h"
#include "net/instaweb/util/public/string.h"
#include "net/instaweb/util/public/timer.h"
#include "pagespeed/kernel/base/rde_hash_map.h"

namespace net_instaweb {

// Option names.
// TODO(matterbury): Evaluate these filters to check which ones aren't global,
// rather are (say) Apache specific, and move them out.
const char RewriteOptions::kAddOptionsToUrls[] = "AddOptionsToUrls";
const char RewriteOptions::kAccessControlAllowOrigins[] =
    "AccessControlAllowOrigins";
const char RewriteOptions::kAllowLoggingUrlsInLogRecord[] =
    "AllowLoggingUrlsInLogRecord";
const char RewriteOptions::kAlwaysRewriteCss[] = "AlwaysRewriteCss";
const char RewriteOptions::kAnalyticsID[] = "AnalyticsID";
const char RewriteOptions::kAvoidRenamingIntrospectiveJavascript[] =
    "AvoidRenamingIntrospectiveJavascript";
const char RewriteOptions::kBeaconReinstrumentTimeSec[] =
    "BeaconReinstrumentTimeSec";
const char RewriteOptions::kBeaconUrl[] = "BeaconUrl";
const char RewriteOptions::kBlinkMaxHtmlSizeRewritable[] =
    "BlinkMaxHtmlSizeRewritable";
const char RewriteOptions::kCacheInvalidationTimestamp[] =
    "CacheInvalidationTimestamp";
const char RewriteOptions::kCacheSmallImagesUnrewritten[] =
    "CacheSmallImagesUnrewritten";
const char RewriteOptions::kClientDomainRewrite[] = "ClientDomainRewrite";
const char RewriteOptions::kCombineAcrossPaths[] = "CombineAcrossPaths";
const char RewriteOptions::kCompressMetadataCache[] = "CompressMetadataCache";
const char RewriteOptions::kCriticalImagesBeaconEnabled[] =
    "CriticalImagesBeaconEnabled";
const char RewriteOptions::kCriticalLineConfig[] = "CriticalLineConfig";
const char RewriteOptions::kCssFlattenMaxBytes[] = "CssFlattenMaxBytes";
const char RewriteOptions::kCssImageInlineMaxBytes[] = "CssImageInlineMaxBytes";
const char RewriteOptions::kCssInlineMaxBytes[] = "CssInlineMaxBytes";
const char RewriteOptions::kCssOutlineMinBytes[] = "CssOutlineMinBytes";
const char RewriteOptions::kCssPreserveURLs[] = "CssPreserveURLs";
const char RewriteOptions::kDefaultCacheHtml[] = "DefaultCacheHtml";
const char RewriteOptions::kDisableRewriteOnNoTransform[] =
    "DisableRewriteOnNoTransform";
const char RewriteOptions::kDistributedRewriteKey[] = "DistributedRewriteKey";
const char RewriteOptions::kDistributedRewriteServers[] =
    "DistributedRewriteServers";
const char RewriteOptions::kDistributedRewriteTimeoutMs[] =
    "DistributedRewriteTimeoutMs";
const char RewriteOptions::kDomainRewriteHyperlinks[] =
    "DomainRewriteHyperlinks";
const char RewriteOptions::kDomainShardCount[] = "DomainShardCount";
const char RewriteOptions::kDownstreamCachePurgeMethod[] =
    "DownstreamCachePurgeMethod";
const char RewriteOptions::kDownstreamCacheRewrittenPercentageThreshold[] =
    "DownstreamCacheRewrittenPercentageThreshold";
const char RewriteOptions::kEnableAggressiveRewritersForMobile[] =
    "EnableAggressiveRewritersForMobile";
const char RewriteOptions::kEnableBlinkHtmlChangeDetection[] =
    "EnableBlinkHtmlChangeDetection";
const char RewriteOptions::kEnableBlinkHtmlChangeDetectionLogging[] =
    "EnableBlinkHtmlChangeDetectionLogging";
const char RewriteOptions::kEnableDeferJsExperimental[] =
    "EnableDeferJsExperimental";
const char RewriteOptions::kEnableCachePurge[] = "EnableCachePurge";
const char RewriteOptions::kEnableFlushEarlyCriticalCss[] =
    "EnableFlushEarlyCriticalCss";
const char RewriteOptions::kEnableFixReflow[] = "EnableFixReflow";
const char RewriteOptions::kEnableExtendedInstrumentation[] =
    "EnableExtendedInstrumentation";
const char RewriteOptions::kEnableLazyLoadHighResImages[] =
    "EnableLazyLoadHighResImages";
const char RewriteOptions::kEnablePrioritizingScripts[] =
    "EnablePrioritizingScripts";
const char RewriteOptions::kEnabled[] = "EnableRewriting";
const char RewriteOptions::kExperimentCookieDurationMs[] =
    "ExperimentCookieDurationMs";
const char RewriteOptions::kExperimentSlot[] = "ExperimentSlot";
const char RewriteOptions::kFetcherProxy[] = "FetchProxy";
const char RewriteOptions::kFinderPropertiesCacheExpirationTimeMs[] =
    "FinderPropertiesCacheExpirationTimeMs";
const char RewriteOptions::kFinderPropertiesCacheRefreshTimeMs[] =
    "FinderPropertiesCacheRefreshTimeMs";
const char RewriteOptions::kFlushBufferLimitBytes[] = "FlushBufferLimitBytes";
const char RewriteOptions::kFlushHtml[] = "FlushHtml";
const char RewriteOptions::kFlushMoreResourcesEarlyIfTimePermits[] =
    "FlushMoreResourcesEarlyIfTimePermits";
const char RewriteOptions::kForbidAllDisabledFilters[] =
    "ForbidAllDisabledFilters";
const char RewriteOptions::kHideRefererUsingMeta[] = "HideRefererUsingMeta";
const char RewriteOptions::kIdleFlushTimeMs[] = "IdleFlushTimeMs";
const char RewriteOptions::kImageInlineMaxBytes[] = "ImageInlineMaxBytes";
const char RewriteOptions::kImageJpegNumProgressiveScans[] =
    "ImageJpegNumProgressiveScans";
const char RewriteOptions::kImageJpegNumProgressiveScansForSmallScreens[] =
    "ImageJpegNumProgressiveScansForSmallScreens";
const char RewriteOptions::kImageJpegRecompressionQuality[] =
    "JpegRecompressionQuality";
const char RewriteOptions::kImageJpegRecompressionQualityForSmallScreens[] =
    "JpegRecompressionQualityForSmallScreens";
const char RewriteOptions::kImageLimitOptimizedPercent[] =
    "ImageLimitOptimizedPercent";
const char RewriteOptions::kImageLimitRenderedAreaPercent[] =
    "ImageLimitRenderedAreaPercent";
const char RewriteOptions::kImageLimitResizeAreaPercent[] =
    "ImageLimitResizeAreaPercent";
const char RewriteOptions::kImageMaxRewritesAtOnce[] = "ImageMaxRewritesAtOnce";
const char RewriteOptions::kImagePreserveURLs[] = "ImagePreserveURLs";
const char RewriteOptions::kImageRecompressionQuality[] =
    "ImageRecompressionQuality";
const char RewriteOptions::kImageResolutionLimitBytes[] =
    "ImageResolutionLimitBytes";
const char RewriteOptions::kImageWebpRecompressionQuality[] =
    "ImageWebpRecompressionQuality";
const char RewriteOptions::kImageWebpRecompressionQualityForSmallScreens[] =
    "ImageWebpRecompressionQualityForSmallScreens";
const char RewriteOptions::kImageWebpTimeoutMs[] = "ImageWebpTimeoutMs";
const char RewriteOptions::kImplicitCacheTtlMs[] = "ImplicitCacheTtlMs";
const char RewriteOptions::kInPlaceResourceOptimization[] =
    "InPlaceResourceOptimization";
const char RewriteOptions::kInPlaceWaitForOptimized[] =
    "InPlaceWaitForOptimized";
const char RewriteOptions::kInPlacePreemptiveRewriteCss[] =
    "InPlacePreemptiveRewriteCss";
const char RewriteOptions::kInPlacePreemptiveRewriteCssImages[] =
    "InPlacePreemptiveRewriteCssImages";
const char RewriteOptions::kInPlacePreemptiveRewriteImages[] =
    "InPlacePreemptiveRewriteImages";
const char RewriteOptions::kInPlacePreemptiveRewriteJavascript[] =
    "InPlacePreemptiveRewriteJavascript";
const char RewriteOptions::kInPlaceRewriteDeadlineMs[] =
    "InPlaceRewriteDeadlineMs";
const char RewriteOptions::kIncreaseSpeedTracking[] = "IncreaseSpeedTracking";
const char RewriteOptions::kInlineOnlyCriticalImages[] =
    "InlineOnlyCriticalImages";
const char RewriteOptions::kJsInlineMaxBytes[] = "JsInlineMaxBytes";
const char RewriteOptions::kJsOutlineMinBytes[] = "JsOutlineMinBytes";
const char RewriteOptions::kJsPreserveURLs[] = "JsPreserveURLs";
const char RewriteOptions::kLazyloadImagesAfterOnload[] =
    "LazyloadImagesAfterOnload";
const char RewriteOptions::kLazyloadImagesBlankUrl[] = "LazyloadImagesBlankUrl";
const char RewriteOptions::kLogBackgroundRewrite[] = "LogBackgroundRewrite";
const char RewriteOptions::kLogRewriteTiming[] = "LogRewriteTiming";
const char RewriteOptions::kLogUrlIndices[] = "LogUrlIndices";
const char RewriteOptions::kLowercaseHtmlNames[] = "LowercaseHtmlNames";
const char RewriteOptions::kMaxCacheableResponseContentLength[] =
    "MaxCacheableContentLength";
const char RewriteOptions::kMaxCombinedJsBytes[] = "MaxCombinedJsBytes";
const char RewriteOptions::kMaxHtmlCacheTimeMs[] = "MaxHtmlCacheTimeMs";
const char RewriteOptions::kMaxHtmlParseBytes[] = "MaxHtmlParseBytes";
const char RewriteOptions::kMaxImageBytesForWebpInCss[] =
    "MaxImageBytesForWebpInCss";
const char RewriteOptions::kMaxImageSizeLowResolutionBytes[] =
    "MaxImageSizeLowResolutionBytes";
const char RewriteOptions::kMaxInlinedPreviewImagesIndex[] =
    "MaxInlinedPreviewImagesIndex";
const char RewriteOptions::kMaxPrefetchJsElements[] = "MaxPrefetchJsElements";
const char RewriteOptions::kMaxRewriteInfoLogSize[] = "MaxRewriteInfoLogSize";
const char RewriteOptions::kMaxUrlSegmentSize[] = "MaxSegmentLength";
const char RewriteOptions::kMaxUrlSize[] = "MaxUrlSize";
const char RewriteOptions::kMetadataCacheStalenessThresholdMs[] =
    "MetadataCacheStalenessThresholdMs";
const char RewriteOptions::kMinImageSizeLowResolutionBytes[] =
    "MinImageSizeLowResolutionBytes";
const char RewriteOptions::kMinResourceCacheTimeToRewriteMs[] =
    "MinResourceCacheTimeToRewriteMs";
const char RewriteOptions::kModifyCachingHeaders[] = "ModifyCachingHeaders";
const char RewriteOptions::kNonCacheablesForCachePartialHtml[] =
    "NonCacheablesForCachePartialHtml";
const char RewriteOptions::kObliviousPagespeedUrls[] = "ObliviousPagespeedUrls";
const char RewriteOptions::kOverrideCachingTtlMs[] = "OverrideCachingTtlMs";
const char RewriteOptions::kPersistBlinkBlacklist[] = "PersistBlinkBlacklist";
const char RewriteOptions::kProactivelyFreshenUserFacingRequest[] =
    "ProactivelyFreshenUserFacingRequest";
const char RewriteOptions::kProgressiveJpegMinBytes[] =
    "ProgressiveJpegMinBytes";
const char RewriteOptions::kRejectBlacklisted[] = "RejectBlacklisted";
const char RewriteOptions::kRejectBlacklistedStatusCode[] =
    "RejectBlacklistedStatusCode";
const char RewriteOptions::kReportUnloadTime[] = "ReportUnloadTime";
const char RewriteOptions::kRespectVary[] = "RespectVary";
const char RewriteOptions::kRespectXForwardedProto[] = "RespectXForwardedProto";
const char RewriteOptions::kRewriteDeadlineMs[] = "RewriteDeadlinePerFlushMs";
const char RewriteOptions::kRewriteLevel[] = "RewriteLevel";
const char RewriteOptions::kRewriteRandomDropPercentage[] =
    "RewriteRandomDropPercentage";
const char RewriteOptions::kRewriteUncacheableResources[] =
    "RewriteUncacheableResources";
const char RewriteOptions::kRewriteRequestUrlsEarly[] =
    "RewriteRequestUrlsEarly";
const char RewriteOptions::kRunningExperiment[] = "RunExperiment";
const char RewriteOptions::kServeGhostClickBusterWithSplitHtml[] =
    "ServeGhostClickBusterWithSplitHtml";
const char RewriteOptions::kServeSplitHtmlInTwoChunks[] =
    "ServeSplitHtmlInTwoChunks";
const char RewriteOptions::kServeStaleIfFetchError[] = "ServeStaleIfFetchError";
const char RewriteOptions::kServeStaleWhileRevalidateThresholdSec[] =
    "ServeStaleWhileRevalidateThresholdSec";
const char RewriteOptions::kServeXhrAccessControlHeaders[] =
    "ServeXhrAccessControlHeaders";
const char RewriteOptions::kSupportNoScriptEnabled[] = "SupportNoScriptEnabled";
const char
    RewriteOptions::kTestOnlyPrioritizeCriticalCssDontApplyOriginalCss[] =
    "TestOnlyPrioritizeCriticalCssDontApplyOriginalCss";
const char RewriteOptions::kUseBlankImageForInlinePreview[] =
    "UseBlankImageForInlinePreview";
const char RewriteOptions::kUseFallbackPropertyCacheValues[] =
    "UseFallbackPropertyCacheValues";
const char RewriteOptions::kUseSmartDiffInBlink[] = "UseSmartDiffInBlink";
const char RewriteOptions::kXModPagespeedHeaderValue[] =
    "XHeaderValue";
const char RewriteOptions::kXPsaBlockingRewrite[] = "BlockingRewriteKey";
const char RewriteOptions::kAllow[] = "Allow";
const char RewriteOptions::kBlockingRewriteRefererUrls[] =
    "BlockingRewriteRefererUrls";
const char RewriteOptions::kDisableFilters[] = "DisableFilters";
const char RewriteOptions::kDisallow[] = "Disallow";
const char RewriteOptions::kDistributableFilters[] = "DistributableFilters";
const char RewriteOptions::kDomain[] = "Domain";
const char RewriteOptions::kDownstreamCachePurgeLocationPrefix[] =
    "DownstreamCachePurgeLocationPrefix";
const char RewriteOptions::kEnableFilters[] = "EnableFilters";
const char RewriteOptions::kExperimentVariable[] = "ExperimentVariable";
const char RewriteOptions::kExperimentSpec[] = "ExperimentSpec";
const char RewriteOptions::kForbidFilters[] = "ForbidFilters";
const char RewriteOptions::kRetainComment[] = "RetainComment";
const char RewriteOptions::kCustomFetchHeader[] = "CustomFetchHeader";
const char RewriteOptions::kLoadFromFile[] = "LoadFromFile";
const char RewriteOptions::kLoadFromFileMatch[] = "LoadFromFileMatch";
const char RewriteOptions::kLoadFromFileRule[] = "LoadFromFileRule";
const char RewriteOptions::kLoadFromFileRuleMatch[] = "LoadFromFileRuleMatch";
const char RewriteOptions::kMapOriginDomain[] = "MapOriginDomain";
const char RewriteOptions::kMapRewriteDomain[] = "MapRewriteDomain";
const char RewriteOptions::kMapProxyDomain[] = "MapProxyDomain";
const char RewriteOptions::kShardDomain[] = "ShardDomain";
const char RewriteOptions::kUrlValuedAttribute[] = "UrlValuedAttribute";
const char RewriteOptions::kLibrary[] = "Library";
const char RewriteOptions::kCacheFlushFilename[] = "CacheFlushFilename";
const char RewriteOptions::kCacheFlushPollIntervalSec[] =
    "CacheFlushPollIntervalSec";
const char RewriteOptions::kExperimentalFetchFromModSpdy[] =
    "ExperimentalFetchFromModSpdy";
const char RewriteOptions::kFetchHttps[] = "FetchHttps";
const char RewriteOptions::kFetcherTimeOutMs[] = "FetcherTimeOutMs";
const char RewriteOptions::kFileCacheCleanInodeLimit[] =
    "FileCacheInodeLimit";
const char RewriteOptions::kFileCacheCleanIntervalMs[] =
    "FileCacheCleanIntervalMs";
const char RewriteOptions::kFileCacheCleanSizeKb[] = "FileCacheSizeKb";
const char RewriteOptions::kFileCachePath[] = "FileCachePath";
const char RewriteOptions::kLogDir[] = "LogDir";
const char RewriteOptions::kLruCacheByteLimit[] = "LRUCacheByteLimit";
const char RewriteOptions::kLruCacheKbPerProcess[] = "LRUCacheKbPerProcess";
const char RewriteOptions::kMemcachedServers[] = "MemcachedServers";
const char RewriteOptions::kMemcachedThreads[] = "MemcachedThreads";
const char RewriteOptions::kMemcachedTimeoutUs[] = "MemcachedTimeoutUs";
const char RewriteOptions::kRateLimitBackgroundFetches[] =
    "RateLimitBackgroundFetches";
const char RewriteOptions::kSlurpDirectory[] = "SlurpDirectory";
const char RewriteOptions::kSlurpFlushLimit[] = "SlurpFlushLimit";
const char RewriteOptions::kSlurpReadOnly[] = "SlurpReadOnly";
const char RewriteOptions::kSslCertDirectory[] = "SslCertDirectory";
const char RewriteOptions::kSslCertFile[] = "SslCertFile";
const char RewriteOptions::kStatisticsEnabled[] = "Statistics";
const char RewriteOptions::kStatisticsHandlerPath[] = "StatisticsHandlerPath";
const char RewriteOptions::kStatisticsLoggingChartsCSS[] =
    "StatisticsLoggingChartsCSS";
const char RewriteOptions::kStatisticsLoggingChartsJS[] =
    "StatisticsLoggingChartsJS";
const char RewriteOptions::kStatisticsLoggingEnabled[] =
    "StatisticsLogging";
const char RewriteOptions::kStatisticsLoggingIntervalMs[] =
    "StatisticsLoggingIntervalMs";
const char RewriteOptions::kStatisticsLoggingMaxFileSizeKb[] =
    "StatisticsLoggingMaxFileSizeKb";
const char RewriteOptions::kTestProxy[] = "TestProxy";
const char RewriteOptions::kTestProxySlurp[] = "TestProxySlurp";
const char RewriteOptions::kUseSharedMemLocking[] = "SharedMemoryLocks";
const char RewriteOptions::kNullOption[] = "";

// RewriteFilter prefixes
const char RewriteOptions::kCacheExtenderId[] = "ce";
const char RewriteOptions::kCollectFlushEarlyContentFilterId[] = "fe";
const char RewriteOptions::kCssCombinerId[] = "cc";
const char RewriteOptions::kCssFilterId[] = "cf";
const char RewriteOptions::kCssImportFlattenerId[] = "if";
const char RewriteOptions::kCssInlineId[] = "ci";
const char RewriteOptions::kImageCombineId[] = "is";
const char RewriteOptions::kImageCompressionId[] = "ic";
const char RewriteOptions::kInPlaceRewriteId[] = "aj";  // Comes from ajax.
const char RewriteOptions::kJavascriptCombinerId[] = "jc";
const char RewriteOptions::kJavascriptMinId[] = "jm";
const char RewriteOptions::kJavascriptInlineId[] = "ji";
const char RewriteOptions::kLocalStorageCacheId[] = "ls";
const char RewriteOptions::kPanelCommentPrefix[] = "GooglePanel";
const char RewriteOptions::kPrioritizeCriticalCssId[] = "pr";

// Sets limit for buffering html in blink secondary fetch to 10MB default.
const int64 RewriteOptions::kDefaultBlinkMaxHtmlSizeRewritable =
    10 * 1024 * 1024;

// TODO(jmarantz): consider merging this threshold with the image-inlining
// threshold, which is currently defaulting at 2000, so we have a single
// byte-count threshold, above which inlined resources get outlined, and
// below which outlined resources get inlined.
//
// TODO(jmarantz): user-agent-specific selection of inline threshold so that
// mobile phones are more prone to inlining.
//
// Further notes; jmaessen says:
//
// I suspect we do not want these bounds to match, and inlining for
// images is a bit more complicated because base64 encoding inflates
// the byte count of data: urls.  This is a non-issue for other
// resources (there may be some weirdness with iframes I haven't
// thought about...).
//
// jmarantz says:
//
// One thing we could do, if we believe they should be conceptually
// merged, is in image_rewrite_filter you could apply the
// base64-bloat-factor before comparing against the threshold.  Then
// we could use one number if we like that idea.
//
// jmaessen: For the moment, there's a separate threshold for image inline.
const int64 RewriteOptions::kDefaultCssInlineMaxBytes = 2048;
const int64 RewriteOptions::kDefaultCssFlattenMaxBytes = 2048;
const int64 RewriteOptions::kDefaultCssImageInlineMaxBytes = 0;
const int64 RewriteOptions::kDefaultCssOutlineMinBytes = 3000;
const int64 RewriteOptions::kDefaultImageInlineMaxBytes = 3072;
const int64 RewriteOptions::kDefaultJsInlineMaxBytes = 2048;
const int64 RewriteOptions::kDefaultJsOutlineMinBytes = 3000;
const int64 RewriteOptions::kDefaultProgressiveJpegMinBytes = 10240;

const int64 RewriteOptions::kDefaultMaxHtmlCacheTimeMs = 0;
const int64 RewriteOptions::kDefaultMaxHtmlParseBytes = -1;
const int64 RewriteOptions::kDefaultMaxImageBytesForWebpInCss = kint64max;

const int64 RewriteOptions::kDefaultMinResourceCacheTimeToRewriteMs = 0;

const int64 RewriteOptions::kDefaultCacheInvalidationTimestamp = -1;
const int64 RewriteOptions::kDefaultFlushBufferLimitBytes = 100 * 1024;
const int64 RewriteOptions::kDefaultIdleFlushTimeMs = 10;
const int64 RewriteOptions::kDefaultImplicitCacheTtlMs = 5 * Timer::kMinuteMs;
const int64 RewriteOptions::kDefaultMetadataInputErrorsCacheTtlMs =
    5 * Timer::kMinuteMs;

const int64 RewriteOptions::kDefaultPrioritizeVisibleContentCacheTimeMs =
    30 * Timer::kMinuteMs;  // 30 mins.

// Limit on concurrent ongoing image rewrites.
// TODO(jmaessen): Determine a sane default for this value.
const int RewriteOptions::kDefaultImageMaxRewritesAtOnce = 8;

// IE limits URL size overall to about 2k characters.  See
// http://support.microsoft.com/kb/208427/EN-US
const int RewriteOptions::kDefaultMaxUrlSize = 2083;

// Quality that needs to be used while recompressing any image type.
// If set to -1, we use source image quality parameters, and is lossless.
const int64 RewriteOptions::kDefaultImageRecompressQuality = 85;

// Jpeg quality that needs to be used while recompressing. If set to -1, we
// use the value of image_recompress_quality.
const int64 RewriteOptions::kDefaultImageJpegRecompressQuality = -1;
const int64
RewriteOptions::kDefaultImageJpegRecompressQualityForSmallScreens = 70;

// Number of scans to output for jpeg images when using progressive mode. If set
// to -1, we retain all scans of a progressive jpeg.
const int64 RewriteOptions::kDefaultImageJpegNumProgressiveScans = -1;

// Percentage savings in order to retain rewritten images; these default
// to 100% so that we always attempt to resize downsized images, and
// unconditionally retain images if they save any bytes at all.
const int RewriteOptions::kDefaultImageLimitOptimizedPercent = 100;
const int RewriteOptions::kDefaultImageLimitResizeAreaPercent = 100;

// Percentage limit on image wxh reduction for the rendered dimensions to be
// stored in the property cache. This is kept at default 95 after
// some experiments."
const int RewriteOptions::kDefaultImageLimitRenderedAreaPercent = 95;

// Sets limit for image optimization to 32MB.
const int64 RewriteOptions::kDefaultImageResolutionLimitBytes = 32*1024*1024;

// WebP quality that needs to be used while recompressing. If set to -1, we
// use source image quality parameters.
const int64 RewriteOptions::kDefaultImageWebpRecompressQuality = 80;
const int64
RewriteOptions::kDefaultImageWebpRecompressQualityForSmallScreens = 70;

// Timeout, in ms, for all WebP conversion attempts for each source
// image. If negative, does not time out.
const int64 RewriteOptions::kDefaultImageWebpTimeoutMs = -1;

// Setting the maximum length for the cacheable response content to -1
// indicates that there is no size limit.
const int64 RewriteOptions::kDefaultMaxCacheableResponseContentLength = -1;

// See http://code.google.com/p/modpagespeed/issues/detail?id=9.  By
// default, Apache evidently limits each URL path segment (between /)
// to about 256 characters.  This is not a fundamental URL limitation
// but is Apache specific.  Ben Noordhuis has provided a workaround
// of hooking map_to_storage to skip the directory-mapping phase in
// Apache.  See http://code.google.com/p/modpagespeed/issues/detail?id=176
const int RewriteOptions::kDefaultMaxUrlSegmentSize = 1024;

// Maximum JS elements to prefetch early when defer JS filter is enabled.
const int RewriteOptions::kDefaultMaxPrefetchJsElements = 0;

#ifdef NDEBUG
const int RewriteOptions::kDefaultRewriteDeadlineMs = 10;
#else
const int RewriteOptions::kDefaultRewriteDeadlineMs = 20;
#endif
const int kValgrindWaitForRewriteMs = 1000;
const int64 RewriteOptions::kDefaultDistributedTimeoutMs = 60000;
const int RewriteOptions::kDefaultPropertyCacheHttpStatusStabilityThreshold = 5;

const int RewriteOptions::kDefaultMaxRewriteInfoLogSize = 150;

const char RewriteOptions::kDefaultBeaconUrl[] = "/mod_pagespeed_beacon";

const int RewriteOptions::kDefaultMaxInlinedPreviewImagesIndex = -1;
const int64 RewriteOptions::kDefaultMinImageSizeLowResolutionBytes = 3 * 1024;
const int64 RewriteOptions::kDefaultMaxImageSizeLowResolutionBytes =
    1 * 1024 * 1024;  // 1 MB.

// Setting the limit on combined js resource to -1 will bypass the size check.
const int64 RewriteOptions::kDefaultMaxCombinedJsBytes = -1;
const int64 RewriteOptions::kDefaultExperimentCookieDurationMs =
    Timer::kWeekMs;
const int64 RewriteOptions::kDefaultFinderPropertiesCacheExpirationTimeMs =
    2 * Timer::kHourMs;
const int64 RewriteOptions::kDefaultFinderPropertiesCacheRefreshTimeMs =
    (3 * Timer::kHourMs) / 2;
const int64 RewriteOptions::kDefaultMetadataCacheStalenessThresholdMs = 0;
const char RewriteOptions::kDefaultDownstreamCachePurgeMethod[] = "PURGE";
const int64
    RewriteOptions::kDefaultDownstreamCacheRewrittenPercentageThreshold = 95;
const int RewriteOptions::kDefaultExperimentTrafficPercent = 50;
const int RewriteOptions::kDefaultExperimentSlot = 1;

// An empty default key indicates that the blocking rewrite feature is disabled.
const char RewriteOptions::kDefaultBlockingRewriteKey[] = "";

const char RewriteOptions::kRejectedRequestUrlKeyName[] = "RejectedUrl";

// Allow all the declared shards.
const int RewriteOptions::kDefaultDomainShardCount = 0;

const int64 RewriteOptions::kDefaultBlinkHtmlChangeDetectionTimeMs =
    Timer::kMinuteMs;

// By default, reinstrument every 6 hours.
const int RewriteOptions::kDefaultBeaconReinstrumentTimeSec = 6 * 60 * 60;

const RewriteOptions::FilterEnumToIdAndNameEntry*
    RewriteOptions::filter_id_to_enum_array_[RewriteOptions::kEndOfFilters];

RewriteOptions::PropertyNameMap*
    RewriteOptions::option_name_to_property_map_ = NULL;

const RewriteOptions::PropertyBase**
    RewriteOptions::option_id_to_property_array_ = NULL;

RewriteOptions::Properties* RewriteOptions::properties_ = NULL;
RewriteOptions::Properties* RewriteOptions::all_properties_ = NULL;

namespace {

// When you change this, remember to update the documentation:
//    doc/en/speed/pagespeed/module/config_filters.html
// The documentation there includes the filter groups "rewrite_images" and
// "extend_cache" which expand to multiple filters, all of which need to be
// listed here.
const RewriteOptions::Filter kCoreFilterSet[] = {
  RewriteOptions::kAddHead,
  RewriteOptions::kCombineCss,
  RewriteOptions::kConvertGifToPng,                // rewrite_images
  RewriteOptions::kConvertJpegToProgressive,       // rewrite_images
  RewriteOptions::kConvertMetaTags,
  RewriteOptions::kConvertPngToJpeg,
  RewriteOptions::kExtendCacheCss,                 // extend_cache
  RewriteOptions::kExtendCacheImages,              // extend_cache
  RewriteOptions::kExtendCacheScripts,             // extend_cache
  RewriteOptions::kFallbackRewriteCssUrls,
  RewriteOptions::kFlattenCssImports,
  RewriteOptions::kInlineCss,
  RewriteOptions::kInlineImages,                   // rewrite_images
  RewriteOptions::kInlineImportToLink,
  RewriteOptions::kInlineJavascript,
  RewriteOptions::kJpegSubsampling,                // rewrite_images
  RewriteOptions::kRecompressJpeg,                 // rewrite_images
  RewriteOptions::kRecompressPng,                  // rewrite_images
  RewriteOptions::kRecompressWebp,                 // rewrite_images
  RewriteOptions::kResizeImages,                   // rewrite_images
  RewriteOptions::kRewriteCss,
  RewriteOptions::kRewriteJavascript,
  RewriteOptions::kRewriteStyleAttributesWithUrl,
  RewriteOptions::kStripImageColorProfile,         // rewrite_images
  RewriteOptions::kStripImageMetaData,             // rewrite_images
};

// Note: all Core filters are Test filters as well.  For maintainability,
// this is managed in the c++ switch statement.
const RewriteOptions::Filter kTestFilterSet[] = {
  RewriteOptions::kConvertJpegToWebp,
  RewriteOptions::kDebug,
  RewriteOptions::kInsertGA,
  RewriteOptions::kInsertImageDimensions,
  RewriteOptions::kLeftTrimUrls,
  RewriteOptions::kMakeGoogleAnalyticsAsync,
  RewriteOptions::kResizeToRenderedImageDimensions,
  RewriteOptions::kRewriteDomains,
  RewriteOptions::kSpriteImages,
};

// Note: These filters should not be included even if the level is "All".
const RewriteOptions::Filter kDangerousFilterSet[] = {
  RewriteOptions::kCachePartialHtml,
  RewriteOptions::kCanonicalizeJavascriptLibraries,
  RewriteOptions::kComputeVisibleText,  // internal, enabled conditionally
  RewriteOptions::kDeferIframe,
  RewriteOptions::kDeferJavascript,
  RewriteOptions::kDetectReflowWithDeferJavascript,  // internal,
                                                     // enabled conditionally
  RewriteOptions::kDeterministicJs,   // used for measurement
  RewriteOptions::kDisableJavascript,
  RewriteOptions::kDivStructure,
  RewriteOptions::kExplicitCloseTags,
  RewriteOptions::kLazyloadImages,
  RewriteOptions::kPrioritizeCriticalCss,
  RewriteOptions::kSplitHtml,  // internal, enabled conditionally
  RewriteOptions::kSplitHtmlHelper,  // internal, enabled conditionally
  RewriteOptions::kStripNonCacheable,  // internal, enabled conditionally
  RewriteOptions::kStripScripts,
};

// List of filters whose correct behavior requires script execution.
// NOTE: Modify the
// SupportNoscriptFilter::IsAnyFilterRequiringScriptExecutionEnabled() method
// if you update this list.
const RewriteOptions::Filter kRequiresScriptExecutionFilterSet[] = {
  RewriteOptions::kCachePartialHtml,
  RewriteOptions::kDedupInlinedImages,
  RewriteOptions::kDeferIframe,
  RewriteOptions::kDeferJavascript,
  RewriteOptions::kDelayImages,
  RewriteOptions::kDetectReflowWithDeferJavascript,
  RewriteOptions::kFlushSubresources,
  RewriteOptions::kLazyloadImages,
  RewriteOptions::kLocalStorageCache,
  RewriteOptions::kSplitHtml,
  // We do not include kPrioritizeVisibleContent since we do not want to attach
  // SupportNoscriptFilter in the case of blink pcache miss pass-through, since
  // this response will not have any custom script inserted.
  // Do the various critical css filters belong here?  Arguably not, since even
  // if we transform a page based on beacon results we'll enclose the necessary
  // in a noscript block and the page will still load / function normally.
};

// Array of mappings from Filter enum to corresponding filter id and name,
// used to map an enum value to id/name, and also used to initialize the
// reverse map from id to enum. Although the filter_enum field is not strictly
// necessary (because it equals the entry's index in the array), it is here so
// we can check during initialization that the array has been set up correctly.
//
// MUST be updated whenever a new Filter value is added and the new entry
// MUST be inserted in Filter enum order.
const RewriteOptions::FilterEnumToIdAndNameEntry
    kFilterVectorStaticInitializer[] = {
  { RewriteOptions::kAddBaseTag,
    "ab", "Add Base Tag" },
  { RewriteOptions::kAddHead,
    "ah", "Add Head" },
  { RewriteOptions::kAddInstrumentation,
    "ai", "Add Instrumentation" },
  { RewriteOptions::kComputeStatistics,
    "ca", "Compute HTML statistics" },
  { RewriteOptions::kCachePartialHtml,
    "ct", "Cache Partial Html" },
  { RewriteOptions::kCanonicalizeJavascriptLibraries,
    "ij", "Canonicalize Javascript library URLs" },
  { RewriteOptions::kCollapseWhitespace,
    "cw", "Collapse Whitespace" },
  { RewriteOptions::kCollectFlushEarlyContentFilter,
    RewriteOptions::kCollectFlushEarlyContentFilterId,
    "Collect Flush Early Content Filter" },
  { RewriteOptions::kCombineCss,
    RewriteOptions::kCssCombinerId, "Combine Css" },
  { RewriteOptions::kCombineHeads,
    "ch", "Combine Heads" },
  { RewriteOptions::kCombineJavascript,
    RewriteOptions::kJavascriptCombinerId, "Combine Javascript" },
  { RewriteOptions::kComputeCriticalCss,
    "bc", "Background Compute Critical css" },
  { RewriteOptions::kComputeVisibleText,
    "bp", "Computes visible text" },
  { RewriteOptions::kConvertGifToPng,
    "gp", "Convert Gif to Png" },
  { RewriteOptions::kConvertJpegToProgressive,
    "jp", "Convert Jpeg to Progressive" },
  { RewriteOptions::kConvertJpegToWebp,
    "jw", "Convert Jpeg To Webp" },
  { RewriteOptions::kConvertMetaTags,
    "mc", "Convert Meta Tags" },
  { RewriteOptions::kConvertPngToJpeg,
    "pj", "Convert Png to Jpeg" },
  { RewriteOptions::kConvertToWebpLossless,
    "ws", "When converting images to WebP, prefer lossless conversions" },
  { RewriteOptions::kDebug,
    "db", "Debug" },
  { RewriteOptions::kDecodeRewrittenUrls,
    "du", "Decode Rewritten URLs" },
  { RewriteOptions::kDedupInlinedImages,
    "dd", "Dedup Inlined Images" },
  { RewriteOptions::kDeferIframe,
    "df", "Defer Iframe" },
  { RewriteOptions::kDeferJavascript,
    "dj", "Defer Javascript" },
  { RewriteOptions::kDelayImages,
    "di", "Delay Images" },
  { RewriteOptions::kDetectReflowWithDeferJavascript,
    "dr", "Detect Reflow With Defer Javascript" },
  { RewriteOptions::kDeterministicJs,
    "mj", "Deterministic Js" },
  { RewriteOptions::kDisableJavascript,
    "jd", "Disables scripts by placing them inside noscript tags" },
  { RewriteOptions::kDivStructure,
    "ds", "Div Structure" },
  { RewriteOptions::kElideAttributes,
    "ea", "Elide Attributes" },
  { RewriteOptions::kExplicitCloseTags,
    "xc", "Explicit Close Tags" },
  { RewriteOptions::kExtendCacheCss,
    "ec", "Cache Extend Css" },
  { RewriteOptions::kExtendCacheImages,
    "ei", "Cache Extend Images" },
  { RewriteOptions::kExtendCachePdfs,
    "ep", "Cache Extend PDFs" },
  { RewriteOptions::kExtendCacheScripts,
    "es", "Cache Extend Scripts" },
  { RewriteOptions::kFallbackRewriteCssUrls,
    "fc", "Fallback Rewrite Css " },
  { RewriteOptions::kFlattenCssImports,
    RewriteOptions::kCssImportFlattenerId, "Flatten CSS Imports" },
  { RewriteOptions::kFlushSubresources,
    "fs", "Flush Subresources" },
  { RewriteOptions::kHandleNoscriptRedirect,
    "hn", "Handles Noscript Redirects" },
  { RewriteOptions::kHtmlWriterFilter,
    "hw", "Flushes html" },
  { RewriteOptions::kInlineCss,
    RewriteOptions::kCssInlineId, "Inline Css" },
  { RewriteOptions::kInlineImages,
    "ii", "Inline Images" },
  { RewriteOptions::kInlineImportToLink,
    "il", "Inline @import to Link" },
  { RewriteOptions::kInlineJavascript,
    RewriteOptions::kJavascriptInlineId, "Inline Javascript" },
  { RewriteOptions::kInPlaceOptimizeForBrowser,
    "io", "In-place optimize for browser" },
  { RewriteOptions::kInsertDnsPrefetch,
    "idp", "Insert DNS Prefetch" },
  { RewriteOptions::kInsertGA,
    "ig", "Insert Google Analytics" },
  { RewriteOptions::kInsertImageDimensions,
    "id", "Insert Image Dimensions" },
  { RewriteOptions::kJpegSubsampling,
    "js", "Jpeg Subsampling" },
  { RewriteOptions::kLazyloadImages,
    "ll", "Lazyload Images" },
  { RewriteOptions::kLeftTrimUrls,
    "tu", "Left Trim Urls" },
  { RewriteOptions::kLocalStorageCache,
    RewriteOptions::kLocalStorageCacheId, "Local Storage Cache" },
  { RewriteOptions::kMakeGoogleAnalyticsAsync,
    "ga", "Make Google Analytics Async" },
  { RewriteOptions::kMoveCssAboveScripts,
    "cj", "Move Css Above Scripts" },
  { RewriteOptions::kMoveCssToHead,
    "cm", "Move Css To Head" },
  { RewriteOptions::kOutlineCss,
    "co", "Outline Css" },
  { RewriteOptions::kOutlineJavascript,
    "jo", "Outline Javascript" },
  { RewriteOptions::kPedantic,
    "pc", "Add pedantic types" },
  { RewriteOptions::kPrioritizeCriticalCss,
    RewriteOptions::kPrioritizeCriticalCssId, "Prioritize Critical Css" },
  { RewriteOptions::kRecompressJpeg,
    "rj", "Recompress Jpeg" },
  { RewriteOptions::kRecompressPng,
    "rp", "Recompress Png" },
  { RewriteOptions::kRecompressWebp,
    "rw", "Recompress Webp" },
  { RewriteOptions::kRemoveComments,
    "rc", "Remove Comments" },
  { RewriteOptions::kRemoveQuotes,
    "rq", "Remove Quotes" },
  { RewriteOptions::kResizeImages,
    "ri", "Resize Images" },
  { RewriteOptions::kResizeMobileImages,
    "rm", "Resize Mobile Images" },
  { RewriteOptions::kResizeToRenderedImageDimensions,
    "ir", "Resize to Rendered Image Dimensions" },
  { RewriteOptions::kRewriteCss,
    RewriteOptions::kCssFilterId, "Rewrite Css" },
  { RewriteOptions::kRewriteDomains,
    "rd", "Rewrite Domains" },
  { RewriteOptions::kRewriteJavascript,
    RewriteOptions::kJavascriptMinId, "Rewrite Javascript" },
  { RewriteOptions::kRewriteStyleAttributes,
    "cs", "Rewrite Style Attributes" },
  { RewriteOptions::kRewriteStyleAttributesWithUrl,
    "cu", "Rewrite Style Attributes With Url" },
  { RewriteOptions::kSplitHtml,
    "sh", "Split Html" },
  { RewriteOptions::kSplitHtmlHelper,
    "se", "Split Html Helper" },
  { RewriteOptions::kSpriteImages,
    RewriteOptions::kImageCombineId, "Sprite Images" },
  { RewriteOptions::kSquashImagesForMobileScreen,
    "sq", "Squash Images for Mobile Screen" },
  { RewriteOptions::kStripImageColorProfile,
    "cp", "Strip Image Color Profiles" },
  { RewriteOptions::kStripImageMetaData,
    "md", "Strip Image Meta Data" },
  { RewriteOptions::kStripNonCacheable,
    "nc", "Strip Non Cacheable" },
  { RewriteOptions::kStripScripts,
    "ss", "Strip Scripts" },
};

const RewriteOptions::Filter kImagePreserveUrlForbiddenFilters[] = {
    // TODO(jkarlin): Remove kResizeImages from the forbid list and allow image
    // squashing prefetching in HTML path (but don't allow resizing based on
    // HTML attributes).
  RewriteOptions::kDelayImages,
  RewriteOptions::kExtendCacheImages,
  RewriteOptions::kInlineImages,
  RewriteOptions::kLazyloadImages,
  RewriteOptions::kSpriteImages
};

const RewriteOptions::Filter kJsPreserveUrlForbiddenFilters[] = {
  RewriteOptions::kCanonicalizeJavascriptLibraries,
  RewriteOptions::kCombineJavascript,
  RewriteOptions::kDeferJavascript,
  RewriteOptions::kExtendCacheScripts,
  RewriteOptions::kInlineJavascript,
  RewriteOptions::kOutlineJavascript
};

const RewriteOptions::Filter kCssPreserveUrlForbiddenFilters[] = {
  RewriteOptions::kCombineCss,
  RewriteOptions::kExtendCacheCss,
  RewriteOptions::kInlineCss,
  RewriteOptions::kInlineImportToLink,
  RewriteOptions::kLeftTrimUrls,
  RewriteOptions::kOutlineCss
};

#ifndef NDEBUG
void CheckFilterSetOrdering(const RewriteOptions::Filter* filters, int num) {
  for (int i = 1; i < num; ++i) {
    DCHECK_GT(filters[i], filters[i - 1]);
  }
}
#endif

bool IsInSet(const RewriteOptions::Filter* filters, int num,
             RewriteOptions::Filter filter) {
  const RewriteOptions::Filter* end = filters + num;
  return std::binary_search(filters, end, filter);
}

// Strips the "ets=" query param (if present) from the end of url and strips all
// query params from url and assigns to url_no_query_param.
void StripBeaconUrlQueryParam(GoogleString* url,
                              GoogleString* url_no_query_param) {
  if (StringPiece(*url).ends_with("ets=")) {
    // Strip the ? or & in front of ets= as well.
    int chars_to_strip = STATIC_STRLEN("ets=") + 1;
    url->resize(url->size() - chars_to_strip);
  }

  StringPieceVector url_split;
  SplitStringUsingSubstr(*url, "?", &url_split);
  url_split[0].CopyToString(url_no_query_param);
}

}  // namespace

const char* RewriteOptions::FilterName(Filter filter) {
  int i = static_cast<int>(filter);
  int n = arraysize(kFilterVectorStaticInitializer);
  if (i >= 0 && i < n) {
    return kFilterVectorStaticInitializer[i].filter_name;
  }
  LOG(DFATAL) << "Unknown filter: " << filter;
  return "Unknown Filter";
}

const char* RewriteOptions::FilterId(Filter filter) {
  int i = static_cast<int>(filter);
  int n = arraysize(kFilterVectorStaticInitializer);
  if (i >= 0 && i < n) {
    return kFilterVectorStaticInitializer[i].filter_id;
  }
  LOG(DFATAL) << "Unknown filter code: " << filter;
  return "UF";
}

int RewriteOptions::NumFilterIds() {
  return arraysize(kFilterVectorStaticInitializer);
}

bool RewriteOptions::ParseRewriteLevel(
    const StringPiece& in, RewriteLevel* out) {
  bool ret = false;
  if (in != NULL) {
    if (StringCaseEqual(in, "CoreFilters")) {
      *out = kCoreFilters;
      ret = true;
    } else if (StringCaseEqual(in, "PassThrough")) {
      *out = kPassThrough;
      ret = true;
    } else if (StringCaseEqual(in, "TestingCoreFilters")) {
      *out = kTestingCoreFilters;
      ret = true;
    } else if (StringCaseEqual(in, "AllFilters")) {
      *out = kAllFilters;
      ret = true;
    }
  }
  return ret;
}

bool RewriteOptions::ParseBeaconUrl(const StringPiece& in, BeaconUrl* out) {
  StringPieceVector urls;
  SplitStringPieceToVector(in, " ", &urls, true);

  if (urls.size() > 2 || urls.size() < 1) {
    return false;
  }
  urls[0].CopyToString(&out->http);
  if (urls.size() == 2) {
    urls[1].CopyToString(&out->https);
  } else if (urls[0].starts_with("http:")) {
    out->https.clear();
    StrAppend(&out->https, "https:", urls[0].substr(STATIC_STRLEN("http:")));
  } else {
    urls[0].CopyToString(&out->https);
  }

  // We used to require that the query param end with "ets=", but no longer
  // do, so strip it if it's present. We also assign http_in and https_in to the
  // beacon URL stripped of their query params, if any are present.
  StripBeaconUrlQueryParam(&out->http, &out->http_in);
  StripBeaconUrlQueryParam(&out->https, &out->https_in);

  return true;
}

bool RewriteOptions::ImageOptimizationEnabled() const {
  return (this->Enabled(RewriteOptions::kRecompressJpeg) ||
          this->Enabled(RewriteOptions::kRecompressPng) ||
          this->Enabled(RewriteOptions::kRecompressWebp) ||
          this->Enabled(RewriteOptions::kConvertGifToPng) ||
          this->Enabled(RewriteOptions::kConvertJpegToProgressive) ||
          this->Enabled(RewriteOptions::kConvertPngToJpeg) ||
          this->Enabled(RewriteOptions::kConvertJpegToWebp) ||
          this->Enabled(RewriteOptions::kConvertToWebpLossless));
}

RewriteOptions::RewriteOptions(ThreadSystem* thread_system)
    : modified_(false),
      frozen_(false),
      initialized_options_(0),
      options_uniqueness_checked_(false),
      need_to_store_experiment_data_(false),
      experiment_id_(experiment::kExperimentNotSet),
      experiment_percent_(0),
      hasher_(kHashBytes),
      thread_system_(thread_system) {
  url_cache_invalidation_map_.set_empty_key("");
  url_cache_invalidation_map_.set_deleted_key("-");

  DCHECK(properties_ != NULL)
      << "Call RewriteOptions::Initialize() before construction";

  // Sanity-checks -- will be active only when compiled for debug.
#ifndef NDEBUG
  CheckFilterSetOrdering(kCoreFilterSet, arraysize(kCoreFilterSet));
  CheckFilterSetOrdering(kTestFilterSet, arraysize(kTestFilterSet));
  CheckFilterSetOrdering(kDangerousFilterSet, arraysize(kDangerousFilterSet));

  // Ensure that all filters have unique IDs.
  StringSet id_set;
  for (int i = 0; i < static_cast<int>(kEndOfFilters); ++i) {
    Filter filter = static_cast<Filter>(i);
    const char* id = FilterId(filter);
    std::pair<StringSet::iterator, bool> insertion = id_set.insert(id);
    DCHECK(insertion.second) << "Duplicate RewriteOption filter id: " << id;
  }

  // We can't check options uniqueness until additional extra
  // options are added by subclasses.  We could do this in the
  // destructor I suppose, but we defer it till ComputeSignature.
#endif

  // TODO(jmarantz): make rewrite_deadline changeable from the Factory based on
  // the requirements of the testing system and the platform. This might also
  // want to change based on how many Flushes there are, as each Flush can
  // potentially add this much more latency.
  if (RunningOnValgrind()) {
    set_rewrite_deadline_ms(kValgrindWaitForRewriteMs);
    modified_ = false;
#ifndef NDEBUG
    last_thread_id_.reset();
#endif
  }

  InitializeOptions(properties_);

  // We need to exclude this test-only option from signature, since we may need
  // to change it in the middle of tests.
  test_instant_fetch_rewrite_deadline_.DoNotUseForSignatureComputation();

  // Enable HtmlWriterFilter by default.
  EnableFilter(kHtmlWriterFilter);
}

// static
void RewriteOptions::AddProperties() {
  // TODO(jmarantz): move the help text to #defines or maybe const char[] in
  // .h file so that rewrite_gflags.cc can reference the same strings in
  // DEFINE_xxx directives.
  //
  //
  // Note: there are two functions used for registering properties here,
  // AddBaseProperty() and AddRequestProperty().  AddRequestProperty()
  // is kind of a hack for stuffing request-specific data into the RewriteOption
  // object.  Those options should probably be changed to be fields in the
  // recently-added RequestContext.
  //
  // AddBaseProperty() is for user-settable options.  The last argument
  // is a help-string.  The presence of a help-string enables the option
  // for mod_pagespeed, and serves as the error message if there is a
  // syntax error specifying the option in pagespeed.conf.
  //
  // There are three sorts of options which pass in NULL for the help-string
  // 1. Options that should be enabled in mod_pagespeed but we haven't
  //    written the help-string or added HTML documentation yet.  These
  //    will be flagged with:
  //    // TODO(jmarantz): write help & doc for mod_pagespeed.
  // 2. Options which are experimental and temporary and are not ready for
  //    permanent support in mod_pagespeed.  These will be marked:
  //    // TODO(jmarantz): eliminate experiment or document.
  // 3. Options which are not applicable to mod_pagespeed, e.g. those that
  //    support features not yet in mod_pagespeed such as Blink, or have
  //    an alternate solution (populating the cache invalidation timestamp).
  //    These are marked as:
  //    // Not applicable for mod_pagespeed.
  // 4. Options which should be in mod_pagespeed but need a bit more
  //    implementation before they are ready.  Marked as:
  //    // TODO(jmarantz): implement for mod_pagespeed.
  AddBaseProperty(
      kPassThrough, &RewriteOptions::level_, "l", kRewriteLevel,
      kDirectoryScope,
      "Base level of rewriting (PassThrough, CoreFilters)");
  AddBaseProperty(
      kDefaultBlinkMaxHtmlSizeRewritable,
      &RewriteOptions::blink_max_html_size_rewritable_,
      "bmhsr", kBlinkMaxHtmlSizeRewritable,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.
  AddBaseProperty(
      kDefaultCssFlattenMaxBytes,
      &RewriteOptions::css_flatten_max_bytes_, "cf",
      kCssFlattenMaxBytes,
      kDirectoryScope,
      "Number of bytes below which stylesheets will be flattened.");
  AddBaseProperty(
      kDefaultCssImageInlineMaxBytes,
      &RewriteOptions::css_image_inline_max_bytes_,
      "cii", kCssImageInlineMaxBytes,
      kDirectoryScope,
      "Number of bytes below which CSS images will be inlined.");
  AddBaseProperty(
      kDefaultCssInlineMaxBytes,
      &RewriteOptions::css_inline_max_bytes_, "ci",
      kCssInlineMaxBytes,
      kDirectoryScope,
      "Number of bytes below which stylesheets will be inlined.");
  AddBaseProperty(
      kDefaultCssOutlineMinBytes,
      &RewriteOptions::css_outline_min_bytes_, "co",
      kCssOutlineMinBytes,
      kDirectoryScope,
      "Number of bytes above which inline CSS resources will be "
      "outlined.");
  AddBaseProperty(
      kDefaultImageInlineMaxBytes,
      &RewriteOptions::image_inline_max_bytes_, "ii",
      kImageInlineMaxBytes,
      kDirectoryScope,
      "Number of bytes below which images will be inlined.");
  AddBaseProperty(
      kDefaultJsInlineMaxBytes,
      &RewriteOptions::js_inline_max_bytes_, "ji",
      kJsInlineMaxBytes,
      kDirectoryScope,
      "Number of bytes below which javascript will be inlined.");
  AddBaseProperty(
      kDefaultJsOutlineMinBytes,
      &RewriteOptions::js_outline_min_bytes_, "jo",
      kJsOutlineMinBytes,
      kDirectoryScope,
      "Number of bytes above which inline Javascript resources will"
      "be outlined.");
  AddBaseProperty(
      kDefaultProgressiveJpegMinBytes,
      &RewriteOptions::progressive_jpeg_min_bytes_,
      "jp", kProgressiveJpegMinBytes,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultMaxCacheableResponseContentLength,
      &RewriteOptions::max_cacheable_response_content_length_, "rcl",
      kMaxCacheableResponseContentLength,
      kProcessScope,
      "Maximum length of a cacheable response content.");
  AddBaseProperty(
      kDefaultMaxHtmlCacheTimeMs,
      &RewriteOptions::max_html_cache_time_ms_, "hc",
      kMaxHtmlCacheTimeMs,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultMaxHtmlParseBytes,
      &RewriteOptions::max_html_parse_bytes_, "hpb",
      kMaxHtmlParseBytes,
      kDirectoryScope,  // TODO(jmarantz): switch to kProcessScope?
      "Maximum number of bytes of HTML that we parse, before "
      "redirecting to ?ModPagespeed=off");
  AddBaseProperty(
      kDefaultMaxImageBytesForWebpInCss,
      &RewriteOptions::max_image_bytes_for_webp_in_css_, "miwc",
      kMaxImageBytesForWebpInCss,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultMinResourceCacheTimeToRewriteMs,
      &RewriteOptions::min_resource_cache_time_to_rewrite_ms_, "rc",
      kMinResourceCacheTimeToRewriteMs,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultCacheInvalidationTimestamp,
      &RewriteOptions::cache_invalidation_timestamp_, "it",
      kCacheInvalidationTimestamp,
      kServerScope,
      NULL);  // Not applicable for mod_pagespeed.
  AddBaseProperty(
      false,
      &RewriteOptions::oblivious_pagespeed_urls_, "opu",
      kObliviousPagespeedUrls,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.
  AddBaseProperty(
      false,
      &RewriteOptions::rewrite_uncacheable_resources_, "rur",
      kRewriteUncacheableResources,
      kServerScope,
      "Allow optimization of uncacheable resources in the in-place rewriting"
      " mode.");
  AddBaseProperty(
      kDefaultIdleFlushTimeMs,
      &RewriteOptions::idle_flush_time_ms_, "if",
      kIdleFlushTimeMs,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): implement for mod_pagespeed.
  AddBaseProperty(
      kDefaultFlushBufferLimitBytes,
      &RewriteOptions::flush_buffer_limit_bytes_, "fbl",
      kFlushBufferLimitBytes,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): implement for mod_pagespeed.
  AddBaseProperty(
      kDefaultImplicitCacheTtlMs,
      &RewriteOptions::implicit_cache_ttl_ms_, "ict",
      kImplicitCacheTtlMs,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultImageMaxRewritesAtOnce,
      &RewriteOptions::image_max_rewrites_at_once_,
      "im", kImageMaxRewritesAtOnce,
      kProcessScope,
      "Set bound on number of images being rewritten at one time "
      "(0 = unbounded).");
  AddBaseProperty(
      kDefaultMaxUrlSegmentSize, &RewriteOptions::max_url_segment_size_,
      "uss", kMaxUrlSegmentSize,
      kDirectoryScope,
      "Maximum size of a URL segment.");
  AddBaseProperty(
      kDefaultMaxUrlSize, &RewriteOptions::max_url_size_, "us",
      kMaxUrlSize,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::forbid_all_disabled_filters_, "fadf",
      kForbidAllDisabledFilters,
      kDirectoryScope,
      "Prevents the use of disabled filters");
  AddBaseProperty(
      kDefaultRewriteDeadlineMs, &RewriteOptions::rewrite_deadline_ms_,
      "rdm", kRewriteDeadlineMs,
      kDirectoryScope,
      "Time to wait for resource optimization (per flush window) before"
      "falling back to the original resource for the request.");
  AddBaseProperty(
      kEnabledOn, &RewriteOptions::enabled_, "e", kEnabled,
      kDirectoryScope,
      NULL);  // initialized explicitly in mod_instaweb.cc.
  AddBaseProperty(
      false, &RewriteOptions::add_options_to_urls_, "aou",
      kAddOptionsToUrls,
      kDirectoryScope,
      "Add query-params with configuration adjustments to rewritten "
      "URLs.");
  AddBaseProperty(
      false, &RewriteOptions::in_place_rewriting_enabled_, "ipro",
      kInPlaceResourceOptimization,
      kDirectoryScope,
      "Allow rewriting resources even when they are "
      "fetched over non-pagespeed URLs.");
  AddBaseProperty(
      false, &RewriteOptions::in_place_wait_for_optimized_, "ipwo",
      kInPlaceWaitForOptimized,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultRewriteDeadlineMs,
      &RewriteOptions::in_place_rewrite_deadline_ms_, "iprdm",
      kInPlaceRewriteDeadlineMs,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      true, &RewriteOptions::in_place_preemptive_rewrite_css_,
      "ipprc", kInPlacePreemptiveRewriteCss,
      kDirectoryScope,
      "If set, issue preemptive rewrites of CSS on the HTML path when "
      "configured to use IPRO.");
  AddBaseProperty(
      true, &RewriteOptions::in_place_preemptive_rewrite_css_images_,
      "ipprci", kInPlacePreemptiveRewriteCssImages,
      kDirectoryScope,
      "If set, issue preemptive rewrites of CSS images on the IPRO "
      "serving path.");
  AddBaseProperty(
      true, &RewriteOptions::in_place_preemptive_rewrite_images_,
      "ippri", kInPlacePreemptiveRewriteImages,
      kDirectoryScope,
      "If set, issue preemptive rewrites of images on the HTML path "
      "when configured to use IPRO.");
  AddBaseProperty(
      true, &RewriteOptions::in_place_preemptive_rewrite_javascript_,
      "ipprj", kInPlacePreemptiveRewriteJavascript,
      kDirectoryScope,
      "If set, issue preemptive rewrites of JS on the HTML path when "
      "configured to use IPRO.");
  AddBaseProperty(
      true, &RewriteOptions::combine_across_paths_, "cp",
      kCombineAcrossPaths,
      kDirectoryScope,
      "Allow combining resources from different paths");
  AddBaseProperty(
      true, &RewriteOptions::critical_images_beacon_enabled_, "cibe",
      kCriticalImagesBeaconEnabled,
      kDirectoryScope, "Enable insertion of client-side critical "
      "image detection js for image optimization filters.");
  AddBaseProperty(
      false,
  &RewriteOptions::test_only_prioritize_critical_css_dont_apply_original_css_,
      "dlacae",
      kTestOnlyPrioritizeCriticalCssDontApplyOriginalCss,
      kDirectoryScope,
      "Stops the prioritize_critical_css filter from invoking its JavaScript "
      "that applies all the 'hidden' CSS at onload. Intended for testing.");
  AddBaseProperty(
      kDefaultBeaconReinstrumentTimeSec,
      &RewriteOptions::beacon_reinstrument_time_sec_, "brts",
      kBeaconReinstrumentTimeSec,
      kDirectoryScope,
      "How often (in seconds) to reinstrument pages with beacons.");
  AddBaseProperty(
      false, &RewriteOptions::log_background_rewrites_, "lbr",
      kLogBackgroundRewrite,
      kServerScope,
      NULL);  // TODO(huibao): write help & doc for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::log_rewrite_timing_, "lr",
      kLogRewriteTiming,
      kDirectoryScope,
      "Whether or not to report timing information about HtmlParse.");
  AddBaseProperty(
      false, &RewriteOptions::log_url_indices_, "lui",
      kLogUrlIndices,
      kDirectoryScope,
      "Whether or not to log URL indices for rewriter applications.");
  AddBaseProperty(
      false, &RewriteOptions::lowercase_html_names_, "lh",
      kLowercaseHtmlNames,
      kDirectoryScope,
      "Lowercase tag and attribute names for HTML.");
  AddBaseProperty(
      false, &RewriteOptions::always_rewrite_css_, "arc",
      kAlwaysRewriteCss,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::respect_vary_, "rv", kRespectVary,
      kDirectoryScope,
      "Whether to respect the Vary header.");
  AddBaseProperty(
      false, &RewriteOptions::respect_x_forwarded_proto_, "rxfp",
      kRespectXForwardedProto,
      kDirectoryScope,
      "Whether to respect the X-Forwarded-Proto header.");
  AddBaseProperty(
      false, &RewriteOptions::flush_html_, "fh", kFlushHtml,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): implement for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::css_preserve_urls_, "cpu",
      kCssPreserveURLs,
      kDirectoryScope,
      "Disable the rewriting of CSS URLs.");
  AddBaseProperty(
      false, &RewriteOptions::image_preserve_urls_, "ipu",
      kImagePreserveURLs,
      kDirectoryScope,
      "Disable the rewriting of Image URLs.");
  AddBaseProperty(
      false, &RewriteOptions::js_preserve_urls_, "jpu",
      kJsPreserveURLs,
      kDirectoryScope,
      "Disable the rewriting of Javascript URLs.");
  AddBaseProperty(
      false, &RewriteOptions::serve_split_html_in_two_chunks_, "sstc",
      kServeSplitHtmlInTwoChunks,
      kDirectoryScope,
      "Serve the split html response in two chunks");
  AddBaseProperty(
      true, &RewriteOptions::serve_stale_if_fetch_error_, "ss",
      kServeStaleIfFetchError,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::proactively_freshen_user_facing_request_, "pfur",
      kProactivelyFreshenUserFacingRequest,
      kDirectoryScope,
      NULL);
  AddBaseProperty(
      true,
      &RewriteOptions::serve_stale_while_revalidate_threshold_sec_,
      "sswrt",
      kServeStaleWhileRevalidateThresholdSec,
      kDirectoryScope,
      "Threshold for serving serving stale responses while revalidating in "
      "background. 0 means don't serve stale content."
      "Note: Stale response will be served only for non-html requests.");
  AddBaseProperty(
      false,
      &RewriteOptions::flush_more_resources_early_if_time_permits_,
      "fretp", kFlushMoreResourcesEarlyIfTimePermits,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): implement for mod_pagespeed.
  AddRequestProperty(
      false,
      &RewriteOptions::flush_more_resources_in_ie_and_firefox_,
      "fmrief");
  AddBaseProperty(
      kDefaultMaxPrefetchJsElements,
      &RewriteOptions::max_prefetch_js_elements_, "mpje",
      kMaxPrefetchJsElements,
      kDirectoryScope,
      "Set number of JS elements to download without executing. This is useful"
      "for prefetching script elements when defer JS filter is enabled.");
  AddBaseProperty(
      false, &RewriteOptions::enable_defer_js_experimental_, "edje",
      kEnableDeferJsExperimental,
      kDirectoryScope,
      "Enable experimental options in defer javascript.");
  AddBaseProperty(
      true,   // By default, don't optimize resource if no-transform is set.
      &RewriteOptions::disable_rewrite_on_no_transform_, "drnt",
      kDisableRewriteOnNoTransform,
      kDirectoryScope,
      NULL);
  AddBaseProperty(
      false, &RewriteOptions::enable_cache_purge_, "euci",
      kEnableCachePurge,
      kServerScope,
      "Allows individual resources to be flushed; adding some overhead to "
      "the metadata cache");
  AddBaseProperty(
      false, &RewriteOptions::lazyload_highres_images_,
      "elhr", kEnableLazyLoadHighResImages,
      kDirectoryScope,
      NULL);
  AddBaseProperty(
      false, &RewriteOptions::enable_flush_early_critical_css_, "efcc",
      kEnableFlushEarlyCriticalCss,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::default_cache_html_, "dch",
      kDefaultCacheHtml,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): implement for mod_pagespeed.
  AddBaseProperty(
      kDefaultDomainShardCount, &RewriteOptions::domain_shard_count_,
      "dsc", kDomainShardCount,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.
  AddBaseProperty(
      true, &RewriteOptions::modify_caching_headers_, "mch",
      kModifyCachingHeaders,
      kDirectoryScope,
      "Set to false to disallow mod_pagespeed from editing HTML "
      "Cache-Control headers. This is not safe in general and can cause "
      "the incorrect versions of HTML to be served to users.");

  // This is not Plain Old Data, so we initialize it here.
  const RewriteOptions::BeaconUrl kDefaultBeaconUrls =
      { kDefaultBeaconUrl, kDefaultBeaconUrl,
        kDefaultBeaconUrl, kDefaultBeaconUrl };
  AddBaseProperty(
      kDefaultBeaconUrls, &RewriteOptions::beacon_url_, "bu",
      kBeaconUrl,
      kDirectoryScope,
      "URL for beacon callback injected by add_instrumentation.");

  // TODO(jmarantz): igrigorik suggests that 'onload' should be the
  // default in mobile.
  //
  // For mobile, the recommendation is that you prefetch all the
  // necessary assets (burst your data), and then shutoff the radio to
  // preserve battery. Further, if the radio has been idle, and then
  // you scroll, then you'll have to incur the RRC upgrade cost, which
  // can be anywhere from 100ms-2.5s, which makes the site appear very
  // slowly.. and even worse if that triggers reflows.
  //
  // The problem on mobile is that everytime you wake up the radio, no
  // matter the size of the transfer, it then has to cycle through
  // the intermediate power states.. so even a tiny transfers results
  // in radio consuming power for 10s+.  So you incur unnecessary
  // latency, burn battery, etc.
  //
  // http://developer.android.com/training/efficient-downloads
  // /efficient-network-access.html#PrefetchData
  AddBaseProperty(
      false, &RewriteOptions::lazyload_images_after_onload_, "llio",
      kLazyloadImagesAfterOnload,
      kDirectoryScope,
      "Wait until page onload before loading lazy images");

  AddBaseProperty(
      "", &RewriteOptions::lazyload_images_blank_url_, "llbu",
      kLazyloadImagesBlankUrl,
      kDirectoryScope,
      "URL of image used to display prior to loading the lazy image. "
      "Empty means use a site-local copy.");
  AddBaseProperty(
      false, &RewriteOptions::use_blank_image_for_inline_preview_, "biip",
      kUseBlankImageForInlinePreview,
      kDirectoryScope,
      "Use a blank image for inline preview");
  AddBaseProperty(
      true, &RewriteOptions::inline_only_critical_images_, "ioci",
      kInlineOnlyCriticalImages,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): implement for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::domain_rewrite_hyperlinks_, "drh",
      kDomainRewriteHyperlinks,
      kDirectoryScope,
      "Allow rewrite_domains to rewrite <form> and <a> tags in addition "
      "to resource tags.");
  AddBaseProperty(
      false, &RewriteOptions::client_domain_rewrite_, "cdr",
      kClientDomainRewrite,
      kDirectoryScope,
      "Allow rewrite_domains to rewrite urls on the client side.");
  AddBaseProperty(
      kDefaultImageJpegRecompressQuality,
      &RewriteOptions::image_jpeg_recompress_quality_, "iq",
      kImageJpegRecompressionQuality,
      kDirectoryScope,
      "Set quality parameter for recompressing jpeg images [-1,100], "
      "100 is lossless, -1 uses ImageRecompressionQuality");
  // Use kDefaultImageJpegRecompressQuality as default.
  AddBaseProperty(
      kDefaultImageJpegRecompressQualityForSmallScreens,
      &RewriteOptions::image_jpeg_recompress_quality_for_small_screens_, "iqss",
      kImageJpegRecompressionQualityForSmallScreens,
      kDirectoryScope,
      "Set quality parameter for recompressing jpeg images for small "
      "screens. [-1,100], 100 refers to best quality, -1 falls back to "
      "ImageJpegRecompressionQuality.");
  AddBaseProperty(
      kDefaultImageRecompressQuality,
      &RewriteOptions::image_recompress_quality_, "irq",
      kImageRecompressionQuality,
      kDirectoryScope,
      "Set quality parameter for recompressing images [-1,100], "
      "100 refers to best quality, -1 disables lossy compression. "
      "JpegRecompressionQuality and WebpRecompressionQuality override "
      "this.");
  AddBaseProperty(
      kDefaultImageLimitOptimizedPercent,
      &RewriteOptions::image_limit_optimized_percent_, "ip",
      kImageLimitOptimizedPercent,
      kDirectoryScope,
      "Replace images whose size after recompression is less than the "
      "given percent of original image size; 100 means replace if "
      "smaller.");
  AddBaseProperty(
      kDefaultImageLimitRenderedAreaPercent,
      &RewriteOptions::image_limit_rendered_area_percent_, "ira",
      kImageLimitRenderedAreaPercent,
      kDirectoryScope,
      "Limit on percentage of rendered image wxh to the original "
      "image wxh that should be stored in the property cache. This is to "
      "avoid corner cases where rounding off decreases the rendered "
      "image size by a few pixels.");
  AddBaseProperty(
      kDefaultImageLimitResizeAreaPercent,
      &RewriteOptions::image_limit_resize_area_percent_, "ia",
      kImageLimitResizeAreaPercent,
      kDirectoryScope,
      "Consider resizing images whose area in pixels is less than the "
      "given percent of original image area; 100 means replace if "
      "smaller.");
  AddBaseProperty(
      kDefaultImageWebpRecompressQuality,
      &RewriteOptions::image_webp_recompress_quality_, "iw",
      kImageWebpRecompressionQuality,
      kDirectoryScope,
      "Set quality parameter for recompressing webp images [-1,100], "
      "100 refers to best quality, -1 uses ImageRecompressionQuality.");
  // Use kDefaultImageWebpRecompressQuality as default.
  AddBaseProperty(
      kDefaultImageWebpRecompressQualityForSmallScreens,
      &RewriteOptions::image_webp_recompress_quality_for_small_screens_, "iwss",
      kImageWebpRecompressionQualityForSmallScreens,
      kDirectoryScope,
      "Set quality parameter for recompressing webp images for small "
      "screens. [-1,100], 100 refers to best quality, -1 falls back to "
      "ImageWebpRecompressionQuality.");
  AddBaseProperty(
      kDefaultImageWebpTimeoutMs,
      &RewriteOptions::image_webp_timeout_ms_, "wt",
      kImageWebpTimeoutMs,
      kProcessScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultMaxInlinedPreviewImagesIndex,
      &RewriteOptions::max_inlined_preview_images_index_, "mdii",
      kMaxInlinedPreviewImagesIndex,
      kDirectoryScope,
      "Number of first N images for which low resolution image is "
      "generated. Negative values result in generation for all images.");
  AddBaseProperty(
      kDefaultMinImageSizeLowResolutionBytes,
      &RewriteOptions::min_image_size_low_resolution_bytes_, "nislr",
      kMinImageSizeLowResolutionBytes,
      kDirectoryScope,
      "Minimum image size above which low resolution image is "
      "generated.");
  AddBaseProperty(
      kDefaultMaxImageSizeLowResolutionBytes,
      &RewriteOptions::max_image_size_low_resolution_bytes_, "xislr",
      kMaxImageSizeLowResolutionBytes,
      kDirectoryScope,
      "Maximum image size below which low resolution image is "
      "generated.");
  AddBaseProperty(
      kDefaultFinderPropertiesCacheExpirationTimeMs,
      &RewriteOptions::finder_properties_cache_expiration_time_ms_,
      "fpce", kFinderPropertiesCacheExpirationTimeMs,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.
  AddBaseProperty(
      kDefaultFinderPropertiesCacheRefreshTimeMs,
      &RewriteOptions::finder_properties_cache_refresh_time_ms_,
      "fpcr", kFinderPropertiesCacheRefreshTimeMs,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.
  AddBaseProperty(
      kDefaultExperimentCookieDurationMs,
      &RewriteOptions::experiment_cookie_duration_ms_, "fcd",
      kExperimentCookieDurationMs,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultImageJpegNumProgressiveScans,
      &RewriteOptions::image_jpeg_num_progressive_scans_, "ijps",
      kImageJpegNumProgressiveScans,
      kDirectoryScope,
      "Number of progressive scans [1,10] to emit when rewriting images as "
      "ten-scan progressive jpegs. "
      "A value of -1 outputs all progressive scans.");
  // Use kDefaultImageJpegNumProgressiveScans as default.
  AddBaseProperty(
      kDefaultImageJpegNumProgressiveScans,
      &RewriteOptions::image_jpeg_num_progressive_scans_for_small_screens_,
      "ijpst",
      kImageJpegNumProgressiveScansForSmallScreens,
      kDirectoryScope,
      "Number of progressive scans [1,10] to emit when rewriting images as"
      "ten-scan progressive jpegs for small screens. A value of -1 falls "
      "back to kImageJpegNumProgressiveScans.");
  AddBaseProperty(
      false, &RewriteOptions::cache_small_images_unrewritten_, "csiu",
      kCacheSmallImagesUnrewritten,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultImageResolutionLimitBytes,
      &RewriteOptions::image_resolution_limit_bytes_,
      "irlb", kImageResolutionLimitBytes,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      0, &RewriteOptions::rewrite_random_drop_percentage_, "rrdp",
      kRewriteRandomDropPercentage, kDirectoryScope,
      "The percentage of time that pagespeed should randomly drop an "
      "opportunity to optimize an image.  The value should be an integer "
      "between 0 and 100 inclusive.");
  AddBaseProperty(
      "", &RewriteOptions::ga_id_, "ig", kAnalyticsID,
      kDirectoryScope,
      "Google Analytics ID to use on site.");
  AddBaseProperty(
      true, &RewriteOptions::increase_speed_tracking_, "st",
      kIncreaseSpeedTracking,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::running_experiment_, "fur", kRunningExperiment,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.
  AddBaseProperty(
      kDefaultExperimentSlot, &RewriteOptions::experiment_ga_slot_, "fga",
      kExperimentSlot,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::report_unload_time_, "rut",
      kReportUnloadTime,
      kDirectoryScope,
      "If set reports optional page unload time.");
  AddBaseProperty(
      "", &RewriteOptions::x_header_value_, "xhv",
      kXModPagespeedHeaderValue,
      kDirectoryScope,
      "Set the value for the X-Mod-Pagespeed HTTP header");
  AddBaseProperty(
      "", &RewriteOptions::distributed_rewrite_key_, "drwk",
      kDistributedRewriteKey, kProcessScope,
      "The key used to authenticate requests from one rewrite task "
      "to another.  This should be random, greater than 8 characters (longer "
      "is better), and the same value on each mod_pagespeed server config in "
      "the rewrite cluster.");
  AddBaseProperty(
      "", &RewriteOptions::distributed_rewrite_servers_, "drws",
      kDistributedRewriteServers, kProcessScope,
     "A comma-separated list of hosts to use for distributed rewrites.");
  AddBaseProperty(
      kDefaultDistributedTimeoutMs,
      &RewriteOptions::distributed_rewrite_timeout_ms_, "drwt",
      kDistributedRewriteTimeoutMs, kProcessScope,
      "Time to wait before giving up on a distributed rewrite request.");
  AddBaseProperty(
      true, &RewriteOptions::avoid_renaming_introspective_javascript_,
      "aris", kAvoidRenamingIntrospectiveJavascript,
      kDirectoryScope,
      "Don't combine, inline, cache extend, or otherwise modify "
      "javascript in ways that require changing the URL if we see "
      "introspection in the form of "
      "document.getElementsByTagName('script').");
  AddBaseProperty(
      false, &RewriteOptions::reject_blacklisted_, "rbl",
      kRejectBlacklisted,
      kDirectoryScope,
      NULL);   // Not applicable for mod_pagespeed.
  AddBaseProperty(
      HttpStatus::kForbidden,
      &RewriteOptions::reject_blacklisted_status_code_, "rbls",
      kRejectBlacklistedStatusCode,
      kDirectoryScope,
      NULL);   // Not applicable for mod_pagespeed.
  AddBaseProperty(
      kDefaultBlockingRewriteKey, &RewriteOptions::blocking_rewrite_key_,
      "blrw", kXPsaBlockingRewrite,
      kServerScope,
      "If the X-PSA-Pagespeed-Blocking-Rewrite header is present, and "
      "its value matches the configured value, ensure that all "
      "rewrites are completed before sending the response to the "
      "client.");
  AddBaseProperty(
        false,
        &RewriteOptions::use_fallback_property_cache_values_,
        "fbcv", kUseFallbackPropertyCacheValues,
        kServerScope,
        "If this is set to true, fallback values will be used from property "
        "cache if actual value is not present. Here fallback values means "
        "properties which are shared across all requests which have same url "
        "if query paramaters are removed. Example: http://www.test.com?a=1 and "
        "http://www.test.com?a=2 share same fallback properties though they "
        "are two different urls.");
  AddBaseProperty(
      true, &RewriteOptions::support_noscript_enabled_, "snse",
      kSupportNoScriptEnabled,
      kDirectoryScope,
      "Support for clients with no script support, in filters that "
      "insert new javascript.");
  AddBaseProperty(
      false, &RewriteOptions::enable_extended_instrumentation_, "eei",
      kEnableExtendedInstrumentation,
      kDirectoryScope,
      "If set to true, addition instrumentation js is added to that page that "
      "the beacon can collect more information.");
  AddBaseProperty(
      kDefaultMaxCombinedJsBytes,
      &RewriteOptions::max_combined_js_bytes_, "xcj",
      kMaxCombinedJsBytes,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::enable_blink_html_change_detection_,
      "ebhcd", kEnableBlinkHtmlChangeDetection,
      kDirectoryScope,
      NULL);   // Not applicable for mod_pagespeed.
  // Currently not applicable for mod_pagespeed.
  AddBaseProperty(
      false,
      &RewriteOptions::rewrite_request_urls_early_, "rrue",
      kRewriteRequestUrlsEarly,
      kServerScope,
      "If set, we apply the origin rules to rewrite requests urls before "
      "we start processing them");
  AddBaseProperty(
      false,
      &RewriteOptions::enable_blink_html_change_detection_logging_,
      "ebhcdl", kEnableBlinkHtmlChangeDetectionLogging,
      kDirectoryScope,
      NULL);   // Not applicable for mod_pagespeed.
  AddBaseProperty(
      "", &RewriteOptions::critical_line_config_, "clc",
      kCriticalLineConfig,
      kDirectoryScope,
      "Critical line xpath config for use by the split html filter.");
  AddBaseProperty(
      -1, &RewriteOptions::override_caching_ttl_ms_, "octm",
      kOverrideCachingTtlMs,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      5 * Timer::kSecondMs, &RewriteOptions::blocking_fetch_timeout_ms_,
      "bfto", RewriteOptions::kFetcherTimeOutMs,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      false, &RewriteOptions::enable_prioritizing_scripts_, "eps",
      kEnablePrioritizingScripts,
      kDirectoryScope,
      NULL);   // Not applicable for mod_pagespeed.
  AddRequestProperty(
      "", &RewriteOptions::pre_connect_url_, "pcu");
  AddRequestProperty(
      kDefaultPropertyCacheHttpStatusStabilityThreshold,
      &RewriteOptions::property_cache_http_status_stability_threshold_,
      "pchsst");
  AddBaseProperty(
      kDefaultMaxRewriteInfoLogSize,
      &RewriteOptions::max_rewrite_info_log_size_, "mrils",
      kMaxRewriteInfoLogSize,
      kDirectoryScope,
      NULL);   // Not applicable for mod_pagespeed.
  AddBaseProperty(
      kDefaultMetadataCacheStalenessThresholdMs,
      &RewriteOptions::metadata_cache_staleness_threshold_ms_, "mcst",
      kMetadataCacheStalenessThresholdMs,
      kDirectoryScope,
      NULL);  // TODO(jmarantz): write help & doc for mod_pagespeed.
  AddBaseProperty(
      kDefaultDownstreamCachePurgeMethod,
      &RewriteOptions::downstream_cache_purge_method_,
      "dcpm",
      kDownstreamCachePurgeMethod,
      kDirectoryScope,
      "Method to be used for purging responses from the downstream cache");
  AddBaseProperty(
      kDefaultDownstreamCacheRewrittenPercentageThreshold,
      &RewriteOptions::downstream_cache_rewritten_percentage_threshold_,
      "dcrpt",
      kDownstreamCacheRewrittenPercentageThreshold,
      kDirectoryScope,
      "Threshold for percentage of rewriting to be finished before the "
      "response is served out and simultaneously stored in the downstream "
      "cache, beyond which the response will not be purged from the cache even"
      "if more rewriting is possible now");
  AddRequestProperty(
      kDefaultMetadataInputErrorsCacheTtlMs,
      &RewriteOptions::metadata_input_errors_cache_ttl_ms_,
      "mect");
  AddRequestProperty(
      true, &RewriteOptions::enable_blink_debug_dashboard_, "ebdd");
  AddRequestProperty(
      kDefaultBlinkHtmlChangeDetectionTimeMs,
      &RewriteOptions::blink_html_change_detection_time_ms_,
      "bhcdt");
  AddRequestProperty(
      false, &RewriteOptions::override_ie_document_mode_,
      "oidm");
  AddBaseProperty(
      false, &RewriteOptions::use_smart_diff_in_blink_, "usdb",
      kUseSmartDiffInBlink,
      kDirectoryScope,
      NULL);   // Not applicable for mod_pagespeed.

  // Note: defer_javascript and defer_iframe were previously not
  // trusted on mobile user-agents, but have now matured to the point
  // where we should trust them by default.  The mod_pagespeed
  // config-file setting "ModPagespeedEnableAggressiveRewritersForMobile"
  // will work, but we will omit it from the documentation because we
  // are enabling it by default.
  AddBaseProperty(
      true, &RewriteOptions::enable_aggressive_rewriters_for_mobile_,
      "earm", kEnableAggressiveRewritersForMobile,
      kDirectoryScope,
      "Allows defer_javascript and defer_iframe for mobile browsers");

  AddBaseProperty(
      false, &RewriteOptions::serve_ghost_click_buster_with_split_html_,
      "sgcbsh", kServeGhostClickBusterWithSplitHtml,
      kDirectoryScope, "Serve ghost click buster code along with split html");

  AddBaseProperty(
      false, &RewriteOptions::serve_xhr_access_control_headers_,
      "shach", kServeXhrAccessControlHeaders,
      kDirectoryScope, "Serve access control headers with response headers");

  AddBaseProperty(
      "", &RewriteOptions::access_control_allow_origins_,
      "acao", kAccessControlAllowOrigins,
      kDirectoryScope,
      "Comma seperated list of origins that are allowed to make cross-origin "
      "requests");

  AddBaseProperty(
      false, &RewriteOptions::hide_referer_using_meta_,
      "hrum", kHideRefererUsingMeta,
      kDirectoryScope,
      "Hides the referer by adding meta tag to the HTML");

  AddRequestProperty(
      -1, &RewriteOptions::blink_blacklist_end_timestamp_ms_, "bbet");
  AddBaseProperty(
      false,
      &RewriteOptions::persist_blink_blacklist_,
      "pbb", kPersistBlinkBlacklist,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.

  AddBaseProperty(
      false, &RewriteOptions::allow_logging_urls_in_log_record_,
      "alulr", kAllowLoggingUrlsInLogRecord, kDirectoryScope,
      NULL);   // Not applicable for mod_pagespeed.

  AddBaseProperty(
      "", &RewriteOptions::non_cacheables_for_cache_partial_html_, "nccp",
      kNonCacheablesForCachePartialHtml,
      kDirectoryScope,
      NULL);  // Not applicable for mod_pagespeed.

  AddBaseProperty(
      false, &RewriteOptions::enable_fix_reflow_, "efr", kEnableFixReflow,
      kDirectoryScope, NULL);   // Not applicable for mod_pagespeed.

  // Test-only, so no enum.
  AddRequestProperty(
      false, &RewriteOptions::test_instant_fetch_rewrite_deadline_, "tifrwd");

  //
  // Recently sriharis@ excluded a variety of options from
  // signature-computation which makes sense from the perspective
  // of metadata cache, however it makes Signature() useless for
  // determining equivalence of RewriteOptions.  This equivalence
  // is needed in ServerContext::NewRewriteDriver to determine
  // whether the drivers in the freelist are still applicable, or
  // whether options have changed.
  //
  // So we need to either compute two signatures: one for equivalence
  // and one for metadata cache key, or just use the more comprehensive
  // one for metadata_cache.  We should determine whether we are getting
  // spurious cache fragmentation before investing in computing two
  // signatures.
  //
  // Commenting these out for now.
  //
  // In particular, ProxyInterfaceTest.AjaxRewritingForCss will fail
  // if we don't let in_place_rewriting_enabled_ affect the signature.
  //
  // TODO(jmarantz): consider whether there's any measurable benefit
  // from excluding these options from the signature.  If there is,
  // make 2 signatures: one for equivalence & one for metadata cache
  // keys.  If not, just remove the DoNotUseForSignatureComputation
  // infrastructure.
  //
  // in_place_rewriting_enabled_.DoNotUseForSignatureComputation();
  // log_background_rewrites_.DoNotUseForSignatureComputation();
  // log_rewrite_timing_.DoNotUseForSignatureComputation();
  // log_url_indices_.DoNotUseForSignatureComputation();
  // serve_stale_if_fetch_error_.DoNotUseForSignatureComputation();
  // enable_defer_js_experimental_.DoNotUseForSignatureComputation();
  // default_cache_html_.DoNotUseForSignatureComputation();
  // lazyload_images_after_onload_.DoNotUseForSignatureComputation();
  // ga_id_.DoNotUseForSignatureComputation();
  // increase_speed_tracking_.DoNotUseForSignatureComputation();
  // running_experiment_.DoNotUseForSignatureComputation();
  // x_header_value_.DoNotUseForSignatureComputation();
  // blocking_fetch_timeout_ms_.DoNotUseForSignatureComputation();
}  // NOLINT  (large function)

RewriteOptions::~RewriteOptions() {
  STLDeleteElements(&custom_fetch_headers_);
  STLDeleteElements(&experiment_specs_);
  STLDeleteElements(&url_cache_invalidation_entries_);
  STLDeleteValues(&rejected_request_map_);
}  // NOLINT

void RewriteOptions::InitializeOptions(const Properties* properties) {
  all_options_.resize(all_properties_->size());

  // Note that we reserve space in all_options_ for all RewriteOptions
  // and subclass properties, but we initialize only the options
  // corresponding to the ones passed into this method, whether from
  // RewriteOptions or a subclass.
  //
  // This is because the member variables for the subclass properties
  // have not been constructed yet, so copying default values into
  // them would crash (at least the strings).  So we rely on subclass
  // constructors to initialize their own options by calling
  // InitializeOptions on their own property sets as well.
  for (int i = 0, n = properties->size(); i < n; ++i) {
    const PropertyBase* property = properties->property(i);
    property->InitializeOption(this);
  }
  initialized_options_ += properties->size();
}

RewriteOptions::OptionBase::~OptionBase() {
}

RewriteOptions::Properties::Properties()
    : initialization_count_(1),
      owns_properties_(true) {
}

RewriteOptions::Properties::~Properties() {
  if (owns_properties_) {
    STLDeleteElements(&property_vector_);
  }
}

RewriteOptions::PropertyBase::~PropertyBase() {
}

bool RewriteOptions::Properties::Initialize(Properties** properties_handle) {
  Properties* properties = *properties_handle;
  if (properties == NULL) {
    *properties_handle = new Properties;
    return true;
  }
  ++(properties->initialization_count_);
  return false;
}

void RewriteOptions::Properties::Merge(Properties* properties) {
  // We merge all subclass properties up into RewriteOptions::all_properties_.
  //   RewriteOptions::properties_.owns_properties_ is true.
  //   RewriteOptions::all_properties_.owns_properties_ is false.
  DCHECK(properties->owns_properties_);
  owns_properties_ = false;
  property_vector_.reserve(size() + properties->size());
  property_vector_.insert(property_vector_.end(),
                          properties->property_vector_.begin(),
                          properties->property_vector_.end());
  std::sort(property_vector_.begin(), property_vector_.end(),
            RewriteOptions::PropertyLessThanByOptionName);
  for (int i = 0, n = property_vector_.size(); i < n; ++i) {
    property_vector_[i]->set_index(i);
  }
}

bool RewriteOptions::Properties::Terminate(Properties** properties_handle) {
  Properties* properties = *properties_handle;
  DCHECK_GT(properties->initialization_count_, 0);
  if (--(properties->initialization_count_) == 0) {
    delete properties;
    *properties_handle = NULL;
    return true;
  }
  return false;
}

bool RewriteOptions::Initialize() {
  if (Properties::Initialize(&properties_)) {
    Properties::Initialize(&all_properties_);
    AddProperties();
    InitFilterIdToEnumArray();
    all_properties_->Merge(properties_);
    InitOptionIdToPropertyArray();
    InitOptionNameToPropertyArray();
    return true;
  }
  return false;
}

void RewriteOptions::InitFilterIdToEnumArray() {
  // Sanity-checks -- will be active only when compiled for debug.
#ifndef NDEBUG
  // The forward map must have an entry for every Filter enum value except
  // the sentinel (kEndOfFilters) and they must be in order.
  DCHECK_EQ(arraysize(kFilterVectorStaticInitializer),
            static_cast<size_t>(kEndOfFilters));
  for (int i = 0, n = arraysize(kFilterVectorStaticInitializer); i < n; ++i) {
    DCHECK_EQ(i,
              static_cast<int>(kFilterVectorStaticInitializer[i].filter_enum));
  }
  // The reverse map must have the same number of elements as the forward map.
  DCHECK_EQ(arraysize(kFilterVectorStaticInitializer),
            arraysize(filter_id_to_enum_array_));
#endif
  // Initialize the reverse map.
  for (int i = 0, n = arraysize(kFilterVectorStaticInitializer); i < n; ++i) {
    filter_id_to_enum_array_[i] = &kFilterVectorStaticInitializer[i];
  }
  std::sort(filter_id_to_enum_array_,
            filter_id_to_enum_array_ + arraysize(filter_id_to_enum_array_),
            RewriteOptions::FilterEnumToIdAndNameEntryLessThanById);
}

struct RewriteOptions::OptionIdCompare {
  bool operator()(const PropertyBase* a, StringPiece b) const {
    return StringCaseCompare(a->id(), b) < 0;
  }
  bool operator()(StringPiece a, const PropertyBase* b) const {
    return StringCaseCompare(a, b->id()) < 0;
  }
  bool operator()(const PropertyBase* a, const PropertyBase* b) const {
    return StringCaseCompare(a->id(), b->id()) < 0;
  }
};

void RewriteOptions::InitOptionIdToPropertyArray() {
  // This method is called first by Initialize, when base properties are
  // added, then zero or more times when subclass properties are added by
  // MergeSubclassProperties (e.g. by ApacheConfig::AddProperties).
  delete [] option_id_to_property_array_;
  option_id_to_property_array_ =
      new const PropertyBase*[all_properties_->size()];
  for (int i = 0, n = all_properties_->size(); i < n; ++i) {
    option_id_to_property_array_[i] = all_properties_->property(i);
  }
  std::sort(option_id_to_property_array_,
            option_id_to_property_array_ + all_properties_->size(),
            OptionIdCompare());
}

void RewriteOptions::InitOptionNameToPropertyArray() {
  // This method is called first by Initialize, when base properties are
  // added, then zero or more times when subclass properties are added by
  // MergeSubclassProperties (e.g. by ApacheConfig::AddProperties).
  delete option_name_to_property_map_;
  option_name_to_property_map_ = new PropertyNameMap;
  for (int i = 0, n = all_properties_->size(); i < n; ++i) {
    PropertyBase* prop = all_properties_->property(i);
    StringPiece name(prop->option_name());
    if (!name.empty()) {
      option_name_to_property_map_->insert(PropertyNameMap::value_type(name,
                                                                       prop));
    }
  }
}

bool RewriteOptions::Terminate() {
  if (Properties::Terminate(&properties_)) {
    DCHECK(option_id_to_property_array_ != NULL);
    delete [] option_id_to_property_array_;
    option_id_to_property_array_ = NULL;
    DCHECK(option_name_to_property_map_ != NULL);
    option_name_to_property_map_->clear();
    delete option_name_to_property_map_;
    option_name_to_property_map_ = NULL;
    Properties::Terminate(&all_properties_);
    return true;
  }
  return false;
}

void RewriteOptions::MergeSubclassProperties(Properties* properties) {
  all_properties_->Merge(properties);
  InitOptionIdToPropertyArray();
  InitOptionNameToPropertyArray();
}

bool RewriteOptions::SetExperimentState(int id) {
  experiment_id_ = id;
  return SetupExperimentRewriters();
}

void RewriteOptions::SetExperimentStateStr(
    const StringPiece& experiment_index) {
  if (experiment_index.length() == 1) {
    int index = experiment_index[0] - 'a';
    int n_experiment_specs = experiment_specs_.size();
    if (0 <= index && index < n_experiment_specs) {
      SetExperimentState(experiment_specs_[index]->id());
    }
  }
  // Ignore any calls with an invalid index-string.  When experiments are ended
  // a previously valid index string may become invalid.  For example, if a
  // webmaster were running an a/b/c test and now is running an a/b test, a
  // visitor refreshing an old image opened in a separate tab on the 'c' branch
  // of the experiment needs to get some version of that image and not an error.
  // Perhaps more commonly, a webmaster might manually copy a url from pagespeed
  // output to somewhere else on their site at a time an experiment was active,
  // and it would be bad to break that resource link when the experiment ended.
}

GoogleString RewriteOptions::GetExperimentStateStr() const {
  // Don't look at more than 26 experiment_specs because we use lowercase a-z.
  // While this is an arbitrary limit, it's much higher than webmasters are
  // likely to run into in practice.  Most of the time people will be running
  // a/b or a/b/c tests, and an a/b/c/d/.../y/z test would be unwieldy and
  // difficult to interpret.  If this does turn out to be needed we can switch
  // to base64 to get 64-way tests, and more than one character experiment index
  // strings would also be possible.
  for (int i = 0, n = experiment_specs_.size(); i < n && i < 26; ++i) {
    if (experiment_specs_[i]->id() == experiment_id_) {
      return GoogleString(1, static_cast<char>('a' + i));
    }
  }
  return "";
}

void RewriteOptions::DisallowTroublesomeResources() {
  // http://code.google.com/p/modpagespeed/issues/detail?id=38
  Disallow("*js_tinyMCE*");  // js_tinyMCE.js
  // Official tinyMCE URLs: tiny_mce.js, tiny_mce_src.js, tiny_mce_gzip.php, ...
  Disallow("*tiny_mce*");
  // I've also seen tinymce.js
  Disallow("*tinymce*");

  // http://code.google.com/p/modpagespeed/issues/detail?id=352
  Disallow("*scriptaculous.js*");

  // http://code.google.com/p/modpagespeed/issues/detail?id=186
  // ckeditor.js, ckeditor_basic.js, ckeditor_basic_source.js, ...
  Disallow("*ckeditor*");

  // http://code.google.com/p/modpagespeed/issues/detail?id=207
  // jquery-ui-1.8.2.custom.min.js, jquery-1.4.4.min.js, jquery.fancybox-...
  //
  // TODO(sligocki): Is jquery actually a problem? Perhaps specific
  // jquery libraries (like tiny MCE). Investigate before disabling.
  // Disallow("*jquery*");

  // http://code.google.com/p/modpagespeed/issues/detail?id=216
  // Appears to be an issue with old version of jsminify.
  // Disallow("*swfobject*");  // swfobject.js

  // TODO(sligocki): Add disallow for the JS broken in:
  // http://code.google.com/p/modpagespeed/issues/detail?id=142
  // Not clear which JS file is broken and proxying is not working correctly.

  // Disable lazyload_images if there is another known lazyloader present.
  DisableLazyloadForClassName("*dfcg*");
  DisableLazyloadForClassName("*lazy*");
  DisableLazyloadForClassName("*nivo*");
  DisableLazyloadForClassName("*slider*");

  // It is pretty well established that PSOL and the WordPress admin
  // pages (wp-admin) don't work together.  Until we figure out why,
  // black-list.
  //
  // http://snowulf.com/2013/03/06/
  // wordpress-3-5-and-mod_pagespeed-does-not-play-well-together/
  //
  // TODO(jmarantz): Remove this blacklist once the source of the
  // trouble is found and a more surgical workaround can be found.
  Disallow("*/wp-admin/*");
}

// Note: this is not called by default in mod_pagespeed.
void RewriteOptions::DisallowResourcesForProxy() {
  Disallow("*://l.yimg.com/*");
  Disallow("*store.yahoo.net/*");

  // Breaks some sites.
  Disallow("*connect.facebook.net/*");
  // Changing the url breaks the simpleviewer flash-based slideshow gallery due
  // to cross domain policy violations.
  Disallow("*simpleviewer.js*");

  // The following options are not really troublesome, but we want to disallow
  // them anyway.

  // The following url pattern shows up often, but under too many different
  // unique urls:
  // Disallow("*//stats.wordpress.com/e-*");

  // Disable resources that are already being shared across multiple sites and
  // have strong CDN support (ie they are already cheap to fetch and are also
  // very likely to reside in the browser cache from visits to another site).
  // We keep these patterns as specific as possible while avoiding internal
  // wildcards.  Note that all of these urls have query parameters in long-tail
  // requests.
  // TODO(jmaessen): Consider setting up the blacklist by domain name and using
  // regexps only after a match has been found.  Alternatively, since we're
  // setting up a binary choice here, consider using RE2 to make the yes/no
  // decision.
  Disallow("*//ajax.googleapis.com/ajax/libs/*.js*");
  Disallow("*//pagead2.googlesyndication.com/pagead/show_ads.js*");
  Disallow("*//partner.googleadservices.com/gampad/google_service.js*");
  Disallow("*//platform.twitter.com/widgets.js*");
  Disallow("*//s7.addthis.com/js/250/addthis_widget.js*");
  Disallow("*//www.google.com/coop/cse/brand*");
  Disallow("*//www.google-analytics.com/urchin.js*");
  Disallow("*//www.googleadservices.com/pagead/conversion.js*");
}

bool RewriteOptions::EnableFiltersByCommaSeparatedList(
    const StringPiece& filters, MessageHandler* handler) {
  return AddCommaSeparatedListToFilterSetState(
      filters, &enabled_filters_, handler);
}

bool RewriteOptions::DisableFiltersByCommaSeparatedList(
    const StringPiece& filters, MessageHandler* handler) {
  return AddCommaSeparatedListToFilterSetState(
      filters, &disabled_filters_, handler);
}

bool RewriteOptions::ForbidFiltersByCommaSeparatedList(
    const StringPiece& filters, MessageHandler* handler) {
  return AddCommaSeparatedListToFilterSetState(
      filters, &forbidden_filters_, handler);
}

void RewriteOptions::DisableAllFilters() {
  DCHECK(!frozen_);
  modified_ = true;
  enabled_filters_.clear();
  SetRewriteLevel(RewriteOptions::kPassThrough);
  disabled_filters_.SetAll();
}

void RewriteOptions::DisableAllFiltersNotExplicitlyEnabled() {
  modified_ |= disabled_filters_.MergeInverted(enabled_filters_);
}

void RewriteOptions::EnableFilter(Filter filter) {
  DCHECK(!frozen_);
  modified_ |= enabled_filters_.Insert(filter);
}

void RewriteOptions::ForceEnableFilter(Filter filter) {
  DCHECK(!frozen_);

  // insert into set of enabled filters.
  modified_ |= enabled_filters_.Insert(filter);

  // remove from set of disabled filters.
  modified_ |= disabled_filters_.Erase(filter);

  // remove from set of forbidden filters.
  modified_ |= forbidden_filters_.Erase(filter);
}

void RewriteOptions::DistributeFiltersByCommaSeparatedList(
    const StringPiece& filters, MessageHandler* handler) {
  StringPieceVector names;
  SplitStringPieceToVector(filters, ",", &names, true);
  for (int i = 0, n = names.size(); i < n; ++i) {
    DistributeFilter(names[i]);
  }
}

void RewriteOptions::DistributeFilter(const StringPiece& filter_id) {
  DCHECK(!frozen_);
  std::pair<FilterIdSet::iterator, bool> inserted =
      distributable_filters_.insert(filter_id.as_string());
  modified_ |= inserted.second;
}

bool RewriteOptions::Distributable(const StringPiece& filter_id) const {
  return distributable_filters_.find(filter_id.as_string())
      != distributable_filters_.end();
}

void RewriteOptions::EnableExtendCacheFilters() {
  EnableFilter(kExtendCacheCss);
  EnableFilter(kExtendCacheImages);
  EnableFilter(kExtendCacheScripts);
  // Doesn't enable kExtendCachePdfs.
}

void RewriteOptions::DisableFilter(Filter filter) {
  DCHECK(!frozen_);
  modified_ |= disabled_filters_.Insert(filter);
}

void RewriteOptions::ForbidFilter(Filter filter) {
  DCHECK(!frozen_);
  modified_ |= forbidden_filters_.Insert(filter);
}

void RewriteOptions::EnableFilters(
    const RewriteOptions::FilterSet& filter_set) {
  modified_ |= enabled_filters_.Merge(filter_set);
}

void RewriteOptions::DisableFilters(
    const RewriteOptions::FilterSet& filter_set) {
  modified_ |= disabled_filters_.Merge(filter_set);
}

void RewriteOptions::ForbidFilters(
    const RewriteOptions::FilterSet& filter_set) {
  modified_ |= forbidden_filters_.Merge(filter_set);
}

void RewriteOptions::ClearFilters() {
  DCHECK(!frozen_);
  modified_ = true;
  enabled_filters_.clear();
  disabled_filters_.clear();
  forbidden_filters_.clear();

  // Re-enable HtmlWriterFilter by default.
  EnableFilter(kHtmlWriterFilter);
}

bool RewriteOptions::AddCommaSeparatedListToFilterSetState(
    const StringPiece& filters, FilterSet* set, MessageHandler* handler) {
  DCHECK(!frozen_);
  size_t prev_set_size = set->size();
  bool ret = AddCommaSeparatedListToFilterSet(filters, set, handler);
  modified_ |= (set->size() != prev_set_size);
  return ret;
}

bool RewriteOptions::AddCommaSeparatedListToFilterSet(
    const StringPiece& filters, FilterSet* set, MessageHandler* handler) {
  StringPieceVector names;
  SplitStringPieceToVector(filters, ",", &names, true);
  bool ret = true;
  for (int i = 0, n = names.size(); i < n; ++i) {
    ret = AddByNameToFilterSet(names[i], set, handler);
  }
  return ret;
}

bool RewriteOptions::AdjustFiltersByCommaSeparatedList(
    const StringPiece& filters, MessageHandler* handler) {
  DCHECK(!frozen_);
  StringPieceVector names;
  SplitStringPieceToVector(filters, ",", &names, true);
  bool ret = true;
  size_t sets_size_sum_before =
      (enabled_filters_.size() + disabled_filters_.size());

  // Default to false unless no filters are specified.
  // "PageSpeedFilters=" -> disable all filters.
  bool non_incremental = names.empty();
  for (int i = 0, n = names.size(); i < n; ++i) {
    StringPiece& option = names[i];
    if (!option.empty()) {
      if (option[0] == '-') {
        option.remove_prefix(1);
        ret = AddByNameToFilterSet(names[i], &disabled_filters_, handler);
      } else if (option[0] == '+') {
        option.remove_prefix(1);
        ret = AddByNameToFilterSet(names[i], &enabled_filters_, handler);
      } else {
        // No prefix means: reset to pass-through mode prior to
        // applying any of the filters.  +a,-b,+c" will just add
        // a and c and remove b to current default config, but
        // "+a,-b,+c,d" will just run with filters a, c and d.
        ret = AddByNameToFilterSet(names[i], &enabled_filters_, handler);
        non_incremental = true;
      }
    }
  }

  if (non_incremental) {
    SetRewriteLevel(RewriteOptions::kPassThrough);
    DisableAllFiltersNotExplicitlyEnabled();
    modified_ = true;
  } else {
    // TODO(jmarantz): this modified_ computation for query-params doesn't
    // work as we'd like in RewriteQueryTest.NoChangesShouldNotModify.  See
    // a more detailed TODO there.
    size_t sets_size_sum_after =
        (enabled_filters_.size() + disabled_filters_.size());
    modified_ |= (sets_size_sum_before != sets_size_sum_after);
  }
  return ret;
}

bool RewriteOptions::AddByNameToFilterSet(
    const StringPiece& option, FilterSet* set, MessageHandler* handler) {
  bool ret = true;
  Filter filter = LookupFilter(option);
  if (filter == kEndOfFilters) {
    // Handle a compound filter name.  This is much less common, so we don't
    // have any special infrastructure for it; just code.
    // WARNING: Be careful if you add things here; the filters you add
    // here will be invokable by outside people, so they better not crash
    // if that happens!
    if (option == "rewrite_images") {
      // Every filter here needs to be listed in kCoreFilterSet as well.
      set->Insert(kConvertGifToPng);
      set->Insert(kConvertJpegToProgressive);
      set->Insert(kInlineImages);
      set->Insert(kJpegSubsampling);
      set->Insert(kRecompressJpeg);
      set->Insert(kRecompressPng);
      set->Insert(kRecompressWebp);
      set->Insert(kResizeImages);
      set->Insert(kStripImageColorProfile);
      set->Insert(kStripImageMetaData);
    } else if (option == "recompress_images") {
      // Every filter here needs to be listed under "rewrite_images" as well.
      set->Insert(kConvertGifToPng);
      set->Insert(kConvertJpegToProgressive);
      set->Insert(kJpegSubsampling);
      set->Insert(kRecompressJpeg);
      set->Insert(kRecompressPng);
      set->Insert(kRecompressWebp);
      set->Insert(kStripImageColorProfile);
      set->Insert(kStripImageMetaData);
    } else if (option == "extend_cache") {
      // Every filter here needs to be listed in kCoreFilterSet as well.
      set->Insert(kExtendCacheCss);
      set->Insert(kExtendCacheImages);
      set->Insert(kExtendCacheScripts);
    } else if (option == "testing") {
      for (int i = 0, n = arraysize(kTestFilterSet); i < n; ++i) {
        set->Insert(kTestFilterSet[i]);
      }
    } else if (option == "core") {
      for (int i = 0, n = arraysize(kCoreFilterSet); i < n; ++i) {
        set->Insert(kCoreFilterSet[i]);
      }
    } else {
      if (handler != NULL) {
        handler->Message(kWarning, "Invalid filter name: %s",
                         option.as_string().c_str());
      }
      ret = false;
    }
  } else {
    set->Insert(filter);
    // kResizeMobileImages requires kDelayImages.
    if (filter == kResizeMobileImages) {
      set->Insert(kDelayImages);
    }
  }
  return ret;
}

bool RewriteOptions::AddCommaSeparatedListToOptionSet(
    const StringPiece& options, OptionSet* set, MessageHandler* handler) {
  StringPieceVector option_vector;
  bool ret = true;
  SplitStringPieceToVector(options, ",", &option_vector, true);
  for (int i = 0, n = option_vector.size(); i < n; ++i) {
    StringPieceVector single_option_and_value;
    SplitStringPieceToVector(option_vector[i], "=", &single_option_and_value,
                             true);
    if (single_option_and_value.size() == 2) {
      set->insert(OptionStringPair(single_option_and_value[0],
                                   single_option_and_value[1]));
    } else {
      ret = false;
    }
  }
  return ret;
}

RewriteOptions::Filter RewriteOptions::LookupFilterById(
    const StringPiece& filter_id) {
  GoogleString key(filter_id.data(), filter_id.size());

  FilterEnumToIdAndNameEntry entry;
  entry.filter_enum = kEndOfFilters;
  entry.filter_id = key.c_str();
  entry.filter_name = "";
  const FilterEnumToIdAndNameEntry** it = std::lower_bound(
      filter_id_to_enum_array_,
      filter_id_to_enum_array_ + arraysize(filter_id_to_enum_array_),
      &entry,
      RewriteOptions::FilterEnumToIdAndNameEntryLessThanById);
  // We use lower_bound because it's O(log n) so relatively efficient. It
  // returns a pointer to the entry whose id is >= filter_id; if filter_id is
  // higher than all ids then 'it' will point past the end, otherwise we have
  // to check that the ids actually match.
  if (it == filter_id_to_enum_array_ + arraysize(filter_id_to_enum_array_) ||
      filter_id != (*it)->filter_id) {
    return kEndOfFilters;
  }
  return (*it)->filter_enum;
}

const RewriteOptions::PropertyBase* RewriteOptions::LookupOptionById(
    StringPiece option_id) {
  const PropertyBase** end =
      option_id_to_property_array_ + all_properties_->size();
  const PropertyBase** it = std::lower_bound(
      option_id_to_property_array_, end, option_id, OptionIdCompare());
  // We use lower_bound because it's O(log n) so relatively efficient, but
  // we must double-check its result as it doesn't guarantee an exact match.
  // Note that std::binary_search provides an exact match but only a bool
  // result and not the actual object we were searching for.
  return ((it == end || option_id != (*it)->id()) ? NULL : *it);
}

const RewriteOptions::PropertyBase* RewriteOptions::LookupOptionByName(
    StringPiece option_name) {
  // There are many options without a name, and it doesn't make sense to
  // find "the one" with an empty name, so short-circuit that early.
  if (option_name.empty()) {
    return NULL;
  }
  PropertyNameMap::iterator
      end = option_name_to_property_map_->end(),
      pos = option_name_to_property_map_->find(option_name);
  return (pos == end ? NULL : pos->second);
}

const StringPiece RewriteOptions::LookupOptionNameById(StringPiece option_id) {
  const PropertyBase* option = LookupOptionById(option_id);
  return (option == NULL ? StringPiece() : option->option_name());
}

bool RewriteOptions::IsValidOptionName(StringPiece name) {
  return (LookupOptionByName(name) != NULL);
}

bool RewriteOptions::SetOptionsFromName(const OptionSet& option_set) {
  bool ret = true;
  for (RewriteOptions::OptionSet::const_iterator iter = option_set.begin();
       iter != option_set.end(); ++iter) {
    GoogleString msg;
    OptionSettingResult result = SetOptionFromName(
        iter->first, iter->second, &msg);
    if (result != kOptionOk) {
      ret = false;
    }
  }
  return ret;
}

RewriteOptions::OptionSettingResult RewriteOptions::SetOptionFromName(
    StringPiece name, StringPiece value, GoogleString* msg) {
  OptionSettingResult result = kOptionNameUnknown;
  if (IsValidOptionName(name)) {
    result = SetOptionFromName(name, value);
  }
  return FormatSetOptionMessage(result, name, value, msg);
}

RewriteOptions::OptionSettingResult RewriteOptions::FormatSetOptionMessage(
    OptionSettingResult result, StringPiece name, StringPiece value,
    GoogleString* msg) {
  if (!IsValidOptionName(name)) {
    // Not a mapped option.
    SStringPrintf(msg, "Option %s not mapped.", name.as_string().c_str());
    return kOptionNameUnknown;
  }
  switch (result) {
    case kOptionNameUnknown:
      SStringPrintf(msg, "Option %s not found.", name.as_string().c_str());
      break;
    case kOptionValueInvalid:
      SStringPrintf(msg, "Cannot set option %s to %s.",
                    name.as_string().c_str(), value.as_string().c_str());
      break;
    default:
      break;
  }
  return result;
}

RewriteOptions::OptionSettingResult RewriteOptions::ParseAndSetOptionFromName1(
    StringPiece name, StringPiece arg,
    GoogleString* msg, MessageHandler* handler) {
  OptionSettingResult result = SetOptionFromName(name, arg);
  if (result != RewriteOptions::kOptionNameUnknown) {
    return FormatSetOptionMessage(result, name, arg, msg);
  }

  // Assume all goes well; if not, set result accordingly.
  result = RewriteOptions::kOptionOk;

  // TODO(matterbury): use a hash map for faster lookup/switching.
  if (StringCaseEqual(name, kAllow)) {
      Allow(arg);
  } else if (StringCaseEqual(name, kDisableFilters)) {
    if (!DisableFiltersByCommaSeparatedList(arg, handler)) {
      *msg = "Failed to disable some filters.";
      result = RewriteOptions::kOptionValueInvalid;
    }
  } else if (StringCaseEqual(name, kDisallow)) {
    Disallow(arg);
  } else if (StringCaseEqual(name, kDistributableFilters)) {
    DistributeFiltersByCommaSeparatedList(arg, handler);
  } else if (StringCaseEqual(name, kDomain)) {
    WriteableDomainLawyer()->AddDomain(arg, handler);
  } else if (StringCaseEqual(name, kDownstreamCachePurgeLocationPrefix)) {
    GoogleUrl gurl(arg);
    if (gurl.is_valid()) {
      // The host:port location where purge requests are to be sent should
      // be made "known" to the DomainLawyer so that when the
      // LoopbackRouteFetcher tries to send the request, it does not consider
      // this an invalid domain.
      WriteableDomainLawyer()->AddKnownDomain(gurl.HostAndPort(), handler);
      set_downstream_cache_purge_location_prefix(arg);
    } else {
      *msg = "Downstream cache purge location prefix is invalid.";
      result = RewriteOptions::kOptionValueInvalid;
    }
  } else if (StringCaseEqual(name, kEnableFilters)) {
    if (!EnableFiltersByCommaSeparatedList(arg, handler)) {
      *msg = "Failed to enable some filters.";
      result = RewriteOptions::kOptionValueInvalid;
    }
  } else if (StringCaseEqual(name, kExperimentVariable)) {
    int slot;
    if (!StringToInt(arg, &slot) || slot < 1 || slot > 5) {
      *msg = "must be an integer between 1 and 5";
      result = RewriteOptions::kOptionValueInvalid;
    } else {
      set_experiment_ga_slot(slot);
    }
  } else if (StringCaseEqual(name, kExperimentSpec)) {
    if (!AddExperimentSpec(arg, handler)) {
      *msg = "not a valid experiment spec";
      result = RewriteOptions::kOptionValueInvalid;
    }
  } else if (StringCaseEqual(name, kForbidFilters)) {
    if (!ForbidFiltersByCommaSeparatedList(arg, handler)) {
      *msg = "Failed to forbid some filters.";
      result = RewriteOptions::kOptionValueInvalid;
    }
  } else if (StringCaseEqual(name, kRetainComment)) {
    RetainComment(arg);
  } else if (StringCaseEqual(name, kBlockingRewriteRefererUrls)) {
      EnableBlockingRewriteForRefererUrlPattern(arg);
  } else {
    result = RewriteOptions::kOptionNameUnknown;
  }
  return result;
}

RewriteOptions::OptionSettingResult RewriteOptions::ParseAndSetOptionFromName2(
    StringPiece name, StringPiece arg1, StringPiece arg2,
    GoogleString* msg, MessageHandler* handler) {
  // Assume all goes well; if not, set result accordingly.
  OptionSettingResult result = RewriteOptions::kOptionOk;

  // TODO(matterbury): use a hash map for faster lookup/switching.
  if (StringCaseEqual(name, kCustomFetchHeader)) {
    AddCustomFetchHeader(arg1, arg2);
  } else if (StringCaseEqual(name, kLoadFromFile)) {
    file_load_policy()->Associate(arg1, arg2);
  } else if (StringCaseEqual(name, kLoadFromFileMatch)) {
    if (!file_load_policy()->AssociateRegexp(arg1, arg2, msg)) {
      result = RewriteOptions::kOptionValueInvalid;
    }
  } else if (StringCaseEqual(name, kLoadFromFileRule) ||
             StringCaseEqual(name, kLoadFromFileRuleMatch)) {
    bool is_regexp = (name == kLoadFromFileRuleMatch);
    bool allow;
    if (StringCaseEqual(arg1, "Allow")) {
      allow = true;
    } else if (StringCaseEqual(arg1, "Disallow")) {
      allow = false;
    } else {
      *msg = "Argument 1 must be either 'Allow' or 'Disallow'";
      return RewriteOptions::kOptionValueInvalid;
    }
    if (!file_load_policy()->AddRule(arg2.as_string(),
                                     is_regexp, allow, msg)) {
      result = RewriteOptions::kOptionValueInvalid;
    }
  } else if (StringCaseEqual(name, kMapOriginDomain)) {
    WriteableDomainLawyer()->AddOriginDomainMapping(arg1, arg2, handler);
  } else if (StringCaseEqual(name, kMapProxyDomain)) {
    WriteableDomainLawyer()->AddProxyDomainMapping(arg1, arg2, "", handler);
  } else if (StringCaseEqual(name, kMapRewriteDomain)) {
    WriteableDomainLawyer()->AddRewriteDomainMapping(arg1, arg2, handler);
  } else if (StringCaseEqual(name, kShardDomain)) {
    WriteableDomainLawyer()->AddShard(arg1, arg2, handler);
  } else {
    result = RewriteOptions::kOptionNameUnknown;
  }
  return result;
}

RewriteOptions::OptionSettingResult RewriteOptions::ParseAndSetOptionFromName3(
    StringPiece name, StringPiece arg1, StringPiece arg2, StringPiece arg3,
    GoogleString* msg, MessageHandler* handler) {
  // Assume all goes well; if not, set result accordingly.
  OptionSettingResult result = RewriteOptions::kOptionOk;
  if (StringCaseEqual(name, kUrlValuedAttribute)) {
    // Examples:
    //   UrlValuedAttribute span src Hyperlink
    //     - <span src=...> indicates a hyperlink
    //   UrlValuedAttribute hr imgsrc Image
    //     - <hr image=...> indicates an image resource
    semantic_type::Category category;
    if (!semantic_type::ParseCategory(arg3, &category)) {
      *msg = StrCat("Invalid resource category: ", arg3);
      result = RewriteOptions::kOptionValueInvalid;
    } else {
      AddUrlValuedAttribute(arg1, arg2, category);
    }
  } else if (StringCaseEqual(name, kLibrary)) {
    // Library bytes md5 canonical_url
    // Examples:
    //   Library 43567 5giEj_jl-Ag5G8 http://www.example.com/url.js
    int64 bytes;
    if (!StringToInt64(arg1, &bytes) || bytes < 0) {
      *msg = "Library size must be a positive 64-bit integer";
      result = RewriteOptions::kOptionValueInvalid;
    } else if (!RegisterLibrary(bytes, arg2, arg3)) {
      *msg = StrCat("Format is size md5 url; bad md5 ", arg2, " or URL ", arg3);
      result = RewriteOptions::kOptionValueInvalid;
    }
  } else if (StringCaseEqual(name, kMapProxyDomain)) {
    WriteableDomainLawyer()->AddProxyDomainMapping(arg1, arg2, arg3, handler);
  } else {
    result = RewriteOptions::kOptionNameUnknown;
  }
  return result;
}

RewriteOptions::OptionSettingResult RewriteOptions::SetOptionFromName(
    StringPiece name, StringPiece value) {
  OptionBaseVector::iterator it = std::lower_bound(
      all_options_.begin(), all_options_.end(), name,
      RewriteOptions::OptionNameLessThanArg);
  if (it != all_options_.end()) {
    OptionBase* option = *it;
    if (StringCaseEqual(name, option->option_name())) {
      if (!option->SetFromString(value.as_string())) {
        return kOptionValueInvalid;
      } else {
        return kOptionOk;
      }
    }
  }
  return kOptionNameUnknown;
}

bool RewriteOptions::OptionValue(StringPiece name,
                                 const char** id,
                                 bool* was_set,
                                 GoogleString* value) const {
  OptionBaseVector::const_iterator it = std::lower_bound(
      all_options_.begin(), all_options_.end(), name,
      RewriteOptions::OptionNameLessThanArg);
  if (it != all_options_.end()) {
    OptionBase* option = *it;
    if (StringCaseEqual(name, option->option_name())) {
      *value = option->ToString();
      *id = option->id();
      *was_set = option->was_set();
      return true;
    }
  }
  return false;
}

bool RewriteOptions::SetOptionFromNameAndLog(StringPiece name,
                                             StringPiece value,
                                             MessageHandler* handler) {
  GoogleString msg;
  OptionSettingResult result = SetOptionFromName(name, value, &msg);
  if (result == kOptionOk) {
    return true;
  } else {
    handler->Message(kWarning, "%s", msg.c_str());
    return false;
  }
}

bool RewriteOptions::ParseFromString(const GoogleString& value_string,
                                     bool* value) {
  // How are bools passed in the string?  I am assuming "true"/"false" or
  // "on"/"off".
  if (StringCaseEqual(value_string, "true") ||
      StringCaseEqual(value_string, "on")) {
    *value = true;
  } else if (StringCaseEqual(value_string, "false") ||
      StringCaseEqual(value_string, "off")) {
    *value = false;
  } else {
    // value_string is not "true"/"false" or "on"/"off".  Return a parse
    // error.
    return false;
  }
  return true;
}

bool RewriteOptions::ParseFromString(const GoogleString& value_string,
                                     EnabledEnum* value) {
  bool bool_value;
  if (ParseFromString(value_string, &bool_value)) {
    *value = bool_value ? kEnabledOn : kEnabledOff;
  } else if (StringCaseEqual(value_string, "unplugged")) {
    *value = kEnabledUnplugged;
  } else {
    // value_string is not "true"/"false" or "on"/"off"/"unplugged".
    // Return a parse error.
    return false;
  }
  return true;
}

bool RewriteOptions::Enabled(Filter filter) const {
  if (disabled_filters_.IsSet(filter) || forbidden_filters_.IsSet(filter)) {
    return false;
  }
  if (enabled_filters_.IsSet(filter)) {
    return true;
  }
  switch (level_.value()) {
    case kTestingCoreFilters:
      if (IsInSet(kTestFilterSet, arraysize(kTestFilterSet), filter)) {
        return true;
      }
      FALLTHROUGH_INTENDED;
    case kCoreFilters:
      if (IsInSet(kCoreFilterSet, arraysize(kCoreFilterSet), filter)) {
        return true;
      }
      break;
    case kAllFilters:
      if (!IsInSet(kDangerousFilterSet, arraysize(kDangerousFilterSet),
                   filter)) {
        return true;
      }
      break;
    case kPassThrough:
      break;
  }
  return false;
}

bool RewriteOptions::Forbidden(Filter filter) const {
  return (forbidden_filters_.IsSet(filter) ||
          (forbid_all_disabled_filters() && disabled_filters_.IsSet(filter)));
}

bool RewriteOptions::Forbidden(StringPiece filter_id) const {
  // It's forbidden if it's expressly forbidden or if it's disabled and all
  //  disabled filters are forbidden.
  RewriteOptions::Filter filter = RewriteOptions::LookupFilterById(filter_id);
  // TODO(jmarantz): handle "ce" which is not indexed as a single filter.
  return ((filter != kEndOfFilters) && Forbidden(filter));
}

bool RewriteOptions::HasRejectedHeader(
    const StringPiece& header_name,
    const RequestHeaders* request_headers) const {
  ConstStringStarVector header_values;
  if (request_headers->Lookup(header_name, &header_values)) {
    for (int i = 0, n = header_values.size(); i < n; ++i) {
      if (IsRejectedRequest(header_name, *header_values[i])) {
        return true;
      }
    }
  }
  return false;
}

bool RewriteOptions::IsRequestDeclined(
    const GoogleString& url,
    const RequestHeaders* request_headers) const {
  if (IsRejectedUrl(url) ||
      HasRejectedHeader(HttpAttributes::kUserAgent, request_headers) ||
      HasRejectedHeader(HttpAttributes::kXForwardedFor, request_headers)) {
    return true;
  }

  return false;
}

int64 RewriteOptions::ImageInlineMaxBytes() const {
  if (Enabled(kInlineImages)) {
    return image_inline_max_bytes_.value();
  } else {
    return 0;
  }
}

void RewriteOptions::set_image_inline_max_bytes(int64 x) {
  set_option(x, &image_inline_max_bytes_);
  if (!css_image_inline_max_bytes_.was_set() &&
      x > css_image_inline_max_bytes_.value()) {
    // Make sure css_image_inline_max_bytes is at least image_inline_max_bytes
    // if it has not been explicitly configured.
    css_image_inline_max_bytes_.set(x);
  }
}

int64 RewriteOptions::CssImageInlineMaxBytes() const {
  if (Enabled(kInlineImages)) {
    return css_image_inline_max_bytes_.value();
  } else {
    return 0;
  }
}

int64 RewriteOptions::MaxImageInlineMaxBytes() const {
  return std::max(ImageInlineMaxBytes(),
                  CssImageInlineMaxBytes());
}

void RewriteOptions::GetEnabledFiltersRequiringScriptExecution(
    RewriteOptions::FilterVector* filters) const {
  for (int i = 0, n = arraysize(kRequiresScriptExecutionFilterSet); i < n;
       ++i) {
    if (Enabled(kRequiresScriptExecutionFilterSet[i])) {
      filters->push_back(kRequiresScriptExecutionFilterSet[i]);
    }
  }
}

void RewriteOptions::DisableFiltersRequiringScriptExecution() {
  for (int i = 0, n = arraysize(kRequiresScriptExecutionFilterSet); i < n;
       ++i) {
    DisableFilter(kRequiresScriptExecutionFilterSet[i]);
  }
}

DomainLawyer* RewriteOptions::WriteableDomainLawyer() {
  Modify();
  return domain_lawyer_.MakeWriteable();
}

JavascriptLibraryIdentification* RewriteOptions::
    WriteableJavascriptLibraryIdentification() {
  Modify();
  return javascript_library_identification_.MakeWriteable();
}

void RewriteOptions::Merge(const RewriteOptions& src) {
  DCHECK(!frozen_);
#ifndef NDEBUG
  CHECK(src.MergeOK());  // DCHECK outside of the #ifndef does not link.
#endif

  bool modify = src.modified_;

  DCHECK_EQ(all_options_.size(), src.all_options_.size());
  DCHECK_EQ(initialized_options_, src.initialized_options_);
  DCHECK_EQ(initialized_options_, all_options_.size());

  // If this.forbid_all_disabled_filters() is true
  // but src.forbid_all_disabled_filters() is false,
  // the default merging logic will set it false in the result, but we need
  // to toggle the value: once it's set it has to stay set.
  bool new_forbid_all_disabled = (forbid_all_disabled_filters() ||
                                  src.forbid_all_disabled_filters());

  // If ForbidAllDisabledFilters is turned on, it means no-one can enable a
  // filter that isn't already enabled, meaning the filters enabled in 'src'
  // cannot be enabled in 'this'.
  if (!forbid_all_disabled_filters()) {
    // Enabled filters in src override disabled filters in this.
    disabled_filters_.EraseSet(src.enabled_filters_);
  }

  modify |= enabled_filters_.Merge(src.enabled_filters_);
  modify |= disabled_filters_.Merge(src.disabled_filters_);

  // Clean up enabled filters list to make debugging easier.
  enabled_filters_.EraseSet(disabled_filters_);

  // Forbidden filters strictly merge, with no exclusions.  E.g. You can never
  // enable a filter in an .htaccess file that was forbidden above.
  modify |= forbidden_filters_.Merge(src.forbidden_filters_);

  enabled_filters_.EraseSet(forbidden_filters_);

  for (FilterIdSet::const_iterator p = src.distributable_filters_.begin(),
           e = src.distributable_filters_.end(); p != e; ++p) {
    StringPiece filter_id = *p;
    // Distributable filters union when merged.
    distributable_filters_.insert(filter_id.as_string());
  }

  for (int i = 0, n = src.experiment_specs_.size(); i < n; ++i) {
    ExperimentSpec* spec = src.experiment_specs_[i]->Clone();
    InsertExperimentSpecInVector(spec);
  }

  if (src.downstream_cache_purge_location_prefix_.was_set()) {
    set_downstream_cache_purge_location_prefix(
      src.downstream_cache_purge_location_prefix());
  }
  for (int i = 0, n = src.custom_fetch_headers_.size(); i < n; ++i) {
    NameValue* nv = src.custom_fetch_headers_[i];
    AddCustomFetchHeader(nv->name, nv->value);
  }

  experiment_id_ = src.experiment_id_;
  for (int i = 0, n = src.num_url_valued_attributes(); i < n; ++i) {
    StringPiece element;
    StringPiece attribute;
    semantic_type::Category category;
    src.UrlValuedAttribute(i, &element, &attribute, &category);
    AddUrlValuedAttribute(element, attribute, category);
  }

  // Note that from the perspective of this class, we can be merging
  // RewriteOptions subclasses & superclasses, so don't read anything
  // that doesn't exist.  However this is almost certainly the wrong
  // thing to do -- we should ensure that within a system all the
  // RewriteOptions that are instantiated are the same sublcass, so
  // DCHECK that they have the same number of options.
  size_t options_to_read = std::max(all_options_.size(),
                                    src.all_options_.size());
  DCHECK_EQ(all_options_.size(), src.all_options_.size());
  size_t options_to_merge = std::min(options_to_read, all_options_.size());
  for (size_t i = 0; i < options_to_merge; ++i) {
    all_options_[i]->Merge(src.all_options_[i]);
  }

  FastWildcardGroupMap::const_iterator it = src.rejected_request_map_.begin();
  for (; it != src.rejected_request_map_.end(); ++it) {
    std::pair<FastWildcardGroupMap::iterator, bool> insert_result =
        rejected_request_map_.insert(std::make_pair(
            it->first, static_cast<FastWildcardGroup*>(NULL)));
    if (insert_result.second) {
      insert_result.first->second = new FastWildcardGroup;
    }
    insert_result.first->second->AppendFrom(*it->second);
  }

  domain_lawyer_.MergeOrShare(src.domain_lawyer_);
  javascript_library_identification_.MergeOrShare(
      src.javascript_library_identification_);

  file_load_policy_.Merge(src.file_load_policy_);
  allow_resources_.AppendFrom(src.allow_resources_);
  retain_comments_.AppendFrom(src.retain_comments_);
  lazyload_enabled_classes_.AppendFrom(src.lazyload_enabled_classes_);
  blocking_rewrite_referer_urls_.AppendFrom(
      src.blocking_rewrite_referer_urls_);
  override_caching_wildcard_.AppendFrom(src.override_caching_wildcard_);

  // Merge url_cache_invalidation_entries_ so that increasing order of timestamp
  // is preserved (assuming this.url_cache_invalidation_entries_ and
  // src.url_cache_invalidation_entries_ are both ordered).
  int original_size = url_cache_invalidation_entries_.size();
  // Append copies of src's url cache invalidation entries to this.
  for (int i = 0, n = src.url_cache_invalidation_entries_.size(); i < n; ++i) {
    url_cache_invalidation_entries_.push_back(
        src.url_cache_invalidation_entries_[i]->Clone());
  }
  // Now url_cache_invalidation_entries_ consists of two ordered ranges: [begin,
  // begin+original_size) and [begin+original_size, end).  Hence we can use
  // inplace_merge.
  std::inplace_merge(url_cache_invalidation_entries_.begin(),
                     url_cache_invalidation_entries_.begin() + original_size,
                     url_cache_invalidation_entries_.end(),
                     RewriteOptions::CompareUrlCacheInvalidationEntry);

  // Merging url_cache_invalidation_map_ is simple: the latest invalidation
  // wins, which is already the policy in PurgeUrl.
  //
  // TODO(jmarantz): this map can be large, and will generally not be changed
  // in .htaccess files but stay the same across the vhost.  We should share the
  // map and do copy-on-write.  This should be done in a general way so that
  // we can also share other potentially large objects in RewriteOptions such as
  // DomainLawyer and the load-from-file infrastructure.
  for (UrlCacheInvalidationMap::const_iterator p =
           src.url_cache_invalidation_map_.begin(),
           e = src.url_cache_invalidation_map_.end(); p != e; ++p) {
    PurgeUrl(p->first, p->second);
  }

  // If either side has forbidden all disabled filters then the result must
  // too. This is required to prevent subdirectories from turning it off when
  // a parent directory has turned it on (by mod_instaweb.cc/merge_dir_config).
  if (forbid_all_disabled_filters_.was_set() ||
      src.forbid_all_disabled_filters_.was_set()) {
    set_forbid_all_disabled_filters(new_forbid_all_disabled);
  }

  if (modify) {
    Modify();
  }
}

RewriteOptions::MutexedOptionInt64MergeWithMax::MutexedOptionInt64MergeWithMax()
    : mutex_(new NullRWLock) {
}

RewriteOptions::MutexedOptionInt64MergeWithMax::
~MutexedOptionInt64MergeWithMax() {
}

void RewriteOptions::MutexedOptionInt64MergeWithMax::Merge(
    const OptionBase* src_base) {
  // This option must be a MutexedOptionInt64 everywhere, so this cast is safe.
  const MutexedOptionInt64MergeWithMax* src =
      static_cast<const MutexedOptionInt64MergeWithMax*>(src_base);
  bool src_was_set;
  int64 src_value;
  {
    ThreadSystem::ScopedReader read_lock(src->mutex());
    src_was_set = src->was_set();
    src_value = src->value();
  }
  // We don't grab a writer lock because at merge time this is
  // only accessible to the current thread.
  if (src_was_set && (!was_set() || src_value > value())) {
    set(src_value);
  }
}

RewriteOptions* RewriteOptions::Clone() const {
  RewriteOptions* options = NewOptions();
  options->Merge(*this);
  options->frozen_ = false;
  options->modified_ = false;
  return options;
}

RewriteOptions* RewriteOptions::NewOptions() const {
  return new RewriteOptions(thread_system_);
}

GoogleString RewriteOptions::OptionSignature(const GoogleString& x,
                                             const Hasher* hasher) {
  return hasher->Hash(x);
}

GoogleString RewriteOptions::OptionSignature(RewriteLevel level,
                                             const Hasher* hasher) {
  switch (level) {
    case kPassThrough: return "p";
    case kCoreFilters: return "c";
    case kTestingCoreFilters: return "t";
    case kAllFilters: return "a";
  }
  return "?";
}

GoogleString RewriteOptions::OptionSignature(const BeaconUrl& beacon_url,
                                             const Hasher* hasher) {
  return hasher->Hash(ToString(beacon_url));
}

void RewriteOptions::ForbidFiltersForPreserveUrl() {
  if (image_preserve_urls()) {
    for (int i = 0, n = arraysize(kImagePreserveUrlForbiddenFilters); i < n;
         ++i) {
      ForbidFilter(kImagePreserveUrlForbiddenFilters[i]);
    }
  }
  if (js_preserve_urls()) {
    for (int i = 0, n = arraysize(kJsPreserveUrlForbiddenFilters); i < n;
         ++i) {
      ForbidFilter(kJsPreserveUrlForbiddenFilters[i]);
    }
  }
  if (css_preserve_urls()) {
    for (int i = 0, n = arraysize(kCssPreserveUrlForbiddenFilters); i < n;
         ++i) {
      ForbidFilter(kCssPreserveUrlForbiddenFilters[i]);
    }
  }
}

void RewriteOptions::ResolveConflicts() {
  DCHECK(!frozen_);
  ForbidFiltersForPreserveUrl();
}

void RewriteOptions::Freeze() {
  if (!frozen_) {
    frozen_ = true;
    signature_.clear();
  }
}

void RewriteOptions::ComputeSignature() {
  if (frozen_) {
    return;
  }
  ResolveConflicts();
#ifndef NDEBUG
  if (!options_uniqueness_checked_) {
    options_uniqueness_checked_ = true;
    StringSet id_set;
    for (int i = 0, n = all_options_.size(); i < n; ++i) {
      const char* id = all_options_[i]->id();
      std::pair<StringSet::iterator, bool> insertion = id_set.insert(id);
      DCHECK(insertion.second) << "Duplicate RewriteOption option id: " << id;
    }
  }
#endif

  signature_ = IntegerToString(kOptionsVersion);
  for (int i = kFirstFilter; i != kEndOfFilters; ++i) {
    Filter filter = static_cast<Filter>(i);
    if (Enabled(filter)) {
      StrAppend(&signature_, "_", FilterId(filter));
    }
  }
  signature_ += "O";
  for (int i = 0, n = all_options_.size(); i < n; ++i) {
    // Keep the signature relatively short by only including options
    // with values overridden from the default.
    OptionBase* option = all_options_[i];
    if (option->is_used_for_signature_computation() && option->was_set()) {
      StrAppend(&signature_, option->id(), ":",
                option->Signature(hasher()), "_");
    }
  }
  if (javascript_library_identification() != NULL) {
    StrAppend(&signature_, "LI:");
    javascript_library_identification()->AppendSignature(&signature_);
    StrAppend(&signature_, "_");
  }
  StrAppend(&signature_, domain_lawyer_->Signature(), "_");
  StrAppend(&signature_, "AR:", allow_resources_.Signature(), "_");
  StrAppend(&signature_, "RC:", retain_comments_.Signature(), "_");
  StrAppend(&signature_, "LDC:", lazyload_enabled_classes_.Signature(), "_");
  StrAppend(&signature_, "BRRU:",
            blocking_rewrite_referer_urls_.Signature(), "_");
  StrAppend(&signature_, "UCI:");
  for (int i = 0, n = url_cache_invalidation_entries_.size(); i < n; ++i) {
    const UrlCacheInvalidationEntry& entry =
        *url_cache_invalidation_entries_[i];
    if (!entry.ignores_metadata_and_pcache) {
      StrAppend(&signature_, entry.ComputeSignature(), "|");
    }
  }

  // Note that we do not include the url_cache_invalidation_map_ in the
  // signature because we don't want to flush the entire metadata cache
  // when we flush one entry.  However we do consider it in IsEqual().

  // rejected_request_map_ is not added to rewrite options signature as this
  // should not affect rewriting and metadata or property cache lookups.
  StrAppend(&signature_, "OC:", override_caching_wildcard_.Signature(), "_");
  frozen_ = true;

  // TODO(jmarantz): Incorporate signature from file_load_policy.  However, the
  // changes made here make our system strictly more correct than it was before,
  // using an ad-hoc signature in css_filter.cc.
}

void RewriteOptions::ClearSignatureWithCaution() {
  frozen_ = false;
#ifndef NDEBUG
  last_thread_id_.reset();
#endif
  signature_.clear();
}

bool RewriteOptions::IsEqual(const RewriteOptions& that) const {
  DCHECK(frozen_);
  DCHECK(that.frozen_);
  if (signature() != that.signature()) {
    return false;
  }

  // TODO(jmarantz): move more stuff out of the signature() and into the
  // IsEqual function.  We might also want to make a second signature so
  // that IsEqual is not too slow.
  //
  // TODO(jmarantz): consider making a second signature for
  // url_cache_invalidation_map_ and other stuff that we exclude for
  // the RewriteOptions::signature.
  return (url_cache_invalidation_map_ == that.url_cache_invalidation_map_);
}

GoogleString RewriteOptions::ToString(RewriteLevel level) {
  switch (level) {
    case kPassThrough: return "Pass Through";
    case kCoreFilters: return "Core Filters";
    case kTestingCoreFilters: return "Testing Core Filters";
    case kAllFilters: return "All Filters";
  }
  return "?";
}

GoogleString RewriteOptions::ToString(const BeaconUrl& beacon_url) {
  GoogleString result = beacon_url.http;
  if (beacon_url.http != beacon_url.https) {
    StrAppend(&result, " ", beacon_url.https);
  }
  return result;
}

GoogleString RewriteOptions::FilterSetToString(
    const FilterSet& filter_set) const {
  GoogleString output;
  for (int i = kFirstFilter; i != kEndOfFilters; ++i) {
    Filter filter = static_cast<Filter>(i);
    if (filter_set.IsSet(filter)) {
      StrAppend(&output, FilterId(filter), "\t", FilterName(filter), "\n");
    }
  }
  return output;
}

GoogleString RewriteOptions::OptionsToString() const {
  GoogleString output;
  StrAppend(&output, "Version: ", IntegerToString(kOptionsVersion), "\n\n");
  output += "Filters\n";
  for (int i = kFirstFilter; i != kEndOfFilters; ++i) {
    Filter filter = static_cast<Filter>(i);
    if (Enabled(filter)) {
      StrAppend(&output, FilterId(filter), "\t", FilterName(filter), "\n");
    }
  }
  output += "\nOptions\n";
  for (int i = 0, n = all_options_.size(); i < n; ++i) {
    // Only including options with values overridden from the default.
    OptionBase* option = all_options_[i];
    if (option->was_set()) {
      StrAppend(&output, "  ", option->id(), "\t", option->ToString(), "\n");
    }
  }
  output += "\nDomain Lawyer\n";
  StrAppend(&output, domain_lawyer_->ToString("  "));
  // TODO(mmohabey): Incorporate ToString() from the file_load_policy,
  // allow_resources, and retain_comments.
  if (!url_cache_invalidation_entries_.empty()) {
    StrAppend(&output, "\nURL cache invalidation entries\n");
    for (int i = 0, n = url_cache_invalidation_entries_.size(); i < n; ++i) {
      StrAppend(&output, "  ", url_cache_invalidation_entries_[i]->ToString(),
                "\n");
    }
  }
  if (rejected_request_map_.size() > 0) {
    StrAppend(&output, "\nRejected request map\n");
    FastWildcardGroupMap::const_iterator it = rejected_request_map_.begin();
    for (; it != rejected_request_map_.end(); ++it) {
      StrAppend(&output, " ", it->first, " ", it->second->Signature(), "\n");
    }
  }
  GoogleString override_caching_wildcard_string(
      override_caching_wildcard_.Signature());
  if (!override_caching_wildcard_string.empty()) {
    StrAppend(&output, "\nOverride caching wildcards\n",
              override_caching_wildcard_string);
  }
  return output;
}

GoogleString RewriteOptions::ToExperimentString() const {
  // Only add the experiment id if we're running this experiment.
  if (GetExperimentSpec(experiment_id_) != NULL) {
    return StringPrintf("Experiment: %d", experiment_id_);
  }
  return GoogleString();
}

GoogleString RewriteOptions::ToExperimentDebugString() const {
  GoogleString output = ToExperimentString();
  if (!output.empty()) {
    output += "; ";
  }
  if (!running_experiment()) {
    output += "off; ";
  } else if (experiment_id_ == experiment::kExperimentNotSet) {
    output += "not set; ";
  } else if (experiment_id_ == experiment::kNoExperiment) {
    output += "no experiment; ";
  }
  for (int f = kFirstFilter; f != kEndOfFilters; ++f) {
    Filter filter = static_cast<Filter>(f);
    if (Enabled(filter)) {
      output += FilterId(filter);
      output += ",";
    }
  }
  output += "css:";
  output += Integer64ToString(css_inline_max_bytes());
  output += ",im:";
  output += Integer64ToString(ImageInlineMaxBytes());
  output += ",js:";
  output += Integer64ToString(js_inline_max_bytes());
  output += ";";
  return output;
}

void RewriteOptions::Modify() {
  DCHECK(!frozen_);
  modified_ = true;

  // The data in last_thread_id_ is currently only examined in DCHECKs so
  // there's no need to pay the cost of populating it in produciton.
#ifndef NDEBUG
  if (thread_system_ != NULL) {
    if (last_thread_id_.get() == NULL) {
      last_thread_id_.reset(thread_system_->GetThreadId());
    } else {
      DCHECK(ModificationOK());
    }
  }
#endif
}

// These method implementations are only in debug builds for asserting that
// the usage patterns are safe.  In fact we don't even have last_thread_id_
// compiled into the class in non-debug compiles.
#ifndef NDEBUG
bool RewriteOptions::ModificationOK() const {
  return ((last_thread_id_.get() == NULL) ||
          (last_thread_id_->IsCurrentThread()));
}

bool RewriteOptions::MergeOK() const {
  return frozen_ || (last_thread_id_.get() == NULL) ||
      last_thread_id_->IsCurrentThread();
}
#endif

void RewriteOptions::AddCustomFetchHeader(const StringPiece& name,
                                          const StringPiece& value) {
  custom_fetch_headers_.push_back(new NameValue(name, value));
}

// We expect experiment_specs_.size() to be small (not more than 2 or 3)
// so there is no need to optimize this
RewriteOptions::ExperimentSpec* RewriteOptions::GetExperimentSpec(
    int id) const {
  for (int i = 0, n = experiment_specs_.size(); i < n; ++i) {
    if (experiment_specs_[i]->id() == id) {
      return experiment_specs_[i];
    }
  }
  return NULL;
}

bool RewriteOptions::AvailableExperimentId(int id) {
  if (id < 0 || id == experiment::kExperimentNotSet ||
      id == experiment::kNoExperiment) {
    return false;
  }
  return (GetExperimentSpec(id) == NULL);
}

bool RewriteOptions::AddExperimentSpec(const StringPiece& spec,
                                       MessageHandler* handler) {
  ExperimentSpec* f_spec = new ExperimentSpec(spec, this, handler);
  return InsertExperimentSpecInVector(f_spec);
}

bool RewriteOptions::InsertExperimentSpecInVector(ExperimentSpec* spec) {
  // See RewriteOptions::GetExperimentStateStr for why we can't have more than
  // 26.
  if (!AvailableExperimentId(spec->id()) || spec->percent() <= 0 ||
      experiment_percent_ + spec->percent() > 100 ||
      experiment_specs_.size() + 1 > 26) {
    delete spec;
    return false;
  }
  experiment_specs_.push_back(spec);
  experiment_percent_ += spec->percent();
  return true;
}

// Always enable add_head, insert_ga, add_instrumentation, and HtmlWriter.  This
// is considered a "no-filter" base for experiments.
bool RewriteOptions::SetupExperimentRewriters() {
  // Don't change anything if we're not in an experiment or have some
  // unset id.
  if (experiment_id_ == experiment::kExperimentNotSet ||
      experiment_id_ == experiment::kNoExperiment) {
    return true;
  }
  // Control: just make sure that the necessary stuff is on.
  // Do NOT try to set up things to look like the ExperimentSpec
  // for this id: it doesn't match the rewrite options.
  ExperimentSpec* spec = GetExperimentSpec(experiment_id_);
  if (spec == NULL) {
    return false;
  }

  if (!spec->ga_id().empty()) {
    set_ga_id(spec->ga_id());
  }

  set_experiment_ga_slot(spec->slot());

  if (spec->use_default()) {
    // We need these for the experiment to work properly.
    SetRequiredExperimentFilters();
    return true;
  }

  ClearFilters();
  SetRewriteLevel(spec->rewrite_level());
  EnableFilters(spec->enabled_filters());
  DisableFilters(spec->disabled_filters());
  // spec doesn't specify forbidden filters so no need to call ForbidFilters().
  // We need these for the experiment to work properly.
  SetRequiredExperimentFilters();
  set_css_inline_max_bytes(spec->css_inline_max_bytes());
  set_js_inline_max_bytes(spec->js_inline_max_bytes());
  set_image_inline_max_bytes(spec->image_inline_max_bytes());
  SetOptionsFromName(spec->filter_options());
  return true;
}

void RewriteOptions::SetRequiredExperimentFilters() {
  ForceEnableFilter(RewriteOptions::kAddHead);
  ForceEnableFilter(RewriteOptions::kAddInstrumentation);
  ForceEnableFilter(RewriteOptions::kComputeStatistics);
  ForceEnableFilter(RewriteOptions::kInsertGA);
  ForceEnableFilter(RewriteOptions::kHtmlWriterFilter);
}

RewriteOptions::ExperimentSpec::ExperimentSpec(const StringPiece& spec,
                                               RewriteOptions* options,
                                               MessageHandler* handler)
    : id_(experiment::kExperimentNotSet),
      ga_id_(options->ga_id()),
      ga_variable_slot_(options->experiment_ga_slot()),
      percent_(0),
      rewrite_level_(kPassThrough),
      css_inline_max_bytes_(kDefaultCssInlineMaxBytes),
      js_inline_max_bytes_(kDefaultJsInlineMaxBytes),
      image_inline_max_bytes_(kDefaultImageInlineMaxBytes),
      use_default_(false) {
  Initialize(spec, handler);
}

RewriteOptions::ExperimentSpec::ExperimentSpec(int id)
    : id_(id),
      ga_id_(""),
      ga_variable_slot_(kDefaultExperimentSlot),
      percent_(0),
      rewrite_level_(kPassThrough),
      css_inline_max_bytes_(kDefaultCssInlineMaxBytes),
      js_inline_max_bytes_(kDefaultJsInlineMaxBytes),
      image_inline_max_bytes_(kDefaultImageInlineMaxBytes),
      use_default_(false) {
}

RewriteOptions::ExperimentSpec::~ExperimentSpec() { }

void RewriteOptions::ExperimentSpec::Merge(const ExperimentSpec& spec) {
  enabled_filters_.Merge(spec.enabled_filters_);
  disabled_filters_.Merge(spec.disabled_filters_);
  for (OptionSet::const_iterator iter = spec.filter_options_.begin();
       iter != spec.filter_options_.end(); ++iter) {
    filter_options_.insert(*iter);
  }
  ga_id_ = spec.ga_id_;
  ga_variable_slot_ = spec.ga_variable_slot_;
  percent_ = spec.percent_;
  rewrite_level_ = spec.rewrite_level_;
  css_inline_max_bytes_ = spec.css_inline_max_bytes_;
  js_inline_max_bytes_ = spec.js_inline_max_bytes_;
  image_inline_max_bytes_ = spec.image_inline_max_bytes_;
  use_default_ = spec.use_default_;
}

RewriteOptions::ExperimentSpec* RewriteOptions::ExperimentSpec::Clone() {
  ExperimentSpec* ret = new ExperimentSpec(id_);
  ret->Merge(*this);
  return ret;
}

// Options are written in the form:
// ExperimentSpec 'id= 2; percent= 20; RewriteLevel= CoreFilters;
// enable= resize_images; disable = is; inline_css = 25556; ga=UA-233842-1'
void RewriteOptions::ExperimentSpec::Initialize(const StringPiece& spec,
                                                MessageHandler* handler) {
  StringPieceVector spec_pieces;
  SplitStringPieceToVector(spec, ";", &spec_pieces, true);
  for (int i = 0, n = spec_pieces.size(); i < n; ++i) {
    StringPiece piece = spec_pieces[i];
    TrimWhitespace(&piece);
    if (StringCaseStartsWith(piece, "id")) {
      StringPiece id = PieceAfterEquals(piece);
      if (id.length() > 0 && !StringToInt(id, &id_)) {
        // If we failed to turn this string into an int, then
        // set the id_ to kExperimentNotSet so we don't end up adding
        // in this spec.
        id_ = experiment::kExperimentNotSet;
      }
    } else if (StringCaseEqual(piece, "default")) {
      // "Default" means use whatever RewriteOptions are.
      use_default_ = true;
    } else if (StringCaseStartsWith(piece, "percent")) {
      StringPiece percent = PieceAfterEquals(piece);
      StringToInt(percent, &percent_);
    } else if (StringCaseStartsWith(piece, "ga")) {
      StringPiece ga = PieceAfterEquals(piece);
      if (ga.length() > 0) {
        ga_id_ = GoogleString(ga.data(), ga.length());
      }
    } else if (StringCaseStartsWith(piece, "slot")) {
      StringPiece slot = PieceAfterEquals(piece);
      int stored_id = ga_variable_slot_;
      StringToInt(slot, &ga_variable_slot_);
      // Valid custom variable slots are 1-5 inclusive.
      if (ga_variable_slot_ < 1 || ga_variable_slot_ > 5) {
        LOG(INFO) << "Invalid custom variable slot.";
        ga_variable_slot_ = stored_id;
      }
    } else if (StringCaseStartsWith(piece, "level")) {
      StringPiece level = PieceAfterEquals(piece);
      if (level.length() > 0) {
        ParseRewriteLevel(level, &rewrite_level_);
      }
    } else if (StringCaseStartsWith(piece, "enable")) {
      StringPiece enabled = PieceAfterEquals(piece);
      if (enabled.length() > 0) {
        AddCommaSeparatedListToFilterSet(enabled, &enabled_filters_, handler);
      }
    } else if (StringCaseStartsWith(piece, "disable")) {
      StringPiece disabled = PieceAfterEquals(piece);
      if (disabled.length() > 0) {
        AddCommaSeparatedListToFilterSet(disabled, &disabled_filters_, handler);
      }
    } else if (StringCaseStartsWith(piece, "options")) {
      StringPiece options = PieceAfterEquals(piece);
      if (options.length() > 0) {
        AddCommaSeparatedListToOptionSet(options, &filter_options_, handler);
      }
    } else if (StringCaseStartsWith(piece, "inline_css")) {
      StringPiece max_bytes = PieceAfterEquals(piece);
      if (max_bytes.length() > 0) {
        StringToInt64(max_bytes, &css_inline_max_bytes_);
      }
    } else if (StringCaseStartsWith(piece, "inline_images")) {
      StringPiece max_bytes = PieceAfterEquals(piece);
      if (max_bytes.length() > 0) {
        StringToInt64(max_bytes, &image_inline_max_bytes_);
      }
    } else if (StringCaseStartsWith(piece, "inline_js")) {
      StringPiece max_bytes = PieceAfterEquals(piece);
      if (max_bytes.length() > 0) {
        StringToInt64(max_bytes, &js_inline_max_bytes_);
      }
    }
  }
}

void RewriteOptions::AddUrlValuedAttribute(
    const StringPiece& element, const StringPiece& attribute,
    semantic_type::Category category) {
  if (url_valued_attributes_ == NULL) {
    url_valued_attributes_.reset(new std::vector<ElementAttributeCategory>());
  }
  ElementAttributeCategory eac;
  element.CopyToString(&eac.element);
  attribute.CopyToString(&eac.attribute);
  eac.category = category;
  url_valued_attributes_->push_back(eac);
}

void RewriteOptions::UrlValuedAttribute(
    int index, StringPiece* element, StringPiece* attribute,
    semantic_type::Category* category) const {
  const ElementAttributeCategory& eac = (*url_valued_attributes_)[index];
  *element = StringPiece(eac.element);
  *attribute = StringPiece(eac.attribute);
  *category = eac.category;
}

bool RewriteOptions::IsUrlPurged(StringPiece url, int64 time_ms) const {
  if (!url_cache_invalidation_map_.empty()) {
    UrlCacheInvalidationMap::const_iterator p =
        url_cache_invalidation_map_.find(url.as_string());
    if (p != url_cache_invalidation_map_.end()) {
      int64 timestamp_ms = p->second;
      if (time_ms <= timestamp_ms) {
        return true;
      }
    }
  }
  return false;
}

bool RewriteOptions::IsUrlCacheValid(StringPiece url, int64 time_ms) const {
  // First check the hashed url map.  If we don't find an invalidation in the
  // map we can check the wildcards.
  if (IsUrlPurged(url, time_ms)) {
    return false;
  }

  int i = 0;
  int n = url_cache_invalidation_entries_.size();
  while (i < n && time_ms > url_cache_invalidation_entries_[i]->timestamp_ms) {
    ++i;
  }
  // Now all entries from 0 to i-1 have timestamp less than time_ms and hence
  // cannot invalidate a url cached at time_ms.
  // TODO(sriharis):  Should we use binary search instead of the above loop?
  // Probably does not make sense as long as the following while loop is there.

  // Once FastWildcardGroup is in, we should check if it makes sense to make a
  // FastWildcardGroup of Wildcards from position i to n-1, and Match against
  // it.
  while (i < n) {
    if (url_cache_invalidation_entries_[i]->url_pattern.Match(url)) {
      return false;
    }
    ++i;
  }
  return true;
}

void RewriteOptions::PurgeUrl(StringPiece url, int64 timestamp_ms) {
  std::pair<UrlCacheInvalidationMap::iterator, bool> insertion =
      url_cache_invalidation_map_.insert(UrlCacheInvalidationMap::value_type(
          url.as_string(), timestamp_ms));

  // If there was already a value and this one is newer, replace it.
  if (!insertion.second && (timestamp_ms > insertion.first->second)) {
    insertion.first->second = timestamp_ms;
  }
}

void RewriteOptions::AddUrlCacheInvalidationEntry(
    StringPiece url_pattern, int64 timestamp_ms,
    bool ignores_metadata_and_pcache) {
  if (enable_cache_purge() &&
      !ignores_metadata_and_pcache &&
      (url_pattern.find('*') == StringPiece::npos)) {
    // We could use Wildcard::IsSimple but let's define ? to mean in this
    // context a literal '?' because query-params are way more common than
    // single-char matching.
    PurgeUrl(url_pattern, timestamp_ms);
  } else {
    if (!url_cache_invalidation_entries_.empty()) {
      // Check that this Add preserves the invariant that
      // url_cache_invalidation_entries_ is sorted on timestamp_ms.
      if (url_cache_invalidation_entries_.back()->timestamp_ms > timestamp_ms) {
        LOG(DFATAL) << "Timestamp " << timestamp_ms << " is less than the last "
                    << "timestamp already added: "
                    << url_cache_invalidation_entries_.back()->timestamp_ms;
        return;
      }
    }
    url_cache_invalidation_entries_.push_back(
        new UrlCacheInvalidationEntry(url_pattern, timestamp_ms,
                                      ignores_metadata_and_pcache));
  }
}

bool RewriteOptions::UpdateCacheInvalidationTimestampMs(int64 timestamp_ms) {
  DCHECK_LT(0, timestamp_ms);
  bool ret = false;
  ScopedMutex lock(cache_invalidation_timestamp_.mutex());
  if (cache_invalidation_timestamp_.value() < timestamp_ms) {
    bool recompute_signature = frozen_;
    frozen_ = false;
#ifndef NDEBUG
    last_thread_id_.reset();
#endif
    cache_invalidation_timestamp_.checked_set(timestamp_ms);
    Modify();
    if (recompute_signature) {
      signature_.clear();
      ComputeSignature();
    }
    ret = true;
  }
  return ret;
}

bool RewriteOptions::IsUrlCacheInvalidationEntriesSorted() const {
  for (int i = 0, n = url_cache_invalidation_entries_.size(); i < n - 1; ++i) {
    if (url_cache_invalidation_entries_[i]->timestamp_ms >
        url_cache_invalidation_entries_[i + 1]->timestamp_ms) {
      return false;
    }
  }
  return true;
}

}  // namespace net_instaweb
