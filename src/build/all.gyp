# Copyright 2009 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

{
  'targets': [
    {
      'target_name': 'all',
      'type': 'none',
      'xcode_create_dependents_test_runner': 1,
      'dependencies': [
        'mod_pagespeed',
        'test',
      ],},
    {
      'target_name': 'mod_pagespeed',
      'type': 'none',
      'dependencies': [
        '../net/instaweb/instaweb.gyp:*',
        '../net/instaweb/instaweb_core.gyp:*',
        '../net/instaweb/apache.gyp:*',
        '../net/instaweb/mod_pagespeed.gyp:*',
        '../net/instaweb/test.gyp:*',
        'install.gyp:*',
      ],},
    {
      'target_name': 'test',
      'type': 'none',
      'xcode_create_dependents_test_runner': 1,
      'dependencies': [
        '../net/instaweb/instaweb.gyp:*',
        '../net/instaweb/instaweb_core.gyp:*',
        '../net/instaweb/apache.gyp:*',
        '../net/instaweb/test.gyp:*',
        'install.gyp:*',
      ]
    },
  ],
}
