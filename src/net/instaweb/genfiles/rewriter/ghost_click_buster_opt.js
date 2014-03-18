(function(){var e=Function,h=Array,k=navigator,l=Error,m=String,n="shift",p="replace",q="bind",s="propertyIsEnumerable",t="userAgent",u="stack",w="console",y="apply",z="fileName",A="push",B="slice",C="indexOf",D="addEventListener",E="length",F="prototype",G="target",H="call",I="splice",J=this,da=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof h)return"array";if(a instanceof Object)return b;var c=Object[F].toString[H](a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==
typeof a[E]&&"undefined"!=typeof a[I]&&"undefined"!=typeof a[s]&&!a[s]("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a[H]&&"undefined"!=typeof a[s]&&!a[s]("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a[H])return"object";return b},ea=function(a,b,c){return a[H][y](a[q],arguments)},fa=function(a,b,c){if(!a)throw l();if(2<arguments[E]){var d=h[F][B][H](arguments,2);return function(){var c=h[F][B][H](arguments);h[F].unshift[y](c,d);return a[y](b,
c)}}return function(){return a[y](b,arguments)}},K=function(a,b,c){K=e[F][q]&&-1!=e[F][q].toString()[C]("native code")?ea:fa;return K[y](null,arguments)},L=Date.now||function(){return+new Date},ga=function(a,b){function c(){}c.prototype=b[F];a.i=b[F];a.prototype=new c;a.h=function(a,c,f){return b[F][c][y](a,h[F][B][H](arguments,2))}};e[F].bind=e[F][q]||function(a,b){if(1<arguments[E]){var c=h[F][B][H](arguments,1);c.unshift(this,a);return K[y](null,c)}return K(this,a)};var M=function(a){if(l.captureStackTrace)l.captureStackTrace(this,M);else{var b=l()[u];b&&(this.stack=b)}a&&(this.message=m(a))};ga(M,l);M[F].name="CustomError";var ha=function(a,b){for(var c=a.split("%s"),d="",g=h[F][B][H](arguments,1);g[E]&&1<c[E];)d+=c[n]()+g[n]();return d+c.join("%s")},N=function(a){if(!ia.test(a))return a;-1!=a[C]("&")&&(a=a[p](ja,"&amp;"));-1!=a[C]("<")&&(a=a[p](ka,"&lt;"));-1!=a[C](">")&&(a=a[p](la,"&gt;"));-1!=a[C]('"')&&(a=a[p](ma,"&quot;"));-1!=a[C]("'")&&(a=a[p](na,"&#39;"));return a},ja=/&/g,ka=/</g,la=/>/g,ma=/"/g,na=/'/g,ia=/[&<>"']/;var O=function(a,b){b.unshift(a);M[H](this,ha[y](null,b));b[n]()};ga(O,M);O[F].name="AssertionError";var P=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),g=h[F][B][H](arguments,2);throw new O(""+d,g||[]);}},oa=function(a,b){throw new O("Failure"+(a?": "+a:""),h[F][B][H](arguments,1));};var pa=h[F],qa=pa[C]?function(a,b,c){P(null!=a[E]);return pa[C][H](a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a[E]+c):c;if("string"==typeof a)return"string"==typeof b&&1==b[E]?a[C](b,c):-1;for(;c<a[E];c++)if(c in a&&a[c]===b)return c;return-1};var Q;n:{var ra=J.navigator;if(ra){var sa=ra[t];if(sa){Q=sa;break n}}Q=""};var ta=-1!=Q[C]("Opera")||-1!=Q[C]("OPR"),ua=-1!=Q[C]("Trident")||-1!=Q[C]("MSIE"),va=-1!=Q[C]("Gecko")&&-1==Q.toLowerCase()[C]("webkit")&&!(-1!=Q[C]("Trident")||-1!=Q[C]("MSIE")),wa=-1!=Q.toLowerCase()[C]("webkit");(function(){var a="",b;if(ta&&J.opera)return a=J.opera.version,"function"==da(a)?a():a;va?b=/rv\:([^\);]+)(\)|;)/:ua?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:wa&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(Q))?a[1]:"");return ua&&(b=(b=J.document)?b.documentMode:void 0,b>parseFloat(a))?m(b):a})();var ya=function(a){return xa(a||arguments.callee.caller,[])},xa=function(a,b){var c=[];if(0<=qa(b,a))c[A]("[...circular reference...]");else if(a&&50>b[E]){c[A](za(a)+"(");for(var d=a.arguments,g=0;d&&g<d[E];g++){0<g&&c[A](", ");var f;f=d[g];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=m(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=za(f))?f:"[fn]";break;default:f=typeof f}40<f[E]&&(f=f.substr(0,40)+"...");c[A](f)}b[A](a);c[A](")\n");
try{c[A](xa(a.caller,b))}catch(r){c[A]("[exception trying to get caller]\n")}}else a?c[A]("[...long stack...]"):c[A]("[end]");return c.join("")},za=function(a){if(R[a])return R[a];a=m(a);if(!R[a]){var b=/function ([^\(]+)/.exec(a);R[a]=b?b[1]:"[Anonymous]"}return R[a]},R={};var S=function(a,b,c,d,g){"number"==typeof g||Aa++;d||L();this.c=b;delete this.b;delete this.a};S[F].b=null;S[F].a=null;var Aa=0;S[F].getMessage=function(){return this.c};var T=function(){this.b=this.c=this.a=null},V=function(a,b){this.name=a;this.value=b};V[F].toString=function(){return this.name};var W=new V("WARNING",900),Ba=new V("CONFIG",700);T[F].getChildren=function(){this.b||(this.b={});return this.b};var Ca=function(a){if(a.c)return a.c;if(a.a)return Ca(a.a);oa("Root logger has no level set.");return null};
T[F].log=function(a,b,c){if(a.value>=Ca(this).value)for("function"==da(b)&&(b=b()),a="log:"+this.d(a,b,c).getMessage(),J[w]&&(J[w].timeStamp?J[w].timeStamp(a):J[w].markTimeline&&J[w].markTimeline(a)),J.msWriteProfilerMark&&J.msWriteProfilerMark(a),a=this;a;)a=a.a};
T[F].d=function(a,b,c){var d=new S(0,m(b));if(c){d.b=c;var g;var f=arguments.callee.caller;try{var r;var x;r:{for(var v=["window","location","href"],U=J,aa;aa=v[n]();)if(null!=U[aa])U=U[aa];else{x=null;break r}x=U}if("string"==typeof c)r={message:c,name:"Unknown error",lineNumber:"Not available",fileName:x,stack:"Not available"};else{var ba,ca,v=!1;try{ba=c.lineNumber||c.g||"Not available"}catch(ab){ba="Not available",v=!0}try{ca=c[z]||c.filename||c.sourceURL||J.$googDebugFname||x}catch(bb){ca="Not available",
v=!0}r=!v&&c.lineNumber&&c[z]&&c[u]&&c.message&&c.name?c:{message:c.message||"Not available",name:c.name||"UnknownError",lineNumber:ba,fileName:ca,stack:c[u]||"Not available"}}g="Message: "+N(r.message)+'\nUrl: <a href="view-source:'+r[z]+'" target="_new">'+r[z]+"</a>\nLine: "+r.lineNumber+"\n\nBrowser stack:\n"+N(r[u]+"-> ")+"[end]\n\nJS stack traversal:\n"+N(ya(f)+"-> ")}catch(Qa){g="Exception trying to expose exception! You win, we lose. "+Qa}d.a=g}return d};
var Da={},X=null,Ea=function(a){X||(X=new T,Da[""]=X,X.c=Ba);var b;if(!(b=Da[a])){b=new T;var c=a.lastIndexOf("."),d=a.substr(c+1),c=Ea(a.substr(0,c));c.getChildren()[d]=b;b.a=c;Da[a]=b}return b};var Fa=function(a,b){this.a=void 0!==a?a:0;this.b=void 0!==b?b:0};Fa[F].toString=function(){return"("+this.a+", "+this.b+")"};var Ga=function(a){this.c=a;P(!this.c._wect);this.c._wect=this;this.b={};this.a={};this.d={}};Ga[F].e=Ea("wireless.events.ListenerCoalescer");var Ha=function(a){a._wect||new Ga(a);return a._wect};Ga[F].f=function(a,b){void 0==this.b[a]&&(this.b[a]=0);var c=this.b[a];this.b[a]++;for(var d=this.a[a],g=d[E],f,r=0;r<g;r++)try{d[r](b)}catch(x){var v=this.e;v&&v.log(W,"Exception during event processing.",x);f=f||x}this.b[a]--;P(this.b[a]==c);P(0<=this.b[a]);if(f)throw f;};
var Ia=function(a,b){a.d[b]||(a.d[b]=K(a.f,a,b));return a.d[b]},Ja=function(a,b,c){var d=b+":capture";a.a[d]||(a.a[d]=[],a.c[D](b,Ia(a,d),!0));a.a[d][A](c)};var Na=function(){var a=Ka,b=document,c=La,d=Ha(b);Ja(d,c,a);Ma(b,function(){Ja(d,c,a)},function(){var b=c+":capture";if(d.a[b]){d.b[b]&&(d.a[b]=d.a[b][B](0));var f=d.a[b][C](a);-1!=f&&d.a[b][I](f,1);0==d.a[b][E]&&(d.a[b]=void 0,d.c.removeEventListener(c,Ia(d,b),!0))}})},Ma=function(a,b,c){a[D]("DOMFocusIn",function(a){a[G]&&"TEXTAREA"==a[G].tagName&&b()},!1);a[D]("DOMFocusOut",function(a){a[G]&&"TEXTAREA"==a[G].tagName&&c()},!1)};var Oa=function(){return-1!=k[t][C]("Android")},Pa=/Mac OS X.+Silk\//,Ra=/Chrome\/([0-9.]+)/;var Sa=/iPhone|iPod|iPad/.test(k[t])||Oa()||Pa.test(k[t]),Ta=window.navigator.msPointerEnabled,La=Sa?"touchstart":Ta?"MSPointerDown":"mousedown",Ua=Sa?"touchend":Ta?"MSPointerUp":"mouseup",Va=function(){var a=Ka;return function(b){b.touches=[];b.targetTouches=[];b.changedTouches=[];b.type!=Ua&&(b.touches[0]=b,b.targetTouches[0]=b);b.changedTouches[0]=b;a(b)}},Wa=function(a){var b=parseInt,c;c=Oa()&&-1!=k[t][C]("Chrome/")?(c=Ra.exec(k[t]))?c[1]:"":"";b=b(c.split(".")[0],10);return Oa()&&-1!=k[t][C]("Chrome/")&&
18==b?new Fa(a.clientX,a.pageY-window.scrollY):new Fa(a.clientX,a.clientY)};var Y,Xa,Ya,Z=Ea("wireless.events.clickbuster"),Za=function(a){if(!(2500<L()-Xa)){var b=Wa(a);if(1>b.a&&1>b.b)Z&&Z.log(W,"Not busting click on label elem at ("+b.a+", "+b.b+")",void 0);else{for(var c=0;c<Y[E];c+=2)if(25>Math.abs(b.a-Y[c])&&25>Math.abs(b.b-Y[c+1])){Y[I](c,c+2);return}Z&&Z.log(W,"busting click at "+b.a+", "+b.b,void 0);a.stopPropagation();a.preventDefault();(a=Ya)&&a()}}},$a=function(a){var b=Wa((a.touches||[a])[0]);Y[A](b.a,b.b);window.setTimeout(function(){for(var a=b.a,d=b.b,g=0;g<
Y[E];g+=2)if(Y[g]==a&&Y[g+1]==d){Y[I](g,g+2);break}Ya=void 0},2500)};Ya=void 0;if(!Y){document[D]("click",Za,!0);var Ka=$a;Sa||Ta||(Ka=Va());Na();Y=[]}Xa=L();for(var $=0;$<Y[E];$+=2)if(25>Math.abs(0-Y[$])&&25>Math.abs(0-Y[$+1])){Y[I]($,$+2);break};})();
