(function(){var d=encodeURIComponent,e=window,g=document,h="documentElement",j="length",k="prototype",l="body",m="&",n="&ci=",p=",",q="?",r="img",s="input",t="load",u="on",v="pagespeed_url_hash",w="url=";e.pagespeed=e.pagespeed||{};var x=e.pagespeed,y=function(a,b){this.c=a;this.d=b;this.b=this.e();this.a={}};y[k].e=function(){return{height:e.innerHeight||g[h].clientHeight||g[l].clientHeight,width:e.innerWidth||g[h].clientWidth||g[l].clientWidth}};
y[k].f=function(a){a=a.getBoundingClientRect();return{top:a.top+(void 0!==e.pageYOffset?e.pageYOffset:(g[h]||g[l].parentNode||g[l]).scrollTop),left:a.left+(void 0!==e.pageXOffset?e.pageXOffset:(g[h]||g[l].parentNode||g[l]).scrollLeft)}};y[k].g=function(a){if(0>=a.offsetWidth&&0>=a.offsetHeight)return!1;a=this.f(a);var b=JSON.stringify(a);if(this.a.hasOwnProperty(b))return!1;this.a[b]=!0;return a.top<=this.b.height&&a.left<=this.b.width};
y[k].i=function(){for(var a=[r,s],b={},c=0;c<a[j];++c)for(var f=g.getElementsByTagName(a[c]),i=0;i<f[j];++i)f[i].hasAttribute(v)&&(f[i].getBoundingClientRect&&this.g(f[i]))&&(b[f[i].getAttribute(v)]=!0);b=Object.keys(b);if(0!=b[j]){a=this.c;a+=-1==a.indexOf(q)?q:m;a+=w+d(this.d);a+=n+d(b[0]);for(c=1;c<b[j]&&2E3>a[j];++c)a+=p+d(b[c]);x.criticalImagesBeaconUrl=a;(new Image).src=a}};
x.h=function(a,b,c){if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent)a.attachEvent(u+b,c);else{var f=a[u+b];a[u+b]=function(){c.call(this);f&&f.call(this)}}};x.j=function(a,b){var c=new y(a,b);x.h(e,t,function(){e.setTimeout(function(){c.i()},0)})};x.criticalImagesBeaconInit=x.j;})();
