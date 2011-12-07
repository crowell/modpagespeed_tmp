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
};

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
 * Defers execution of 'str', by adding it to the queue.
 * @param {!string} str valid javascript snippet.
 * @param {Element} opt_elem Optional context element.
 * @param {number} opt_pos Optional position for ordering.
 */
pagespeed.DeferJs.prototype.addStr = function(str, opt_elem, opt_pos) {
  this.logs.push('Add to queue str: ' + str);
  var me = this; // capture closure.
  this.submitTask(function() {
    if (opt_elem) {
      me.currentElem_ = opt_elem;
    }
    try {
      window.eval(str);
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
 * @param {Element} opt_elem Optional context element.
 * @param {number} opt_pos Optional position for ordering.
 */
pagespeed.DeferJs.prototype.addUrl = function(url, opt_elem, opt_pos) {
  this.logs.push('Add to queue url: ' + url);
  var me = this; // capture closure.
  this.submitTask(function() {
    if (opt_elem) {
      me.currentElem_ = opt_elem;
    }
    var script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('type', 'text/javascript');
    var runNextHandler = function() {
      me.log('Executed: ' + url);
      me.runNext();
    };
    pagespeed.addOnload(script, runNextHandler);
    pagespeed.addHandler(script, 'error', runNextHandler);
    me.currentElem_.parentNode.insertBefore(script, me.currentElem_);
  }, opt_pos);
};
pagespeed.DeferJs.prototype['addUrl'] = pagespeed.DeferJs.prototype.addUrl;

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
 * Starts the execution of all the deferred scripts.
 */
pagespeed.DeferJs.prototype.run = function() {
  // TODO(atulvasu): Remove this once context is not optional.
  // Place where document.write() happens if there is no context element
  // present. Happens if there is no context registering that happened in
  // registerNoScriptTags.
  var initialContextNode = document.createElement('span');
  initialContextNode.setAttribute('psa_dw_target', 'true');
  document.body.appendChild(initialContextNode);
  this.currentElem_ = initialContextNode;

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
  div.innerHTML = html;
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
      scriptNodes.push(child);
      this.disown(child);
    } else {
      this.extractScriptNodes(child, scriptNodes);
    }
  }
};

/**
 * @param {!Array.<Element>} scripts Array of script nodes to be deferred.
 * @param {!number} pos position for script ordering.
 * @param {Element} opt_elem Optional context element.
 */
pagespeed.DeferJs.prototype.deferScripts = function(scripts, pos, opt_elem) {
  var len = scripts.length;
  for (var i = 0; i < len; ++i) {
    var script = scripts[i];
    var src = script.getAttribute('src');
    if (src) {
      this.addUrl(src, opt_elem, pos + i);
    } else {
       this.addStr(script.textContent, opt_elem, pos + i);
    }
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
  this.deferScripts(scriptNodes, pos, opt_elem);
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
 * Registers all non-script tags, by adding themselves as the context element
 * to the scripts embedded inside them.
 */
pagespeed.DeferJs.prototype.registerNoScriptTags = function() {
  var noscripts = document.getElementsByTagName('noscript');
  var len = noscripts.length;
  for (var i = 0; i < len; ++i) {
    var noscript = noscripts[i];
    if (noscript.getAttribute('psa_disabled') == 'true') {
      var html = '';
      for (var j = 0; j < noscript.childNodes.length; j++) {
        var node = noscript.childNodes[j];
        if (node.nodeType == node.TEXT_NODE) {
          html += node.textContent;
        } else {
          // TODO(atulvasu): If browser already parsed, then we can
          // actually directly call deferScripts() instead, but since this
          // is a non-deterministic one off case, not optimizing to keep the
          // flow clear.
          html += pagespeed.outerHTML(node);
          this.log('browser parsed contents of noscript');
        }
      }
      this.insertHtml(html, this.queue_.length, noscript);
    }
  }
};
pagespeed.DeferJs.prototype['registerNoScriptTags'] =
    pagespeed.DeferJs.prototype.registerNoScriptTags;

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
 * Initialize defer javascript.
 */
pagespeed.deferInit = function() {
  pagespeed.deferJs = new pagespeed.DeferJs();
  pagespeed['deferJs'] = pagespeed.deferJs;
  document.writeln = function(x) {
    pagespeed.deferJs.writeHtml(x + '\n');
  };
  document.write = function(x) {
    pagespeed.deferJs.writeHtml(x);
  };
};
pagespeed['deferInit'] = pagespeed.deferInit;

