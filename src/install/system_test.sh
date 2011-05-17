#!/bin/bash
# Copyright 2010 Google Inc. All Rights Reserved.
# Author: abliss@google.com (Adam Bliss)
#
# Usage: ./system_test.sh HOSTNAME
# Tests a mod_pagespeed installation by fetching and verifying all the examples.
# Exits with status 0 if all tests pass.  Exits 1 immediately if any test fails.

if [ $# != 1 ]; then
  echo Usage: ./system_test.sh HOSTNAME
  exit 2
fi;

# If the user has specified an alternate WGET as an environment variable, then
# use that, otherwise use the one in the path.
if [ "$WGET" == "" ]; then
  WGET=wget
else
  echo WGET = $WGET
fi

WGET="$WGET --no-proxy"

$WGET --version | head -1 | grep 1.12 >/dev/null
if [ $? != 0 ]; then
  echo You have the wrong version of wget.  1.12 is required.
  exit 1
fi

HOSTNAME=$1
PORT=${HOSTNAME/*:/};
if [ $PORT = $HOSTNAME ]; then
  PORT=80
fi;
EXAMPLE_ROOT=http://$HOSTNAME/mod_pagespeed_example
TEST_ROOT=http://$HOSTNAME/mod_pagespeed_test
STATISTICS_URL=http://localhost:$PORT/mod_pagespeed_statistics
BAD_RESOURCE_URL=http://$HOSTNAME/mod_pagespeed/bad.pagespeed.cf.hash.css

# Version timestamped with nanoseconds, making it extremely unlikely to hit.
BAD_RND_RESOURCE_URL="http://$HOSTNAME/mod_pagespeed/bad`date +%N`.\
pagespeed.cf.hash.css"

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
  URL=$1
  COMMAND=$2
  RESULT=$3

  TIMEOUT=10
  START=`date +%s`
  STOP=$((START+$TIMEOUT))

  echo "     " Fetching $URL until '`'$COMMAND'`' = $RESULT
  while test -t; do
    if [ `$WGET -q -O - $URL 2>&1 | $COMMAND` = $RESULT ]; then
      /bin/echo "."
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

  # Now fetch the broken version
  BROKEN="$RESOURCE"broken
  $WGET_PREREQ $BROKEN
  check [ $? != 0 ]

  # Fetch normal again; ensure rewritten url for RESOURCE doesn't contain broken
  $WGET_DUMP $URL | grep broken
  check [ $? != 0 ]
}

# General system tests

echo TEST: mod_pagespeed is running in Apache and writes the expected header.
HTML_HEADERS=$($WGET_DUMP $EXAMPLE_ROOT/combine_css.html)

echo Checking for X-Mod-Pagespeed header
echo $HTML_HEADERS | grep -qi X-Mod-Pagespeed
check [ $? = 0 ]

echo Checking for lack of E-tag
echo $HTML_HEADERS | grep -qi Etag
check [ $? != 0 ]

echo Checking for presence of Vary.
echo $HTML_HEADERS | grep -qi 'Vary: Accept-Encoding'
check [ $? = 0 ]

echo Checking for absence of Last-Modified
echo $HTML_HEADERS | grep -qi 'Last-Modified'
check [ $? != 0 ]

echo Checking for presence of Cache-control: no-cache
echo $HTML_HEADERS | grep -qi 'Cache-Control: max-age=0, no-cache, no-store'
check [ $? = 0 ]

echo Checking for absense of Expires
echo $HTML_HEADERS | grep -qi 'Expires'
check [ $? != 0 ]

# Determine whether statistics are enabled or not.  If not, don't test them,
# but do an additional regression test that tries harder to get a cache miss.
grep "# ModPagespeedStatistics off" /usr/local/apache2/conf/pagespeed.conf \
   >/dev/null
if [ $? = 0 ]; then
  echo TEST: 404s are served and properly recorded.
  NUM_404=$($WGET_DUMP $STATISTICS_URL | grep resource_404_count | cut -d: -f2)
  NUM_404=$(($NUM_404+1))
  check "$WGET -O /dev/null $BAD_RESOURCE_URL 2>&1| grep -q '404 Not Found'"
  check "$WGET_DUMP $STATISTICS_URL | grep -q 'resource_404_count: $NUM_404'"
else
  echo TEST: 404s are served.  Statistics are disabled so not checking them.
  check "$WGET -O /dev/null $BAD_RESOURCE_URL 2>&1| grep -q '404 Not Found'"

  echo TEST: 404s properly on uncached invalid resource.
  check "$WGET -O /dev/null $BAD_RND_RESOURCE_URL 2>&1| grep -q '404 Not Found'"
fi

echo TEST: directory is mapped to index.html.
rm -rf $OUTDIR
mkdir -p $OUTDIR
check "$WGET_PREREQ $EXAMPLE_ROOT"
check "$WGET_PREREQ $EXAMPLE_ROOT/index.html"
check diff $OUTDIR/index.html $OUTDIR/mod_pagespeed_example

echo TEST: compression is enabled for HTML.
check "$WGET -O /dev/null -q -S --header='Accept-Encoding: gzip' \
  $EXAMPLE_ROOT/ 2>&1 | grep -qi 'Content-Encoding: gzip'"


# Individual filter tests, in alphabetical order

test_filter add_instrumentation adds 2 script tags
check $WGET_PREREQ $URL
check [ `cat $FETCHED | sed 's/>/>\n/g' | grep -c '<script'` = 2 ]
check $WGET_PREREQ http://$HOSTNAME/mod_pagespeed_beacon?ets=load:13
check grep -q '"204 No Content"' $WGET_OUTPUT

echo "TEST: We don't add_instrumentation if URL params tell us not to"
FILE=add_instrumentation.html?ModPagespeedFilters=
URL=$EXAMPLE_ROOT/$FILE
FETCHED=$OUTDIR/$FILE
check $WGET_PREREQ $URL
check [ `cat $FETCHED | sed 's/>/>\n/g' | grep -c '<script'` = 0 ]

# http://code.google.com/p/modpagespeed/issues/detail?id=170
echo "TEST: Make sure 404s aren't rewritten"
# Note: We run this in the add_instrumentation section because that is the
# easiest to detect which changes every page
THIS_BAD_URL=$BAD_RESOURCE_URL?ModPagespeedFilters=add_instrumentation
# We use curl, because wget does not save 404 contents
curl --silent $THIS_BAD_URL | grep /mod_pagespeed_beacon
check [ $? != 0 ]

test_filter collapse_whitespace removes whitespace, but not from pre tags.
check $WGET_PREREQ $URL
check [ `egrep -c '^ +<' $FETCHED` = 1 ]

combine_css_filename=\
styles/yellow.css+blue.css+big.css+bold.css.pagespeed.cc.xo4He3_gYf.css

test_filter combine_css combines 4 CSS files into 1.
fetch_until $URL 'grep -c text/css' 1
check $WGET_PREREQ $URL
test_resource_ext_corruption $URL\
  $combine_css_filename

echo TEST: combine_css without hash field should 404
$WGET_PREREQ $EXAMPLE_ROOT/styles/yellow.css+blue.css.pagespeed.cc..css
check grep '"404 Not Found"' $WGET_OUTPUT

# Note: this large URL can only be processed by Apache if
# ap_hook_map_to_storage is called to bypass the default
# handler that maps URLs to filenames.
echo TEST: Fetch large css_combine URL
LARGE_URL="$EXAMPLE_ROOT/styles/yellow.css+blue.css+big.css+\
bold.css+yellow.css+blue.css+big.css+bold.css+yellow.css+blue.css+\
big.css+bold.css+yellow.css+blue.css+big.css+bold.css+yellow.css+blue.css+\
big.css+bold.css+yellow.css+blue.css+big.css+bold.css+yellow.css+blue.css+\
big.css+bold.css+yellow.css+blue.css+big.css+bold.css+yellow.css+blue.css+\
big.css+bold.css+yellow.css+blue.css+big.css+bold.css+yellow.css+blue.css+\
big.css+bold.css+yellow.css+blue.css+big.css+bold.css+yellow.css+blue.css+\
big.css+bold.css+yellow.css+blue.css+big.css+bold.css+yellow.css+blue.css+\
big.css+bold.css+yellow.css+blue.css+big.css+bold.css+yellow.css+blue.css+\
big.css+bold.css+yellow.css+blue.css+big.css+\
bold.css.pagespeed.cc.46IlzLf_NK.css"
$WGET --save-headers -q -O - $LARGE_URL | head -1 | grep "HTTP/1.1 200 OK"
check [ $? = 0 ];
LARGE_URL_LINE_COUNT=$($WGET -q -O - $LARGE_URL | wc -l)
check [ $? = 0 ]
echo Checking that response body is at least 900 lines -- it should be 954
check [ $LARGE_URL_LINE_COUNT -gt 900 ]

test_filter combine_javascript combines 2 JS files into 1.
fetch_until $URL 'grep -c src=' 1
check $WGET_PREREQ $URL

test_filter combine_heads combines 2 heads into 1
check $WGET_PREREQ $URL
check [ `grep -ce '<head>' $FETCHED` = 1 ]

test_filter elide_attributes removes boolean and default attributes.
check $WGET_PREREQ $URL
grep "disabled=" $FETCHED   # boolean, should not find
check [ $? != 0 ]
grep "type=" $FETCHED       # default, should not find
check [ $? != 0 ]

test_filter extend_cache rewrites an image tag.
fetch_until $URL 'grep -c src.*91_WewrLtP' 1
check $WGET_PREREQ $URL
echo about to test resource ext corruption...
test_resource_ext_corruption $URL images/Puzzle.jpg.pagespeed.ce.91_WewrLtP.jpg

echo TEST: Attempt to fetch cache-extended image without hash should 404
$WGET_PREREQ $EXAMPLE_ROOT/images/Puzzle.jpg.pagespeed.ce..jpg
check grep '"404 Not Found"' $WGET_OUTPUT

echo TEST: Cache-extended image should respond 304 to an If-Modified-Since.
URL=$EXAMPLE_ROOT/images/Puzzle.jpg.pagespeed.ce.91_WewrLtP.jpg
DATE=`date -R`
$WGET_PREREQ --header "If-Modified-Since: $DATE" $URL
check grep '"304 Not Modified"' $WGET_OUTPUT

echo TEST: Legacy format URLs should still work.
URL=$EXAMPLE_ROOT/images/ce.0123456789abcdef0123456789abcdef.Puzzle,j.jpg
check "$WGET_DUMP $URL | grep -q 'HTTP/1.1 200 OK'"

test_filter move_css_to_head does what it says on the tin.
check $WGET_PREREQ $URL
check grep -q "'styles/all_styles.css\"></head>'" $FETCHED  # link moved to head

test_filter inline_css converts a link tag to a style tag
fetch_until $URL 'grep -c style' 2

test_filter inline_javascript inlines a small JS file
fetch_until $URL 'grep -c document.write' 1

test_filter outline_css outlines large styles, but not small ones.
check $WGET_PREREQ $URL
check egrep -q "'<link.*text/css.*large'" $FETCHED  # outlined
check egrep -q "'<style.*small'" $FETCHED           # not outlined

test_filter outline_javascript outlines large scripts, but not small ones.
check $WGET_PREREQ $URL
check egrep -q "'<script.*large.*src='" $FETCHED       # outlined
check egrep -q "'<script.*small.*var hello'" $FETCHED  # not outlined

echo TEST: compression is enabled for rewritten JS.
echo JS_URL=\$\(egrep -o http://.*.pagespeed.*.js $FETCHED\)
JS_URL=$(egrep -o http://.*.pagespeed.*.js $FETCHED)
JS_HEADERS=$($WGET -O /dev/null -q -S --header='Accept-Encoding: gzip' \
  $JS_URL 2>&1)
echo $JS_HEADERS | grep -qi 'Content-Encoding: gzip'
check [ $? = 0 ]
echo $JS_HEADERS | grep -qi 'Vary: Accept-Encoding'
check [ $? = 0 ]
echo $JS_HEADERS | grep -qi 'Etag: W/0'
check [ $? = 0 ]
echo $JS_HEADERS | grep -qi 'Last-Modified:'
check [ $? = 0 ]

test_filter remove_comments removes comments but not IE directives.
check $WGET_PREREQ $URL
grep "removed" $FETCHED                # comment, should not find
check [ $? != 0 ]
check grep -q preserved $FETCHED       # preserves IE directives
check grep -q retained $FETCHED        # RetainComment directive

test_filter remove_quotes does what it says on the tin.
check $WGET_PREREQ $URL
check [ `sed 's/ /\n/g' $FETCHED | grep -c '"' ` = 2 ]  # 2 quoted attrs
check [ `grep -c "'" $FETCHED` = 0 ]                    # no apostrophes

test_filter trim_urls makes urls relative
check $WGET_PREREQ $URL
grep "http:" $FETCHED                     # scheme, should not find
check [ $? != 0 ]
check [ `stat -c %s $FETCHED` -lt 153 ]   # down from 157

test_filter rewrite_css removes comments and saves a bunch of bytes.
check $WGET_PREREQ $URL
grep "comment" $FETCHED                   # comment, should not find
check [ $? != 0 ]
check [ `stat -c %s $FETCHED` -lt 680 ]   # down from 689

test_filter rewrite_images inlines, compresses, and resizes.
fetch_until $URL 'grep -c image/png' 1    # inlined
check $WGET_PREREQ $URL
check [ `stat -c %s $OUTDIR/xBikeCrashIcn*` -lt 25000 ]      # re-encoded
check [ `stat -c %s $OUTDIR/*256x192*Puzzle*`  -lt 24126  ]  # resized

IMG_URL=$(egrep -o http://.*.pagespeed.*.jpg $FETCHED | head -n1)
echo TEST: headers for rewritten image "$IMG_URL"
IMG_HEADERS=$($WGET -O /dev/null -q -S --header='Accept-Encoding: gzip' \
  $IMG_URL 2>&1)
# Make sure we have some valid headers.
echo \"$IMG_HEADERS\" | grep -qi 'Content-Type: image/jpeg'
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

# Make sure there is a last-modified tag
echo TEST: Last-modified is present
echo "$IMG_HEADERS" | grep -qi 'Last-Modified'
check [ $? = 0 ]

IMG_URL=${IMG_URL/Puzzle/BadName}
echo TEST: rewrite_images fails broken image $IMG_URL
$WGET_PREREQ $IMG_URL;  # fails
check grep '"404 Not Found"' $WGET_OUTPUT

# [google] b/3328110
echo "TEST: rewrite_images doesn't 500 on unoptomizable image"
IMG_URL=$EXAMPLE_ROOT/images/xOptPuzzle.jpg.pagespeed.ic.Zi7KMNYwzD.jpg
$WGET_PREREQ $IMG_URL
check grep '"HTTP/1.1 200 OK"' $WGET_OUTPUT

# These have to run after image_rewrite tests. Otherwise it causes some images
# to be loaded into memory before they should be.
test_filter rewrite_css,extend_cache extends cache of images in CSS
FILE=rewrite_css_images.html?ModPagespeedFilters=$FILTER_NAME
URL=$EXAMPLE_ROOT/$FILE
FETCHED=$OUTDIR/$FILE
fetch_until $URL 'grep -c .pagespeed.ce.' 1  # image cache extended
check $WGET_PREREQ $URL

test_filter rewrite_css,rewrite_images rewrites images in CSS
FILE=rewrite_css_images.html?ModPagespeedFilters=$FILTER_NAME
URL=$EXAMPLE_ROOT/$FILE
FETCHED=$OUTDIR/$FILE
fetch_until $URL 'grep -c .pagespeed.ic.' 1  # image rewritten
check $WGET_PREREQ $URL

test_filter rewrite_css,sprite_images sprites images in CSS
FILE=sprite_images.html?ModPagespeedFilters=$FILTER_NAME
URL=$EXAMPLE_ROOT/$FILE
FETCHED=$OUTDIR/$FILE
# Warning: tricky code ahead!  The html contains a reference to an external CSS
# which contains references to images.  On the first fetch nothing will be
# rewritten since the CSS file isn't cached.  On a subsequent fetch, the CSS
# will be rewritten; however the images weren't fetched until this point, so
# they won't be sprited.  On a *subsequent* fetch, the CSS will be rewritten a
# *second* time to include a reference to the sprited image (which we want to
# fetch).  Checking this using fetch_until requires some deft plumbing.  We
# *could* just use a recursive wget for this, but for a bug in wget's css
# parser: https://savannah.gnu.org/bugs/?32940 .

function check_for_sprite() {
  # First, find the <link rel="stylesheet"> tag; extract its href; fetch that.
  grep stylesheet | cut -d\" -f 6 | xargs wget -q -O - |
  # Now find the parameter of the first url() in the stylesheet.
  cut -d\( -f 2 | cut -d\) -f 1 |
  # This url should include BikeCrash (not just Cuppa), and be fetchable.
  grep BikeCrashIcn | xargs wget -S -O /dev/null |& grep -c '200 OK'
}
fetch_until $URL check_for_sprite 1
# We can't do this here because of the wget bug mentioned above.
#check $WGET_PREREQ $URL

test_filter rewrite_javascript removes comments and saves a bunch of bytes.
fetch_until $URL 'grep -c src.*1o978_K0_L' 2   # external scripts rewritten
check $WGET_PREREQ $URL
grep -R "removed" $OUTDIR                 # comments, should not find any
check [ $? != 0 ]
check [ `stat -c %s $FETCHED` -lt 1560 ]  # net savings
check grep -q preserved $FETCHED          # preserves certain comments
# rewritten JS is cache-extended
check grep -qi "'Cache-control: max-age=31536000'" $WGET_OUTPUT
check grep -qi "'Expires:'" $WGET_OUTPUT

echo TEST: ModPagespeedShardDomain directive in .htaccess file
rm -rf $OUTDIR
mkdir $OUTDIR
echo $WGET_DUMP $TEST_ROOT/shard/shard.html
check $WGET_DUMP $TEST_ROOT/shard/shard.html \
  > $OUTDIR/shard.out.html
check [ `grep -ce href=\"http://shard1 $OUTDIR/shard.out.html` = 2 ];
check [ `grep -ce href=\"http://shard2 $OUTDIR/shard.out.html` = 2 ];

echo TEST: server-side includes
rm -rf $OUTDIR
mkdir $OUTDIR
echo $WGET_DUMP $TEST_ROOT/ssi/ssi.shtml?ModPagespeedFilters=combine_css
check $WGET_DUMP $TEST_ROOT/ssi/ssi.shtml?ModPagespeedFilters=combine_css \
  > $OUTDIR/ssi.out.html
check [ `grep -ce $combine_css_filename $OUTDIR/ssi.out.html` = 1 ];

echo TEST: mod_rewrite
echo $WGET_DUMP $TEST_ROOT/redirect/php/
check $WGET_DUMP $TEST_ROOT/redirect/php/ > $OUTDIR/redirect_php.html
check \
  [ `grep -ce "href=\"/mod_pagespeed_test/" $OUTDIR/redirect_php.html` = 2 ];

echo TEST: Connection refused handling
echo $WGET_DUMP $TEST_ROOT/connection_refused.html
check $WGET_DUMP $TEST_ROOT/connection_refused.html > /dev/null
ERRS=`cat /usr/local/apache2/logs/error_log | grep "Serf status 111" | wc -l`
sleep 1
# Check that we have one error or less --- might not have flushed the log yet..
# (luckily we nearly certainly do when spewing dozens of errors)
check [ `expr $ERRS` -le 1 ];

echo TEST: User-agent is a bot, ModPagespeedDisableForBots is off by default
BOT="Googlebot/2.1"
HTML_HEADERS=$($WGET_DUMP -U $BOT $EXAMPLE_ROOT/combine_css.html)
echo $HTML_HEADERS | grep -qi X-Mod-Pagespeed
check [ $? = 0 ]

echo TEST: User-agent is a bot, ModPagespeedDisableForBots is on
PARAM="?ModPagespeedDisableForBots=on"
HTML_HEADERS=$($WGET_DUMP -U $BOT $EXAMPLE_ROOT/combine_css.html$PARAM)
echo $HTML_HEADERS | grep -qi X-Mod-Pagespeed
check [ $? != 0 ]

echo TEST: User-agent is not bot, ModPagespeedDisableForBots is on
PARAM="?ModPagespeedDisableForBots=on"
HTML_HEADERS=$($WGET_DUMP $EXAMPLE_ROOT/combine_css.html$PARAM)
echo $HTML_HEADERS | grep -qi X-Mod-Pagespeed
check [ $? = 0 ]

# Cleanup
rm -rf $OUTDIR
echo "PASS."
