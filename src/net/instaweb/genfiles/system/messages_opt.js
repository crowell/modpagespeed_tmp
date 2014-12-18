(function(){var h,aa=aa||{},l=this;function ba(a){a=a.split(".");for(var b=l,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}function ca(){}
function m(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){var b=m(a);return"array"==b||"object"==b&&"number"==typeof a.length}function n(a){return"string"==typeof a}function p(a){return"function"==m(a)}var ea="closure_uid_"+(1E9*Math.random()>>>0),fa=0;function ga(a,b,c){return a.call.apply(a.bind,arguments)}
function ha(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ga:ha;return q.apply(null,arguments)}var ia=Date.now||function(){return+new Date};
function r(a,b){function c(){}c.prototype=b.prototype;a.da=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.qa=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};function ja(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var ka=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function la(a){if(!ma.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(na,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(oa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(pa,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(qa,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(ra,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(sa,"&#0;"));return a}var na=/&/g,oa=/</g,pa=/>/g,qa=/"/g,ra=/'/g,sa=/\x00/g,ma=/[\x00&<>"']/;function ta(a,b){return a<b?-1:a>b?1:0};function ua(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function va(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var wa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function xa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<wa.length;f++)c=wa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function t(a,b,c,d,e){this.reset(a,b,c,d,e)}t.prototype.U=null;t.prototype.T=null;var ya=0;t.prototype.reset=function(a,b,c,d,e){"number"==typeof e||ya++;d||ia();this.q=a;this.ia=b;delete this.U;delete this.T};t.prototype.ca=function(a){this.q=a};function w(a){if(Error.captureStackTrace)Error.captureStackTrace(this,w);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}r(w,Error);w.prototype.name="CustomError";var x;a:{var za=l.navigator;if(za){var Aa=za.userAgent;if(Aa){x=Aa;break a}}x=""};var y="closure_listenable_"+(1E6*Math.random()|0),Ba=0;function Ca(a,b,c,d,e){this.h=a;this.F=null;this.src=b;this.type=c;this.v=!!d;this.A=e;this.key=++Ba;this.m=this.u=!1}function Da(a){a.m=!0;a.h=null;a.F=null;a.src=null;a.A=null};function Ea(a){Ea[" "](a);return a}Ea[" "]=ca;function Fa(a,b){b.unshift(a);w.call(this,ja.apply(null,b));b.shift()}r(Fa,w);Fa.prototype.name="AssertionError";function Ga(a,b){throw new Fa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};function Ha(){0!=Ia&&(this[ea]||(this[ea]=++fa));this.N=this.N;this.ja=this.ja}var Ia=0;Ha.prototype.N=!1;function z(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.i=!1;this.ba=!0}z.prototype.stopPropagation=function(){this.i=!0};z.prototype.preventDefault=function(){this.defaultPrevented=!0;this.ba=!1};function Ja(){}Ja.prototype.S=null;function Ka(a){var b;(b=a.S)||(b={},La(a)&&(b[0]=!0,b[1]=!0),b=a.S=b);return b};var Ma;function Na(){}r(Na,Ja);function Oa(a){return(a=La(a))?new ActiveXObject(a):new XMLHttpRequest}function La(a){if(!a.W&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.W=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.W}Ma=new Na;var A=Array.prototype,Pa=A.indexOf?function(a,b,c){return A.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(n(a))return n(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Qa=A.forEach?function(a,b,c){A.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Ra(a){var b;a:{b=Sa;for(var c=a.length,d=n(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:n(a)?a.charAt(b):a[b]}function Ta(a){if("array"!=m(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};function B(a){this.src=a;this.c={};this.I=0}B.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.c[f];a||(a=this.c[f]=[],this.I++);var g=Ua(a,b,d,e);-1<g?(b=a[g],c||(b.u=!1)):(b=new Ca(b,this.src,f,!!d,e),b.u=c,a.push(b));return b};B.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.c))return!1;var e=this.c[a];b=Ua(e,b,c,d);return-1<b?(Da(e[b]),A.splice.call(e,b,1),0==e.length&&(delete this.c[a],this.I--),!0):!1};
function Va(a,b){var c=b.type;if(c in a.c){var d=a.c[c],e=Pa(d,b),f;(f=0<=e)&&A.splice.call(d,e,1);f&&(Da(b),0==a.c[c].length&&(delete a.c[c],a.I--))}}B.prototype.Q=function(a,b,c,d){a=this.c[a.toString()];var e=-1;a&&(e=Ua(a,b,c,d));return-1<e?a[e]:null};function Ua(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.m&&f.h==b&&f.v==!!c&&f.A==d)return e}return-1};var Wa=-1!=x.indexOf("Opera")||-1!=x.indexOf("OPR"),C=-1!=x.indexOf("Trident")||-1!=x.indexOf("MSIE"),D=-1!=x.indexOf("Gecko")&&-1==x.toLowerCase().indexOf("webkit")&&!(-1!=x.indexOf("Trident")||-1!=x.indexOf("MSIE")),E=-1!=x.toLowerCase().indexOf("webkit");function Xa(){var a=l.document;return a?a.documentMode:void 0}
var Ya=function(){var a="",b;if(Wa&&l.opera)return a=l.opera.version,p(a)?a():a;D?b=/rv\:([^\);]+)(\)|;)/:C?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:E&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(x))?a[1]:"");return C&&(b=Xa(),b>parseFloat(a))?String(b):a}(),Za={};
function F(a){var b;if(!(b=Za[a])){b=0;for(var c=ka(String(Ya)).split("."),d=ka(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",H=RegExp("(\\d*)(\\D*)","g"),L=RegExp("(\\d*)(\\D*)","g");do{var u=H.exec(g)||["","",""],v=L.exec(k)||["","",""];if(0==u[0].length&&0==v[0].length)break;b=ta(0==u[1].length?0:parseInt(u[1],10),0==v[1].length?0:parseInt(v[1],10))||ta(0==u[2].length,0==v[2].length)||ta(u[2],v[2])}while(0==b)}b=Za[a]=0<=b}return b}
var $a=l.document,ab=$a&&C?Xa()||("CSS1Compat"==$a.compatMode?parseInt(Ya,10):5):void 0;var bb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function cb(a){if(db){db=!1;var b=l.location;if(b){var c=b.href;if(c&&(c=(c=cb(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw db=!0,Error();}}return a.match(bb)}var db=E;var eb;(eb=!C)||(eb=C&&9<=ab);var fb=eb,gb=C&&!F("9");!E||F("528");D&&F("1.9b")||C&&F("8")||Wa&&F("9.5")||E&&F("528");D&&!F("8")||C&&F("9");function G(a,b){z.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.n=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(D){var e;a:{try{Ea(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=E||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=E||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.n=a;a.defaultPrevented&&this.preventDefault()}}r(G,z);G.prototype.stopPropagation=function(){G.da.stopPropagation.call(this);this.n.stopPropagation?this.n.stopPropagation():this.n.cancelBubble=!0};G.prototype.preventDefault=function(){G.da.preventDefault.call(this);var a=this.n;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,gb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var hb="closure_lm_"+(1E6*Math.random()|0),ib={},jb=0;function I(a,b,c,d,e){if("array"==m(b))for(var f=0;f<b.length;f++)I(a,b[f],c,d,e);else if(c=kb(c),a&&a[y])a.l.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=J(a);g||(a[hb]=g=new B(a));c=g.add(b,c,!1,d,e);c.F||(d=lb(),c.F=d,d.src=a,d.h=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(mb(b.toString()),d),jb++)}}
function lb(){var a=nb,b=fb?function(c){return a.call(b.src,b.h,c)}:function(c){c=a.call(b.src,b.h,c);if(!c)return c};return b}function ob(a,b,c,d,e){if("array"==m(b))for(var f=0;f<b.length;f++)ob(a,b[f],c,d,e);else c=kb(c),a&&a[y]?a.l.remove(String(b),c,d,e):a&&(a=J(a))&&(b=a.Q(b,c,!!d,e))&&pb(b)}
function pb(a){if("number"!=typeof a&&a&&!a.m){var b=a.src;if(b&&b[y])Va(b.l,a);else{var c=a.type,d=a.F;b.removeEventListener?b.removeEventListener(c,d,a.v):b.detachEvent&&b.detachEvent(mb(c),d);jb--;(c=J(b))?(Va(c,a),0==c.I&&(c.src=null,b[hb]=null)):Da(a)}}}function mb(a){return a in ib?ib[a]:ib[a]="on"+a}function qb(a,b,c,d){var e=1;if(a=J(a))if(b=a.c[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.v==c&&!f.m&&(e&=!1!==rb(f,d))}return Boolean(e)}
function rb(a,b){var c=a.h,d=a.A||a.src;a.u&&pb(a);return c.call(d,b)}
function nb(a,b){if(a.m)return!0;if(!fb){var c=b||ba("window.event"),d=new G(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,k=c.length-1;!d.i&&0<=k;k--)d.currentTarget=c[k],e&=qb(c[k],f,!0,d);for(k=0;!d.i&&k<c.length;k++)d.currentTarget=c[k],e&=qb(c[k],f,!1,d)}return e}return rb(a,new G(b,this))}
function J(a){a=a[hb];return a instanceof B?a:null}var sb="__closure_events_fn_"+(1E9*Math.random()>>>0);function kb(a){if(p(a))return a;a[sb]||(a[sb]=function(b){return a.handleEvent(b)});return a[sb]};function K(){Ha.call(this);this.l=new B(this);this.fa=this;this.$=null}r(K,Ha);K.prototype[y]=!0;K.prototype.addEventListener=function(a,b,c,d){I(this,a,b,c,d)};K.prototype.removeEventListener=function(a,b,c,d){ob(this,a,b,c,d)};
K.prototype.dispatchEvent=function(a){var b,c=this.$;if(c)for(b=[];c;c=c.$)b.push(c);var c=this.fa,d=a.type||a;if(n(a))a=new z(a,c);else if(a instanceof z)a.target=a.target||c;else{var e=a;a=new z(d,c);xa(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.i&&0<=g;g--)f=a.currentTarget=b[g],e=M(f,d,!0,a)&&e;a.i||(f=a.currentTarget=c,e=M(f,d,!0,a)&&e,a.i||(e=M(f,d,!1,a)&&e));if(b)for(g=0;!a.i&&g<b.length;g++)f=a.currentTarget=b[g],e=M(f,d,!1,a)&&e;return e};
function M(a,b,c,d){b=a.l.c[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.m&&g.v==c){var k=g.h,H=g.A||g.src;g.u&&Va(a.l,g);e=!1!==k.call(H,d)&&e}}return e&&0!=d.ba}K.prototype.Q=function(a,b,c,d){return this.l.Q(String(a),b,c,d)};function tb(a){if("function"==typeof a.w)return a.w();if(n(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return ua(a)}
function ub(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(da(a)||n(a))Qa(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.w)if(da(a)||n(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=va(a);else c=void 0;for(var d=tb(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};function N(a,b){this.e={};this.b=[];this.k=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof N?(c=a.o(),d=a.w()):(c=va(a),d=ua(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}h=N.prototype;h.w=function(){vb(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.e[this.b[b]]);return a};h.o=function(){vb(this);return this.b.concat()};
h.clear=function(){this.e={};this.k=this.b.length=0};h.remove=function(a){return Object.prototype.hasOwnProperty.call(this.e,a)?(delete this.e[a],this.k--,this.b.length>2*this.k&&vb(this),!0):!1};function vb(a){if(a.k!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.e,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.k!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
h.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.e,a)?this.e[a]:b};h.set=function(a,b){Object.prototype.hasOwnProperty.call(this.e,a)||(this.k++,this.b.push(a));this.e[a]=b};h.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new N(this)};function wb(a){var b;b||(b=xb(a||arguments.callee.caller,[]));return b}
function xb(a,b){var c=[];if(0<=Pa(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(yb(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=yb(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(xb(a.caller,
b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")}function yb(a){if(O[a])return O[a];a=String(a);if(!O[a]){var b=/function ([^\(]+)/.exec(a);O[a]=b?b[1]:"[Anonymous]"}return O[a]}var O={};function P(a){this.Y=a;this.V=this.M=this.q=this.D=null}function Q(a,b){this.name=a;this.value=b}Q.prototype.toString=function(){return this.name};var zb=new Q("SEVERE",1E3),Ab=new Q("INFO",800),Bb=new Q("CONFIG",700),Cb=new Q("FINE",500);h=P.prototype;h.getName=function(){return this.Y};h.getParent=function(){return this.D};h.ca=function(a){this.q=a};function Db(a){if(a.q)return a.q;if(a.D)return Db(a.D);Ga("Root logger has no level set.");return null}
h.log=function(a,b,c){if(a.value>=Db(this).value)for(p(b)&&(b=b()),a=this.ha(a,b,c,P.prototype.log),b="log:"+a.ia,l.console&&(l.console.timeStamp?l.console.timeStamp(b):l.console.markTimeline&&l.console.markTimeline(b)),l.msWriteProfilerMark&&l.msWriteProfilerMark(b),b=this;b;){c=b;var d=a;if(c.V)for(var e=0,f=void 0;f=c.V[e];e++)f(d);b=b.getParent()}};
h.ha=function(a,b,c,d){var e=new t(a,String(b),this.Y);if(c){var f;f=d||arguments.callee.caller;e.U=c;var g;try{var k;var H=ba("window.location.href");if(n(c))k={message:c,name:"Unknown error",lineNumber:"Not available",fileName:H,stack:"Not available"};else{var L,u,v=!1;try{L=c.lineNumber||c.ra||"Not available"}catch(Xb){L="Not available",v=!0}try{u=c.fileName||c.filename||c.sourceURL||l.$googDebugFname||H}catch(Yb){u="Not available",v=!0}k=!v&&c.lineNumber&&c.fileName&&c.stack&&c.message&&c.name?
c:{message:c.message||"Not available",name:c.name||"UnknownError",lineNumber:L,fileName:u,stack:c.stack||"Not available"}}g="Message: "+la(k.message)+'\nUrl: <a href="view-source:'+k.fileName+'" target="_new">'+k.fileName+"</a>\nLine: "+k.lineNumber+"\n\nBrowser stack:\n"+la(k.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+la(wb(f)+"-> ")}catch(Qb){g="Exception trying to expose exception! You win, we lose. "+Qb}e.T=g}return e};h.info=function(a,b){this.log(Ab,a,b)};var Eb={},R=null;
function Fb(a){R||(R=new P(""),Eb[""]=R,R.ca(Bb));var b;if(!(b=Eb[a])){b=new P(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Fb(a.substr(0,c));c.M||(c.M={});c.M[d]=b;b.D=c;Eb[a]=b}return b};function S(a,b){a&&a.log(Cb,b,void 0)};function Gb(a,b,c){if(p(a))c&&(a=q(a,c));else if(a&&"function"==typeof a.handleEvent)a=q(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:l.setTimeout(a,b||0)};function T(a){K.call(this);this.headers=new N;this.L=a||null;this.j=!1;this.K=this.a=null;this.f=this.X=this.C="";this.p=this.R=this.B=this.O=!1;this.s=0;this.H=null;this.aa=Hb;this.J=this.pa=!1}r(T,K);var Hb="",Ib=T.prototype,Jb=Fb("goog.net.XhrIo");Ib.d=Jb;var Kb=/^https?$/i,Lb=["POST","PUT"];h=T.prototype;
h.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.C+"; newUri="+a);b=b?b.toUpperCase():"GET";this.C=a;this.f="";this.X=b;this.O=!1;this.j=!0;this.a=this.L?Oa(this.L):Oa(Ma);this.K=this.L?Ka(this.L):Ka(Ma);this.a.onreadystatechange=q(this.Z,this);try{S(this.d,U(this,"Opening Xhr")),this.R=!0,this.a.open(b,String(a),!0),this.R=!1}catch(e){S(this.d,U(this,"Error opening Xhr: "+e.message));Mb(this,e);return}a=c||"";var f=this.headers.clone();
d&&ub(d,function(a,b){f.set(b,a)});d=Ra(f.o());c=l.FormData&&a instanceof l.FormData;!(0<=Pa(Lb,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.aa&&(this.a.responseType=this.aa);"withCredentials"in this.a&&(this.a.withCredentials=this.pa);try{Nb(this),0<this.s&&(this.J=Ob(this.a),S(this.d,U(this,"Will abort after "+this.s+"ms if incomplete, xhr2 "+this.J)),this.J?(this.a.timeout=this.s,this.a.ontimeout=
q(this.ea,this)):this.H=Gb(this.ea,this.s,this)),S(this.d,U(this,"Sending request")),this.B=!0,this.a.send(a),this.B=!1}catch(g){S(this.d,U(this,"Send error: "+g.message)),Mb(this,g)}};function Ob(a){return C&&F(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Sa(a){return"content-type"==a.toLowerCase()}h.ea=function(){"undefined"!=typeof aa&&this.a&&(this.f="Timed out after "+this.s+"ms, aborting",S(this.d,U(this,this.f)),this.dispatchEvent("timeout"),this.abort(8))};
function Mb(a,b){a.j=!1;a.a&&(a.p=!0,a.a.abort(),a.p=!1);a.f=b;Pb(a);Rb(a)}function Pb(a){a.O||(a.O=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}h.abort=function(){this.a&&this.j&&(S(this.d,U(this,"Aborting")),this.j=!1,this.p=!0,this.a.abort(),this.p=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Rb(this))};h.Z=function(){this.N||(this.R||this.B||this.p?Sb(this):this.ka())};h.ka=function(){Sb(this)};
function Sb(a){if(a.j&&"undefined"!=typeof aa)if(a.K[1]&&4==V(a)&&2==W(a))S(a.d,U(a,"Local request error detected and ignored"));else if(a.B&&4==V(a))Gb(a.Z,0,a);else if(a.dispatchEvent("readystatechange"),4==V(a)){S(a.d,U(a,"Request complete"));a.j=!1;try{if(Tb(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<V(a)?a.a.statusText:""}catch(c){S(a.d,"Can not get status: "+c.message),b=""}a.f=b+" ["+W(a)+"]";Pb(a)}}finally{Rb(a)}}}
function Rb(a){if(a.a){Nb(a);var b=a.a,c=a.K[0]?ca:null;a.a=null;a.K=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){(a=a.d)&&a.log(zb,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}function Nb(a){a.a&&a.J&&(a.a.ontimeout=null);"number"==typeof a.H&&(l.clearTimeout(a.H),a.H=null)}
function Tb(a){var b=W(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=cb(String(a.C))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Kb.test(a?a.toLowerCase():"");c=b}return c}function V(a){return a.a?a.a.readyState:0}function W(a){try{return 2<V(a)?a.a.status:-1}catch(b){return-1}}h.getResponseHeader=function(a){return this.a&&4==V(this)?this.a.getResponseHeader(a):void 0};
h.getAllResponseHeaders=function(){return this.a&&4==V(this)?this.a.getAllResponseHeaders():""};function U(a,b){return b+" ["+a.X+" "+a.C+" "+W(a)+"]"};function Ub(a){this.a=a||new T;this.g=document.getElementById("log").innerHTML.split("\n");0<this.g.length&&this.g.pop();this.r=this.g.length;this.G=!1;this.P="";this.t=!1;a=document.createElement("div");a.style.overflow="hidden";a.style.clear="both";var b=document.createElement("div");b.id="ui-div";b.innerHTML='<table id="ui-table" border="1" style="float:left; border-collapse: collapse;border-color:silver;"><tr valign="center"><td>Reverse: <input type="checkbox" id="reverse" '+(this.G?"checked":
"")+'></td><td>Auto refresh (every 5 seconds): <input type="checkbox" id="auto-refresh" '+(this.t?"checked":"")+'></td><td>&nbsp;&nbsp;&nbsp;&nbsp;Filter: <input id="text-filter" type="text" size="70"></td></tr></table>';a.appendChild(b);b=document.createElement("div");b.id="num";b.className="pagespeed-show-number";a.appendChild(b);document.body.insertBefore(a,document.getElementById("log"));Vb(this)}h=Ub.prototype;h.oa=function(){this.G=!this.G;this.update()};h.na=function(){this.t=!this.t};
h.ma=function(a){this.P=a.value;this.update()};function Vb(a,b){var c=void 0!=b?b:a.g.length;document.getElementById("num").textContent=c==a.r?"Total message count: "+c:"Visible message count: "+c+"/"+a.r}
h.update=function(){var a=document.getElementById("log"),b;b=this.g;var c=b.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=b[e];b=d}else b=[];if(this.P)for(c=b.length-1;0<=c;--c)b[c]&&-1!=b[c].toLowerCase().indexOf(this.P.toLowerCase())||b.splice(c,1);Vb(this,b.length);a.innerHTML=this.G?b.reverse().join("\n"):b.join("\n")};h.ga=function(){this.t&&!this.a.a&&this.a.send(document.location.href)};
h.la=function(){if(Tb(this.a)){var a;var b=this.a;try{a=b.a?b.a.responseText:""}catch(c){S(b.d,"Can not get responseText: "+c.message),a=""}var b=[],b=a.indexOf('<div id="log">'),d=a.indexOf('<script type="text/javascript">',b);0<=b&&0<=d?(b=a.substring(b+14,d-7).split("\n"),b.pop(),this.g=b,this.r=b.length,this.update()):(Ta(this.g),this.r=0,Vb(this),document.getElementById("log").textContent="Failed to write messages to this page. Verify that MessageBufferSize is not set to 0 in pagespeed.conf.")}else a=
this.a,console.log(n(a.f)?a.f:String(a.f)),Ta(this.g),this.r=0,Vb(this),document.getElementById("log").textContent="Sorry, the message history cannot be loaded. Please wait and try again later."};function Wb(){I(window,"load",function(){var a=new Ub,b=document.getElementById("text-filter");I(b,"keyup",q(a.ma,a,b));I(document.getElementById("reverse"),"change",q(a.oa,a));I(document.getElementById("auto-refresh"),"change",q(a.na,a));I(a.a,"complete",q(a.la,a));setInterval(q(a.ga,a),5E3)})}
var X=["pagespeed","Messages","Start"],Y=l;X[0]in Y||!Y.execScript||Y.execScript("var "+X[0]);for(var Z;X.length&&(Z=X.shift());)X.length||void 0===Wb?Y=Y[Z]?Y[Z]:Y[Z]={}:Y[Z]=Wb;})();
