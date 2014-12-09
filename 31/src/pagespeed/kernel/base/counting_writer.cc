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

#include "pagespeed/kernel/base/counting_writer.h"
#include "pagespeed/kernel/base/writer.h"
#include "pagespeed/kernel/base/string_util.h"

namespace net_instaweb {
class MessageHandler;

CountingWriter::~CountingWriter() {
}

bool CountingWriter::Write(const StringPiece& str, MessageHandler* handler) {
  byte_count_ += str.size();
  return writer_->Write(str, handler);
}

bool CountingWriter::Flush(MessageHandler* handler) {
  return writer_->Flush(handler);
}

}  // namespace net_instaweb
