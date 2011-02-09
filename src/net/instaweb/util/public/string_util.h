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

// Author: jmarantz@google.com (Joshua Marantz)

#ifndef NET_INSTAWEB_UTIL_PUBLIC_STRING_UTIL_H_
#define NET_INSTAWEB_UTIL_PUBLIC_STRING_UTIL_H_


#include <algorithm>
#include <set>
#include <vector>
#include <string>

#include <stdlib.h>
#include "base/string_number_conversions.h"
#include "base/string_piece.h"
#include "base/string_util.h"

using base::StringAppendF;
using base::StringAppendV;
using base::SStringPrintf;

// Quick macro to get the size of a static char[] without trailing '\0'.
// Note: Cannot be used for char*, std::string, etc.
#define STATIC_STRLEN(static_string) (arraysize(static_string) - 1)

namespace net_instaweb {

typedef base::StringPiece StringPiece;

inline std::string IntegerToString(int i) {
  return base::IntToString(i);
}

inline std::string Integer64ToString(int64 i) {
  return base::Int64ToString(i);
}

inline bool StringToInt(const char* in, int* out) {
  // TODO(bmcquade): Use char*-based StringToInt once we sync the
  // Chromium repository.
  std::string str(in);
  return base::StringToInt(str, out);
}

inline bool StringToInt64(const char* in, int64* out) {
  // TODO(bmcquade): Use char*-based StringToInt64 once we sync the
  // Chromium repository.
  std::string str(in);
  return base::StringToInt64(str, out);
}

inline bool StringToInt(const std::string& in, int* out) {
  return base::StringToInt(in, out);
}

inline bool StringToInt64(const std::string& in, int64* out) {
  return base::StringToInt64(in, out);
}

class EmptyString {
 public:
  static const StringPiece kEmptyString;
};

// TODO(jmarantz): use overloading instead of default args and get
// rid of this statically constructed global object.
std::string StrCat(const StringPiece& a, const StringPiece& b,
                    const StringPiece& c = EmptyString::kEmptyString,
                    const StringPiece& d = EmptyString::kEmptyString,
                    const StringPiece& e = EmptyString::kEmptyString,
                    const StringPiece& f = EmptyString::kEmptyString,
                    const StringPiece& g = EmptyString::kEmptyString,
                    const StringPiece& h = EmptyString::kEmptyString);

void SplitStringPieceToVector(const StringPiece& sp, const char* separator,
                              std::vector<StringPiece>* components,
                              bool omit_empty_strings);

void BackslashEscape(const StringPiece& src,
                     const StringPiece& to_escape,
                     std::string* dest);

// TODO(jmarantz): Eliminate these definitions of HasPrefixString,
// UpperString, and LowerString, and re-add dependency on protobufs
// which also provide definitions for these.

bool HasPrefixString(const StringPiece& str, const StringPiece& prefix);

void UpperString(std::string* str);

void LowerString(std::string* str);

inline bool OnlyWhitespace(const std::string& str) {
  return ContainsOnlyWhitespaceASCII(str);
}

int GlobalReplaceSubstring(const StringPiece& substring,
                           const StringPiece& replacement,
                           std::string* s);


// See also: ./src/third_party/css_parser/src/strings/ascii_ctype.h
// We probably don't want our core string header file to have a
// dependecy on the Google CSS parser, so for now we'll write this here:

// upper-case a single character and return it.
// toupper() changes based on locale.  We don't want this!
inline char UpperChar(char c) {
  if ((c >= 'a') && (c <= 'z')) {
    c += 'A' - 'a';
  }
  return c;
}

// lower-case a single character and return it.
// tolower() changes based on locale.  We don't want this!
inline char LowerChar(char c) {
  if ((c >= 'A') && (c <= 'Z')) {
    c += 'a' - 'A';
  }
  return c;
}

inline char* strdup(const char* str) {
  return base::strdup(str);
}

// Case-insensitive string comparison that is locale-independent.
int StringCaseCompare(const StringPiece& s1, const StringPiece& s2);

// Locale-independent version of strncasecmp.
inline int StringNCaseCompare(const StringPiece& s1, const StringPiece& s2,
                              size_t n) {
  return StringCaseCompare(
      s1.substr(0, std::min(s1.size(), n)),
      s2.substr(0, std::min(s2.size(), n)));
}

inline void TrimWhitespace(const StringPiece& in, std::string* output) {
  static const char whitespace[] = " \r\n\t";
  TrimString(std::string(in.data(), in.size()), whitespace, output);
}

// Accumulates a decimal value from 'c' into *value.
// Returns false and leaves *value unchanged if c is not a decimal digit.
bool AccumulateDecimalValue(char c, int* value);

// Accumulates a hex value from 'c' into *value
// Returns false and leaves *value unchanged if c is not a hex digit.
bool AccumulateHexValue(char c, int* value);

// Return true iff the two strings are equal, ignoring case.
bool StringCaseEqual(const StringPiece& s1, const StringPiece& s2);
// Return true iff str starts with prefix, ignoring case.
bool StringCaseStartsWith(const StringPiece& str, const StringPiece& prefix);
// Return true iff str ends with suffix, ignoring case.
bool StringCaseEndsWith(const StringPiece& str, const StringPiece& suffix);

struct CharStarCompareInsensitive {
  bool operator()(const char* s1, const char* s2) const {
    return (StringCaseCompare(s1, s2) < 0);
  };
};

struct CharStarCompareSensitive {
  bool operator()(const char* s1, const char* s2) const {
    return (strcmp(s1, s2) < 0);
  }
};

struct StringCompareSensitive {
  bool operator()(const std::string& s1, const std::string& s2) const {
    return (strcmp(s1.c_str(), s2.c_str()) < 0);
  };
};

struct StringCompareInsensitive {
  bool operator()(const std::string& s1, const std::string& s2) const {
    return (StringCaseCompare(s1, s2) < 0);
  };
};

typedef std::vector<const char*> CharStarVector;
typedef std::vector<std::string> StringVector;
typedef std::set<std::string> StringSet;

// Does a path end in slash?
inline bool EndsInSlash(const StringPiece& path) {
  return path.ends_with("/");
}

// Make sure directory's path ends in '/'.
inline void EnsureEndsInSlash(std::string* dir) {
  if (!EndsInSlash(*dir)) {
    dir->append("/");
  }
}

// Given a string such as:  a b "c d" e 'f g'
// Parse it into a vector:  ["a", "b", "c d", "e", "f g"]
void ParseShellLikeString(const StringPiece& input,
                          std::vector<std::string>* output);

}  // namespace net_instaweb

#endif  // NET_INSTAWEB_UTIL_PUBLIC_STRING_UTIL_H_
