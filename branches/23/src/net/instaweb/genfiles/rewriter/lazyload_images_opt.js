(function(){var d=null,e=window,f=document,g="documentElement",h="scrollTop",k="prototype",l="body",m="getAttribute",n="",p="1",q="data",r="img",s="load",t="number",u="on",v="onload",w="pagespeed_lazy_position",x="pagespeed_lazy_replaced_functions",y="pagespeed_lazy_src",z="position",A="relative",B="scroll",C="src";e.pagespeed=e.pagespeed||{};var D=e.pagespeed,E=function(a){this.a=[];this.i=0;this.b=!1;this.o=a;this.c=d;this.g=0;this.h=200;this.f=!1};
E[k].s=function(){var a=0;typeof e.pageYOffset==t?a=e.pageYOffset:f[l]&&f[l][h]?a=f[l][h]:f[g]&&f[g][h]&&(a=f[g][h]);var b=e.innerHeight||f[g].clientHeight||f[l].clientHeight;return{top:a,bottom:a+b,height:b}};E[k].n=function(a){var b=a[m](w);if(b)return parseInt(b,0);var b=a.offsetTop,c=a.offsetParent;c&&(b+=this.n(c));b=Math.max(b,0);a.setAttribute(w,b);return b};E[k].r=function(a){var b=this.n(a);return{top:b,bottom:b+a.offsetHeight}};
E[k].q=function(a,b){if(a.currentStyle)return a.currentStyle[b];if(f.defaultView&&f.defaultView.getComputedStyle){var c=f.defaultView.getComputedStyle(a,d);if(c)return c.getPropertyValue(b)}return a.style&&a.style[b]?a.style[b]:n};E[k].p=function(a){if(this.q(a,z)==A)return!0;if(!this.f&&(0==a.offsetHeight||0==a.offsetWidth))return!1;var b=this.s(),c=a.getBoundingClientRect();c?(a=c.top-b.height,b=c.bottom):(c=this.r(a),a=c.top-b.bottom,b=c.bottom-b.top);return a<=this.i&&0<=b+this.i};
E[k].m=function(a){this.l(a);var b=this;e.setTimeout(function(){var c=a[m](y);if(c!=d)if((b.b||b.p(a))&&a.src.indexOf(-1!=b.o)){var j=a.parentNode,F=a.nextSibling;j&&j.removeChild(a);a.getAttribute=a.j;a.removeAttribute(v);a.removeAttribute(y);a.removeAttribute(x);a.src=c;j&&j.insertBefore(a,F)}else b.a.push(a)},0)};E[k].loadIfVisible=E[k].m;E[k].u=function(){this.b=!0;this.d()};E[k].loadAllImages=E[k].u;E[k].d=function(){var a=this.a,b=a.length;this.a=[];for(var c=0;c<b;++c)this.m(a[c])};
E[k].e=function(a,b){return a.a?a.a(b)!=d:a[m](b)!=d};E[k].v=function(){for(var a=f.getElementsByTagName(r),b=0;b<a.length;++b){var c=a[b];this.e(c,y)&&this.l(c)}};E[k].overrideAttributeFunctions=E[k].v;E[k].l=function(a){var b=this;this.e(a,x)||(a.j=a[m],a.getAttribute=function(a){a.toLowerCase()==C&&b.e(this,y)&&(a=y);return this.j(a)},a.setAttribute(x,p))};
D.k=function(a,b,c){if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent)a.attachEvent(u+b,c);else{var j=a[u+b];a[u+b]=function(){c.call(this);j&&j.call(this)}}};D.t=function(a,b){var c=new E(b);D.lazyLoadImages=c;0!=b.indexOf(q)&&((new Image).src=b);D.k(e,s,function(){c.f=!0;e.setTimeout(function(){c.b=a;c.d()},200)});a||D.k(e,B,function(){if(!c.c){var a=c.h;(new Date).getTime()-c.g>c.h&&(a=0);c.c=e.setTimeout(function(){c.g=(new Date).getTime();c.d();c.c=d},a)}})};
D.lazyLoadInit=D.t;})();