(function(){var n,p=this;
function aa(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
b&&"undefined"==typeof a.call)return"object";return b}function r(a){return"string"==typeof a}function u(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ba(a,b,c){return a.call.apply(a.bind,arguments)}function ca(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function v(a,b,c){v=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ba:ca;return v.apply(null,arguments)}function w(a,b){var c=a.split("."),d=p;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b};var da=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function x(a,b){return-1!=a.toLowerCase().indexOf(b.toLowerCase())}function y(a,b){return a<b?-1:a>b?1:0};var z;a:{var ea=p.navigator;if(ea){var fa=ea.userAgent;if(fa){z=fa;break a}}z=""};var A=Array.prototype,ga=A.indexOf?function(a,b,c){return A.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(r(a))return r(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ha=A.filter?function(a,b,c){return A.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],g=0,f=r(a)?a.split(""):a,k=0;k<d;k++)if(k in f){var h=f[k];b.call(c,h,k,a)&&(e[g++]=h)}return e};function ia(a){return A.concat.apply(A,arguments)}
function ja(a){return A.concat.apply(A,arguments)};function ka(a){if(a.classList)return a.classList;a=a.className;return r(a)&&a.match(/\S+/g)||[]}function B(a,b){var c;a.classList?c=a.classList.contains(b):(c=ka(a),c=0<=ga(c,b));return c}function C(a,b){a.classList?a.classList.add(b):B(a,b)||(a.className+=0<a.className.length?" "+b:b)}function la(a,b){a.classList?a.classList.remove(b):B(a,b)&&(a.className=ha(ka(a),function(a){return a!=b}).join(" "))}function D(a,b){B(a,b)?la(a,b):C(a,b)};var ma=-1!=z.indexOf("Opera")||-1!=z.indexOf("OPR"),E=-1!=z.indexOf("Trident")||-1!=z.indexOf("MSIE"),F=-1!=z.indexOf("Gecko")&&!x(z,"WebKit")&&!(-1!=z.indexOf("Trident")||-1!=z.indexOf("MSIE")),na=x(z,"WebKit");function oa(){var a=p.document;return a?a.documentMode:void 0}
var pa=function(){var a="",b;if(ma&&p.opera)return a=p.opera.version,"function"==aa(a)?a():a;F?b=/rv\:([^\);]+)(\)|;)/:E?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:na&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(z))?a[1]:"");return E&&(b=oa(),b>parseFloat(a))?String(b):a}(),qa={};
function ra(a){if(!qa[a]){for(var b=0,c=da(String(pa)).split("."),d=da(String(a)).split("."),e=Math.max(c.length,d.length),g=0;0==b&&g<e;g++){var f=c[g]||"",k=d[g]||"",h=RegExp("(\\d*)(\\D*)","g"),l=RegExp("(\\d*)(\\D*)","g");do{var m=h.exec(f)||["","",""],q=l.exec(k)||["","",""];if(0==m[0].length&&0==q[0].length)break;b=y(0==m[1].length?0:parseInt(m[1],10),0==q[1].length?0:parseInt(q[1],10))||y(0==m[2].length,0==q[2].length)||y(m[2],q[2])}while(0==b)}qa[a]=0<=b}}
var sa=p.document,ta=sa&&E?oa()||("CSS1Compat"==sa.compatMode?parseInt(pa,10):5):void 0;var G;if(!(G=!F&&!E)){var ua;if(ua=E)ua=E&&9<=ta;G=ua}G||F&&ra("1.9.1");E&&ra("9");function va(a,b,c){var d=0,e=0,g=0;if(0==b)g=e=d=c;else{var f=Math.floor(a/60),k=a/60-f;a=c*(1-b);var h=c*(1-b*k);b=c*(1-b*(1-k));switch(f){case 1:d=h;e=c;g=a;break;case 2:d=a;e=c;g=b;break;case 3:d=a;e=h;g=c;break;case 4:d=b;e=a;g=c;break;case 5:d=c;e=a;g=h;break;case 6:case 0:d=c,e=b,g=a}}return[Math.floor(d),Math.floor(e),Math.floor(g)]}
function wa(a,b,c){var d=Math.max(Math.max(a,b),c),e=Math.min(Math.min(a,b),c);if(e==d)e=a=0;else{var g=d-e,e=g/d;a=60*(a==d?(b-c)/g:b==d?2+(c-a)/g:4+(a-b)/g);0>a&&(a+=360);360<a&&(a-=360)}return[a,e,d]};function H(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}n=H.prototype;n.clone=function(){return new H(this.top,this.right,this.bottom,this.left)};n.toString=function(){return"("+this.top+"t, "+this.right+"r, "+this.bottom+"b, "+this.left+"l)"};n.contains=function(a){return this&&a?a instanceof H?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom:!1};
n.expand=function(a,b,c,d){u(a)?(this.top-=a.top,this.right+=a.right,this.bottom+=a.bottom,this.left-=a.left):(this.top-=a,this.right+=b,this.bottom+=c,this.left-=d);return this};n.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};n.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
n.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};n.translate=function(a,b){this.left+=a;this.right+=a;"number"==typeof b&&(this.top+=b,this.bottom+=b);return this};n.scale=function(a,b){var c="number"==typeof b?b:a;this.left*=a;this.right*=a;this.top*=c;this.bottom*=c;return this};function xa(){this.height=this.width=this.bottom=this.right=this.left=this.top=0}function ya(a,b){this.width=a;this.height=b}function I(a){var b=null;if(a&&"string"==typeof a){var c=a.indexOf("px");-1!=c&&(a=a.substring(0,c));c=a.length-1;a.length<=c?c=!1:(c=a.charCodeAt(c),c=48<=c&&57>=c);c&&(b=parseInt(a,10),isNaN(b)&&(b=null))}return b}function J(a,b){var c=null;a&&(c=I(a.getPropertyValue(b)));return c}function K(a,b){a.style&&a.style.removeProperty(b);a.removeAttribute(b)}
function za(a,b){var c=null;a.style&&(c=I(a.style.getPropertyValue(b)));null==c&&(c=I(a.getAttribute(b)));return c}function L(a,b,c){a.style.setProperty(b,c,"important")}function Aa(a,b){if(b&&0!=b.length){var c=a.getAttribute("style")||"";0<c.length&&";"!=c[c.length-1]&&(c+=";");a.setAttribute("style",c+b)}}
function Ba(a){a=a.getBoundingClientRect();var b=document.body,c=document.documentElement||b.parentNode||b,b="pageXOffset"in window?window.pageXOffset:c.scrollLeft,c="pageYOffset"in window?window.pageYOffset:c.scrollTop;return new H(a.top+c,a.right+b,a.bottom+c,a.left+b)}
function M(a){var b=null;"SCRIPT"!=a.tagName&&"STYLE"!=a.tagName&&a.style&&(a=window.getComputedStyle(a))&&(b=a.getPropertyValue("background-image"),"none"==b&&(b=null),b&&5<b.length&&0==b.indexOf("url(")&&")"==b[b.length-1]&&(b=b.substring(4,b.length-1)));return b}function Ca(){if(null!=window.parent&&window!=window.parent)try{if(window.parent.document.domain==document.domain)return!0}catch(a){}return!1}function Da(a){var b=1;for(a=a.firstChild;a;a=a.nextSibling)b+=Da(a);return b}
function N(a){return u(a)&&1==a.nodeType?a:null}var O={pa:"IMG",qa:"SVG",oa:"background-image"};w("pagespeed.MobUtil.ImageSource",O);function Ea(a,b,c){this.s=a;this.T=b;this.ia=c}function Fa(a){for(var b="#",c=0,d=a.length;c<d;++c){var e=Math.round(a[c]);0>e?e=0:255<e&&(e=255);e=e.toString(16);1==e.length&&(e="0"+e);b+=e}return b}function P(a){a=a.toLowerCase();for(var b="",c=0,d=a.length;c<d;++c){var e=a.charAt(c);if("a"<=e&&"z">=e||"0"<=e&&"9">=e)b+=e}return b}
function Ga(a){if(!a)return"";if(!Ha(a))return a;var b=document.domain,c;c=b.length;for(var d=0;2>d;++d){var e=b.lastIndexOf(".",c-1);if(0<=e)c=e;else break}c=0<=e?b.substring(0,c):b;d=null;0==c.indexOf("www.")&&0>a.indexOf("//www.")&&(e=c.substring(4),d=a.indexOf(e),0<=d&&(a=a.substring(0,d)+c+a.substring(d+e.length)));if(!Ha(a))return a;d=a.indexOf(c);0<=d&&(a=a.substring(0,d)+b+a.substring(d+c.length,a.length));return a}
function Q(a,b){var c=null;switch(b){case "IMG":a.tagName==b&&(c=a.src);break;case "SVG":a.tagName==b&&(c=(new XMLSerializer).serializeToString(a),c=(self.URL||self.webkitURL||self).createObjectURL(new Blob([c],{type:"image/svg+xml;charset=utf-8"})));break;case "background-image":c=M(a)}return c?Ga(c):null}function Ha(a){return 0!=a.lastIndexOf(document.location.origin+"/",0)&&0!=a.lastIndexOf("data:image/",0)}
function Ia(a){a=Ba(a);var b=new xa;b.top=a.top;b.bottom=a.bottom;b.left=a.left;b.right=a.right;b.height=a.bottom-a.top;b.width=a.right-a.left;return b}function Ja(a){var b=I(a.top);a=I(a.left);return null!=b&&-100>b||null!=a&&-100>a};function R(){this.v=0;this.m=this.r=null}R.prototype.G=1E-10;R.prototype.o=3;function Ka(a,b){this.background=a;this.R=b}function La(a,b){if(3!=a.length||3!=b.length)return Infinity;var c=a[0]-b[0],d=a[1]-b[1],e=a[2]-b[2];return Math.sqrt(c*c+d*d+e*e)}function S(a){a/=255;return a=.03928>=a?a/12.92:Math.pow((a+.055)/1.055,2.4)}
function Ma(a,b){var c=b.background,d=b.R,e=.2126*S(c[0])+.7152*S(c[1])+.0722*S(c[2]),g=.2126*S(d[0])+.7152*S(d[1])+.0722*S(d[2]);if(e<a.G&&g<a.G)return b;e=g/e;1>e&&(e=1/e);if(e>a.o)return b;c=wa(c[0],c[1],c[2]);d=wa(d[0],d[1],d[2]);g=e=null;c[2]<d[2]?(e=c[2],g=d[2]):(e=d[2],g=c[2]);var f=(a.o*e-g)/(a.o+1),e=e>f?e-f:0,g=g<1-2*f?g+2*f:255;c[2]<d[2]?(c[2]=e,d[2]=g):(d[2]=e,c[2]=g);c=va(c[0],c[1],c[2]);d=va(d[0],d[1],d[2]);return new Ka(c,d)}
function Na(a,b,c,d,e){var g=[],f,k,h;for(k=0;k<e;++k)for(f=0;f<d;++f){var l=4*(k*d+f);h=3*(k*d+f);var m=b[l+3]/255,q=1-m;g[h]=m*b[l]+q*c[0];g[h+1]=m*b[l+1]+q*c[1];g[h+2]=m*b[l+2]+q*c[2]}l=[0,0,0];for(f=m=k=0;f<d;++f)h=3*((e-1)*d+f),l[0]+=g[h],l[1]+=g[h+1],l[2]+=g[h+2],m+=b[h+3],++k;if(m>127.5*k)for(f=0;3>f;++f)l[f]/=k;else l=c;b=Math.floor(.25*d);c=Math.floor(.75*d);m=Math.floor(.25*e);e=Math.floor(.75*e);var q=0,t=[];for(k=m;k<=e;++k)for(f=b;f<=c;++f)h=3*(k*d+f),t[q]=La(g.slice(h,h+3),l),++q;f=
t.sort(function(a,b){return a-b});var kb=Math.max(1,f[Math.floor(.75*q)]),q=0,t=[0,0,0];for(k=m;k<=e;++k)for(f=b;f<=c;++f)h=3*(k*d+f),La(g.slice(h,h+3),l)>=kb&&(t[0]+=g[h],t[1]+=g[h+1],t[2]+=g[h+2],++q);if(0<q)for(f=0;3>f;++f)t[f]=Math.floor(t[f]/q);return Ma(a,new Ka(l,t))}
R.prototype.C=function(){--this.v;if(!(0<this.v)){var a=[255,255,255],b=[0,0,0],c=this.r;this.m&&this.m.data&&c&&c.c&&c.backgroundColor?(b=Na(this,this.m.data,c.backgroundColor,c.c.width,c.c.height),a=b.background,b=b.R):c&&c.backgroundColor&&(a=c.backgroundColor,b=178.5<wa(a[0],a[1],a[2])[2]?[0,0,0]:[255,255,255]);console.log("Theme color. Background: "+a+" foreground: "+b);this.N(this.r,Fa(a),Fa(b))}};
function Oa(a,b,c){var d=new Image;d.onload=v(function(){var a=document.createElement("canvas"),b=null,f=null;c&&0<c.width&&0<c.height?(b=c.width,f=c.height):(b=d.naturalWidth,f=d.naturalHeight);a.width=b;a.height=f;a=a.getContext("2d");a.drawImage(d,0,0);this.m=a.getImageData(0,0,b,f);this.C()},a);d.onerror=v(a.C,a);d.src=b}
R.prototype.run=function(a,b){this.r=a;this.N&&alert("A callback which was supposed to run after extracting theme color  was not executed.");this.N=b;a&&a.d&&!Ha(a.d)?(this.v=1,Oa(this,a.d,a.c),console.log("Found logo. Theme color will be computed from logo.")):(a&&a.d?console.log("Found logo but its origin is different that of HTML. Use default color."):console.log("Could not find logo. Use default color."),this.C())};function T(a){this.l=a;this.O={};if(a=document.documentElement.clientWidth)for(var b=window.getComputedStyle(document.body),c=["padding-left","padding-right"],d=0;d<c.length;++d){var e=J(b,c[d]);e&&(a-=e)}else a=400;this.b=a;console.log("window.pagespeed.MobLayout.maxWidth="+this.b)}
var Pa="padding-left padding-bottom padding-right padding-top margin-left margin-bottom margin-right margin-top border-left-width border-bottom-width border-right-width border-top-width left top".split(" "),Qa={A:!0,DIV:!0,FORM:!0,H1:!0,H2:!0,H3:!0,H4:!0,P:!0,SPAN:!0,TBODY:!0,TD:!0,TFOOT:!0,TH:!0,THEAD:!0,TR:!0},Ra=["left","width"];
function Sa(a,b){if(!b)return!0;var c=b.tagName.toUpperCase();return"SCRIPT"==c||"STYLE"==c||"IFRAME"==c||b.id&&a.O[b.id]||b.classList.contains("psmob-nav-panel")||b.classList.contains("psmob-header-bar")||b.classList.contains("psmob-header-spacer-div")||b.classList.contains("psmob-logo-span")}function U(a,b){var c=N(b);return Sa(a,c)?null:c}function V(a){var b=[];for(a=a.firstChild;a;a=a.nextSibling)null!=N(a)&&b.push(a);return b}
function Ta(a,b,c){for(b=b.firstChild;b;b=b.nextSibling)null!=U(a,b)&&c.call(a,b)}n=T.prototype;
n.X=function(a){var b=window.getComputedStyle(a),c=M(a);if(c){var c=Ua(this.l,c),d;if(d=c&&c.width&&c.height)"auto"==b.getPropertyValue("background-size")?d=!1:(d=b.getPropertyValue("background-position"),"none"==d?d=!1:(d=d.split(" "),d=2==d.length&&null!=I(d[0])&&null!=I(d[1])?!0:!1)),d=!d;if(d){d=c.width;c=c.height;if(d>this.b){c=Math.round(this.b/d*c);d="background-size:"+this.b+"px "+c+"px;background-repeat:no-repeat;";var e=J(b,"height");c==e&&(d+="height:"+c+"px;");Aa(a,d)}L(a,"min-height",
""+c+"px")}}if("PRE"==a.tagName.toUpperCase()||"pre"==b.getPropertyValue("white-space")&&a.offsetWidth>this.b)a.style.overflowX="scroll";Ta(this,a,this.X)};function Va(a){L(a,"overflow-x","auto");L(a,"width","auto");L(a,"display","block")}n.ma=function(a){Wa(this,a,0)};
function Wa(a,b,c){var d;if(d=Ba(b))c=d.top,d=d.bottom;else{if(b.offsetParent==b.parentNode)c+=b.offsetTop;else if(b.offsetParent!=b.parentNode.parentNode)return null;d=c+b.offsetHeight-1}if(Sa(a,b))return d;d=c-1;var e=window.getComputedStyle(b);if(!e)return null;var g=J(e,"min-height");null!=g&&(d+=g);for(var g=c+b.offsetHeight-1,f=!1,k=!1,h,l=b.firstChild;l;l=l.nextSibling)if(h=N(l)){var m=window.getComputedStyle(h);m&&"absolute"==m.position&&!Ja(m)&&"0px"!=m.getPropertyValue("height")&&"hidden"!=
m.getPropertyValue("visibility")&&(k=!0);h=Wa(a,h,c);null!=h&&(f=!0,d=Math.max(d,h))}if("fixed"==e.getPropertyValue("position")&&f)return null;a=b.tagName.toUpperCase();"BODY"!=a&&(e=g-c+1,f?d!=g&&(k?L(b,"height",""+(d-c+1)+"px"):L(b,"height","auto")):("IMG"!=a&&0<e&&""==b.style.backgroundSize&&(K(b,"height"),L(b,"height","auto"),b.offsetHeight&&(g=c+b.offsetHeight)),d=g));return d}
n.W=function(a){for(var b=V(a),c=0;c<b.length;++c)this.W(b[c]);if(!(a.offsetWidth<=this.b))if(b=a.tagName.toUpperCase(),"TABLE"==b){a:{b=0;for(c=a.firstChild;c;c=c.nextSibling)for(var d=c.firstChild;d;d=d.nextSibling){var e=c.tagName.toUpperCase();if("THEAD"==e||"TFOOT"==e){b=!0;break a}for(e=d.firstChild;e;e=e.nextSibling){if(e.tagName&&"TH"==e.tagName.toUpperCase()){b=!0;break a}++b}}b=3*Xa(this,a)>b?!1:!0}if(b)Va(a);else if("CSS1Compat"!==document.compatMode){var g,f,k,h=document.createElement("DIV");
h.style.display="inline-block";for(var l=V(a),b=0;b<l.length;++b)for(var m=V(l[b]),c=0;c<m.length;++c)for(var q=V(m[c]),d=0;d<q.length;++d)if(f=q[d],1==f.childNodes.length)g=f.childNodes[0],f.removeChild(g),h.appendChild(g);else if(1<f.childNodes.length){k=document.createElement("DIV");k.style.display="inline-block";for(var t=V(f),e=0;e<t.length;++e)g=t[e],f.removeChild(g),k.appendChild(g);h.appendChild(k)}a.parentNode.replaceChild(h,a)}else for(K(a,"width"),L(a,"max-width","100%"),a=a.firstChild;a;a=
a.nextSibling)if(b=N(a),null!=b)for(K(b,"width"),L(b,"max-width","100%"),b=b.firstChild;b;b=b.nextSibling)if(c=N(b),null!=c&&"TR"==c.tagName.toUpperCase())for(K(c,"width"),L(c,"max-width","100%"),c=c.firstChild;c;c=c.nextSibling)d=N(c),null!=d&&"TD"==d.tagName.toUpperCase()&&(L(d,"max-width","100%"),L(d,"display","inline-block"))}else{c=null;d=a.offsetWidth;e=a.offsetHeight;g="img";if("IMG"==b)c=a.getAttribute("src");else if(g="background-image",c=M(a),f=null==c?null:Ua(this.l,c))d=f.width,e=f.height;
null!=c?(f=d/this.b,1<f&&(f=e/f,console.log("Shrinking "+g+" "+c+" from "+d+"x"+e+" to "+this.b+"x"+f),"IMG"==b?(L(a,"width",""+this.b+"px"),L(a,"height",""+f+"px")):L(a,"background-size",""+this.b+"px "+f+"px"))):"CODE"==b||"PRE"==b||"UL"==b?Va(a):Qa[b]?(L(a,"max-width","100%"),K(a,"width")):console.log("Punting on resize of "+b+" which wants to be "+a.offsetWidth+" but this.maxWidth_="+this.b)}};
function Xa(a,b){var c=0,d=b.tagName.toUpperCase();"DIV"!=d&&"TABLE"!=d&&"UL"!=d||++c;for(d=b.firstChild;d;d=d.nextSibling){var e=N(d);null!=e&&(c+=Xa(a,e))}return c}n.fa=function(a){var b=document.body.style.display;document.body.style.display="none";this.L(a);document.body.style.display=b};
n.L=function(a){var b=window.getComputedStyle(a);"nowrap"==b.getPropertyValue("white-space")&&L(a,"white-space","normal");Ta(this,a,this.L);var b=window.getComputedStyle(a),c,d,e;for(c=0;c<Ra.length;++c)d=Ra[c],(e=b.getPropertyValue(d))&&"100%"!=e&&"auto"!=e&&0<e.length&&"%"==e[e.length-1]&&L(a,d,"auto");c=a.tagName.toUpperCase();var g="UL"==c||"OL"==c,f="BODY"==c,k=!1,h="";for(c=0;c<Pa.length;++c){d=Pa[c];if(e=g)e=d.length-5,e=0<=e&&d.indexOf("-left",e)==e;e||f&&0==d.lastIndexOf("margin-",0)||(e=
J(b,d),null!=e&&(4<e?h+=d+":4px !important;":0>e&&(k=!0,"margin-bottom"==d&&(k=-30<e),k?h+=d+":0px !important;":a.setAttribute("data-pagespeed-negative-bottom-margin","1"))))}Aa(a,h)};
n.V=function(a){Ta(this,a,this.V);if("IMG"==a.tagName.toUpperCase()){var b=window.getComputedStyle(a),c=za(a,"width"),d=za(a,"height");if(c&&d&&b){var e=J(b,"width"),b=J(b,"height");if(e&&b&&(e/=c,b/=d,.95<(e>b?b/e:e/b)||(console.log("aspect ratio problem for "+a.getAttribute("src")),1==a.naturalHeight&&1==a.naturalWidth?(b=Math.min(e,b),K(a,"width"),K(a,"height"),a.style.width=c*b,a.style.height=d*b):e>b?K(a,"height"):(K(a,"width"),K(a,"height"),a.style.maxHeight=d)),.25>e)){for(console.log("overshrinkage for "+
a.getAttribute("src"));a&&a.tagName&&"TD"!=a.tagName.toUpperCase();)a=a.parentNode;if(a&&(c=a.parentNode)){d=0;for(a=c.firstChild;a;a=a.nextSibling)a.tagName&&"TD"==a.tagName.toUpperCase()&&++d;if(1<d)for(d="width:"+Math.round(100/d)+"%;",c=c.firstChild;c;c=c.nextSibling)a=N(c),null!=a&&"TD"==a.tagName.toUpperCase()&&Aa(a,d)}}}}};
n.Y=function(a){var b=window.getComputedStyle(a).getPropertyValue("position");if("fixed"==b)return"fixed";if(a.classList.contains("nivoSlider"))return b;var c,d,e,g,f=[];c=null;var k,h=!1;for(d=a.firstChild;d;d=d.nextSibling)if(e=U(this,d),null!=e){var l=window.getComputedStyle(e);g=this.Y(e);if("fixed"!=g&&null!=l&&null!=U(this,e)){"absolute"!=g||Ja(l)||L(e,"position","relative");g=l.getPropertyValue("float");var m="right"==g;k="inline-block";if(m||"left"==g)m&&"right"==l.getPropertyValue("clear")&&
(m=!1,k="block",c&&h&&L(c,"margin-bottom","0px")),L(e,"float","none"),"none"!=l.getPropertyValue("display")&&L(e,"display",k);m&&f.push(e);c=e;e=J(l,"margin-bottom");h=null!=e&&0>e}}for(c=f.length-1;0<=c;--c)d=f[c],a.removeChild(d);for(c=f.length-1;0<=c;--c)d=f[c],a.appendChild(d);return b};
n.Q=function(a){if("fixed"!=window.getComputedStyle(a).getPropertyValue("position")){var b,c,d,e=[],g=[];for(c=a.firstChild;c;c=c.nextSibling)if(d=U(this,c),null!=d){b=window.getComputedStyle(d);var f=b.getPropertyValue("position");"fixed"!=f&&"absolute"!=f&&0!=c.offsetWidth&&(e.push(d),g.push(b))}var k=null;for(c=0;c<e.length;++c)d=e[c],b=c<e.length-1?e[c+1]:null,f=d.offsetLeft+d.offsetWidth,(null==k||d.offsetLeft<k)&&(null==b||b.offsetLeft<f)&&(b=d,k=b.tagName.toUpperCase(),"INPUT"!=k&&"SELECT"!=
k&&(""==b.style.backgroundSize&&"auto"!=g[c].width&&L(b,"width","auto"),"IMG"!=k&&b.removeAttribute("width"),K(b,"border-left"),K(b,"border-right"),K(b,"margin-left"),K(b,"margin-right"),K(b,"padding-left"),K(b,"padding-right"),b.className=""!=b.className?b.className+" psSingleColumn":"psSingleColumn"),this.Q(d)),a.getAttribute("data-pagespeed-negative-bottom-margin")&&(a.removeAttribute("data-pagespeed-negative-bottom-margin"),b=window.getComputedStyle(a),d=J(b,"height"),null!=d&&L(a,"margin-bottom",
""+-d+"px")),k=f}};var W=[T.prototype.X,"shrink wide elements",T.prototype.Y,"string floats",T.prototype.fa,"cleanup styles",T.prototype.V,"repair distored images",T.prototype.W,"resize if too wide",T.prototype.Q,"expand columns",T.prototype.ma,"resize vertically"];function Ya(a){this.l=a;this.K=[]}function Za(){this.k=-1;this.g=this.la=null;this.d="";this.backgroundColor=this.ea=this.backgroundImage=this.ca=this.c=this.i=null}n=Ya.prototype;n.J=20;n.I=10;n.n=200;n.aa=400;n.H=6E3;n.ba=.5;
function X(a,b,c,d,e){var g=Ia(b),f="hidden"!=$a(b),k=g.width*g.height,h=g.width>a.J&&g.height>a.I&&k>a.aa&&g.top<a.H&&g.height<a.n;if(f&&h&&k>=c&&k<=d){var k=f=null,l;for(l in O)if(k=Q(b,O[l])){f=O[l];h=!0;if("IMG"==f){var m=Ua(a.l,b.src);m?(g.width=m.width,g.height=m.height):b.naturalWidth?(g.width=b.naturalWidth,g.height=b.naturalHeight):(console.log("Image "+b.src+" may be the logo. It has not been loaded so may be missed."),h=!1);h&&(g.width<=a.J||g.height<=a.I||g.height>=a.n)&&(h=!1)}if(h)return a=
new Za,a.d=k,a.g=b,a.i=f,a.c=g,a}}if(e)for(b=b.firstChild;b;b=b.nextSibling){if(g=N(b),null!=g&&(g=X(a,g,c,d,e)))return g}else if(b.parentNode&&(b=N(b.parentNode),null!=b))return X(a,b,c,d,e);return null}
function ab(a,b,c){var d;a:{var e=Ia(b);d="hidden"!=$a(b);if(e.top<a.H&&e.height<a.n&&d){d=0;b.title&&(d+=x(b.title,"logo"));b.id&&(d+=x(b.id,"logo"));b.className&&(d+=x(b.className,"logo"));b.alt&&(d+=x(b.alt,"logo"));var g;g=document.domain.toLowerCase().split(".");var f=g.length;g=4<f&&2==g[f-3].length?g[f-5]:3<f?g[f-4]:null;f=0;g&&(b.id&&(d+=x(b.id,g)),b.className&&(d+=x(b.className,g)),b.title&&(f+=0<=P(b.title).indexOf(P(g))?1:0),b.alt&&(f+=0<=P(b.alt).indexOf(P(g))?1:0));var k=e.width*e.height;
(e=X(a,b,k*a.ba,k,!0))||(e=X(a,b,k,Infinity,!1));if(e){k=e.d;if(!k||0<=k.indexOf("data:image/"))k="";else{var h=k.lastIndexOf("/");0>h?h=0:++h;var l=k.indexOf(".",h);0>l&&(l=k.length);k=k.substring(h,l)}b:{if(h=k)if(h=h.toLowerCase(),0<=h.indexOf("logo")&&0>h.indexOf("logout")&&0>h.indexOf("no_logo")&&0>h.indexOf("no-logo")){h=1;break b}h=0}k&&g&&(f+=0<=P(k).indexOf(P(g))?1:0);d=d+h+f;if(0<d){e.k=d;e.la=b;d=e;break a}}}d=null}d&&(a.K.push(d),++c);for(b=b.firstChild;b;b=b.nextSibling)d=N(b),null!=
d&&ab(a,d,c)}
function bb(a){var b=null,c=a.K;if(!c||0==c.length)return null;if(1==c.length)return b=c[0];var d=1,e=0,g=Infinity,f;for(a=0;b=c[a];++a)f=b.c,g=Math.min(g,f.top),e=Math.max(e,f.bottom),b=f.width*f.height,d=Math.max(d,b);for(a=0;b=c[a];++a)f=b.c,b.k=f.width*f.height/d*b.k*(1-(f.top-g)/(e-g));for(a=f=0;b=c[a];++a)f=Math.max(f,b.k);d=[];for(a=0;b=c[a];++a)b.k==f&&d.push(b);if(1==d.length)return b=d[0];c=d[0];e=c.c;for(a=1;b=d[a];++a)if(f=b.c,e.top>f.top||e.top==f.top&&e.left>f.left||e.top==f.top&&e.left==
f.left&&e.width*e.height>f.width*f.height)c=b,e=c.c;return c}function cb(a){if(a=document.defaultView.getComputedStyle(a,null))if(a=a.getPropertyValue("background-color")){a:{var b=a.indexOf("("),c=a.lastIndexOf(")");a=(0<=b&&c>b?a.substring(b+1,c):null).split(", ");for(var b=[],c=0,d=a.length;c<d;++c)if(b[c]=parseInt(a[c],10),isNaN(b[c])){a=null;break a}a=b}if(3==a.length||4==a.length&&0!=a[3])return a}return null}
n.run=function(){if(!document.body)return null;ab(this,document.body,0);var a;if((a=bb(this))&&a.g){var b=a.g,c=null;if("IMG"==a.i||"SVG"==a.i)c=Q(b,"background-image");var d=cb(b),e=null;for(b.parentNode&&(e=N(b.parentNode));e&&!c&&!d;)b=e,c=Q(b,"IMG")||Q(b,"SVG")||Q(b,"background-image"),d=cb(b),e=b.parentNode?N(b.parentNode):null;a.ca=b;a.backgroundImage=c;a.backgroundColor=d||[255,255,255];a.ea=Ia(b)}else a=null;return a};w("pagespeed.MobLogo.prototype.run",Ya.prototype.run);function db(){this.u=[];this.Z=!0}db.prototype.$="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAATdJREFUeNrt0klOBTEQREHfDI7FTEn/4M2GBULQo22wK+ICKT1lKQAAAAAAAAAAAAAAAAAA/Jm7rmv3o+W5laU8d1uLspQYLc/SLVF8rsVoefokii9rMVqe9oni21qMlqdtovhhLUbL0y5R/LIWo+VZylKeuuX5t4nW8tRPFBtrMV6gmolic+t9xA/VSjRonl6JBs7TI9HgeVonmiDPvkSPmfO0SjRRnhaJJstTO9GEeWom2s7zVgZVI9HEeWokmjzPvkQPmfNcSZQkz9lEifKcSZQsz9FECfMcSZQ0z95E23ley8S2E6XOcz3R9HmuJUqR53yiNHnOJUqV53iidHmOJUqZZ3+itHn2JXopyd3kOZ9IntVE8qwmkmc1kTyrieRZTSTPaiJ5AAAAAAAAAAAAAAAAAGjgA62rM0XB6dNxAAAAAElFTkSuQmCC";
function eb(a,b,c){var d=[];for(b=b.firstChild;b;b=b.nextSibling)"UL"==b.tagName?d=ja(d,eb(a,b,c+1)):("A"==b.tagName&&(b.setAttribute("data-mobilize-nav-level",c),d.push(b)),d=ja(d,eb(a,b,c)));return d}function fb(){var a=document.querySelector(".psmob-nav-panel"),b=document.querySelector(".psmob-header-bar");D(b,"open");D(a,"open");D(document.body,"noscroll")}
function gb(a){var b=document.querySelector(".psmob-menu-button");document.body.addEventListener("click",function(a){if(b.contains(a.target))fb();else{var d=document.querySelector(".psmob-nav-panel");B(d,"open")&&!d.contains(a.target)&&(fb(),a.stopPropagation(),a.preventDefault())}}.bind(a),!0)}
function hb(){document.querySelector("nav.psmob-nav-panel > ul").addEventListener("click",function(a){var b=a.target;a=u(b)&&1==b.nodeType&&B(a.target,"psmob-menu-expand-icon")?a.target.parentNode:a.target;"DIV"==a.tagName&&(D(a.nextSibling,"open"),D(a.firstChild,"open"))})};function ib(){this.S=null}
ib.prototype.ga=function(a,b,c){var d=document.createElement("span");d.classList.add("psmob-logo-span");if(a&&a.d){var e=document.createElement("IMG");e.src=a.d;e.style.backgroundColor=b;e.setAttribute("data-mobile-role","logo");d.appendChild(e)}else d.innerHTML=window.location.host;var e=String(Math.floor(7)),g=String(Math.floor(14)),f=String(Math.floor(21)),e='<button class="psmob-menu-button">'+('<svg height="28px" width="28px" style="stroke:'+c+";stroke-width:"+String(Math.floor(4.2))+'px" ><line x1="4px" y1="'+
e+'px" x2="24px" y2="'+e+'px"/><line x1="4px" y1="'+g+'px" x2="24px" y2="'+g+'px"/><line x1="4px" y1="'+f+'px" x2="24px" y2="'+f+'px"/></svg>')+"</button>";document.body.appendChild(d);b=new Ea(c,b,e);if(a&&a.g&&a.i)switch(c=a.g,a.i){case "IMG":case "SVG":c.parentNode.removeChild(c);break;case "background-image":c.style.backgroundImage="none"}this.ha(b)};function Y(){this.p=0;this.j={};this.na=Date.now();this.M=!1;this.f=this.D=this.U=this.a=this.e=0;this.t=!1;this.F=this.B=0;this.q=new T(this);this.q.O["ps-progress-scrim"]=!0}var jb=new ya(-1,-1);function lb(a){if(0==a.f)if(console.log("mobilizing site"),window.psNavMode&&!Ca()){++a.B;var b=a.ka.bind(a);b||alert("Not expecting to start onloads after the callback is called");var c=new ib;c.ha=b;c.S=(new Ya(a)).run();(new R).run(c.S,v(c.ga,c))}else mb(a);else a.t=!0}
Y.prototype.ka=function(a){--this.B;Z(this,this.e,"extract theme");var b=new db;console.log("Starting nav resynthesis.");var c;if(pagespeedNavigationalIds){c=Array(pagespeedNavigationalIds.length);for(var d=0,e;e=pagespeedNavigationalIds[d];d++)c[d]=document.getElementById(e)}else c=[];d=document.querySelectorAll(".topNavList");e=d.length;if(0<e){for(var g=Array(e),f=0;f<e;f++)g[f]=d[f];d=g}else d=[];b.u=ia(c,d);c=document.getElementsByTagName("*");for(d=0;e=c[d];d++)g=window.getComputedStyle(e),
"fixed"==g.getPropertyValue("position")&&(f=e.getBoundingClientRect().top,e.style.top=String(60+f)+"px"),999999<=g.getPropertyValue("z-index")&&(console.log("Element z-index exceeded 999999, setting to 999998."),e.style.zIndex=999998);d=document.createElement("div");document.body.insertBefore(d,document.body.childNodes[0]);C(d,"psmob-header-spacer-div");c=document.createElement("header");document.body.insertBefore(c,d);C(c,"psmob-header-bar");c.innerHTML=a.ia;c.style.borderBottom="thin solid "+a.s;
(d=document.getElementsByClassName("psmob-logo-span")[0])&&c.appendChild(d);if(d=document.querySelector('[data-mobile-role="logo"]'))c.style.backgroundColor=d.style.backgroundColor;c=b.Z&&a.T?a.T:"#3c78d8";a=".psmob-header-bar { background-color: "+c+" }\n.psmob-nav-panel { background-color: "+(b.Z&&a.s?a.s:"white")+" }\n.psmob-nav-panel > ul li { color: "+c+" }\n.psmob-nav-panel > ul li a { color: "+c+" }\n";c=document.createElement("style");c.type="text/css";c.appendChild(document.createTextNode(a));
document.head.appendChild(c);if(0!=b.u.length&&!Ca()){a=document.body.insertBefore(document.createElement("nav"),document.getElementsByClassName("psmob-header-bar")[0].nextSibling);C(a,"psmob-nav-panel");a=a.appendChild(document.createElement("ul"));C(a,"open");for(c=0;d=b.u[c];c++){d.setAttribute("data-mobilize-nav-section",c);e=eb(b,d,0);g=[];g.push(a);for(var f=0,k=e.length;f<k;f++){var h=e[f].getAttribute("data-mobilize-nav-level"),l=f+1==k?h:e[f+1].getAttribute("data-mobilize-nav-level");if(h<
l){var m=document.createElement("li"),h=m.appendChild(document.createElement("div")),l=h.appendChild(document.createElement("img"));l.setAttribute("src",b.$);C(l,"psmob-menu-expand-icon");h.appendChild(document.createTextNode(e[f].textContent||e[f].innerText));g[g.length-1].appendChild(m);h=document.createElement("ul");m.appendChild(h);g.push(h)}else for(m=document.createElement("li"),g[g.length-1].appendChild(m),m.appendChild(e[f].cloneNode(!0)),m=h-l;0<m&&1<g.length;)g.pop(),m--}d.parentNode.removeChild(d)}d=
document.querySelector(".psmob-nav-panel > ul a");e={};a=[];for(c=0;g=d[c];c++)g.href in e?(f=g.innerHTML.toLowerCase(),-1==e[g.href].indexOf(f)?e[g.href].push(f):"LI"==g.parentNode.tagName&&a.push(g.parentNode)):(e[g.href]=[],e[g.href].push(g.innerHTML.toLowerCase()));for(c=0;d=a[c];c++)d.parentNode.removeChild(d);c=document.querySelectorAll(".psmob-nav-panel *");for(a=0;d=c[a];a++)d.removeAttribute("style"),d.removeAttribute("width"),d.removeAttribute("height"),"A"==d.tagName&&""==d.innerText&&
d.hasAttribute("title")&&d.appendChild(document.createTextNode(d.getAttribute("title")));c=document.querySelectorAll(".psmob-nav-panel img:not(.psmob-menu-expand-icon)");for(a=0;d=c[a];++a)e=Math.min(2*d.naturalHeight,40),d.setAttribute("height",e);gb(b);hb()}Z(this,this.e,"navigation");mb(this)};Y.prototype.da=function(a){this.j[a.src]=new ya(a.width,a.height);--this.f;Z(this,1E3,"background image");0==this.f&&this.t&&(lb(this),this.t=!1)};
function nb(a,b){var c=U(a.q,b);if(null!=c){var d=M(c);if(d&&(0==d.lastIndexOf("http://",0)||0==d.lastIndexOf("https://",0))&&!a.j[d]){a.j[d]=jb;var e=new Image;++a.f;e.onload=a.da.bind(a,e);e.onerror=e.onload;e.src=d}for(c=c.firstChild;c;c=c.nextSibling)nb(a,c)}}Y.prototype.xhrSendHook=function(){++this.p};Y.prototype.xhrResponseHook=function(){--this.p;this.a+=this.F;mb(this)};
Y.prototype.ja=function(){ob(this,window.psDebugMode);this.e=Da(document.body);this.F=W.length/2*this.e;this.a+=this.F;window.psNavMode&&Ca()&&(this.a+=this.e,this.a+=this.e);if(null!=document.body){for(var a in window.psMobStaticImageInfo){var b=window.psMobStaticImageInfo[a];this.j[a]=new ya(b.w,b.h)}nb(this,document.body)}this.a+=1E3*this.f;window.psLayoutMode&&window.pagespeedXhrHijackSetListener(this);lb(this)};
function mb(a){if(0==a.p&&0==a.B&&0==a.f){if(window.psLayoutMode){var b=a.q;if(null!=document.body)for(var c=0;c<W.length;++c){W[c].call(b,document.body);++c;var d=b.l;Z(d,d.e,W[c])}}if(a.M){if(a=document.getElementById("ps-progress-remove"))a.textContent="Remove Progress Bar and show mobilized site"}else pb()}}function Ua(a,b){var c=a.j[b];c==jb&&(c=null);return c}
function ob(a,b){a.M=b;var c=document.getElementById("ps-progress-log");c&&(c.style.color=b?"#333":"white");b&&(c=document.getElementById("ps-progress-show-log"))&&(c.style.display="none")}function $a(a){var b=a.getAttribute("ps-save-visibility");b||((a=window.getComputedStyle(a))&&(b=a.getPropertyValue("visibility")),b||(b="visible"));return b}
function Z(a,b,c){a.D+=b;b=100;0<a.a&&(b=Math.round(100*a.D/a.a),100<b&&(b=100));if(b!=a.U){var d=document.getElementById("ps-progress-span");d&&(d.style.width=b+"%");a.U=b}a=""+b+"% "+(Date.now()-a.na)+"ms: "+c;console.log(a);if(c=document.getElementById("ps-progress-log"))c.textContent+=a+"\n"}function pb(){var a=document.getElementById("ps-progress-scrim");a&&(a.style.display="none",a.parentNode.removeChild(a))}var qb=new Y;window.addEventListener("load",v(qb.ja,qb));
w("psSetDebugMode",function(){ob(qb,!0)});w("psRemoveProgressBar",function(){pb()});})();
