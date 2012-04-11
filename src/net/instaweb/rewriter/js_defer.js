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

/**
 * @fileoverview Code for deferring javascript on client side.
 * This javascript is part of JsDefer filter.
 *
 * @author atulvasu@google.com (Atul Vasu)
 */

// Exporting functions using quoted attributes to prevent js compiler from
// renaming them.
// See http://code.google.com/closure/compiler/docs/api-tutorial3.html#dangers
window['pagespeed'] = window['pagespeed'] || {};
var pagespeed = window['pagespeed'];

/**
 * @constructor
 */
pagespeed.DeferJs = function() {
  /**
   * Queue of tasks that need to be executed in order.
   * @type {!Array.<function()>}
   * @private
   */
  this.queue_ = [];

  /**
   * Array of logs, for debugging.
   * @type {Array.<string>}
   */
  this.logs = [];

  /**
   * Next item in the queue to be executed.
   * @type {!number}
   * @private
   */
  this.next_ = 0;

  /**
   * Nodes generated by document.write() are inserted before this element.
   * @type {Element}
   * @private
   */
  this.currentElem_ = null;

  /**
   * document.write() strings get buffered here, they get rendered when the
   * current script is finished executing.
   * @private
   */
  this.documentWriteHtml_ = '';

  // TODO(sriharis):  Can we have a listener module that is used for the
  // following.

  /**
   * EventListeners for DOMContentLoaded or onreadystatechange on document.
   * @type {!Array.<function()>}
   * @private
   */
  this.domReadyListeners_ = [];

  /**
   * EventListeners for element.onload
   * @type {!Array.<function()>}
   * @private
   * TODO(ksimbili): Handle body.onload. In IE body.onload is alias to
   * window.onload
   */
  this.onloadListeners_ = [];

  /**
   * Functions that run as the first thing in run().
   * @type {!Array.<function()>}
   * @private
   */
  this.beforeDeferRunFunctions_ = [];

  /**
   * Functions that run after all the deferred scripts, DOM ready
   * listeners and onload listeners have run.
   * @type {!Array.<function()>}
   * @private
   */
  this.afterDeferRunFunctions_ = [];

  /**
   * Valid Mime types for Javascript.
   */
  this.jsMimeTypes =
      ['application/ecmascript',
       'application/javascript',
       'application/x-ecmascript',
       'application/x-javascript',
       'text/ecmascript',
       'text/javascript',
       'text/javascript1.0',
       'text/javascript1.1',
       'text/javascript1.2',
       'text/javascript1.3',
       'text/javascript1.4',
       'text/javascript1.5',
       'text/jscript',
       'text/livescript',
       'text/x-ecmascript',
       'text/x-javascript'];

  /**
   * Original document.getElementById handler.
   * @private
   */
  this.origGetElementById_ = document.getElementById;

  /**
   * Original document.getElementsByTagName handler.
   * @private
   */
  this.origGetElementsByTagName_ = document.getElementsByTagName;

  /**
   * Maintains the current state for the deferJs.
   * @type {!number}
   * @private
   */
  this.state_ = pagespeed.DeferJs.STATES.NOT_STARTED;
};

/**
 * Indicates if experimental js in deferJS is active.
 * @type {boolean}
 */
pagespeed.DeferJs.isExperimentalMode = false;

/**
 * Constants for different states of deferJs exeuction.
 * @enum {number}
 */
pagespeed.DeferJs.STATES = {
  /**
   * State state.
   */
  NOT_STARTED: 0,
  /**
   * In this state all script tags with type as 'text/psajs' are registered for
   * deferred execution.
   */
  SCRIPTS_REGISTERED: 1,
  /**
   * Script execution is in process.
   */
  SCRIPTS_EXECUTING: 2,
  /**
   * Final state.
   */
  SCRIPTS_DONE: 3
};

/**
 * Name of the attribute set for the nodes that are not reached so far during
 * scripts execution.
 * @const {string}
 */
pagespeed.DeferJs.PSA_NOT_PROCESSED = 'psa_not_processed';

/**
 * Add to defer_logs if logs are enabled.
 * @param {string} line line to be added to log.
 * @param {Error} opt_exception optional exception to pass to log.
 */
