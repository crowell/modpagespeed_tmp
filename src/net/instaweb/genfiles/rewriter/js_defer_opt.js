(function(){var aa=encodeURIComponent,e=window,f=Object,g=document,ba=navigator;function h(a,b){return a.createElement=b}function k(a,b){return a.deferJs=b}function l(a,b){return a.attachEvent=b}function q(a,b){return a.addEventListener=b}
var r="exec",s="querySelector",t="defineProperty",u="setAttribute",v="deferJs",w="attachEvent",x="getElementsByTagName",y="documentElement",z="registerScriptTags",A="fireEvent",B="execute",C="push",D="item",E="indexOf",F="hasAttribute",G="readyState",H="addEventListener",I="name",J="length",K="prototype",L="body",M="removeChild",N="call",O="getAttribute",P="querySelectorAll",Q="parentNode",R="",ca="\n",da='");',ea='"]',fa="'>\x3c/script>",ga="*",ha=":not([",ia="<div>_</div>",ja="<script type='psa_prefetch' src='",
ka='=document.getElementById("',la="Add to queue str: ",ma="Add to queue url: ",na="AppleWebKit",oa="DOMContentLoaded",pa="Evaluated: ",qa="Exception while evaluating.",ra="Exception while overriding document.all.",sa="Exception while overriding document.readyState.",ta="Executed: ",ua="Executing a script twice. Orig_Index: ",va="Firefox",wa="Firing Event: ",xa="Function is not defined",ya="PSA ERROR: ",za="SCRIPT",Aa="Unable to insert nodes, no context element found",Ba="[",Ca="[data-pagespeed-onload][data-pagespeed-loaded]",
Da="[psa_current_node]",Ea='[type="',Fa="]",Ga="])",Ha="all",Ia="application/ecmascript",Ja="application/javascript",Ka="application/x-ecmascript",La="application/x-javascript",Ma="async",Na="class",Oa="complete",Pa="data-pagespeed-onload",Qa="data:text/html,",Ra="data:text/javascript,",Sa="defer",Ta="div",Ua="dw: ",Va="error",Wa="function",Xa="handle_dw: ",Ya="id",Za="iframe",$a="interactive",ab="language",bb="load",cb="loaded",db="loading",eb="none",fb="on",gb="onDOMContentLoaded",hb="onafterscripts",
ib="onbeforescripts",jb="onload",kb="onreadystatechange",S="orig_index",lb="pagespeed_orig_src",mb="pagespeed_orig_type",nb="priority_psa_not_processed",ob="psa_current_node",pb="psa_dw_target",qb="psa_not_processed",rb="psa_prefetch_container",sb="psanode",tb="readyState",ub="readystatechange",T="script",vb="src",wb="text/",xb="text/ecmascript",yb="text/javascript",zb="text/javascript1.0",Ab="text/javascript1.1",Bb="text/javascript1.2",Cb="text/javascript1.3",Db="text/javascript1.4",Eb="text/javascript1.5",
Fb="text/jscript",Gb="text/livescript",Hb="text/prioritypsajs",Ib="text/psajs",Jb="text/x-ecmascript",Kb="text/x-javascript",Lb="true",U="type",Mb="var ",Nb="var psaFunc=function() {",Ob="};",V,W=function(a,b,c){if(a[H])a[H](b,c,!1);else if(a[w])a[w](fb+b,c);else{var d=a[fb+b];a[fb+b]=function(){c[N](this);d&&d[N](this)}}};e.pagespeed=e.pagespeed||{};var X=e.pagespeed;X.deferJsNs={};var Y=X.deferJsNs,Z=function(){this.o=[];this.m=[];this.r=this.n=0;this.s=[];this.j=R;this.w={};this.P=[Ia,Ja,Ka,La,xb,yb,zb,Ab,Bb,Cb,Db,Eb,Fb,Gb,Jb,Kb];this.K=g.getElementById;this.q=g[x];this.ia=g.write;this.ja=g.writeln;this.ha=g.open;this.ga=g.close;this.N=g[H];this.L=e[H];this.O=g[w];this.M=e[w];this.f=g.createElement;this.B=this.a=0;this.l=this.A=!0;this.d=null;this.u=0;this.v=[];this.c=this.g=this.i=R;this.t=-1},Pb=!1;V=Z[K];
V.log=function(a,b){this.m&&(this.m[C](R+a),b&&(this.m[C](b),"undefined"!=typeof console&&"undefined"!=typeof console.log&&console.log(ya+a+b.message)))};V.V=function(a,b){this.o.splice(b?b:this.o[J],0,a)};V.$=function(a,b){var c=this.W(b);c.text=a;c[u](U,yb);var d=this.I();d[Q].insertBefore(c,d);return c};
V.ma=function(){for(var a=g[x](ga),b=R,c=0;c<a[J];c++)if(a[c][F](Ya)){var d=a[c][O](Ya);if(d&&-1==d.search(/[-:.]/)&&-1==d.search(/^[0-9]/))try{e[d]&&e[d].tagName&&(b+=Mb+d+ka+d+da)}catch(p){this.log(qa,p)}}b&&(a=this.$(b),a[u](qb,R),a[u](nb,R))};V.na=function(){if(this.i){var a=g.createElement(Za);a[u](Na,rb);a.style.display=eb;g[L].appendChild(a);this.X()?a.src=Qa+aa(this.i):this.b()&&(a.contentWindow.document.write(this.i),a.contentWindow.document.close());this.i=R}};
V.za=function(a){this.ya()?(new Image).src=a:this.i+=ja+a+fa};V.H=function(a,b,c){var d=a[O](lb)||a[O](vb);d?(c&&this.za(d),this.addUrl(d,a,b)):this.ea(a.innerHTML||a.textContent||a.data||R,a,b)};V.ea=function(a,b,c){if(this.X())this.addUrl(Ra+aa(a),b,c);else{this.m[C](la+a);var d=this;this.V(function(){d.F(b);d.U()[u](ob,R);try{d.$(a,b)}catch(c){d.log(qa,c)}d.log(pa+a);d.G()},c)}};Z[K].addStr=Z[K].ea;
Z[K].W=function(a){var b=this.f[N](g,T);if(a)for(var c=a.attributes,d=c[J]-1;0<=d;--d)c[d][I]!=U&&(c[d][I]!=vb&&c[d][I]!=Ma&&c[d][I]!=Sa&&c[d][I]!=mb&&c[d][I]!=lb&&c[d][I]!=S&&c[d][I]!=ob&&c[d][I]!=this.c)&&(b[u](c[d][I],c[d].value),a.removeAttribute(c[d][I]));return b};
Z[K].addUrl=function(a,b,c){this.m[C](ma+a);var d=this;this.V(function(){d.F(b);var c=d.W(b);c[u](U,yb);var m=function(){d.log(ta+a);d.G()};Y.h(c,m);W(c,Va,m);9>d.b()&&W(c,ub,function(){if(c[G]==Oa||c[G]==cb)c.onreadystatechange=null,m()});c[u](vb,a);var n=b.innerHTML||b.textContent||b.data;n&&c.appendChild(g.createTextNode(n));n=d.U();n[u](ob,R);n[Q].insertBefore(c,n)},c)};Z[K].addUrl=Z[K].addUrl;V=Z[K];
V.F=function(a){if(g[P]&&!(8>=this.b()))for(var b=g[P](Ba+this.c+Fa),c=0;c<b[J];c++){var d=b[D](c);if(d==a)break;d[O](U)!=this.g&&d.removeAttribute(this.c)}};V.ba=function(){for(var a=this.q[N](g,ga),b=0;b<a[J];b++)a[D](b)[u](this.c,R)};V.U=function(){var a=null;g[s]&&(a=g[s](Ea+this.g+ea));return a};V.I=function(){var a;g[s]&&(a=g[s](Da));return a||this.q[N](g,sb)[0]};V.oa=function(){var a=this.I();a.nodeName==za&&a[Q][M](a)};
V.C=function(){if(!(5<=this.a))if(this.l&&this.k()&&(this.b()&&g[y].originalDoScroll&&(g[y].doScroll=g[y].originalDoScroll),f[t]&&delete g[G],this.b()&&f[t]&&delete g.all),g.getElementById=this.K,!g[P]||8>=this.b()||(g.getElementsByTagName=this.q),h(g,this.f),g.open=this.ha,g.close=this.ga,g.write=this.ia,g.writeln=this.ja,this.l)if(this.a=5,this.ka(),this.k()){var a=this;g[G]!=Oa?Y.h(e,function(){a.D()}):(g.onreadystatechange&&this[r](g.onreadystatechange,g),e.onload&&($(e,jb,e.onload),e.onload=
null),this.D())}else this.S();else this.a=1,this.A=!1,this.d&&this.k()?(k(X,X.e),k(X,X.e),this[r](this.d),this.d=null):this.S()};V.D=function(){this.k()&&(this.pa(),X.e.D());this[A](3);if(this.k()){for(var a=g[L][x](sb),b=a[J]-1;0<=b;b--)g[L][M](a[b]);a=g[L].getElementsByClassName(rb);for(b=a[J]-1;0<=b;b--)a[b][Q][M](a[b])}this.a=6;this[A](4)};V.S=function(){var a=this;e.setTimeout(function(){k(X,X.p);k(X,X.p);if(a.d)X[v][z](a.d,a.t),a.d=null;else X[v][z]();X[v][B]()},0)};
V.ua=function(a){for(;a=a[Q];)if(a==g)return!0;return!1};V.Y=function(a){for(var b=0,c=a[J],d=0;d<c;++d){var p=a[d],m=p[Q],n=p.src,Qb=p.textContent;(8<this.b()&&(!m||n==R&&Qb==R)||!(this.b()||this.ua(p)&&n!=R))&&b++}return b};V.Q=function(){if(4!=this.a)return!1;var a=0;0!=this.r&&(a=this.Y(this.s));return this.r==a?!0:!1};V.Fa=function(){return 6===this.a};Z[K].scriptsAreDone=Z[K].Fa;
Z[K].G=function(){this.R();this.oa();this.n<this.o[J]?(this.n++,this.o[this.n-1][N](e)):this.l?(this.a=4,this.F(),this[A](2),this.Q()&&this.C()):this.C()};Z[K].aa=function(a){for(var b=[],c=a[J],d=0;d<c;++d)b[C](a[D](d));return b};
Z[K].ra=function(){var a=this;if(this.A&&!this.k()){var b=g.createElement(sb);b[u](pb,Lb);g[L].appendChild(b);this.b()&&this.ma();if(f[t])try{var c={configurable:!0,get:function(){return 4<=a.a?$a:db}};f[t](g,tb,c)}catch(d){this.log(sa,d)}if(this.b()&&(g[y].originalDoScroll=g[y].doScroll,g[y].doScroll=function(){throw"psa exception";},f[t]))try{c={configurable:!0,get:function(){}},f[t](g,Ha,c)}catch(p){this.log(ra,p)}}this.la();g.writeln=function(b){a.T(b+ca)};g.write=function(b){a.T(b)};g.open=function(){};
g.close=function(){};g.getElementById=function(b){a.R();b=a.K[N](g,b);return null==b||b[F](a.c)?null:b};!g[P]||8>=a.b()||(g.getElementsByTagName=function(b){try{return g[P](b+ha+a.c+Ga)}catch(c){return a.q[N](g,b)}});h(g,function(b){var c=a.f[N](g,b);b.toLowerCase()==T&&(a.s[C](c),a.r++,b=function(){a.r--;var b=a.s[E](this);-1!=b&&(a.s.splice(b,1),a.Q()&&a.C())},Y.h(c,b),W(c,Va,b));return c})};Z[K].execute=function(){if(2==this.a){var a=0;0!=this.u&&(a=this.Y(this.v));this.u==a&&(h(g,this.f),this.run())}};
Z[K].execute=Z[K][B];Z[K].run=function(){2==this.a&&(this.A&&this[A](1),this.a=3,this.ra(),this.G())};Z[K].run=Z[K].run;V=Z[K];V.xa=function(a){var b=this.f[N](g,Ta);b.innerHTML=ia+a;b[M](b.firstChild);return b};V.Aa=function(a){var b=a[Q];b&&b[M](a)};V.wa=function(a,b){for(var c=this.aa(a),d=c[J],p=b[Q],m=0;m<d;++m){var n=c[m];this.Aa(n);p.insertBefore(n,b)}};
V.sa=function(a){return a.nodeName!=za?!1:a[F](U)?(a=a[O](U),!a||-1!=this.P[E](a)):a[F](ab)?(a=a[O](ab),!a||-1!=this.P[E](wb+a.toLowerCase())):!0};V.Z=function(a,b){if(a.childNodes)for(var c=this.aa(a.childNodes),d=c[J],p=0;p<d;++p){var m=c[p];m.nodeName==za?this.sa(m)&&(b[C](m),m[u](mb,m.type),m[u](U,this.g),m[u](lb,m.src),m[u](vb,R),m[u](this.c,R)):this.Z(m,b)}};V.va=function(a,b){for(var c=a[J],d=0;d<c;++d)this.H(a[d],b+d,!!d)};
V.ta=function(a,b,c){a=this.xa(a);var d=[];this.Z(a,d);c?this.wa(a.childNodes,c):this.log(Aa);this.va(d,b)};V.R=function(){if(this.j!=R){this.log(Xa+this.j);var a=this.j;this.j=R;var b=this.I();this.ta(a,this.n,b)}};V.T=function(a){this.log(Ua+a);this.j+=a};V.pa=function(){var a;g[P]&&(a=g[P](Ca));for(var b=0;b<a[J];b++){var c=a[D](b),d=Nb+c[O](Pa)+Ob;e.eval[N](e,d);typeof e.psaFunc!=Wa?this.log(xa,Error(R)):$(c,jb,e.psaFunc)}};V.Ca=function(a){$(e,ib,a)};Z[K].addBeforeDeferRunFunctions=Z[K].Ca;
Z[K].Ba=function(a){$(e,hb,a)};Z[K].addAfterDeferRunFunctions=Z[K].Ba;Z[K].fireEvent=function(a){this.B=a;this.log(wa+a);a=this.w[a]||[];for(var b=0;b<a[J];++b)this[r](a[b]);a.length=0};Z[K].exec=function(a,b){try{a[N](b||e)}catch(c){this.log(qa,c)}};Z[K].la=function(){var a=this;e[H]?(q(g,function(b,c,d){$(g,b,c,d,a.N)}),q(e,function(b,c,d){$(e,b,c,d,a.L)})):e[w]&&(l(g,function(b,c){$(g,b,c,void 0,a.O)}),l(e,function(b,c){$(e,b,c,void 0,a.M)}))};
Z[K].ka=function(){e[H]?(q(g,this.N),q(e,this.L)):e[w]&&(l(g,this.O),l(e,this.M))};var $=function(a,b,c,d,p){var m=X[v];if(!(6<=m.a)){var n;if(2>m.B&&(b==oa||b==ub||b==gb||b==kb))b=2,n=oa;else if(3>m.B&&(b==bb||b==jb))b=3,n=bb;else if(b==ib)b=1;else if(b==hb)b=4;else{p&&p[N](a,b,c,d);return}m.w[b]||(m.w[b]=[]);m.w[b][C](function(){var b={bubbles:!1,cancelable:!1,eventPhase:2};b.timeStamp=(new Date).getTime();b.type=n;b.target=a!=e?a:g;b.currentTarget=a;c[N](a,b)})}};
Z[K].registerScriptTags=function(a,b){if(!(2<=this.a)){if(a){if(!Pb){a();return}this.l=!1;this.d=a;b&&(this.t=b)}else this.l=!0;this.a=2;for(var c=g[x](T),d=c[J],p=0;p<d;++p){var m=this.o[J]==this.n,n=c[p];n[O](U)==this.g&&(a?n[O](S)<=this.t&&this.H(n,void 0,!m):(n[O](S)<this.t&&this.log(ua+n[O](S),Error(R)),this.H(n,void 0,!m)))}this.na()}};Z[K].registerScriptTags=Z[K][z];Y.h=function(a,b){W(a,bb,b)};X.addOnload=Y.h;V=Z[K];V.X=function(){return-1!=ba.userAgent[E](va)};V.ya=function(){return-1!=ba.userAgent[E](na)};
V.b=function(){var a=/(?:MSIE.(\d+\.\d+))/[r](ba.userAgent);return a&&a[1]?g.documentMode||parseFloat(a[1]):NaN};V.da=function(a){this.g=a};V.ca=function(a){this.c=a};V.k=function(){return this.g==Ib?!0:!1};V.qa=function(){var a=this;h(g,function(b){var c=a.f[N](g,b);b.toLowerCase()==T&&(a.v[C](c),a.u++,b=function(){var b=a.v[E](this);-1!=b&&(a.v.splice(b,1),a.u--,a[B]())},Y.h(c,b),W(c,Va,b));return c})};V.Ea=function(){return Pb};Z[K].isExperimentalMode=Z[K].Ea;
Y.Da=function(){X[v]||(Pb=X.defer_js_experimental,X.e=new Z,X.e.da(Hb),X.e.ca(nb),X.e.ba(),X.p=new Z,X.p.da(Ib),X.p.ca(qb),X.p.ba(),k(X,X.e),X[v].qa(),k(X,X[v]))};Y.Da();X.fa=!1;Y.J=function(){X.fa||X.panelLoader||(X.fa=!0,X[v][z](),X[v][B]())};Y.startDeferJs=Y.J;W(g,oa,Y.J);Y.h(e,Y.J);})();
