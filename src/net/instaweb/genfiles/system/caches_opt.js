(function(){var h,l=l||{},m=this;function aa(a,b){var c=a.split("."),d=m;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b}function ba(a){a=a.split(".");for(var b=m,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}function ca(){}
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function p(a){var b=n(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function r(a){return"function"==n(a)}var da="closure_uid_"+(1E9*Math.random()>>>0),ea=0;function fa(a,b,c){return a.call.apply(a.bind,arguments)}
function ga(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function s(a,b,c){s=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?fa:ga;return s.apply(null,arguments)}var ha=Date.now||function(){return+new Date};
function t(a,b){function c(){}c.prototype=b.prototype;a.ca=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.ta=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};function w(a){w[" "](a);return a}w[" "]=ca;function x(a,b,c,d,e){this.reset(a,b,c,d,e)}x.prototype.S=null;x.prototype.R=null;var ia=0;x.prototype.reset=function(a,b,c,d,e){"number"==typeof e||ia++;d||ha();this.q=a;this.ka=b;delete this.S;delete this.R};x.prototype.ba=function(a){this.q=a};function y(a){if(Error.captureStackTrace)Error.captureStackTrace(this,y);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}t(y,Error);y.prototype.name="CustomError";function ja(){}ja.prototype.Q=null;function ka(a){var b;(b=a.Q)||(b={},la(a)&&(b[0]=!0,b[1]=!0),b=a.Q=b);return b};function ma(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function na(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var oa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function pa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<oa.length;f++)c=oa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function qa(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var ra=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function sa(a){if(!ta.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ua,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(va,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(wa,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(xa,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(ya,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(za,"&#0;"));return a}var ua=/&/g,va=/</g,wa=/>/g,xa=/"/g,ya=/'/g,za=/\x00/g,ta=/[\x00&<>"']/;function Aa(a,b){return a<b?-1:a>b?1:0};var z;a:{var Ba=m.navigator;if(Ba){var Ca=Ba.userAgent;if(Ca){z=Ca;break a}}z=""};var A="closure_listenable_"+(1E6*Math.random()|0),Da=0;function Ea(a,b,c,d,e){this.h=a;this.D=null;this.src=b;this.type=c;this.u=!!d;this.w=e;this.key=++Da;this.m=this.t=!1}function Fa(a){a.m=!0;a.h=null;a.D=null;a.src=null;a.w=null};function Ga(a,b){b.unshift(a);y.call(this,qa.apply(null,b));b.shift()}t(Ga,y);Ga.prototype.name="AssertionError";function Ha(a,b){throw new Ga("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var B=Array.prototype,Ia=B.indexOf?function(a,b,c){return B.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ja=B.forEach?function(a,b,c){B.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Ka(a){var b;a:{b=La;for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:q(a)?a.charAt(b):a[b]};var Ma;function Na(){}t(Na,ja);function Oa(a){return(a=la(a))?new ActiveXObject(a):new XMLHttpRequest}function la(a){if(!a.U&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.U=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.U}Ma=new Na;function Pa(a){if("function"==typeof a.v)return a.v();if(q(a))return a.split("");if(p(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return ma(a)}function Qa(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(p(a)||q(a))Ja(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.v)if(p(a)||q(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=na(a);else c=void 0;for(var d=Pa(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};var Ra=-1!=z.indexOf("Opera")||-1!=z.indexOf("OPR"),C=-1!=z.indexOf("Trident")||-1!=z.indexOf("MSIE"),D=-1!=z.indexOf("Gecko")&&-1==z.toLowerCase().indexOf("webkit")&&!(-1!=z.indexOf("Trident")||-1!=z.indexOf("MSIE")),F=-1!=z.toLowerCase().indexOf("webkit");function Sa(){var a=m.document;return a?a.documentMode:void 0}
var Ta=function(){var a="",b;if(Ra&&m.opera)return a=m.opera.version,r(a)?a():a;D?b=/rv\:([^\);]+)(\)|;)/:C?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:F&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(z))?a[1]:"");return C&&(b=Sa(),b>parseFloat(a))?String(b):a}(),Ua={};
function G(a){var b;if(!(b=Ua[a])){b=0;for(var c=ra(String(Ta)).split("."),d=ra(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",E=RegExp("(\\d*)(\\D*)","g"),J=RegExp("(\\d*)(\\D*)","g");do{var u=E.exec(g)||["","",""],v=J.exec(k)||["","",""];if(0==u[0].length&&0==v[0].length)break;b=Aa(0==u[1].length?0:parseInt(u[1],10),0==v[1].length?0:parseInt(v[1],10))||Aa(0==u[2].length,0==v[2].length)||Aa(u[2],v[2])}while(0==b)}b=Ua[a]=0<=b}return b}
var Va=m.document,Wa=Va&&C?Sa()||("CSS1Compat"==Va.compatMode?parseInt(Ta,10):5):void 0;function H(a,b){this.e={};this.b=[];this.k=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof H?(c=a.o(),d=a.v()):(c=na(a),d=ma(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}h=H.prototype;h.v=function(){Xa(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.e[this.b[b]]);return a};h.o=function(){Xa(this);return this.b.concat()};
h.clear=function(){this.e={};this.k=this.b.length=0};h.remove=function(a){return Object.prototype.hasOwnProperty.call(this.e,a)?(delete this.e[a],this.k--,this.b.length>2*this.k&&Xa(this),!0):!1};function Xa(a){if(a.k!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.e,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.k!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
h.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.e,a)?this.e[a]:b};h.set=function(a,b){Object.prototype.hasOwnProperty.call(this.e,a)||(this.k++,this.b.push(a));this.e[a]=b};h.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new H(this)};function Ya(a){var b;b||(b=Za(a||arguments.callee.caller,[]));return b}
function Za(a,b){var c=[];if(0<=Ia(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push($a(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=$a(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(Za(a.caller,
b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")}function $a(a){if(I[a])return I[a];a=String(a);if(!I[a]){var b=/function ([^\(]+)/.exec(a);I[a]=b?b[1]:"[Anonymous]"}return I[a]}var I={};function K(a){this.W=a;this.T=this.K=this.q=this.C=null}function L(a,b){this.name=a;this.value=b}L.prototype.toString=function(){return this.name};var ab=new L("SEVERE",1E3),bb=new L("INFO",800),cb=new L("CONFIG",700),db=new L("FINE",500);h=K.prototype;h.getName=function(){return this.W};h.getParent=function(){return this.C};h.ba=function(a){this.q=a};function eb(a){if(a.q)return a.q;if(a.C)return eb(a.C);Ha("Root logger has no level set.");return null}
h.log=function(a,b,c){if(a.value>=eb(this).value)for(r(b)&&(b=b()),a=this.ja(a,b,c,K.prototype.log),b="log:"+a.ka,m.console&&(m.console.timeStamp?m.console.timeStamp(b):m.console.markTimeline&&m.console.markTimeline(b)),m.msWriteProfilerMark&&m.msWriteProfilerMark(b),b=this;b;){c=b;var d=a;if(c.T)for(var e=0,f=void 0;f=c.T[e];e++)f(d);b=b.getParent()}};
h.ja=function(a,b,c,d){var e=new x(a,String(b),this.W);if(c){var f;f=d||arguments.callee.caller;e.S=c;var g;try{var k;var E=ba("window.location.href");if(q(c))k={message:c,name:"Unknown error",lineNumber:"Not available",fileName:E,stack:"Not available"};else{var J,u,v=!1;try{J=c.lineNumber||c.ua||"Not available"}catch($b){J="Not available",v=!0}try{u=c.fileName||c.filename||c.sourceURL||m.$googDebugFname||E}catch(ac){u="Not available",v=!0}k=!v&&c.lineNumber&&c.fileName&&c.stack&&c.message&&c.name?
c:{message:c.message||"Not available",name:c.name||"UnknownError",lineNumber:J,fileName:u,stack:c.stack||"Not available"}}g="Message: "+sa(k.message)+'\nUrl: <a href="view-source:'+k.fileName+'" target="_new">'+k.fileName+"</a>\nLine: "+k.lineNumber+"\n\nBrowser stack:\n"+sa(k.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+sa(Ya(f)+"-> ")}catch(Ob){g="Exception trying to expose exception! You win, we lose. "+Ob}e.R=g}return e};h.info=function(a,b){this.log(bb,a,b)};var fb={},M=null;
function gb(a){M||(M=new K(""),fb[""]=M,M.ba(cb));var b;if(!(b=fb[a])){b=new K(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=gb(a.substr(0,c));c.K||(c.K={});c.K[d]=b;b.C=c;fb[a]=b}return b};function N(a,b){a&&a.log(db,b,void 0)};function O(a){this.src=a;this.c={};this.G=0}O.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.c[f];a||(a=this.c[f]=[],this.G++);var g=hb(a,b,d,e);-1<g?(b=a[g],c||(b.t=!1)):(b=new Ea(b,this.src,f,!!d,e),b.t=c,a.push(b));return b};O.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.c))return!1;var e=this.c[a];b=hb(e,b,c,d);return-1<b?(Fa(e[b]),B.splice.call(e,b,1),0==e.length&&(delete this.c[a],this.G--),!0):!1};
function ib(a,b){var c=b.type;if(c in a.c){var d=a.c[c],e=Ia(d,b),f;(f=0<=e)&&B.splice.call(d,e,1);f&&(Fa(b),0==a.c[c].length&&(delete a.c[c],a.G--))}}O.prototype.N=function(a,b,c,d){a=this.c[a.toString()];var e=-1;a&&(e=hb(a,b,c,d));return-1<e?a[e]:null};function hb(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.m&&f.h==b&&f.u==!!c&&f.w==d)return e}return-1};var jb;(jb=!C)||(jb=C&&9<=Wa);var kb=jb,lb=C&&!G("9");!F||G("528");D&&G("1.9b")||C&&G("8")||Ra&&G("9.5")||F&&G("528");D&&!G("8")||C&&G("9");var mb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function nb(a){if(ob){ob=!1;var b=m.location;if(b){var c=b.href;if(c&&(c=(c=nb(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw ob=!0,Error();}}return a.match(mb)}var ob=F;function pb(){0!=qb&&(this[da]||(this[da]=++ea));this.L=this.L;this.la=this.la}var qb=0;pb.prototype.L=!1;function P(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.i=!1;this.aa=!0}P.prototype.stopPropagation=function(){this.i=!0};P.prototype.preventDefault=function(){this.defaultPrevented=!0;this.aa=!1};function Q(a,b){P.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.n=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(D){var e;a:{try{w(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=F||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=F||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.n=a;a.defaultPrevented&&this.preventDefault()}}t(Q,P);Q.prototype.stopPropagation=function(){Q.ca.stopPropagation.call(this);this.n.stopPropagation?this.n.stopPropagation():this.n.cancelBubble=!0};Q.prototype.preventDefault=function(){Q.ca.preventDefault.call(this);var a=this.n;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,lb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var rb="closure_lm_"+(1E6*Math.random()|0),sb={},tb=0;function R(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)R(a,b[f],c,d,e);else if(c=ub(c),a&&a[A])a.l.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=S(a);g||(a[rb]=g=new O(a));c=g.add(b,c,!1,d,e);c.D||(d=vb(),c.D=d,d.src=a,d.h=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(wb(b.toString()),d),tb++)}}
function vb(){var a=xb,b=kb?function(c){return a.call(b.src,b.h,c)}:function(c){c=a.call(b.src,b.h,c);if(!c)return c};return b}function yb(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)yb(a,b[f],c,d,e);else c=ub(c),a&&a[A]?a.l.remove(String(b),c,d,e):a&&(a=S(a))&&(b=a.N(b,c,!!d,e))&&zb(b)}
function zb(a){if("number"!=typeof a&&a&&!a.m){var b=a.src;if(b&&b[A])ib(b.l,a);else{var c=a.type,d=a.D;b.removeEventListener?b.removeEventListener(c,d,a.u):b.detachEvent&&b.detachEvent(wb(c),d);tb--;(c=S(b))?(ib(c,a),0==c.G&&(c.src=null,b[rb]=null)):Fa(a)}}}function wb(a){return a in sb?sb[a]:sb[a]="on"+a}function Ab(a,b,c,d){var e=1;if(a=S(a))if(b=a.c[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.u==c&&!f.m&&(e&=!1!==Bb(f,d))}return Boolean(e)}
function Bb(a,b){var c=a.h,d=a.w||a.src;a.t&&zb(a);return c.call(d,b)}
function xb(a,b){if(a.m)return!0;if(!kb){var c=b||ba("window.event"),d=new Q(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,k=c.length-1;!d.i&&0<=k;k--)d.currentTarget=c[k],e&=Ab(c[k],f,!0,d);for(k=0;!d.i&&k<c.length;k++)d.currentTarget=c[k],e&=Ab(c[k],f,!1,d)}return e}return Bb(a,new Q(b,this))}
function S(a){a=a[rb];return a instanceof O?a:null}var Cb="__closure_events_fn_"+(1E9*Math.random()>>>0);function ub(a){if(r(a))return a;a[Cb]||(a[Cb]=function(b){return a.handleEvent(b)});return a[Cb]};function T(){pb.call(this);this.l=new O(this);this.ia=this;this.Y=null}t(T,pb);T.prototype[A]=!0;T.prototype.addEventListener=function(a,b,c,d){R(this,a,b,c,d)};T.prototype.removeEventListener=function(a,b,c,d){yb(this,a,b,c,d)};
T.prototype.dispatchEvent=function(a){var b,c=this.Y;if(c)for(b=[];c;c=c.Y)b.push(c);var c=this.ia,d=a.type||a;if(q(a))a=new P(a,c);else if(a instanceof P)a.target=a.target||c;else{var e=a;a=new P(d,c);pa(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.i&&0<=g;g--)f=a.currentTarget=b[g],e=U(f,d,!0,a)&&e;a.i||(f=a.currentTarget=c,e=U(f,d,!0,a)&&e,a.i||(e=U(f,d,!1,a)&&e));if(b)for(g=0;!a.i&&g<b.length;g++)f=a.currentTarget=b[g],e=U(f,d,!1,a)&&e;return e};
function U(a,b,c,d){b=a.l.c[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.m&&g.u==c){var k=g.h,E=g.w||g.src;g.t&&ib(a.l,g);e=!1!==k.call(E,d)&&e}}return e&&0!=d.aa}T.prototype.N=function(a,b,c,d){return this.l.N(String(a),b,c,d)};function Db(a,b,c){if(r(a))c&&(a=s(a,c));else if(a&&"function"==typeof a.handleEvent)a=s(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:m.setTimeout(a,b||0)};function V(a){T.call(this);this.headers=new H;this.J=a||null;this.j=!1;this.I=this.a=null;this.g=this.V=this.B="";this.p=this.O=this.A=this.M=!1;this.s=0;this.F=null;this.$=Eb;this.H=this.sa=!1}t(V,T);var Eb="",Fb=V.prototype,Gb=gb("goog.net.XhrIo");Fb.d=Gb;var Hb=/^https?$/i,Ib=["POST","PUT"];h=V.prototype;
h.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.B+"; newUri="+a);b=b?b.toUpperCase():"GET";this.B=a;this.g="";this.V=b;this.M=!1;this.j=!0;this.a=this.J?Oa(this.J):Oa(Ma);this.I=this.J?ka(this.J):ka(Ma);this.a.onreadystatechange=s(this.X,this);try{N(this.d,W(this,"Opening Xhr")),this.O=!0,this.a.open(b,String(a),!0),this.O=!1}catch(e){N(this.d,W(this,"Error opening Xhr: "+e.message));Jb(this,e);return}a=c||"";var f=this.headers.clone();
d&&Qa(d,function(a,b){f.set(b,a)});d=Ka(f.o());c=m.FormData&&a instanceof m.FormData;!(0<=Ia(Ib,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.$&&(this.a.responseType=this.$);"withCredentials"in this.a&&(this.a.withCredentials=this.sa);try{Kb(this),0<this.s&&(this.H=Lb(this.a),N(this.d,W(this,"Will abort after "+this.s+"ms if incomplete, xhr2 "+this.H)),this.H?(this.a.timeout=this.s,this.a.ontimeout=
s(this.da,this)):this.F=Db(this.da,this.s,this)),N(this.d,W(this,"Sending request")),this.A=!0,this.a.send(a),this.A=!1}catch(g){N(this.d,W(this,"Send error: "+g.message)),Jb(this,g)}};function Lb(a){return C&&G(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function La(a){return"content-type"==a.toLowerCase()}h.da=function(){"undefined"!=typeof l&&this.a&&(this.g="Timed out after "+this.s+"ms, aborting",N(this.d,W(this,this.g)),this.dispatchEvent("timeout"),this.abort(8))};
function Jb(a,b){a.j=!1;a.a&&(a.p=!0,a.a.abort(),a.p=!1);a.g=b;Mb(a);Nb(a)}function Mb(a){a.M||(a.M=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}h.abort=function(){this.a&&this.j&&(N(this.d,W(this,"Aborting")),this.j=!1,this.p=!0,this.a.abort(),this.p=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Nb(this))};h.X=function(){this.L||(this.O||this.A||this.p?Pb(this):this.ma())};h.ma=function(){Pb(this)};
function Pb(a){if(a.j&&"undefined"!=typeof l)if(a.I[1]&&4==X(a)&&2==Y(a))N(a.d,W(a,"Local request error detected and ignored"));else if(a.A&&4==X(a))Db(a.X,0,a);else if(a.dispatchEvent("readystatechange"),4==X(a)){N(a.d,W(a,"Request complete"));a.j=!1;try{if(Qb(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<X(a)?a.a.statusText:""}catch(c){N(a.d,"Can not get status: "+c.message),b=""}a.g=b+" ["+Y(a)+"]";Mb(a)}}finally{Nb(a)}}}
function Nb(a){if(a.a){Kb(a);var b=a.a,c=a.I[0]?ca:null;a.a=null;a.I=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){(a=a.d)&&a.log(ab,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}function Kb(a){a.a&&a.H&&(a.a.ontimeout=null);"number"==typeof a.F&&(m.clearTimeout(a.F),a.F=null)}
function Qb(a){var b=Y(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=nb(String(a.B))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Hb.test(a?a.toLowerCase():"");c=b}return c}function X(a){return a.a?a.a.readyState:0}function Y(a){try{return 2<X(a)?a.a.status:-1}catch(b){return-1}}h.getResponseHeader=function(a){return this.a&&4==X(this)?this.a.getResponseHeader(a):void 0};
h.getAllResponseHeaders=function(){return this.a&&4==X(this)?this.a.getAllResponseHeaders():""};function W(a,b){return b+" ["+a.V+" "+a.B+" "+Y(a)+"]"};function Rb(a){this.a=a||new V;this.f="";this.r=!1;a=document.createElement("table");a.id="nav-bar";a.className="pagespeed-sub-tabs";a.innerHTML='<tr><td><a id="'+Sb+'" href="javascript:void(0);">Show Metadata Cache</a> - </td><td><a id="'+Tb+'" href="javascript:void(0);">Show Cache Structure</a> - </td><td><a id="'+Ub+'" href="javascript:void(0);">Physical Caches</a> - </td><td><a id="'+Vb+'" href="javascript:void(0);">Purge Cache</a></td></tr>';document.body.insertBefore(a,document.getElementById(Z));
a=document.createElement("pre");a.id=Wb;a.className="pagespeed-caches-result";document.getElementById(Z).appendChild(a);a=document.createElement("div");a.id=Xb;a.className="pagespeed-caches-result";var b=document.getElementById(Yb);b.insertBefore(a,b.firstChild)}
aa("pagespeed.Caches.toggleDetail",function(a){var b=document.getElementById(a+"_summary"),c=document.getElementById(a+"_detail");document.getElementById(a+"_toggle").checked?(b.style.display="none",c.style.display="block"):(b.style.display="block",c.style.display="none")});
var Sb="show_metadata_mode",Tb="cache_struct_mode",Ub="physical_cache_mode",Vb="purge_cache_mode",Zb={fa:Sb,ea:Tb,ga:Ub,ha:Vb},Z="show_metadata",Yb="purge_cache",$={fa:Z,ea:"cache_struct",ga:"physical_cache",ha:Yb},Wb="metadata_result",Xb="purge_result";h=Rb.prototype;h.Z=function(){var a=location.hash.substr(1);if(""==a)this.show(Z);else{var b;a:{for(b in $)if($[b]==a){b=!0;break a}b=!1}b&&this.show(a)}};
h.show=function(a){for(var b in $){var c=$[b];document.getElementById(c).className=c==a?"":"pagespeed-hidden-offscreen"}c=document.getElementById(a+"_mode");for(b in Zb){var d=document.getElementById(Zb[b]);d.className=d==c?"pagespeed-underline-link":""}location.href=location.href.split("#")[0]+"#"+a};h.pa=function(){if(!this.a.a){var a=encodeURIComponent(document.getElementById("purge_text").value.trim());this.f="*"==a?"purge_all":"purge_text";this.a.send("?purge="+a)}};
h.oa=function(){this.a.a||(this.f="purge_all",this.a.send("?purge=*"))};h.P=function(){this.a.a||(this.f="purge_table",this.a.send("?new_set="))};h.na=function(a){this.a.a||(a.preventDefault(),a="?url="+encodeURIComponent(document.getElementById("metadata_text").value.trim())+"&user_agent="+encodeURIComponent(document.getElementById("user_agent").value.trim())+"&json=1",this.f=Wb,this.a.send(a))};h.ra=function(){this.r=!this.r;this.P()};
h.qa=function(){if(Qb(this.a)){var a;var b=this.a;try{a=b.a?b.a.responseText:""}catch(c){N(b.d,"Can not get responseText: "+c.message),a=""}if(this.f==Wb)a=JSON.parse(a.substring(4)).value,document.getElementById(this.f).textContent=a;else if("purge_table"==this.f){if(a=a.split("\n"),b=a.shift(),document.getElementById("purge_global").textContent="Everything before this time stamp is invalid: "+b.split("@")[1],b=document.getElementById("purge_table"),b.innerHTML="",0<a.length){b.appendChild(document.createElement("hr"));
var d=document.createElement("table");this.r&&a.reverse();for(var e=0;e<a.length;++e){var f=a[e].lastIndexOf("@"),g=a[e].substring(0,f),k=a[e].substring(f+1),f=d.insertRow(-1);f.insertCell(0).textContent=k;k=document.createElement("code");k.className="pagespeed-caches-purge-url";k.textContent=g;f.insertCell(1).appendChild(k)}e=d.createTHead().insertRow(0);g=e.insertCell(0);g.className="pagespeed-caches-date-column";1==a.length?g.textContent="Invalidation Time":(a=document.createElement("input"),a.setAttribute("type",
"checkbox"),a.id="sort",a.checked=this.r?!0:!1,a.title="Change sort order.",g.textContent=this.r?"Invalidation Time (Descending)":"Invalidation Time (Ascending)",g.appendChild(a),R(a,"change",s(this.ra,this)));g=e.insertCell(1);g.textContent="URL";g.className="pagespeed-stats-url-column";b.appendChild(d)}}else window.setTimeout(s(this.P,this),0),b=document.getElementById(Xb),"Purge successful"==a&&"purge_text"==this.f?b.textContent="Added to Purge Set":-1!=a.indexOf("Purging not enabled")?b.innerHTML=
a:b.textContent=a}else a=this.a,console.log(q(a.g)?a.g:String(a.g))};
aa("pagespeed.Caches.Start",function(){R(window,"load",function(){var a=new Rb,b=document.createElement("table");b.innerHTML='URL: <input id="purge_text" type="text" name="purge" size="110"/><br><input id="purge_submit" type="button" value="Purge Individual URL"/><input id="purge_all" type="button" value="Purge Entire Cache"/>';var c=document.getElementById(Yb);c.insertBefore(b,c.firstChild);a.Z();for(var d in $)R(document.getElementById(Zb[d]),"click",s(a.show,a,$[d]));R(window,"hashchange",s(a.Z,
a));R(document.getElementById("purge_submit"),"click",s(a.pa,a));R(document.getElementById("purge_all"),"click",s(a.oa,a));R(document.getElementById("metadata_submit"),"click",s(a.na,a));R(a.a,"complete",s(a.qa,a));R(document.getElementById("metadata_clear"),"click",s(location.reload,location));a.P()})});})();
