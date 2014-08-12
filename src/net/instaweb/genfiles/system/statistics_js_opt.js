(function(){var aa=aa||{},h=this,ba=function(a){a=a.split(".");for(var b=h,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b},ca=function(){},l=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";
if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},da=function(a){var b=l(a);return"array"==b||"object"==b&&"number"==typeof a.length},m=function(a){return"string"==typeof a},n=function(a){return"function"==l(a)},ea=function(a,b,c){return a.call.apply(a.bind,arguments)},fa=function(a,b,c){if(!a)throw Error();if(2<
arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},p=function(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return p.apply(null,arguments)},ga=Date.now||function(){return+new Date},q=function(a,b){function c(){}c.prototype=b.prototype;a.G=b.prototype;a.prototype=new c;
a.J=function(a,c,e){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return p.apply(null,c)}return p(this,a)};var r=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,r);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};q(r,Error);r.prototype.name="CustomError";var ha=function(a,b){for(var c=a.split("%s"),d="",f=Array.prototype.slice.call(arguments,1);f.length&&1<c.length;)d+=c.shift()+f.shift();return d+c.join("%s")},pa=function(a){if(!ia.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ja,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ka,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(la,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(ma,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(na,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(oa,"&#0;"));return a},ja=/&/g,ka=/</g,
la=/>/g,ma=/"/g,na=/'/g,oa=/\x00/g,ia=/[\x00&<>"']/,qa=function(a,b){return a<b?-1:a>b?1:0};var s=function(a,b){b.unshift(a);r.call(this,ha.apply(null,b));b.shift()};q(s,r);s.prototype.name="AssertionError";var t=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),f=Array.prototype.slice.call(arguments,2);throw new s(""+d,f||[]);}},ra=function(a,b){throw new s("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var u=Array.prototype,sa=u.indexOf?function(a,b,c){t(null!=a.length);return u.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(m(a))return m(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ta=u.forEach?function(a,b,c){t(null!=a.length);u.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,f=m(a)?a.split(""):a,e=0;e<d;e++)e in f&&b.call(c,f[e],e,a)},va=function(a){var b;t:{b=ua;for(var c=a.length,d=m(a)?a.split(""):a,
f=0;f<c;f++)if(f in d&&b.call(void 0,d[f],f,a)){b=f;break t}b=-1}return 0>b?null:m(a)?a.charAt(b):a[b]};var wa=function(a){wa[" "](a);return a};wa[" "]=ca;var xa=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},ya=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},za="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Aa=function(a,b){for(var c,d,f=1;f<arguments.length;f++){d=arguments[f];for(c in d)a[c]=d[c];for(var e=0;e<za.length;e++)c=za[e],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var v;t:{var Ba=h.navigator;if(Ba){var Ca=Ba.userAgent;if(Ca){v=Ca;break t}}v=""}var w=function(a){return-1!=v.indexOf(a)};var Da=w("Opera")||w("OPR"),x=w("Trident")||w("MSIE"),A=w("Gecko")&&-1==v.toLowerCase().indexOf("webkit")&&!(w("Trident")||w("MSIE")),B=-1!=v.toLowerCase().indexOf("webkit"),Ea=function(){var a=h.document;return a?a.documentMode:void 0},Ga=function(){var a="",b;if(Da&&h.opera)return a=h.opera.version,n(a)?a():a;A?b=/rv\:([^\);]+)(\)|;)/:x?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:B&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(v))?a[1]:"");return x&&(b=Ea(),b>parseFloat(a))?String(b):a}(),Ha={},C=function(a){var b;
if(!(b=Ha[a])){b=0;for(var c=String(Ga).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),f=Math.max(c.length,d.length),e=0;0==b&&e<f;e++){var g=c[e]||"",k=d[e]||"",y=RegExp("(\\d*)(\\D*)","g"),Fa=RegExp("(\\d*)(\\D*)","g");do{var G=y.exec(g)||["","",""],z=Fa.exec(k)||["","",""];if(0==G[0].length&&0==z[0].length)break;b=qa(0==G[1].length?0:parseInt(G[1],10),0==z[1].length?0:parseInt(z[1],10))||qa(0==G[2].length,0==z[2].length)||qa(G[2],z[2])}while(0==
b)}b=Ha[a]=0<=b}return b},Ia=h.document,Ja=Ia&&x?Ea()||("CSS1Compat"==Ia.compatMode?parseInt(Ga,10):5):void 0;var Ka;(Ka=!x)||(Ka=x&&9<=Ja);var La=Ka,Ma=x&&!C("9");!B||C("528");A&&C("1.9b")||x&&C("8")||Da&&C("9.5")||B&&C("528");A&&!C("8")||x&&C("9");var Na=function(){};var D=function(a,b){this.type=a;this.a=this.b=b};D.prototype.d=function(){};var E=function(a,b){D.call(this,a?a.type:"");this.e=this.a=this.b=null;if(a){this.type=a.type;this.b=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&A)try{wa(c.nodeName)}catch(d){}this.e=a;a.defaultPrevented&&this.d()}};q(E,D);E.prototype.d=function(){E.G.d.call(this);var a=this.e;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ma)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var F="closure_listenable_"+(1E6*Math.random()|0),Oa=0;var Pa=function(a,b,c,d,f){this.i=a;this.proxy=null;this.src=b;this.type=c;this.q=!!d;this.s=f;++Oa;this.removed=this.r=!1},Qa=function(a){a.removed=!0;a.i=null;a.proxy=null;a.src=null;a.s=null};var H=function(a){this.src=a;this.a={};this.b=0},Sa=function(a,b,c,d,f){var e=b.toString();b=a.a[e];b||(b=a.a[e]=[],a.b++);var g=Ra(b,c,d,f);-1<g?(a=b[g],a.r=!1):(a=new Pa(c,a.src,e,!!d,f),a.r=!1,b.push(a));return a};H.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.a))return!1;var f=this.a[a];b=Ra(f,b,c,d);return-1<b?(Qa(f[b]),t(null!=f.length),u.splice.call(f,b,1),0==f.length&&(delete this.a[a],this.b--),!0):!1};
var Ta=function(a,b){var c=b.type;if(c in a.a){var d=a.a[c],f=sa(d,b),e;if(e=0<=f)t(null!=d.length),u.splice.call(d,f,1);e&&(Qa(b),0==a.a[c].length&&(delete a.a[c],a.b--))}},Ra=function(a,b,c,d){for(var f=0;f<a.length;++f){var e=a[f];if(!e.removed&&e.i==b&&e.q==!!c&&e.s==d)return f}return-1};var Ua="closure_lm_"+(1E6*Math.random()|0),Va={},Wa=0,I=function(a,b,c,d,f){if("array"==l(b))for(var e=0;e<b.length;e++)I(a,b[e],c,d,f);else if(c=Xa(c),a&&a[F])a.listen(b,c,d,f);else{if(!b)throw Error("Invalid event type");var e=!!d,g=J(a);g||(a[Ua]=g=new H(a));c=Sa(g,b,c,d,f);c.proxy||(d=Ya(),c.proxy=d,d.src=a,d.i=c,a.addEventListener?a.addEventListener(b.toString(),d,e):a.attachEvent(Za(b.toString()),d),Wa++)}},Ya=function(){var a=$a,b=La?function(c){return a.call(b.src,b.i,c)}:function(c){c=a.call(b.src,
b.i,c);if(!c)return c};return b},ab=function(a,b,c,d,f){if("array"==l(b))for(var e=0;e<b.length;e++)ab(a,b[e],c,d,f);else(c=Xa(c),a&&a[F])?a.m.remove(String(b),c,d,f):a&&(a=J(a))&&(b=a.a[b.toString()],a=-1,b&&(a=Ra(b,c,!!d,f)),(c=-1<a?b[a]:null)&&bb(c))},bb=function(a){if("number"!=typeof a&&a&&!a.removed){var b=a.src;if(b&&b[F])Ta(b.m,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.q):b.detachEvent&&b.detachEvent(Za(c),d);Wa--;(c=J(b))?(Ta(c,a),0==c.b&&(c.src=null,
b[Ua]=null)):Qa(a)}}},Za=function(a){return a in Va?Va[a]:Va[a]="on"+a},db=function(a,b,c,d){var f=1;if(a=J(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var e=b[a];e&&e.q==c&&!e.removed&&(f&=!1!==cb(e,d))}return Boolean(f)},cb=function(a,b){var c=a.i,d=a.s||a.src;a.r&&bb(a);return c.call(d,b)},$a=function(a,b){if(a.removed)return!0;if(!La){var c=b||ba("window.event"),d=new E(c,this),f=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){t:{var e=!1;if(0==c.keyCode)try{c.keyCode=-1;break t}catch(g){e=
!0}if(e||void 0==c.returnValue)c.returnValue=!0}c=[];for(e=d.a;e;e=e.parentNode)c.push(e);for(var e=a.type,k=c.length-1;0<=k;k--)d.a=c[k],f&=db(c[k],e,!0,d);for(k=0;k<c.length;k++)d.a=c[k],f&=db(c[k],e,!1,d)}return f}return cb(a,new E(b,this))},J=function(a){a=a[Ua];return a instanceof H?a:null},eb="__closure_events_fn_"+(1E9*Math.random()>>>0),Xa=function(a){t(a,"Listener can not be null.");if(n(a))return a;t(a.handleEvent,"An object listener must have handleEvent method.");a[eb]||(a[eb]=function(b){return a.handleEvent(b)});
return a[eb]};var K=function(){this.m=new H(this);this.F=this};q(K,Na);K.prototype[F]=!0;K.prototype.removeEventListener=function(a,b,c,d){ab(this,a,b,c,d)};var L=function(a,b){fb(a);var c=a.F,d=b,f=d.type||d;if(m(d))d=new D(d,c);else if(d instanceof D)d.b=d.b||c;else{var e=d,d=new D(f,c);Aa(d,e)}c=d.a=c;gb(c,f,!0,d);gb(c,f,!1,d)};K.prototype.listen=function(a,b,c,d){fb(this);return Sa(this.m,String(a),b,c,d)};
var gb=function(a,b,c,d){if(b=a.m.a[String(b)]){b=b.concat();for(var f=!0,e=0;e<b.length;++e){var g=b[e];if(g&&!g.removed&&g.q==c){var k=g.i,y=g.s||g.src;g.r&&Ta(a.m,g);f=!1!==k.call(y,d)&&f}}}},fb=function(a){t(a.m,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var hb=function(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);};var ib="StopIteration"in h?h.StopIteration:Error("StopIteration"),jb=function(){};jb.prototype.a=function(){throw ib;};jb.prototype.g=function(){return this};var M=function(a,b){this.b={};this.a=[];this.e=this.d=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof M?(c=a.n(),d=a.p()):(c=ya(a),d=xa(a));for(var f=0;f<c.length;f++)this.set(c[f],d[f])}};M.prototype.p=function(){N(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};M.prototype.n=function(){N(this);return this.a.concat()};
M.prototype.clear=function(){this.b={};this.e=this.d=this.a.length=0};M.prototype.remove=function(a){return Object.prototype.hasOwnProperty.call(this.b,a)?(delete this.b[a],this.d--,this.e++,this.a.length>2*this.d&&N(this),!0):!1};
var N=function(a){if(a.d!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Object.prototype.hasOwnProperty.call(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.d!=a.a.length){for(var f={},c=b=0;b<a.a.length;)d=a.a[b],Object.prototype.hasOwnProperty.call(f,d)||(a.a[c++]=d,f[d]=1),b++;a.a.length=c}};M.prototype.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.b,a)?this.b[a]:b};
M.prototype.set=function(a,b){Object.prototype.hasOwnProperty.call(this.b,a)||(this.d++,this.a.push(a),this.e++);this.b[a]=b};M.prototype.forEach=function(a,b){for(var c=this.n(),d=0;d<c.length;d++){var f=c[d],e=this.get(f);a.call(b,e,f,this)}};M.prototype.clone=function(){return new M(this)};
M.prototype.g=function(a){N(this);var b=0,c=this.a,d=this.b,f=this.e,e=this,g=new jb;g.a=function(){for(;;){if(f!=e.e)throw Error("The map has changed since the iterator was created");if(b>=c.length)throw ib;var g=c[b++];return a?g:d[g]}};return g};var kb=function(a){if("function"==typeof a.p)return a.p();if(m(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return xa(a)},lb=function(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(da(a)||m(a))ta(a,b,void 0);else{var c;if("function"==typeof a.n)c=a.n();else if("function"!=typeof a.p)if(da(a)||m(a)){c=[];for(var d=a.length,f=0;f<d;f++)c.push(f)}else c=ya(a);else c=void 0;for(var d=kb(a),f=d.length,e=0;e<f;e++)b.call(void 0,d[e],c&&c[e],
a)}};var nb=function(a){var b;b||(b=mb(a||arguments.callee.caller,[]));return b},mb=function(a,b){var c=[];if(0<=sa(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(ob(a)+"(");for(var d=a.arguments,f=0;d&&f<d.length;f++){0<f&&c.push(", ");var e;e=d[f];switch(typeof e){case "object":e=e?"object":"null";break;case "string":break;case "number":e=String(e);break;case "boolean":e=e?"true":"false";break;case "function":e=(e=ob(e))?e:"[fn]";break;default:e=typeof e}40<e.length&&(e=e.substr(0,
40)+"...");c.push(e)}b.push(a);c.push(")\n");try{c.push(mb(a.caller,b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")},ob=function(a){if(O[a])return O[a];a=String(a);if(!O[a]){var b=/function ([^\(]+)/.exec(a);O[a]=b?b[1]:"[Anonymous]"}return O[a]},O={};var P=function(a,b,c,d,f){"number"==typeof f||pb++;d||ga();this.d=b;delete this.b;delete this.a};P.prototype.b=null;P.prototype.a=null;var pb=0;P.prototype.getMessage=function(){return this.d};var Q=function(){this.b=this.d=this.a=null},R=function(a,b){this.name=a;this.value=b};R.prototype.toString=function(){return this.name};var qb=new R("SEVERE",1E3),rb=new R("CONFIG",700),sb=new R("FINE",500);Q.prototype.getChildren=function(){this.b||(this.b={});return this.b};var tb=function(a){if(a.d)return a.d;if(a.a)return tb(a.a);ra("Root logger has no level set.");return null};
Q.prototype.log=function(a,b,c){if(a.value>=tb(this).value)for(n(b)&&(b=b()),a="log:"+this.e(0,b,c,Q.prototype.log).getMessage(),h.console&&(h.console.timeStamp?h.console.timeStamp(a):h.console.markTimeline&&h.console.markTimeline(a)),h.msWriteProfilerMark&&h.msWriteProfilerMark(a),a=this;a;)a=a.a};
Q.prototype.e=function(a,b,c,d){a=new P(0,String(b));if(c){a.b=c;var f;d=d||Q.prototype.e;try{var e;var g=ba("window.location.href");if(m(c))e={message:c,name:"Unknown error",lineNumber:"Not available",fileName:g,stack:"Not available"};else{var k,y;b=!1;try{k=c.lineNumber||c.I||"Not available"}catch(Fa){k="Not available",b=!0}try{y=c.fileName||c.filename||c.sourceURL||h.$googDebugFname||g}catch(G){y="Not available",b=!0}e=!b&&c.lineNumber&&c.fileName&&c.stack&&c.message&&c.name?c:{message:c.message||
"Not available",name:c.name||"UnknownError",lineNumber:k,fileName:y,stack:c.stack||"Not available"}}f="Message: "+pa(e.message)+'\nUrl: <a href="view-source:'+e.fileName+'" target="_new">'+e.fileName+"</a>\nLine: "+e.lineNumber+"\n\nBrowser stack:\n"+pa(e.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+pa(nb(d)+"-> ")}catch(z){f="Exception trying to expose exception! You win, we lose. "+z}a.a=f}return a};
var ub={},S=null,vb=function(a){S||(S=new Q,ub[""]=S,S.d=rb);var b;if(!(b=ub[a])){b=new Q;var c=a.lastIndexOf("."),d=a.substr(c+1),c=vb(a.substr(0,c));c.getChildren()[d]=b;b.a=c;ub[a]=b}return b};var T=function(a,b){a&&a.log(sb,b,void 0)};var wb=function(a,b,c){if(n(a))c&&(a=p(a,c));else if(a&&"function"==typeof a.handleEvent)a=p(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:h.setTimeout(a,b||0)};var xb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,yb=B,zb=function(a,b){if(yb){yb=!1;var c=h.location;if(c){var d=c.href;if(d&&(d=(d=zb(3,d))?decodeURI(d):d)&&d!=c.hostname)throw yb=!0,Error();}}return b.match(xb)[a]||null};var Ab=function(){};Ab.prototype.a=null;var Cb=function(a){var b;(b=a.a)||(b={},Bb(a)&&(b[0]=!0,b[1]=!0),b=a.a=b);return b};var Db,Eb=function(){};q(Eb,Ab);var Fb=function(a){return(a=Bb(a))?new ActiveXObject(a):new XMLHttpRequest},Bb=function(a){if(!a.b&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.b=d}catch(f){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.b};Db=new Eb;var U=function(a){K.call(this);this.C=new M;this.o=a||null;this.b=!1;this.j=this.c=null;this.a=this.v=this.h="";this.d=this.t=this.g=this.u=!1;this.e=0;this.k=null;this.w="";this.l=this.D=!1};q(U,K);var Gb=U.prototype,Hb=vb("goog.net.XhrIo");Gb.f=Hb;var Ib=/^https?$/i,Jb=["POST","PUT"];
U.prototype.send=function(a,b,c,d){if(this.c)throw Error("[goog.net.XhrIo] Object is active with another request="+this.h+"; newUri="+a);b=b?b.toUpperCase():"GET";this.h=a;this.a="";this.v=b;this.u=!1;this.b=!0;this.c=this.o?Fb(this.o):Fb(Db);this.j=this.o?Cb(this.o):Cb(Db);this.c.onreadystatechange=p(this.A,this);try{T(this.f,V(this,"Opening Xhr")),this.t=!0,this.c.open(b,String(a),!0),this.t=!1}catch(f){T(this.f,V(this,"Error opening Xhr: "+f.message));Kb(this,f);return}a=c||"";var e=this.C.clone();
d&&lb(d,function(a,b){e.set(b,a)});d=va(e.n());c=h.FormData&&a instanceof h.FormData;!(0<=sa(Jb,b))||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.c.setRequestHeader(b,a)},this);this.w&&(this.c.responseType=this.w);"withCredentials"in this.c&&(this.c.withCredentials=this.D);try{Lb(this),0<this.e&&(this.l=Mb(this.c),T(this.f,V(this,"Will abort after "+this.e+"ms if incomplete, xhr2 "+this.l)),this.l?(this.c.timeout=this.e,this.c.ontimeout=
p(this.B,this)):this.k=wb(this.B,this.e,this)),T(this.f,V(this,"Sending request")),this.g=!0,this.c.send(a),this.g=!1}catch(g){T(this.f,V(this,"Send error: "+g.message)),Kb(this,g)}};var Mb=function(a){return x&&C(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout},ua=function(a){return"content-type"==a.toLowerCase()};
U.prototype.B=function(){"undefined"!=typeof aa&&this.c&&(this.a="Timed out after "+this.e+"ms, aborting",T(this.f,V(this,this.a)),L(this,"timeout"),this.c&&this.b&&(T(this.f,V(this,"Aborting")),this.b=!1,this.d=!0,this.c.abort(),this.d=!1,L(this,"complete"),L(this,"abort"),Nb(this)))};var Kb=function(a,b){a.b=!1;a.c&&(a.d=!0,a.c.abort(),a.d=!1);a.a=b;Ob(a);Nb(a)},Ob=function(a){a.u||(a.u=!0,L(a,"complete"),L(a,"error"))};U.prototype.A=function(){this.t||this.g||this.d?Pb(this):this.H()};
U.prototype.H=function(){Pb(this)};
var Pb=function(a){if(a.b&&"undefined"!=typeof aa)if(a.j[1]&&4==W(a)&&2==Qb(a))T(a.f,V(a,"Local request error detected and ignored"));else if(a.g&&4==W(a))wb(a.A,0,a);else if(L(a,"readystatechange"),4==W(a)){T(a.f,V(a,"Request complete"));a.b=!1;try{if(Rb(a))L(a,"complete"),L(a,"success");else{var b;try{b=2<W(a)?a.c.statusText:""}catch(c){T(a.f,"Can not get status: "+c.message),b=""}a.a=b+" ["+Qb(a)+"]";Ob(a)}}finally{Nb(a)}}},Nb=function(a){if(a.c){Lb(a);var b=a.c,c=a.j[0]?ca:null;a.c=null;a.j=null;
L(a,"ready");try{b.onreadystatechange=c}catch(d){(a=a.f)&&a.log(qb,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}},Lb=function(a){a.c&&a.l&&(a.c.ontimeout=null);"number"==typeof a.k&&(h.clearTimeout(a.k),a.k=null)},Rb=function(a){var b=Qb(a),c;t:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break t;default:c=!1}if(!c){if(b=0===b)a=zb(1,String(a.h)),!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Ib.test(a?a.toLowerCase():
"");c=b}return c},W=function(a){return a.c?a.c.readyState:0},Qb=function(a){try{return 2<W(a)?a.c.status:-1}catch(b){return-1}},V=function(a,b){return b+" ["+a.v+" "+a.h+" "+Qb(a)+"]"};var X=function(a){this.b=a||new U;this.a=document.getElementById("stat").textContent.split("\n");0<this.a.length&&this.a.pop();this.g=this.a.length;this.e="";this.d=!1;a=document.createElement("div");a.style.overflow="hidden";a.style.clear="both";var b=document.createElement("div");b.id="ui-div";b.innerHTML='<table id="ui-table" border=1 style="float:left; border-collapse: collapse;border-color:silver;"><tr valign="center"><td>Auto refresh (every 5 seconds): <input type="checkbox" id="auto-refresh" '+
(this.d?"checked":"")+'></td><td>&nbsp;&nbsp;&nbsp;&nbsp;Filter: <input id="text-filter" type="text" size="70"></td></tr></table>';a.appendChild(b);b=document.createElement("div");b.id="num";b.className="pagespeed-show-number";a.appendChild(b);document.body.insertBefore(a,document.getElementById("stat"));Sb(this)};X.prototype.j=function(){this.d=!this.d};X.prototype.l=function(a){this.e=a.value;this.update()};
var Sb=function(a,b){document.getElementById("num").textContent="The number of statistics: "+(void 0!=b?b:a.a.length).toString()+"/"+a.g};X.prototype.error=function(){var a=this.a;if("array"!=l(a))for(var b=a.length-1;0<=b;b--)delete a[b];this.g=a.length=0;Sb(this);document.getElementById("stat").textContent="Sorry, failed to update the statistics. Please wait and try again later."};
X.prototype.update=function(){var a;a=this.a;var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];a=c}else a=[];if(this.e)for(b=a.length-1;0<=b;--b)a[b]&&-1!=a[b].toLowerCase().indexOf(this.e.toLowerCase())||a.splice(b,1);Sb(this,a.length);document.getElementById("stat").textContent=a.join("\n")};
X.prototype.h=function(){if(!this.b.c&&this.d){var a=location.pathname,b=a.lastIndexOf("/");b==a.length-1&&(b=a.substring(0,b).lastIndexOf("/"));this.b.send(0<b?a.substring(0,b)+"/stats_json":"/stats_json")}};
X.prototype.k=function(){if(Rb(this.b)){var a;var b=this.b;a=b.c?hb(b.c.responseText):void 0;b=a.variables;a=a.maxlength;if("object"!=l(b)||"number"!=l(a))this.error();else{var c=[],d;for(d in b)c.push(d+":"+Array(a-d.length-b[d].toString().length+2).join(" ")+b[d].toString());this.a=c;this.g=c.length;this.update()}}else d=this.b,console.log(m(d.a)?d.a:String(d.a)),this.error()};
var Tb=function(){I(window,"load",function(){var a=new X,b=document.getElementById("text-filter");I(b,"keyup",p(a.l,a,b));I(document.getElementById("auto-refresh"),"change",p(a.j,a));setInterval(a.h.bind(a),5E3);I(a.b,"complete",p(a.k,a));a.h()})},Y=["pagespeed","Statistics","Start"],Z=h;Y[0]in Z||!Z.execScript||Z.execScript("var "+Y[0]);for(var $;Y.length&&($=Y.shift());)Y.length||void 0===Tb?Z[$]?Z=Z[$]:Z=Z[$]={}:Z[$]=Tb;})();
