#!/bin/bash
#
# Copyright 2012 Google Inc. All Rights Reserved.
# Author: jefftk@google.com (Jeff Kaufman)
#
# Set up variables and functions for use by various system tests.

# Catch potential misuse of this script.
if [ "$(basename $0)" == "system_test_helpers.sh" ] ; then
  echo "ERROR: This file must be loaded with source."
  exit 2
fi

if [ $# -lt 1 -o $# -gt 3 ]; then
  # Note: HOSTNAME and HTTPS_HOST should generally be localhost (when using
  # the default port) or localhost:PORT (when not). Specifically, by default
  # /mod_pagespeed_statistics is only accessible when accessed as localhost.
  echo Usage: $(basename $0) HOSTNAME [HTTPS_HOST [PROXY_HOST]]
  exit 2
fi;

TEMPDIR=${TEMPDIR-/tmp/mod_pagespeed_test.$USER}

# If the user has specified an alternate WGET as an environment variable, then
# use that, otherwise use the one in the path.
if [ "$WGET" == "" ]; then
  WGET=wget
else
  echo WGET = $WGET
fi

$WGET --version | head -1 | grep -q "1\.1[2-9]"
if [ $? != 0 ]; then
  echo "You have the wrong version of wget. >1.12 is required."
  exit 1
fi

# Ditto for curl.
if [ "$CURL" == "" ]; then
  CURL=curl
else
  echo CURL = $CURL
fi

# Note that 'curl --version' exits with status 2 on CentOS even when
# curl is installed.
if ! which $CURL > /dev/null 2>&1; then
  echo "curl ($CURL) is not installed."
  exit 1
fi

# We need to set a wgetrc file because of the stupid way that the bash deals
# with strings and variable expansion.
mkdir -p $TEMPDIR || exit 1
export WGETRC=$TEMPDIR/wgetrc
# Use a Chrome User-Agent, so that we get real responses (including compression)
cat > $WGETRC <<EOF
user_agent = "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/534.0 (KHTML, like Gecko) Chrome/6.0.408.1 Safari/534.0"
EOF

HOSTNAME=$1
EXAMPLE_ROOT=http://$HOSTNAME/mod_pagespeed_example
STATISTICS_URL=http://$HOSTNAME/mod_pagespeed_statistics
BAD_RESOURCE_URL=http://$HOSTNAME/mod_pagespeed/W.bad.pagespeed.cf.hash.css
MESSAGE_URL=http://$HOSTNAME/mod_pagespeed_message

# The following shake-and-bake ensures that we set REWRITTEN_TEST_ROOT based on
# the TEST_ROOT in effect when we start up, if any, but if it was not set before
# invocation it is set to the newly-chosen TEST_ROOT.  This permits us to call
# this from other test scripts that use different host prefixes for rewritten
# content.
REWRITTEN_TEST_ROOT=$TEST_ROOT
TEST_ROOT=http://$HOSTNAME/mod_pagespeed_test
REWRITTEN_TEST_ROOT=${REWRITTEN_TEST_ROOT:-$TEST_ROOT}

# This sets up similar naming for https requests.
HTTPS_HOST=$2
HTTPS_EXAMPLE_ROOT=https://$HTTPS_HOST/mod_pagespeed_example

# These are the root URLs for rewritten resources; by default, no change.
REWRITTEN_ROOT=${REWRITTEN_ROOT:-$EXAMPLE_ROOT}

# Setup wget proxy information
export http_proxy=$3
export https_proxy=$3
export ftp_proxy=$3
export no_proxy=""

# Version timestamped with nanoseconds, making it extremely unlikely to hit.
BAD_RND_RESOURCE_URL="http://$HOSTNAME/mod_pagespeed/bad$(date +%N).\
pagespeed.cf.hash.css"

combine_css_filename=\
styles/yellow.css+blue.css+big.css+bold.css.pagespeed.cc.xo4He3_gYf.css

OUTDIR=$TEMPDIR/fetched_directory
rm -rf $OUTDIR
mkdir -p $OUTDIR

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
WGET_DUMP_HTTPS="$WGET -q -O - --save-headers --no-check-certificate"
PREREQ_ARGS="-H -p -S -o $WGET_OUTPUT -nd -P $OUTDIR -e robots=off"
WGET_PREREQ="$WGET $PREREQ_ARGS"
WGET_ARGS=""

function run_wget_with_args() {
  echo $WGET_PREREQ $WGET_ARGS "$@"
  $WGET_PREREQ $WGET_ARGS "$@"
}

# Print a message like:
#   failure at line 374
#   FAIL
# and then exit with return value 1.
#
# If the shell does not support the 'caller' builtin, skip the line number info.
#
# Assumes it's being called from a failure-reporting function and that the
# actual failure the user is interested in is our caller's caller.  If it
# weren't for this, fail and print_failure_info_and_exit could be the same.
function print_failure_info_and_exit() {
  if type caller > /dev/null 2>&1 ; then
    # "caller 1" is our caller's caller.
    echo "     failure at line $(caller 1 | sed 's/ .*//')" 1>&2
  fi
  if [ $# -eq 1 ]; then
    echo FAILed Input: "$1"
  fi
  echo FAIL.
  exit 1;
}

# Call with a command and its args.  Echos the command, then tries to eval it.
# If it returns false, fail the tests.
function check() {
  echo "     check" "$@"
  "$@" || print_failure_info_and_exit
}

# Like check, but the first argument is text to pipe into the command given in
# the remaining arguments.
function check_from() {
  text="$1"
  shift
  echo "     check" "$@"
  echo "$text" | "$@" || print_failure_info_and_exit "$text"
}

# Same as check(), but expects command to fail.
function check_not() {
  echo "     check_not" "$@"
  "$@" && print_failure_info_and_exit
}

# Like check_not, but the first argument is text to pipe into the
# command given in the remaining arguments.
function check_not_from() {
  text="$1"
  shift
  echo "     check_not" "$@"
  echo "$text" | "$@" && print_failure_info_and_exit "$text"
}

# In a pipeline a failed check or check_not will not halt the script on error.
# Instead of:
#   echo foo | check grep foo
# You need:
#   echo foo | grep foo || fail
# If you can legibly rewrite the code not to need a pipeline at all, however,
# check is better because it can print the problem test:
#   check grep foo <(echo foo)
# Or, even better, because it can print the failing input on failure:
#   check_from "foo" grep foo
function fail() {
  print_failure_info_and_exit
}

function check_stat() {
  OLD_STATS_FILE=$1
  NEW_STATS_FILE=$2
  COUNTER_NAME=$3
  EXPECTED_DIFF=$4
  OLD_VAL=$(grep -w ${COUNTER_NAME} ${OLD_STATS_FILE} | cut -d: -f2)
  NEW_VAL=$(grep -w ${COUNTER_NAME} ${NEW_STATS_FILE} | cut -d: -f2)

  if [ $((${NEW_VAL} - ${OLD_VAL})) = ${EXPECTED_DIFF} ]; then
    return;
  else
    OLD_VAL=`echo ${OLD_VAL} | tr -d ' '`
    NEW_VAL=`echo ${NEW_VAL} | tr -d ' '`
    EXPECTED_VAL=$((${OLD_VAL} + ${EXPECTED_DIFF}))
    echo -n "Mismatched counter value : ${COUNTER_NAME} : "
    echo "Expected=${EXPECTED_VAL} Actual=${NEW_VAL}";
    print_failure_info_and_exit
  fi
}

FETCH_UNTIL_OUTFILE="$TEMPDIR/fetch_until_output.$$"

# Continuously fetches URL and pipes the output to COMMAND.  Loops until
# COMMAND outputs RESULT, in which case we return 0, or until 10 seconds have
# passed, in which case we return 1.
#
# Usage:
#    fetch_until [-save] [-recursive] REQUESTURL COMMAND RESULT [WGET_ARGS]
#
# If "-save" is specified as the first argument, then the output from $COMMAND
# is retained in $FETCH_UNTIL_OUTFILE.
#
# If "-recursive" is specified, then the resources referenced from the HTML
# file are loaded into $OUTDIR as a result of this command.
function fetch_until() {
  save=0
  if [ $1 = "-save" ]; then
    save=1
    shift
  fi

  recursive=0
  if [ $1 = "-recursive" ]; then
    recursive=1
    shift
  fi

  REQUESTURL=$1
  COMMAND=$2
  RESULT=$3
  FETCH_UNTIL_WGET_ARGS="$WGET_ARGS $4"

  if [ $recursive -eq 1 ]; then
    FETCH_FILE="$OUTDIR/$(basename $REQUESTURL)"
    FETCH_UNTIL_WGET_ARGS="$FETCH_UNTIL_WGET_ARGS $PREREQ_ARGS"
  else
    FETCH_FILE="$FETCH_UNTIL_OUTFILE"
    FETCH_UNTIL_WGET_ARGS="$FETCH_UNTIL_WGET_ARGS -O $FETCH_FILE"
  fi


  TIMEOUT=10
  START=$(date +%s)
  STOP=$((START+$TIMEOUT))
  WGET_HERE="$WGET -q $FETCH_UNTIL_WGET_ARGS"
  echo -n "      Fetching $REQUESTURL $FETCH_UNTIL_WGET_ARGS"
  echo " until \$($COMMAND) = $RESULT"
  echo "$WGET_HERE $REQUESTURL and checking with $COMMAND"
  while test -t; do
    $WGET_HERE $REQUESTURL
    if [ $($COMMAND < "$FETCH_FILE") = "$RESULT" ]; then
      /bin/echo ".";
      if [ $save = 0 ]; then
        if [ $recursive -eq 1 ]; then
          rm -rf $OUTDIR
        else
          rm -f "$FETCH_FILE"
        fi
      fi
      return;
    fi
    if [ $(date +%s) -gt $STOP ]; then
      echo ""
      echo "*** $WGET_HERE output in $FETCH_FILE"
      print_failure_info_and_exit
    fi
    if [ $recursive -eq 1 ]; then
      rm -rf $OUTDIR
      mkdir $OUTDIR
    else
      rm -f "$FETCH_FILE"
    fi
    /bin/echo -n "."
    sleep 0.1
  done;
}

# Helper to set up most filter tests.  Alternate between using query-params
# and request-headers to enable the filter, so we know they both work.
filter_spec_method="query_params"
function test_filter() {
  rm -rf $OUTDIR
  mkdir -p $OUTDIR
  FILTER_NAME=$1;
  shift;
  FILTER_DESCRIPTION=$@
  echo TEST: $FILTER_NAME $FILTER_DESCRIPTION
  # Filename is the name of the first filter only.
  FILE=${FILTER_NAME%%,*}.html
  if [ $filter_spec_method = "query_params" ]; then
    WGET_ARGS=""
    FILE="$FILE?ModPagespeedFilters=$FILTER_NAME"
    filter_spec_method="headers"
  else
    WGET_ARGS="--header=ModPagespeedFilters:$FILTER_NAME"
    filter_spec_method="query_params"
  fi
  URL=$EXAMPLE_ROOT/$FILE
  FETCHED=$OUTDIR/$FILE
}

# Helper to test if we mess up extensions on requests to broken url
function test_resource_ext_corruption() {
  URL=$1
  RESOURCE=$EXAMPLE_ROOT/$2

  # Make sure the resource is actually there, that the test isn't broken
  echo checking that wgetting $URL finds $RESOURCE ...
  check fgrep -qi $RESOURCE <($WGET_DUMP $WGET_ARGS $URL)

  # Now fetch the broken version. This should succeed anyway, as we now
  # ignore the noise.
  check $WGET_PREREQ $WGET_ARGS "$RESOURCE"broken

  # Fetch normal again; ensure rewritten url for RESOURCE doesn't contain broken
  check_not fgrep "broken" <($WGET_DUMP $WGET_ARGS $URL)
}