(function(){var h,aa=aa||{},l=this;function ba(){}
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ca(a){var b=n(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function q(a){return"function"==n(a)}var da="closure_uid_"+(1E9*Math.random()>>>0),ea=0;function fa(a,b,c){return a.call.apply(a.bind,arguments)}
function ga(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?fa:ga;return r.apply(null,arguments)}var ha=Date.now||function(){return+new Date};
function t(a,b){function c(){}c.prototype=b.prototype;a.fa=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.ua=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};function ia(){0!=ja&&(this[da]||(this[da]=++ea));this.M=this.M;this.pa=this.pa}var ja=0;ia.prototype.M=!1;function ka(a){ka[" "](a);return a}ka[" "]=ba;function la(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ma(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var na="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function oa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<na.length;f++)c=na[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function u(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}t(u,Error);u.prototype.name="CustomError";function v(a,b,c,d,e){this.reset(a,b,c,d,e)}v.prototype.U=null;var pa=0;v.prototype.reset=function(a,b,c,d,e){"number"==typeof e||pa++;d||ha();this.q=a;this.oa=b;delete this.U};v.prototype.ea=function(a){this.q=a};v.prototype.getMessage=function(){return this.oa};function qa(){}qa.prototype.T=null;qa.prototype.getOptions=function(){var a;(a=this.T)||(a={},ra(this)&&(a[0]=!0,a[1]=!0),a=this.T=a);return a};function sa(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var ta=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function ua(a,b){return a<b?-1:a>b?1:0};var x;a:{var va=l.navigator;if(va){var wa=va.userAgent;if(wa){x=wa;break a}}x=""};function xa(a,b){b.unshift(a);u.call(this,sa.apply(null,b));b.shift()}t(xa,u);xa.prototype.name="AssertionError";function ya(a,b){throw new xa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var za;function Aa(){}t(Aa,qa);function Ba(a){return(a=ra(a))?new ActiveXObject(a):new XMLHttpRequest}function ra(a){if(!a.X&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.X=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.X}za=new Aa;var y=Array.prototype,Ca=y.indexOf?function(a,b,c){return y.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Da=y.forEach?function(a,b,c){y.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Ea(a){var b;a:{b=Fa;for(var c=a.length,d=p(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:p(a)?a.charAt(b):a[b]}function Ga(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var Ha=-1!=x.indexOf("Opera")||-1!=x.indexOf("OPR"),A=-1!=x.indexOf("Trident")||-1!=x.indexOf("MSIE"),B=-1!=x.indexOf("Gecko")&&-1==x.toLowerCase().indexOf("webkit")&&!(-1!=x.indexOf("Trident")||-1!=x.indexOf("MSIE")),C=-1!=x.toLowerCase().indexOf("webkit");function Ia(){var a=l.document;return a?a.documentMode:void 0}
var Ja=function(){var a="",b;if(Ha&&l.opera)return a=l.opera.version,q(a)?a():a;B?b=/rv\:([^\);]+)(\)|;)/:A?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:C&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(x))?a[1]:"");return A&&(b=Ia(),b>parseFloat(a))?String(b):a}(),Ka={};
function D(a){var b;if(!(b=Ka[a])){b=0;for(var c=ta(String(Ja)).split("."),d=ta(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",m=RegExp("(\\d*)(\\D*)","g"),z=RegExp("(\\d*)(\\D*)","g");do{var w=m.exec(g)||["","",""],N=z.exec(k)||["","",""];if(0==w[0].length&&0==N[0].length)break;b=ua(0==w[1].length?0:parseInt(w[1],10),0==N[1].length?0:parseInt(N[1],10))||ua(0==w[2].length,0==N[2].length)||ua(w[2],N[2])}while(0==b)}b=Ka[a]=0<=b}return b}
var La=l.document,Ma=La&&A?Ia()||("CSS1Compat"==La.compatMode?parseInt(Ja,10):5):void 0;function Na(a){if("function"==typeof a.w)return a.w();if(p(a))return a.split("");if(ca(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return la(a)}
function Oa(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(ca(a)||p(a))Da(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.w)if(ca(a)||p(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=ma(a);else c=void 0;for(var d=Na(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};var Pa=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function Qa(a){if(Ra){Ra=!1;var b=l.location;if(b){var c=b.href;if(c&&(c=(c=Qa(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw Ra=!0,Error();}}return a.match(Pa)}var Ra=C;var E="closure_listenable_"+(1E6*Math.random()|0),Sa=0;function Ta(a,b,c,d,e){this.i=a;this.F=null;this.src=b;this.type=c;this.v=!!d;this.A=e;this.key=++Sa;this.m=this.u=!1}function F(a){a.m=!0;a.i=null;a.F=null;a.src=null;a.A=null};function G(a){this.src=a;this.c={};this.s=0}G.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.c[f];a||(a=this.c[f]=[],this.s++);var g=Ua(a,b,d,e);-1<g?(b=a[g],c||(b.u=!1)):(b=new Ta(b,this.src,f,!!d,e),b.u=c,a.push(b));return b};G.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.c))return!1;var e=this.c[a];b=Ua(e,b,c,d);return-1<b?(F(e[b]),y.splice.call(e,b,1),0==e.length&&(delete this.c[a],this.s--),!0):!1};
function Va(a,b){var c=b.type;if(c in a.c){var d=a.c[c],e=Ca(d,b),f;(f=0<=e)&&y.splice.call(d,e,1);f&&(F(b),0==a.c[c].length&&(delete a.c[c],a.s--))}}G.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.c)if(!a||c==a){for(var d=this.c[c],e=0;e<d.length;e++)++b,F(d[e]);delete this.c[c];this.s--}return b};G.prototype.O=function(a,b,c,d){a=this.c[a.toString()];var e=-1;a&&(e=Ua(a,b,c,d));return-1<e?a[e]:null};
function Ua(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.m&&f.i==b&&f.v==!!c&&f.A==d)return e}return-1};function H(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.j=!1;this.da=!0}H.prototype.stopPropagation=function(){this.j=!0};H.prototype.preventDefault=function(){this.defaultPrevented=!0;this.da=!1};var Wa;(Wa=!A)||(Wa=A&&9<=Ma);var Xa=Wa,Ya=A&&!D("9");!C||D("528");B&&D("1.9b")||A&&D("8")||Ha&&D("9.5")||C&&D("528");B&&!D("8")||A&&D("9");function I(a,b){H.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.n=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(B){var e;a:{try{ka(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=C||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=C||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.n=a;a.defaultPrevented&&this.preventDefault()}}t(I,H);I.prototype.stopPropagation=function(){I.fa.stopPropagation.call(this);this.n.stopPropagation?this.n.stopPropagation():this.n.cancelBubble=!0};I.prototype.preventDefault=function(){I.fa.preventDefault.call(this);var a=this.n;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ya)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Za="closure_lm_"+(1E6*Math.random()|0),$a={},ab=0;function J(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)J(a,b[f],c,d,e);else if(c=bb(c),a&&a[E])a.g.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=K(a);g||(a[Za]=g=new G(a));c=g.add(b,c,!1,d,e);c.F||(d=cb(),c.F=d,d.src=a,d.i=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(db(b.toString()),d),ab++)}}
function cb(){var a=eb,b=Xa?function(c){return a.call(b.src,b.i,c)}:function(c){c=a.call(b.src,b.i,c);if(!c)return c};return b}function fb(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)fb(a,b[f],c,d,e);else c=bb(c),a&&a[E]?a.g.remove(String(b),c,d,e):a&&(a=K(a))&&(b=a.O(b,c,!!d,e))&&gb(b)}
function gb(a){if("number"!=typeof a&&a&&!a.m){var b=a.src;if(b&&b[E])Va(b.g,a);else{var c=a.type,d=a.F;b.removeEventListener?b.removeEventListener(c,d,a.v):b.detachEvent&&b.detachEvent(db(c),d);ab--;(c=K(b))?(Va(c,a),0==c.s&&(c.src=null,b[Za]=null)):F(a)}}}function db(a){return a in $a?$a[a]:$a[a]="on"+a}function hb(a,b,c,d){var e=!0;if(a=K(a))if(b=a.c[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.v==c&&!f.m&&(f=ib(f,d),e=e&&!1!==f)}return e}
function ib(a,b){var c=a.i,d=a.A||a.src;a.u&&gb(a);return c.call(d,b)}
function eb(a,b){if(a.m)return!0;if(!Xa){var c;if(!(c=b))a:{c=["window","event"];for(var d=l,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new I(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,k=e.length-1;!c.j&&0<=k;k--){c.currentTarget=e[k];var m=hb(e[k],f,!0,c),d=d&&m}for(k=0;!c.j&&k<e.length;k++)c.currentTarget=
e[k],m=hb(e[k],f,!1,c),d=d&&m}return d}return ib(a,new I(b,this))}function K(a){a=a[Za];return a instanceof G?a:null}var jb="__closure_events_fn_"+(1E9*Math.random()>>>0);function bb(a){if(q(a))return a;a[jb]||(a[jb]=function(b){return a.handleEvent(b)});return a[jb]};function L(){ia.call(this);this.g=new G(this);this.na=this;this.aa=null}t(L,ia);L.prototype[E]=!0;h=L.prototype;h.addEventListener=function(a,b,c,d){J(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){fb(this,a,b,c,d)};
h.dispatchEvent=function(a){var b,c=this.aa;if(c)for(b=[];c;c=c.aa)b.push(c);var c=this.na,d=a.type||a;if(p(a))a=new H(a,c);else if(a instanceof H)a.target=a.target||c;else{var e=a;a=new H(d,c);oa(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.j&&0<=g;g--)f=a.currentTarget=b[g],e=M(f,d,!0,a)&&e;a.j||(f=a.currentTarget=c,e=M(f,d,!0,a)&&e,a.j||(e=M(f,d,!1,a)&&e));if(b)for(g=0;!a.j&&g<b.length;g++)f=a.currentTarget=b[g],e=M(f,d,!1,a)&&e;return e};
h.removeAllListeners=function(a){return this.g?this.g.removeAll(a):0};function M(a,b,c,d){b=a.g.c[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.m&&g.v==c){var k=g.i,m=g.A||g.src;g.u&&Va(a.g,g);e=!1!==k.call(m,d)&&e}}return e&&0!=d.da}h.O=function(a,b,c,d){return this.g.O(String(a),b,c,d)};function kb(a,b){this.e={};this.b=[];this.l=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof kb?(c=a.o(),d=a.w()):(c=ma(a),d=la(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}h=kb.prototype;h.w=function(){lb(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.e[this.b[b]]);return a};h.o=function(){lb(this);return this.b.concat()};
h.clear=function(){this.e={};this.l=this.b.length=0};h.remove=function(a){return Object.prototype.hasOwnProperty.call(this.e,a)?(delete this.e[a],this.l--,this.b.length>2*this.l&&lb(this),!0):!1};function lb(a){if(a.l!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.e,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.l!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
h.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.e,a)?this.e[a]:b};h.set=function(a,b){Object.prototype.hasOwnProperty.call(this.e,a)||(this.l++,this.b.push(a));this.e[a]=b};h.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new kb(this)};function mb(a){this.Z=a;this.W=this.L=this.q=this.D=null}function O(a,b){this.name=a;this.value=b}O.prototype.toString=function(){return this.name};var nb=new O("SEVERE",1E3),ob=new O("INFO",800),pb=new O("CONFIG",700),qb=new O("FINE",500);h=mb.prototype;h.getName=function(){return this.Z};h.getParent=function(){return this.D};h.ea=function(a){this.q=a};function rb(a){if(a.q)return a.q;if(a.D)return rb(a.D);ya("Root logger has no level set.");return null}
h.log=function(a,b,c){if(a.value>=rb(this).value)for(q(b)&&(b=b()),a=new v(a,String(b),this.Z),c&&(a.U=c),c="log:"+a.getMessage(),l.console&&(l.console.timeStamp?l.console.timeStamp(c):l.console.markTimeline&&l.console.markTimeline(c)),l.msWriteProfilerMark&&l.msWriteProfilerMark(c),c=this;c;){b=c;var d=a;if(b.W)for(var e=0,f=void 0;f=b.W[e];e++)f(d);c=c.getParent()}};h.info=function(a,b){this.log(ob,a,b)};var sb={},tb=null;
function ub(a){tb||(tb=new mb(""),sb[""]=tb,tb.ea(pb));var b;if(!(b=sb[a])){b=new mb(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=ub(a.substr(0,c));c.L||(c.L={});c.L[d]=b;b.D=c;sb[a]=b}return b};function P(a,b){a&&a.log(qb,b,void 0)};function vb(a,b,c){if(q(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:l.setTimeout(a,b||0)};function wb(a){L.call(this);this.headers=new kb;this.J=a||null;this.k=!1;this.I=this.a=null;this.h=this.Y=this.C="";this.p=this.P=this.B=this.N=!1;this.r=0;this.G=null;this.ca=xb;this.H=this.ta=!1}t(wb,L);var xb="",yb=wb.prototype,zb=ub("goog.net.XhrIo");yb.d=zb;var Ab=/^https?$/i,Bb=["POST","PUT"];h=wb.prototype;
h.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.C+"; newUri="+a);b=b?b.toUpperCase():"GET";this.C=a;this.h="";this.Y=b;this.N=!1;this.k=!0;this.a=this.J?Ba(this.J):Ba(za);this.I=this.J?this.J.getOptions():za.getOptions();this.a.onreadystatechange=r(this.$,this);try{P(this.d,Q(this,"Opening Xhr")),this.P=!0,this.a.open(b,String(a),!0),this.P=!1}catch(e){P(this.d,Q(this,"Error opening Xhr: "+e.message));Cb(this,e);return}a=c||"";var f=this.headers.clone();
d&&Oa(d,function(a,b){f.set(b,a)});d=Ea(f.o());c=l.FormData&&a instanceof l.FormData;!(0<=Ca(Bb,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.ca&&(this.a.responseType=this.ca);"withCredentials"in this.a&&(this.a.withCredentials=this.ta);try{Db(this),0<this.r&&(this.H=Eb(this.a),P(this.d,Q(this,"Will abort after "+this.r+"ms if incomplete, xhr2 "+this.H)),this.H?(this.a.timeout=this.r,this.a.ontimeout=
r(this.ha,this)):this.G=vb(this.ha,this.r,this)),P(this.d,Q(this,"Sending request")),this.B=!0,this.a.send(a),this.B=!1}catch(g){P(this.d,Q(this,"Send error: "+g.message)),Cb(this,g)}};function Eb(a){return A&&D(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Fa(a){return"content-type"==a.toLowerCase()}h.ha=function(){"undefined"!=typeof aa&&this.a&&(this.h="Timed out after "+this.r+"ms, aborting",P(this.d,Q(this,this.h)),this.dispatchEvent("timeout"),this.abort(8))};
function Cb(a,b){a.k=!1;a.a&&(a.p=!0,a.a.abort(),a.p=!1);a.h=b;Fb(a);Gb(a)}function Fb(a){a.N||(a.N=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}h.abort=function(){this.a&&this.k&&(P(this.d,Q(this,"Aborting")),this.k=!1,this.p=!0,this.a.abort(),this.p=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Gb(this))};h.$=function(){this.M||(this.P||this.B||this.p?Hb(this):this.qa())};h.qa=function(){Hb(this)};
function Hb(a){if(a.k&&"undefined"!=typeof aa)if(a.I[1]&&4==R(a)&&2==Ib(a))P(a.d,Q(a,"Local request error detected and ignored"));else if(a.B&&4==R(a))vb(a.$,0,a);else if(a.dispatchEvent("readystatechange"),4==R(a)){P(a.d,Q(a,"Request complete"));a.k=!1;try{if(Jb(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<R(a)?a.a.statusText:""}catch(c){P(a.d,"Can not get status: "+c.message),b=""}a.h=b+" ["+Ib(a)+"]";Fb(a)}}finally{Gb(a)}}}
function Gb(a){if(a.a){Db(a);var b=a.a,c=a.I[0]?ba:null;a.a=null;a.I=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){(a=a.d)&&a.log(nb,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}function Db(a){a.a&&a.H&&(a.a.ontimeout=null);"number"==typeof a.G&&(l.clearTimeout(a.G),a.G=null)}
function Jb(a){var b=Ib(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=Qa(String(a.C))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Ab.test(a?a.toLowerCase():"");c=b}return c}function R(a){return a.a?a.a.readyState:0}function Ib(a){try{return 2<R(a)?a.a.status:-1}catch(b){return-1}}h.getResponseHeader=function(a){return this.a&&4==R(this)?this.a.getResponseHeader(a):void 0};
h.getAllResponseHeaders=function(){return this.a&&4==R(this)?this.a.getAllResponseHeaders():""};function Q(a,b){return b+" ["+a.Y+" "+a.C+" "+Ib(a)+"]"};google.load("visualization","1",{packages:["table","corechart","annotatedtimeline"]});
function S(a){this.a=a||new wb;this.f=[];this.S=this.V=this.t=!1;this.K={};for(var b in T)document.getElementById(T[b]).className="pagespeed-hidden-offscreen";a=document.createElement("table");a.id="nav-bar";a.className="pagespeed-sub-tabs";a.innerHTML='<tr><td><a id="'+Kb+'" href="javascript:void(0);">Per application cache stats</a> - </td><td><a id="'+Lb+'" href="javascript:void(0);">Per type cache stats</a> - </td><td><a id="'+Mb+'" href="javascript:void(0);">IPRO status</a> - </td><td><a id="'+
Nb+'" href="javascript:void(0);">Image rewriting</a> - </td><td><a id="'+Ob+'" href="javascript:void(0);">Realtime</a></td></tr>';b=document.createElement("div");b.id="ui-div";b.innerHTML='<table id="ui-table" border=1 style="border-collapse: collapse;border-color:silver;"><tr valign="center"><td>Auto refresh (every 5 seconds): <input type="checkbox" id="auto-refresh" '+(this.t?"checked":"")+"></td></tr></table>";document.body.insertBefore(b,document.getElementById(U));document.body.insertBefore(a,
document.getElementById("ui-div"))}S.prototype.show=function(a){for(var b in T){var c=T[b];document.getElementById(c).className=c==a?"":"pagespeed-hidden-offscreen"}c=document.getElementById(a+"_mode");for(b in Pb){var d=document.getElementById(Pb[b]);d.className=d==c?"pagespeed-underline-link":""}location.href=location.href.split("#")[0]+"#"+a};S.prototype.ba=function(){var a=location.hash.substr(1);if(""==a)this.show(U);else{var b;a:{b=T;for(var c in b)if(b[c]==a){b=!0;break a}b=!1}b&&this.show(a)}};
var Kb="cache_applied_mode",Lb="cache_type_mode",Mb="ipro_mode",Nb="image_rewriting_mode",Ob="realtime_mode",Pb={ia:Kb,ja:Lb,ka:Mb,ma:Nb,la:Ob},U="cache_applied",T={ia:U,ja:"cache_type",ka:"ipro",ma:"image_rewriting",la:"realtime"};S.prototype.sa=function(){this.t=!this.t};
S.prototype.R=function(){if(!this.a.a)if(!this.V){this.V=!0;var a=new Date,b;b="?json&start_time="+(new Date(a-864E5)).getTime();b+="&end_time="+a.getTime();this.a.send(b+"&granularity=5000")}else if(!this.S||this.t)this.S=!0,a=location.pathname,b=a.lastIndexOf("/",a.length-2),this.a.send(0<b?a.substring(0,b)+"/stats_json":a+"/stats_json")};
S.prototype.ra=function(){if(Jb(this.a)){var a;var b=this.a;try{a=b.a?b.a.responseText:""}catch(c){P(b.d,"Can not get responseText: "+c.message),a=""}if(this.S){var d=JSON.parse(a).variables;a=[];for(var e in d)a.push({name:e,value:d[e]});this.f.push({Q:a,ga:new Date});17280<this.f.length&&this.f.shift();V(this,"pcache-cohorts-dom","Property cache dom cohorts",U);V(this,"pcache-cohorts-beacon","Property cache beacon cohorts",U);V(this,"rewrite_cached_output","Rewrite cached output",U);V(this,"url_input",
"URL Input",U);V(this,"cache","Cache","cache_type");V(this,"file_cache","File Cache","cache_type");V(this,"memcached","Memcached","cache_type");V(this,"lru_cache","LRU","cache_type");V(this,"shm_cache","Shared Memory","cache_type");V(this,"ipro","In place resource optimization","ipro");V(this,"image_rewrite","Image rewrite","image_rewriting");V(this,"image_rewrites_dropped","Image rewrites dropped","image_rewriting");W(this,"http","Http");W(this,"file_cache","File Cache RT");W(this,"lru_cache","LRU Cache RT");
W(this,"serf_fetch","Serf stats RT");W(this,"rewrite","Rewrite stats RT")}else{a=JSON.parse(a);e=a.timestamps;a=a.variables;for(b=0;b<e.length;++b){var f=[];for(d in a)f.push({name:d,value:a[d][b]});this.f.push({Q:f,ga:new Date(e[b])})}window.setTimeout(r(this.R,this),0)}}else d=this.a,console.log(p(d.h)?d.h:String(d.h))};
function Qb(a,b){var c=!0;0!=b.indexOf(a)?c=!1:0<=b.indexOf("cache_flush_timestamp_ms")?c=!1:0<=b.indexOf("cache_flush_count")?c=!1:0<=b.indexOf("cache_time_us")&&(c=!1);return c}
function Rb(a,b,c,d,e){if(a.K[c])d=a.K[c];else{e=document.getElementById(e);"Loading Charts..."==e.textContent&&(e.textContent="");var f=document.createElement("div");"AnnotatedTimeLine"==d&&(f.className="pagespeed-graphs-chart");f.id=b;b=document.createElement("p");b.textContent=c;b.className="pagespeed-graphs-title";e.appendChild(b);e.appendChild(f);d=new google.visualization[d](f);a.K[c]=d}return d}
function V(a,b,c,d){var e="pagespeed-graphs-"+b;b+="_";c=Rb(a,e,c,"BarChart",d);e=document.getElementById(e);d=[];for(var f=new google.visualization.DataTable,g=Ga(a.f[a.f.length-1].Q),k=a=0;k<g.length;++k)if(Qb(b,g[k].name)){++a;var m=g[k].name.substring(b.length),m=m.replace(/_/g," ");d.push([m,Number(g[k].value)])}f.addColumn("string","Name");f.addColumn("number","Value");f.addRows(d);b=new google.visualization.DataView(f);b.setColumns([0,1,{calc:function(a,b){for(var c=0,d=0;d<a.getNumberOfRows();++d)c+=
a.getValue(d,1);d=a.getValue(b,1);return d.toString()+" ("+(100*d/(0==c?1:c)).toFixed(2).toString()+"%)"},type:"string",role:"annotation"}]);a=40*a+10;e.style.height=a+20;c.draw(b,{annotations:{alwaysOutside:!0,highContrast:!0,textStyle:{fontSize:12,color:"black"}},hAxis:{direction:1},vAxis:{textPosition:"out"},legend:{position:"none"},width:800,height:a,chartArea:{left:225,top:0,width:"60%",height:"80%"}})}
function W(a,b,c){var d=b+"_";b=Rb(a,"pagespeed-graphs-"+b,c,"AnnotatedTimeLine","realtime");c=[];var e=new google.visualization.DataTable;e.addColumn("datetime","Time");for(var f=!0,g=0;g<a.f.length;++g){var k=Ga(a.f[g].Q),m=[];m.push(a.f[g].ga);for(var z=0;z<k.length;++z)if(Qb(d,k[z].name)&&(m.push(Number(k[z].value)),f)){var w=k[z].name.substring(d.length),w=w.replace(/_/g," ");e.addColumn("number",w)}f=!1;c.push(m)}e.addRows(c);b.draw(e,Sb)}var Sb={thickness:1,displayExactValues:!0,legendPosition:"newRow"};
function Tb(){J(window,"load",function(){var a=new S;a.ba();for(var b in T)J(document.getElementById(Pb[b]),"click",r(a.show,a,T[b]));J(window,"hashchange",r(a.ba,a));J(document.getElementById("auto-refresh"),"change",r(a.sa,a));J(a.a,"complete",r(a.ra,a));setInterval(r(a.R,a),5E3);a.R()})}var X=["pagespeed","Graphs","Start"],Y=l;X[0]in Y||!Y.execScript||Y.execScript("var "+X[0]);for(var Z;X.length&&(Z=X.shift());)X.length||void 0===Tb?Y=Y[Z]?Y[Z]:Y[Z]={}:Y[Z]=Tb;})();
