(function(){var c=!0,f=null,h=!1,aa=encodeURIComponent,i=window,j=Object,l=document,m=navigator;function n(a,b){return a.createElement=b}function p(a,b){return a.attachEvent=b}function r(a,b){return a.addEventListener=b}
var s="exec",t="querySelector",u="defineProperty",v="setAttribute",w="attachEvent",x="getElementsByTagName",y="documentElement",z="fireEvent",A="push",B="item",C="indexOf",D="hasAttribute",E="readyState",F="addEventListener",G="length",H="prototype",I="body",J="removeChild",K="call",L="getAttribute",M="querySelectorAll",N="parentNode",O="",ba="\n",ca='");',da="'>\x3c/script>",ea="*",fa=":not([psa_not_processed])",ga="<div>_</div>",ha="<script type='psa_prefetch' src='",ia='=document.getElementById("',
ja="Add to queue str: ",ka="Add to queue url: ",la="AppleWebKit",ma="DOMContentLoaded",na="Evaluated: ",P="Exception while evaluating.",oa="Exception while overriding document.all.",pa="Exception while overriding document.readyState.",qa="Executed: ",ra="Executing a script twice. Orig_Index: ",sa="Firefox",ta="Firing Event: ",ua="Function is not defined",va="HTMLEvents",wa="PSA ERROR: ",Q="SCRIPT",xa="Unable to insert nodes, no context element found",ya="[pagespeed_onload]",za="[psa_current_node]",
Aa="[psa_not_processed]",Ba='[type="text/psajs"]',Ca="all",Da="application/ecmascript",Ea="application/javascript",Fa="application/x-ecmascript",Ga="application/x-javascript",Ha="class",Ia="complete",Ja="data:text/html,",Ka="data:text/javascript,",La="div",Ma="dw: ",R="error",Na="function",Oa="handle_dw: ",Pa="id",Qa="iframe",Ra="language",S="load",Sa="loaded",Ta="loading",Ua="none",Va="on",Wa="onDOMContentLoaded",Xa="onafterscripts",Ya="onbeforescripts",Za="onload",$a="onreadystatechange",ab="orig_index",
bb="pagespeed_onload",cb="pagespeed_orig_src",db="pagespeed_orig_type",eb="psa_current_node",fb="psa_dw_target",T="psa_not_processed",gb="psa_prefetch_container",hb="psanode",ib="readyState",jb="readystatechange",U="script",kb="src",lb="text/",mb="text/ecmascript",nb="text/javascript",ob="text/javascript1.0",pb="text/javascript1.1",qb="text/javascript1.2",rb="text/javascript1.3",sb="text/javascript1.4",tb="text/javascript1.5",ub="text/jscript",vb="text/livescript",wb="text/psajs",xb="text/x-ecmascript",
yb="text/x-javascript",zb="true",V="type",Ab="var ",Bb="var psaFunc=function() {",Cb="};",W;i.pagespeed=i.pagespeed||{};var X=i.pagespeed;X.deferJsNs={};
var Y=X.deferJsNs,Z=function(){this.k=[];this.i=[];this.l=this.j=0;this.m=[];this.g=O;this.q={};this.J=[Da,Ea,Fa,Ga,mb,nb,ob,pb,qb,rb,sb,tb,ub,vb,xb,yb];this.D=l.getElementById;this.t=l[x];this.ba=l.write;this.ca=l.writeln;this.aa=l.open;this.$=l.close;this.F=l[F];this.H=i[F];this.G=l[w];this.I=i[w];this.c=l.createElement;this.v=this.u=this.a=0;this.h=this.s=c;this.n=f;this.o=0;this.p=[];this.f=O},Db=h;W=Z[H];
W.log=function(a,b){this.i&&(this.i[A](O+a),b&&(this.i[A](b),"undefined"!=typeof console&&"undefined"!=typeof console.log&&console.log(wa+a+b.message)))};W.P=function(a,b){this.k.splice(b?b:this.k[G],0,a)};W.T=function(a){var b=this.c[K](l,U);b.text=a;b[v](V,nb);a=this.C();a[N].insertBefore(b,a)};
W.fa=function(){for(var a=l[x](ea),b=O,d=0;d<a[G];d++)if(a[d][D](Pa)){var e=a[d][L](Pa);if(e&&-1==e.search(/[-:.]/)&&-1==e.search(/^[0-9]/))try{i[e]&&i[e].tagName&&(b+=Ab+e+ia+e+ca)}catch(k){this.log(P,k)}}b&&this.T(b)};W.ia=function(){if(this.f){var a=l.createElement(Qa);a[v](Ha,gb);a.style.display=Ua;l[I].appendChild(a);this.R()?a.src=Ja+aa(this.f):this.b()&&(a.contentWindow.document.write(this.f),a.contentWindow.document.close());this.f=O}};
W.ta=function(a){this.ra()?(new Image).src=a:this.f+=ha+a+da};W.B=function(a,b,d){var e=a[L](cb)||a[L](kb);e?(d&&this.ta(e),this.addUrl(e,a,b)):this.Y(a.innerHTML||a.textContent||a.data||O,a,b)};W.Y=function(a,b,d){if(this.R())this.addUrl(Ka+aa(a),b,d);else{this.i[A](ja+a);var e=this;this.P(function(){e.z(b);e.O()[v](eb,O);try{e.T(a)}catch(d){e.log(P,d)}e.log(na+a);e.A()},d)}};Z[H].addStr=Z[H].Y;
Z[H].addUrl=function(a,b,d){this.i[A](ka+a);var e=this;this.P(function(){e.z(b);var d=e.c[K](l,U);d[v](V,nb);var g=function(){e.log(qa+a);e.A()};Y.e(d,g);Y.d(d,R,g);9>e.b()&&Y.d(d,jb,function(){if(d[E]==Ia||d[E]==Sa)d.onreadystatechange=f,g()});d[v](kb,a);var q=b.innerHTML||b.textContent||b.data;q&&d.appendChild(l.createTextNode(q));q=e.O();q[v](eb,O);q[N].insertBefore(d,q)},d)};Z[H].addUrl=Z[H].addUrl;W=Z[H];
W.z=function(a){if(l[M]&&!(8>=this.b()))for(var b=l[M](Aa),d=0;d<b[G];d++){var e=b[B](d);if(e==a)break;e[L](V)!=wb&&e.removeAttribute(T)}};W.ga=function(){for(var a=this.t[K](l,ea),b=0;b<a[G];b++)a[B](b)[v](T,O)};W.O=function(){var a=f;l[t]&&(a=l[t](Ba));return a};W.C=function(){var a;l[t]&&(a=l[t](za));return a||this.t[K](l,hb)[0]};W.ha=function(){var a=this.C();a.nodeName==Q&&a[N][J](a)};
W.w=function(){if(!(5<=this.a))if(this.h&&(this.b()&&l[y].originalDoScroll&&(l[y].doScroll=l[y].originalDoScroll),j[u]&&delete l[E],this.b()&&j[u]&&delete l.all),l.getElementById=this.D,l[M]&&!(8>=this.b())&&(l.getElementsByTagName=this.t),n(l,this.c),l.open=this.aa,l.close=this.$,l.write=this.ba,l.writeln=this.ca,this.h){this.a=5;this.da();var a=this;l[E]!=Ia?Y.e(i,function(){a.M()}):(l.onreadystatechange&&this[s](l.onreadystatechange,l),i.onload&&($(i,Za,i.onload),i.onload=f),this.M())}else this.a=
1,this.s=h,this.n&&(this[s](this.n),this.n=f)};W.M=function(){this.la();this[z](3);for(var a=l[I][x](hb),b=a[G]-1;0<=b;b--)l[I][J](a[b]);a=l[I].getElementsByClassName(gb);for(b=a[G]-1;0<=b;b--)a[b][N][J](a[b]);this.a=6;this[z](4)};W.ma=function(a){for(;a=a[N];)if(a==l)return c;return h};W.Q=function(a){for(var b=0,d=a[G],e=0;e<d;++e){var k=a[e],g=k[N],q=k.src,Eb=k.textContent;(8<this.b()&&(!g||q==O&&Eb==O)||!this.b()&&(!this.ma(k)||q==O))&&b++}return b};
W.K=function(){if(4!=this.a)return h;var a=0;0!=this.l&&(a=this.Q(this.m));return this.l==a?c:h};W.za=function(){return 6===this.a};Z[H].scriptsAreDone=Z[H].za;Z[H].A=function(){this.L();this.ha();this.j<this.k[G]?(this.j++,this.k[this.j-1][K](i)):this.h?(this.a=4,this.z(),this[z](2),this.K()&&this.w()):this.w()};Z[H].W=function(a){for(var b=[],d=a[G],e=0;e<d;++e)b[A](a[B](e));return b};
Z[H].ja=function(){if(this.s){var a=l.createElement(hb);a[v](fb,zb);l[I].appendChild(a);this.b()&&this.fa();if(j[u])try{var b={configurable:c,get:function(){return Ta}};j[u](l,ib,b)}catch(d){this.log(pa,d)}if(this.b()&&(l[y].originalDoScroll=l[y].doScroll,l[y].doScroll=function(){throw"psa exception";},j[u]))try{b={configurable:c,get:function(){}},j[u](l,Ca,b)}catch(e){this.log(oa,e)}}this.ga();this.ea();var k=this;l.writeln=function(a){k.N(a+ba)};l.write=function(a){k.N(a)};l.open=function(){};l.close=
function(){};l.getElementById=function(a){k.L();a=k.D[K](l,a);return a==f||a[D](T)?f:a};l[M]&&!(8>=k.b())&&(l.getElementsByTagName=function(a){return l[M](a+fa)});n(l,function(a){var b=k.c[K](l,a);a.toLowerCase()==U&&(k.m[A](b),k.l++,a=function(){k.l--;var a=k.m[C](this);-1!=a&&(k.m.splice(a,1),k.K()&&k.w())},Y.e(b,a),Y.d(b,R,a));return b})};Z[H].execute=function(){if(2==this.a){var a=0;0!=this.o&&(a=this.Q(this.p));this.o==a&&(n(l,this.c),this.S())}};Z[H].execute=Z[H].execute;
Z[H].S=function(){2==this.a&&(this.s&&this[z](1),this.a=3,this.ja(),this.A())};Z[H].run=Z[H].S;W=Z[H];W.pa=function(a){var b=this.c[K](l,La);b.innerHTML=ga+a;b[J](b.firstChild);return b};W.ua=function(a){var b=a[N];b&&b[J](a)};W.oa=function(a,b){for(var d=this.W(a),e=d[G],k=b[N],g=0;g<e;++g){var q=d[g];this.ua(q);k.insertBefore(q,b)}};W.qa=function(a){return a.nodeName!=Q?h:a[D](V)?(a=a[L](V),!a||-1!=this.J[C](a)):a[D](Ra)?(a=a[L](Ra),!a||-1!=this.J[C](lb+a.toLowerCase())):c};
W.U=function(a,b){if(a.childNodes)for(var d=this.W(a.childNodes),e=d[G],k=0;k<e;++k){var g=d[k];g.nodeName==Q?this.qa(g)&&(b[A](g),g[v](db,g.type),g[v](V,wb),g[v](cb,g.src),g[v](kb,O),g[v](T,O)):this.U(g,b)}};W.na=function(a,b){for(var d=a[G],e=0;e<d;++e)this.B(a[e],b+e,!!e)};W.ka=function(a,b,d){a=this.pa(a);var e=[];this.U(a,e);d?this.oa(a.childNodes,d):this.log(xa);this.na(e,b)};W.L=function(){if(this.g!=O){this.log(Oa+this.g);var a=this.g;this.g=O;var b=this.C();this.ka(a,this.j,b)}};
W.N=function(a){this.log(Ma+a);this.g+=a};W.la=function(){var a;l[M]&&(a=l[M](ya));for(var b=0;b<a[G];b++){var d=a[B](b),e=Bb+d[L](bb)+Cb;i.eval[K](i,e);typeof i.psaFunc!=Na?this.log(ua,Error(O)):$(d,Za,i.psaFunc)}};W.wa=function(a){$(i,Ya,a)};Z[H].addBeforeDeferRunFunctions=Z[H].wa;Z[H].va=function(a){$(i,Xa,a)};Z[H].addAfterDeferRunFunctions=Z[H].va;Z[H].fireEvent=function(a){this.u=a;this.log(ta+a);a=this.q[a]||[];for(var b=0;b<a[G];++b)this[s](a[b]);a.length=0};
Z[H].exec=function(a,b){try{a[K](b||i)}catch(d){this.log(P,d)}};Z[H].ea=function(){var a=this;i[F]?(r(l,function(b,d,e){$(l,b,d,e,a.F)}),r(i,function(b,d,e){$(i,b,d,e,a.H)})):i[w]&&(p(l,function(b,d){$(l,b,d,void 0,a.G)}),p(i,function(b,d){$(i,b,d,void 0,a.I)}))};Z[H].da=function(){i[F]?(r(l,this.F),r(i,this.H)):i[w]&&(p(l,this.G),p(i,this.I))};
var $=function(a,b,d,e,k){var g=X.deferJs;if(!(6<=g.a)){if(2>g.u&&(b==ma||b==jb||b==Wa||b==$a))b=2;else if(3>g.u&&(b==S||b==Za))b=3;else if(b==Ya)b=1;else if(b==Xa)b=4;else{k&&k[K](a,b,d,e);return}var q;3==b&&!(8>=g.b())&&(q=l.createEvent(va),q.initEvent(S,h,h));g.q[b]||(g.q[b]=[]);g.q[b][A](function(){d[K](a,q)})}};
Z[H].X=function(a){if(!(2<=this.a)){if(a){if(!Db){a();return}this.h=h;this.n=a}else this.h=c;this.a=2;for(var b=l[x](U),d=b[G],e=0;e<d;++e){var k=this.k[G]==this.j,g=b[e];g[L](V)==wb&&(a?g[L](ab)==this.v&&(this.v++,this.B(g,void 0,!k)):(g[L](ab)<this.v&&this.log(ra+g[L](ab),Error(O)),this.B(g,void 0,!k)))}this.ia()}};Z[H].registerScriptTags=Z[H].X;Y.e=function(a,b){Y.d(a,S,b)};X.addOnload=Y.e;
Y.d=function(a,b,d){if(a[F])a[F](b,d,h);else if(a[w])a[w](Va+b,d);else{var e=a[Va+b];a[Va+b]=function(){d[K](this);e&&e[K](this)}}};X.addHandler=Y.d;W=Z[H];W.R=function(){return-1!=m.userAgent[C](sa)};W.ra=function(){return-1!=m.userAgent[C](la)};W.b=function(){var a=/(?:MSIE.(\d+\.\d+))/[s](m.userAgent);return a&&a[1]?l.documentMode||parseFloat(a[1]):NaN};
W.sa=function(){var a=this;n(l,function(b){var d=a.c[K](l,b);b.toLowerCase()==U&&(a.p[A](d),a.o++,b=function(){var b=a.p[C](this);-1!=b&&(a.p.splice(b,1),a.o--,a.execute())},Y.e(d,b),Y.d(d,R,b));return d})};W.ya=function(){return Db};Z[H].isExperimentalMode=Z[H].ya;Y.xa=function(){X.deferJs||(i.localStorage&&(Db=i.localStorage.defer_js_experimental),X.r=new Z,X.r.sa(),X.deferJs=X.r)};Y.xa();X.V=h;Y.Z=function(){!X.V&&!X.panelLoader&&(X.V=c,X.r.X(),X.r.execute())};Y.d(l,ma,Y.Z);Y.e(i,Y.Z);})();
