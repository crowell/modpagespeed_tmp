/*
 * Copyright 2011 Google Inc.
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

#ifndef NET_INSTAWEB_REWRITER_PUBLIC_REWRITE_CONTEXT_H_
#define NET_INSTAWEB_REWRITER_PUBLIC_REWRITE_CONTEXT_H_

#include <set>
#include <vector>

#include "base/scoped_ptr.h"
#include "net/instaweb/http/public/url_async_fetcher.h"
#include "net/instaweb/rewriter/public/blocking_behavior.h"
#include "net/instaweb/rewriter/public/output_resource_kind.h"
#include "net/instaweb/rewriter/public/resource.h"
#include "net/instaweb/rewriter/public/resource_manager.h"
#include "net/instaweb/rewriter/public/resource_slot.h"
#include "net/instaweb/rewriter/public/rewrite_single_resource_filter.h"
#include "net/instaweb/util/public/basictypes.h"
#include "net/instaweb/util/public/cache_interface.h"
#include "net/instaweb/util/public/string.h"
#include "net/instaweb/util/public/string_util.h"        // for StringPiece
#include "net/instaweb/util/public/url_segment_encoder.h"

namespace net_instaweb {

class CachedResult;
class InputInfo;
class MessageHandler;
class NamedLock;
class OutputPartitions;
class ResourceContext;
class ResponseHeaders;
class RewriteDriver;
class RewriteOptions;
class SharedString;
class Statistics;
class Writer;
struct ContentType;

// A RewriteContext is all the contextual information required to
// perform one or more Rewrites.  Member data in the ResourceContext
// helps us track the collection of data to rewrite, via async
// cache-lookup or async fetching.  It also tracks what to do with the
// rewritten data when the rewrite completes (e.g. rewrite the URL in
// HTML or serve the requested data).
//
// RewriteContext is subclassed to control the transformation (e.g.
// minify js, compress images, etc).
//
// A new RewriteContext is created on behalf of an HTML or CSS
// rewrite, or on behalf of a resource-fetch.  A single filter may
// have multiple outstanding RewriteContexts associated with it.
// In the case of combining filters, a single RewriteContext may
// result in multiple rewritten resources that are partitioned based
// on data semantics.  Most filters will just work on one resource,
// and those can inherit from SingleRewriteContext which is simpler
// to implement.
//
// TODO(jmarantz): add support for controlling TTL on failures.
//
// RewriteContext utilizes two threads (via QueuedThreadPool::Sequence)
// to do most of its work. The "high priority" thread is used to run the
// dataflow graph: queue up fetches and cache requests, partition inputs,
// render results, etc. The actual Rewrite() methods, however, are invoked
// in the "low priority" thread and can be canceled during extreme load
// or shutdown.
//
// Top-level RewriteContexts are initialized from the HTML
// thread.  In particular, from this thread they can be constructed,
// and AddSlot() and Initiate() can be called.  Once Initiate is
// called, the RewriteContext runs purely in its two threads, until
// it completes.  At that time it calls
// RewriteDriver::RewriteComplete.  Once complete, the RewriteDriver
// can call RewriteContext::Propagate() and finally delete the object.
//
// RewriteContexts can also be nested, in which case they are constructed,
// slotted, and Initated all within the rewrite threads.  However, they
// are Propagated and destructed by their parent, which is initiated by the
// RewriteDriver.
class RewriteContext {
 public:
  // Takes ownership of resource_context, which must be NULL or
  // allocated with 'new'.
  RewriteContext(RewriteDriver* driver,   // exactly one of driver & parent
                 RewriteContext* parent,  // is non-null
                 ResourceContext* resource_context);
  virtual ~RewriteContext();

  // Static initializer for statistics variables.
  static void Initialize(Statistics* statistics);

  // Random access to slots.  This is not thread-safe.  Prior to
  // Initialize(), these can be called by the constructing thread.
  // After Initiate(), these should only be called by the Rewrite
  // thread.
  int num_slots() const { return slots_.size(); }
  ResourceSlotPtr slot(int index) const { return slots_[index]; }

  // Random access to outputs.  These should only be accessed by
  // the RewriteThread.
  int num_outputs() const { return outputs_.size(); }
  OutputResourcePtr output(int i) const { return outputs_[i]; }

  // These are generally accessed in the Rewrite thread,
  // but may also be accessed in ::Render.
  int num_output_partitions() const;
  const CachedResult* output_partition(int i) const;
  CachedResult* output_partition(int i);

  // Returns true if this context is chained to some predecessors, and
  // must therefore be started by a predecessor and not RewriteDriver.
  bool chained() const { return chained_ != 0; }

  // Resource slots must be added to a Rewrite before Initiate() can
  // be called.  Starting the rewrite sets in motion a sequence
  // of async cache-lookups &/or fetches.
  void AddSlot(const ResourceSlotPtr& slot);

  // Remove the last slot from the context's slot list. This
  // context must be the last one attached to the slot.
  void RemoveLastSlot();

  // Starts a resource rewrite.  Once Inititated, the Rewrite object
  // should only be accessed from the Rewrite thread, until it
  // Completes, at which point top-level Contexts will call
  // RewriteComplete on their driver, and nested Contexts will call
  // NestedRewriteComplete on their parent.  Nested rewrites will be
  // Started directly from their parent context, and Initiate will not
  // be called.
  //
  // Precondition: this rewrite isn't anyone's successor (e.g. chain() == false)
  //               and has not been started before.
  void Initiate();

  // Fetch the specified output resource by reconstructing it from
  // its inputs, sending output into response_writer, writing
  // headers to response_headers, and calling callback->Done(bool success)
  // when complete.
  //
  // True is returned if an asynchronous fetch got queued up.
  // If false, Done() will not be called.
  bool Fetch(const OutputResourcePtr& output_resource,
             Writer* response_writer,
             ResponseHeaders* response_headers,
             MessageHandler* message_handler,
             UrlAsyncFetcher::Callback* callback);

  // Runs after all Rewrites have been completed, and all nested
  // RewriteContexts have completed and harvested.
  //
  // For top-level Rewrites, this must be called from the HTML thread.
  // For nested Rewrites it runs from the Rewrite thread.
  //
  // If render_slots is true, then all the slots owned by this context
  // will have Render() called on them.  For top-level Rewrites, this
  // should only be done if the rewrite completes before the rewrite
  // deadline expires.  After that, the HTML elements referred to by
  // the slots have already been flushed to the network.  For nested
  // Rewrites it's done unconditionally.
  //
  // Rewriting and propagation continue even after this deadline, so
  // that we may cache the rewritten results, allowing the deadline to
  // be easier-to-hit next time the same resources need to be
  // rewritten.
  //
  // And in all cases, the successors Rewrites are queued up in the
  // Rewrite thread once any nested propagation is complete.  And, in
  // particular, each slot must be updated with any rewritten
  // resources, before the successors can be run, independent of
  // whether the slots can be rendered into HTML.
  void Propagate(bool render_slots);

  // If true, we have determined that this job can't be rendered just
  // from metadata cache (including all prerequisites).
  bool slow() const { return slow_; }

 protected:
  typedef std::vector<InputInfo*> InputInfoStarVector;

  // The following methods are provided for the benefit of subclasses.

  // Finds the ResourceManager associated with this context.  Note that
  // this method might have to climb up the parent-tree, but it's typically
  // not a deep tree.  Same with Driver() and Options().
  ResourceManager* Manager();
  const RewriteOptions* Options();
  RewriteDriver* Driver();
  const ResourceContext* resource_context() { return resource_context_.get(); }

  // Check that an CachedResult is valid, specifically, that all the
  // inputs are still valid/non-expired.
  // If return value is false, it will also check to see if we should
  // re-check validity of the CachedResult based on input contents, and set
  // *can_revalidate accordingly. If *can_revalidate is true,
  // *revalidate will contain info on resources to re-check, with the
  // InputInfo pointers being pointers into the partition.
  bool IsCachedResultValid(CachedResult* partition,
                           bool* can_revalidate,
                           InputInfoStarVector* revalidate);

  // Checks whether all the entries in the given partition tables' other
  // dependency table are valid.
  bool IsOtherDependencyValid(const OutputPartitions* partitions);

  // Checks whether the given input is still unchanged.
  bool IsInputValid(const InputInfo& input_info);

  // Add a dummy other_dependency that will force the rewrite's OutputPartitions
  // to be rechecked after a modest TTL.
  void AddRecheckDependency();

  // Establishes that a slot has been rewritten.  So when Propagate()
  // is called, the resource update that has been written to this slot can
  // be propagated to the DOM.
  void RenderPartitionOnDetach(int partition_index);

  // Called by subclasses when an individual rewrite partition is
  // done.  Note that RewriteDone may 'delete this' so no
  // further references to 'this' should follow a call to RewriteDone.
  // This method can run in any thread.
  void RewriteDone(RewriteSingleResourceFilter::RewriteResult result,
                   int partition_index);

  // Adds a new nested RewriteContext.  This RewriteContext will not
  // be considered complete until all nested contexts have completed.
  void AddNestedContext(RewriteContext* context);

  // Called on the parent from a nested Rewrite when it is complete.
  // Note that we don't track rewrite success/failure here.  We only
  // care whether the nested rewrites are complete, and whether there
  // are any dependencies.
  void NestedRewriteDone(const RewriteContext* context);

  // Called on the parent to initiate all nested tasks.  This is so
  // that they can all be added before any of them are started.
  // May be called from any thread.
  void StartNestedTasks();

  // Deconstructs a URL by name and creates an output resource that
  // corresponds to it.
  bool CreateOutputResourceForCachedOutput(const StringPiece& url,
                                           const ContentType* content_type,
                                           OutputResourcePtr* output_resource);

  // Partitions the input resources into one or more outputs.  Return
  // 'true' if the partitioning could complete (whether a rewrite was
  // found or not), false if the attempt was abandoned and no
  // conclusion can be drawn.
  //
  // Note that if partitioner finds that the resources are not
  // rewritable, it will still return true; it will simply have
  // an empty inputs-array in OutputPartitions and leave
  // 'outputs' unmodified.  'false' is only returned if the subclass
  // skipped the rewrite attempt due to a lock conflict.
  virtual bool Partition(OutputPartitions* partitions,
                         OutputResourceVector* outputs) = 0;

  // Takes a completed rewrite partition and rewrites it.  When
  // complete calls RewriteDone with
  // RewriteSingleResourceFilter::kRewriteOk if successful.  Note that
  // a value of RewriteSingleResourceFilter::kTooBusy means that an
  // HTML rewrite will skip this resource, but we should not cache it
  // as "do not optimize".
  //
  // During this phase, any nested contexts that are needed to complete
  // the Rewrite process can be instantiated.
  //
  // TODO(jmarantz): check for resource completion from a different
  // thread (while we were waiting for resource fetches) when Rewrite
  // gets called.
  virtual void Rewrite(int partition_index,
                       CachedResult* partition,
                       const OutputResourcePtr& output) = 0;

  // Once any nested rewrites have completed, the results of these
  // can be incorporated into the rewritten data.  For contexts that
  // do not require any nested RewriteContexts, it is OK to skip
  // overriding this method -- the empty default implementation is fine.
  virtual void Harvest();

  // Performs rendering activities that span multiple HTML slots.  For
  // example, in a filter that combines N slots to 1, N-1 of the HTML
  // elements might need to be removed.  That can be performed in
  // Render().  This method is optional; the base-class implementation
  // is empty.
  //
  // Note that unlike Harvest(), this method runs in the HTML thread (for
  // top-level rewrites), and only runs if the rewrite completes prior to
  // the rewrite-deadline.
  virtual void Render();

  // This final set of protected methods can be optionally overridden
  // by subclasses.

  // All RewriteContexts define how they encode URLs and other
  // associated information needed for a rewrite into a URL.
  // The default implementation handles a single URL with
  // no extra data.  The RewriteContext owns the encoder.
  //
  // TODO(jmarantz): remove the encoder from RewriteFilter.
  virtual const UrlSegmentEncoder* encoder() const;

  // Returns the cache key that should be used to identify the input &
  // settings for the rewrites we're representing. The default implementation
  // just passes in the URLs through the encoder.
  //
  // (Filter ID will be incorporated separately)
  virtual GoogleString CacheKey() const;

  // Returrns the filter ID.
  virtual const char* id() const = 0;

  // Rewrites come in three flavors, as described in output_resource_kind.h,
  // so this method must be defined by subclasses to indicate which it is.
  //
  // For example, we will avoid caching output_resource content in the HTTP
  // cache for rewrites that are so quick to complete that it's fine to
  // do the rewrite on every request.  extend_cache is obviously in
  // this category, and it's arguable we could treat js minification
  // that way too (though we don't at the moment).
  virtual OutputResourceKind kind() const = 0;

  // Accessors for the nested rewrites.
  int num_nested() const { return nested_.size(); }
  RewriteContext* nested(int i) const { return nested_[i]; }

  // Returns true if this is a nested rewriter.
  bool has_parent() const { return parent_ != NULL; }

 private:
  class OutputCacheCallback;
  friend class OutputCacheCallback;
  class ResourceCallbackUtils;
  class ResourceFetchCallback;
  class ResourceReconstructCallback;
  friend class ResourceCallbackUtils;
  class ResourceRevalidateCallback;
  friend class ResourceRevalidateCallback;
  class InvokeRewriteFunction;
  friend class InvokeRewriteFunction;

  typedef std::set<RewriteContext*> ContextSet;

  // Callback helper functions.
  void Start();
  void SetPartitionKey();
  void StartFetch();
  void OutputCacheDone(CacheInterface::KeyState state, SharedString value);
  void OutputCacheHit(bool write_partitions);
  void OutputCacheRevalidate(const InputInfoStarVector& to_revalidate);
  void OutputCacheMiss();
  void ResourceFetchDone(bool success, ResourcePtr resource, int slot_index);
  void ResourceRevalidateDone(InputInfo* input_info, bool success);

  // When a RewriteContext 'B' discovers that it's doing the exact same rewrite
  // as a previous RewriteContext 'A', B adds itself to A->repeated_, and
  // suspends its work, expecting 'A' to call B->RepeatedSuccess(A) or
  // B->RepeatedFailure() to give it the result of the rewrite.
  void RepeatedSuccess(const RewriteContext* primary);
  void RepeatedFailure();

  // After a Rewrite is complete, writes the metadata for the rewrite
  // operation to the cache, and runs any further rewites that are
  // dependent on this one.
  //
  // If there are pending nested rewrites then this call has no
  // effect.  Once all the nested rewrites have been accounted for via
  // NestedRewriteDone() then Finalize can queue up its render and
  // enable successor rewrites to proceed.
  void Finalize();

  // Initiates an asynchronous fetch for the resources associated with
  // each slot, calling ResourceFetchDone() when complete.
  //
  // To avoid concurrent fetches across multiple processes or threads,
  // each input is locked by name, according to the specified blocking
  // behavior.  Input fetches done on behalf of resource fetches must
  // succeed to avoid sending 404s to clients, and so they will break
  // locks.  Input fetches done for async rewrite initiations should
  // fail fast to help avoid having multiple concurrent processes attempt
  // the same rewrite.
  void FetchInputs(BlockingBehavior block);

  // Generally a RewriteContext is waiting for one or more
  // asynchronous events to take place.  Activate is called
  // to run some action to help us advance to the next state.
  void Activate();

  // With all resources loaded, the rewrite can now be done, writing:
  //    The metadata into the cache
  //    The output resource into the cache
  //    if the driver has not been detached,
  //      the url+data->rewritten_resource is written into the rewrite
  //      driver's map, for each of the URLs.
  void StartRewrite();
  void FinishFetch();

  // Freshens resources proactively to avoid expiration in the near future.
  void Freshen(const CachedResult& group);

  // Determines whether the Context is in a state where it's ready to
  // rewrite.  This requires:
  //    - no preceding RewriteContexts in progress
  //    - no outstanding cache lookups
  //    - no outstanding fetches
  //    - rewriting not already complete.
  bool ReadyToRewrite() const;

  // Activate any Rewrites that come after this one, for serializability
  // of access to common slots.
  void RunSuccessors();

  // Writes out the partition-table into the metadata cache.  This method
  // may call 'delete this' so it should be the last call at its call-site.
  //
  // It will *not* call 'delete this' if there is a live RewriteDriver,
  // waiting for a convenient point to render the rewrites into HTML.
  void WritePartition();

  // Marks this job and any dependents slow as appropriate, notifying the
  // RewriteDriver of any changes.
  void MarkSlow();

  // Notes that we dropped parts of this rewrite due to system load, so we
  // should not cache it.
  void MarkTooBusy();

  // Collect all non-nested contexts that depend on this one (including
  // itself). Note that this might exclude some repeated jobs that haven't
  // gotten far enough to realize that yet.
  void CollectDependentTopLevel(ContextSet* contexts);

  // Actual implementation of RewriteDone that's queued to run in
  // high-priority rewrite thread.
  void RewriteDoneImpl(RewriteSingleResourceFilter::RewriteResult result,
                       int partition_index);

  // Actual implementation of StartNestedTasks that's queued to run in
  // high-priority rewrite thread.
  void StartNestedTasksImpl();

  // To perform a rewrite, we need to have data for all of its input slots.
  ResourceSlotVector slots_;

  // Not all of the slots require rendering from this RewriteContext.  If an
  // optimization was deemed non-beneficial then we skip rendering the slot.
  // So keep the slots requiring rendering in a bitvector.
  std::vector<bool> render_slots_;

  // It's feasible that callbacks for different resources will be delivered
  // on different threads, thus we must protect these counters with a mutex
  // or make them using atomic integers.
  //
  // TODO(jmarantz): keep the outstanding fetches as a set so they can be
  // terminated cleanly and immediately, allowing fast process shutdown.
  // For example, if Apache notifies our process that it's being shut down
  // then we should have a mechanism to cancel all pending fetches.  This
  // would require a new cancellation interface from both CacheInterface and
  // UrlAsyncFetcher.

  bool started_;
  scoped_ptr<OutputPartitions> partitions_;
  OutputResourceVector outputs_;
  int outstanding_fetches_;
  int outstanding_rewrites_;
  scoped_ptr<ResourceContext> resource_context_;
  GoogleString partition_key_;

  UrlSegmentEncoder default_encoder_;

  // Lock guarding output partitioning and rewriting.  Lazily initialized by
  // LockForCreation, unlocked on destruction or the end of Finish().
  scoped_ptr<NamedLock> lock_;

  // When this rewrite object is created on behalf of a fetch, we must
  // keep the response_writer, request_headers, and callback in the
  // FetchContext so they can be used once the inputs are available.
  class FetchContext;
  scoped_ptr<FetchContext> fetch_;

  // Track the RewriteContexts that must be run after this one because they
  // share a slot.
  std::vector<RewriteContext*> successors_;

  // Other places on the page (or CSS) that should be rewritten the same
  // way 'this' is (e.g. because they refer to the same URL, filter and
  // settings).
  std::vector<RewriteContext*> repeated_;

  // Track the number of nested contexts that must be completed before
  // this one can be marked complete.  Nested contexts are typically
  // added during the Rewrite() phase.
  int num_pending_nested_;
  std::vector<RewriteContext*> nested_;

  // If this context is nested, the parent is the context that 'owns' it.
  RewriteContext* parent_;

  // If this context was initiated from a RewriteDriver, either due to
  // a Resource Fetch or an HTML Rewrite, then we keep track of the
  // RewriteDriver, and notify it when the RewriteContext is complete.
  // That way it can stay around and 'own' all the resources associated
  // with all the resources it spawns, directly or indirectly.
  //
  // Nested RewriteContexts have a null driver_ but can always get to a
  // driver by walking up the parent tree, which we generally expect
  // to be very shallow.
  RewriteDriver* driver_;

  // Track the number of ResourceContexts that must be run before this one.
  int num_predecessors_;

  // If true, this context's execution must follow some other context's
  // completion (which may have occurred already).
  bool chained_;

  // TODO(jmarantz): Refactor to replace a bunch bool member variables with
  // an explicit state_ member variable, with a set of possibilties that
  // look something like this:
  //
  // enum State {
  //   kCluster,     // Inputs are being clustered into RewriteContexts.
  //   kLookup,      // Looking up partitions & rewritten URLs in the cache.
  //                 //   - If successsful, skip to Render.
  //   kFetch,       // Waiting for URL fetches to complete.
  //   kPartition,   // Fetches complete; ready to partition into
  //                 // OutputResources.
  //   kRewrite,     // Partitioning complete, ready to Rewrite.
  //   kHarvest,     // Nested RewriteContexts complete, ready to harvest
  //                 // results.
  //   kRender,      // Ready to render the rewrites into the DOM.
  //   kComplete     // Ready to delete.
  // };

  // True if all the rewriting is done for this context.
  bool rewrite_done_;

  // True if it's valid to write the partition table to the metadata cache.
  // We would *not* want to do that if one of the Rewrites completed
  // with status kTooBusy or if we've just read these very partitions from
  // the metadata cache.
  bool ok_to_write_output_partitions_;

  // True if the rewrite was incomplete due to heavy load; if this is true
  // ok_to_write_output_partitions_ must be false.
  bool was_too_busy_;

  // We mark a job as "slow" when we cannot render it entirely from the
  // metadata cache (including rendering its predecessors). We only do this
  // for top-level jobs.
  bool slow_;

  // Starts at true, set to false if any content-change checks failed.
  bool revalidate_ok_;

  DISALLOW_COPY_AND_ASSIGN(RewriteContext);
};

}  // namespace net_instaweb

#endif  // NET_INSTAWEB_REWRITER_PUBLIC_REWRITE_CONTEXT_H_
