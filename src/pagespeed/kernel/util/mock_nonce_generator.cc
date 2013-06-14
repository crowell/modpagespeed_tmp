// Copyright 2013 Google Inc. All Rights Reserved.
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

// Author: jmaessen@google.com (Jan-Willem Maessen)

#include "pagespeed/kernel/util/mock_nonce_generator.h"

#include "pagespeed/kernel/base/basictypes.h"

namespace net_instaweb {

MockNonceGenerator::~MockNonceGenerator() { }

uint64 MockNonceGenerator::NewNonceImpl() {
  return counter_++;
}

}  // namespace net_instaweb
