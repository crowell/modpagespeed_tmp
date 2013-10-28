#!/bin/bash
# Copyright 2010 Google Inc. All Rights Reserved.
# Author: abliss@google.com (Adam Bliss)
#
# Runs all Apache-specific system tests. system_test.sh should also be run
# for general system tests.
#
# Exits with status 0 if all tests pass.  Exits 1 immediately if any test fails.
# Expects APACHE_DEBUG_PAGESPEED_CONF to point to our config file,
# APACHE_LOG to the log file

if [ $# -lt 1 -o $# -gt 3 ]; then
  # Note: HOSTNAME and HTTPS_HOST should generally be localhost (when using
  # the default port) or localhost:PORT (when not). Specifically, by default
  # /mod_pagespeed_statistics is only accessible when accessed as localhost.
  echo Usage: ./apache_system_test.sh HOSTNAME [HTTPS_HOST [PROXY_HOST]]
  exit 2
fi;

if [ -z $APACHE_DEBUG_PAGESPEED_CONF ]; then
  APACHE_DEBUG_PAGESPEED_CONF=/usr/local/apache2/conf/pagespeed.conf
fi

if [ -z $APACHE_LOG ]; then
  APACHE_LOG=/usr/local/apache2/logs/error_log
fi

if [ -z $APACHE_DOC_ROOT ]; then
  APACHE_DOC_ROOT=/usr/local/apache2/htdocs/
fi

# If the user has specified an alternate WGET as an environment variable, then
# use that, otherwise use the one in the path.
if [ "$WGET" == "" ]; then
  WGET=wget
else
  echo WGET = $WGET
fi

$WGET --version | head -1 | grep -q "1\.1[2-9]" >/dev/null
if [ $? != 0 ]; then
  echo You have the wrong version of wget.  >=1.12 is required.
  exit 1
fi

HOSTNAME=$1
EXAMPLE_ROOT=http://$HOSTNAME/mod_pagespeed_example
TEST_ROOT=http://$HOSTNAME/mod_pagespeed_test
STATISTICS_URL=http://$HOSTNAME/mod_pagespeed_statistics
BAD_RESOURCE_URL=http://$HOSTNAME/mod_pagespeed/W.bad.pagespeed.cf.hash.css
MESSAGE_URL=http://$HOSTNAME/mod_pagespeed_message

HTTPS_HOST=$2

# Setup wget proxy information
export http_proxy=$3
export https_proxy=$3
export ftp_proxy=$3
export no_proxy=""

# Version timestamped with nanoseconds, making it extremely unlikely to hit.
BAD_RND_RESOURCE_URL="http://$HOSTNAME/mod_pagespeed/bad`date +%N`.\
pagespeed.cf.hash.css"

combine_css_filename=\
styles/yellow.css+blue.css+big.css+bold.css.pagespeed.cc.xo4He3_gYf.css

OUTDIR=/tmp/mod_pagespeed_test.$USER/fetched_directory
rm -rf $OUTDIR

# Wget is used three different ways.  The first way is nonrecursive and dumps a
# single page (with headers) to standard out.  This is useful for grepping for a
# single expected string that's the result of a first-pass rewrite:
#   wget -q -O --save-headers - $URL | grep -q foo
# "-q" quells wget's noisy output; "-O -" dumps to stdout; grep's -q quells
# its output and uses the return value to indicate whether the string was
# found.  Note that exiting with a nonzero value will immediately kill
# the make run.
#
# Sometimes we want to check for a condition that's not true on the first dump
# of a page, but becomes true after a few seconds as the server's asynchronous
# fetches complete.  For this we use the the fetch_until() function:
#   fetch_until $URL 'grep -c delayed_foo' 1
# In this case we will continuously fetch $URL and pipe the output to
# grep -c (which prints the count of matches); we repeat until the number is 1.
#
# The final way we use wget is in a recursive mode to download all prerequisites
# of a page.  This fetches all resources associated with the page, and thereby
# validates the resources generated by mod_pagespeed:
#   wget -H -p -S -o $WGET_OUTPUT -nd -P $OUTDIR $EXAMPLE_ROOT/$FILE
# Here -H allows wget to cross hosts (e.g. in the case of a sharded domain); -p
# means to fetch all prerequisites; "-S -o $WGET_OUTPUT" saves wget output
# (including server headers) for later analysis; -nd puts all results in one
# directory; -P specifies that directory.  We can then run commands on
# $OUTDIR/$FILE and nuke $OUTDIR when we're done.
# TODO(abliss): some of these will fail on windows where wget escapes saved
# filenames differently.
# TODO(morlovich): This isn't actually true, since we never pass in -r,
#                  so this fetch isn't recursive. Clean this up.


WGET_OUTPUT=$OUTDIR/wget_output.txt
WGET_DUMP="$WGET -q -O - --save-headers"
WGET_PREREQ="$WGET -H -p -S -o $WGET_OUTPUT -nd -P $OUTDIR"

# Call with a command and its args.  Echos the command, then tries to eval it.
# If it returns false, fail the tests.
function check() {
  echo "     " $@
  if eval "$@"; then
    return;
  else
    echo FAIL.
    exit 1;
  fi;
}

# Continuously fetches URL and pipes the output to COMMAND.  Loops until
# COMMAND outputs RESULT, in which case we return 0, or until 10 seconds have
# passed, in which case we return 1.
function fetch_until() {
  # Should not user URL as PARAM here, it rewrites value of URL for
  # the rest tests.
  REQUESTURL=$1
  COMMAND=$2
  RESULT=$3
  USERAGENT=$4

  TIMEOUT=10
  START=`date +%s`
  STOP=$((START+$TIMEOUT))
  WGET_HERE="$WGET -q"
  if [[ -n "$USERAGENT" ]]; then
    WGET_HERE="$WGET -q -U $USERAGENT"
  fi
  echo "     " Fetching $REQUESTURL until '`'$COMMAND'`' = $RESULT
  while test -t; do
    if [ `$WGET_HERE -O - $REQUESTURL 2>&1 | $COMMAND` = $RESULT ]; then
      /bin/echo ".";
      return;
    fi;
    if [ `date +%s` -gt $STOP ]; then
      /bin/echo "FAIL."
      exit 1;
    fi;
    /bin/echo -n "."
    sleep 0.1
  done;
}

# Helper to set up most filter tests
function test_filter() {
  rm -rf $OUTDIR
  mkdir -p $OUTDIR
  FILTER_NAME=$1;
  shift;
  FILTER_DESCRIPTION=$@
  echo TEST: $FILTER_NAME $FILTER_DESCRIPTION
  FILE=$FILTER_NAME.html?ModPagespeedFilters=$FILTER_NAME
  URL=$EXAMPLE_ROOT/$FILE
  FETCHED=$OUTDIR/$FILE
}

# Helper to test if we mess up extensions on requests to broken url
function test_resource_ext_corruption() {
  URL=$1
  RESOURCE=$EXAMPLE_ROOT/$2

  # Make sure the resource is actually there, that the test isn't broken
  echo checking that wgetting $URL finds $RESOURCE ...
  $WGET_DUMP $URL | grep -qi $RESOURCE
  check [ $? = 0 ]

  # Now fetch the broken version. This should succeed anyway, as we now
  # ignore the noise.
  BROKEN="$RESOURCE"broken
  $WGET_PREREQ $BROKEN
  check [ $? = 0 ]

  # Fetch normal again; ensure rewritten url for RESOURCE doesn't contain broken
  $WGET_DUMP $URL | grep broken
  check [ $? != 0 ]
}

# General system tests

echo TEST: mod_pagespeed is running in Apache and writes the expected header.
echo $WGET_DUMP $EXAMPLE_ROOT/combine_css.html
HTML_HEADERS=$($WGET_DUMP $EXAMPLE_ROOT/combine_css.html)


echo TEST: mod_pagespeed is defaulting to more than PassThrough
# Note: this is relying on lack of .htaccess in mod_pagespeed_test
check [ ! -f $APACHE_DOC_ROOT/mod_pagespeed_test/.htaccess ]
fetch_until $TEST_ROOT/bot_test.html 'grep -c \.pagespeed\.' 2

# Determine whether statistics are enabled or not.  If not, don't test them,
# but do an additional regression test that tries harder to get a cache miss.
grep "# ModPagespeedStatistics off" $APACHE_DEBUG_PAGESPEED_CONF > /dev/null
if [ $? = 0 ]; then
  echo TEST: 404s are served and properly recorded.
  NUM_404=$($WGET_DUMP $STATISTICS_URL | grep resource_404_count | cut -d: -f2)
  NUM_404=$(($NUM_404+1))
  check "$WGET -O /dev/null $BAD_RESOURCE_URL 2>&1| grep -q '404 Not Found'"
  check "$WGET_DUMP $STATISTICS_URL | grep -q 'resource_404_count: $NUM_404'"

  # Non-local access to statistics fails.
  MACHINE_NAME=$(hostname)
  ALT_STAT_URL=$(echo $STATISTICS_URL | sed s#localhost#$MACHINE_NAME#)

  wget $ALT_STAT_URL
  check [ $? = 8 ]
else
  echo TEST: 404s are served.  Statistics are disabled so not checking them.
  check "$WGET -O /dev/null $BAD_RESOURCE_URL 2>&1| grep -q '404 Not Found'"

  echo TEST: 404s properly on uncached invalid resource.
  check "$WGET -O /dev/null $BAD_RND_RESOURCE_URL 2>&1| grep -q '404 Not Found'"
fi


# Test /mod_pagespeed_message exists.
echo TEST: Check if /mod_pagespeed_message page exists.
$WGET --save-headers -q -O - $MESSAGE_URL | head -1 | grep "HTTP/1.1 200 OK"
check [ $? = 0 ];

# Note: There is a similar test in system_test.sh
#
# This tests whether fetching "/" gets you "/index.html".  With async
# rewriting, it is not deterministic whether inline css gets
# rewritten.  That's not what this is trying to test, so we use
# ?ModPagespeed=off.
echo TEST: directory is mapped to index.html.
rm -rf $OUTDIR
mkdir -p $OUTDIR
check "$WGET -q $EXAMPLE_ROOT/?ModPagespeed=off" -O $OUTDIR/mod_pagespeed_example
check "$WGET -q $EXAMPLE_ROOT/index.html?ModPagespeed=off" -O $OUTDIR/index.html
check diff $OUTDIR/index.html $OUTDIR/mod_pagespeed_example


# Individual filter tests, in alphabetical order

# This is dependent upon having a /mod_pagespeed_beacon handler.
test_filter add_instrumentation beacons load.
check $WGET_PREREQ http://$HOSTNAME/mod_pagespeed_beacon?ets=load:13
check grep -q '"204 No Content"' $WGET_OUTPUT

test_filter combine_css combines 4 CSS files into 1.
fetch_until $URL 'grep -c text/css' 1
check $WGET_PREREQ $URL
test_resource_ext_corruption $URL $combine_css_filename

test_filter extend_cache rewrites an image tag.
fetch_until $URL 'grep -c src.*91_WewrLtP' 1
check $WGET_PREREQ $URL
echo about to test resource ext corruption...
test_resource_ext_corruption $URL images/Puzzle.jpg.pagespeed.ce.91_WewrLtP.jpg

test_filter outline_javascript outlines large scripts, but not small ones.
check $WGET_PREREQ $URL
check egrep -q "'<script.*large.*src='" $FETCHED       # outlined
check egrep -q "'<script.*small.*var hello'" $FETCHED  # not outlined
echo TEST: compression is enabled for rewritten JS.
JS_URL=$(egrep -o http://.*.pagespeed.*.js $FETCHED)
echo JS_URL=\$\(egrep -o http://.*.pagespeed.*.js $FETCHED\)=\"$JS_URL\"
JS_HEADERS=$($WGET -O /dev/null -q -S --header='Accept-Encoding: gzip' \
  $JS_URL 2>&1)
echo JS_HEADERS=$JS_HEADERS
echo $JS_HEADERS | grep -qie 'HTTP/1\.. 200 OK'
check [ $? = 0 ]
echo $JS_HEADERS | grep -qi 'Content-Encoding: gzip'
check [ $? = 0 ]
echo $JS_HEADERS | grep -qi 'Vary: Accept-Encoding'
check [ $? = 0 ]
echo $JS_HEADERS | grep -qi 'Etag: W/0'
check [ $? = 0 ]
echo $JS_HEADERS | grep -qi 'Last-Modified:'
check [ $? = 0 ]

# Test RetainComment directive.
test_filter remove_comments retains appropriate comments.
check $WGET_PREREQ $URL
check grep -q retained $FETCHED        # RetainComment directive

# TODO(sligocki): This test needs to be run before below tests.
# Remove once below tests are moved to system_test.sh.
test_filter rewrite_images inlines, compresses, and resizes.
URL=$EXAMPLE_ROOT"/rewrite_images.html?ModPagespeedFilters=rewrite_images"
fetch_until $URL 'grep -c image/png' 1      # inlined
fetch_until $URL 'grep -c .pagespeed.ic' 2  # other 2 images optimized
check $WGET_PREREQ $URL
check [ `stat -c %s $OUTDIR/xBikeCrashIcn*` -lt 25000 ]      # re-encoded
check [ `stat -c %s $OUTDIR/*256x192*Puzzle*`  -lt 24126  ]  # resized
IMG_URL=$(egrep -o http://.*.pagespeed.*.jpg $FETCHED | head -n1)
check [ x"$IMG_URL" != x ]
echo TEST: headers for rewritten image "$IMG_URL"
IMG_HEADERS=$($WGET -O /dev/null -q -S --header='Accept-Encoding: gzip' \
  $IMG_URL 2>&1)
echo IMG_HEADERS=\"$IMG_HEADERS\"
echo $IMG_HEADERS | grep -qie 'HTTP/1\.. 200 OK'
check [ $? = 0 ]
# Make sure we have some valid headers.
echo "$IMG_HEADERS" | grep -qi 'Content-Type: image/jpeg'
check [ $? = 0 ]
# Make sure the response was not gzipped.
echo TEST: Images are not gzipped
echo "$IMG_HEADERS" | grep -qi 'Content-Encoding: gzip'
check [ $? != 0 ]
# Make sure there is no vary-encoding
echo TEST: Vary is not set for images
echo "$IMG_HEADERS" | grep -qi 'Vary: Accept-Encoding'
check [ $? != 0 ]
# Make sure there is an etag
echo TEST: Etags is present
echo "$IMG_HEADERS" | grep -qi 'Etag: W/0'
check [ $? = 0 ]
# Make sure an extra header is propagated from input resource to output
# resource.  X-Extra-Header is added in debug.conf.template.
echo TEST: Extra header is present
echo "$IMG_HEADERS" | grep -qi 'X-Extra-Header'
check [ $? = 0 ]
# Make sure there is a last-modified tag
echo TEST: Last-modified is present
echo "$IMG_HEADERS" | grep -qi 'Last-Modified'
check [ $? = 0 ]

# Depends upon "Header append Vary User-Agent" and ModPagespeedRespectVary.
echo TEST: respect vary user-agent
URL=$TEST_ROOT/vary/index.html?ModPagespeedFilters=inline_css
echo $WGET_DUMP $URL
$WGET_DUMP $URL | grep -q "<style>"
check [ $? != 0 ]

echo TEST: ModPagespeedShardDomain directive in .htaccess file
rm -rf $OUTDIR
mkdir $OUTDIR
echo $WGET_DUMP $TEST_ROOT/shard/shard.html
fetch_until $TEST_ROOT/shard/shard.html 'grep -c \.pagespeed\.' 4
check $WGET_DUMP $TEST_ROOT/shard/shard.html > $OUTDIR/shard.out.html
check [ `grep -ce href=\"http://shard1 $OUTDIR/shard.out.html` = 2 ];
check [ `grep -ce href=\"http://shard2 $OUTDIR/shard.out.html` = 2 ];

echo TEST: server-side includes
rm -rf $OUTDIR
mkdir $OUTDIR
echo $WGET_DUMP $TEST_ROOT/ssi/ssi.shtml?ModPagespeedFilters=combine_css
fetch_until $TEST_ROOT/ssi/ssi.shtml?ModPagespeedFilters=combine_css \
    'grep -c \.pagespeed\.' 1
check $WGET_DUMP $TEST_ROOT/ssi/ssi.shtml?ModPagespeedFilters=combine_css \
  > $OUTDIR/ssi.out.html
check [ `grep -ce $combine_css_filename $OUTDIR/ssi.out.html` = 1 ];

echo TEST: mod_rewrite
echo $WGET_DUMP $TEST_ROOT/redirect/php/
check $WGET_DUMP $TEST_ROOT/redirect/php/ > $OUTDIR/redirect_php.html
check \
  [ `grep -ce "href=\"/mod_pagespeed_test/" $OUTDIR/redirect_php.html` = 2 ];

echo TEST: ModPagespeedLoadFromFile
URL=$TEST_ROOT/load_from_file/index.html?ModPagespeedFilters=inline_css
fetch_until $URL 'grep -c blue' 1

echo TEST: Custom headers remain on HTML, but cache should be disabled.
URL=$TEST_ROOT/rewrite_compressed_js.html
echo $WGET_DUMP $URL
HTML_HEADERS=$($WGET_DUMP $URL)
echo $HTML_HEADERS | egrep -q "X-Extra-Header: 1"
check [ $? = 0 ]
# The extra header should only be added once, not twice.
echo $HTML_HEADERS | egrep -q -v "X-Extra-Header: 1, 1"
check [ $? = 0 ]
echo $HTML_HEADERS | egrep -q 'Cache-Control: max-age=0, no-cache'
check [ $? = 0 ]

echo TEST: Custom headers remain on resources, but cache should be 1 year.
URL="$TEST_ROOT/compressed/hello_js.custom_ext.pagespeed.ce.HdziXmtLIV.txt"
echo $WGET_DUMP $URL
RESOURCE_HEADERS=$($WGET_DUMP $URL)
echo $RESOURCE_HEADERS | egrep -q 'X-Extra-Header: 1'
check [ $? = 0 ]
# The extra header should only be added once, not twice.
echo $RESOURCE_HEADERS | egrep -q -v 'X-Extra-Header: 1, 1'
check [ $? = 0 ]
echo $RESOURCE_HEADERS | egrep -q 'Cache-Control: max-age=31536000'
check [ $? = 0 ]

echo TEST: ModPagespeedModifyCachingHeaders
URL=$TEST_ROOT/retain_cache_control/index.html
$WGET_DUMP $URL
$WGET_DUMP $URL | grep -q "Cache-Control: private, max-age=3000"
check [ $? = 0 ]

test_filter combine_javascript combines 2 JS files into 1.
echo TEST: combine_javascript with long URL still works
URL=$TEST_ROOT/combine_js_very_many.html?ModPagespeedFilters=combine_javascript
fetch_until $URL 'grep -c src=' 4

echo TEST: aris disables js combining for introspective js and only i-js
URL="$TEST_ROOT/avoid_renaming_introspective_javascript__on/?\
ModPagespeedFilters=combine_javascript"
fetch_until $URL 'grep -c src=' 2

echo TEST: aris disables js combining only when enabled
URL="$TEST_ROOT/avoid_renaming_introspective_javascript__off.html?\
ModPagespeedFilters=combine_javascript"
fetch_until $URL 'grep -c src=' 1

test_filter inline_javascript inlines a small JS file
echo TEST: aris disables js inlining for introspective js and only i-js
URL="$TEST_ROOT/avoid_renaming_introspective_javascript__on/?\
ModPagespeedFilters=inline_javascript"
fetch_until $URL 'grep -c src=' 1

echo TEST: aris disables js inlining only when enabled
URL="$TEST_ROOT/avoid_renaming_introspective_javascript__off.html?\
ModPagespeedFilters=inline_javascript"
fetch_until $URL 'grep -c src=' 0

test_filter rewrite_javascript minifies JavaScript and saves bytes.
echo TEST: aris disables js cache extention for introspective js and only i-js
URL="$TEST_ROOT/avoid_renaming_introspective_javascript__on/?\
ModPagespeedFilters=rewrite_javascript"
# first check something that should get rewritten to know we're done with
# rewriting
fetch_until $URL 'grep -c src=\"../normal.js\"' 0
check [ $($WGET_DUMP $URL | grep -c src=\"../introspection.js\") = 1 ]

echo TEST: aris disables js cache extension only when enabled
URL="$TEST_ROOT/avoid_renaming_introspective_javascript__off.html?\
ModPagespeedFilters=rewrite_javascript"
fetch_until $URL 'grep -c src=\"normal.js\"' 0
check [ $($WGET_DUMP $URL | grep -c src=\"introspection.js\") = 0 ]

# Check that no filter changes urls for introspective javascript if
# avoid_renaming_introspective_javascript is on
echo TEST: aris disables url modification for introspective js
URL="$TEST_ROOT/avoid_renaming_introspective_javascript__on/?\
ModPagespeedFilters=testing,core"
# first check something that should get rewritten to know we're done with
# rewriting
fetch_until $URL 'grep -c src=\"../normal.js\"' 0
check [ $($WGET_DUMP $URL | grep -c src=\"../introspection.js\") = 1 ]

echo TEST: aris disables url modification only when enabled
URL="$TEST_ROOT/avoid_renaming_introspective_javascript__off.html?\
ModPagespeedFilters=testing,core"
fetch_until $URL 'grep -c src=\"normal.js\"' 0
check [ $($WGET_DUMP $URL | grep -c src=\"introspection.js\") = 0 ]

echo TEST: HTML add_instrumentation lacks '&amp;' and contains CDATA
$WGET -O $WGET_OUTPUT $TEST_ROOT/add_instrumentation.html\
?ModPagespeedFilters=add_instrumentation
check [ $(grep -c "\&amp;" $WGET_OUTPUT) = 0 ]
check [ $(grep -c '//<\!\[CDATA\[' $WGET_OUTPUT) = 1 ]

echo TEST: XHTML add_instrumentation also lacks '&amp;' and contains CDATA
$WGET -O $WGET_OUTPUT $TEST_ROOT/add_instrumentation.xhtml\
?ModPagespeedFilters=add_instrumentation
check [ $(grep -c "\&amp;" $WGET_OUTPUT) = 0 ]
check [ $(grep -c '//<\!\[CDATA\[' $WGET_OUTPUT) = 1 ]

# TODO(sligocki): TEST: ModPagespeedMaxSegmentLength

if [ "$CACHE_FLUSH_TEST" == "on" ]; then
  SECONDARY_HOSTNAME=`echo $HOSTNAME | sed -e s/8080/$APACHE_SECONDARY_PORT/g`
  if [ "$SECONDARY_HOSTNAME" == "$HOSTNAME" ]; then
    SECONDARY_HOSTNAME=${HOSTNAME}:$APACHE_SECONDARY_PORT
  fi
  SECONDARY_TEST_ROOT=http://$SECONDARY_HOSTNAME/mod_pagespeed_test

  echo TEST: add_instrumentation has added unload handler with \
      ModPagespeedReportUnloadTime enabled in APACHE_SECONDARY_PORT.
  $WGET -O $WGET_OUTPUT \
      $SECONDARY_TEST_ROOT/add_instrumentation.html\
?ModPagespeedFilters=add_instrumentation
  check [ $(grep -c "<script" $WGET_OUTPUT) = 3 ]
  check [ $(grep -c 'ets=unload' $WGET_OUTPUT) = 1 ]

  echo TEST: Cache flushing works by touching cache.flush in cache directory.

  echo Clear out our existing state before we begin the test.
  echo $SUDO touch $PAGESPEED_ROOT/cache/cache.flush
  $SUDO touch $PAGESPEED_ROOT/cache/cache.flush
  echo $SUDO touch $PAGESPEED_ROOT/secondary_cache/secondary.cache.flush
  $SUDO touch $PAGESPEED_ROOT/secondary_cache/secondary.cache.flush

  URL_PATH=cache_flush_test.html?ModPagespeedFilters=inline_css
  URL=$TEST_ROOT/$URL_PATH
  CSS_FILE=$APACHE_DOC_ROOT/mod_pagespeed_test/update.css
  TMP_CSS_FILE=/tmp/update.css.$$

  # First, write 'blue' into the css file and make sure it gets inlined into
  # the html.
  echo echo ".class myclass { color: blue; }" ">" $CSS_FILE
  echo ".class myclass { color: blue; }" >$TMP_CSS_FILE
  $SUDO cp $TMP_CSS_FILE $CSS_FILE
  fetch_until $URL 'grep -c blue' 1

  # Also do the same experiment using a different VirtualHost.  It points
  # to the same htdocs, but uses a separate cache directory.
  SECONDARY_URL=$SECONDARY_TEST_ROOT/$URL_PATH

  if [ "$SECONDARY_URL" == "$URL" ]; then
    SECONDARY_URL=http://${SECONDARY_HOSTNAME}:$APACHE_SECONDARY_PORT/\
mod_pagespeed_test/$URL_PATH
  fi
  fetch_until $SECONDARY_URL 'grep -c blue' 1

  # Track how many flushes were noticed by Apache processes up till
  # this point in time.  Note that each Apache process/vhost
  # separately detects the 'flush'.
  NUM_INITIAL_FLUSHES=$($WGET_DUMP $STATISTICS_URL | grep cache_flush_count \
    | cut -d: -f2)

  # Now change the file to 'green'.  Note that we'll have stale cache for
  # 5 minutes so we expect the result to stay 'blue'.
  echo echo ".class myclass { color: green; }" ">" $CSS_FILE
  echo ".class myclass { color: green; }" >$TMP_CSS_FILE
  $SUDO cp $TMP_CSS_FILE $CSS_FILE
  fetch_until $URL 'grep -c blue' 1
  fetch_until $SECONDARY_URL 'grep -c blue' 1

  # Flush the cache by touching a special file in the cache directory.  Now
  # css gets re-read and we get 'green' in the output.  Sleep here to avoid
  # a race due to 1-second granularity of file-system timestamp checks.  For
  # the test to pass we need to see time pass from the previous 'touch'.
  sleep 2
  echo $SUDO touch $PAGESPEED_ROOT/cache/cache.flush
  $SUDO touch $PAGESPEED_ROOT/cache/cache.flush
  fetch_until $URL 'grep -c green' 1

  NUM_FLUSHES=$($WGET_DUMP $STATISTICS_URL | grep cache_flush_count \
    | cut -d: -f2)
  NUM_NEW_FLUSHES=$(expr $NUM_FLUSHES - $NUM_INITIAL_FLUSHES)
  echo NUM_NEW_FLUSHES = $NUM_NEW_FLUSHES
  check [ $NUM_NEW_FLUSHES -ge 1 ]
  check [ $NUM_NEW_FLUSHES -lt 20 ]

  # However, the secondary cache might not have sees this cache-flush, but
  # due to the multiple child processes, each of which does polling separately,
  # we cannot guarantee it.  I think if we knew we were running a 'worker' mpm
  # with just 1 child process we could do this test.
  # fetch_until $SECONDARY_URL 'grep -c blue' 1

  # Now flush the secondary cache too so it can see the change to 'green'.
  echo $SUDO touch $PAGESPEED_ROOT/secondary_cache/secondary.cache.flush
  $SUDO touch $PAGESPEED_ROOT/secondary_cache/secondary.cache.flush
  fetch_until $SECONDARY_URL 'grep -c green' 1

  # Clean up update.css from mod_pagespeed_test so it doesn't leave behind
  # a stray file not under source control.
  echo $SUDO rm -f $CSS_FILE
  $SUDO rm -f $CSS_FILE
  rm -f $TMP_CSS_FILE

  # connection_refused.html references modpagespeed.com:1023/someimage.png.
  # mod_pagespeed will attempt to connect to that host and port to fetch the
  # input resource using serf.  We expect the connection to be refused.  Relies
  # on "ModPagespeedDomain modpagespeed.com:1023" in debug.conf.template.  Also
  # relies on running after a cache-flush to avoid bypassing the serf fetch,
  # since mod_pagespeed remembers fetch-failures in its cache for 5 minutes.
  echo TEST: Connection refused handling

  # Monitor the Apache log starting now.  tail -F will catch log rotations.
  SERF_REFUSED_PATH=/tmp/instaweb_apache_serf_refused.$$
  echo APACHE_LOG = $APACHE_LOG
  tail --sleep-interval=0.1 -F $APACHE_LOG > $SERF_REFUSED_PATH &
  TAIL_PID=$!
  # Actually kick off the request.
  echo $WGET_DUMP $TEST_ROOT/connection_refused.html
  echo checking...
  check $WGET_DUMP $TEST_ROOT/connection_refused.html > /dev/null
  echo check done
  # If we are spewing errors, this gives time to spew lots of them.
  sleep 1
  # Wait up to 10 seconds for the background fetch of someimage.png to fail.
  for i in {1..100}; do
    ERRS=$(grep -c "Serf status 111" $SERF_REFUSED_PATH)
    if [ $ERRS -ge 1 ]; then
      break;
    fi;
    /bin/echo -n "."
    sleep 0.1
  done;
  /bin/echo "."
  # Kill the log monitor silently.
  kill $TAIL_PID
  wait $TAIL_PID 2> /dev/null
  check [ $ERRS -ge 1 ]
  # Make sure we have the URL detail we expect because
  # ModPagespeedListOutstandingUrlsOnError is on in debug.conf.template.
  echo Check that ModPagespeedSerfListOutstandingUrlsOnError works
  grep "URL http://modpagespeed.com:1023/someimage.png active for " \
      $SERF_REFUSED_PATH
  check [ $? = 0 ]
fi

# Cleanup
rm -rf $OUTDIR
echo "PASS."
