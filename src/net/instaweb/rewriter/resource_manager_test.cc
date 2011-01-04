/**
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

// Author: abliss@google.com (Adam Bliss)

// Unit-test the resource manager

#include "base/scoped_ptr.h"
#include "net/instaweb/rewriter/public/output_resource.h"
#include "net/instaweb/rewriter/public/resource_namer.h"
#include "net/instaweb/rewriter/public/resource_manager.h"
#include "net/instaweb/rewriter/public/resource_manager_test_base.h"
#include "net/instaweb/rewriter/public/rewrite_filter.h"
#include "net/instaweb/rewriter/resource_manager_testing_peer.h"
#include "net/instaweb/util/public/content_type.h"
#include "net/instaweb/util/public/gtest.h"
#include "net/instaweb/util/public/meta_data.h"
#include "net/instaweb/util/public/simple_meta_data.h"
#include "net/instaweb/util/public/string_util.h"
#include "net/instaweb/util/public/string_writer.h"
#include "net/instaweb/util/public/url_escaper.h"

namespace net_instaweb {

class VerifyContentsCallback : public Resource::AsyncCallback {
 public:
  explicit VerifyContentsCallback(const std::string& contents) :
      contents_(contents), called_(false) {
  }
  virtual void Done(bool success, Resource* resource) {
    EXPECT_EQ(0, contents_.compare(resource->contents().as_string()));
    called_ = true;
  }
  void AssertCalled() {
    EXPECT_TRUE(called_);
  }
  std::string contents_;
  bool called_;
};

class ResourceManagerTest : public ResourceManagerTestBase {
 protected:
  ResourceManagerTest() { }

  // Calls FetchOutputResource with different values of writer and
  // response_headers, to test all branches.  Expects the fetch to succeed all
  // times, and finally returns the contents.
  std::string FetchOutputResource(OutputResource* resource) {
    EXPECT_TRUE(resource_manager_->FetchOutputResource(
        resource, NULL, NULL, &message_handler_, ResourceManager::kMayBlock));
    SimpleMetaData empty;
    EXPECT_TRUE(resource_manager_->FetchOutputResource(
        resource, NULL, &empty, &message_handler_, ResourceManager::kMayBlock));
    std::string contents;
    StringWriter writer(&contents);
    EXPECT_TRUE(resource_manager_->FetchOutputResource(
        resource, &writer, resource->metadata(),
        &message_handler_, ResourceManager::kMayBlock));
    return contents;
  }

  // Asserts that the given url starts with an appropriate prefix;
  // then cuts off that prefix.
  virtual void RemoveUrlPrefix(std::string* url) {
    EXPECT_EQ(0, url->compare(0, url_prefix_.length(), url_prefix_));
    url->erase(0, url_prefix_.length());
  }


  // Tests for the lifecycle and various flows of a named output resource.
  void TestNamed() {
    const char* filter_prefix = "fp";
    const char* name = "name";
    const char* contents = "contents";
    // origin_expire_time_ms should be considerably longer than the various
    // timeouts for resource locking, since we hit those timeouts in various
    // places.
    const int64 origin_expire_time_ms = 100000;
    const ContentType* content_type = &kContentTypeText;
    scoped_ptr<OutputResource> nor(
        resource_manager_->CreateOutputResourceWithPath(
            url_prefix_, filter_prefix, name, content_type, &message_handler_));
    ASSERT_TRUE(nor.get() != NULL);
    // Check name_key against url_prefix/fp.name
    std::string name_key = nor->name_key();
    RemoveUrlPrefix(&name_key);
    EXPECT_EQ(nor->full_name().EncodeIdName(), name_key);
    // Make sure the resource hasn't already been created (and lock it for
    // creation).
    EXPECT_FALSE(resource_manager_->FetchOutputResource(
        nor.get(), NULL, NULL, &message_handler_,
        ResourceManager::kNeverBlock));
    EXPECT_FALSE(nor->IsWritten());
    {
      // Now show that another attempt to create the resource will fail.
      // Here we attempt to create without the hash.
      scoped_ptr<OutputResource> nor1(
          resource_manager_->CreateOutputResourceWithPath(
              url_prefix_, filter_prefix, name, content_type,
              &message_handler_));
      ASSERT_TRUE(nor1.get() != NULL);
      // We'll succeed in fetching (meaning don't create the resource), but the
      // resource won't be written.
      EXPECT_TRUE(resource_manager_->FetchOutputResource(
          nor1.get(), NULL, NULL, &message_handler_,
          ResourceManager::kNeverBlock));
      EXPECT_FALSE(nor1->IsWritten());
    }
    {
      // Here we attempt to create the object with the hash and fail.
      ResourceNamer namer;
      namer.CopyFrom(nor->full_name());
      namer.set_hash("0");
      namer.set_ext("txt");
      std::string name = StrCat(url_prefix_, namer.Encode());
      scoped_ptr<OutputResource> nor1(
          resource_manager_->CreateOutputResourceForFetch(name));
      ASSERT_TRUE(nor1.get() != NULL);
      // Again we'll succeed in fetching (meaning don't create), but the
      // resource won't be written.  Note that we do a non-blocking fetch here.
      // An actual resource fetch does a blocking fetch that would end by
      // stealing the creation lock; we don't want to steal the lock here.
      EXPECT_TRUE(resource_manager_->FetchOutputResource(
          nor1.get(), NULL, NULL, &message_handler_,
          ResourceManager::kNeverBlock));
      EXPECT_FALSE(nor1->IsWritten());
    }
    // Write some data
    EXPECT_FALSE(ResourceManagerTestingPeer::HasHash(nor.get()));
    EXPECT_FALSE(ResourceManagerTestingPeer::Generated(nor.get()));
    EXPECT_TRUE(resource_manager_->Write(HttpStatus::kOK, contents, nor.get(),
                                         origin_expire_time_ms,
                                         &message_handler_));
    EXPECT_TRUE(nor->IsWritten());
    // Check that hash_ext() is correct.
    ResourceNamer full_name;
    EXPECT_TRUE(full_name.DecodeHashExt(nor->hash_ext()));
    EXPECT_EQ("0", full_name.hash());
    EXPECT_EQ("txt", full_name.ext());
    // Retrieve the same NOR from the cache.
    scoped_ptr<OutputResource> nor2(
        resource_manager_->CreateOutputResourceWithPath(
            url_prefix_, filter_prefix, name, &kContentTypeText,
            &message_handler_));
    ASSERT_TRUE(nor2.get() != NULL);
    EXPECT_TRUE(ResourceManagerTestingPeer::HasHash(nor2.get()));
    EXPECT_FALSE(ResourceManagerTestingPeer::Generated(nor2.get()));
    EXPECT_FALSE(nor2->IsWritten());

    // Fetch its contents and make sure they match
    EXPECT_EQ(contents, FetchOutputResource(nor2.get()));

    // Try asynchronously too
    VerifyContentsCallback callback(contents);
    resource_manager_->ReadAsync(nor2.get(), &callback, &message_handler_);
    callback.AssertCalled();

    // Grab the URL for later
    EXPECT_TRUE(nor2->HasValidUrl());
    std::string url = nor2->url();
    EXPECT_LT(0, url.length());

    // Now expire it from the HTTP cache.  Since we don't know its hash, we
    // cannot fetch it (even though the contents are still in the filesystem).
    mock_timer()->advance_ms(2 * origin_expire_time_ms);
    {
      scoped_ptr<OutputResource> nor3(
          resource_manager_->CreateOutputResourceWithPath(
              url_prefix_, filter_prefix, name, &kContentTypeText,
              &message_handler_));
      EXPECT_FALSE(resource_manager_->FetchOutputResource(
          nor3.get(), NULL, NULL, &message_handler_,
          ResourceManager::kNeverBlock));
      // Now nor3 has locked the resource for creation.
      // We must destruct nor3 in order to unlock it again, since we
      // have no intention of creating it.
    }

    RemoveUrlPrefix(&url);
    ASSERT_TRUE(full_name.Decode(url));
    EXPECT_EQ(content_type, full_name.ContentTypeFromExt());
    EXPECT_EQ(filter_prefix, full_name.id());
    EXPECT_EQ(name, full_name.name());

    // But with the URL (which contains the hash), we can retrieve it
    // from the http_cache.
    // first cut off the "http://mysite{,.0,.1}/" from the front.
    scoped_ptr<OutputResource> nor4(
        resource_manager_->CreateOutputResourceForFetch(nor->url()));
    EXPECT_EQ(nor->url(), nor4->url());
    EXPECT_EQ(contents, FetchOutputResource(nor4.get()));

    // If it's evicted from the http_cache, we can also retrieve it from the
    // filesystem.
    lru_cache_->Clear();
    nor4.reset(resource_manager_->CreateOutputResourceForFetch(nor->url()));
    EXPECT_EQ(nor->url(), nor4->url());
    EXPECT_EQ(contents, FetchOutputResource(nor4.get()));
    // This also works asynchronously.
    lru_cache_->Clear();
    VerifyContentsCallback callback2(contents);
    resource_manager_->ReadAsync(nor4.get(), &callback2, &message_handler_);
    callback2.AssertCalled();
  }
};

TEST_F(ResourceManagerTest, TestNamed) {
  TestNamed();
}

TEST_F(ResourceManagerTest, TestOutputInputUrl) {
  std::string url = Encode("http://example.com/dir/123/",
                            "jm", "0", "orig", "js");
  scoped_ptr<OutputResource> output_resource(
      resource_manager_->CreateOutputResourceForFetch(url));
  ASSERT_TRUE(output_resource.get());
  scoped_ptr<Resource> input_resource(
      resource_manager_->CreateInputResourceFromOutputResource(
          resource_manager_->url_escaper(),
          output_resource.get(),
          &options_,
          &message_handler_));
  EXPECT_EQ("http://example.com/dir/123/orig", input_resource->url());
}

TEST_F(ResourceManagerTest, TestRemember404) {
  // Make sure our resources remember that a page 404'd
  SimpleMetaData not_found;
  resource_manager_->SetDefaultHeaders(&kContentTypeHtml, &not_found);
  not_found.SetStatusAndReason(HttpStatus::kNotFound);
  mock_url_fetcher_.SetResponse("http://example.com/404", not_found, "");

  GURL base = GoogleUrl::Create(StringPiece("http://example.com/"));
  scoped_ptr<Resource> resource(
      resource_manager_->CreateInputResourceAndReadIfCached(
          base, "404", rewrite_driver_.options(), &message_handler_));
  EXPECT_EQ(NULL, resource.get());

  HTTPValue valueOut;
  SimpleMetaData headersOut;
  EXPECT_EQ(HTTPCache::kRecentFetchFailedDoNotRefetch,
            http_cache_.Find("http://example.com/404", &valueOut, &headersOut,
                             &message_handler_));
}

TEST_F(ResourceManagerTest, TestNonCacheable) {
  const std::string kContents = "ok";

  // Make sure we don't try to insert non-cacheable resources
  // into the cache wastefully, but still fetch them well.
  SimpleMetaData no_cache;
  resource_manager_->SetDefaultHeaders(&kContentTypeHtml, &no_cache);
  no_cache.RemoveAll(HttpAttributes::kCacheControl);
  no_cache.Add(HttpAttributes::kCacheControl, "no-cache");
  mock_url_fetcher_.SetResponse("http://example.com/", no_cache, kContents);

  int inserts_before = lru_cache_->num_inserts();
  GURL base = GoogleUrl::Create(StringPiece("http://example.com"));
  scoped_ptr<Resource> resource(
      resource_manager_->CreateInputResource(
          base, "/", rewrite_driver_.options(), &message_handler_));
  ASSERT_TRUE(resource.get() != NULL);

  VerifyContentsCallback callback(kContents);
  resource_manager_->ReadAsync(resource.get(), &callback, &message_handler_);
  callback.AssertCalled();

  int inserts_after = lru_cache_->num_inserts();
  EXPECT_EQ(inserts_before, inserts_after);
  EXPECT_EQ(0, lru_cache_->num_identical_reinserts());
}


// TODO(jmaessen): re-enable after sharding works again.
// class ResourceManagerShardedTest : public ResourceManagerTest {
//  protected:
//   ResourceManagerShardedTest() {
//     url_prefix_ ="http://mysite.%d/";
//     num_shards_ = 2;
//   }
//   virtual void RemoveUrlPrefix(std::string* url) {
//     // One of these two should match.
//     StringPiece prefix(url->data(), 16);
//     EXPECT_TRUE((prefix == "http://mysite.0/") ||
//                 (prefix == "http://mysite.1/")) << *url;
//     // "%d" -> "0" (or "1") loses 1 char.
//     url->erase(0, url_prefix_.length() - 1);
//   }
// };

// TODO(jmaessen): re-enable after sharding works again.
// TEST_F(ResourceManagerShardedTest, TestNamed) {
//   TestNamed();
// }

}  // namespace net_instaweb