pagespeed.DeferJs.prototype.log = function(line, opt_exception) {
  if (this.logs) {
    this.logs.push('' + line);
    if (opt_exception) {
      this.logs.push(opt_exception);
      if (typeof(console) != 'undefined' &&
          typeof(console.log) != 'undefined') {
        console.log('PSA ERROR: ' + line + opt_exception.message);
      }
    }
  }
};

/**
 * Adds task to the end of queue, unless position is explicitly given.
 * @param {!function()} task Function closure to be executed later.
 * @param {number} opt_pos optional position for ordering of jobs.
 */
pagespeed.DeferJs.prototype.submitTask = function(task, opt_pos) {
  var pos = opt_pos ? opt_pos : this.queue_.length;
  this.queue_.splice(pos, 0, task);
};

/**
 * @param {string} str to be evaluated.
 */
pagespeed.DeferJs.prototype.globalEval = function(str) {
  var script = document.createElement('script');
  script.text=str;
  script.setAttribute('type', 'text/javascript');
  this.currentElem_.parentNode.insertBefore(script, this.currentElem_);
};

/**
 * Defines a new var in the name of id's present in the doc. This is the fix for
 * IE, where setting value to the var with same name as an id in the doc throws
 * exception. While creating vars, skip the names which have '-', ':', '.'.
 * Also, variable names cannot start with digits.
 * These characters are allowed in id names but not allowed in variable
 * names.
 */
pagespeed.DeferJs.prototype.createIdVars = function() {
  var elems = document.getElementsByTagName("*");
  var idVarsString = "";
  for (var i = 0; i < elems.length; i++) {
    // Don't use elem.id since it leads to problem in forms.
    if (elems[i].hasAttribute('id')) {
      var idStr = elems[i].getAttribute('id');
      if (idStr && idStr.search(/[-:.]/) == -1 &&
          idStr.search(/^[0-9]/) == -1) {
        if (window[idStr] && window[idStr].tagName) {
          idVarsString += 'var ' + idStr +
              '=document.getElementById("' + idStr + '");';
        }
      }
    }
  }
  if (idVarsString) {
    this.globalEval(idVarsString);
  }
}

/**
 * Defers execution of scriptNode, by adding it to the queue.
 * @param {Element} script script node.
 * @param {number} opt_pos Optional position for ordering.
 */
pagespeed.DeferJs.prototype.addNode = function(script, opt_pos) {
  var src = script.getAttribute('orig_src') || script.getAttribute('src');
  if (src) {
    this.addUrl(src, script, opt_pos);
  }
  // TODO(ksimbili): Replace the below condition with 'else' once experimental
  // mode is tested.
  if (!(src && pagespeed.DeferJs.isExperimentalMode)) {
    var str = script.innerHTML || script.textContent || script.data;
    if (str) {
      this.addStr(str, script, opt_pos);
    }
  }
};

/**
 * Defers execution of 'str', by adding it to the queue.
 * @param {!string} str valid javascript snippet.
 * @param {Element} script_elem Psa inserted script used as context element.
 * @param {number} opt_pos Optional position for ordering.
 */
pagespeed.DeferJs.prototype.addStr = function(str, script_elem, opt_pos) {
  if (this.isFireFox()) {
    // This is due to some bug identified in firefox.
    // Got this workaround from the bug raised on firefox.
    // https://bugzilla.mozilla.org/show_bug.cgi?id=728151
    this.addUrl('data:text/javascript,' + encodeURIComponent(str),
                script_elem,
                opt_pos);
    return;
  }
  this.logs.push('Add to queue str: ' + str);
  var me = this; // capture closure.
  this.submitTask(function() {
    me.currentElem_ = script_elem;
    me.removeNotProcessedAttributeTillNode(script_elem);

    try {
      me.globalEval(str);
    } catch (err) {
      me.log('Exception while evaluating.', err);
    }
    me.log('Evaluated: ' + str);
    // TODO(atulvasu): Detach stack here to prevent recursion issues.
    me.runNext();
  }, opt_pos);
};
pagespeed.DeferJs.prototype['addStr'] = pagespeed.DeferJs.prototype.addStr;

/**
 * Defers execution of contents of 'url'.
 * @param {!string} url returns javascript when fetched.
 * @param {Element} script_elem Psa inserted script used as context element.
 * @param {number} opt_pos Optional position for ordering.
 */
