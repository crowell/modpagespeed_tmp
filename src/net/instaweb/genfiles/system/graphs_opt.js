(function(){var k,aa=aa||{},l=this;function ba(a){a=a.split(".");for(var b=l,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}function ca(){}
function p(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){var b=p(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function r(a){return"function"==p(a)}var ea="closure_uid_"+(1E9*Math.random()>>>0),fa=0;function ga(a,b,c){return a.call.apply(a.bind,arguments)}
function ha(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function s(a,b,c){s=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ga:ha;return s.apply(null,arguments)}var ia=Date.now||function(){return+new Date};
function u(a,b){function c(){}c.prototype=b.prototype;a.ia=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ca=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};function ja(a){ja[" "](a);return a}ja[" "]=ca;function ka(){0!=la&&(this[ea]||(this[ea]=++fa));this.N=this.N;this.xa=this.xa}var la=0;ka.prototype.N=!1;function ma(){}ma.prototype.V=null;function na(a){var b;(b=a.V)||(b={},oa(a)&&(b[0]=!0,b[1]=!0),b=a.V=b);return b};function pa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function qa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var ra="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function sa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ra.length;f++)c=ra[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function v(a){if(Error.captureStackTrace)Error.captureStackTrace(this,v);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}u(v,Error);v.prototype.name="CustomError";function w(a,b,c,d,e){this.reset(a,b,c,d,e)}w.prototype.X=null;w.prototype.W=null;var ta=0;w.prototype.reset=function(a,b,c,d,e){"number"==typeof e||ta++;d||ia();this.q=a;this.wa=b;delete this.X;delete this.W};w.prototype.ha=function(a){this.q=a};var y="closure_listenable_"+(1E6*Math.random()|0),ua=0;function z(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.i=!1;this.ga=!0}z.prototype.stopPropagation=function(){this.i=!0};z.prototype.preventDefault=function(){this.defaultPrevented=!0;this.ga=!1};function va(a,b,c,d,e){this.h=a;this.D=null;this.src=b;this.type=c;this.u=!!d;this.w=e;this.key=++ua;this.m=this.t=!1}function wa(a){a.m=!0;a.h=null;a.D=null;a.src=null;a.w=null};function xa(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var ya=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function za(a){if(!Aa.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(Ba,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(Ca,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(Da,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(Ea,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(Fa,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(Ga,"&#0;"));return a}var Ba=/&/g,Ca=/</g,Da=/>/g,Ea=/"/g,Fa=/'/g,Ga=/\x00/g,Aa=/[\x00&<>"']/;function Ha(a,b){return a<b?-1:a>b?1:0};function Ia(a,b){b.unshift(a);v.call(this,xa.apply(null,b));b.shift()}u(Ia,v);Ia.prototype.name="AssertionError";function Ja(a,b){throw new Ia("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var Ka;function La(){}u(La,ma);function Ma(a){return(a=oa(a))?new ActiveXObject(a):new XMLHttpRequest}function oa(a){if(!a.$&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.$=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.$}Ka=new La;var A=Array.prototype,Na=A.indexOf?function(a,b,c){return A.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Oa=A.forEach?function(a,b,c){A.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Pa(a){var b;a:{b=Qa;for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:q(a)?a.charAt(b):a[b]}function Ra(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};function Sa(a){if("function"==typeof a.v)return a.v();if(q(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return pa(a)}
function Ta(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(da(a)||q(a))Oa(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.v)if(da(a)||q(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=qa(a);else c=void 0;for(var d=Sa(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};function B(a,b){this.e={};this.b=[];this.k=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof B?(c=a.o(),d=a.v()):(c=qa(a),d=pa(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}k=B.prototype;k.v=function(){Ua(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.e[this.b[b]]);return a};k.o=function(){Ua(this);return this.b.concat()};
k.clear=function(){this.e={};this.k=this.b.length=0};k.remove=function(a){return Object.prototype.hasOwnProperty.call(this.e,a)?(delete this.e[a],this.k--,this.b.length>2*this.k&&Ua(this),!0):!1};function Ua(a){if(a.k!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.e,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.k!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
k.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.e,a)?this.e[a]:b};k.set=function(a,b){Object.prototype.hasOwnProperty.call(this.e,a)||(this.k++,this.b.push(a));this.e[a]=b};k.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};k.clone=function(){return new B(this)};function C(a){this.src=a;this.c={};this.G=0}C.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.c[f];a||(a=this.c[f]=[],this.G++);var g=Va(a,b,d,e);-1<g?(b=a[g],c||(b.t=!1)):(b=new va(b,this.src,f,!!d,e),b.t=c,a.push(b));return b};C.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.c))return!1;var e=this.c[a];b=Va(e,b,c,d);return-1<b?(wa(e[b]),A.splice.call(e,b,1),0==e.length&&(delete this.c[a],this.G--),!0):!1};
function Wa(a,b){var c=b.type;if(c in a.c){var d=a.c[c],e=Na(d,b),f;(f=0<=e)&&A.splice.call(d,e,1);f&&(wa(b),0==a.c[c].length&&(delete a.c[c],a.G--))}}C.prototype.P=function(a,b,c,d){a=this.c[a.toString()];var e=-1;a&&(e=Va(a,b,c,d));return-1<e?a[e]:null};function Va(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.m&&f.h==b&&f.u==!!c&&f.w==d)return e}return-1};var D;a:{var Xa=l.navigator;if(Xa){var Ya=Xa.userAgent;if(Ya){D=Ya;break a}}D=""};var Za=-1!=D.indexOf("Opera")||-1!=D.indexOf("OPR"),E=-1!=D.indexOf("Trident")||-1!=D.indexOf("MSIE"),F=-1!=D.indexOf("Gecko")&&-1==D.toLowerCase().indexOf("webkit")&&!(-1!=D.indexOf("Trident")||-1!=D.indexOf("MSIE")),G=-1!=D.toLowerCase().indexOf("webkit");function $a(){var a=l.document;return a?a.documentMode:void 0}
var ab=function(){var a="",b;if(Za&&l.opera)return a=l.opera.version,r(a)?a():a;F?b=/rv\:([^\);]+)(\)|;)/:E?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:G&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(D))?a[1]:"");return E&&(b=$a(),b>parseFloat(a))?String(b):a}(),bb={};
function H(a){var b;if(!(b=bb[a])){b=0;for(var c=ya(String(ab)).split("."),d=ya(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",m=RegExp("(\\d*)(\\D*)","g"),t=RegExp("(\\d*)(\\D*)","g");do{var n=m.exec(g)||["","",""],x=t.exec(h)||["","",""];if(0==n[0].length&&0==x[0].length)break;b=Ha(0==n[1].length?0:parseInt(n[1],10),0==x[1].length?0:parseInt(x[1],10))||Ha(0==n[2].length,0==x[2].length)||Ha(n[2],x[2])}while(0==b)}b=bb[a]=0<=b}return b}
var cb=l.document,db=cb&&E?$a()||("CSS1Compat"==cb.compatMode?parseInt(ab,10):5):void 0;var eb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function fb(a){if(gb){gb=!1;var b=l.location;if(b){var c=b.href;if(c&&(c=(c=fb(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw gb=!0,Error();}}return a.match(eb)}var gb=G;function hb(a){var b;b||(b=ib(a||arguments.callee.caller,[]));return b}
function ib(a,b){var c=[];if(0<=Na(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(jb(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=jb(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(ib(a.caller,
b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")}function jb(a){if(I[a])return I[a];a=String(a);if(!I[a]){var b=/function ([^\(]+)/.exec(a);I[a]=b?b[1]:"[Anonymous]"}return I[a]}var I={};function J(a){this.ba=a;this.Z=this.M=this.q=this.C=null}function K(a,b){this.name=a;this.value=b}K.prototype.toString=function(){return this.name};var kb=new K("SEVERE",1E3),lb=new K("INFO",800),mb=new K("CONFIG",700),nb=new K("FINE",500);k=J.prototype;k.getName=function(){return this.ba};k.getParent=function(){return this.C};k.ha=function(a){this.q=a};function ob(a){if(a.q)return a.q;if(a.C)return ob(a.C);Ja("Root logger has no level set.");return null}
k.log=function(a,b,c){if(a.value>=ob(this).value)for(r(b)&&(b=b()),a=this.ua(a,b,c,J.prototype.log),b="log:"+a.wa,l.console&&(l.console.timeStamp?l.console.timeStamp(b):l.console.markTimeline&&l.console.markTimeline(b)),l.msWriteProfilerMark&&l.msWriteProfilerMark(b),b=this;b;){c=b;var d=a;if(c.Z)for(var e=0,f=void 0;f=c.Z[e];e++)f(d);b=b.getParent()}};
k.ua=function(a,b,c,d){var e=new w(a,String(b),this.ba);if(c){var f;f=d||arguments.callee.caller;e.X=c;var g;try{var h;var m=ba("window.location.href");if(q(c))h={message:c,name:"Unknown error",lineNumber:"Not available",fileName:m,stack:"Not available"};else{var t,n,x=!1;try{t=c.lineNumber||c.Ea||"Not available"}catch(gc){t="Not available",x=!0}try{n=c.fileName||c.filename||c.sourceURL||l.$googDebugFname||m}catch(hc){n="Not available",x=!0}h=!x&&c.lineNumber&&c.fileName&&c.stack&&c.message&&c.name?
c:{message:c.message||"Not available",name:c.name||"UnknownError",lineNumber:t,fileName:n,stack:c.stack||"Not available"}}g="Message: "+za(h.message)+'\nUrl: <a href="view-source:'+h.fileName+'" target="_new">'+h.fileName+"</a>\nLine: "+h.lineNumber+"\n\nBrowser stack:\n"+za(h.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+za(hb(f)+"-> ")}catch(Wb){g="Exception trying to expose exception! You win, we lose. "+Wb}e.W=g}return e};k.info=function(a,b){this.log(lb,a,b)};var pb={},L=null;
function qb(a){L||(L=new J(""),pb[""]=L,L.ha(mb));var b;if(!(b=pb[a])){b=new J(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=qb(a.substr(0,c));c.M||(c.M={});c.M[d]=b;b.C=c;pb[a]=b}return b};function M(a,b){a&&a.log(nb,b,void 0)};var rb;(rb=!E)||(rb=E&&9<=db);var sb=rb,tb=E&&!H("9");!G||H("528");F&&H("1.9b")||E&&H("8")||Za&&H("9.5")||G&&H("528");F&&!H("8")||E&&H("9");function N(a,b){z.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.n=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(F){var e;a:{try{ja(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=G||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=G||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.n=a;a.defaultPrevented&&this.preventDefault()}}u(N,z);N.prototype.stopPropagation=function(){N.ia.stopPropagation.call(this);this.n.stopPropagation?this.n.stopPropagation():this.n.cancelBubble=!0};N.prototype.preventDefault=function(){N.ia.preventDefault.call(this);var a=this.n;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,tb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var ub="closure_lm_"+(1E6*Math.random()|0),vb={},wb=0;function O(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)O(a,b[f],c,d,e);else if(c=xb(c),a&&a[y])a.l.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=P(a);g||(a[ub]=g=new C(a));c=g.add(b,c,!1,d,e);c.D||(d=yb(),c.D=d,d.src=a,d.h=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(zb(b.toString()),d),wb++)}}
function yb(){var a=Ab,b=sb?function(c){return a.call(b.src,b.h,c)}:function(c){c=a.call(b.src,b.h,c);if(!c)return c};return b}function Bb(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)Bb(a,b[f],c,d,e);else c=xb(c),a&&a[y]?a.l.remove(String(b),c,d,e):a&&(a=P(a))&&(b=a.P(b,c,!!d,e))&&Cb(b)}
function Cb(a){if("number"!=typeof a&&a&&!a.m){var b=a.src;if(b&&b[y])Wa(b.l,a);else{var c=a.type,d=a.D;b.removeEventListener?b.removeEventListener(c,d,a.u):b.detachEvent&&b.detachEvent(zb(c),d);wb--;(c=P(b))?(Wa(c,a),0==c.G&&(c.src=null,b[ub]=null)):wa(a)}}}function zb(a){return a in vb?vb[a]:vb[a]="on"+a}function Db(a,b,c,d){var e=1;if(a=P(a))if(b=a.c[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.u==c&&!f.m&&(e&=!1!==Eb(f,d))}return Boolean(e)}
function Eb(a,b){var c=a.h,d=a.w||a.src;a.t&&Cb(a);return c.call(d,b)}
function Ab(a,b){if(a.m)return!0;if(!sb){var c=b||ba("window.event"),d=new N(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,h=c.length-1;!d.i&&0<=h;h--)d.currentTarget=c[h],e&=Db(c[h],f,!0,d);for(h=0;!d.i&&h<c.length;h++)d.currentTarget=c[h],e&=Db(c[h],f,!1,d)}return e}return Eb(a,new N(b,this))}
function P(a){a=a[ub];return a instanceof C?a:null}var Fb="__closure_events_fn_"+(1E9*Math.random()>>>0);function xb(a){if(r(a))return a;a[Fb]||(a[Fb]=function(b){return a.handleEvent(b)});return a[Fb]};function Q(){ka.call(this);this.l=new C(this);this.ra=this;this.da=null}u(Q,ka);Q.prototype[y]=!0;Q.prototype.addEventListener=function(a,b,c,d){O(this,a,b,c,d)};Q.prototype.removeEventListener=function(a,b,c,d){Bb(this,a,b,c,d)};
Q.prototype.dispatchEvent=function(a){var b,c=this.da;if(c)for(b=[];c;c=c.da)b.push(c);var c=this.ra,d=a.type||a;if(q(a))a=new z(a,c);else if(a instanceof z)a.target=a.target||c;else{var e=a;a=new z(d,c);sa(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.i&&0<=g;g--)f=a.currentTarget=b[g],e=Gb(f,d,!0,a)&&e;a.i||(f=a.currentTarget=c,e=Gb(f,d,!0,a)&&e,a.i||(e=Gb(f,d,!1,a)&&e));if(b)for(g=0;!a.i&&g<b.length;g++)f=a.currentTarget=b[g],e=Gb(f,d,!1,a)&&e;return e};
function Gb(a,b,c,d){b=a.l.c[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.m&&g.u==c){var h=g.h,m=g.w||g.src;g.t&&Wa(a.l,g);e=!1!==h.call(m,d)&&e}}return e&&0!=d.ga}Q.prototype.P=function(a,b,c,d){return this.l.P(String(a),b,c,d)};function Hb(a,b,c){if(r(a))c&&(a=s(a,c));else if(a&&"function"==typeof a.handleEvent)a=s(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:l.setTimeout(a,b||0)};function Ib(a){Q.call(this);this.headers=new B;this.J=a||null;this.j=!1;this.I=this.a=null;this.g=this.aa=this.B="";this.p=this.Q=this.A=this.O=!1;this.r=0;this.F=null;this.fa=Jb;this.H=this.Ba=!1}u(Ib,Q);var Jb="",Kb=Ib.prototype,Lb=qb("goog.net.XhrIo");Kb.d=Lb;var Mb=/^https?$/i,Nb=["POST","PUT"];k=Ib.prototype;
k.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.B+"; newUri="+a);b=b?b.toUpperCase():"GET";this.B=a;this.g="";this.aa=b;this.O=!1;this.j=!0;this.a=this.J?Ma(this.J):Ma(Ka);this.I=this.J?na(this.J):na(Ka);this.a.onreadystatechange=s(this.ca,this);try{M(this.d,R(this,"Opening Xhr")),this.Q=!0,this.a.open(b,String(a),!0),this.Q=!1}catch(e){M(this.d,R(this,"Error opening Xhr: "+e.message));Ob(this,e);return}a=c||"";var f=this.headers.clone();
d&&Ta(d,function(a,b){f.set(b,a)});d=Pa(f.o());c=l.FormData&&a instanceof l.FormData;!(0<=Na(Nb,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.fa&&(this.a.responseType=this.fa);"withCredentials"in this.a&&(this.a.withCredentials=this.Ba);try{Pb(this),0<this.r&&(this.H=Qb(this.a),M(this.d,R(this,"Will abort after "+this.r+"ms if incomplete, xhr2 "+this.H)),this.H?(this.a.timeout=this.r,this.a.ontimeout=
s(this.ka,this)):this.F=Hb(this.ka,this.r,this)),M(this.d,R(this,"Sending request")),this.A=!0,this.a.send(a),this.A=!1}catch(g){M(this.d,R(this,"Send error: "+g.message)),Ob(this,g)}};function Qb(a){return E&&H(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Qa(a){return"content-type"==a.toLowerCase()}k.ka=function(){"undefined"!=typeof aa&&this.a&&(this.g="Timed out after "+this.r+"ms, aborting",M(this.d,R(this,this.g)),this.dispatchEvent("timeout"),this.abort(8))};
function Ob(a,b){a.j=!1;a.a&&(a.p=!0,a.a.abort(),a.p=!1);a.g=b;Rb(a);Sb(a)}function Rb(a){a.O||(a.O=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}k.abort=function(){this.a&&this.j&&(M(this.d,R(this,"Aborting")),this.j=!1,this.p=!0,this.a.abort(),this.p=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Sb(this))};k.ca=function(){this.N||(this.Q||this.A||this.p?Tb(this):this.ya())};k.ya=function(){Tb(this)};
function Tb(a){if(a.j&&"undefined"!=typeof aa)if(a.I[1]&&4==S(a)&&2==Ub(a))M(a.d,R(a,"Local request error detected and ignored"));else if(a.A&&4==S(a))Hb(a.ca,0,a);else if(a.dispatchEvent("readystatechange"),4==S(a)){M(a.d,R(a,"Request complete"));a.j=!1;try{if(Vb(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<S(a)?a.a.statusText:""}catch(c){M(a.d,"Can not get status: "+c.message),b=""}a.g=b+" ["+Ub(a)+"]";Rb(a)}}finally{Sb(a)}}}
function Sb(a){if(a.a){Pb(a);var b=a.a,c=a.I[0]?ca:null;a.a=null;a.I=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){(a=a.d)&&a.log(kb,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}function Pb(a){a.a&&a.H&&(a.a.ontimeout=null);"number"==typeof a.F&&(l.clearTimeout(a.F),a.F=null)}
function Vb(a){var b=Ub(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=fb(String(a.B))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Mb.test(a?a.toLowerCase():"");c=b}return c}function S(a){return a.a?a.a.readyState:0}function Ub(a){try{return 2<S(a)?a.a.status:-1}catch(b){return-1}}k.getResponseHeader=function(a){return this.a&&4==S(this)?this.a.getResponseHeader(a):void 0};
k.getAllResponseHeaders=function(){return this.a&&4==S(this)?this.a.getAllResponseHeaders():""};function R(a,b){return b+" ["+a.aa+" "+a.B+" "+Ub(a)+"]"};google.load("visualization","1",{packages:["table","corechart","annotatedtimeline"]});
function T(a){this.a=a||new Ib;this.f=[];this.T=this.Y=this.s=!1;this.L={};for(var b in U)document.getElementById(U[b]).className="pagespeed-hidden-offscreen";a=document.createElement("table");a.id="nav-bar";a.className="pagespeed-sub-tabs";a.innerHTML='<tr><td><a id="'+Xb+'" href="javascript:void(0);">Per application cache stats</a> - </td><td><a id="'+Yb+'" href="javascript:void(0);">Per type cache stats</a> - </td><td><a id="'+Zb+'" href="javascript:void(0);">IPRO status</a> - </td><td><a id="'+
$b+'" href="javascript:void(0);">Image rewriting</a> - </td><td><a id="'+ac+'" href="javascript:void(0);">Realtime</a></td></tr>';b=document.createElement("div");b.id="ui-div";b.innerHTML='<table id="ui-table" border=1 style="border-collapse: collapse;border-color:silver;"><tr valign="center"><td>Auto refresh (every 5 seconds): <input type="checkbox" id="auto-refresh" '+(this.s?"checked":"")+"></td></tr></table>";document.body.insertBefore(b,document.getElementById(V));document.body.insertBefore(a,
document.getElementById("ui-div"))}T.prototype.show=function(a){for(var b in U){var c=U[b];document.getElementById(c).className=c==a?"":"pagespeed-hidden-offscreen"}c=document.getElementById(a+"_mode");for(b in bc){var d=document.getElementById(bc[b]);d.className=d==c?"pagespeed-underline-link":""}location.href=location.href.split("#")[0]+"#"+a};T.prototype.ea=function(){var a=location.hash.substr(1);if(""==a)this.show(V);else{var b;a:{b=U;for(var c in b)if(b[c]==a){b=!0;break a}b=!1}b&&this.show(a)}};
var Xb="cache_applied_mode",Yb="cache_type_mode",Zb="ipro_mode",$b="image_rewriting_mode",ac="realtime_mode",bc={la:Xb,ma:Yb,oa:Zb,qa:$b,pa:ac},V="cache_applied",U={la:V,ma:"cache_type",oa:"ipro",qa:"image_rewriting",pa:"realtime"};T.prototype.Aa=function(){this.s=!this.s};
T.prototype.S=function(){if(!this.a.a)if(!this.Y){this.Y=!0;var a=new Date,b;b="?json&start_time="+(new Date(a-864E5)).getTime();b+="&end_time="+a.getTime();this.a.send(b+"&granularity=5000")}else if(!this.T||this.s)this.T=!0,a=location.pathname,b=a.lastIndexOf("/",a.length-2),this.a.send(0<b?a.substring(0,b)+"/stats_json":a+"/stats_json")};
T.prototype.za=function(){if(Vb(this.a)){var a;var b=this.a;try{a=b.a?b.a.responseText:""}catch(c){M(b.d,"Can not get responseText: "+c.message),a=""}if(this.T){var d=JSON.parse(a).variables;a=[];for(var e in d)a.push({name:e,value:d[e]});this.f.push({R:a,ja:new Date});17280<this.f.length&&this.f.shift();W(this,"pcache-cohorts-dom","Property cache dom cohorts",V);W(this,"pcache-cohorts-beacon","Property cache beacon cohorts",V);W(this,"rewrite_cached_output","Rewrite cached output",V);W(this,"url_input",
"URL Input",V);W(this,"cache","Cache","cache_type");W(this,"file_cache","File Cache","cache_type");W(this,"memcached","Memcached","cache_type");W(this,"lru_cache","LRU","cache_type");W(this,"shm_cache","Shared Memory","cache_type");W(this,"ipro","In place resource optimization","ipro");W(this,"image_rewrite","Image rewrite","image_rewriting");W(this,"image_rewrites_dropped","Image rewrites dropped","image_rewriting");X(this,"http","Http");X(this,"file_cache","File Cache RT");X(this,"lru_cache","LRU Cache RT");
X(this,"serf_fetch","Serf stats RT");X(this,"rewrite","Rewrite stats RT")}else{a=JSON.parse(a);e=a.timestamps;a=a.variables;for(b=0;b<e.length;++b){var f=[];for(d in a)f.push({name:d,value:a[d][b]});this.f.push({R:f,ja:new Date(e[b])})}window.setTimeout(s(this.S,this),0)}}else d=this.a,console.log(q(d.g)?d.g:String(d.g))};
function cc(a,b){var c=!0;0!=b.indexOf(a)?c=!1:0<=b.indexOf("cache_flush_timestamp_ms")?c=!1:0<=b.indexOf("cache_flush_count")?c=!1:0<=b.indexOf("cache_time_us")&&(c=!1);return c}
function dc(a,b,c,d,e){if(a.L[c])d=a.L[c];else{e=document.getElementById(e);"Loading Charts..."==e.textContent&&(e.textContent="");var f=document.createElement("div");"AnnotatedTimeLine"==d&&(f.className="pagespeed-graphs-chart");f.id=b;b=document.createElement("p");b.textContent=c;b.className="pagespeed-graphs-title";e.appendChild(b);e.appendChild(f);d=new google.U[d](f);a.L[c]=d}return d}
function W(a,b,c,d){var e="pagespeed-graphs-"+b;b+="_";c=dc(a,e,c,"BarChart",d);e=document.getElementById(e);d=[];for(var f=new google.U.na,g=Ra(a.f[a.f.length-1].R),h=a=0;h<g.length;++h)if(cc(b,g[h].name)){++a;var m=g[h].name.substring(b.length),m=m.replace(/_/g," ");d.push([m,Number(g[h].value)])}f.K("string","Name");f.K("number","Value");f.sa(d);b=new google.U.DataView(f);b.Fa([0,1,{calc:function(a,b){for(var c=0,d=0;d<a.Da();++d)c+=a.va(d,1);d=a.va(b,1);return d.toString()+" ("+(100*d/(0==c?1:
c)).toFixed(2).toString()+"%)"},type:"string",role:"annotation"}]);a=40*a+10;e.style.height=a+20;c.ta(b,{annotations:{alwaysOutside:!0,highContrast:!0,textStyle:{fontSize:12,color:"black"}},hAxis:{direction:1},vAxis:{textPosition:"out"},legend:{position:"none"},width:800,height:a,chartArea:{left:225,top:0,width:"60%",height:"80%"}})}
function X(a,b,c){var d=b+"_";b=dc(a,"pagespeed-graphs-"+b,c,"AnnotatedTimeLine","realtime");c=[];var e=new google.U.na;e.K("datetime","Time");for(var f=!0,g=0;g<a.f.length;++g){var h=Ra(a.f[g].R),m=[];m.push(a.f[g].ja);for(var t=0;t<h.length;++t)if(cc(d,h[t].name)&&(m.push(Number(h[t].value)),f)){var n=h[t].name.substring(d.length),n=n.replace(/_/g," ");e.K("number",n)}f=!1;c.push(m)}e.sa(c);b.ta(e,ec)}var ec={thickness:1,displayExactValues:!0,legendPosition:"newRow"};
function fc(){O(window,"load",function(){var a=new T;a.ea();for(var b in U)O(document.getElementById(bc[b]),"click",s(a.show,a,U[b]));O(window,"hashchange",s(a.ea,a));O(document.getElementById("auto-refresh"),"change",s(a.Aa,a));O(a.a,"complete",s(a.za,a));setInterval(a.S.bind(a),5E3);a.S()})}var Y=["pagespeed","Graphs","Start"],Z=l;Y[0]in Z||!Z.execScript||Z.execScript("var "+Y[0]);for(var $;Y.length&&($=Y.shift());)Y.length||void 0===fc?Z=Z[$]?Z[$]:Z[$]={}:Z[$]=fc;})();
