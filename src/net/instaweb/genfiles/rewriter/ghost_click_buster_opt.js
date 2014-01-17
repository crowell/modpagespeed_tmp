(function(){var e=Function,h=Array,k=navigator,l=Error,m=String,n="shift",p="replace",r="bind",s="propertyIsEnumerable",t="userAgent",u="stack",v="console",x="apply",y="fileName",z="push",A="slice",B="indexOf",C="addEventListener",D="length",E="prototype",F="target",G="call",H="navigator",I="splice",K=this,aa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof h)return"array";if(a instanceof Object)return b;var c=Object[E].toString[G](a);if("[object Window]"==c)return"object";if("[object Array]"==
c||"number"==typeof a[D]&&"undefined"!=typeof a[I]&&"undefined"!=typeof a[s]&&!a[s]("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a[G]&&"undefined"!=typeof a[s]&&!a[s]("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a[G])return"object";return b},ba=function(a,b,c){return a[G][x](a[r],arguments)},ca=function(a,b,c){if(!a)throw l();if(2<arguments[D]){var d=h[E][A][G](arguments,2);return function(){var c=h[E][A][G](arguments);h[E].unshift[x](c,
d);return a[x](b,c)}}return function(){return a[x](b,arguments)}},L=function(a,b,c){L=e[E][r]&&-1!=e[E][r].toString()[B]("native code")?ba:ca;return L[x](null,arguments)},da=Date.now||function(){return+new Date},ha=function(a,b){function c(){}c.prototype=b[E];a.i=b[E];a.prototype=new c;a.h=function(a,c,f){return b[E][c][x](a,h[E][A][G](arguments,2))}};e[E].bind=e[E][r]||function(a,b){if(1<arguments[D]){var c=h[E][A][G](arguments,1);c.unshift(this,a);return L[x](null,c)}return L(this,a)};var M=function(a){if(l.captureStackTrace)l.captureStackTrace(this,M);else{var b=l()[u];b&&(this.stack=b)}a&&(this.message=m(a))};ha(M,l);M[E].name="CustomError";var ia=function(a,b){for(var c=a.split("%s"),d="",g=h[E][A][G](arguments,1);g[D]&&1<c[D];)d+=c[n]()+g[n]();return d+c.join("%s")},pa=function(a){if(!ja.test(a))return a;-1!=a[B]("&")&&(a=a[p](ka,"&amp;"));-1!=a[B]("<")&&(a=a[p](la,"&lt;"));-1!=a[B](">")&&(a=a[p](ma,"&gt;"));-1!=a[B]('"')&&(a=a[p](na,"&quot;"));-1!=a[B]("'")&&(a=a[p](oa,"&#39;"));return a},ka=/&/g,la=/</g,ma=/>/g,na=/"/g,oa=/'/g,ja=/[&<>"']/;var N=function(a,b){b.unshift(a);M[G](this,ia[x](null,b));b[n]()};ha(N,M);N[E].name="AssertionError";var O=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),g=h[E][A][G](arguments,2);throw new N(""+d,g||[]);}},qa=function(a,b){throw new N("Failure"+(a?": "+a:""),h[E][A][G](arguments,1));};var ra=h[E],sa=ra[B]?function(a,b,c){O(null!=a[D]);return ra[B][G](a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a[D]+c):c;if("string"==typeof a)return"string"==typeof b&&1==b[D]?a[B](b,c):-1;for(;c<a[D];c++)if(c in a&&a[c]===b)return c;return-1};var P,Q,R,ta,ua=function(){return K[H]?K[H][t]:null};ta=R=Q=P=!1;var S;if(S=ua()){var va=K[H];P=0==S.lastIndexOf("Opera",0);Q=!P&&(-1!=S[B]("MSIE")||-1!=S[B]("Trident"));R=!P&&-1!=S[B]("WebKit");ta=!P&&!R&&!Q&&"Gecko"==va.product}var wa=Q,xa=ta,ya=R;var T;if(P&&K.opera){var za=K.opera.version;"function"==typeof za&&za()}else xa?T=/rv\:([^\);]+)(\)|;)/:wa?T=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:ya&&(T=/WebKit\/(\S+)/),T&&T.exec(ua());var Ba=function(a){return Aa(a||arguments.callee.caller,[])},Aa=function(a,b){var c=[];if(0<=sa(b,a))c[z]("[...circular reference...]");else if(a&&50>b[D]){c[z](Ca(a)+"(");for(var d=a.arguments,g=0;g<d[D];g++){0<g&&c[z](", ");var f;f=d[g];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=m(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=Ca(f))?f:"[fn]";break;default:f=typeof f}40<f[D]&&(f=f.substr(0,40)+"...");c[z](f)}b[z](a);c[z](")\n");
try{c[z](Aa(a.caller,b))}catch(q){c[z]("[exception trying to get caller]\n")}}else a?c[z]("[...long stack...]"):c[z]("[end]");return c.join("")},Ca=function(a){if(U[a])return U[a];a=m(a);if(!U[a]){var b=/function ([^\(]+)/.exec(a);U[a]=b?b[1]:"[Anonymous]"}return U[a]},U={};var V=function(a,b,c,d,g){"number"==typeof g||Da++;d||da();this.c=b;delete this.b;delete this.a};V[E].b=null;V[E].a=null;var Da=0;V[E].getMessage=function(){return this.c};var W=function(){};W[E].a=null;W[E].c=null;W[E].b=null;var Ea=function(a,b){this.name=a;this.value=b};Ea[E].toString=function(){return this.name};var Fa=new Ea("WARNING",900),Ga=new Ea("CONFIG",700);W[E].getChildren=function(){this.b||(this.b={});return this.b};var Ha=function(a){if(a.c)return a.c;if(a.a)return Ha(a.a);qa("Root logger has no level set.");return null};
W[E].log=function(a,b,c){if(a.value>=Ha(this).value)for("function"==aa(b)&&(b=b()),a="log:"+this.d(a,b,c).getMessage(),K[v]&&(K[v].timeStamp?K[v].timeStamp(a):K[v].markTimeline&&K[v].markTimeline(a)),K.msWriteProfilerMark&&K.msWriteProfilerMark(a),a=this;a;)a=a.a};
W[E].d=function(a,b,c){var d=new V(0,m(b));if(c){d.b=c;var g;var f=arguments.callee.caller;try{var q;var w;r:{for(var J=["window","location","href"],Z=K,ea;ea=J[n]();)if(null!=Z[ea])Z=Z[ea];else{w=null;break r}w=Z}if("string"==typeof c)q={message:c,name:"Unknown error",lineNumber:"Not available",fileName:w,stack:"Not available"};else{var fa,ga,J=!1;try{fa=c.lineNumber||c.g||"Not available"}catch(hb){fa="Not available",J=!0}try{ga=c[y]||c.filename||c.sourceURL||K.$googDebugFname||w}catch(ib){ga="Not available",
J=!0}q=!J&&c.lineNumber&&c[y]&&c[u]&&c.message&&c.name?c:{message:c.message||"Not available",name:c.name||"UnknownError",lineNumber:fa,fileName:ga,stack:c[u]||"Not available"}}g="Message: "+pa(q.message)+'\nUrl: <a href="view-source:'+q[y]+'" target="_new">'+q[y]+"</a>\nLine: "+q.lineNumber+"\n\nBrowser stack:\n"+pa(q[u]+"-> ")+"[end]\n\nJS stack traversal:\n"+pa(Ba(f)+"-> ")}catch(Xa){g="Exception trying to expose exception! You win, we lose. "+Xa}d.a=g}return d};
var Ia={},X=null,Ja=function(a){X||(X=new W,Ia[""]=X,X.c=Ga);var b;if(!(b=Ia[a])){b=new W;var c=a.lastIndexOf("."),d=a.substr(c+1),c=Ja(a.substr(0,c));c.getChildren()[d]=b;b.a=c;Ia[a]=b}return b};var La=function(a){var b=Ka;b&&b.log(Fa,a,void 0)};var Ma=function(a,b){this.a=void 0!==a?a:0;this.b=void 0!==b?b:0};Ma[E].toString=function(){return"("+this.a+", "+this.b+")"};var Na=function(a){this.c=a;O(!this.c._wect);this.c._wect=this;this.b={};this.a={};this.d={}};Na[E].e=Ja("wireless.events.ListenerCoalescer");var Oa=function(a){a._wect||new Na(a);return a._wect};Na[E].f=function(a,b){void 0==this.b[a]&&(this.b[a]=0);var c=this.b[a];this.b[a]++;for(var d=this.a[a],g=d[D],f,q=0;q<g;q++)try{d[q](b)}catch(w){this.e.log(Fa,"Exception during event processing.",w),f=f||w}this.b[a]--;O(this.b[a]==c);O(0<=this.b[a]);if(f)throw f;};
var Pa=function(a,b){a.d[b]||(a.d[b]=L(a.f,a,b));return a.d[b]},Qa=function(a,b,c){var d=b+":capture";a.a[d]||(a.a[d]=[],a.c[C](b,Pa(a,d),!0));a.a[d][z](c)};var Ua=function(){var a=Ra,b=document,c=Sa,d=Oa(b);Qa(d,c,a);Ta(b,function(){Qa(d,c,a)},function(){var b=c+":capture";d.b[b]&&(d.a[b]=d.a[b][A](0));var f=d.a[b][B](a);-1!=f&&d.a[b][I](f,1);0==d.a[b][D]&&(d.a[b]=void 0,d.c.removeEventListener(c,Pa(d,b),!0))})},Ta=function(a,b,c){a[C]("DOMFocusIn",function(a){a[F]&&"TEXTAREA"==a[F].tagName&&b()},!1);a[C]("DOMFocusOut",function(a){a[F]&&"TEXTAREA"==a[F].tagName&&c()},!1)};var Va=function(){return-1!=k[t][B]("Android")},Wa=/Mac OS X.+Silk\//,Ya=/Chrome\/([0-9.]+)/;var Za=/iPhone|iPod|iPad/.test(k[t])||Va()||Wa.test(k[t]),$a=window[H].msPointerEnabled,Sa=Za?"touchstart":$a?"MSPointerDown":"mousedown",ab=Za?"touchend":$a?"MSPointerUp":"mouseup",bb=function(){var a=Ra;return function(b){b.touches=[];b.targetTouches=[];b.changedTouches=[];b.type!=ab&&(b.touches[0]=b,b.targetTouches[0]=b);b.changedTouches[0]=b;a(b)}},cb=function(a){var b=parseInt,c;c=Va()&&-1!=k[t][B]("Chrome/")?(c=Ya.exec(k[t]))?c[1]:"":"";b=b(c.split(".")[0],10);return Va()&&-1!=k[t][B]("Chrome/")&&
18==b?new Ma(a.clientX,a.pageY-window.scrollY):new Ma(a.clientX,a.clientY)};var Y,db,eb,Ka;Ka=Ja("wireless.events.clickbuster");
var fb=function(a){if(!(2500<da()-db)){var b=cb(a);if(1>b.a&&1>b.b)La("Not busting click on label elem at ("+b.a+", "+b.b+")");else{for(var c=0;c<Y[D];c+=2)if(25>Math.abs(b.a-Y[c])&&25>Math.abs(b.b-Y[c+1])){Y[I](c,c+2);return}La("busting click at "+b.a+", "+b.b);a.stopPropagation();a.preventDefault();(a=eb)&&a()}}},gb=function(a){var b=cb((a.touches||[a])[0]);Y[z](b.a,b.b);window.setTimeout(function(){for(var a=b.a,d=b.b,g=0;g<Y[D];g+=2)if(Y[g]==a&&Y[g+1]==d){Y[I](g,g+2);break}eb=void 0},2500)};eb=void 0;if(!Y){document[C]("click",fb,!0);var Ra=gb;Za||$a||(Ra=bb());Ua();Y=[]}db=da();for(var $=0;$<Y[D];$+=2)if(25>Math.abs(0-Y[$])&&25>Math.abs(0-Y[$+1])){Y[I]($,$+2);break};})();
