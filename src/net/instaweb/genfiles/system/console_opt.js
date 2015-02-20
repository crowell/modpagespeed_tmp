(function(){var f;
function g(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
b&&"undefined"==typeof a.call)return"object";return b}var k="closure_uid_"+(1E9*Math.random()>>>0),l=0;function m(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};function n(a,b){this.b={};this.a=[];this.f=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.e(a)}f=n.prototype;f.g=function(){p(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};function q(a){p(a);return a.a.concat()}f.clear=function(){this.b={};this.f=this.a.length=0};
f.remove=function(a){return r(this.b,a)?(delete this.b[a],this.f--,this.a.length>2*this.f&&p(this),!0):!1};function p(a){if(a.f!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];r(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.f!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],r(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}}f.get=function(a,b){return r(this.b,a)?this.b[a]:b};f.set=function(a,b){r(this.b,a)||(this.f++,this.a.push(a));this.b[a]=b};
f.e=function(a){var b;if(a instanceof n)b=q(a),a=a.g();else{b=[];var c=0,d;for(d in a)b[c++]=d;a=m(a)}for(c=0;c<b.length;c++)this.set(b[c],a[c])};f.forEach=function(a,b){for(var c=q(this),d=0;d<c.length;d++){var e=c[d],h=this.get(e);a.call(b,h,e,this)}};f.clone=function(){return new n(this)};function r(a,b){return Object.prototype.hasOwnProperty.call(a,b)};function t(a){if("function"==typeof a.g)return a.g();if("string"==typeof a)return a.split("");var b=g(a);if("array"==b||"object"==b&&"number"==typeof a.length){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return m(a)};function u(a){this.b=new n;a&&this.e(a)}function v(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+(a[k]||(a[k]=++l)):b.substr(0,1)+a}f=u.prototype;f.add=function(a){this.b.set(v(a),a)};f.e=function(a){a=t(a);for(var b=a.length,c=0;c<b;c++)this.add(a[c])};f.removeAll=function(a){a=t(a);for(var b=a.length,c=0;c<b;c++)this.remove(a[c])};f.remove=function(a){return this.b.remove(v(a))};f.clear=function(){this.b.clear()};f.contains=function(a){a=v(a);return r(this.b.b,a)};f.g=function(){return this.b.g()};
f.clone=function(){return new u(this)};google.load("visualization","1.0",{packages:["corechart"]});function w(a){window.console&&console.error(a)}
function y(){this.c=[];this.n=new u;this.h=this.k=null;this.p={width:900,height:255,colors:["#4ECDC4","#556270","#C7F464"],legend:{position:"bottom"},hAxis:{format:"MMM d, y hh:mma",gridlines:{color:"#F2F2F2"},baselineColor:"#E5E5E5"},vAxis:{format:"#.###%",minValue:0,viewWindowMode:"explicit",viewWindow:{min:0},gridlines:{color:"#F2F2F2"},baselineColor:"#E5E5E5"},chartArea:{left:60,top:20,width:800},pointSize:2}}function z(a){var b={};b.d=new u([a]);b.evaluate=function(b){return b(a)};return b}
function A(a){var b={};b.d=new u;for(var c=0;c<a.length;c++)b.d.e(a[c].d);b.evaluate=function(b){for(var c=0,h=0;h<a.length;h++)c+=a[h].evaluate(b);return c};return b}function B(a,b){var c={};c.d=new u;c.d.e(a.d);c.d.e(b.d);c.evaluate=function(c){var e=b.evaluate(c);return 0==e?0:a.evaluate(c)/e};return c}function C(a,b){return B(a,A([a,b]))}
function D(){var a=new y;E(a,"Resources not loaded because of fetch failures","fetch-failure",B(z("serf_fetch_failure_count"),z("serf_fetch_request_count")));E(a,"Resources not rewritten because domain wasn't authorized","not-authorized",C(z("resource_url_domain_rejections"),z("resource_url_domain_acceptances")));E(a,"Resources not rewritten because of restrictive Cache-Control headers","cache-control",C(z("num_cache_control_not_rewritable_resources"),z("num_cache_control_rewritable_resources")));
var b=A([z("cache_backend_misses"),z("cache_backend_hits")]);E(a,"Cache misses","cache-miss",B(z("cache_backend_misses"),b));E(a,"Cache lookups that were expired","cache-expired",B(z("cache_expirations"),b));E(a,"CSS files not rewritten because of parse errors","css-error",C(z("css_filter_parse_failures"),z("css_filter_blocks_rewritten")));E(a,"JavaScript minification failures","js-error",C(z("javascript_minification_failures"),z("javascript_blocks_minified")));var b=A([z("image_rewrites"),z("image_rewrites_dropped_nosaving_resize"),
z("image_rewrites_dropped_nosaving_noresize")]),c=A([z("image_norewrites_high_resolution"),z("image_rewrites_dropped_decode_failure"),z("image_rewrites_dropped_due_to_load"),z("image_rewrites_dropped_mime_type_unknown"),z("image_rewrites_dropped_server_write_fail")]);E(a,"Image rewrite failures","image-error",C(c,b));b=new Date;F(a,new Date(b-864E5),b);return a}var G=["pagespeed","startConsole"],H=this;G[0]in H||!H.execScript||H.execScript("var "+G[0]);
for(var I;G.length&&(I=G.shift());){var J;if(J=!G.length)J=void 0!==D;J?H[I]=D:H=H[I]?H[I]:H[I]={}}function E(a,b,c,d){var e={};e.title=b;e.o="https://developers.google.com/speed/pagespeed/module/console#"+c;e.value=d;e.q=a.c.length;e.i=null;e.j=null;e.l=null;e.m=null;a.c.push(e);a.n.e(d.d)}function K(a,b,c){var d=pagespeedStatisticsUrl+"?json",d=d+("&start_time="+b.getTime()),d=d+("&end_time="+c.getTime()),d=d+"&granularity=60000&var_titles=";for(b=0;b<a.length;b++)d+=a[b]+",";return d}
function F(a,b,c){var d=new XMLHttpRequest;b=K(a.n.g(),b,c);d.onreadystatechange=function(){if(4==this.readyState)if(200!=this.status||1>this.responseText.length||"{"!=this.responseText[0])w("XHR request failed.");else{var b=JSON.parse(this.responseText);L(a,b)}};d.open("GET",b);d.send()}
function L(a,b){a.k=b.variables;a.h=b.timestamps;M(a.h,a.k);for(var c=0;c<a.c.length;c++){for(var d=[],e=0;e<a.h.length;e++)d.push(a.c[c].value.evaluate(function(a){return function(b){if(b in a)return a[b][e];w("JSON data missing required variable.");return 0}}(a.k)));a.c[c].i=d[d.length-1];a.c[c].j=a.c[c].i;a.c[c].l=O(a.c[c].title,a.h,d)}a.c.sort(function(a,b){return b.j-a.j});for(c=0;c<a.c.length;c++)P(a,a.c[c])}
function M(a,b){for(var c in b)a.length!=b[c].length&&w("JSON response is malformed. ("+a.length+" != "+b[c].length+")")}function O(a,b,c){var d=new google.visualization.DataTable;d.addColumn("datetime","Time");d.addColumn("number",a);for(var e=0;e<b.length;e++)d.addRow([new Date(b[e]),c[e]]);0==d.getNumberOfRows()&&w("Data failed to load for graph "+a);return d}
function P(a,b){var c=google.visualization.LineChart,d=b.title,e=b.i,h=b.o,N=b.q,x=document.createElement("div");x.setAttribute("class","pagespeed-widgets");x.appendChild(Q(d,e,h,N));d=document.createElement("div");d.setAttribute("class","pagespeed-graph");x.appendChild(d);document.getElementById("pagespeed-graphs-container").appendChild(x);b.m=new c(d);b.m.draw(b.l,a.p)}
function Q(a,b,c,d){var e=document.createElement("div");e.setAttribute("class","pagespeed-widgets-topbar");var h=document.createElement("span");h.setAttribute("class","pagespeed-title");h.setAttribute("id","pagespeed-title"+d);h.appendChild(document.createTextNode(a+": "+(100*b).toFixed(2)+"% ("));a=document.createElement("a");a.setAttribute("href",c);a.appendChild(document.createTextNode("doc"));h.appendChild(a);h.appendChild(document.createTextNode(")"));e.appendChild(h);return e};})();
