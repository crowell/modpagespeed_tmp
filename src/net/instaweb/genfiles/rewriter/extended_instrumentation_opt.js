(function(){var e=window,f=Math,g="round",h="performance";e.pagespeed=e.pagespeed||{};var q=e.pagespeed;
q.getResourceTimingData=function(){if(e[h]&&(e[h].getEntries||e[h].webkitGetEntries)){for(var r=0,s=0,k=0,t=0,l=0,u=0,m=0,v=0,n=0,w=0,p=0,c={},d=e[h].getEntries?e[h].getEntries():e[h].webkitGetEntries(),b=0;b<d.length;b++){var a=d[b].duration;0<a&&(r+=a,++k,s=f.max(s,a));a=d[b].connectEnd-d[b].connectStart;0<a&&(u+=a,++m);a=d[b].domainLookupEnd-d[b].domainLookupStart;0<a&&(t+=a,++l);a=d[b].initiatorType;c[a]?++c[a]:c[a]=1;a=d[b].requestStart-d[b].fetchStart;0<a&&(w+=a,++p);a=d[b].responseStart-d[b].requestStart;
0<a&&(v+=a,++n)}return"&afd="+(k?f[g](r/k):0)+"&nfd="+k+"&mfd="+f[g](s)+"&act="+(m?f[g](u/m):0)+"&nct="+m+"&adt="+(l?f[g](t/l):0)+"&ndt="+l+"&abt="+(p?f[g](w/p):0)+"&nbt="+p+"&attfb="+(n?f[g](v/n):0)+"&nttfb="+n+(c.css?"&rit_css="+c.css:"")+(c.link?"&rit_link="+c.link:"")+(c.script?"&rit_script="+c.script:"")+(c.img?"&rit_img="+c.img:"")}return""};q.getResourceTimingData=q.getResourceTimingData;})();
