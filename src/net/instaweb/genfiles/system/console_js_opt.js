(function(){var f=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},h="closure_uid_"+(1E9*Math.random()>>>0),l=0;var m="StopIteration"in this?this.StopIteration:Error("StopIteration"),n=function(){};n.prototype.a=function(){throw m;};n.prototype.d=function(){return this};var p=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};var r=function(a,b){this.a={};this.b=[];this.f=this.e=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){if(a instanceof r)s(a),d=a.b.concat(),c=a.g();else{var c=[],e=0;for(d in a)c[e++]=d;d=c;c=p(a)}for(e=0;e<d.length;e++)this.set(d[e],c[e])}};r.prototype.g=function(){s(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.a[this.b[b]]);return a};
var s=function(a){if(a.e!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.a,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.e!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}};r.prototype.set=function(a,b){Object.prototype.hasOwnProperty.call(this.a,a)||(this.e++,this.b.push(a),this.f++);this.a[a]=b};
r.prototype.d=function(a){s(this);var b=0,c=this.b,d=this.a,e=this.f,g=this,k=new n;k.a=function(){for(;;){if(e!=g.f)throw Error("The map has changed since the iterator was created");if(b>=c.length)throw m;var k=c[b++];return a?k:d[k]}};return k};var t=function(a){if("function"==typeof a.g)return a.g();if("string"==typeof a)return a.split("");var b=f(a);if("array"==b||"object"==b&&"number"==typeof a.length){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return p(a)};var v=function(a){this.a=new r;a&&u(this,a)},w=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+(a[h]||(a[h]=++l)):b.substr(0,1)+a},u=function(a,b){for(var c=t(b),d=c.length,e=0;e<d;e++){var g=c[e];a.a.set(w(g),g)}};v.prototype.g=function(){return this.a.g()};v.prototype.d=function(){return this.a.d(!1)};google.load("visualization","1.0",{packages:["corechart"]});
var x=function(a){window.console&&console.error(a)},y=function(){this.a=[];this.f=new v;this.d=this.e=null;this.k={width:900,height:255,colors:["#4ECDC4","#556270","#C7F464"],legend:{position:"bottom"},hAxis:{format:"MMM d, y hh:mma",gridlines:{color:"#F2F2F2"},baselineColor:"#E5E5E5"},vAxis:{format:"#.###%",minValue:0,viewWindowMode:"explicit",viewWindow:{min:0},gridlines:{color:"#F2F2F2"},baselineColor:"#E5E5E5"},chartArea:{left:60,top:20,width:800},pointSize:2}},z=function(a){var b={};b.c=new v([a]);
b.evaluate=function(b){return b(a)};return b},A=function(a){var b={};b.c=new v;for(var c=0;c<a.length;c++)u(b.c,a[c].c);b.evaluate=function(b){for(var c=0,g=0;g<a.length;g++)c+=a[g].evaluate(b);return c};return b},B=function(a,b){var c={};c.c=new v;u(c.c,a.c);u(c.c,b.c);c.evaluate=function(c){var e=b.evaluate(c);return 0==e?0:a.evaluate(c)/e};return c},C=function(a,b){return B(a,A([a,b]))},D=function(a,b,c,d){var e={};e.title=b;e.l="https://developers.google.com/speed/pagespeed/module/console#"+c;
e.value=d;e.m=a.a.length;e.h=null;e.priority=null;e.i=null;e.j=null;a.a.push(e);u(a.f,d.c)},E=function(a,b,c){var d=pagespeedStatisticsUrl+"?json",d=d+("&start_time="+b.getTime()),d=d+("&end_time="+c.getTime()),d=d+"&granularity=60000&var_titles=";for(b=0;b<a.length;b++)d+=a[b]+",";return d},G=function(a,b,c){var d=new XMLHttpRequest;b=E(a.f.g(),b,c);d.onreadystatechange=function(){if(4==this.readyState)if(200!=this.status||1>this.responseText.length||"{"!=this.responseText[0])x("XHR request failed.");
else{var b=JSON.parse(this.responseText);F(a,b)}};d.open("GET",b);d.send()},F=function(a,b){a.e=b.variables;a.d=b.timestamps;H(a.d,a.e);for(var c=0;c<a.a.length;c++){for(var d=[],e=0;e<a.d.length;e++)d.push(a.a[c].value.evaluate(function(a){return function(b){if(b in a)return a[b][e];x("JSON data missing required variable.")}}(a.e)));a.a[c].h=d[d.length-1];a.a[c].priority=a.a[c].h;a.a[c].i=I(a.a[c].title,a.d,d)}a.a.sort(function(a,b){return b.priority-a.priority});for(c=0;c<a.a.length;c++)J(a,a.a[c])},
H=function(a,b){for(var c in b)a.length!=b[c].length&&x("JSON response is malformed. ("+a.length+" != "+b[c].length+")")},I=function(a,b,c){var d=new google.visualization.DataTable;d.addColumn("datetime","Time");d.addColumn("number",a);for(var e=0;e<b.length;e++)d.addRow([new Date(b[e]),c[e]]);0==d.getNumberOfRows()&&x("Data failed to load for graph "+a);return d},J=function(a,b){var c=google.visualization.LineChart,d=b.title,e=b.h,g=b.l,k=b.m,q=document.createElement("div");q.setAttribute("class",
"pagespeed-widgets");q.appendChild(K(d,e,g,k));d=document.createElement("div");d.setAttribute("class","pagespeed-graph");q.appendChild(d);document.getElementById("pagespeed-graphs-container").appendChild(q);b.j=new c(d);b.j.draw(b.i,a.k)},K=function(a,b,c,d){var e=document.createElement("div");e.setAttribute("class","pagespeed-widgets-topbar");var g=document.createElement("span");g.setAttribute("class","pagespeed-title");g.setAttribute("id","pagespeed-title"+d);g.appendChild(document.createTextNode(a+
": "+(100*b).toFixed(2)+"% ("));a=document.createElement("a");a.setAttribute("href",c);a.appendChild(document.createTextNode("doc"));g.appendChild(a);g.appendChild(document.createTextNode(")"));e.appendChild(g);return e};google.setOnLoadCallback(function(){var a=new y;D(a,"Resources not loaded because of fetch failures","fetch-failure",B(z("serf_fetch_failure_count"),z("serf_fetch_request_count")));D(a,"Resources not rewritten because domain wasn't authorized","not-authorized",C(z("resource_url_domain_rejections"),z("resource_url_domain_acceptances")));D(a,"Resources not rewritten because of restrictive Cache-Control headers","cache-control",C(z("num_cache_control_not_rewritable_resources"),z("num_cache_control_rewritable_resources")));
var b=A([z("cache_backend_misses"),z("cache_backend_hits")]);D(a,"Cache misses","cache-miss",B(z("cache_backend_misses"),b));D(a,"Cache lookups that were expired","cache-expired",B(z("cache_expirations"),b));D(a,"CSS files not rewritten because of parse errors","css-error",C(z("css_filter_parse_failures"),z("css_filter_blocks_rewritten")));D(a,"JavaScript minification failures","js-error",C(z("javascript_minification_failures"),z("javascript_blocks_minified")));var b=A([z("image_rewrites"),z("image_rewrites_dropped_nosaving_resize"),
z("image_rewrites_dropped_nosaving_noresize")]),c=A([z("image_norewrites_high_resolution"),z("image_rewrites_dropped_decode_failure"),z("image_rewrites_dropped_due_to_load"),z("image_rewrites_dropped_mime_type_unknown"),z("image_rewrites_dropped_server_write_fail")]);D(a,"Image rewrite failures","image-error",C(c,b));b=new Date;G(a,new Date(b-864E5),b);return a});})();