pagespeed.DeferJs.prototype.addUrl = function(url, script_elem, opt_pos) {
  this.logs.push('Add to queue url: ' + url);
  var me = this; // capture closure.
  this.submitTask(function() {
    me.currentElem_ = script_elem;
    me.removeNotProcessedAttributeTillNode(script_elem);

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    if (pagespeed.DeferJs.isExperimentalMode) {
      // If a script node with src also has a node inside it
      // (as innerHTML etc.), we simply create an equivalent text node so
      // that the DOM remains the same. Note that we do not try to execute
      // the contents of this node.
      var str = script_elem.innerHTML ||
                script_elem.textContent ||
                script_elem.data;
      if (str) {
        script.appendChild(document.createTextNode(str));
      }
    }

    var runNextHandler = function() {
      me.log('Executed: ' + url);
      me.runNext();
    };
    pagespeed.addOnload(script, runNextHandler);
    pagespeed.addHandler(script, 'error', runNextHandler);
    if (me.getIEVersion() < 9) {
      var stateChangeHandler = function() {
        if (script.readyState == 'complete' ||
            script.readyState == 'loaded') {
          script.onreadystatechange = null;
          runNextHandler();
        }
      }

      pagespeed.addHandler(script, 'readystatechange', stateChangeHandler);
    }
    script.setAttribute('src', url);
    me.currentElem_.parentNode.insertBefore(script, me.currentElem_);
  }, opt_pos);
};
pagespeed.DeferJs.prototype['addUrl'] = pagespeed.DeferJs.prototype.addUrl;

/**
 * Remove 'psa_not_processed' attribute till the given node.
 * @param {Node} opt_node Stop node.
 */
pagespeed.DeferJs.prototype.removeNotProcessedAttributeTillNode = function(
    opt_node) {
  if (!pagespeed.DeferJs.isExperimentalMode) {
    return;
  }
  if (document.querySelectorAll && !(this.getIEVersion() <= 8)) {
    var nodes = document.querySelectorAll(
        '[' + pagespeed.DeferJs.PSA_NOT_PROCESSED + ']');
    for (var i = 0; i < nodes.length; i++) {
      var dom_node = nodes.item(i);
      if (dom_node == opt_node) {
        return;
      }
      if (dom_node.getAttribute('type') != 'text/psajs') {
        dom_node.removeAttribute(pagespeed.DeferJs.PSA_NOT_PROCESSED);
      }
    }
  }
};

/**
 * Set 'psa_not_processed' attribute to all Nodes in DOM.
 */
pagespeed.DeferJs.prototype.setNotProcessedAttributeForNodes = function() {
  if (!pagespeed.DeferJs.isExperimentalMode) {
    return;
  }
  var nodes = this.origGetElementsByTagName_.call(document, '*');
  for (var i = 0; i < nodes.length; i++) {
    var dom_node = nodes.item(i);
    dom_node.setAttribute(pagespeed.DeferJs.PSA_NOT_PROCESSED, '');
  }
};

/**
 * Called when the script Queue execution is finished.
 */
pagespeed.DeferJs.prototype.onComplete = function() {
  this.removeNotProcessedAttributeTillNode();
  if (this.getIEVersion() && document.documentElement['originalDoScroll']) {
    document.documentElement.doScroll =
        document.documentElement['originalDoScroll'];
  }
  if (Object.defineProperty) {
    // Delete document.readyState so that browser can restore it.
    delete document['readyState'];
  }

  if (pagespeed.DeferJs.isExperimentalMode) {
    document.getElementById = this.origGetElementById_;

    if (document.querySelectorAll && !(this.getIEVersion() <= 8)) {
      document.getElementsByTagName = this.origGetElementsByTagName_;
    }
  }
  // TODO(ksimbili): Restore the handlers in a clean way.
  if (document.originalAddEventListener) {
    document.addEventListener = document.originalAddEventListener;
    window.addEventListener = window.originalAddEventListener;
  } else if (document.originalAttachEvent) {
    document.attachEvent = document.originalAttachEvent;
    window.attachEvent = window.originalAttachEvent;
  }

  this.executeDomReady();
  this.executeOnload();

  this.state_ = pagespeed.DeferJs.STATES.SCRIPTS_DONE;
  this.executeAfterDeferRun();
}

/**
 * Schedules the next task in the queue.
 */
pagespeed.DeferJs.prototype.runNext = function() {
  this.handlePendingDocumentWrites();
  if (this.next_ < this.queue_.length) {
    // Done here to prevent another _run_next() in stack from
    // seeing the same value of next, and get into infinite
    // loop.
    this.next_++;
    this.queue_[this.next_ - 1].call(window);
  } else {
    this.onComplete();
  }
};

