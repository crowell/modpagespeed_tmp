(function(){var h,l=l||{},m=this;function aa(a,b){var c=a.split("."),d=m;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b}function ba(){}
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function p(a){var b=n(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function r(a){return"function"==n(a)}var ca="closure_uid_"+(1E9*Math.random()>>>0),da=0;function ea(a,b,c){return a.call.apply(a.bind,arguments)}
function fa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function t(a,b,c){t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return t.apply(null,arguments)}var ga=Date.now||function(){return+new Date};
function u(a,b){function c(){}c.prototype=b.prototype;a.ba=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.ra=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};function v(a){v[" "](a);return a}v[" "]=ba;function w(){0!=ha&&(this[ca]||(this[ca]=++da));this.L=this.L;this.ja=this.ja}var ha=0;w.prototype.L=!1;function ia(){}ia.prototype.Q=null;function ja(a){var b;(b=a.Q)||(b={},ka(a)&&(b[0]=!0,b[1]=!0),b=a.Q=b);return b};function la(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ma(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var na="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function oa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<na.length;f++)c=na[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function x(a){if(Error.captureStackTrace)Error.captureStackTrace(this,x);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}u(x,Error);x.prototype.name="CustomError";function z(a,b,c,d,e){this.reset(a,b,c,d,e)}z.prototype.R=null;var pa=0;z.prototype.reset=function(a,b,c,d,e){"number"==typeof e||pa++;d||ga();this.q=a;this.ia=b;delete this.R};z.prototype.aa=function(a){this.q=a};var A="closure_listenable_"+(1E6*Math.random()|0),qa=0;function B(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.i=!1;this.$=!0}B.prototype.stopPropagation=function(){this.i=!0};B.prototype.preventDefault=function(){this.defaultPrevented=!0;this.$=!1};function ra(a,b,c,d,e){this.h=a;this.D=null;this.src=b;this.type=c;this.u=!!d;this.w=e;this.key=++qa;this.m=this.t=!1}function sa(a){a.m=!0;a.h=null;a.D=null;a.src=null;a.w=null};function ta(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var ua=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function va(a,b){return a<b?-1:a>b?1:0};function wa(a,b){b.unshift(a);x.call(this,ta.apply(null,b));b.shift()}u(wa,x);wa.prototype.name="AssertionError";function xa(a,b){throw new wa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var ya;function za(){}u(za,ia);function Aa(a){return(a=ka(a))?new ActiveXObject(a):new XMLHttpRequest}function ka(a){if(!a.T&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.T=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.T}ya=new za;var C=Array.prototype,Ba=C.indexOf?function(a,b,c){return C.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ca=C.forEach?function(a,b,c){C.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Da(a){var b;a:{b=Ea;for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:q(a)?a.charAt(b):a[b]};function Fa(a){if("function"==typeof a.v)return a.v();if(q(a))return a.split("");if(p(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return la(a)}function Ga(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(p(a)||q(a))Ca(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.v)if(p(a)||q(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=ma(a);else c=void 0;for(var d=Fa(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};function D(a,b){this.e={};this.b=[];this.k=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof D?(c=a.o(),d=a.v()):(c=ma(a),d=la(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}h=D.prototype;h.v=function(){Ha(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.e[this.b[b]]);return a};h.o=function(){Ha(this);return this.b.concat()};
h.clear=function(){this.e={};this.k=this.b.length=0};h.remove=function(a){return Object.prototype.hasOwnProperty.call(this.e,a)?(delete this.e[a],this.k--,this.b.length>2*this.k&&Ha(this),!0):!1};function Ha(a){if(a.k!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.e,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.k!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
h.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.e,a)?this.e[a]:b};h.set=function(a,b){Object.prototype.hasOwnProperty.call(this.e,a)||(this.k++,this.b.push(a));this.e[a]=b};h.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new D(this)};function E(a){this.src=a;this.c={};this.G=0}E.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.c[f];a||(a=this.c[f]=[],this.G++);var g=Ia(a,b,d,e);-1<g?(b=a[g],c||(b.t=!1)):(b=new ra(b,this.src,f,!!d,e),b.t=c,a.push(b));return b};E.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.c))return!1;var e=this.c[a];b=Ia(e,b,c,d);return-1<b?(sa(e[b]),C.splice.call(e,b,1),0==e.length&&(delete this.c[a],this.G--),!0):!1};
function Ja(a,b){var c=b.type;if(c in a.c){var d=a.c[c],e=Ba(d,b),f;(f=0<=e)&&C.splice.call(d,e,1);f&&(sa(b),0==a.c[c].length&&(delete a.c[c],a.G--))}}E.prototype.N=function(a,b,c,d){a=this.c[a.toString()];var e=-1;a&&(e=Ia(a,b,c,d));return-1<e?a[e]:null};function Ia(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.m&&f.h==b&&f.u==!!c&&f.w==d)return e}return-1};var F;a:{var Ka=m.navigator;if(Ka){var La=Ka.userAgent;if(La){F=La;break a}}F=""};var Ma=-1!=F.indexOf("Opera")||-1!=F.indexOf("OPR"),G=-1!=F.indexOf("Trident")||-1!=F.indexOf("MSIE"),J=-1!=F.indexOf("Gecko")&&-1==F.toLowerCase().indexOf("webkit")&&!(-1!=F.indexOf("Trident")||-1!=F.indexOf("MSIE")),K=-1!=F.toLowerCase().indexOf("webkit");function Na(){var a=m.document;return a?a.documentMode:void 0}
var Oa=function(){var a="",b;if(Ma&&m.opera)return a=m.opera.version,r(a)?a():a;J?b=/rv\:([^\);]+)(\)|;)/:G?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:K&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(F))?a[1]:"");return G&&(b=Na(),b>parseFloat(a))?String(b):a}(),Pa={};
function L(a){var b;if(!(b=Pa[a])){b=0;for(var c=ua(String(Oa)).split("."),d=ua(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",y=RegExp("(\\d*)(\\D*)","g"),yb=RegExp("(\\d*)(\\D*)","g");do{var H=y.exec(g)||["","",""],I=yb.exec(k)||["","",""];if(0==H[0].length&&0==I[0].length)break;b=va(0==H[1].length?0:parseInt(H[1],10),0==I[1].length?0:parseInt(I[1],10))||va(0==H[2].length,0==I[2].length)||va(H[2],I[2])}while(0==b)}b=Pa[a]=0<=b}return b}
var Qa=m.document,Ra=Qa&&G?Na()||("CSS1Compat"==Qa.compatMode?parseInt(Oa,10):5):void 0;var Sa=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function Ta(a){if(Ua){Ua=!1;var b=m.location;if(b){var c=b.href;if(c&&(c=(c=Ta(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw Ua=!0,Error();}}return a.match(Sa)}var Ua=K;var Va;(Va=!G)||(Va=G&&9<=Ra);var Wa=Va,Xa=G&&!L("9");!K||L("528");J&&L("1.9b")||G&&L("8")||Ma&&L("9.5")||K&&L("528");J&&!L("8")||G&&L("9");function M(a,b){B.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.n=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(J){var e;a:{try{v(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=K||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=K||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.n=a;a.defaultPrevented&&this.preventDefault()}}u(M,B);M.prototype.stopPropagation=function(){M.ba.stopPropagation.call(this);this.n.stopPropagation?this.n.stopPropagation():this.n.cancelBubble=!0};M.prototype.preventDefault=function(){M.ba.preventDefault.call(this);var a=this.n;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Xa)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Ya="closure_lm_"+(1E6*Math.random()|0),Za={},$a=0;function N(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)N(a,b[f],c,d,e);else if(c=ab(c),a&&a[A])a.l.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=O(a);g||(a[Ya]=g=new E(a));c=g.add(b,c,!1,d,e);c.D||(d=bb(),c.D=d,d.src=a,d.h=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(cb(b.toString()),d),$a++)}}
function bb(){var a=db,b=Wa?function(c){return a.call(b.src,b.h,c)}:function(c){c=a.call(b.src,b.h,c);if(!c)return c};return b}function eb(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)eb(a,b[f],c,d,e);else c=ab(c),a&&a[A]?a.l.remove(String(b),c,d,e):a&&(a=O(a))&&(b=a.N(b,c,!!d,e))&&fb(b)}
function fb(a){if("number"!=typeof a&&a&&!a.m){var b=a.src;if(b&&b[A])Ja(b.l,a);else{var c=a.type,d=a.D;b.removeEventListener?b.removeEventListener(c,d,a.u):b.detachEvent&&b.detachEvent(cb(c),d);$a--;(c=O(b))?(Ja(c,a),0==c.G&&(c.src=null,b[Ya]=null)):sa(a)}}}function cb(a){return a in Za?Za[a]:Za[a]="on"+a}function gb(a,b,c,d){var e=!0;if(a=O(a))if(b=a.c[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.u==c&&!f.m&&(f=hb(f,d),e=e&&!1!==f)}return e}
function hb(a,b){var c=a.h,d=a.w||a.src;a.t&&fb(a);return c.call(d,b)}
function db(a,b){if(a.m)return!0;if(!Wa){var c;if(!(c=b))a:{c=["window","event"];for(var d=m,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new M(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,k=e.length-1;!c.i&&0<=k;k--){c.currentTarget=e[k];var y=gb(e[k],f,!0,c),d=d&&y}for(k=0;!c.i&&k<e.length;k++)c.currentTarget=
e[k],y=gb(e[k],f,!1,c),d=d&&y}return d}return hb(a,new M(b,this))}function O(a){a=a[Ya];return a instanceof E?a:null}var ib="__closure_events_fn_"+(1E9*Math.random()>>>0);function ab(a){if(r(a))return a;a[ib]||(a[ib]=function(b){return a.handleEvent(b)});return a[ib]};function P(){w.call(this);this.l=new E(this);this.ha=this;this.X=null}u(P,w);P.prototype[A]=!0;P.prototype.addEventListener=function(a,b,c,d){N(this,a,b,c,d)};P.prototype.removeEventListener=function(a,b,c,d){eb(this,a,b,c,d)};
P.prototype.dispatchEvent=function(a){var b,c=this.X;if(c)for(b=[];c;c=c.X)b.push(c);var c=this.ha,d=a.type||a;if(q(a))a=new B(a,c);else if(a instanceof B)a.target=a.target||c;else{var e=a;a=new B(d,c);oa(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.i&&0<=g;g--)f=a.currentTarget=b[g],e=Q(f,d,!0,a)&&e;a.i||(f=a.currentTarget=c,e=Q(f,d,!0,a)&&e,a.i||(e=Q(f,d,!1,a)&&e));if(b)for(g=0;!a.i&&g<b.length;g++)f=a.currentTarget=b[g],e=Q(f,d,!1,a)&&e;return e};
function Q(a,b,c,d){b=a.l.c[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.m&&g.u==c){var k=g.h,y=g.w||g.src;g.t&&Ja(a.l,g);e=!1!==k.call(y,d)&&e}}return e&&0!=d.$}P.prototype.N=function(a,b,c,d){return this.l.N(String(a),b,c,d)};function jb(a,b,c){if(r(a))c&&(a=t(a,c));else if(a&&"function"==typeof a.handleEvent)a=t(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:m.setTimeout(a,b||0)};function kb(a){this.V=a;this.S=this.K=this.q=this.C=null}function R(a,b){this.name=a;this.value=b}R.prototype.toString=function(){return this.name};var lb=new R("SEVERE",1E3),mb=new R("INFO",800),nb=new R("CONFIG",700),ob=new R("FINE",500);h=kb.prototype;h.getName=function(){return this.V};h.getParent=function(){return this.C};h.aa=function(a){this.q=a};function pb(a){if(a.q)return a.q;if(a.C)return pb(a.C);xa("Root logger has no level set.");return null}
h.log=function(a,b,c){if(a.value>=pb(this).value)for(r(b)&&(b=b()),a=new z(a,String(b),this.V),c&&(a.R=c),c="log:"+a.ia,m.console&&(m.console.timeStamp?m.console.timeStamp(c):m.console.markTimeline&&m.console.markTimeline(c)),m.msWriteProfilerMark&&m.msWriteProfilerMark(c),c=this;c;){b=c;var d=a;if(b.S)for(var e=0,f=void 0;f=b.S[e];e++)f(d);c=c.getParent()}};h.info=function(a,b){this.log(mb,a,b)};var qb={},S=null;
function rb(a){S||(S=new kb(""),qb[""]=S,S.aa(nb));var b;if(!(b=qb[a])){b=new kb(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=rb(a.substr(0,c));c.K||(c.K={});c.K[d]=b;b.C=c;qb[a]=b}return b};function T(a,b){a&&a.log(ob,b,void 0)};function U(a){P.call(this);this.headers=new D;this.J=a||null;this.j=!1;this.I=this.a=null;this.g=this.U=this.B="";this.p=this.O=this.A=this.M=!1;this.s=0;this.F=null;this.Z=sb;this.H=this.qa=!1}u(U,P);var sb="",tb=U.prototype,ub=rb("goog.net.XhrIo");tb.d=ub;var vb=/^https?$/i,wb=["POST","PUT"];h=U.prototype;
h.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.B+"; newUri="+a);b=b?b.toUpperCase():"GET";this.B=a;this.g="";this.U=b;this.M=!1;this.j=!0;this.a=this.J?Aa(this.J):Aa(ya);this.I=this.J?ja(this.J):ja(ya);this.a.onreadystatechange=t(this.W,this);try{T(this.d,V(this,"Opening Xhr")),this.O=!0,this.a.open(b,String(a),!0),this.O=!1}catch(e){T(this.d,V(this,"Error opening Xhr: "+e.message));xb(this,e);return}a=c||"";var f=this.headers.clone();
d&&Ga(d,function(a,b){f.set(b,a)});d=Da(f.o());c=m.FormData&&a instanceof m.FormData;!(0<=Ba(wb,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.Z&&(this.a.responseType=this.Z);"withCredentials"in this.a&&(this.a.withCredentials=this.qa);try{zb(this),0<this.s&&(this.H=Ab(this.a),T(this.d,V(this,"Will abort after "+this.s+"ms if incomplete, xhr2 "+this.H)),this.H?(this.a.timeout=this.s,this.a.ontimeout=
t(this.ca,this)):this.F=jb(this.ca,this.s,this)),T(this.d,V(this,"Sending request")),this.A=!0,this.a.send(a),this.A=!1}catch(g){T(this.d,V(this,"Send error: "+g.message)),xb(this,g)}};function Ab(a){return G&&L(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Ea(a){return"content-type"==a.toLowerCase()}h.ca=function(){"undefined"!=typeof l&&this.a&&(this.g="Timed out after "+this.s+"ms, aborting",T(this.d,V(this,this.g)),this.dispatchEvent("timeout"),this.abort(8))};
function xb(a,b){a.j=!1;a.a&&(a.p=!0,a.a.abort(),a.p=!1);a.g=b;Bb(a);Cb(a)}function Bb(a){a.M||(a.M=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}h.abort=function(){this.a&&this.j&&(T(this.d,V(this,"Aborting")),this.j=!1,this.p=!0,this.a.abort(),this.p=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Cb(this))};h.W=function(){this.L||(this.O||this.A||this.p?Db(this):this.ka())};h.ka=function(){Db(this)};
function Db(a){if(a.j&&"undefined"!=typeof l)if(a.I[1]&&4==W(a)&&2==X(a))T(a.d,V(a,"Local request error detected and ignored"));else if(a.A&&4==W(a))jb(a.W,0,a);else if(a.dispatchEvent("readystatechange"),4==W(a)){T(a.d,V(a,"Request complete"));a.j=!1;try{if(Eb(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<W(a)?a.a.statusText:""}catch(c){T(a.d,"Can not get status: "+c.message),b=""}a.g=b+" ["+X(a)+"]";Bb(a)}}finally{Cb(a)}}}
function Cb(a){if(a.a){zb(a);var b=a.a,c=a.I[0]?ba:null;a.a=null;a.I=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){(a=a.d)&&a.log(lb,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}function zb(a){a.a&&a.H&&(a.a.ontimeout=null);"number"==typeof a.F&&(m.clearTimeout(a.F),a.F=null)}
function Eb(a){var b=X(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=Ta(String(a.B))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!vb.test(a?a.toLowerCase():"");c=b}return c}function W(a){return a.a?a.a.readyState:0}function X(a){try{return 2<W(a)?a.a.status:-1}catch(b){return-1}}h.getResponseHeader=function(a){return this.a&&4==W(this)?this.a.getResponseHeader(a):void 0};
h.getAllResponseHeaders=function(){return this.a&&4==W(this)?this.a.getAllResponseHeaders():""};function V(a,b){return b+" ["+a.U+" "+a.B+" "+X(a)+"]"};function Fb(a){this.a=a||new U;this.f="";this.r=!1;a=document.createElement("table");a.id="nav-bar";a.className="pagespeed-sub-tabs";a.innerHTML='<tr><td><a id="'+Gb+'" href="javascript:void(0);">Show Metadata Cache</a> - </td><td><a id="'+Hb+'" href="javascript:void(0);">Show Cache Structure</a> - </td><td><a id="'+Ib+'" href="javascript:void(0);">Physical Caches</a> - </td><td><a id="'+Jb+'" href="javascript:void(0);">Purge Cache</a></td></tr>';document.body.insertBefore(a,document.getElementById(Y));
a=document.createElement("pre");a.id=Kb;a.className="pagespeed-caches-result";document.getElementById(Y).appendChild(a);a=document.createElement("div");a.id=Lb;a.className="pagespeed-caches-result";var b=document.getElementById(Mb);b.insertBefore(a,b.firstChild)}
aa("pagespeed.Caches.toggleDetail",function(a){var b=document.getElementById(a+"_summary"),c=document.getElementById(a+"_detail");document.getElementById(a+"_toggle").checked?(b.style.display="none",c.style.display="block"):(b.style.display="block",c.style.display="none")});
var Gb="show_metadata_mode",Hb="cache_struct_mode",Ib="physical_cache_mode",Jb="purge_cache_mode",Nb={ea:Gb,da:Hb,fa:Ib,ga:Jb},Y="show_metadata",Mb="purge_cache",Z={ea:Y,da:"cache_struct",fa:"physical_cache",ga:Mb},Kb="metadata_result",Lb="purge_result";h=Fb.prototype;h.Y=function(){var a=location.hash.substr(1);if(""==a)this.show(Y);else{var b;a:{for(b in Z)if(Z[b]==a){b=!0;break a}b=!1}b&&this.show(a)}};
h.show=function(a){for(var b in Z){var c=Z[b];document.getElementById(c).className=c==a?"":"pagespeed-hidden-offscreen"}c=document.getElementById(a+"_mode");for(b in Nb){var d=document.getElementById(Nb[b]);d.className=d==c?"pagespeed-underline-link":""}location.href=location.href.split("#")[0]+"#"+a};h.na=function(){if(!this.a.a){var a=encodeURIComponent(document.getElementById("purge_text").value.trim());this.f="*"==a?"purge_all":"purge_text";this.a.send("?purge="+a)}};
h.ma=function(){this.a.a||(this.f="purge_all",this.a.send("?purge=*"))};h.P=function(){this.a.a||(this.f="purge_table",this.a.send("?new_set="))};h.la=function(a){this.a.a||(a.preventDefault(),a="?url="+encodeURIComponent(document.getElementById("metadata_text").value.trim())+"&user_agent="+encodeURIComponent(document.getElementById("user_agent").value.trim())+"&json=1",this.f=Kb,this.a.send(a))};h.pa=function(){this.r=!this.r;this.P()};
h.oa=function(){if(Eb(this.a)){var a;var b=this.a;try{a=b.a?b.a.responseText:""}catch(c){T(b.d,"Can not get responseText: "+c.message),a=""}if(this.f==Kb)a=JSON.parse(a.substring(4)).value,document.getElementById(this.f).textContent=a;else if("purge_table"==this.f){if(a=a.split("\n"),b=a.shift(),document.getElementById("purge_global").textContent="Everything before this time stamp is invalid: "+b.split("@")[1],b=document.getElementById("purge_table"),b.innerHTML="",0<a.length){b.appendChild(document.createElement("hr"));
var d=document.createElement("table");this.r&&a.reverse();for(var e=0;e<a.length;++e){var f=a[e].lastIndexOf("@"),g=a[e].substring(0,f),k=a[e].substring(f+1),f=d.insertRow(-1);f.insertCell(0).textContent=k;k=document.createElement("code");k.className="pagespeed-caches-purge-url";k.textContent=g;f.insertCell(1).appendChild(k)}e=d.createTHead().insertRow(0);g=e.insertCell(0);g.className="pagespeed-caches-date-column";1==a.length?g.textContent="Invalidation Time":(a=document.createElement("input"),a.setAttribute("type",
"checkbox"),a.id="sort",a.checked=this.r?!0:!1,a.title="Change sort order.",g.textContent=this.r?"Invalidation Time (Descending)":"Invalidation Time (Ascending)",g.appendChild(a),N(a,"change",t(this.pa,this)));g=e.insertCell(1);g.textContent="URL";g.className="pagespeed-stats-url-column";b.appendChild(d)}}else window.setTimeout(t(this.P,this),0),b=document.getElementById(Lb),"Purge successful"==a&&"purge_text"==this.f?b.textContent="Added to Purge Set":-1!=a.indexOf("Purging not enabled")?b.innerHTML=
a:b.textContent=a}else a=this.a,console.log(q(a.g)?a.g:String(a.g))};
aa("pagespeed.Caches.Start",function(){N(window,"load",function(){var a=new Fb,b=document.createElement("table");b.innerHTML='URL: <input id="purge_text" type="text" name="purge" size="110"/><br><input id="purge_submit" type="button" value="Purge Individual URL"/><input id="purge_all" type="button" value="Purge Entire Cache"/>';var c=document.getElementById(Mb);c.insertBefore(b,c.firstChild);a.Y();for(var d in Z)N(document.getElementById(Nb[d]),"click",t(a.show,a,Z[d]));N(window,"hashchange",t(a.Y,
a));N(document.getElementById("purge_submit"),"click",t(a.na,a));N(document.getElementById("purge_all"),"click",t(a.ma,a));N(document.getElementById("metadata_submit"),"click",t(a.la,a));N(a.a,"complete",t(a.oa,a));N(document.getElementById("metadata_clear"),"click",t(location.reload,location));a.P()})});})();
