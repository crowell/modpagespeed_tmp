(function(){var aa=aa||{},k=this;function ba(){}
function m(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ca(a){var b=m(a);return"array"==b||"object"==b&&"number"==typeof a.length}function n(a){return"string"==typeof a}function p(a){return"function"==m(a)}var da="closure_uid_"+(1E9*Math.random()>>>0),ea=0;function fa(a,b,c){return a.call.apply(a.bind,arguments)}
function ga(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?fa:ga;return q.apply(null,arguments)}var ha=Date.now||function(){return+new Date};
function r(a,b){function c(){}c.prototype=b.prototype;a.O=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.S=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};function ia(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var ja=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function ka(a,b){return a<b?-1:a>b?1:0};function la(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ma(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var na="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function oa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<na.length;f++)c=na[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function pa(){0!=qa&&(this[da]||(this[da]=++ea));this.q=this.q;this.P=this.P}var qa=0;pa.prototype.q=!1;function t(a){if(Error.captureStackTrace)Error.captureStackTrace(this,t);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}r(t,Error);t.prototype.name="CustomError";function ra(a,b,c,d,e){this.reset(a,b,c,d,e)}ra.prototype.a=null;var sa=0;ra.prototype.reset=function(a,b,c,d,e){"number"==typeof e||sa++;d||ha();this.b=b;delete this.a};function u(a,b){this.type=a;this.a=this.target=b}u.prototype.b=function(){};var w="closure_listenable_"+(1E6*Math.random()|0),ta=0;function ua(a,b,c,d,e){this.m=a;this.a=null;this.src=b;this.type=c;this.s=!!d;this.u=e;++ta;this.o=this.r=!1}function x(a){a.o=!0;a.m=null;a.a=null;a.src=null;a.u=null};var y;a:{var va=k.navigator;if(va){var wa=va.userAgent;if(wa){y=wa;break a}}y=""};function xa(a){xa[" "](a);return a}xa[" "]=ba;function ya(){}ya.prototype.a=null;function za(a){var b;(b=a.a)||(b={},Aa(a)&&(b[0]=!0,b[1]=!0),b=a.a=b);return b};function Ba(a,b){b.unshift(a);t.call(this,ia.apply(null,b));b.shift()}r(Ba,t);Ba.prototype.name="AssertionError";function Ca(a,b){throw new Ba("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var z=Array.prototype,Da=z.indexOf?function(a,b,c){return z.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(n(a))return n(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ea=z.forEach?function(a,b,c){z.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Fa(a){var b;a:{b=Ga;for(var c=a.length,d=n(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:n(a)?a.charAt(b):a[b]}function Ha(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};function Ia(a){if("function"==typeof a.t)return a.t();if(n(a))return a.split("");if(ca(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return la(a)}
function Ja(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(ca(a)||n(a))Ea(a,b,void 0);else{var c;if("function"==typeof a.p)c=a.p();else if("function"!=typeof a.t)if(ca(a)||n(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=ma(a);else c=void 0;for(var d=Ia(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};function B(a){this.src=a;this.a={};this.b=0}function Ka(a,b,c,d,e){var f=b.toString();b=a.a[f];b||(b=a.a[f]=[],a.b++);var g=La(b,c,d,e);-1<g?(a=b[g],a.r=!1):(a=new ua(c,a.src,f,!!d,e),a.r=!1,b.push(a));return a}function Ma(a,b){var c=b.type;if(c in a.a){var d=a.a[c],e=Da(d,b),f;(f=0<=e)&&z.splice.call(d,e,1);f&&(x(b),0==a.a[c].length&&(delete a.a[c],a.b--))}}
B.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.a)if(!a||c==a){for(var d=this.a[c],e=0;e<d.length;e++)++b,x(d[e]);delete this.a[c];this.b--}return b};function La(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.o&&f.m==b&&f.s==!!c&&f.u==d)return e}return-1};function C(a,b){this.b={};this.a=[];this.e=this.d=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)D(this,arguments[d],arguments[d+1])}else if(a){a instanceof C?(c=a.p(),d=a.t()):(c=ma(a),d=la(a));for(var e=0;e<c.length;e++)D(this,c[e],d[e])}}C.prototype.t=function(){Na(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};C.prototype.p=function(){Na(this);return this.a.concat()};
C.prototype.clear=function(){this.b={};this.e=this.d=this.a.length=0};function Na(a){if(a.d!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Object.prototype.hasOwnProperty.call(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.d!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],Object.prototype.hasOwnProperty.call(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}}function D(a,b,c){Object.prototype.hasOwnProperty.call(a.b,b)||(a.d++,a.a.push(b),a.e++);a.b[b]=c}
C.prototype.forEach=function(a,b){for(var c=this.p(),d=0;d<c.length;d++){var e=c[d];a.call(b,Object.prototype.hasOwnProperty.call(this.b,e)?this.b[e]:void 0,e,this)}};C.prototype.clone=function(){return new C(this)};var Oa=-1!=y.indexOf("Opera")||-1!=y.indexOf("OPR"),E=-1!=y.indexOf("Trident")||-1!=y.indexOf("MSIE"),F=-1!=y.indexOf("Gecko")&&-1==y.toLowerCase().indexOf("webkit")&&!(-1!=y.indexOf("Trident")||-1!=y.indexOf("MSIE")),G=-1!=y.toLowerCase().indexOf("webkit");function Pa(){var a=k.document;return a?a.documentMode:void 0}
var Qa=function(){var a="",b;if(Oa&&k.opera)return a=k.opera.version,p(a)?a():a;F?b=/rv\:([^\);]+)(\)|;)/:E?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:G&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(y))?a[1]:"");return E&&(b=Pa(),b>parseFloat(a))?String(b):a}(),Ra={};
function H(a){var b;if(!(b=Ra[a])){b=0;for(var c=ja(String(Qa)).split("."),d=ja(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",l=RegExp("(\\d*)(\\D*)","g"),A=RegExp("(\\d*)(\\D*)","g");do{var v=l.exec(g)||["","",""],L=A.exec(h)||["","",""];if(0==v[0].length&&0==L[0].length)break;b=ka(0==v[1].length?0:parseInt(v[1],10),0==L[1].length?0:parseInt(L[1],10))||ka(0==v[2].length,0==L[2].length)||ka(v[2],L[2])}while(0==b)}b=Ra[a]=0<=b}return b}
var Sa=k.document,Ta=Sa&&E?Pa()||("CSS1Compat"==Sa.compatMode?parseInt(Qa,10):5):void 0;var Ua;(Ua=!E)||(Ua=E&&9<=Ta);var Va=Ua,Wa=E&&!H("9");!G||H("528");F&&H("1.9b")||E&&H("8")||Oa&&H("9.5")||G&&H("528");F&&!H("8")||E&&H("9");function I(a,b){u.call(this,a?a.type:"");this.d=this.state=this.a=this.target=null;if(a){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&F)try{xa(c.nodeName)}catch(d){}this.state=a.state;this.d=a;a.defaultPrevented&&this.b()}}r(I,u);I.prototype.b=function(){I.O.b.call(this);var a=this.d;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Wa)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Xa="closure_lm_"+(1E6*Math.random()|0),Ya={},Za=0;function J(a,b,c,d,e){if("array"==m(b))for(var f=0;f<b.length;f++)J(a,b[f],c,d,e);else if(c=$a(c),a&&a[w])Ka(a.j,String(b),c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=K(a);g||(a[Xa]=g=new B(a));c=Ka(g,b,c,d,e);c.a||(d=ab(),c.a=d,d.src=a,d.m=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(bb(b.toString()),d),Za++)}}
function ab(){var a=cb,b=Va?function(c){return a.call(b.src,b.m,c)}:function(c){c=a.call(b.src,b.m,c);if(!c)return c};return b}function db(a,b,c,d,e){if("array"==m(b))for(var f=0;f<b.length;f++)db(a,b[f],c,d,e);else(c=$a(c),a&&a[w])?(a=a.j,b=String(b).toString(),b in a.a&&(f=a.a[b],c=La(f,c,d,e),-1<c&&(x(f[c]),z.splice.call(f,c,1),0==f.length&&(delete a.a[b],a.b--)))):a&&(a=K(a))&&(b=a.a[b.toString()],a=-1,b&&(a=La(b,c,!!d,e)),(c=-1<a?b[a]:null)&&eb(c))}
function eb(a){if("number"!=typeof a&&a&&!a.o){var b=a.src;if(b&&b[w])Ma(b.j,a);else{var c=a.type,d=a.a;b.removeEventListener?b.removeEventListener(c,d,a.s):b.detachEvent&&b.detachEvent(bb(c),d);Za--;(c=K(b))?(Ma(c,a),0==c.b&&(c.src=null,b[Xa]=null)):x(a)}}}function bb(a){return a in Ya?Ya[a]:Ya[a]="on"+a}function fb(a,b,c,d){var e=!0;if(a=K(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.s==c&&!f.o&&(f=gb(f,d),e=e&&!1!==f)}return e}
function gb(a,b){var c=a.m,d=a.u||a.src;a.r&&eb(a);return c.call(d,b)}
function cb(a,b){if(a.o)return!0;if(!Va){var c;if(!(c=b))a:{c=["window","event"];for(var d=k,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new I(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.a;f;f=f.parentNode)e.push(f);for(var f=a.type,h=e.length-1;0<=h;h--){c.a=e[h];var l=fb(e[h],f,!0,c),d=d&&l}for(h=0;h<e.length;h++)c.a=e[h],l=fb(e[h],f,!1,c),
d=d&&l}return d}return gb(a,new I(b,this))}function K(a){a=a[Xa];return a instanceof B?a:null}var hb="__closure_events_fn_"+(1E9*Math.random()>>>0);function $a(a){if(p(a))return a;a[hb]||(a[hb]=function(b){return a.handleEvent(b)});return a[hb]};function M(){pa.call(this);this.j=new B(this);this.M=this}r(M,pa);M.prototype[w]=!0;M.prototype.addEventListener=function(a,b,c,d){J(this,a,b,c,d)};M.prototype.removeEventListener=function(a,b,c,d){db(this,a,b,c,d)};function N(a,b){var c=a.M,d=b,e=d.type||d;if(n(d))d=new u(d,c);else if(d instanceof u)d.target=d.target||c;else{var f=d,d=new u(e,c);oa(d,f)}c=d.a=c;ib(c,e,!0,d);ib(c,e,!1,d)}M.prototype.removeAllListeners=function(a){return this.j?this.j.removeAll(a):0};
function ib(a,b,c,d){if(b=a.j.a[String(b)]){b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.o&&g.s==c){var h=g.m,l=g.u||g.src;g.r&&Ma(a.j,g);e=!1!==h.call(l,d)&&e}}}};var jb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function kb(a){if(lb){lb=!1;var b=k.location;if(b){var c=b.href;if(c&&(c=(c=kb(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw lb=!0,Error();}}return a.match(jb)}var lb=G;function mb(a){this.e=a;this.b=this.d=this.a=null}function nb(a,b){this.name=a;this.value=b}nb.prototype.toString=function(){return this.name};var ob=new nb("SEVERE",1E3),pb=new nb("CONFIG",700),qb=new nb("FINE",500);function rb(a){if(a.d)return a.d;if(a.a)return rb(a.a);Ca("Root logger has no level set.");return null}
mb.prototype.log=function(a,b,c){if(a.value>=rb(this).value)for(p(b)&&(b=b()),a=new ra(a,String(b),this.e),c&&(a.a=c),c="log:"+a.b,k.console&&(k.console.timeStamp?k.console.timeStamp(c):k.console.markTimeline&&k.console.markTimeline(c)),k.msWriteProfilerMark&&k.msWriteProfilerMark(c),c=this;c;)c=c.a};var sb={},tb=null;
function ub(a){tb||(tb=new mb(""),sb[""]=tb,tb.d=pb);var b;if(!(b=sb[a])){b=new mb(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=ub(a.substr(0,c));c.b||(c.b={});c.b[d]=b;b.a=c;sb[a]=b}return b};function O(a,b){a&&a.log(qb,b,void 0)};function vb(a,b,c){if(p(a))c&&(a=q(a,c));else if(a&&"function"==typeof a.handleEvent)a=q(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:k.setTimeout(a,b||0)};var wb;function xb(){}r(xb,ya);function yb(a){return(a=Aa(a))?new ActiveXObject(a):new XMLHttpRequest}function Aa(a){if(!a.b&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.b=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.b}wb=new xb;function P(a){M.call(this);this.N=new C;this.n=a||null;this.b=!1;this.l=this.c=null;this.a=this.B=this.h="";this.d=this.w=this.g=this.v=!1;this.e=0;this.i=null;this.D=zb;this.k=this.R=!1}r(P,M);var zb="",Ab=P.prototype,Bb=ub("goog.net.XhrIo");Ab.f=Bb;var Cb=/^https?$/i,Db=["POST","PUT"];
P.prototype.send=function(a,b,c,d){if(this.c)throw Error("[goog.net.XhrIo] Object is active with another request="+this.h+"; newUri="+a);b=b?b.toUpperCase():"GET";this.h=a;this.a="";this.B=b;this.v=!1;this.b=!0;this.c=this.n?yb(this.n):yb(wb);this.l=this.n?za(this.n):za(wb);this.c.onreadystatechange=q(this.C,this);try{O(this.f,Q(this,"Opening Xhr")),this.w=!0,this.c.open(b,String(a),!0),this.w=!1}catch(e){O(this.f,Q(this,"Error opening Xhr: "+e.message));Eb(this,e);return}a=c||"";var f=this.N.clone();
d&&Ja(d,function(a,b){D(f,b,a)});d=Fa(f.p());c=k.FormData&&a instanceof k.FormData;!(0<=Da(Db,b))||d||c||D(f,"Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.c.setRequestHeader(b,a)},this);this.D&&(this.c.responseType=this.D);"withCredentials"in this.c&&(this.c.withCredentials=this.R);try{Fb(this),0<this.e&&(this.k=Gb(this.c),O(this.f,Q(this,"Will abort after "+this.e+"ms if incomplete, xhr2 "+this.k)),this.k?(this.c.timeout=this.e,this.c.ontimeout=q(this.F,
this)):this.i=vb(this.F,this.e,this)),O(this.f,Q(this,"Sending request")),this.g=!0,this.c.send(a),this.g=!1}catch(g){O(this.f,Q(this,"Send error: "+g.message)),Eb(this,g)}};function Gb(a){return E&&H(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Ga(a){return"content-type"==a.toLowerCase()}
P.prototype.F=function(){"undefined"!=typeof aa&&this.c&&(this.a="Timed out after "+this.e+"ms, aborting",O(this.f,Q(this,this.a)),N(this,"timeout"),this.c&&this.b&&(O(this.f,Q(this,"Aborting")),this.b=!1,this.d=!0,this.c.abort(),this.d=!1,N(this,"complete"),N(this,"abort"),Hb(this)))};function Eb(a,b){a.b=!1;a.c&&(a.d=!0,a.c.abort(),a.d=!1);a.a=b;Ib(a);Hb(a)}function Ib(a){a.v||(a.v=!0,N(a,"complete"),N(a,"error"))}P.prototype.C=function(){this.q||(this.w||this.g||this.d?Jb(this):this.Q())};
P.prototype.Q=function(){Jb(this)};function Jb(a){if(a.b&&"undefined"!=typeof aa)if(a.l[1]&&4==R(a)&&2==Kb(a))O(a.f,Q(a,"Local request error detected and ignored"));else if(a.g&&4==R(a))vb(a.C,0,a);else if(N(a,"readystatechange"),4==R(a)){O(a.f,Q(a,"Request complete"));a.b=!1;try{if(Lb(a))N(a,"complete"),N(a,"success");else{var b;try{b=2<R(a)?a.c.statusText:""}catch(c){O(a.f,"Can not get status: "+c.message),b=""}a.a=b+" ["+Kb(a)+"]";Ib(a)}}finally{Hb(a)}}}
function Hb(a){if(a.c){Fb(a);var b=a.c,c=a.l[0]?ba:null;a.c=null;a.l=null;N(a,"ready");try{b.onreadystatechange=c}catch(d){(a=a.f)&&a.log(ob,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}function Fb(a){a.c&&a.k&&(a.c.ontimeout=null);"number"==typeof a.i&&(k.clearTimeout(a.i),a.i=null)}
function Lb(a){var b=Kb(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=kb(String(a.h))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Cb.test(a?a.toLowerCase():"");c=b}return c}function R(a){return a.c?a.c.readyState:0}function Kb(a){try{return 2<R(a)?a.c.status:-1}catch(b){return-1}}function Q(a,b){return b+" ["+a.B+" "+a.h+" "+Kb(a)+"]"};google.load("visualization","1",{packages:["table","corechart","annotatedtimeline"]});
function S(a){this.b=a||new P;this.a=[];this.i=this.k=this.d=!1;this.e={};for(var b in T)document.getElementById(T[b]).className="pagespeed-hidden-offscreen";a=document.createElement("table");a.id="nav-bar";a.className="pagespeed-sub-tabs";a.innerHTML='<tr><td><a id="'+Mb+'" href="javascript:void(0);">Per application cache stats</a> - </td><td><a id="'+Nb+'" href="javascript:void(0);">Per type cache stats</a> - </td><td><a id="'+Ob+'" href="javascript:void(0);">IPRO status</a> - </td><td><a id="'+
Pb+'" href="javascript:void(0);">Image rewriting</a> - </td><td><a id="'+Qb+'" href="javascript:void(0);">Realtime</a></td></tr>';b=document.createElement("div");b.id="ui-div";b.innerHTML='<table id="ui-table" border=1 style="border-collapse: collapse;border-color:silver;"><tr valign="center"><td>Auto refresh (every 5 seconds): <input type="checkbox" id="auto-refresh" '+(this.d?"checked":"")+"></td></tr></table>";document.body.insertBefore(b,document.getElementById(U));document.body.insertBefore(a,
document.getElementById("ui-div"))}S.prototype.g=function(a){for(var b in T){var c=T[b];document.getElementById(c).className=c==a?"":"pagespeed-hidden-offscreen"}c=document.getElementById(a+"_mode");for(b in Rb){var d=document.getElementById(Rb[b]);d.className=d==c?"pagespeed-underline-link":""}location.href=location.href.split("#")[0]+"#"+a};S.prototype.l=function(){var a=location.hash.substr(1);if(""==a)this.g(U);else{var b;a:{b=T;for(var c in b)if(b[c]==a){b=!0;break a}b=!1}b&&this.g(a)}};
var Mb="cache_applied_mode",Nb="cache_type_mode",Ob="ipro_mode",Pb="image_rewriting_mode",Qb="realtime_mode",Rb={H:Mb,I:Nb,J:Ob,L:Pb,K:Qb},U="cache_applied",T={H:U,I:"cache_type",J:"ipro",L:"image_rewriting",K:"realtime"};S.prototype.q=function(){this.d=!this.d};
S.prototype.h=function(){if(!this.b.c)if(!this.k){this.k=!0;var a=new Date,b;b="?json&start_time="+(new Date(a-864E5)).getTime();b+="&end_time="+a.getTime();this.b.send(b+"&granularity=5000")}else if(!this.i||this.d)this.i=!0,a=location.pathname,b=a.lastIndexOf("/",a.length-2),this.b.send(0<b?a.substring(0,b)+"/stats_json":a+"/stats_json")};
S.prototype.n=function(){if(Lb(this.b)){var a;var b=this.b;try{a=b.c?b.c.responseText:""}catch(c){O(b.f,"Can not get responseText: "+c.message),a=""}if(this.i){var d=JSON.parse(a).variables;a=[];for(var e in d)a.push({name:e,value:d[e]});this.a.push({A:a,G:new Date});17280<this.a.length&&this.a.shift();V(this,"pcache-cohorts-dom","Property cache dom cohorts",U);V(this,"pcache-cohorts-beacon","Property cache beacon cohorts",U);V(this,"rewrite_cached_output","Rewrite cached output",U);V(this,"url_input",
"URL Input",U);V(this,"cache","Cache","cache_type");V(this,"file_cache","File Cache","cache_type");V(this,"memcached","Memcached","cache_type");V(this,"lru_cache","LRU","cache_type");V(this,"shm_cache","Shared Memory","cache_type");V(this,"ipro","In place resource optimization","ipro");V(this,"image_rewrite","Image rewrite","image_rewriting");V(this,"image_rewrites_dropped","Image rewrites dropped","image_rewriting");W(this,"http","Http");W(this,"file_cache","File Cache RT");W(this,"lru_cache","LRU Cache RT");
W(this,"serf_fetch","Serf stats RT");W(this,"rewrite","Rewrite stats RT")}else{a=JSON.parse(a);e=a.timestamps;a=a.variables;for(b=0;b<e.length;++b){var f=[];for(d in a)f.push({name:d,value:a[d][b]});this.a.push({A:f,G:new Date(e[b])})}window.setTimeout(q(this.h,this),0)}}else d=this.b,console.log(n(d.a)?d.a:String(d.a))};
function Sb(a,b){var c=!0;0!=b.indexOf(a)?c=!1:0<=b.indexOf("cache_flush_timestamp_ms")?c=!1:0<=b.indexOf("cache_flush_count")?c=!1:0<=b.indexOf("cache_time_us")&&(c=!1);return c}
function Tb(a,b,c,d,e){if(a.e[c])d=a.e[c];else{e=document.getElementById(e);"Loading Charts..."==e.textContent&&(e.textContent="");var f=document.createElement("div");"AnnotatedTimeLine"==d&&(f.className="pagespeed-graphs-chart");f.id=b;b=document.createElement("p");b.textContent=c;b.className="pagespeed-graphs-title";e.appendChild(b);e.appendChild(f);d=new google.visualization[d](f);a.e[c]=d}return d}
function V(a,b,c,d){var e="pagespeed-graphs-"+b;b+="_";c=Tb(a,e,c,"BarChart",d);e=document.getElementById(e);d=[];for(var f=new google.visualization.DataTable,g=Ha(a.a[a.a.length-1].A),h=a=0;h<g.length;++h)if(Sb(b,g[h].name)){++a;var l=g[h].name.substring(b.length),l=l.replace(/_/g," ");d.push([l,Number(g[h].value)])}f.addColumn("string","Name");f.addColumn("number","Value");f.addRows(d);b=new google.visualization.DataView(f);b.setColumns([0,1,{calc:function(a,b){for(var c=0,d=0;d<a.getNumberOfRows();++d)c+=
a.getValue(d,1);d=a.getValue(b,1);return d.toString()+" ("+(100*d/(0==c?1:c)).toFixed(2).toString()+"%)"},type:"string",role:"annotation"}]);a=40*a+10;e.style.height=a+20;c.draw(b,{annotations:{alwaysOutside:!0,highContrast:!0,textStyle:{fontSize:12,color:"black"}},hAxis:{direction:1},vAxis:{textPosition:"out"},legend:{position:"none"},width:800,height:a,chartArea:{left:225,top:0,width:"60%",height:"80%"}})}
function W(a,b,c){var d=b+"_";b=Tb(a,"pagespeed-graphs-"+b,c,"AnnotatedTimeLine","realtime");c=[];var e=new google.visualization.DataTable;e.addColumn("datetime","Time");for(var f=!0,g=0;g<a.a.length;++g){var h=Ha(a.a[g].A),l=[];l.push(a.a[g].G);for(var A=0;A<h.length;++A)if(Sb(d,h[A].name)&&(l.push(Number(h[A].value)),f)){var v=h[A].name.substring(d.length),v=v.replace(/_/g," ");e.addColumn("number",v)}f=!1;c.push(l)}e.addRows(c);b.draw(e,Ub)}var Ub={thickness:1,displayExactValues:!0,legendPosition:"newRow"};
function Vb(){J(window,"load",function(){var a=new S;a.l();for(var b in T)J(document.getElementById(Rb[b]),"click",q(a.g,a,T[b]));J(window,"hashchange",q(a.l,a));J(document.getElementById("auto-refresh"),"change",q(a.q,a));J(a.b,"complete",q(a.n,a));setInterval(q(a.h,a),5E3);a.h()})}var X=["pagespeed","Graphs","Start"],Y=k;X[0]in Y||!Y.execScript||Y.execScript("var "+X[0]);for(var Z;X.length&&(Z=X.shift());)X.length||void 0===Vb?Y[Z]?Y=Y[Z]:Y=Y[Z]={}:Y[Z]=Vb;})();