/**
 * Converts from NodeList to array of nodes.
 * @param {!NodeList} nodeList NodeList from a DOM node.
 * @return {!Array.<Node>} Array of nodes returned.
 */
pagespeed.DeferJs.prototype.nodeListToArray = function(nodeList) {
  var arr = [];
  var len = nodeList.length;
  for (var i = 0; i < len; ++i) {
    arr.push(nodeList.item(i));
  }
  return arr;
};

/**
 * SetUp needed before deferrred scripts execution.
 */
pagespeed.DeferJs.prototype.setUp = function() {
  this.setNotProcessedAttributeForNodes();

  if (Object.defineProperty) {
    try {
      // Shadow document.readyState
      var propertyDescriptor = { configurable: true };
      propertyDescriptor.get = function() { return 'loading';}
      Object.defineProperty(document, 'readyState', propertyDescriptor);
    } catch (err) {
      this.log('Exception while overriding document.readyState.', err);
    }
  }
  if (this.getIEVersion()) {
    // In IE another approach for identifying DOMContentLoaded is popularly
    // used. It is described in http://javascript.nwbox.com/IEContentLoaded/ .
    // And JQuery is one of the libraries which employs this strategy.
    document.documentElement['originalDoScroll'] =
        document.documentElement.doScroll;
    document.documentElement.doScroll = function() { throw ('psa exception');};
  }
  // override AddEventListeners.
  this.overrideAddEventListener(document);
  this.overrideAddEventListener(window);

  // TODO(atulvasu): Remove this once context is not optional.
  // Place where document.write() happens if there is no context element
  // present. Happens if there is no context registering that happened in
  // registerNoScriptTags.
  var initialContextNode = document.createElement('span');
  initialContextNode.setAttribute('psa_dw_target', 'true');
  document.body.appendChild(initialContextNode);
  this.currentElem_ = initialContextNode;
  if (this.getIEVersion()) {
    this.createIdVars();
  }
};

/**
 * Starts the execution of all the deferred scripts.
 */
pagespeed.DeferJs.prototype.run = function() {
  if (this.state_ >= pagespeed.DeferJs.STATES.SCRIPTS_EXECUTING) {
    return;
  }
  this.executeBeforeDeferRun();
  this.state_ = pagespeed.DeferJs.STATES.SCRIPTS_EXECUTING;
  this.setUp();
  // Starts executing the defer_js closures.
  this.runNext();
};
pagespeed.DeferJs.prototype['run'] = pagespeed.DeferJs.prototype.run;

/**
 * Parses the given html snippet.
 * @param {!string} html to be parsed.
 * @return {!Node} returns a DIV containing parsed nodes as children.
 */
pagespeed.DeferJs.prototype.parseHtml = function(html) {
  var div = document.createElement('div');
  // IE HACK -- Two options.
  // 1) Either add a dummy character at the start and delete it after parsing.
  // 2) Add some non-empty node infront of html.
  div.innerHTML = '<div>_</div>' + html;
  div.removeChild(div.firstChild);
  return div;
};

/**
 * Removes the node from its parent if it has one.
 * @param {Node} node Node to be disowned from parent.
 */
pagespeed.DeferJs.prototype.disown = function(node) {
  var parentNode = node.parentNode;
  if (parentNode) {
    parentNode.removeChild(node);
  }
};

/**
 * Inserts all the nodes before elem. It must have a parentNode for this
 * operation to succeed. (either actually inserted in DOM)
 * @param {!NodeList} nodes to insert.
 * @param {!Node} elem context element.
 */
pagespeed.DeferJs.prototype.insertNodesBeforeElem = function(nodes, elem) {
  var nodeArray = this.nodeListToArray(nodes);
  var len = nodeArray.length;
  var parentNode = elem.parentNode;
  for (var i = 0; i < len; ++i) {
    var node = nodeArray[i];
    this.disown(node);
    parentNode.insertBefore(node, elem);
  }
};

/**
 * Returns if the node is JavaScript Node.
 * @param {!Node} node valid script Node.
 * @return {boolean} true if script node is javascript node.
 */
