#!/bin/bash
#
# Copyright 2012 Google Inc. All Rights Reserved.
# Author: jefftk@google.com (Jeff Kaufman)
#
# Test that ModPagespeedUrlValuedAttribute is respected.
#
# See system_test_helpers.sh for usage.

this_dir=$(dirname $0)
source "$this_dir/system_test_helpers.sh" || exit 1

TEST="$HOSTNAME/mod_pagespeed_test"
REWRITE_DOMAINS="$TEST/rewrite_domains.html"
UVA_EXTEND_CACHE="$TEST/url_valued_attribute_extend_cache.html"
UVA_EXTEND_CACHE="${UVA_EXTEND_CACHE}?ModPagespeedFilters=+left_trim_urls"

start_test Rewrite domains in dynamically defined url-valued attributes.
check [ 5 = $($WGET_DUMP $REWRITE_DOMAINS | fgrep -c http://dst.example.com) ]
check [ 1 = $($WGET_DUMP $REWRITE_DOMAINS |
  fgrep -c '<hr src=http://src.example.com/hr-image>') ]

start_test Additional url-valued attributes are fully respected.

# There are five resources that should be optimized
fetch_until $UVA_EXTEND_CACHE 'fgrep -c .pagespeed.' 5

# Make sure <custom d=...> isn't modified at all, but that everything else is
# recognized as a url and rewritten from ../foo to /foo.  This means that only
# one reference to ../mod_pagespeed should remain, <custom d=...>.
fetch_until $UVA_EXTEND_CACHE 'grep -c d=.[.][.]/mod_pa' 1
fetch_until $UVA_EXTEND_CACHE 'fgrep -c ../mod_pa' 1

# There are five images that should be optimized.
fetch_until $UVA_EXTEND_CACHE 'fgrep -c .pagespeed.ic' 5

system_test_trailer
