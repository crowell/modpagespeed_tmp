(function(){var e=window,f=document,g="push",h="createElement",i="addEventListener",j="setAttribute",l="attachEvent",m="documentElement",n="toString",o="length",p="prototype",q="localStorage",r="call",s="getAttribute",t="querySelectorAll",v="parentNode",x="",y="\n",z='");',A="*",B=":not([psa_not_processed])",C="<div>_</div>",D='=document.getElementById("',E="Add to queue str: ",F="Add to queue url: ",G="DOMContentLoaded",H="Evaluated: ",I="Exception while evaluating.",J="Exception while overriding document.readyState.",
aa="Executed: ",ba="Firefox",ca="PSA ERROR: ",K="SCRIPT",da="Unable to insert nodes, no context element found",ea="[psa_not_processed]",fa="application/ecmascript",ga="application/javascript",ha="application/x-ecmascript",ia="application/x-javascript",ja="complete",ka="data:text/javascript,",la="div",ma="domready: ",na="dw: ",oa="error",pa="executing domready: ",qa="executing pageload: ",ra="handle_dw: ",L="id",M="language",N="load",sa="loaded",ta="loading",O="on",ua="onDOMContentLoaded",va="onload",
wa="onload: ",xa="onreadystatechange",P="orig_src",ya="orig_type",za="psa_dw_target",Q="psa_not_processed",Aa="readyState",R="readystatechange",S="script",Ba="span",T="src",Ca="text/",Da="text/ecmascript",U="text/javascript",Ea="text/javascript1.0",Fa="text/javascript1.1",Ga="text/javascript1.2",Ha="text/javascript1.3",Ia="text/javascript1.4",Ja="text/javascript1.5",Ka="text/jscript",La="text/livescript",V="text/psajs",Ma="text/x-ecmascript",Na="text/x-javascript",Oa="true",W="type",Pa="var ",X;
e.pagespeed=e.pagespeed||{};var Y=e.pagespeed,Z=function(){this.h=[];this.f=[];this.g=0;this.a=null;this.e=x;this.j=[];this.i=[];this.o=[];this.n=[];this.t=[fa,ga,ha,ia,Da,U,Ea,Fa,Ga,Ha,Ia,Ja,Ka,La,Ma,Na];this.r=f.getElementById;this.s=f.getElementsByTagName;this.d=0},$=!1;X=Z[p];X.log=function(a,b){this.f&&(this.f[g](x+a),b&&(this.f[g](b),"undefined"!=typeof console&&"undefined"!=typeof console.log&&console.log(ca+a+b.message)))};X.u=function(a,b){this.h.splice(b?b:this.h[o],0,a)};
X.A=function(a){var b=f[h](S);b.text=a;b[j](W,U);this.a[v].insertBefore(b,this.a)};X.M=function(){for(var a=f.getElementsByTagName(A),b=x,c=0;c<a[o];c++)if(a[c].hasAttribute(L)){var d=a[c][s](L);d&&-1==d.search(/[-:.]/)&&-1==d.search(/^[0-9]/)&&e[d]&&e[d].tagName&&(b+=Pa+d+D+d+z)}b&&this.A(b)};X.G=function(a,b){var c=a[s](P)||a[s](T);c&&this.q(c,a,b);if(!c||!$)(c=a.innerHTML||a.textContent||a.data)&&this.H(c,a,b)};
X.H=function(a,b,c){if(this.L())this.q(ka+encodeURIComponent(a),b,c);else{this.f[g](E+a);var d=this;this.u(function(){d.a=b;d.l(b);try{d.A(a)}catch(c){d.log(I,c)}d.log(H+a);d.m()},c)}};Z[p].addStr=Z[p].H;
Z[p].q=function(a,b,c){this.f[g](F+a);var d=this;this.u(function(){d.a=b;d.l(b);var c=f[h](S);c[j](W,U);if($){var k=b.innerHTML||b.textContent||b.data;k&&c.appendChild(f.createTextNode(k))}var u=function(){d.log(aa+a);d.m()};Y.v(c,u);Y.k(c,oa,u);9>d.b()&&Y.k(c,R,function(){if(c.readyState==ja||c.readyState==sa)c.onreadystatechange=null,u()});c[j](T,a);d.a[v].insertBefore(c,d.a)},c)};Z[p].addUrl=Z[p].q;X=Z[p];
X.l=function(a){if($&&f[t]&&!(8>=this.b()))for(var b=f[t](ea),c=0;c<b[o];c++){var d=b.item(c);if(d==a)break;d[s](W)!=V&&d.removeAttribute(Q)}};X.N=function(){if($)for(var a=this.s[r](f,A),b=0;b<a[o];b++)a.item(b)[j](Q,x)};
X.Q=function(){this.l();this.b()&&f[m].originalDoScroll&&(f[m].doScroll=f[m].originalDoScroll);Object.defineProperty&&delete f.readyState;$&&(f.getElementById=this.r,f[t]&&!(8>=this.b())&&(f.getElementsByTagName=this.s));f.a?(f.addEventListener=f.a,e.addEventListener=e.a):f.b&&(f.attachEvent=f.b,e.attachEvent=e.b);this.J();this.K();this.d=3;this.I()};X.m=function(){this.w();this.g<this.h[o]?(this.g++,this.h[this.g-1][r](e)):this.Q()};
X.F=function(a){for(var b=[],c=a[o],d=0;d<c;++d)b[g](a.item(d));return b};X.R=function(){this.N();if(Object.defineProperty)try{Object.defineProperty(f,Aa,{configurable:!0,get:function(){return ta}})}catch(a){this.log(J,a)}this.b()&&(f[m].originalDoScroll=f[m].doScroll,f[m].doScroll=function(){throw"psa exception";});this.B(f);this.B(e);var b=f[h](Ba);b[j](za,Oa);f.body.appendChild(b);this.a=b;this.b()&&this.M()};X.aa=function(){2<=this.d||(this.P(),this.d=2,this.R(),this.m())};Z[p].run=Z[p].aa;
X=Z[p];X.U=function(a){var b=f[h](la);b.innerHTML=C+a;b.removeChild(b.firstChild);return b};X.W=function(a){var b=a[v];b&&b.removeChild(a)};X.T=function(a,b){for(var c=this.F(a),d=c[o],w=b[v],k=0;k<d;++k){var u=c[k];this.W(u);w.insertBefore(u,b)}};X.V=function(a){return a.nodeName!=K?!1:a.hasAttribute(W)?(a=a[s](W),!a||-1!=this.t.indexOf(a)):a.hasAttribute(M)?(a=a[s](M),!a||-1!=this.t.indexOf(Ca+a.toLowerCase())):!0};
X.D=function(a,b){if(a.childNodes)for(var c=this.F(a.childNodes),d=c[o],w=0;w<d;++w){var k=c[w];k.nodeName==K?this.V(k)&&(b[g](k),$&&k[j](Q,x),k[j](ya,k.type),k[j](W,V),k[j](P,k.src),k[j](T,x)):this.D(k,b)}};X.S=function(a,b){for(var c=a[o],d=0;d<c;++d)this.G(a[d],b+d)};X.O=function(a,b,c){var a=this.U(a),d=[];this.D(a,d);c?this.T(a.childNodes,c):this.log(da);this.S(d,b)};X.w=function(){if(this.e!=x){this.log(ra+this.e);var a=this.e;this.e=x;this.O(a,this.g,this.a)}};
X.C=function(a){this.log(na+a);this.e+=a};X.z=function(a,b){this.log(ma+b[n]());this.j[g](function(){b[r](a)})};X.p=function(a,b){this.log(wa+b[n]());3==this.d?b[r](a):this.i[g](function(){b[r](a)})};Z[p].addOnloadListeners=Z[p].p;Z[p].Z=function(a){this.o[g](a)};Z[p].addBeforeDeferRunFunctions=Z[p].Z;Z[p].Y=function(a){this.n[g](a)};Z[p].addAfterDeferRunFunctions=Z[p].Y;X=Z[p];X.J=function(){for(var a=0;a<this.j[o];a++)this.log(pa+this.j[a][n]()),this.j[a][r](e);if(f.onreadystatechange)f.onreadystatechange()};
X.K=function(){for(var a=0;a<this.i[o];a++)this.log(qa+this.i[a][n]()),this.i[a][r]()};X.P=function(){for(var a=0;a<this.o[o];a++)this.o[a][r](e)};X.I=function(){for(var a=0;a<this.n[o];a++)this.n[a][r](e)};X.B=function(a){a[i]&&!a.a?(a.a=a[i],a.addEventListener=function(b,c,d){b==G||b==R?Y.c.z(a,c):b==N?Y.c.p(a,c):a.a(b,c,d)}):a[l]&&!a.b&&(a.b=a[l],a.attachEvent=function(b,c){b==ua||b==xa?Y.c.z(a,c):b==va?Y.c.p(a,c):a.b(b,c)})};
X.$=function(){if(!(1<=this.d)){this.d=1;for(var a=f.getElementsByTagName(S),b=a[o],c=0;c<b;++c){var d=a[c];d[s](W)==V&&this.G(d)}}};Z[p].registerScriptTags=Z[p].$;Y.v=function(a,b){Y.k(a,N,b)};Y.addOnload=Y.v;Y.k=function(a,b,c){if(a[i])a[i](b,c,!1);else if(a[l])a[l](O+b,c);else{var d=a[O+b];a[O+b]=function(){c[r](this);d&&d[r](this)}}};Y.addHandler=Y.k;Y.outerHTML=function(a){return a.outerHTML||(new XMLSerializer).serializeToString(a)};Z[p].L=function(){return-1!=navigator.userAgent.indexOf(ba)};
Z[p].b=function(){var a=/(?:MSIE.(\d+\.\d+))/.exec(navigator.userAgent);return a&&a[1]?f.documentMode||parseFloat(a[1]):NaN};
Y.X=function(){if(!Y.c&&(e[q]&&($=e[q].defer_js_experimental),Y.c=new Z,Y.deferJs=Y.c,f.writeln=function(a){Y.c.C(a+y)},f.write=function(a){Y.c.C(a)},!e[q].psa_disable_override_doc_open&&!e[q].psa_disable_override_doc_open_debug&&(f.open=function(){},f.close=function(){}),$))f.getElementById=function(a){Y.c.w();return Y.c.r[r](f,a)},f[t]&&!(8>=Y.c.b())&&(f.getElementsByTagName=function(a){return f[t](a+B)})};Y.deferInit=Y.X;})();