pagespeed.DeferJs.prototype.isJSNode = function(node) {
  if (node.nodeName != 'SCRIPT') {
    return false;
  }

  if (node.hasAttribute('type')) {
      var type = node.getAttribute('type');
      return !type ||
             (this.jsMimeTypes.indexOf(type) != -1);
  } else if (node.hasAttribute('language')) {
      var lang = node.getAttribute('language');
      return !lang ||
             (this.jsMimeTypes.indexOf('text/' + lang.toLowerCase()) != -1);
  }
  return true;
};

/**
 * Given the list of nodes, separates into script nodes and regular nodes.
 * @param {!Node} node starting node for DFS.
 * @param {!Array.<Element>} scriptNodes array of script elements (output).
 */
pagespeed.DeferJs.prototype.extractScriptNodes = function(node, scriptNodes) {
  if (!node.childNodes) {
    return;
  }
  var nodeArray = this.nodeListToArray(node.childNodes);
  var len = nodeArray.length;
  for (var i = 0; i < len; ++i) {
    var child = nodeArray[i];
    if (child.nodeName == 'SCRIPT') {
      if (this.isJSNode(child)) {
        scriptNodes.push(child);
        if (pagespeed.DeferJs.isExperimentalMode) {
          child.setAttribute(pagespeed.DeferJs.PSA_NOT_PROCESSED, '');
        }
        child.setAttribute('orig_type', child.type);
        child.setAttribute('type', 'text/psajs');
        child.setAttribute('orig_src', child.src);
        child.setAttribute('src', '');
      }
    } else {
      this.extractScriptNodes(child, scriptNodes);
    }
  }
};

/**
 * @param {!Array.<Element>} scripts Array of script nodes to be deferred.
 * @param {!number} pos position for script ordering.
 */
pagespeed.DeferJs.prototype.deferScripts = function(scripts, pos) {
  var len = scripts.length;
  for (var i = 0; i < len; ++i) {
    this.addNode(scripts[i], pos + i);
  }
};

/**
 * Inserts html in the before elem, with scripts inside added to queue at pos.
 * @param {!string} html contains the snippet.
 * @param {!number} pos optional position to add to queue.
 * @param {Element} opt_elem optional context element.
 */
pagespeed.DeferJs.prototype.insertHtml = function(html, pos, opt_elem) {
  // Parse the html.
  var node = this.parseHtml(html);

  // Extract script nodes out for deferring them.
  var scriptNodes = [];
  this.extractScriptNodes(node, scriptNodes);

  // Add non-script nodes before elem
  if (opt_elem) {
    this.insertNodesBeforeElem(node.childNodes, opt_elem);
  } else {
    this.log('Unable to insert nodes, no context element found');
  }

  // Add script nodes for deferring.
  this.deferScripts(scriptNodes, pos);
};

/**
 * Renders the document.write() buffer before the context
 * element.
 */
pagespeed.DeferJs.prototype.handlePendingDocumentWrites = function() {
  if (this.documentWriteHtml_ == '') {
    return;
  }
  this.log('handle_dw: ' + this.documentWriteHtml_);

  var html = this.documentWriteHtml_;
  // Reset early because insertHtml may internally end up calling this function
  // recursively.
  this.documentWriteHtml_ = '';

  this.insertHtml(html, this.next_, this.currentElem_);
};

/**
 * Writes html like document.write to the current context item.
 * @param {string} html Html to be written before current context elem.
 */
pagespeed.DeferJs.prototype.writeHtml = function(html) {
  this.log('dw: ' + html);
  this.documentWriteHtml_ += html;
};

/**
 * Adds DOMContentLoaded event listeners to our own list and called them later.
 * @param {!Element} elem Element on which listener to be called.
 * @param {!function()} func domReady listener.
 */
pagespeed.DeferJs.prototype.addDomReadyListeners = function(elem, func) {
  this.log('domready: ' + func.toString());
  this.domReadyListeners_.push(function() {
    func.call(elem);
  });
};

/**
 * Adds page onload event listeners to our own list and called them later.
 * @param {!Element} elem Element on which listener to be called.
 * @param {!function()} func onload listener.
 */
pagespeed.DeferJs.prototype.addOnloadListeners = function(elem, func) {
  this.log('onload: ' + func.toString());
  if (this.state_ == pagespeed.DeferJs.STATES.SCRIPTS_DONE) {
    func.call(elem);
    return;
  }
  this.onloadListeners_.push(function() {
    func.call(elem);
  });
};
pagespeed.DeferJs.prototype['addOnloadListeners'] =
    pagespeed.DeferJs.prototype.addOnloadListeners;

