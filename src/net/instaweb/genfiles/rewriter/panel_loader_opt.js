(function(){var d=window,f=document,k="replace",l="insertBefore",n="firstChild",p="deferJs",r="childNodes",t="documentElement",u="time",x="size",y="style",z="pagespeed",A="push",E="length",F="prototype",G="parentNode",H="",I="\nSIZE:\n",J=" ",K='">',L="#",M="$",N=",",aa=".",ba="/",ca="1",da="10px",ea="</span>",fa="</table>",ga='<span title="',ha="<table>",ia="Arial",ja="GooglePanel begin ",O="GooglePanel end ",ka="HEAD",la="KB;",ma="Microsoft Internet Explorer",na="TABLE",oa="TBODY",pa="TIME:\n",qa="_sz.",P=
"cdl",ra="contiguous",Q="dashboard_area",R="div",sa="dont_bind",ta="gray",ua="images",va="img",wa="instance_html",xa="ms; ",S="ncl",T="pagespeed_high_res_src",ya="priority_psa_not_processed",za="psa_not_processed",Aa="tbody",Ba="white",Ca="xpath";function U(a){if(!a)throw"CHECK failed";}function W(a,b,c){U(a[G]==b[G]);for(var g=[];a!=b.nextSibling;a=a.nextSibling)8==a.nodeType&&RegExp(O+c+M).test(a.data)?g[A](a):a.tagName&&a[n]&&(g=g.concat(W(a[n],a.lastChild,c)));return g}
function X(a,b,c){for(var g in c)if(c.hasOwnProperty(g)&&g!=Ca&&g!=sa&&g!=wa&&g!=ua&&g!=ra){var q=c[g],Da=W(a,b,g);U(!q[E]||!q[0].contiguous);for(var B=0,V=0;B<q[E];B++){0<B&&!q[B].contiguous&&V++;var m=Da[V],s=q[B],e=g;if(s&&!s.dont_bind){if(!m){U(s.xpath);i:{for(var m=e,e=s.xpath.split(ba),h=/(?:.*\[@id=")(.*)(?:"\])/,v=/(?:.*\[)(\d+)(?:\])/,w=f.body,C=2;C<e[E];++C){var D=h.exec(e[C]);if(D)w=f.getElementById(D[1]),U(w);else if(D=v.exec(e[C])){if(C==e[E]-1){e=w;h=Number(D[1]);U(e&&0<h);h=e.children[h-
1]||null;e[l](f.createComment(ja+m),h);m=f.createComment(O+m);e[l](m,h);break i}w=w.children[D[1]-1];U(w)}else U(0)}m=void 0}U(m)}if(s.instance_html){h=m[G].tagName;v=s.instance_html;h==ka&&(h=R);e=void 0;navigator.appName!=ma||h!=na&&h!=oa?(e=f.createElement(h),e.innerHTML=v):(e=f.createElement(R),e.innerHTML=ha+v+fa,e=e.getElementsByTagName(Aa)[0]);for(h=f.createDocumentFragment();0<e[r][E];)e[r][0].tagName&&(e.setAttribute(za,H),e.setAttribute(ya,H)),h.appendChild(e[r][0]);e=h;h=e[n];v=e.lastChild;
m[G][l](e,m);X(h,v,s)}else X(m[G],m[G],s)}}}}function Y(){}Y[F].a=function(a){var b=f[t];X(b[n],b.lastChild,a);b=f[t].getElementsByTagName(va);a=[];for(var c=0;c<b[E];c++){var g=b[c];g.hasAttribute(T)&&a[A](g)}b={};if(a)for(c=0;c<a[E];c++){var g=a[c],q=g.getAttribute(T);q&&(void 0==b[q]&&(b[q]=[]),b[q][A](g))}return b};d.pagespeed=d[z]||{};var Z=d[z],$=function(){this.j=!1;this.d=null;this.h={};this.i=!1;this.a={};this.e=new Y;this.g=0;this.b={time:{},size:{}};this.c=0;this.l=!1;this.k(P,0)};
$[F].f=function(){if(this.i&&this.j&&this.state!=S){this.e.a(this.h);for(var a in this.a)if(this.a.hasOwnProperty(a))for(var b=this.a[a],c=0;c<b[E];++c)b[c].dont_bind=!1;this.e.a(this.a);this.k(S);(a=d.location.hash)&&a[0]==L&&f.getElementById(a.slice(1))&&d.location[k](a);d[z]&&d[z][p]&&(d[z][p].registerScriptTags(),setTimeout(function(){d[z][p].run()},1))}};$[F].loadData=$[F].f;$[F].o=function(a){return a==P};
$[F].t=function(){var a=H,b;for(b in this.b[u])a+=b+aa+this.b[u][b]+N;for(b in this.b[x])a+=b+qa+this.b[x][b]+N;return a};$[F].getCsiTimingsString=$[F].t;
$[F].p=function(){var a=new Date,b=f.getElementById(Q)||d.dashboard_area;if(this.l||d.localStorage&&d.localStorage.psa_debug==ca){b||(b=f.createElement(R),b.id=Q,b[y].color=ta,b[y].fontSize=da,b[y].a=ia,b[y].backgroundColor=Ba,f.body[l](b,f.body[r][0]));var c=pa+JSON.stringify(this.b[u])[k](/["{}]/g,H)[k](/,/g,J),c=c+(I+JSON.stringify(this.b[x])[k](/["{}]/g,H)[k](/,/g,J));b.innerHTML=ga+c+K+this.g+xa+this.c.toFixed()+la+a.toGMTString()+ea}};
$[F].k=function(a,b){this.state=a;var c=new Date-this.A;this.n(a,c,b);this.o(a)&&(this.c+=b?b/1024:0,this.g=c);this.p()};$[F].r=function(){if(d[z]&&d[z][p]){var a=this;d[z][p].registerScriptTags(function(){a.m()},Z.lastScriptIndexBeforePanelStub);d[z][p].run()}};$[F].w=function(){this.l=!0};$[F].setRequestFromInternalIp=$[F].w;$[F].n=function(a,b,c){this.b[u][a]=b;c&&(this.b[x][a]=c)};$[F].u=function(a){for(var b=0;b<a[E];b++)f.cookie=a[b]};$[F].loadCookies=$[F].u;
$[F].v=function(a){if(this.state!=S)for(var b in a)a.hasOwnProperty(b)&&(this.a[b]=this.a[b]||[],this.a[b][A](a[b]),0<W(f[t],f[t],b)[E]?(this.e.a(this.a),this.a[b].pop(),this.a[b][A]({})):a[b].dont_bind=!0)};$[F].loadNonCacheableObject=$[F].v;$[F].m=function(){this.j=!0;this.f()};$[F].criticalScriptsDone=$[F].m;$[F].q=function(a,b){b?this.d=a:(this.d&&(a=this.d),this.state!=S&&(this.h=a,this.i=!0,this.f()))};$[F].bufferNonCriticalData=$[F].q;
Z.s=function(){if(!Z.panelLoader){var a=new $;Z.panelLoader=a;a.r()}};Z.panelLoaderInit=Z.s;})();
