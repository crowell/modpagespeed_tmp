(function(){var k,aa=aa||{},l=this;function ba(a){a=a.split(".");for(var b=l,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}function ca(){}
function p(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){var b=p(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function r(a){return"function"==p(a)}var ea="closure_uid_"+(1E9*Math.random()>>>0),fa=0;function ga(a,b,c){return a.call.apply(a.bind,arguments)}
function ha(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function s(a,b,c){s=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ga:ha;return s.apply(null,arguments)}var ia=Date.now||function(){return+new Date};
function u(a,b){function c(){}c.prototype=b.prototype;a.ga=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.wa=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};function ja(a){ja[" "](a);return a}ja[" "]=ca;function ka(){0!=la&&(this[ea]||(this[ea]=++fa));this.M=this.M;this.ra=this.ra}var la=0;ka.prototype.M=!1;function ma(){}ma.prototype.T=null;ma.prototype.getOptions=function(){var a;(a=this.T)||(a={},na(this)&&(a[0]=!0,a[1]=!0),a=this.T=a);return a};function oa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function pa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var qa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ra(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<qa.length;f++)c=qa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function v(a){if(Error.captureStackTrace)Error.captureStackTrace(this,v);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}u(v,Error);v.prototype.name="CustomError";function w(a,b,c,d,e){this.reset(a,b,c,d,e)}w.prototype.V=null;w.prototype.U=null;var sa=0;w.prototype.reset=function(a,b,c,d,e){"number"==typeof e||sa++;d||ia();this.q=a;this.qa=b;delete this.V;delete this.U};w.prototype.fa=function(a){this.q=a};w.prototype.getMessage=function(){return this.qa};var y="closure_listenable_"+(1E6*Math.random()|0),ta=0;function z(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.j=!1;this.ea=!0}z.prototype.stopPropagation=function(){this.j=!0};z.prototype.preventDefault=function(){this.defaultPrevented=!0;this.ea=!1};function ua(a,b,c,d,e){this.i=a;this.F=null;this.src=b;this.type=c;this.v=!!d;this.A=e;this.key=++ta;this.m=this.u=!1}function A(a){a.m=!0;a.i=null;a.F=null;a.src=null;a.A=null};function va(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var wa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function xa(a){if(!ya.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(za,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(Aa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(Ba,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(Ca,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(Da,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(Ea,"&#0;"));return a}var za=/&/g,Aa=/</g,Ba=/>/g,Ca=/"/g,Da=/'/g,Ea=/\x00/g,ya=/[\x00&<>"']/;function Fa(a,b){return a<b?-1:a>b?1:0};function Ga(a,b){b.unshift(a);v.call(this,va.apply(null,b));b.shift()}u(Ga,v);Ga.prototype.name="AssertionError";function Ha(a,b){throw new Ga("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var Ia;function Ja(){}u(Ja,ma);function Ka(a){return(a=na(a))?new ActiveXObject(a):new XMLHttpRequest}function na(a){if(!a.Y&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.Y=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.Y}Ia=new Ja;var B=Array.prototype,La=B.indexOf?function(a,b,c){return B.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ma=B.forEach?function(a,b,c){B.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Na(a){var b;a:{b=Oa;for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:q(a)?a.charAt(b):a[b]}function Pa(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};function Qa(a){if("function"==typeof a.w)return a.w();if(q(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return oa(a)}
function Ra(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(da(a)||q(a))Ma(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.w)if(da(a)||q(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=pa(a);else c=void 0;for(var d=Qa(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};function C(a,b){this.e={};this.b=[];this.l=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof C?(c=a.o(),d=a.w()):(c=pa(a),d=oa(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}k=C.prototype;k.w=function(){Sa(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.e[this.b[b]]);return a};k.o=function(){Sa(this);return this.b.concat()};
k.clear=function(){this.e={};this.l=this.b.length=0};k.remove=function(a){return Object.prototype.hasOwnProperty.call(this.e,a)?(delete this.e[a],this.l--,this.b.length>2*this.l&&Sa(this),!0):!1};function Sa(a){if(a.l!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.e,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.l!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
k.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.e,a)?this.e[a]:b};k.set=function(a,b){Object.prototype.hasOwnProperty.call(this.e,a)||(this.l++,this.b.push(a));this.e[a]=b};k.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};k.clone=function(){return new C(this)};function D(a){this.src=a;this.c={};this.s=0}D.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.c[f];a||(a=this.c[f]=[],this.s++);var g=Ta(a,b,d,e);-1<g?(b=a[g],c||(b.u=!1)):(b=new ua(b,this.src,f,!!d,e),b.u=c,a.push(b));return b};D.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.c))return!1;var e=this.c[a];b=Ta(e,b,c,d);return-1<b?(A(e[b]),B.splice.call(e,b,1),0==e.length&&(delete this.c[a],this.s--),!0):!1};
function Ua(a,b){var c=b.type;if(c in a.c){var d=a.c[c],e=La(d,b),f;(f=0<=e)&&B.splice.call(d,e,1);f&&(A(b),0==a.c[c].length&&(delete a.c[c],a.s--))}}D.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.c)if(!a||c==a){for(var d=this.c[c],e=0;e<d.length;e++)++b,A(d[e]);delete this.c[c];this.s--}return b};D.prototype.O=function(a,b,c,d){a=this.c[a.toString()];var e=-1;a&&(e=Ta(a,b,c,d));return-1<e?a[e]:null};
function Ta(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.m&&f.i==b&&f.v==!!c&&f.A==d)return e}return-1};var E;a:{var Va=l.navigator;if(Va){var Wa=Va.userAgent;if(Wa){E=Wa;break a}}E=""};var Xa=-1!=E.indexOf("Opera")||-1!=E.indexOf("OPR"),F=-1!=E.indexOf("Trident")||-1!=E.indexOf("MSIE"),G=-1!=E.indexOf("Gecko")&&-1==E.toLowerCase().indexOf("webkit")&&!(-1!=E.indexOf("Trident")||-1!=E.indexOf("MSIE")),H=-1!=E.toLowerCase().indexOf("webkit");function Ya(){var a=l.document;return a?a.documentMode:void 0}
var Za=function(){var a="",b;if(Xa&&l.opera)return a=l.opera.version,r(a)?a():a;G?b=/rv\:([^\);]+)(\)|;)/:F?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:H&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(E))?a[1]:"");return F&&(b=Ya(),b>parseFloat(a))?String(b):a}(),$a={};
function I(a){var b;if(!(b=$a[a])){b=0;for(var c=wa(String(Za)).split("."),d=wa(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",m=RegExp("(\\d*)(\\D*)","g"),t=RegExp("(\\d*)(\\D*)","g");do{var n=m.exec(g)||["","",""],x=t.exec(h)||["","",""];if(0==n[0].length&&0==x[0].length)break;b=Fa(0==n[1].length?0:parseInt(n[1],10),0==x[1].length?0:parseInt(x[1],10))||Fa(0==n[2].length,0==x[2].length)||Fa(n[2],x[2])}while(0==b)}b=$a[a]=0<=b}return b}
var ab=l.document,bb=ab&&F?Ya()||("CSS1Compat"==ab.compatMode?parseInt(Za,10):5):void 0;var cb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function db(a){if(eb){eb=!1;var b=l.location;if(b){var c=b.href;if(c&&(c=(c=db(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw eb=!0,Error();}}return a.match(cb)}var eb=H;function fb(a){var b;b||(b=gb(a||arguments.callee.caller,[]));return b}
function gb(a,b){var c=[];if(0<=La(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(hb(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=hb(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(gb(a.caller,
b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")}function hb(a){if(J[a])return J[a];a=String(a);if(!J[a]){var b=/function ([^\(]+)/.exec(a);J[a]=b?b[1]:"[Anonymous]"}return J[a]}var J={};function K(a){this.$=a;this.X=this.L=this.q=this.D=null}function L(a,b){this.name=a;this.value=b}L.prototype.toString=function(){return this.name};var ib=new L("SEVERE",1E3),jb=new L("INFO",800),kb=new L("CONFIG",700),lb=new L("FINE",500);k=K.prototype;k.getName=function(){return this.$};k.getParent=function(){return this.D};k.fa=function(a){this.q=a};function mb(a){if(a.q)return a.q;if(a.D)return mb(a.D);Ha("Root logger has no level set.");return null}
k.log=function(a,b,c){if(a.value>=mb(this).value)for(r(b)&&(b=b()),a=this.pa(a,b,c,K.prototype.log),b="log:"+a.getMessage(),l.console&&(l.console.timeStamp?l.console.timeStamp(b):l.console.markTimeline&&l.console.markTimeline(b)),l.msWriteProfilerMark&&l.msWriteProfilerMark(b),b=this;b;){c=b;var d=a;if(c.X)for(var e=0,f=void 0;f=c.X[e];e++)f(d);b=b.getParent()}};
k.pa=function(a,b,c,d){var e=new w(a,String(b),this.$);if(c){var f;f=d||arguments.callee.caller;e.V=c;var g;try{var h;var m=ba("window.location.href");if(q(c))h={message:c,name:"Unknown error",lineNumber:"Not available",fileName:m,stack:"Not available"};else{var t,n,x=!1;try{t=c.lineNumber||c.xa||"Not available"}catch(fc){t="Not available",x=!0}try{n=c.fileName||c.filename||c.sourceURL||l.$googDebugFname||m}catch(gc){n="Not available",x=!0}h=!x&&c.lineNumber&&c.fileName&&c.stack&&c.message&&c.name?
c:{message:c.message||"Not available",name:c.name||"UnknownError",lineNumber:t,fileName:n,stack:c.stack||"Not available"}}g="Message: "+xa(h.message)+'\nUrl: <a href="view-source:'+h.fileName+'" target="_new">'+h.fileName+"</a>\nLine: "+h.lineNumber+"\n\nBrowser stack:\n"+xa(h.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+xa(fb(f)+"-> ")}catch(Vb){g="Exception trying to expose exception! You win, we lose. "+Vb}e.U=g}return e};k.info=function(a,b){this.log(jb,a,b)};var nb={},M=null;
function ob(a){M||(M=new K(""),nb[""]=M,M.fa(kb));var b;if(!(b=nb[a])){b=new K(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=ob(a.substr(0,c));c.L||(c.L={});c.L[d]=b;b.D=c;nb[a]=b}return b};function N(a,b){a&&a.log(lb,b,void 0)};var pb;(pb=!F)||(pb=F&&9<=bb);var qb=pb,rb=F&&!I("9");!H||I("528");G&&I("1.9b")||F&&I("8")||Xa&&I("9.5")||H&&I("528");G&&!I("8")||F&&I("9");function O(a,b){z.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.n=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(G){var e;a:{try{ja(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=H||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=H||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.n=a;a.defaultPrevented&&this.preventDefault()}}u(O,z);O.prototype.stopPropagation=function(){O.ga.stopPropagation.call(this);this.n.stopPropagation?this.n.stopPropagation():this.n.cancelBubble=!0};O.prototype.preventDefault=function(){O.ga.preventDefault.call(this);var a=this.n;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,rb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var sb="closure_lm_"+(1E6*Math.random()|0),tb={},ub=0;function P(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)P(a,b[f],c,d,e);else if(c=vb(c),a&&a[y])a.g.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=wb(a);g||(a[sb]=g=new D(a));c=g.add(b,c,!1,d,e);c.F||(d=xb(),c.F=d,d.src=a,d.i=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(yb(b.toString()),d),ub++)}}
function xb(){var a=zb,b=qb?function(c){return a.call(b.src,b.i,c)}:function(c){c=a.call(b.src,b.i,c);if(!c)return c};return b}function Ab(a,b,c,d,e){if("array"==p(b))for(var f=0;f<b.length;f++)Ab(a,b[f],c,d,e);else c=vb(c),a&&a[y]?a.g.remove(String(b),c,d,e):a&&(a=wb(a))&&(b=a.O(b,c,!!d,e))&&Bb(b)}
function Bb(a){if("number"!=typeof a&&a&&!a.m){var b=a.src;if(b&&b[y])Ua(b.g,a);else{var c=a.type,d=a.F;b.removeEventListener?b.removeEventListener(c,d,a.v):b.detachEvent&&b.detachEvent(yb(c),d);ub--;(c=wb(b))?(Ua(c,a),0==c.s&&(c.src=null,b[sb]=null)):A(a)}}}function yb(a){return a in tb?tb[a]:tb[a]="on"+a}function Cb(a,b,c,d){var e=1;if(a=wb(a))if(b=a.c[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.v==c&&!f.m&&(e&=!1!==Db(f,d))}return Boolean(e)}
function Db(a,b){var c=a.i,d=a.A||a.src;a.u&&Bb(a);return c.call(d,b)}
function zb(a,b){if(a.m)return!0;if(!qb){var c=b||ba("window.event"),d=new O(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,h=c.length-1;!d.j&&0<=h;h--)d.currentTarget=c[h],e&=Cb(c[h],f,!0,d);for(h=0;!d.j&&h<c.length;h++)d.currentTarget=c[h],e&=Cb(c[h],f,!1,d)}return e}return Db(a,new O(b,this))}
function wb(a){a=a[sb];return a instanceof D?a:null}var Eb="__closure_events_fn_"+(1E9*Math.random()>>>0);function vb(a){if(r(a))return a;a[Eb]||(a[Eb]=function(b){return a.handleEvent(b)});return a[Eb]};function Q(){ka.call(this);this.g=new D(this);this.oa=this;this.ba=null}u(Q,ka);Q.prototype[y]=!0;k=Q.prototype;k.addEventListener=function(a,b,c,d){P(this,a,b,c,d)};k.removeEventListener=function(a,b,c,d){Ab(this,a,b,c,d)};
k.dispatchEvent=function(a){var b,c=this.ba;if(c)for(b=[];c;c=c.ba)b.push(c);var c=this.oa,d=a.type||a;if(q(a))a=new z(a,c);else if(a instanceof z)a.target=a.target||c;else{var e=a;a=new z(d,c);ra(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.j&&0<=g;g--)f=a.currentTarget=b[g],e=Fb(f,d,!0,a)&&e;a.j||(f=a.currentTarget=c,e=Fb(f,d,!0,a)&&e,a.j||(e=Fb(f,d,!1,a)&&e));if(b)for(g=0;!a.j&&g<b.length;g++)f=a.currentTarget=b[g],e=Fb(f,d,!1,a)&&e;return e};
k.removeAllListeners=function(a){return this.g?this.g.removeAll(a):0};function Fb(a,b,c,d){b=a.g.c[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.m&&g.v==c){var h=g.i,m=g.A||g.src;g.u&&Ua(a.g,g);e=!1!==h.call(m,d)&&e}}return e&&0!=d.ea}k.O=function(a,b,c,d){return this.g.O(String(a),b,c,d)};function Gb(a,b,c){if(r(a))c&&(a=s(a,c));else if(a&&"function"==typeof a.handleEvent)a=s(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:l.setTimeout(a,b||0)};function Hb(a){Q.call(this);this.headers=new C;this.J=a||null;this.k=!1;this.I=this.a=null;this.h=this.Z=this.C="";this.p=this.P=this.B=this.N=!1;this.r=0;this.G=null;this.da=Ib;this.H=this.va=!1}u(Hb,Q);var Ib="",Jb=Hb.prototype,Kb=ob("goog.net.XhrIo");Jb.d=Kb;var Lb=/^https?$/i,Mb=["POST","PUT"];k=Hb.prototype;
k.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.C+"; newUri="+a);b=b?b.toUpperCase():"GET";this.C=a;this.h="";this.Z=b;this.N=!1;this.k=!0;this.a=this.J?Ka(this.J):Ka(Ia);this.I=this.J?this.J.getOptions():Ia.getOptions();this.a.onreadystatechange=s(this.aa,this);try{N(this.d,R(this,"Opening Xhr")),this.P=!0,this.a.open(b,String(a),!0),this.P=!1}catch(e){N(this.d,R(this,"Error opening Xhr: "+e.message));Nb(this,e);return}a=c||"";var f=this.headers.clone();
d&&Ra(d,function(a,b){f.set(b,a)});d=Na(f.o());c=l.FormData&&a instanceof l.FormData;!(0<=La(Mb,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.da&&(this.a.responseType=this.da);"withCredentials"in this.a&&(this.a.withCredentials=this.va);try{Ob(this),0<this.r&&(this.H=Pb(this.a),N(this.d,R(this,"Will abort after "+this.r+"ms if incomplete, xhr2 "+this.H)),this.H?(this.a.timeout=this.r,this.a.ontimeout=
s(this.ia,this)):this.G=Gb(this.ia,this.r,this)),N(this.d,R(this,"Sending request")),this.B=!0,this.a.send(a),this.B=!1}catch(g){N(this.d,R(this,"Send error: "+g.message)),Nb(this,g)}};function Pb(a){return F&&I(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Oa(a){return"content-type"==a.toLowerCase()}k.ia=function(){"undefined"!=typeof aa&&this.a&&(this.h="Timed out after "+this.r+"ms, aborting",N(this.d,R(this,this.h)),this.dispatchEvent("timeout"),this.abort(8))};
function Nb(a,b){a.k=!1;a.a&&(a.p=!0,a.a.abort(),a.p=!1);a.h=b;Qb(a);Rb(a)}function Qb(a){a.N||(a.N=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}k.abort=function(){this.a&&this.k&&(N(this.d,R(this,"Aborting")),this.k=!1,this.p=!0,this.a.abort(),this.p=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Rb(this))};k.aa=function(){this.M||(this.P||this.B||this.p?Sb(this):this.sa())};k.sa=function(){Sb(this)};
function Sb(a){if(a.k&&"undefined"!=typeof aa)if(a.I[1]&&4==S(a)&&2==Tb(a))N(a.d,R(a,"Local request error detected and ignored"));else if(a.B&&4==S(a))Gb(a.aa,0,a);else if(a.dispatchEvent("readystatechange"),4==S(a)){N(a.d,R(a,"Request complete"));a.k=!1;try{if(Ub(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<S(a)?a.a.statusText:""}catch(c){N(a.d,"Can not get status: "+c.message),b=""}a.h=b+" ["+Tb(a)+"]";Qb(a)}}finally{Rb(a)}}}
function Rb(a){if(a.a){Ob(a);var b=a.a,c=a.I[0]?ca:null;a.a=null;a.I=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){(a=a.d)&&a.log(ib,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}function Ob(a){a.a&&a.H&&(a.a.ontimeout=null);"number"==typeof a.G&&(l.clearTimeout(a.G),a.G=null)}
function Ub(a){var b=Tb(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=db(String(a.C))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Lb.test(a?a.toLowerCase():"");c=b}return c}function S(a){return a.a?a.a.readyState:0}function Tb(a){try{return 2<S(a)?a.a.status:-1}catch(b){return-1}}k.getResponseHeader=function(a){return this.a&&4==S(this)?this.a.getResponseHeader(a):void 0};
k.getAllResponseHeaders=function(){return this.a&&4==S(this)?this.a.getAllResponseHeaders():""};function R(a,b){return b+" ["+a.Z+" "+a.C+" "+Tb(a)+"]"};google.load("visualization","1",{packages:["table","corechart","annotatedtimeline"]});
function T(a){this.a=a||new Hb;this.f=[];this.S=this.W=this.t=!1;this.K={};for(var b in U)document.getElementById(U[b]).className="pagespeed-hidden-offscreen";a=document.createElement("table");a.id="nav-bar";a.className="pagespeed-sub-tabs";a.innerHTML='<tr><td><a id="'+Wb+'" href="javascript:void(0);">Per application cache stats</a> - </td><td><a id="'+Xb+'" href="javascript:void(0);">Per type cache stats</a> - </td><td><a id="'+Yb+'" href="javascript:void(0);">IPRO status</a> - </td><td><a id="'+
Zb+'" href="javascript:void(0);">Image rewriting</a> - </td><td><a id="'+$b+'" href="javascript:void(0);">Realtime</a></td></tr>';b=document.createElement("div");b.id="ui-div";b.innerHTML='<table id="ui-table" border=1 style="border-collapse: collapse;border-color:silver;"><tr valign="center"><td>Auto refresh (every 5 seconds): <input type="checkbox" id="auto-refresh" '+(this.t?"checked":"")+"></td></tr></table>";document.body.insertBefore(b,document.getElementById(V));document.body.insertBefore(a,
document.getElementById("ui-div"))}T.prototype.show=function(a){for(var b in U){var c=U[b];document.getElementById(c).className=c==a?"":"pagespeed-hidden-offscreen"}c=document.getElementById(a+"_mode");for(b in ac){var d=document.getElementById(ac[b]);d.className=d==c?"pagespeed-underline-link":""}location.href=location.href.split("#")[0]+"#"+a};T.prototype.ca=function(){var a=location.hash.substr(1);if(""==a)this.show(V);else{var b;a:{b=U;for(var c in b)if(b[c]==a){b=!0;break a}b=!1}b&&this.show(a)}};
var Wb="cache_applied_mode",Xb="cache_type_mode",Yb="ipro_mode",Zb="image_rewriting_mode",$b="realtime_mode",ac={ja:Wb,ka:Xb,la:Yb,na:Zb,ma:$b},V="cache_applied",U={ja:V,ka:"cache_type",la:"ipro",na:"image_rewriting",ma:"realtime"};T.prototype.ua=function(){this.t=!this.t};
T.prototype.R=function(){if(!this.a.a)if(!this.W){this.W=!0;var a=new Date,b;b="?json&start_time="+(new Date(a-864E5)).getTime();b+="&end_time="+a.getTime();this.a.send(b+"&granularity=5000")}else if(!this.S||this.t)this.S=!0,a=location.pathname,b=a.lastIndexOf("/",a.length-2),this.a.send(0<b?a.substring(0,b)+"/stats_json":a+"/stats_json")};
T.prototype.ta=function(){if(Ub(this.a)){var a;var b=this.a;try{a=b.a?b.a.responseText:""}catch(c){N(b.d,"Can not get responseText: "+c.message),a=""}if(this.S){var d=JSON.parse(a).variables;a=[];for(var e in d)a.push({name:e,value:d[e]});this.f.push({Q:a,ha:new Date});17280<this.f.length&&this.f.shift();W(this,"pcache-cohorts-dom","Property cache dom cohorts",V);W(this,"pcache-cohorts-beacon","Property cache beacon cohorts",V);W(this,"rewrite_cached_output","Rewrite cached output",V);W(this,"url_input",
"URL Input",V);W(this,"cache","Cache","cache_type");W(this,"file_cache","File Cache","cache_type");W(this,"memcached","Memcached","cache_type");W(this,"lru_cache","LRU","cache_type");W(this,"shm_cache","Shared Memory","cache_type");W(this,"ipro","In place resource optimization","ipro");W(this,"image_rewrite","Image rewrite","image_rewriting");W(this,"image_rewrites_dropped","Image rewrites dropped","image_rewriting");X(this,"http","Http");X(this,"file_cache","File Cache RT");X(this,"lru_cache","LRU Cache RT");
X(this,"serf_fetch","Serf stats RT");X(this,"rewrite","Rewrite stats RT")}else{a=JSON.parse(a);e=a.timestamps;a=a.variables;for(b=0;b<e.length;++b){var f=[];for(d in a)f.push({name:d,value:a[d][b]});this.f.push({Q:f,ha:new Date(e[b])})}window.setTimeout(s(this.R,this),0)}}else d=this.a,console.log(q(d.h)?d.h:String(d.h))};
function bc(a,b){var c=!0;0!=b.indexOf(a)?c=!1:0<=b.indexOf("cache_flush_timestamp_ms")?c=!1:0<=b.indexOf("cache_flush_count")?c=!1:0<=b.indexOf("cache_time_us")&&(c=!1);return c}
function cc(a,b,c,d,e){if(a.K[c])d=a.K[c];else{e=document.getElementById(e);"Loading Charts..."==e.textContent&&(e.textContent="");var f=document.createElement("div");"AnnotatedTimeLine"==d&&(f.className="pagespeed-graphs-chart");f.id=b;b=document.createElement("p");b.textContent=c;b.className="pagespeed-graphs-title";e.appendChild(b);e.appendChild(f);d=new google.visualization[d](f);a.K[c]=d}return d}
function W(a,b,c,d){var e="pagespeed-graphs-"+b;b+="_";c=cc(a,e,c,"BarChart",d);e=document.getElementById(e);d=[];for(var f=new google.visualization.DataTable,g=Pa(a.f[a.f.length-1].Q),h=a=0;h<g.length;++h)if(bc(b,g[h].name)){++a;var m=g[h].name.substring(b.length),m=m.replace(/_/g," ");d.push([m,Number(g[h].value)])}f.addColumn("string","Name");f.addColumn("number","Value");f.addRows(d);b=new google.visualization.DataView(f);b.setColumns([0,1,{calc:function(a,b){for(var c=0,d=0;d<a.getNumberOfRows();++d)c+=
a.getValue(d,1);d=a.getValue(b,1);return d.toString()+" ("+(100*d/(0==c?1:c)).toFixed(2).toString()+"%)"},type:"string",role:"annotation"}]);a=40*a+10;e.style.height=a+20;c.draw(b,{annotations:{alwaysOutside:!0,highContrast:!0,textStyle:{fontSize:12,color:"black"}},hAxis:{direction:1},vAxis:{textPosition:"out"},legend:{position:"none"},width:800,height:a,chartArea:{left:225,top:0,width:"60%",height:"80%"}})}
function X(a,b,c){var d=b+"_";b=cc(a,"pagespeed-graphs-"+b,c,"AnnotatedTimeLine","realtime");c=[];var e=new google.visualization.DataTable;e.addColumn("datetime","Time");for(var f=!0,g=0;g<a.f.length;++g){var h=Pa(a.f[g].Q),m=[];m.push(a.f[g].ha);for(var t=0;t<h.length;++t)if(bc(d,h[t].name)&&(m.push(Number(h[t].value)),f)){var n=h[t].name.substring(d.length),n=n.replace(/_/g," ");e.addColumn("number",n)}f=!1;c.push(m)}e.addRows(c);b.draw(e,dc)}var dc={thickness:1,displayExactValues:!0,legendPosition:"newRow"};
function ec(){P(window,"load",function(){var a=new T;a.ca();for(var b in U)P(document.getElementById(ac[b]),"click",s(a.show,a,U[b]));P(window,"hashchange",s(a.ca,a));P(document.getElementById("auto-refresh"),"change",s(a.ua,a));P(a.a,"complete",s(a.ta,a));setInterval(s(a.R,a),5E3);a.R()})}var Y=["pagespeed","Graphs","Start"],Z=l;Y[0]in Z||!Z.execScript||Z.execScript("var "+Y[0]);for(var $;Y.length&&($=Y.shift());)Y.length||void 0===ec?Z=Z[$]?Z[$]:Z[$]={}:Z[$]=ec;})();
