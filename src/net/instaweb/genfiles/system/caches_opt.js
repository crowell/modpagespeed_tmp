(function(){var h,l=l||{},m=this;function aa(a,b){var c=a.split("."),d=m;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b}function ba(a){a=a.split(".");for(var b=m,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}function ca(){}
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){var b=n(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function q(a){return"function"==n(a)}var ea="closure_uid_"+(1E9*Math.random()>>>0),fa=0;function ga(a,b,c){return a.call.apply(a.bind,arguments)}
function ha(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ga:ha;return r.apply(null,arguments)}var ia=Date.now||function(){return+new Date};
function t(a,b){function c(){}c.prototype=b.prototype;a.ca=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.ta=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};function ja(){}ja.prototype.Q=null;function ka(a){var b;(b=a.Q)||(b={},la(a)&&(b[0]=!0,b[1]=!0),b=a.Q=b);return b};function ma(){0!=na&&(this[ea]||(this[ea]=++fa));this.L=this.L;this.la=this.la}var na=0;ma.prototype.L=!1;function oa(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var pa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function qa(a){if(!ra.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(sa,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ta,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(ua,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(va,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(wa,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(xa,"&#0;"));return a}var sa=/&/g,ta=/</g,ua=/>/g,va=/"/g,wa=/'/g,xa=/\x00/g,ra=/[\x00&<>"']/;function ya(a,b){return a<b?-1:a>b?1:0};var u="closure_listenable_"+(1E6*Math.random()|0),za=0;function Aa(a,b,c,d,e){this.h=a;this.D=null;this.src=b;this.type=c;this.u=!!d;this.w=e;this.key=++za;this.m=this.t=!1}function Ba(a){a.m=!0;a.h=null;a.D=null;a.src=null;a.w=null};function x(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.i=!1;this.aa=!0}x.prototype.stopPropagation=function(){this.i=!0};x.prototype.preventDefault=function(){this.defaultPrevented=!0;this.aa=!1};var y;a:{var Ca=m.navigator;if(Ca){var Da=Ca.userAgent;if(Da){y=Da;break a}}y=""};function Ea(a){Ea[" "](a);return a}Ea[" "]=ca;function z(a,b,c,d,e){this.reset(a,b,c,d,e)}z.prototype.S=null;z.prototype.R=null;var Fa=0;z.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Fa++;d||ia();this.q=a;this.ka=b;delete this.S;delete this.R};z.prototype.ba=function(a){this.q=a};function A(a){if(Error.captureStackTrace)Error.captureStackTrace(this,A);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}t(A,Error);A.prototype.name="CustomError";function Ga(a,b){b.unshift(a);A.call(this,oa.apply(null,b));b.shift()}t(Ga,A);Ga.prototype.name="AssertionError";function Ha(a,b){throw new Ga("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var Ia;function Ja(){}t(Ja,ja);function Ka(a){return(a=la(a))?new ActiveXObject(a):new XMLHttpRequest}function la(a){if(!a.U&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.U=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.U}Ia=new Ja;var B=Array.prototype,La=B.indexOf?function(a,b,c){return B.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ma=B.forEach?function(a,b,c){B.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Na(a){var b;a:{b=Oa;for(var c=a.length,d=p(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:p(a)?a.charAt(b):a[b]};function Pa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function Qa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var Ra="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Sa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ra.length;f++)c=Ra[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function C(a){this.src=a;this.c={};this.G=0}C.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.c[f];a||(a=this.c[f]=[],this.G++);var g=Ta(a,b,d,e);-1<g?(b=a[g],c||(b.t=!1)):(b=new Aa(b,this.src,f,!!d,e),b.t=c,a.push(b));return b};C.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.c))return!1;var e=this.c[a];b=Ta(e,b,c,d);return-1<b?(Ba(e[b]),B.splice.call(e,b,1),0==e.length&&(delete this.c[a],this.G--),!0):!1};
function Ua(a,b){var c=b.type;if(c in a.c){var d=a.c[c],e=La(d,b),f;(f=0<=e)&&B.splice.call(d,e,1);f&&(Ba(b),0==a.c[c].length&&(delete a.c[c],a.G--))}}C.prototype.N=function(a,b,c,d){a=this.c[a.toString()];var e=-1;a&&(e=Ta(a,b,c,d));return-1<e?a[e]:null};function Ta(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.m&&f.h==b&&f.u==!!c&&f.w==d)return e}return-1};var Va=-1!=y.indexOf("Opera")||-1!=y.indexOf("OPR"),D=-1!=y.indexOf("Trident")||-1!=y.indexOf("MSIE"),E=-1!=y.indexOf("Gecko")&&-1==y.toLowerCase().indexOf("webkit")&&!(-1!=y.indexOf("Trident")||-1!=y.indexOf("MSIE")),F=-1!=y.toLowerCase().indexOf("webkit");function Wa(){var a=m.document;return a?a.documentMode:void 0}
var Xa=function(){var a="",b;if(Va&&m.opera)return a=m.opera.version,q(a)?a():a;E?b=/rv\:([^\);]+)(\)|;)/:D?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:F&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(y))?a[1]:"");return D&&(b=Wa(),b>parseFloat(a))?String(b):a}(),Ya={};
function H(a){var b;if(!(b=Ya[a])){b=0;for(var c=pa(String(Xa)).split("."),d=pa(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",G=RegExp("(\\d*)(\\D*)","g"),K=RegExp("(\\d*)(\\D*)","g");do{var v=G.exec(g)||["","",""],w=K.exec(k)||["","",""];if(0==v[0].length&&0==w[0].length)break;b=ya(0==v[1].length?0:parseInt(v[1],10),0==w[1].length?0:parseInt(w[1],10))||ya(0==v[2].length,0==w[2].length)||ya(v[2],w[2])}while(0==b)}b=Ya[a]=0<=b}return b}
var Za=m.document,$a=Za&&D?Wa()||("CSS1Compat"==Za.compatMode?parseInt(Xa,10):5):void 0;var ab;(ab=!D)||(ab=D&&9<=$a);var bb=ab,cb=D&&!H("9");!F||H("528");E&&H("1.9b")||D&&H("8")||Va&&H("9.5")||F&&H("528");E&&!H("8")||D&&H("9");function I(a,b){x.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.n=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(E){var e;a:{try{Ea(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=F||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=F||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.n=a;a.defaultPrevented&&this.preventDefault()}}t(I,x);I.prototype.stopPropagation=function(){I.ca.stopPropagation.call(this);this.n.stopPropagation?this.n.stopPropagation():this.n.cancelBubble=!0};I.prototype.preventDefault=function(){I.ca.preventDefault.call(this);var a=this.n;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,cb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var db="closure_lm_"+(1E6*Math.random()|0),eb={},fb=0;function J(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)J(a,b[f],c,d,e);else if(c=gb(c),a&&a[u])a.l.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=L(a);g||(a[db]=g=new C(a));c=g.add(b,c,!1,d,e);c.D||(d=hb(),c.D=d,d.src=a,d.h=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(ib(b.toString()),d),fb++)}}
function hb(){var a=jb,b=bb?function(c){return a.call(b.src,b.h,c)}:function(c){c=a.call(b.src,b.h,c);if(!c)return c};return b}function kb(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)kb(a,b[f],c,d,e);else c=gb(c),a&&a[u]?a.l.remove(String(b),c,d,e):a&&(a=L(a))&&(b=a.N(b,c,!!d,e))&&lb(b)}
function lb(a){if("number"!=typeof a&&a&&!a.m){var b=a.src;if(b&&b[u])Ua(b.l,a);else{var c=a.type,d=a.D;b.removeEventListener?b.removeEventListener(c,d,a.u):b.detachEvent&&b.detachEvent(ib(c),d);fb--;(c=L(b))?(Ua(c,a),0==c.G&&(c.src=null,b[db]=null)):Ba(a)}}}function ib(a){return a in eb?eb[a]:eb[a]="on"+a}function mb(a,b,c,d){var e=1;if(a=L(a))if(b=a.c[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.u==c&&!f.m&&(e&=!1!==nb(f,d))}return Boolean(e)}
function nb(a,b){var c=a.h,d=a.w||a.src;a.t&&lb(a);return c.call(d,b)}
function jb(a,b){if(a.m)return!0;if(!bb){var c=b||ba("window.event"),d=new I(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,k=c.length-1;!d.i&&0<=k;k--)d.currentTarget=c[k],e&=mb(c[k],f,!0,d);for(k=0;!d.i&&k<c.length;k++)d.currentTarget=c[k],e&=mb(c[k],f,!1,d)}return e}return nb(a,new I(b,this))}
function L(a){a=a[db];return a instanceof C?a:null}var ob="__closure_events_fn_"+(1E9*Math.random()>>>0);function gb(a){if(q(a))return a;a[ob]||(a[ob]=function(b){return a.handleEvent(b)});return a[ob]};function M(){ma.call(this);this.l=new C(this);this.ia=this;this.Y=null}t(M,ma);M.prototype[u]=!0;M.prototype.addEventListener=function(a,b,c,d){J(this,a,b,c,d)};M.prototype.removeEventListener=function(a,b,c,d){kb(this,a,b,c,d)};
M.prototype.dispatchEvent=function(a){var b,c=this.Y;if(c)for(b=[];c;c=c.Y)b.push(c);var c=this.ia,d=a.type||a;if(p(a))a=new x(a,c);else if(a instanceof x)a.target=a.target||c;else{var e=a;a=new x(d,c);Sa(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.i&&0<=g;g--)f=a.currentTarget=b[g],e=N(f,d,!0,a)&&e;a.i||(f=a.currentTarget=c,e=N(f,d,!0,a)&&e,a.i||(e=N(f,d,!1,a)&&e));if(b)for(g=0;!a.i&&g<b.length;g++)f=a.currentTarget=b[g],e=N(f,d,!1,a)&&e;return e};
function N(a,b,c,d){b=a.l.c[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.m&&g.u==c){var k=g.h,G=g.w||g.src;g.t&&Ua(a.l,g);e=!1!==k.call(G,d)&&e}}return e&&0!=d.aa}M.prototype.N=function(a,b,c,d){return this.l.N(String(a),b,c,d)};function pb(a,b,c){if(q(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:m.setTimeout(a,b||0)};var qb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function rb(a){if(sb){sb=!1;var b=m.location;if(b){var c=b.href;if(c&&(c=(c=rb(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw sb=!0,Error();}}return a.match(qb)}var sb=F;function O(a,b){this.e={};this.b=[];this.k=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof O?(c=a.o(),d=a.v()):(c=Qa(a),d=Pa(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}h=O.prototype;h.v=function(){tb(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.e[this.b[b]]);return a};h.o=function(){tb(this);return this.b.concat()};
h.clear=function(){this.e={};this.k=this.b.length=0};h.remove=function(a){return Object.prototype.hasOwnProperty.call(this.e,a)?(delete this.e[a],this.k--,this.b.length>2*this.k&&tb(this),!0):!1};function tb(a){if(a.k!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.e,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.k!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
h.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.e,a)?this.e[a]:b};h.set=function(a,b){Object.prototype.hasOwnProperty.call(this.e,a)||(this.k++,this.b.push(a));this.e[a]=b};h.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new O(this)};function ub(a){if("function"==typeof a.v)return a.v();if(p(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Pa(a)}
function vb(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(da(a)||p(a))Ma(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.v)if(da(a)||p(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=Qa(a);else c=void 0;for(var d=ub(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};function wb(a){var b;b||(b=xb(a||arguments.callee.caller,[]));return b}
function xb(a,b){var c=[];if(0<=La(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(yb(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=yb(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(xb(a.caller,
b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")}function yb(a){if(P[a])return P[a];a=String(a);if(!P[a]){var b=/function ([^\(]+)/.exec(a);P[a]=b?b[1]:"[Anonymous]"}return P[a]}var P={};function Q(a){this.W=a;this.T=this.K=this.q=this.C=null}function R(a,b){this.name=a;this.value=b}R.prototype.toString=function(){return this.name};var zb=new R("SEVERE",1E3),Ab=new R("INFO",800),Bb=new R("CONFIG",700),Cb=new R("FINE",500);h=Q.prototype;h.getName=function(){return this.W};h.getParent=function(){return this.C};h.ba=function(a){this.q=a};function Db(a){if(a.q)return a.q;if(a.C)return Db(a.C);Ha("Root logger has no level set.");return null}
h.log=function(a,b,c){if(a.value>=Db(this).value)for(q(b)&&(b=b()),a=this.ja(a,b,c,Q.prototype.log),b="log:"+a.ka,m.console&&(m.console.timeStamp?m.console.timeStamp(b):m.console.markTimeline&&m.console.markTimeline(b)),m.msWriteProfilerMark&&m.msWriteProfilerMark(b),b=this;b;){c=b;var d=a;if(c.T)for(var e=0,f=void 0;f=c.T[e];e++)f(d);b=b.getParent()}};
h.ja=function(a,b,c,d){var e=new z(a,String(b),this.W);if(c){var f;f=d||arguments.callee.caller;e.S=c;var g;try{var k;var G=ba("window.location.href");if(p(c))k={message:c,name:"Unknown error",lineNumber:"Not available",fileName:G,stack:"Not available"};else{var K,v,w=!1;try{K=c.lineNumber||c.ua||"Not available"}catch(bc){K="Not available",w=!0}try{v=c.fileName||c.filename||c.sourceURL||m.$googDebugFname||G}catch(cc){v="Not available",w=!0}k=!w&&c.lineNumber&&c.fileName&&c.stack&&c.message&&c.name?
c:{message:c.message||"Not available",name:c.name||"UnknownError",lineNumber:K,fileName:v,stack:c.stack||"Not available"}}g="Message: "+qa(k.message)+'\nUrl: <a href="view-source:'+k.fileName+'" target="_new">'+k.fileName+"</a>\nLine: "+k.lineNumber+"\n\nBrowser stack:\n"+qa(k.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+qa(wb(f)+"-> ")}catch(Vb){g="Exception trying to expose exception! You win, we lose. "+Vb}e.R=g}return e};h.info=function(a,b){this.log(Ab,a,b)};var Eb={},S=null;
function Fb(a){S||(S=new Q(""),Eb[""]=S,S.ba(Bb));var b;if(!(b=Eb[a])){b=new Q(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Fb(a.substr(0,c));c.K||(c.K={});c.K[d]=b;b.C=c;Eb[a]=b}return b};function T(a,b){a&&a.log(Cb,b,void 0)};function U(a){M.call(this);this.headers=new O;this.J=a||null;this.j=!1;this.I=this.a=null;this.g=this.V=this.B="";this.p=this.O=this.A=this.M=!1;this.s=0;this.F=null;this.$=Gb;this.H=this.sa=!1}t(U,M);var Gb="",Hb=U.prototype,Ib=Fb("goog.net.XhrIo");Hb.d=Ib;var Jb=/^https?$/i,Kb=["POST","PUT"];h=U.prototype;
h.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.B+"; newUri="+a);b=b?b.toUpperCase():"GET";this.B=a;this.g="";this.V=b;this.M=!1;this.j=!0;this.a=this.J?Ka(this.J):Ka(Ia);this.I=this.J?ka(this.J):ka(Ia);this.a.onreadystatechange=r(this.X,this);try{T(this.d,V(this,"Opening Xhr")),this.O=!0,this.a.open(b,String(a),!0),this.O=!1}catch(e){T(this.d,V(this,"Error opening Xhr: "+e.message));Lb(this,e);return}a=c||"";var f=this.headers.clone();
d&&vb(d,function(a,b){f.set(b,a)});d=Na(f.o());c=m.FormData&&a instanceof m.FormData;!(0<=La(Kb,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.$&&(this.a.responseType=this.$);"withCredentials"in this.a&&(this.a.withCredentials=this.sa);try{Mb(this),0<this.s&&(this.H=Nb(this.a),T(this.d,V(this,"Will abort after "+this.s+"ms if incomplete, xhr2 "+this.H)),this.H?(this.a.timeout=this.s,this.a.ontimeout=
r(this.da,this)):this.F=pb(this.da,this.s,this)),T(this.d,V(this,"Sending request")),this.A=!0,this.a.send(a),this.A=!1}catch(g){T(this.d,V(this,"Send error: "+g.message)),Lb(this,g)}};function Nb(a){return D&&H(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Oa(a){return"content-type"==a.toLowerCase()}h.da=function(){"undefined"!=typeof l&&this.a&&(this.g="Timed out after "+this.s+"ms, aborting",T(this.d,V(this,this.g)),this.dispatchEvent("timeout"),this.abort(8))};
function Lb(a,b){a.j=!1;a.a&&(a.p=!0,a.a.abort(),a.p=!1);a.g=b;Ob(a);Pb(a)}function Ob(a){a.M||(a.M=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}h.abort=function(){this.a&&this.j&&(T(this.d,V(this,"Aborting")),this.j=!1,this.p=!0,this.a.abort(),this.p=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Pb(this))};h.X=function(){this.L||(this.O||this.A||this.p?Qb(this):this.ma())};h.ma=function(){Qb(this)};
function Qb(a){if(a.j&&"undefined"!=typeof l)if(a.I[1]&&4==W(a)&&2==X(a))T(a.d,V(a,"Local request error detected and ignored"));else if(a.A&&4==W(a))pb(a.X,0,a);else if(a.dispatchEvent("readystatechange"),4==W(a)){T(a.d,V(a,"Request complete"));a.j=!1;try{if(Rb(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<W(a)?a.a.statusText:""}catch(c){T(a.d,"Can not get status: "+c.message),b=""}a.g=b+" ["+X(a)+"]";Ob(a)}}finally{Pb(a)}}}
function Pb(a){if(a.a){Mb(a);var b=a.a,c=a.I[0]?ca:null;a.a=null;a.I=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){(a=a.d)&&a.log(zb,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}function Mb(a){a.a&&a.H&&(a.a.ontimeout=null);"number"==typeof a.F&&(m.clearTimeout(a.F),a.F=null)}
function Rb(a){var b=X(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=rb(String(a.B))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Jb.test(a?a.toLowerCase():"");c=b}return c}function W(a){return a.a?a.a.readyState:0}function X(a){try{return 2<W(a)?a.a.status:-1}catch(b){return-1}}h.getResponseHeader=function(a){return this.a&&4==W(this)?this.a.getResponseHeader(a):void 0};
h.getAllResponseHeaders=function(){return this.a&&4==W(this)?this.a.getAllResponseHeaders():""};function V(a,b){return b+" ["+a.V+" "+a.B+" "+X(a)+"]"};function Sb(a){this.a=a||new U;this.f="";this.r=!1;a=document.createElement("table");a.id="nav-bar";a.className="pagespeed-sub-tabs";a.innerHTML='<tr><td><a id="'+Tb+'" href="javascript:void(0);">Show Metadata Cache</a> - </td><td><a id="'+Ub+'" href="javascript:void(0);">Show Cache Structure</a> - </td><td><a id="'+Wb+'" href="javascript:void(0);">Physical Caches</a> - </td><td><a id="'+Xb+'" href="javascript:void(0);">Purge Cache</a></td></tr>';document.body.insertBefore(a,document.getElementById(Y));
a=document.createElement("pre");a.id=Yb;a.className="pagespeed-caches-result";document.getElementById(Y).appendChild(a);a=document.createElement("div");a.id=Zb;a.className="pagespeed-caches-result";var b=document.getElementById($b);b.insertBefore(a,b.firstChild)}
aa("pagespeed.Caches.toggleDetail",function(a){var b=document.getElementById(a+"_summary"),c=document.getElementById(a+"_detail");document.getElementById(a+"_toggle").checked?(b.style.display="none",c.style.display="block"):(b.style.display="block",c.style.display="none")});
var Tb="show_metadata_mode",Ub="cache_struct_mode",Wb="physical_cache_mode",Xb="purge_cache_mode",ac={fa:Tb,ea:Ub,ga:Wb,ha:Xb},Y="show_metadata",$b="purge_cache",Z={fa:Y,ea:"cache_struct",ga:"physical_cache",ha:$b},Yb="metadata_result",Zb="purge_result";h=Sb.prototype;h.Z=function(){var a=location.hash.substr(1);if(""==a)this.show(Y);else{var b;a:{for(b in Z)if(Z[b]==a){b=!0;break a}b=!1}b&&this.show(a)}};
h.show=function(a){for(var b in Z){var c=Z[b];document.getElementById(c).className=c==a?"":"pagespeed-hidden-offscreen"}c=document.getElementById(a+"_mode");for(b in ac){var d=document.getElementById(ac[b]);d.className=d==c?"pagespeed-underline-link":""}location.href=location.href.split("#")[0]+"#"+a};h.pa=function(){if(!this.a.a){var a=encodeURIComponent(document.getElementById("purge_text").value.trim());this.f="*"==a?"purge_all":"purge_text";this.a.send("?purge="+a)}};
h.oa=function(){this.a.a||(this.f="purge_all",this.a.send("?purge=*"))};h.P=function(){this.a.a||(this.f="purge_table",this.a.send("?new_set="))};h.na=function(a){this.a.a||(a.preventDefault(),a="?url="+encodeURIComponent(document.getElementById("metadata_text").value.trim())+"&user_agent="+encodeURIComponent(document.getElementById("user_agent").value.trim())+"&json=1",this.f=Yb,this.a.send(a))};h.ra=function(){this.r=!this.r;this.P()};
h.qa=function(){if(Rb(this.a)){var a;var b=this.a;try{a=b.a?b.a.responseText:""}catch(c){T(b.d,"Can not get responseText: "+c.message),a=""}if(this.f==Yb)a=JSON.parse(a.substring(4)).value,document.getElementById(this.f).textContent=a;else if("purge_table"==this.f){if(a=a.split("\n"),b=a.shift(),document.getElementById("purge_global").textContent="Everything before this time stamp is invalid: "+b.split("@")[1],b=document.getElementById("purge_table"),b.innerHTML="",0<a.length){b.appendChild(document.createElement("hr"));
var d=document.createElement("table");this.r&&a.reverse();for(var e=0;e<a.length;++e){var f=a[e].lastIndexOf("@"),g=a[e].substring(0,f),k=a[e].substring(f+1),f=d.insertRow(-1);f.insertCell(0).textContent=k;k=document.createElement("code");k.className="pagespeed-caches-purge-url";k.textContent=g;f.insertCell(1).appendChild(k)}e=d.createTHead().insertRow(0);g=e.insertCell(0);g.className="pagespeed-caches-date-column";1==a.length?g.textContent="Invalidation Time":(a=document.createElement("input"),a.setAttribute("type",
"checkbox"),a.id="sort",a.checked=this.r?!0:!1,a.title="Change sort order.",g.textContent=this.r?"Invalidation Time (Descending)":"Invalidation Time (Ascending)",g.appendChild(a),J(a,"change",r(this.ra,this)));g=e.insertCell(1);g.textContent="URL";g.className="pagespeed-stats-url-column";b.appendChild(d)}}else window.setTimeout(r(this.P,this),0),b=document.getElementById(Zb),"Purge successful"==a&&"purge_text"==this.f?b.textContent="Added to Purge Set":-1!=a.indexOf("Purging not enabled")?b.innerHTML=
a:b.textContent=a}else a=this.a,console.log(p(a.g)?a.g:String(a.g))};
aa("pagespeed.Caches.Start",function(){J(window,"load",function(){var a=new Sb,b=document.createElement("table");b.innerHTML='URL: <input id="purge_text" type="text" name="purge" size="110"/><br><input id="purge_submit" type="button" value="Purge Individual URL"/><input id="purge_all" type="button" value="Purge Entire Cache"/>';var c=document.getElementById($b);c.insertBefore(b,c.firstChild);a.Z();for(var d in Z)J(document.getElementById(ac[d]),"click",r(a.show,a,Z[d]));J(window,"hashchange",r(a.Z,
a));J(document.getElementById("purge_submit"),"click",r(a.pa,a));J(document.getElementById("purge_all"),"click",r(a.oa,a));J(document.getElementById("metadata_submit"),"click",r(a.na,a));J(a.a,"complete",r(a.qa,a));J(document.getElementById("metadata_clear"),"click",r(location.reload,location));a.P()})});})();