/**
 * Adds functions that run as the first thing in run().
 * @param {!function()} func onload listener.
 */
pagespeed.DeferJs.prototype.addBeforeDeferRunFunctions = function(func) {
  this.beforeDeferRunFunctions_.push(func);
};
pagespeed.DeferJs.prototype['addBeforeDeferRunFunctions'] =
    pagespeed.DeferJs.prototype.addBeforeDeferRunFunctions;

/**
 * Adds functions that run after all the deferred scripts, DOM ready listeners
 * and onload listeners have run.
 * @param {!function()} func onload listener.
 */
pagespeed.DeferJs.prototype.addAfterDeferRunFunctions = function(func) {
  this.afterDeferRunFunctions_.push(func);
};
pagespeed.DeferJs.prototype['addAfterDeferRunFunctions'] =
    pagespeed.DeferJs.prototype.addAfterDeferRunFunctions;

/**
 * Execute all handlers registered for DOMContentLoaded/onreadystatechange.
 */
pagespeed.DeferJs.prototype.executeDomReady = function() {
  for (var i = 0; i < this.domReadyListeners_.length; i++) {
    this.log('executing domready: ' + this.domReadyListeners_[i].toString());
    this.domReadyListeners_[i].call(window);
  }
  if (document.onreadystatechange) {
    document.onreadystatechange();
  }
};

/**
 * Execute all handlers registered for element onload.
 */
pagespeed.DeferJs.prototype.executeOnload = function() {
  for (var i = 0; i < this.onloadListeners_.length; i++) {
    this.log('executing pageload: ' + this.onloadListeners_[i].toString());
    this.onloadListeners_[i].call();
  }
};

/**
 * Execute all functions to be executed as the first thing in run().
 */
pagespeed.DeferJs.prototype.executeBeforeDeferRun = function() {
  for (var i = 0; i < this.beforeDeferRunFunctions_.length; i++) {
    this.beforeDeferRunFunctions_[i].call(window);
  }
};

/**
 * Execute all functions to be executed after all the deferred scripts, DOM
 * ready listeners and onload listeners have run.
 */
pagespeed.DeferJs.prototype.executeAfterDeferRun = function() {
  for (var i = 0; i < this.afterDeferRunFunctions_.length; i++) {
    this.afterDeferRunFunctions_[i].call(window);
  }
};

/**
 * Adds the function to list of listeners based on event.
 * TODO(ksimbili): Store 'this' and call func on 'this'.
 * @param {Window|Element|Document} elem Element on which event is registered.
 * @param {!string} eventName Name of the event.
 * @param {!function()} func handler getting registered.
 * @param {Boolean} capture Capture event.
 */
var psaAddEventListener = function(elem, eventName, func, capture) {
  if (eventName == 'DOMContentLoaded' || eventName == 'readystatechange') {
    pagespeed.deferJs.addDomReadyListeners(elem, func);
    return;
  }
  if (eventName == 'load') {
    pagespeed.deferJs.addOnloadListeners(elem, func);
    return;
  }
  elem.originalAddEventListener(eventName, func, capture);
};

/**
 * Adds the function to list of listeners based on event.
 * TODO(ksimbili): Store 'this' and call func on 'this'.
 * @param {Window|Element|Document} elem Element on which event is registered.
 * @param {!string} eventName Name of the event.
 * @param {!function()} func handler getting registered.
 */
var psaAttachEvent = function(elem, eventName, func) {
  if (eventName == 'onDOMContentLoaded' || eventName == 'onreadystatechange') {
    pagespeed.deferJs.addDomReadyListeners(elem, func);
    return;
  }
  if (eventName == 'onload') {
    pagespeed.deferJs.addOnloadListeners(elem, func);
    return;
  }
  elem.originalAttachEvent(eventName, func);
};

/**
 * Override addEventListener/attachEvent of Element.
 * @param {Window|Element|Document} elem Element whose handler to be overriden.
 */
pagespeed.DeferJs.prototype.overrideAddEventListener = function(elem) {
  if (elem.addEventListener && !elem.originalAddEventListener) {
    elem.originalAddEventListener = elem.addEventListener;
    elem.addEventListener = function (eventName, func, capture) {
      psaAddEventListener(elem, eventName, func, capture);
    };
  } else if (elem.attachEvent && !elem.originalAttachEvent) {
    elem.originalAttachEvent = elem.attachEvent;
    elem.attachEvent = function (eventName, func) {
      psaAttachEvent(elem, eventName, func);
    };
  }
};

