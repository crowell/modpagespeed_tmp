(function(){var g=Function,h=Array,k=navigator,l=Error,m=String,n="shift",p="replace",q="bind",r="propertyIsEnumerable",s="userAgent",t="stack",v="console",w="apply",x="fileName",y="push",z="slice",A="indexOf",B="addEventListener",C="length",E="prototype",F="target",G="call",H="navigator",I="splice",J="",aa="\n\nBrowser stack:\n",ba='\nUrl: <a href="view-source:',ca='"',da='" target="_new">',ea="%s",fa="&",ga="&amp;",ha="&gt;",ia="&lt;",ka="&quot;",la="(",ma=")",na=")\n",K=", ",oa="-> ",pa=".",qa="...",ra=":",
sa=": ",ta="<",ua="</a>\nLine: ",va=">",wa="Android",xa="Assertion failed",ya="Chrome/",za="DOMFocusIn",Aa="DOMFocusOut",Ba="Exception during event processing.",Ca="Exception trying to expose exception! You win, we lose. ",Da="Message: ",L="Not available",Ea="Not busting click on label elem at (",Fa="Root logger has no level set.",Ga="TEXTAREA",Ha="Unknown error",Ia="UnknownError",Ja="[...circular reference...]",Ka="[...long stack...]",La="[Anonymous]",Ma="[end]",Na="[end]\n\nJS stack traversal:\n",
Oa="[exception trying to get caller]\n",Pa="[fn]",Qa="[object Array]",Ra="[object Function]",Sa="[object Window]",Ta="array",Ua="boolean",Va="bubble",Wa="busting click at ",Xa="call",Ya="capture",Za="false",M="function",$a="href",ab="location",bb="log:",cb="native code",db="null",eb="number",N="object",fb="splice",O="string",gb="true",hb="window",P,Q=this,ib=function(a){var b=typeof a;if(b==N)if(a){if(a instanceof h)return Ta;if(a instanceof Object)return b;var c=Object[E].toString[G](a);if(c==Sa)return N;
if(c==Qa||typeof a[C]==eb&&"undefined"!=typeof a[I]&&"undefined"!=typeof a[r]&&!a[r](fb))return Ta;if(c==Ra||"undefined"!=typeof a[G]&&"undefined"!=typeof a[r]&&!a[r](Xa))return M}else return db;else if(b==M&&"undefined"==typeof a[G])return N;return b},jb=function(a,b,c){return a[G][w](a[q],arguments)},kb=function(a,b,c){if(!a)throw l();if(2<arguments[C]){var d=h[E][z][G](arguments,2);return function(){var c=h[E][z][G](arguments);h[E].unshift[w](c,d);return a[w](b,c)}}return function(){return a[w](b,
arguments)}},R=function(a,b,c){R=g[E][q]&&-1!=g[E][q].toString()[A](cb)?jb:kb;return R[w](null,arguments)},lb=Date.now||function(){return+new Date},mb=function(a,b){function c(){}c.prototype=b[E];a.w=b[E];a.prototype=new c};g[E].bind=g[E][q]||function(a,b){if(1<arguments[C]){var c=h[E][z][G](arguments,1);c.unshift(this,a);return R[w](null,c)}return R(this,a)};var S=function(a){l.captureStackTrace?l.captureStackTrace(this,S):this.stack=l()[t]||J;a&&(this.message=m(a))};mb(S,l);S[E].name="CustomError";var nb=function(a,b){for(var c=a.split(ea),d=J,f=h[E][z][G](arguments,1);f[C]&&1<c[C];)d+=c[n]()+f[n]();return d+c.join(ea)},tb=function(a,b){if(b)return a[p](ob,ga)[p](pb,ia)[p](qb,ha)[p](rb,ka);if(!sb.test(a))return a;-1!=a[A](fa)&&(a=a[p](ob,ga));-1!=a[A](ta)&&(a=a[p](pb,ia));-1!=a[A](va)&&(a=a[p](qb,ha));-1!=a[A](ca)&&(a=a[p](rb,ka));return a},ob=/&/g,pb=/</g,qb=/>/g,rb=/\"/g,sb=/[&<>\"]/;var T=function(a,b){b.unshift(a);S[G](this,nb[w](null,b));b[n]()};mb(T,S);T[E].name="AssertionError";var ub=function(a,b,c){if(!a){var d=h[E][z][G](arguments,2),f=xa;if(b)var f=f+(sa+b),e=d;throw new T(J+f,e||[]);}return a},vb=function(a,b){throw new T("Failure"+(a?sa+a:J),h[E][z][G](arguments,1));};var wb=h[E],xb=wb[A]?function(a,b,c){ub(null!=a[C]);return wb[A][G](a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a[C]+c):c;if(typeof a==O)return typeof b==O&&1==b[C]?a[A](b,c):-1;for(;c<a[C];c++)if(c in a&&a[c]===b)return c;return-1};var U,yb,zb,Ab,Bb=function(){return Q[H]?Q[H][s]:null};Ab=zb=yb=U=!1;var V;if(V=Bb()){var Cb=Q[H];U=0==V.lastIndexOf("Opera",0);yb=!U&&(-1!=V[A]("MSIE")||-1!=V[A]("Trident"));zb=!U&&-1!=V[A]("WebKit");Ab=!U&&!zb&&!yb&&"Gecko"==Cb.product}var Db=yb,Eb=Ab,Fb=zb;var W;if(U&&Q.opera){var Gb=Q.opera.version;typeof Gb==M&&Gb()}else Eb?W=/rv\:([^\);]+)(\)|;)/:Db?W=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Fb&&(W=/WebKit\/(\S+)/),W&&W.exec(Bb());var Ib=function(a,b){try{var c;var d;n:{for(var f=[hb,ab,$a],e=Q,u;u=f[n]();)if(null!=e[u])e=e[u];else{d=null;break n}d=e}if(typeof a==O)c={message:a,name:Ha,lineNumber:L,fileName:d,stack:L};else{var D,ja,f=!1;try{D=a.lineNumber||a.v||L}catch(nc){D=L,f=!0}try{ja=a[x]||a.filename||a.sourceURL||Q.$googDebugFname||d}catch(oc){ja=L,f=!0}c=!f&&a.lineNumber&&a[x]&&a[t]&&a.message&&a.name?a:{message:a.message||L,name:a.name||Ia,lineNumber:D,fileName:ja,stack:a[t]||L}}return Da+tb(c.message)+ba+c[x]+da+c[x]+
ua+c.lineNumber+aa+tb(c[t]+oa)+Na+tb(Hb(b)+oa)}catch(Zb){return Ca+Zb}},Hb=function(a){return Jb(a||arguments.callee.caller,[])},Jb=function(a,b){var c=[];if(0<=xb(b,a))c[y](Ja);else if(a&&50>b[C]){c[y](Kb(a)+la);for(var d=a.arguments,f=0;f<d[C];f++){0<f&&c[y](K);var e;e=d[f];switch(typeof e){case N:e=e?N:db;break;case O:break;case eb:e=m(e);break;case Ua:e=e?gb:Za;break;case M:e=(e=Kb(e))?e:Pa;break;default:e=typeof e}40<e[C]&&(e=e.substr(0,40)+qa);c[y](e)}b[y](a);c[y](na);try{c[y](Jb(a.caller,b))}catch(u){c[y](Oa)}}else a?
c[y](Ka):c[y](Ma);return c.join(J)},Kb=function(a){if(X[a])return X[a];a=m(a);if(!X[a]){var b=/function ([^\(]+)/.exec(a);X[a]=b?b[1]:La}return X[a]},X={};var Lb=function(a,b,c,d,f){this.reset(a,b,c,d,f)};Lb[E].c=null;Lb[E].b=null;var Mb=0;P=Lb[E];P.reset=function(a,b,c,d,f){typeof f==eb||Mb++;d||lb();this.a=a;this.d=b;delete this.c;delete this.b};P.m=function(a){this.c=a};P.n=function(a){this.b=a};P.j=function(a){this.a=a};P.getMessage=function(){return this.d};var Y=function(a){this.e=a};Y[E].b=null;Y[E].a=null;Y[E].c=null;Y[E].d=null;var Nb=function(a,b){this.name=a;this.value=b};Nb[E].toString=function(){return this.name};var Ob=new Nb("WARNING",900),Pb=new Nb("CONFIG",700);P=Y[E];P.getParent=function(){return this.b};P.getChildren=function(){this.c||(this.c={});return this.c};P.j=function(a){this.a=a};P.i=function(){if(this.a)return this.a;if(this.b)return this.b.i();vb(Fa);return null};P.s=function(a){return a.value>=this.i().value};
P.log=function(a,b,c){this.s(a)&&(ib(b)==M&&(b=b()),this.q(this.r(a,b,c)))};P.r=function(a,b,c){var d=new Lb(a,m(b),this.e);c&&(d.m(c),d.n(Ib(c,arguments.callee.caller)));return d};P.f=function(a,b){this.log(Ob,a,b)};P.q=function(a){var b=bb+a.getMessage();Q[v]&&(Q[v].timeStamp?Q[v].timeStamp(b):Q[v].markTimeline&&Q[v].markTimeline(b));Q.msWriteProfilerMark&&Q.msWriteProfilerMark(b);for(b=this;b;)b.u(a),b=b.getParent()};P.u=function(a){if(this.d)for(var b=0,c;c=this.d[b];b++)c(a)};
P.p=function(a){this.b=a};P.o=function(a,b){this.getChildren()[a]=b};var Qb={},Rb=null,Sb=function(a){Rb||(Rb=new Y(J),Qb[J]=Rb,Rb.j(Pb));var b;if(!(b=Qb[a])){b=new Y(a);var c=a.lastIndexOf(pa),d=a.substr(c+1),c=Sb(a.substr(0,c));c.o(d,b);b.p(c);Qb[a]=b}return b};var Tb=function(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0};Tb[E].toString=function(){return la+this.x+K+this.y+ma};var Ub=function(a){this.c=a;ub(!this.c._wect);this.c._wect=this;this.b={};this.a={};this.d={}};Ub[E].e=Sb("wireless.events.ListenerCoalescer");var Vb=function(a){a._wect||new Ub(a);return a._wect};P=Ub[E];P.l=function(a,b){void 0==this.b[a]&&(this.b[a]=0);var c=this.b[a];this.b[a]++;for(var d=this.a[a],f=d[C],e,u=0;u<f;u++)try{d[u](b)}catch(D){this.e.f(Ba,D),e=e||D}this.b[a]--;ub(this.b[a]==c);ub(0<=this.b[a]);if(e)throw e;};P.h=function(a){this.d[a]||(this.d[a]=R(this.l,this,a));return this.d[a]};
P.g=function(a,b){return a+ra+(b?Ya:Va)};P.k=function(a,b,c){c=!!c;var d=this.g(a,c);this.a[d]||(this.a[d]=[],this.c[B](a,this.h(d),c));this.a[d][y](b)};P.t=function(a,b,c){c=!!c;var d=this.g(a,c);this.b[d]&&(this.a[d]=this.a[d][z](0));b=this.a[d][A](b);-1!=b&&this.a[d][I](b,1);0==this.a[d][C]&&(this.a[d]=void 0,this.c.removeEventListener(a,this.h(d),c))};var Xb=function(a,b,c,d,f){var e=Vb(a);e.k(b,c,d);f&&Wb(a,function(){e.k(b,c,d)},function(){e.t(b,c,d)})},Wb=function(a,b,c){a[B](za,function(a){a[F]&&a[F].tagName==Ga&&b()},!1);a[B](Aa,function(a){a[F]&&a[F].tagName==Ga&&c()},!1)};var Yb=function(){return-1!=k[s][A](wa)&&-1!=k[s][A](ya)},$b=/Mac OS X.+Silk\//,ac=/Chrome\/([0-9.]+)/;var bc=/iPhone|iPod|iPad/.test(k[s])||-1!=k[s][A](wa)||$b.test(k[s]),cc=window[H].msPointerEnabled,dc=bc?"touchstart":cc?"MSPointerDown":"mousedown",ec=bc?"touchend":cc?"MSPointerUp":"mouseup",fc=function(a){return function(b){b.touches=[];b.targetTouches=[];b.changedTouches=[];b.type!=ec&&(b.touches[0]=b,b.targetTouches[0]=b);b.changedTouches[0]=b;a(b)}},gc=function(a){var b=parseInt,c;c=Yb()?(c=ac.exec(k[s]))?c[1]:J:J;b=b(c.split(pa)[0],10);return Yb()&&18==b?new Tb(a.clientX,a.pageY-window.scrollY):
new Tb(a.clientX,a.clientY)};var Z,hc,ic,jc=Sb("wireless.events.clickbuster"),kc=function(a){if(!(2500<lb()-hc)){var b=gc(a);if(1>b.x&&1>b.y)jc.f(Ea+b.x+K+b.y+ma);else{for(var c=0;c<Z[C];c+=2)if(25>Math.abs(b.x-Z[c])&&25>Math.abs(b.y-Z[c+1])){Z[I](c,c+2);return}jc.f(Wa+b.x+K+b.y);a.stopPropagation();a.preventDefault();(a=ic)&&a()}}},lc=function(a){var b=gc((a.touches||[a])[0]);Z[y](b.x,b.y);window.setTimeout(function(){for(var a=b.x,d=b.y,f=0;f<Z[C];f+=2)if(Z[f]==a&&Z[f+1]==d){Z[I](f,f+2);break}ic=void 0},2500)};ic=void 0;if(!Z){document[B]("click",kc,!0);var mc=lc;bc||cc||(mc=fc(mc));Xb(document,dc,mc,!0,!0);Z=[]}hc=lb();for(var $=0;$<Z[C];$+=2)if(25>Math.abs(0-Z[$])&&25>Math.abs(0-Z[$+1])){Z[I]($,$+2);break};})();
