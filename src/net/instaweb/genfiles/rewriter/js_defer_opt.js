(function(){function f(a,b,c){if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent)a.attachEvent("on"+b,c);else{var d=a["on"+b];a["on"+b]=function(){c.call(this);d&&d.call(this)}}};window.pagespeed=window.pagespeed||{};var h=window.pagespeed;h.deferJsNs={};var l=h.deferJsNs;
function m(){this.l=[];this.i=[];this.o=this.j=0;this.p=[];this.g="";this.m={};this.D="application/ecmascript application/javascript application/x-ecmascript application/x-javascript text/ecmascript text/javascript text/javascript1.0 text/javascript1.1 text/javascript1.2 text/javascript1.3 text/javascript1.4 text/javascript1.5 text/jscript text/livescript text/x-ecmascript text/x-javascript".split(" ");this.d=!0;this.K=document.getElementById;this.w=document.getElementsByTagName;this.J=document.write;
this.I=document.open;this.H=document.close;this.F=document.addEventListener;this.L=window.addEventListener;this.G=document.attachEvent;this.M=window.attachEvent;this.k=document.createElement;this.a=n;this.t=p;this.h=this.v=!0;this.c=null;this.q=0;this.r=[];this.b=this.e="";this.s=-1}var q=!1,n=0,p=0;m.prototype.log=function(a,b){this.i&&(this.i.push(""+a),b&&(this.i.push(b),"undefined"!=typeof console&&"undefined"!=typeof console.log&&console.log("PSA ERROR: "+a+b.message)))};
function t(a,b,c){a.l.splice(c?c:a.l.length,0,b)}function u(a,b,c){c=v(a,c);c.text=b;c.setAttribute("type","text/javascript");a=w(a);a.parentNode.insertBefore(c,a);return c}
function x(a){for(var b=document.getElementsByTagName("*"),c="",d=0;d<b.length;d++)if(b[d].hasAttribute("id")){var e=b[d].getAttribute("id");if(e&&-1==e.search(/[-:.]/)&&-1==e.search(/^[0-9]/))try{window[e]&&window[e].tagName&&(c+="var "+e+'=document.getElementById("'+e+'");')}catch(g){a.log("Exception while evaluating.",g)}}c&&(a=u(a,c),a.setAttribute("psa_not_processed",""),a.setAttribute("priority_psa_not_processed",""))}
function y(a,b,c,d){var e=b.getAttribute("pagespeed_orig_src")||b.getAttribute("src");e?(d&&-1!=navigator.userAgent.indexOf("AppleWebKit")&&((new Image).src=e),a.u(e,b,c)):a.C(b.innerHTML||b.textContent||b.data||"",b,c)}
m.prototype.C=function(a,b,c){if(-1!=navigator.userAgent.indexOf("Firefox"))this.u("data:text/javascript,"+encodeURIComponent(a),b,c);else{this.i.push("Add to queue str: "+a);var d=this;t(this,function(){z(d,b);A(d).setAttribute("psa_current_node","");try{u(d,a,b)}catch(c){d.log("Exception while evaluating.",c)}d.log("Evaluated: "+a);B(d)},c)}};m.prototype.addStr=m.prototype.C;
function v(a,b){var c=a.k.call(document,"script");if(b)for(var d=b.attributes,e=d.length-1;0<=e;--e)"type"!=d[e].name&&"src"!=d[e].name&&"async"!=d[e].name&&"defer"!=d[e].name&&"pagespeed_orig_type"!=d[e].name&&"pagespeed_orig_src"!=d[e].name&&"orig_index"!=d[e].name&&"psa_current_node"!=d[e].name&&d[e].name!=a.b&&(c.setAttribute(d[e].name,d[e].value),b.removeAttribute(d[e].name));return c}
function D(a,b){function c(){if(document.querySelector){var c=document.querySelector("[psa_to_be_deleted]");c&&c.parentNode.removeChild(c)}a.log("Executed: "+b);B(a)}var d=a.k.call(document,"script");d.setAttribute("type","text/javascript");d.async=!1;d.setAttribute("psa_to_be_deleted","");d.setAttribute("psa_not_processed","");d.setAttribute("priority_psa_not_processed","");l.f(d,c);f(d,"error",c);d.src="data:text/javascript,"+encodeURIComponent("window.pagespeed.psatemp=0;");var e=w(a);e.parentNode.insertBefore(d,
e)}
m.prototype.u=function(a,b,c){this.i.push("Add to queue url: "+a);var d=this;t(this,function(){z(d,b);var c=v(d,b);c.setAttribute("type","text/javascript");var g=!0;"async"in c?c.async=!1:c.readyState&&(g=!1,f(c,"readystatechange",function(){if("complete"==c.readyState||"loaded"==c.readyState)c.onreadystatechange=null,d.log("Executed: "+a),B(d)}));c.setAttribute("src",a);var k=b.innerHTML||b.textContent||b.data;k&&c.appendChild(document.createTextNode(k));k=A(d);k.setAttribute("psa_current_node","");
k.parentNode.insertBefore(c,k);g&&D(d,a)},c)};m.prototype.addUrl=m.prototype.u;function z(a,b){if(document.querySelectorAll&&!(8>=E()))for(var c=document.querySelectorAll("["+a.b+"]"),d=0;d<c.length;d++){var e=c.item(d);if(e==b)break;e.getAttribute("type")!=a.e&&e.removeAttribute(a.b)}}function F(a){for(var b=a.w.call(document,"*"),c=0;c<b.length;c++)b.item(c).setAttribute(a.b,"")}function A(a){var b=null;document.querySelector&&(b=document.querySelector('[type="'+a.e+'"]'));return b}
function w(a){var b;document.querySelector&&(b=document.querySelector("[psa_current_node]"));return b||a.w.call(document,"psanode")[0]}
function G(a){5<=a.a||(a.h&&H(a)&&(E()&&document.documentElement.originalDoScroll&&(document.documentElement.doScroll=document.documentElement.originalDoScroll),Object.defineProperty&&delete document.readyState,E()&&Object.defineProperty&&delete document.all),a.d=!1,a.h?(a.a=5,H(a)?"complete"!=document.readyState?l.f(window,function(){I(a)}):(document.onreadystatechange&&J(a,document.onreadystatechange,document),window.onload&&(K(window,"onload",window.onload),window.onload=null),I(a)):L(a)):(a.a=
1,a.v=!1,a.c&&H(a)?(h.deferJs=h.highPriorityDeferJs,h.deferJs=h.highPriorityDeferJs,J(a,a.c),a.c=null):L(a)))}
function I(a){if(H(a)){var b;document.querySelectorAll&&(b=document.querySelectorAll("[data-pagespeed-onload][data-pagespeed-loaded]"));for(var c=0;c<b.length;c++){var d=b.item(c),e="var psaFunc=function() {"+d.getAttribute("data-pagespeed-onload")+"};";window.eval.call(window,e);"function"!=typeof window.psaFunc?a.log("Function is not defined",Error("")):K(d,"onload",window.psaFunc)}I(h.highPriorityDeferJs)}M(a,3);if(H(a)){c=document.body.getElementsByTagName("psanode");for(b=c.length-1;0<=b;b--)document.body.removeChild(c[b]);
c=document.body.getElementsByClassName("psa_prefetch_container");for(b=c.length-1;0<=b;b--)c[b].parentNode.removeChild(c[b])}a.a=6;M(a,4)}function L(a){window.setTimeout(function(){h.deferJs=h.lowPriorityDeferJs;h.deferJs=h.lowPriorityDeferJs;a.c?(h.deferJs.registerScriptTags(a.c,a.s),a.c=null):h.deferJs.registerScriptTags();h.deferJs.n()},0)}
function N(a){for(var b=0,c=a.length,d=0;d<c;++d){var e=a[d],g=e.parentNode,k=e.src,r=e.textContent;if(!(g=8<E()&&(!g||""==k&&""==r))){if(!(g=E())){a:{for(;e=e.parentNode;)if(e==document){e=!0;break a}e=!1}g=e&&""!=k}g=!g}g&&b++}return b}function O(a){if(4!=a.a)return!1;var b=0;0!=a.o&&(b=N(a.p));return a.o==b?!0:!1}m.prototype.N=function(){return 6===this.a};m.prototype.scriptsAreDone=m.prototype.N;
function B(a){Q(a);var b=w(a);"SCRIPT"==b.nodeName&&b.parentNode.removeChild(b);a.j<a.l.length?(a.j++,a.l[a.j-1].call(window)):a.h?(a.a=4,z(a),M(a,2),O(a)&&G(a)):G(a)}function R(a){for(var b=[],c=a.length,d=0;d<c;++d)b.push(a.item(d));return b}
function S(a){if(a.v&&!H(a)){var b=document.createElement("psanode");b.setAttribute("psa_dw_target","true");document.body.appendChild(b);E()&&x(a);if(Object.defineProperty)try{var c={configurable:!0,get:function(){return 4<=a.a?"interactive":"loading"}};Object.defineProperty(document,"readyState",c)}catch(d){a.log("Exception while overriding document.readyState.",d)}if(E()&&(document.documentElement.originalDoScroll=document.documentElement.doScroll,document.documentElement.doScroll=function(){throw"psa exception";
},Object.defineProperty))try{c={configurable:!0,get:function(){}},Object.defineProperty(document,"all",c)}catch(e){a.log("Exception while overriding document.all.",e)}}T(a);document.writeln=function(b){U(a,b+"\n")};document.write=function(b){U(a,b)};document.open=function(){a.d||a.I.call(document)};document.close=function(){a.d||a.H.call(document)};document.getElementById=function(b){Q(a);b=a.K.call(document,b);return null==b||b.hasAttribute(a.b)?null:b};!document.querySelectorAll||8>=E()||(document.getElementsByTagName=
function(b){if(a.d)try{return document.querySelectorAll(b+":not(["+a.b+"])")}catch(c){}return a.w.call(document,b)});document.createElement=function(b){var c=a.k.call(document,b);a.d&&"script"==b.toLowerCase()&&(a.p.push(c),a.o++,b=function(){a.o--;var b=a.p.indexOf(this);-1!=b&&(a.p.splice(b,1),O(a)&&G(a))},l.f(c,b),f(c,"error",b));return c}}m.prototype.n=function(){if(2==this.a){var a=0;0!=this.q&&(a=N(this.r));this.q==a&&this.run()}};m.prototype.execute=m.prototype.n;
m.prototype.run=function(){2==this.a&&(this.v&&M(this,1),this.a=3,S(this),B(this))};m.prototype.run=m.prototype.run;function V(a,b){if("SCRIPT"!=b.nodeName)return!1;if(b.hasAttribute("type")){var c=b.getAttribute("type");return!c||-1!=a.D.indexOf(c)}return b.hasAttribute("language")?(c=b.getAttribute("language"),!c||-1!=a.D.indexOf("text/"+c.toLowerCase())):!0}
function W(a,b,c){if(b.childNodes){b=R(b.childNodes);for(var d=b.length,e=0;e<d;++e){var g=b[e];"SCRIPT"==g.nodeName?V(a,g)&&(c.push(g),g.setAttribute("pagespeed_orig_type",g.type),g.setAttribute("type",a.e),g.setAttribute("pagespeed_orig_src",g.src),g.setAttribute("src",""),g.setAttribute(a.b,"")):W(a,g,c)}}}
function Q(a){if(""!=a.g){a.log("handle_dw: "+a.g);var b=a.g;a.g="";var c=w(a),d=a.j,e=a.k.call(document,"div");e.innerHTML="<div>_</div>"+b;e.removeChild(e.firstChild);b=[];W(a,e,b);if(c)for(var e=R(e.childNodes),g=e.length,k=c.parentNode,r=0;r<g;++r){var C=e[r],P=C.parentNode;P&&P.removeChild(C);k.insertBefore(C,c)}else a.log("Unable to insert nodes, no context element found");c=b.length;for(e=0;e<c;++e)y(a,b[e],d+e,!!e)}}function U(a,b){a.d?(a.log("dw: "+b),a.g+=b):a.J.call(document,b)}
m.prototype.Q=function(a){K(window,"onbeforescripts",a)};m.prototype.addBeforeDeferRunFunctions=m.prototype.Q;m.prototype.P=function(a){K(window,"onafterscripts",a)};m.prototype.addAfterDeferRunFunctions=m.prototype.P;function M(a,b){a.t=b;a.log("Firing Event: "+b);for(var c=a.m[b]||[],d=0;d<c.length;++d)J(a,c[d]);c.length=0}function J(a,b,c){try{b.call(c||window)}catch(d){a.log("Exception while evaluating.",d)}}
function T(a){window.addEventListener?(document.addEventListener=function(b,c,d){K(document,b,c,a.F,d)},window.addEventListener=function(b,c,d){K(window,b,c,a.L,d)}):window.attachEvent&&(document.attachEvent=function(b,c){K(document,b,c,a.G)},window.attachEvent=function(b,c){K(window,b,c,a.M)})}
function K(a,b,c,d,e){var g=h.deferJs;if(5<=g.a){if(d){d.call(a,b,c,e);return}if(6<=g.a)return}var k;if(2>g.t&&("DOMContentLoaded"==b||"readystatechange"==b||"onDOMContentLoaded"==b||"onreadystatechange"==b))b=2,k="DOMContentLoaded";else if(3>g.t&&("load"==b||"onload"==b))b=3,k="load";else if("onbeforescripts"==b)b=1;else if("onafterscripts"==b)b=4;else{d&&d.call(a,b,c,e);return}g.m[b]||(g.m[b]=[]);g.m[b].push(function(){var b={bubbles:!1,cancelable:!1,eventPhase:2};b.timeStamp=(new Date).getTime();
b.type=k;b.target=a!=window?a:document;b.currentTarget=a;c.call(a,b)})}
m.prototype.registerScriptTags=function(a,b){if(!(2<=this.a)){if(a){if(!q){a();return}this.h=!1;this.c=a;b&&(this.s=b)}else this.h=!0;this.a=2;for(var c=document.getElementsByTagName("script"),d=c.length,e=0;e<d;++e){var g=this.l.length==this.j,k=c[e];k.getAttribute("type")==this.e&&(a?k.getAttribute("orig_index")<=this.s&&y(this,k,void 0,!g):(k.getAttribute("orig_index")<this.s&&this.log("Executing a script twice. Orig_Index: "+k.getAttribute("orig_index"),Error("")),y(this,k,void 0,!g)))}}};
m.prototype.registerScriptTags=m.prototype.registerScriptTags;l.f=function(a,b){f(a,"load",b)};h.addOnload=l.f;function E(){var a=/(?:MSIE.(\d+\.\d+))/.exec(navigator.userAgent);return a&&a[1]?document.documentMode||parseFloat(a[1]):NaN}function H(a){return"text/psajs"==a.e?!0:!1}
function X(){var a=h.deferJs;document.createElement=function(b){var c=a.k.call(document,b);a.d&&"script"==b.toLowerCase()&&(a.r.push(c),a.q++,b=function(){var b=a.r.indexOf(this);-1!=b&&(a.r.splice(b,1),a.q--,a.n())},l.f(c,b),f(c,"error",b));return c}}m.prototype.R=function(){return q};m.prototype.isExperimentalMode=m.prototype.R;
l.O=function(){h.deferJs||(q=h.defer_js_experimental,h.highPriorityDeferJs=new m,h.highPriorityDeferJs.e="text/prioritypsajs",h.highPriorityDeferJs.b="priority_psa_not_processed",F(h.highPriorityDeferJs),h.lowPriorityDeferJs=new m,h.lowPriorityDeferJs.e="text/psajs",h.lowPriorityDeferJs.b="psa_not_processed",F(h.lowPriorityDeferJs),h.deferJs=h.highPriorityDeferJs,X(),h.deferJs=h.deferJs)};l.O();h.B=!1;l.A=function(){h.B||h.panelLoader||(h.B=!0,h.deferJs.registerScriptTags(),h.deferJs.n())};
l.startDeferJs=l.A;f(document,"DOMContentLoaded",l.A);l.f(window,l.A);})();