/**
 * Registers all script tags which are marked text/psajs, by adding themselves
 * as the context element to the script embedded inside them.
 */
pagespeed.DeferJs.prototype.registerScriptTags = function() {
  if (this.state_ >= pagespeed.DeferJs.STATES.SCRIPTS_REGISTERED) {
    return;
  }
  this.state_ = pagespeed.DeferJs.STATES.SCRIPTS_REGISTERED;
  var scripts = document.getElementsByTagName('script');
  var len = scripts.length;
  for (var i = 0; i < len; ++i) {
    var script = scripts[i];
    // TODO(atulvasu): Use orig_type
    // TODO(ksimbili): Remove these script nodes from DOM.
    if (script.getAttribute('type') == 'text/psajs') {
      this.addNode(script);
    }
  }
};
pagespeed.DeferJs.prototype['registerScriptTags'] =
    pagespeed.DeferJs.prototype.registerScriptTags;

/**
 * Runs the function when element is loaded.
 * @param {Window|Element} elem Element to attach handler.
 * @param {!function()} func New onload handler.
 */
pagespeed.addOnload = function(elem, func) {
  pagespeed.addHandler(elem, 'load', func);
};
pagespeed['addOnload'] = pagespeed.addOnload;

/**
 * Runs the function when event is triggered.
 * @param {Window|Element} elem Element to attach handler.
 * @param {!string} eventName Name of the event.
 * @param {!function()} func New onload handler.
 */
pagespeed.addHandler = function(elem, eventName, func) {
  if (elem.addEventListener) {
    elem.addEventListener(eventName, func, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + eventName, func);
  } else {
    var oldHandler = elem['on' + eventName];
    elem['on' + eventName] = function() {
      func.call(this);
      if (oldHandler) {
        oldHandler.call(this);
      }
    }
  }
};
pagespeed['addHandler'] = pagespeed.addHandler;

/**
 * Returns the outerHTML of node in a browser independent fashion.
 * @param {!Element} node whose outerHTML is computed.
 * @return {string} html.
 */
pagespeed.outerHTML = function(node) {
  return node.outerHTML || new XMLSerializer().serializeToString(node);
};

/**
 * Returns true if browser is Firefox.
 */
pagespeed.DeferJs.prototype.isFireFox = function() {
  return (navigator.userAgent.indexOf("Firefox") != -1);
};

/**
 * Returns version number if browser is IE.
 */
pagespeed.DeferJs.prototype.getIEVersion = function() {
  var version = /(?:MSIE.(\d+\.\d+))/.exec(navigator.userAgent);
  return (version && version[1]) ?
         (document.documentMode || parseFloat(version[1])) :
         NaN;
};

/**
 * Initialize defer javascript.
 */
pagespeed.deferInit = function() {
  if (pagespeed.deferJs) {
    return;
  }

  if (window.localStorage) {
    pagespeed.DeferJs.isExperimentalMode =
        window.localStorage['defer_js_experimental'];
  }

  pagespeed.deferJs = new pagespeed.DeferJs();
  pagespeed['deferJs'] = pagespeed.deferJs;
  // TODO(ksimbili): Restore the following functions to their original.
  document.writeln = function(x) {
    pagespeed.deferJs.writeHtml(x + '\n');
  };
  document.write = function(x) {
    pagespeed.deferJs.writeHtml(x);
  };
  if (!window.localStorage['psa_disable_override_doc_open'] &&
          !window.localStorage['psa_disable_override_doc_open_debug']) {
    document.open = function() {};
    document.close = function() {};
  }

  if (pagespeed.DeferJs.isExperimentalMode) {
    document.getElementById = function(str) {
      pagespeed.deferJs.handlePendingDocumentWrites();
      return pagespeed.deferJs.origGetElementById_.call(document, str);
    }

    if (document.querySelectorAll && !(pagespeed.deferJs.getIEVersion() <= 8)) {
      // TODO(ksimbili): Support IE8
      document.getElementsByTagName = function(tagName) {
          return document.querySelectorAll(
              tagName + ':not([' + pagespeed.DeferJs.PSA_NOT_PROCESSED + '])');
      }
    }
  }
};
pagespeed['deferInit'] = pagespeed.deferInit;
