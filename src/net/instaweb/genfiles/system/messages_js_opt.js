(function(){var aa=aa||{},h=this,ba=function(a){a=a.split(".");for(var b=h,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b},ca=function(){},l=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";
if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},da=function(a){var b=l(a);return"array"==b||"object"==b&&"number"==typeof a.length},m=function(a){return"string"==typeof a},n=function(a){return"function"==l(a)},ea=function(a,b,c){return a.call.apply(a.bind,arguments)},fa=function(a,b,c){if(!a)throw Error();if(2<
arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},p=function(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return p.apply(null,arguments)},ga=Date.now||function(){return+new Date},q=function(a,b){function c(){}c.prototype=b.prototype;a.G=b.prototype;a.prototype=new c;
a.J=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return p.apply(null,c)}return p(this,a)};var r=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,r);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};q(r,Error);r.prototype.name="CustomError";var ha=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},pa=function(a){if(!ia.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ja,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ka,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(la,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(ma,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(na,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(oa,"&#0;"));return a},ja=/&/g,ka=/</g,
la=/>/g,ma=/"/g,na=/'/g,oa=/\x00/g,ia=/[\x00&<>"']/,qa=function(a,b){return a<b?-1:a>b?1:0};var s=function(a,b){b.unshift(a);r.call(this,ha.apply(null,b));b.shift()};q(s,r);s.prototype.name="AssertionError";var t=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),e=Array.prototype.slice.call(arguments,2);throw new s(""+d,e||[]);}},ra=function(a,b){throw new s("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var u=Array.prototype,sa=u.indexOf?function(a,b,c){t(null!=a.length);return u.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(m(a))return m(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ta=u.forEach?function(a,b,c){t(null!=a.length);u.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=m(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},va=function(a){var b;t:{b=ua;for(var c=a.length,d=m(a)?a.split(""):a,
e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break t}b=-1}return 0>b?null:m(a)?a.charAt(b):a[b]},wa=function(a){if("array"!=l(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};var xa=function(a){xa[" "](a);return a};xa[" "]=ca;var v;t:{var ya=h.navigator;if(ya){var za=ya.userAgent;if(za){v=za;break t}}v=""}var w=function(a){return-1!=v.indexOf(a)};var Aa=w("Opera")||w("OPR"),z=w("Trident")||w("MSIE"),A=w("Gecko")&&-1==v.toLowerCase().indexOf("webkit")&&!(w("Trident")||w("MSIE")),B=-1!=v.toLowerCase().indexOf("webkit"),Ba=function(){var a=h.document;return a?a.documentMode:void 0},Ca=function(){var a="",b;if(Aa&&h.opera)return a=h.opera.version,n(a)?a():a;A?b=/rv\:([^\);]+)(\)|;)/:z?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:B&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(v))?a[1]:"");return z&&(b=Ba(),b>parseFloat(a))?String(b):a}(),Ea={},C=function(a){var b;
if(!(b=Ea[a])){b=0;for(var c=String(Ca).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",x=RegExp("(\\d*)(\\D*)","g"),Da=RegExp("(\\d*)(\\D*)","g");do{var F=x.exec(g)||["","",""],y=Da.exec(k)||["","",""];if(0==F[0].length&&0==y[0].length)break;b=qa(0==F[1].length?0:parseInt(F[1],10),0==y[1].length?0:parseInt(y[1],10))||qa(0==F[2].length,0==y[2].length)||qa(F[2],y[2])}while(0==
b)}b=Ea[a]=0<=b}return b},Fa=h.document,Ga=Fa&&z?Ba()||("CSS1Compat"==Fa.compatMode?parseInt(Ca,10):5):void 0;var Ha;(Ha=!z)||(Ha=z&&9<=Ga);var Ia=Ha,Ja=z&&!C("9");!B||C("528");A&&C("1.9b")||z&&C("8")||Aa&&C("9.5")||B&&C("528");A&&!C("8")||z&&C("9");var Ka=function(){};var D=function(a,b){this.type=a;this.a=this.b=b};D.prototype.d=function(){};var E=function(a,b){D.call(this,a?a.type:"");this.e=this.a=this.b=null;if(a){this.type=a.type;this.b=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&A)try{xa(c.nodeName)}catch(d){}this.e=a;a.defaultPrevented&&this.d()}};q(E,D);E.prototype.d=function(){E.G.d.call(this);var a=this.e;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ja)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var G="closure_listenable_"+(1E6*Math.random()|0),La=0;var Ma=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Na=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Oa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Pa=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Oa.length;f++)c=Oa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var Qa=function(a,b,c,d,e){this.h=a;this.proxy=null;this.src=b;this.type=c;this.q=!!d;this.s=e;++La;this.removed=this.r=!1},Ra=function(a){a.removed=!0;a.h=null;a.proxy=null;a.src=null;a.s=null};var H=function(a){this.src=a;this.a={};this.b=0},Ta=function(a,b,c,d,e){var f=b.toString();b=a.a[f];b||(b=a.a[f]=[],a.b++);var g=Sa(b,c,d,e);-1<g?(a=b[g],a.r=!1):(a=new Qa(c,a.src,f,!!d,e),a.r=!1,b.push(a));return a};H.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.a))return!1;var e=this.a[a];b=Sa(e,b,c,d);return-1<b?(Ra(e[b]),t(null!=e.length),u.splice.call(e,b,1),0==e.length&&(delete this.a[a],this.b--),!0):!1};
var Ua=function(a,b){var c=b.type;if(c in a.a){var d=a.a[c],e=sa(d,b),f;if(f=0<=e)t(null!=d.length),u.splice.call(d,e,1);f&&(Ra(b),0==a.a[c].length&&(delete a.a[c],a.b--))}},Sa=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.removed&&f.h==b&&f.q==!!c&&f.s==d)return e}return-1};var Va="closure_lm_"+(1E6*Math.random()|0),Wa={},Xa=0,I=function(a,b,c,d,e){if("array"==l(b))for(var f=0;f<b.length;f++)I(a,b[f],c,d,e);else if(c=Ya(c),a&&a[G])a.listen(b,c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=J(a);g||(a[Va]=g=new H(a));c=Ta(g,b,c,d,e);c.proxy||(d=Za(),c.proxy=d,d.src=a,d.h=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent($a(b.toString()),d),Xa++)}},Za=function(){var a=ab,b=Ia?function(c){return a.call(b.src,b.h,c)}:function(c){c=a.call(b.src,
b.h,c);if(!c)return c};return b},bb=function(a,b,c,d,e){if("array"==l(b))for(var f=0;f<b.length;f++)bb(a,b[f],c,d,e);else(c=Ya(c),a&&a[G])?a.n.remove(String(b),c,d,e):a&&(a=J(a))&&(b=a.a[b.toString()],a=-1,b&&(a=Sa(b,c,!!d,e)),(c=-1<a?b[a]:null)&&cb(c))},cb=function(a){if("number"!=typeof a&&a&&!a.removed){var b=a.src;if(b&&b[G])Ua(b.n,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.q):b.detachEvent&&b.detachEvent($a(c),d);Xa--;(c=J(b))?(Ua(c,a),0==c.b&&(c.src=null,
b[Va]=null)):Ra(a)}}},$a=function(a){return a in Wa?Wa[a]:Wa[a]="on"+a},eb=function(a,b,c,d){var e=1;if(a=J(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.q==c&&!f.removed&&(e&=!1!==db(f,d))}return Boolean(e)},db=function(a,b){var c=a.h,d=a.s||a.src;a.r&&cb(a);return c.call(d,b)},ab=function(a,b){if(a.removed)return!0;if(!Ia){var c=b||ba("window.event"),d=new E(c,this),e=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){t:{var f=!1;if(0==c.keyCode)try{c.keyCode=-1;break t}catch(g){f=
!0}if(f||void 0==c.returnValue)c.returnValue=!0}c=[];for(f=d.a;f;f=f.parentNode)c.push(f);for(var f=a.type,k=c.length-1;0<=k;k--)d.a=c[k],e&=eb(c[k],f,!0,d);for(k=0;k<c.length;k++)d.a=c[k],e&=eb(c[k],f,!1,d)}return e}return db(a,new E(b,this))},J=function(a){a=a[Va];return a instanceof H?a:null},fb="__closure_events_fn_"+(1E9*Math.random()>>>0),Ya=function(a){t(a,"Listener can not be null.");if(n(a))return a;t(a.handleEvent,"An object listener must have handleEvent method.");a[fb]||(a[fb]=function(b){return a.handleEvent(b)});
return a[fb]};var K=function(){this.n=new H(this);this.F=this};q(K,Ka);K.prototype[G]=!0;K.prototype.removeEventListener=function(a,b,c,d){bb(this,a,b,c,d)};var L=function(a,b){gb(a);var c=a.F,d=b,e=d.type||d;if(m(d))d=new D(d,c);else if(d instanceof D)d.b=d.b||c;else{var f=d,d=new D(e,c);Pa(d,f)}c=d.a=c;hb(c,e,!0,d);hb(c,e,!1,d)};K.prototype.listen=function(a,b,c,d){gb(this);return Ta(this.n,String(a),b,c,d)};
var hb=function(a,b,c,d){if(b=a.n.a[String(b)]){b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.removed&&g.q==c){var k=g.h,x=g.s||g.src;g.r&&Ua(a.n,g);e=!1!==k.call(x,d)&&e}}}},gb=function(a){t(a.n,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var ib="StopIteration"in h?h.StopIteration:Error("StopIteration"),jb=function(){};jb.prototype.a=function(){throw ib;};jb.prototype.g=function(){return this};var M=function(a,b){this.b={};this.a=[];this.e=this.d=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof M?(c=a.o(),d=a.p()):(c=Na(a),d=Ma(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}};M.prototype.p=function(){N(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};M.prototype.o=function(){N(this);return this.a.concat()};
M.prototype.clear=function(){this.b={};this.e=this.d=this.a.length=0};M.prototype.remove=function(a){return Object.prototype.hasOwnProperty.call(this.b,a)?(delete this.b[a],this.d--,this.e++,this.a.length>2*this.d&&N(this),!0):!1};
var N=function(a){if(a.d!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Object.prototype.hasOwnProperty.call(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.d!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],Object.prototype.hasOwnProperty.call(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}};M.prototype.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.b,a)?this.b[a]:b};
M.prototype.set=function(a,b){Object.prototype.hasOwnProperty.call(this.b,a)||(this.d++,this.a.push(a),this.e++);this.b[a]=b};M.prototype.forEach=function(a,b){for(var c=this.o(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};M.prototype.clone=function(){return new M(this)};
M.prototype.g=function(a){N(this);var b=0,c=this.a,d=this.b,e=this.e,f=this,g=new jb;g.a=function(){for(;;){if(e!=f.e)throw Error("The map has changed since the iterator was created");if(b>=c.length)throw ib;var g=c[b++];return a?g:d[g]}};return g};var kb=function(a){if("function"==typeof a.p)return a.p();if(m(a))return a.split("");if(da(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Ma(a)},lb=function(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(da(a)||m(a))ta(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.p)if(da(a)||m(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=Na(a);else c=void 0;for(var d=kb(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],
a)}};var nb=function(a){var b;b||(b=mb(a||arguments.callee.caller,[]));return b},mb=function(a,b){var c=[];if(0<=sa(b,a))c.push("[...circular reference...]");else if(a&&50>b.length){c.push(ob(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=ob(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,
40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(mb(a.caller,b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")},ob=function(a){if(O[a])return O[a];a=String(a);if(!O[a]){var b=/function ([^\(]+)/.exec(a);O[a]=b?b[1]:"[Anonymous]"}return O[a]},O={};var P=function(a,b,c,d,e){"number"==typeof e||pb++;d||ga();this.d=b;delete this.b;delete this.a};P.prototype.b=null;P.prototype.a=null;var pb=0;P.prototype.getMessage=function(){return this.d};var Q=function(){this.b=this.d=this.a=null},R=function(a,b){this.name=a;this.value=b};R.prototype.toString=function(){return this.name};var qb=new R("SEVERE",1E3),rb=new R("CONFIG",700),sb=new R("FINE",500);Q.prototype.getChildren=function(){this.b||(this.b={});return this.b};var tb=function(a){if(a.d)return a.d;if(a.a)return tb(a.a);ra("Root logger has no level set.");return null};
Q.prototype.log=function(a,b,c){if(a.value>=tb(this).value)for(n(b)&&(b=b()),a="log:"+this.e(0,b,c,Q.prototype.log).getMessage(),h.console&&(h.console.timeStamp?h.console.timeStamp(a):h.console.markTimeline&&h.console.markTimeline(a)),h.msWriteProfilerMark&&h.msWriteProfilerMark(a),a=this;a;)a=a.a};
Q.prototype.e=function(a,b,c,d){a=new P(0,String(b));if(c){a.b=c;var e;d=d||Q.prototype.e;try{var f;var g=ba("window.location.href");if(m(c))f={message:c,name:"Unknown error",lineNumber:"Not available",fileName:g,stack:"Not available"};else{var k,x;b=!1;try{k=c.lineNumber||c.I||"Not available"}catch(Da){k="Not available",b=!0}try{x=c.fileName||c.filename||c.sourceURL||h.$googDebugFname||g}catch(F){x="Not available",b=!0}f=!b&&c.lineNumber&&c.fileName&&c.stack&&c.message&&c.name?c:{message:c.message||
"Not available",name:c.name||"UnknownError",lineNumber:k,fileName:x,stack:c.stack||"Not available"}}e="Message: "+pa(f.message)+'\nUrl: <a href="view-source:'+f.fileName+'" target="_new">'+f.fileName+"</a>\nLine: "+f.lineNumber+"\n\nBrowser stack:\n"+pa(f.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+pa(nb(d)+"-> ")}catch(y){e="Exception trying to expose exception! You win, we lose. "+y}a.a=e}return a};
var ub={},S=null,vb=function(a){S||(S=new Q,ub[""]=S,S.d=rb);var b;if(!(b=ub[a])){b=new Q;var c=a.lastIndexOf("."),d=a.substr(c+1),c=vb(a.substr(0,c));c.getChildren()[d]=b;b.a=c;ub[a]=b}return b};var T=function(a,b){a&&a.log(sb,b,void 0)};var wb=function(a,b,c){if(n(a))c&&(a=p(a,c));else if(a&&"function"==typeof a.handleEvent)a=p(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:h.setTimeout(a,b||0)};var xb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,yb=B,zb=function(a,b){if(yb){yb=!1;var c=h.location;if(c){var d=c.href;if(d&&(d=(d=zb(3,d))?decodeURI(d):d)&&d!=c.hostname)throw yb=!0,Error();}}return b.match(xb)[a]||null};var Ab=function(){};Ab.prototype.a=null;var Cb=function(a){var b;(b=a.a)||(b={},Bb(a)&&(b[0]=!0,b[1]=!0),b=a.a=b);return b};var Db,Eb=function(){};q(Eb,Ab);var Fb=function(a){return(a=Bb(a))?new ActiveXObject(a):new XMLHttpRequest},Bb=function(a){if(!a.b&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.b=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.b};Db=new Eb;var U=function(a){K.call(this);this.C=new M;this.m=a||null;this.b=!1;this.i=this.c=null;this.a=this.v=this.l="";this.d=this.t=this.g=this.u=!1;this.e=0;this.j=null;this.w="";this.k=this.D=!1};q(U,K);var Gb=U.prototype,Hb=vb("goog.net.XhrIo");Gb.f=Hb;var Ib=/^https?$/i,Jb=["POST","PUT"];
U.prototype.send=function(a,b,c,d){if(this.c)throw Error("[goog.net.XhrIo] Object is active with another request="+this.l+"; newUri="+a);b=b?b.toUpperCase():"GET";this.l=a;this.a="";this.v=b;this.u=!1;this.b=!0;this.c=this.m?Fb(this.m):Fb(Db);this.i=this.m?Cb(this.m):Cb(Db);this.c.onreadystatechange=p(this.A,this);try{T(this.f,V(this,"Opening Xhr")),this.t=!0,this.c.open(b,String(a),!0),this.t=!1}catch(e){T(this.f,V(this,"Error opening Xhr: "+e.message));Kb(this,e);return}a=c||"";var f=this.C.clone();
d&&lb(d,function(a,b){f.set(b,a)});d=va(f.o());c=h.FormData&&a instanceof h.FormData;!(0<=sa(Jb,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.c.setRequestHeader(b,a)},this);this.w&&(this.c.responseType=this.w);"withCredentials"in this.c&&(this.c.withCredentials=this.D);try{Lb(this),0<this.e&&(this.k=Mb(this.c),T(this.f,V(this,"Will abort after "+this.e+"ms if incomplete, xhr2 "+this.k)),this.k?(this.c.timeout=this.e,this.c.ontimeout=
p(this.B,this)):this.j=wb(this.B,this.e,this)),T(this.f,V(this,"Sending request")),this.g=!0,this.c.send(a),this.g=!1}catch(g){T(this.f,V(this,"Send error: "+g.message)),Kb(this,g)}};var Mb=function(a){return z&&C(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout},ua=function(a){return"content-type"==a.toLowerCase()};
U.prototype.B=function(){"undefined"!=typeof aa&&this.c&&(this.a="Timed out after "+this.e+"ms, aborting",T(this.f,V(this,this.a)),L(this,"timeout"),this.c&&this.b&&(T(this.f,V(this,"Aborting")),this.b=!1,this.d=!0,this.c.abort(),this.d=!1,L(this,"complete"),L(this,"abort"),Nb(this)))};var Kb=function(a,b){a.b=!1;a.c&&(a.d=!0,a.c.abort(),a.d=!1);a.a=b;Ob(a);Nb(a)},Ob=function(a){a.u||(a.u=!0,L(a,"complete"),L(a,"error"))};U.prototype.A=function(){this.t||this.g||this.d?Pb(this):this.H()};
U.prototype.H=function(){Pb(this)};
var Pb=function(a){if(a.b&&"undefined"!=typeof aa)if(a.i[1]&&4==W(a)&&2==Qb(a))T(a.f,V(a,"Local request error detected and ignored"));else if(a.g&&4==W(a))wb(a.A,0,a);else if(L(a,"readystatechange"),4==W(a)){T(a.f,V(a,"Request complete"));a.b=!1;try{if(Rb(a))L(a,"complete"),L(a,"success");else{var b;try{b=2<W(a)?a.c.statusText:""}catch(c){T(a.f,"Can not get status: "+c.message),b=""}a.a=b+" ["+Qb(a)+"]";Ob(a)}}finally{Nb(a)}}},Nb=function(a){if(a.c){Lb(a);var b=a.c,c=a.i[0]?ca:null;a.c=null;a.i=null;
L(a,"ready");try{b.onreadystatechange=c}catch(d){(a=a.f)&&a.log(qb,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}},Lb=function(a){a.c&&a.k&&(a.c.ontimeout=null);"number"==typeof a.j&&(h.clearTimeout(a.j),a.j=null)},Rb=function(a){var b=Qb(a),c;t:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break t;default:c=!1}if(!c){if(b=0===b)a=zb(1,String(a.l)),!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!Ib.test(a?a.toLowerCase():
"");c=b}return c},W=function(a){return a.c?a.c.readyState:0},Qb=function(a){try{return 2<W(a)?a.c.status:-1}catch(b){return-1}},V=function(a,b){return b+" ["+a.v+" "+a.l+" "+Qb(a)+"]"};var X=function(a){this.b=a||new U;this.a=document.getElementById("log").innerHTML.split("\n");0<this.a.length&&this.a.pop();this.e=!1;this.g="";this.d=!1;a=document.createElement("div");a.style.overflow="hidden";a.style.clear="both";var b=document.createElement("div");b.id="ui-div";b.innerHTML='<table id="ui-table" border="1" style="float:left; border-collapse: collapse;border-color:silver;"><tr valign="center"><td>Reverse: <input type="checkbox" id="reverse" '+(this.e?"checked":"")+'></td><td>Auto refresh (every 5 seconds): <input type="checkbox" id="auto-refresh" '+
(this.d?"checked":"")+'></td><td>&nbsp;&nbsp;&nbsp;&nbsp;Filter: <input id="text-filter" type="text" size="70"></td></tr></table>';a.appendChild(b);b=document.createElement("div");b.id="num";b.className="pagespeed-show-number";a.appendChild(b);document.body.insertBefore(a,document.getElementById("log"));Sb(this)};X.prototype.m=function(){this.e=!this.e;this.update()};X.prototype.i=function(){this.d=!this.d};X.prototype.k=function(a){this.g=a.value;this.update()};
var Sb=function(a,b){document.getElementById("num").textContent="The number of messages: "+(void 0!=b?b:a.a.length).toString()};X.prototype.update=function(){var a=document.getElementById("log"),b;b=this.a;var c=b.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=b[e];b=d}else b=[];if(this.g)for(c=b.length-1;0<=c;--c)b[c]&&-1!=b[c].toLowerCase().indexOf(this.g.toLowerCase())||b.splice(c,1);Sb(this,b.length);this.e?a.innerHTML=b.reverse().join("\n"):a.innerHTML=b.join("\n")};
X.prototype.l=function(){this.d&&!this.b.c&&this.b.send(document.location.href)};
X.prototype.j=function(){if(Rb(this.b)){var a;var b=this.b;try{a=b.c?b.c.responseText:""}catch(c){T(b.f,"Can not get responseText: "+c.message),a=""}var b=[],b=a.indexOf('<div id="log">'),d=a.indexOf('<script type="text/javascript">',b);0<=b&&0<=d?(b=a.substring(b+14,d-7).split("\n"),b.pop(),this.a=b,this.update()):(wa(this.a),Sb(this),document.getElementById("log").textContent="Failed to write messages to this page. Verify that MessageBufferSize is not set to 0 in pagespeed.conf.")}else a=this.b,
console.log(m(a.a)?a.a:String(a.a)),wa(this.a),Sb(this),document.getElementById("log").textContent="Sorry, the message history cannot be loaded. Please wait and try again later."};
var Tb=function(){I(window,"load",function(){var a=new X,b=document.getElementById("text-filter");I(b,"keyup",p(a.k,a,b));I(document.getElementById("reverse"),"change",p(a.m,a));I(document.getElementById("auto-refresh"),"change",p(a.i,a));I(a.b,"complete",p(a.j,a));setInterval(a.l.bind(a),5E3)})},Y=["pagespeed","Messages","Start"],Z=h;Y[0]in Z||!Z.execScript||Z.execScript("var "+Y[0]);for(var $;Y.length&&($=Y.shift());)Y.length||void 0===Tb?Z[$]?Z=Z[$]:Z=Z[$]={}:Z[$]=Tb;})();
