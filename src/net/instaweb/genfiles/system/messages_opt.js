(function(){var h,l=l||{},m=this;function aa(a){a=a.split(".");for(var b=m,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}function ba(){}
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ca(a){var b=n(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function q(a){return"function"==n(a)}var da="closure_uid_"+(1E9*Math.random()>>>0),ea=0;function fa(a,b,c){return a.call.apply(a.bind,arguments)}
function ga(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?fa:ga;return r.apply(null,arguments)}var ha=Date.now||function(){return+new Date};
function s(a,b){function c(){}c.prototype=b.prototype;a.da=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.qa=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};function v(a){if(Error.captureStackTrace)Error.captureStackTrace(this,v);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}s(v,Error);v.prototype.name="CustomError";function w(a,b,c,d,e){this.reset(a,b,c,d,e)}w.prototype.U=null;w.prototype.T=null;var ia=0;w.prototype.reset=function(a,b,c,d,e){"number"==typeof e||ia++;d||ha();this.q=a;this.ia=b;delete this.U;delete this.T};w.prototype.ca=function(a){this.q=a};function ja(){}ja.prototype.S=null;function ka(a){var b;(b=a.S)||(b={},la(a)&&(b[0]=!0,b[1]=!0),b=a.S=b);return b};function ma(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function na(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var oa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function pa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<oa.length;f++)c=oa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function qa(){0!=ra&&(this[da]||(this[da]=++ea));this.N=this.N;this.ja=this.ja}var ra=0;qa.prototype.N=!1;function sa(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var ta=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function ua(a){if(!va.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(wa,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(xa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(ya,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(za,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(Aa,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(Ba,"&#0;"));return a}var wa=/&/g,xa=/</g,ya=/>/g,za=/"/g,Aa=/'/g,Ba=/\x00/g,va=/[\x00&<>"']/;function Ca(a,b){return a<b?-1:a>b?1:0};var x;a:{var Da=m.navigator;if(Da){var Ea=Da.userAgent;if(Ea){x=Ea;break a}}x=""};function Fa(a,b){b.unshift(a);v.call(this,sa.apply(null,b));b.shift()}s(Fa,v);Fa.prototype.name="AssertionError";function Ga(a,b){throw new Fa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var Ha;function Ia(){}s(Ia,ja);function Ja(a){return(a=la(a))?new ActiveXObject(a):new XMLHttpRequest}function la(a){if(!a.W&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.W=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.W}Ha=new Ia;function y(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.i=!1;this.ba=!0}y.prototype.stopPropagation=function(){this.i=!0};y.prototype.preventDefault=function(){this.defaultPrevented=!0;this.ba=!1};var z="closure_listenable_"+(1E6*Math.random()|0),Ka=0;function La(a,b,c,d,e){this.h=a;this.F=null;this.src=b;this.type=c;this.v=!!d;this.A=e;this.key=++Ka;this.m=this.u=!1}function Ma(a){a.m=!0;a.h=null;a.F=null;a.src=null;a.A=null};var A=Array.prototype,Na=A.indexOf?function(a,b,c){return A.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Oa=A.forEach?function(a,b,c){A.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Pa(a){var b;a:{b=Qa;for(var c=a.length,d=p(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:p(a)?a.charAt(b):a[b]}function Ra(a){if("array"!=n(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};function Sa(a){if("function"==typeof a.w)return a.w();if(p(a))return a.split("");if(ca(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return ma(a)}
function Ta(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(ca(a)||p(a))Oa(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.w)if(ca(a)||p(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=na(a);else c=void 0;for(var d=Sa(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};function B(a){this.src=a;this.c={};this.I=0}B.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.c[f];a||(a=this.c[f]=[],this.I++);var g=Ua(a,b,d,e);-1<g?(b=a[g],c||(b.u=!1)):(b=new La(b,this.src,f,!!d,e),b.u=c,a.push(b));return b};B.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.c))return!1;var e=this.c[a];b=Ua(e,b,c,d);return-1<b?(Ma(e[b]),A.splice.call(e,b,1),0==e.length&&(delete this.c[a],this.I--),!0):!1};
function Va(a,b){var c=b.type;if(c in a.c){var d=a.c[c],e=Na(d,b),f;(f=0<=e)&&A.splice.call(d,e,1);f&&(Ma(b),0==a.c[c].length&&(delete a.c[c],a.I--))}}B.prototype.Q=function(a,b,c,d){a=this.c[a.toString()];var e=-1;a&&(e=Ua(a,b,c,d));return-1<e?a[e]:null};function Ua(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.m&&f.h==b&&f.v==!!c&&f.A==d)return e}return-1};var Wa=-1!=x.indexOf("Opera")||-1!=x.indexOf("OPR"),C=-1!=x.indexOf("Trident")||-1!=x.indexOf("MSIE"),D=-1!=x.indexOf("Gecko")&&-1==x.toLowerCase().indexOf("webkit")&&!(-1!=x.indexOf("Trident")||-1!=x.indexOf("MSIE")),E=-1!=x.toLowerCase().indexOf("webkit");function Xa(){var a=m.document;return a?a.documentMode:void 0}
var Ya=function(){var a="",b;if(Wa&&m.opera)return a=m.opera.version,q(a)?a():a;D?b=/rv\:([^\);]+)(\)|;)/:C?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:E&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(x))?a[1]:"");return C&&(b=Xa(),b>parseFloat(a))?String(b):a}(),Za={};
function F(a){var b;if(!(b=Za[a])){b=0;for(var c=ta(String(Ya)).split("."),d=ta(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",G=RegExp("(\\d*)(\\D*)","g"),K=RegExp("(\\d*)(\\D*)","g");do{var t=G.exec(g)||["","",""],u=K.exec(k)||["","",""];if(0==t[0].length&&0==u[0].length)break;b=Ca(0==t[1].length?0:parseInt(t[1],10),0==u[1].length?0:parseInt(u[1],10))||Ca(0==t[2].length,0==u[2].length)||Ca(t[2],u[2])}while(0==b)}b=Za[a]=0<=b}return b}
var $a=m.document,ab=$a&&C?Xa()||("CSS1Compat"==$a.compatMode?parseInt(Ya,10):5):void 0;var bb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function cb(a){if(db){db=!1;var b=m.location;if(b){var c=b.href;if(c&&(c=(c=cb(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw db=!0,Error();}}return a.match(bb)}var db=E;var eb;(eb=!C)||(eb=C&&9<=ab);var fb=eb,gb=C&&!F("9");!E||F("528");D&&F("1.9b")||C&&F("8")||Wa&&F("9.5")||E&&F("528");D&&!F("8")||C&&F("9");function hb(a){hb[" "](a);return a}hb[" "]=ba;function H(a,b){y.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.n=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(D){var e;a:{try{hb(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=E||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=E||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.n=a;a.defaultPrevented&&this.preventDefault()}}s(H,y);H.prototype.stopPropagation=function(){H.da.stopPropagation.call(this);this.n.stopPropagation?this.n.stopPropagation():this.n.cancelBubble=!0};H.prototype.preventDefault=function(){H.da.preventDefault.call(this);var a=this.n;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,gb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var ib="closure_lm_"+(1E6*Math.random()|0),jb={},kb=0;function I(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)I(a,b[f],c,d,e);else if(c=lb(c),a&&a[z])a.l.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=J(a);g||(a[ib]=g=new B(a));c=g.add(b,c,!1,d,e);c.F||(d=mb(),c.F=d,d.src=a,d.h=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(nb(b.toString()),d),kb++)}}
function mb(){var a=ob,b=fb?function(c){return a.call(b.src,b.h,c)}:function(c){c=a.call(b.src,b.h,c);if(!c)return c};return b}function pb(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)pb(a,b[f],c,d,e);else c=lb(c),a&&a[z]?a.l.remove(String(b),c,d,e):a&&(a=J(a))&&(b=a.Q(b,c,!!d,e))&&qb(b)}
function qb(a){if("number"!=typeof a&&a&&!a.m){var b=a.src;if(b&&b[z])Va(b.l,a);else{var c=a.type,d=a.F;b.removeEventListener?b.removeEventListener(c,d,a.v):b.detachEvent&&b.detachEvent(nb(c),d);kb--;(c=J(b))?(Va(c,a),0==c.I&&(c.src=null,b[ib]=null)):Ma(a)}}}function nb(a){return a in jb?jb[a]:jb[a]="on"+a}function rb(a,b,c,d){var e=1;if(a=J(a))if(b=a.c[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.v==c&&!f.m&&(e&=!1!==sb(f,d))}return Boolean(e)}
function sb(a,b){var c=a.h,d=a.A||a.src;a.u&&qb(a);return c.call(d,b)}
function ob(a,b){if(a.m)return!0;if(!fb){var c=b||aa("window.event"),d=new H(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,k=c.length-1;!d.i&&0<=k;k--)d.currentTarget=c[k],e&=rb(c[k],f,!0,d);for(k=0;!d.i&&k<c.length;k++)d.currentTarget=c[k],e&=rb(c[k],f,!1,d)}return e}return sb(a,new H(b,this))}
function J(a){a=a[ib];return a instanceof B?a:null}var tb="__closure_events_fn_"+(1E9*Math.random()>>>0);function lb(a){if(q(a))return a;a[tb]||(a[tb]=function(b){return a.handleEvent(b)});return a[tb]};function L(){qa.call(this);this.l=new B(this);this.fa=this;this.$=null}s(L,qa);L.prototype[z]=!0;L.prototype.addEventListener=function(a,b,c,d){I(this,a,b,c,d)};L.prototype.removeEventListener=function(a,b,c,d){pb(this,a,b,c,d)};
L.prototype.dispatchEvent=function(a){var b,c=this.$;if(c)for(b=[];c;c=c.$)b.push(c);var c=this.fa,d=a.type||a;if(p(a))a=new y(a,c);else if(a instanceof y)a.target=a.target||c;else{var e=a;a=new y(d,c);pa(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.i&&0<=g;g--)f=a.currentTarget=b[g],e=M(f,d,!0,a)&&e;a.i||(f=a.currentTarget=c,e=M(f,d,!0,a)&&e,a.i||(e=M(f,d,!1,a)&&e));if(b)for(g=0;!a.i&&g<b.length;g++)f=a.currentTarget=b[g],e=M(f,d,!1,a)&&e;return e};
function M(a,b,c,d){b=a.l.c[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.m&&g.v==c){var k=g.h,G=g.A||g.src;g.u&&Va(a.l,g);e=!1!==k.call(G,d)&&e}}return e&&0!=d.ba}L.prototype.Q=function(a,b,c,d){return this.l.Q(String(a),b,c,d)};function N(a,b){this.e={};this.b=[];this.k=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof N?(c=a.o(),d=a.w()):(c=na(a),d=ma(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}h=N.prototype;h.w=function(){ub(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.e[this.b[b]]);return a};h.o=function(){ub(this);return this.b.concat()};
h.clear=function(){this.e={};this.k=this.b.length=0};h.remove=function(a){return Object.prototype.hasOwnProperty.call(this.e,a)?(delete this.e[a],this.k--,this.b.length>2*this.k&&ub(this),!0):!1};function ub(a){if(a.k!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.e,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.k!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
h.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.e,a)?this.e[a]:b};h.set=function(a,b){Object.prototype.hasOwnProperty.call(this.e,a)||(this.k++,this.b.push(a));this.e[a]=b};h.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new N(this)};function vb(a){var b;b||(b=wb(a||arguments.callee.caller,[]));return b}
function wb(a,b){var c=[];if(0<=Na(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(xb(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=xb(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(wb(a.caller,
b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")}function xb(a){if(O[a])return O[a];a=String(a);if(!O[a]){var b=/function ([^\(]+)/.exec(a);O[a]=b?b[1]:"[Anonymous]"}return O[a]}var O={};function P(a){this.Y=a;this.V=this.M=this.q=this.D=null}function Q(a,b){this.name=a;this.value=b}Q.prototype.toString=function(){return this.name};var yb=new Q("SEVERE",1E3),zb=new Q("INFO",800),Ab=new Q("CONFIG",700),Bb=new Q("FINE",500);h=P.prototype;h.getName=function(){return this.Y};h.getParent=function(){return this.D};h.ca=function(a){this.q=a};function Cb(a){if(a.q)return a.q;if(a.D)return Cb(a.D);Ga("Root logger has no level set.");return null}
h.log=function(a,b,c){if(a.value>=Cb(this).value)for(q(b)&&(b=b()),a=this.ha(a,b,c,P.prototype.log),b="log:"+a.ia,m.console&&(m.console.timeStamp?m.console.timeStamp(b):m.console.markTimeline&&m.console.markTimeline(b)),m.msWriteProfilerMark&&m.msWriteProfilerMark(b),b=this;b;){c=b;var d=a;if(c.V)for(var e=0,f=void 0;f=c.V[e];e++)f(d);b=b.getParent()}};
h.ha=function(a,b,c,d){var e=new w(a,String(b),this.Y);if(c){var f;f=d||arguments.callee.caller;e.U=c;var g;try{var k;var G=aa("window.location.href");if(p(c))k={message:c,name:"Unknown error",lineNumber:"Not available",fileName:G,stack:"Not available"};else{var K,t,u=!1;try{K=c.lineNumber||c.ra||"Not available"}catch(Vb){K="Not available",u=!0}try{t=c.fileName||c.filename||c.sourceURL||m.$googDebugFname||G}catch(Wb){t="Not available",u=!0}k=!u&&c.lineNumber&&c.fileName&&c.stack&&c.message&&c.name?
c:{message:c.message||"Not available",name:c.name||"UnknownError",lineNumber:K,fileName:t,stack:c.stack||"Not available"}}g="Message: "+ua(k.message)+'\nUrl: <a href="view-source:'+k.fileName+'" target="_new">'+k.fileName+"</a>\nLine: "+k.lineNumber+"\n\nBrowser stack:\n"+ua(k.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+ua(vb(f)+"-> ")}catch(Ob){g="Exception trying to expose exception! You win, we lose. "+Ob}e.T=g}return e};h.info=function(a,b){this.log(zb,a,b)};var Db={},R=null;
function Eb(a){R||(R=new P(""),Db[""]=R,R.ca(Ab));var b;if(!(b=Db[a])){b=new P(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Eb(a.substr(0,c));c.M||(c.M={});c.M[d]=b;b.D=c;Db[a]=b}return b};function S(a,b){a&&a.log(Bb,b,void 0)};function Fb(a,b,c){if(q(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:m.setTimeout(a,b||0)};function T(a){L.call(this);this.headers=new N;this.L=a||null;this.j=!1;this.K=this.a=null;this.f=this.X=this.C="";this.p=this.R=this.B=this.O=!1;this.s=0;this.H=null;this.aa=Gb;this.J=this.pa=!1}s(T,L);var Gb="",Hb=T.prototype,Ib=Eb("goog.net.XhrIo");Hb.d=Ib;var Jb=/^https?$/i,Kb=["POST","PUT"];h=T.prototype;
h.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.C+"; newUri="+a);b=b?b.toUpperCase():"GET";this.C=a;this.f="";this.X=b;this.O=!1;this.j=!0;this.a=this.L?Ja(this.L):Ja(Ha);this.K=this.L?ka(this.L):ka(Ha);this.a.onreadystatechange=r(this.Z,this);try{S(this.d,U(this,"Opening Xhr")),this.R=!0,this.a.open(b,String(a),!0),this.R=!1}catch(e){S(this.d,U(this,"Error opening Xhr: "+e.message));Lb(this,e);return}a=c||"";var f=this.headers.clone();
d&&Ta(d,function(a,b){f.set(b,a)});d=Pa(f.o());c=m.FormData&&a instanceof m.FormData;!(0<=Na(Kb,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.aa&&(this.a.responseType=this.aa);"withCredentials"in this.a&&(this.a.withCredentials=this.pa);try{Mb(this),0<this.s&&(this.J=Nb(this.a),S(this.d,U(this,"Will abort after "+this.s+"ms if incomplete, xhr2 "+this.J)),this.J?(this.a.timeout=this.s,this.a.ontimeout=
r(this.ea,this)):this.H=Fb(this.ea,this.s,this)),S(this.d,U(this,"Sending request")),this.B=!0,this.a.send(a),this.B=!1}catch(g){S(this.d,U(this,"Send error: "+g.message)),Lb(this,g)}};function Nb(a){return C&&F(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Qa(a){return"content-type"==a.toLowerCase()}h.ea=function(){"undefined"!=typeof l&&this.a&&(this.f="Timed out after "+this.s+"ms, aborting",S(this.d,U(this,this.f)),this.dispatchEvent("timeout"),this.abort(8))};
function Lb(a,b){a.j=!1;a.a&&(a.p=!0,a.a.abort(),a.p=!1);a.f=b;Pb(a);Qb(a)}function Pb(a){a.O||(a.O=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}h.abort=function(){this.a&&this.j&&(S(this.d,U(this,"Aborting")),this.j=!1,this.p=!0,this.a.abort(),this.p=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Qb(this))};h.Z=function(){this.N||(this.R||this.B||this.p?Rb(this):this.ka())};h.ka=function(){Rb(this)};
function Rb(a){if(a.j&&"undefined"!=typeof l)if(a.K[1]&&4==V(a)&&2==W(a))S(a.d,U(a,"Local request error detected and ignored"));else if(a.B&&4==V(a))Fb(a.Z,0,a);else if(a.dispatchEvent("readystatechange"),4==V(a)){S(a.d,U(a,"Request complete"));a.j=!1;try{if(Sb(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<V(a)?a.a.statusText:""}catch(c){S(a.d,"Can not get status: "+c.message),b=""}a.f=b+" ["+W(a)+"]";Pb(a)}}finally{Qb(a)}}}
function Qb(a){if(a.a){Mb(a);var b=a.a,c=a.K[0]?ba:null;a.a=null;a.K=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){(a=a.d)&&a.log(yb,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}function Mb(a){a.a&&a.J&&(a.a.ontimeout=null);"number"==typeof a.H&&(m.clearTimeout(a.H),a.H=null)}
function Sb(a){var b=W(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=cb(String(a.C))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Jb.test(a?a.toLowerCase():"");c=b}return c}function V(a){return a.a?a.a.readyState:0}function W(a){try{return 2<V(a)?a.a.status:-1}catch(b){return-1}}h.getResponseHeader=function(a){return this.a&&4==V(this)?this.a.getResponseHeader(a):void 0};
h.getAllResponseHeaders=function(){return this.a&&4==V(this)?this.a.getAllResponseHeaders():""};function U(a,b){return b+" ["+a.X+" "+a.C+" "+W(a)+"]"};function Tb(a){this.a=a||new T;this.g=document.getElementById("log").innerHTML.split("\n");0<this.g.length&&this.g.pop();this.r=this.g.length;this.G=!1;this.P="";this.t=!1;a=document.createElement("div");a.style.overflow="hidden";a.style.clear="both";var b=document.createElement("div");b.id="ui-div";b.innerHTML='<table id="ui-table" border="1" style="float:left; border-collapse: collapse;border-color:silver;"><tr valign="center"><td>Reverse: <input type="checkbox" id="reverse" '+(this.G?"checked":
"")+'></td><td>Auto refresh (every 5 seconds): <input type="checkbox" id="auto-refresh" '+(this.t?"checked":"")+'></td><td>&nbsp;&nbsp;&nbsp;&nbsp;Filter: <input id="text-filter" type="text" size="70"></td></tr></table>';a.appendChild(b);b=document.createElement("div");b.id="num";b.className="pagespeed-show-number";a.appendChild(b);document.body.insertBefore(a,document.getElementById("log"));X(this)}h=Tb.prototype;h.oa=function(){this.G=!this.G;this.update()};h.na=function(){this.t=!this.t};
h.ma=function(a){this.P=a.value;this.update()};function X(a,b){var c=void 0!=b?b:a.g.length;document.getElementById("num").textContent=c==a.r?"Total message count: "+c:"Visible message count: "+c+"/"+a.r}
h.update=function(){var a=document.getElementById("log"),b;b=this.g;var c=b.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=b[e];b=d}else b=[];if(this.P)for(c=b.length-1;0<=c;--c)b[c]&&-1!=b[c].toLowerCase().indexOf(this.P.toLowerCase())||b.splice(c,1);X(this,b.length);a.innerHTML=this.G?b.reverse().join("\n"):b.join("\n")};h.ga=function(){this.t&&!this.a.a&&this.a.send(document.location.href)};
h.la=function(){if(Sb(this.a)){var a;var b=this.a;try{a=b.a?b.a.responseText:""}catch(c){S(b.d,"Can not get responseText: "+c.message),a=""}var b=[],b=a.indexOf('<div id="log">'),d=a.indexOf('<script type="text/javascript">',b);0<=b&&0<=d?(b=a.substring(b+14,d-7).split("\n"),b.pop(),this.g=b,this.r=b.length,this.update()):(Ra(this.g),this.r=0,X(this),document.getElementById("log").textContent="Failed to write messages to this page. Verify that MessageBufferSize is not set to 0 in pagespeed.conf.")}else a=
this.a,console.log(p(a.f)?a.f:String(a.f)),Ra(this.g),this.r=0,X(this),document.getElementById("log").textContent="Sorry, the message history cannot be loaded. Please wait and try again later."};function Ub(){I(window,"load",function(){var a=new Tb,b=document.getElementById("text-filter");I(b,"keyup",r(a.ma,a,b));I(document.getElementById("reverse"),"change",r(a.oa,a));I(document.getElementById("auto-refresh"),"change",r(a.na,a));I(a.a,"complete",r(a.la,a));setInterval(r(a.ga,a),5E3)})}
var Y=["pagespeed","Messages","Start"],Z=m;Y[0]in Z||!Z.execScript||Z.execScript("var "+Y[0]);for(var $;Y.length&&($=Y.shift());)Y.length||void 0===Ub?Z=Z[$]?Z[$]:Z[$]={}:Z[$]=Ub;})();
