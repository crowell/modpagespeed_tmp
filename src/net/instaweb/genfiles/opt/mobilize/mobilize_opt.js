(function(){var n,p=this;
function aa(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
b&&"undefined"==typeof a.call)return"object";return b}function r(a){return"string"==typeof a}function u(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ba(a,b,c){return a.call.apply(a.bind,arguments)}function ca(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function v(a,b,c){v=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ba:ca;return v.apply(null,arguments)}function w(a,b){var c=a.split("."),d=p;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b};var da=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function x(a,b){return-1!=a.toLowerCase().indexOf(b.toLowerCase())}function y(a,b){return a<b?-1:a>b?1:0};var z;a:{var ea=p.navigator;if(ea){var fa=ea.userAgent;if(fa){z=fa;break a}}z=""};var A=Array.prototype,ga=A.indexOf?function(a,b,c){return A.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(r(a))return r(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ha=A.filter?function(a,b,c){return A.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=r(a)?a.split(""):a,k=0;k<d;k++)if(k in g){var h=g[k];b.call(c,h,k,a)&&(e[f++]=h)}return e};function ia(a){return A.concat.apply(A,arguments)};function B(a){return 1==a.length?"0"+a:a}function ja(a,b,c){var d=0,e=0,f=0;if(0==b)f=e=d=c;else{var g=Math.floor(a/60),k=a/60-g;a=c*(1-b);var h=c*(1-b*k);b=c*(1-b*(1-k));switch(g){case 1:d=h;e=c;f=a;break;case 2:d=a;e=c;f=b;break;case 3:d=a;e=h;f=c;break;case 4:d=b;e=a;f=c;break;case 5:d=c;e=a;f=h;break;case 6:case 0:d=c,e=b,f=a}}return[Math.floor(d),Math.floor(e),Math.floor(f)]}
function ka(a,b,c){var d=Math.max(Math.max(a,b),c),e=Math.min(Math.min(a,b),c);if(e==d)e=a=0;else{var f=d-e,e=f/d;a=60*(a==d?(b-c)/f:b==d?2+(c-a)/f:4+(a-b)/f);0>a&&(a+=360);360<a&&(a-=360)}return[a,e,d]};function C(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}n=C.prototype;n.clone=function(){return new C(this.top,this.right,this.bottom,this.left)};n.toString=function(){return"("+this.top+"t, "+this.right+"r, "+this.bottom+"b, "+this.left+"l)"};n.contains=function(a){return this&&a?a instanceof C?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom:!1};
n.expand=function(a,b,c,d){u(a)?(this.top-=a.top,this.right+=a.right,this.bottom+=a.bottom,this.left-=a.left):(this.top-=a,this.right+=b,this.bottom+=c,this.left-=d);return this};n.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};n.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
n.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};n.translate=function(a,b){this.left+=a;this.right+=a;"number"==typeof b&&(this.top+=b,this.bottom+=b);return this};n.scale=function(a,b){var c="number"==typeof b?b:a;this.left*=a;this.right*=a;this.top*=c;this.bottom*=c;return this};var la=-1!=z.indexOf("Opera")||-1!=z.indexOf("OPR"),D=-1!=z.indexOf("Trident")||-1!=z.indexOf("MSIE"),ma=-1!=z.indexOf("Gecko")&&!x(z,"WebKit")&&!(-1!=z.indexOf("Trident")||-1!=z.indexOf("MSIE")),na=x(z,"WebKit");function oa(){var a=p.document;return a?a.documentMode:void 0}
var pa=function(){var a="",b;if(la&&p.opera)return a=p.opera.version,"function"==aa(a)?a():a;ma?b=/rv\:([^\);]+)(\)|;)/:D?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:na&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(z))?a[1]:"");return D&&(b=oa(),b>parseFloat(a))?String(b):a}(),qa={};
function ra(a){if(!qa[a]){for(var b=0,c=da(String(pa)).split("."),d=da(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"",h=RegExp("(\\d*)(\\D*)","g"),l=RegExp("(\\d*)(\\D*)","g");do{var m=h.exec(g)||["","",""],q=l.exec(k)||["","",""];if(0==m[0].length&&0==q[0].length)break;b=y(0==m[1].length?0:parseInt(m[1],10),0==q[1].length?0:parseInt(q[1],10))||y(0==m[2].length,0==q[2].length)||y(m[2],q[2])}while(0==b)}qa[a]=0<=b}}
var sa=p.document,ta=sa&&D?oa()||("CSS1Compat"==sa.compatMode?parseInt(pa,10):5):void 0;function ua(a){if(a.classList)return a.classList;a=a.className;return r(a)&&a.match(/\S+/g)||[]}function E(a,b){var c;a.classList?c=a.classList.contains(b):(c=ua(a),c=0<=ga(c,b));return c}function F(a,b){a.classList?a.classList.add(b):E(a,b)||(a.className+=0<a.className.length?" "+b:b)}function va(a,b){a.classList?a.classList.remove(b):E(a,b)&&(a.className=ha(ua(a),function(a){return a!=b}).join(" "))}function G(a,b){E(a,b)?va(a,b):F(a,b)};var wa;if(!(wa=!ma&&!D)){var xa;if(xa=D)xa=D&&9<=ta;wa=xa}wa||ma&&ra("1.9.1");D&&ra("9");function ya(){this.height=this.width=this.bottom=this.right=this.left=this.top=0}function za(a,b){this.width=a;this.height=b}function H(a){var b=null;if(a&&"string"==typeof a){var c=a.indexOf("px");-1!=c&&(a=a.substring(0,c));c=a.length-1;a.length<=c?c=!1:(c=a.charCodeAt(c),c=48<=c&&57>=c);c&&(b=parseInt(a,10),isNaN(b)&&(b=null))}return b}function I(a,b){var c=null;a&&(c=H(a.getPropertyValue(b)));return c}function J(a,b){a.style&&a.style.removeProperty(b);a.removeAttribute(b)}
function Aa(a,b){var c=null;a.style&&(c=H(a.style.getPropertyValue(b)));null==c&&(c=H(a.getAttribute(b)));return c}function K(a,b,c){a.style.setProperty(b,c,"important")}function Ba(a,b){if(b&&0!=b.length){var c=a.getAttribute("style")||"";0<c.length&&";"!=c[c.length-1]&&(c+=";");a.setAttribute("style",c+b)}}
function Ca(a){a=a.getBoundingClientRect();var b=document.body,c=document.documentElement||b.parentNode||b,b="pageXOffset"in window?window.pageXOffset:c.scrollLeft,c="pageYOffset"in window?window.pageYOffset:c.scrollTop;return new C(a.top+c,a.right+b,a.bottom+c,a.left+b)}
function L(a){var b=null;"SCRIPT"!=a.tagName&&"STYLE"!=a.tagName&&a.style&&(a=window.getComputedStyle(a))&&(b=a.getPropertyValue("background-image"),"none"==b&&(b=null),b&&5<b.length&&0==b.indexOf("url(")&&")"==b[b.length-1]&&(b=b.substring(4,b.length-1)));return b}function Da(){if(null!=window.parent&&window!=window.parent)try{if(window.parent.document.domain==document.domain)return!0}catch(a){}return!1}function Ea(a){var b=1;for(a=a.firstChild;a;a=a.nextSibling)b+=Ea(a);return b}
function M(a){return u(a)&&1==a.nodeType?a:null}var N={ra:"IMG",sa:"SVG",qa:"background-image"};w("pagespeed.MobUtil.ImageSource",N);function Fa(a,b,c,d){this.s=a;this.T=b;this.na=c;this.ma=d}
function O(a){for(var b=0,c=a.length;b<c;++b){var d=Math.round(a[b]);0>d?d=0:255<d&&(d=255);a[b]=d}b=a[0];c=a[1];a=a[2];b=Number(b);c=Number(c);a=Number(a);if(isNaN(b)||0>b||255<b||isNaN(c)||0>c||255<c||isNaN(a)||0>a||255<a)throw Error('"('+b+","+c+","+a+'") is not a valid RGB color');return"#"+B(b.toString(16))+B(c.toString(16))+B(a.toString(16))}function P(a){a=a.toLowerCase();for(var b="",c=0,d=a.length;c<d;++c){var e=a.charAt(c);if("a"<=e&&"z">=e||"0"<=e&&"9">=e)b+=e}return b}
function Ga(a){if(!a)return"";if(!Ha(a))return a;var b=document.domain,c;c=b.length;for(var d=0;2>d;++d){var e=b.lastIndexOf(".",c-1);if(0<=e)c=e;else break}c=0<=e?b.substring(0,c):b;d=null;0==c.indexOf("www.")&&0>a.indexOf("//www.")&&(e=c.substring(4),d=a.indexOf(e),0<=d&&(a=a.substring(0,d)+c+a.substring(d+e.length)));if(!Ha(a))return a;d=a.indexOf(c);0<=d&&(a=a.substring(0,d)+b+a.substring(d+c.length,a.length));return a}
function Q(a,b){var c=null;switch(b){case "IMG":a.tagName==b&&(c=a.src);break;case "SVG":a.tagName==b&&(c=(new XMLSerializer).serializeToString(a),c=(self.URL||self.webkitURL||self).createObjectURL(new Blob([c],{type:"image/svg+xml;charset=utf-8"})));break;case "background-image":c=L(a)}return c?Ga(c):null}function Ha(a){return 0!=a.lastIndexOf(document.location.origin+"/",0)&&0!=a.lastIndexOf("data:image/",0)}
function Ia(a){a=Ca(a);var b=new ya;b.top=a.top;b.bottom=a.bottom;b.left=a.left;b.right=a.right;b.height=a.bottom-a.top;b.width=a.right-a.left;return b}function Ja(a){var b=H(a.top);a=H(a.left);return null!=b&&-100>b||null!=a&&-100>a}function Ka(a){a=a.replace(/\\/g,"\\\\");a=a.replace(/"/g,'\\"');a=a.replace(/\n/g,"\\a ");a=a.replace(/\f/g,"\\c ");a=a.replace(/\r/g,"\\d ");return'"'+a+'"'};function R(){this.v=0;this.m=this.r=null}R.prototype.G=1E-10;R.prototype.o=3;function La(a,b){this.background=a;this.R=b}function Ma(a,b){if(3!=a.length||3!=b.length)return Infinity;var c=a[0]-b[0],d=a[1]-b[1],e=a[2]-b[2];return Math.sqrt(c*c+d*d+e*e)}function S(a){a/=255;return a=.03928>=a?a/12.92:Math.pow((a+.055)/1.055,2.4)}
function Na(a,b){var c=b.background,d=b.R,e=.2126*S(c[0])+.7152*S(c[1])+.0722*S(c[2]),f=.2126*S(d[0])+.7152*S(d[1])+.0722*S(d[2]);if(e<a.G&&f<a.G)return b;e=f/e;1>e&&(e=1/e);if(e>a.o)return b;c=ka(c[0],c[1],c[2]);d=ka(d[0],d[1],d[2]);f=e=null;c[2]<d[2]?(e=c[2],f=d[2]):(e=d[2],f=c[2]);var g=(a.o*e-f)/(a.o+1),e=e>g?e-g:0,f=f<1-2*g?f+2*g:255;c[2]<d[2]?(c[2]=e,d[2]=f):(d[2]=e,c[2]=f);c=ja(c[0],c[1],c[2]);d=ja(d[0],d[1],d[2]);return new La(c,d)}
function Oa(a,b,c,d,e){var f=[],g,k,h;for(k=0;k<e;++k)for(g=0;g<d;++g){var l=4*(k*d+g);h=3*(k*d+g);var m=b[l+3]/255,q=1-m;f[h]=m*b[l]+q*c[0];f[h+1]=m*b[l+1]+q*c[1];f[h+2]=m*b[l+2]+q*c[2]}l=[0,0,0];for(g=m=k=0;g<d;++g)h=3*((e-1)*d+g),l[0]+=f[h],l[1]+=f[h+1],l[2]+=f[h+2],m+=b[h+3],++k;if(m>127.5*k)for(g=0;3>g;++g)l[g]/=k;else l=c;b=Math.floor(.25*d);c=Math.floor(.75*d);m=Math.floor(.25*e);e=Math.floor(.75*e);var q=0,t=[];for(k=m;k<=e;++k)for(g=b;g<=c;++g)h=3*(k*d+g),t[q]=Ma(f.slice(h,h+3),l),++q;g=
t.sort(function(a,b){return a-b});var lb=Math.max(1,g[Math.floor(.75*q)]),q=0,t=[0,0,0];for(k=m;k<=e;++k)for(g=b;g<=c;++g)h=3*(k*d+g),Ma(f.slice(h,h+3),l)>=lb&&(t[0]+=f[h],t[1]+=f[h+1],t[2]+=f[h+2],++q);if(0<q)for(g=0;3>g;++g)t[g]=Math.floor(t[g]/q);return Na(a,new La(l,t))}
R.prototype.C=function(){--this.v;if(!(0<this.v)){var a=[255,255,255],b=[0,0,0],c=this.r;this.m&&this.m.data&&c&&c.c&&c.backgroundColor?(b=Oa(this,this.m.data,c.backgroundColor,c.c.width,c.c.height),a=b.background,b=b.R):c&&c.backgroundColor&&(a=c.backgroundColor,b=178.5<ka(a[0],a[1],a[2])[2]?[0,0,0]:[255,255,255]);console.log("Theme color. Background: "+a+" foreground: "+b);this.N(this.r,a,b)}};
function Pa(a,b,c){var d=new Image;d.onload=v(function(){var a=document.createElement("canvas"),b=null,g=null;c&&0<c.width&&0<c.height?(b=c.width,g=c.height):(b=d.naturalWidth,g=d.naturalHeight);a.width=b;a.height=g;a=a.getContext("2d");a.drawImage(d,0,0);this.m=a.getImageData(0,0,b,g);this.C()},a);d.onerror=v(a.C,a);d.src=b}
R.prototype.run=function(a,b){this.r=a;this.N&&alert("A callback which was supposed to run after extracting theme color  was not executed.");this.N=b;a&&a.d&&!Ha(a.d)?(this.v=1,Pa(this,a.d,a.c),console.log("Found logo. Theme color will be computed from logo.")):(a&&a.d?console.log("Found logo but its origin is different that of HTML. Use default color."):console.log("Could not find logo. Use default color."),this.C())};function T(a){this.l=a;this.O={};if(a=document.documentElement.clientWidth)for(var b=window.getComputedStyle(document.body),c=["padding-left","padding-right"],d=0;d<c.length;++d){var e=I(b,c[d]);e&&(a-=e)}else a=400;this.b=a;console.log("window.pagespeed.MobLayout.maxWidth="+this.b)}
var Qa="padding-left padding-bottom padding-right padding-top margin-left margin-bottom margin-right margin-top border-left-width border-bottom-width border-right-width border-top-width left top".split(" "),Ra={A:!0,DIV:!0,FORM:!0,H1:!0,H2:!0,H3:!0,H4:!0,P:!0,SPAN:!0,TBODY:!0,TD:!0,TFOOT:!0,TH:!0,THEAD:!0,TR:!0},Sa=["left","width"];
function Ta(a,b){if(!b)return!0;var c=b.tagName.toUpperCase();return"SCRIPT"==c||"STYLE"==c||"IFRAME"==c||b.id&&a.O[b.id]||b.classList.contains("psmob-nav-panel")||b.classList.contains("psmob-header-bar")||b.classList.contains("psmob-header-spacer-div")||b.classList.contains("psmob-logo-span")}function U(a,b){var c=M(b);return Ta(a,c)?null:c}function V(a){var b=[];for(a=a.firstChild;a;a=a.nextSibling)null!=M(a)&&b.push(a);return b}
function Ua(a,b,c){for(b=b.firstChild;b;b=b.nextSibling)null!=U(a,b)&&c.call(a,b)}n=T.prototype;
n.X=function(a){var b=window.getComputedStyle(a),c=L(a);if(c){var c=Va(this.l,c),d;if(d=c&&c.width&&c.height)"auto"==b.getPropertyValue("background-size")?d=!1:(d=b.getPropertyValue("background-position"),"none"==d?d=!1:(d=d.split(" "),d=2==d.length&&null!=H(d[0])&&null!=H(d[1])?!0:!1)),d=!d;if(d){d=c.width;c=c.height;if(d>this.b){c=Math.round(this.b/d*c);d="background-size:"+this.b+"px "+c+"px;background-repeat:no-repeat;";var e=I(b,"height");c==e&&(d+="height:"+c+"px;");Ba(a,d)}K(a,"min-height",
""+c+"px")}}if("PRE"==a.tagName.toUpperCase()||"pre"==b.getPropertyValue("white-space")&&a.offsetWidth>this.b)a.style.overflowX="scroll";Ua(this,a,this.X)};function Wa(a){K(a,"overflow-x","auto");K(a,"width","auto");K(a,"display","block")}n.oa=function(a){Xa(this,a,0)};
function Xa(a,b,c){var d;if(d=Ca(b))c=d.top,d=d.bottom;else{if(b.offsetParent==b.parentNode)c+=b.offsetTop;else if(b.offsetParent!=b.parentNode.parentNode)return null;d=c+b.offsetHeight-1}if(Ta(a,b))return d;d=c-1;var e=window.getComputedStyle(b);if(!e)return null;var f=I(e,"min-height");null!=f&&(d+=f);for(var f=c+b.offsetHeight-1,g=!1,k=!1,h,l=b.firstChild;l;l=l.nextSibling)if(h=M(l)){var m=window.getComputedStyle(h);m&&"absolute"==m.position&&!Ja(m)&&"0px"!=m.getPropertyValue("height")&&"hidden"!=
m.getPropertyValue("visibility")&&(k=!0);h=Xa(a,h,c);null!=h&&(g=!0,d=Math.max(d,h))}if("fixed"==e.getPropertyValue("position")&&g)return null;a=b.tagName.toUpperCase();"BODY"!=a&&(e=f-c+1,g?d!=f&&(k?K(b,"height",""+(d-c+1)+"px"):K(b,"height","auto")):("IMG"!=a&&0<e&&""==b.style.backgroundSize&&(J(b,"height"),K(b,"height","auto"),b.offsetHeight&&(f=c+b.offsetHeight)),d=f));return d}
n.W=function(a){for(var b=V(a),c=0;c<b.length;++c)this.W(b[c]);if(!(a.offsetWidth<=this.b))if(b=a.tagName.toUpperCase(),"TABLE"==b){a:{b=0;for(c=a.firstChild;c;c=c.nextSibling)for(var d=c.firstChild;d;d=d.nextSibling){var e=c.tagName.toUpperCase();if("THEAD"==e||"TFOOT"==e){b=!0;break a}for(e=d.firstChild;e;e=e.nextSibling){if(e.tagName&&"TH"==e.tagName.toUpperCase()){b=!0;break a}++b}}b=3*Ya(this,a)>b?!1:!0}if(b)Wa(a);else if("CSS1Compat"!==document.compatMode){var f,g,k,h=document.createElement("DIV");
h.style.display="inline-block";for(var l=V(a),b=0;b<l.length;++b)for(var m=V(l[b]),c=0;c<m.length;++c)for(var q=V(m[c]),d=0;d<q.length;++d)if(g=q[d],1==g.childNodes.length)f=g.childNodes[0],g.removeChild(f),h.appendChild(f);else if(1<g.childNodes.length){k=document.createElement("DIV");k.style.display="inline-block";for(var t=V(g),e=0;e<t.length;++e)f=t[e],g.removeChild(f),k.appendChild(f);h.appendChild(k)}a.parentNode.replaceChild(h,a)}else for(J(a,"width"),K(a,"max-width","100%"),a=a.firstChild;a;a=
a.nextSibling)if(b=M(a),null!=b)for(J(b,"width"),K(b,"max-width","100%"),b=b.firstChild;b;b=b.nextSibling)if(c=M(b),null!=c&&"TR"==c.tagName.toUpperCase())for(J(c,"width"),K(c,"max-width","100%"),c=c.firstChild;c;c=c.nextSibling)d=M(c),null!=d&&"TD"==d.tagName.toUpperCase()&&(K(d,"max-width","100%"),K(d,"display","inline-block"))}else{c=null;d=a.offsetWidth;e=a.offsetHeight;f="img";if("IMG"==b)c=a.getAttribute("src");else if(f="background-image",c=L(a),g=null==c?null:Va(this.l,c))d=g.width,e=g.height;
null!=c?(g=d/this.b,1<g&&(g=e/g,console.log("Shrinking "+f+" "+c+" from "+d+"x"+e+" to "+this.b+"x"+g),"IMG"==b?(K(a,"width",""+this.b+"px"),K(a,"height",""+g+"px")):K(a,"background-size",""+this.b+"px "+g+"px"))):"CODE"==b||"PRE"==b||"UL"==b?Wa(a):Ra[b]?(K(a,"max-width","100%"),J(a,"width")):console.log("Punting on resize of "+b+" which wants to be "+a.offsetWidth+" but this.maxWidth_="+this.b)}};
function Ya(a,b){var c=0,d=b.tagName.toUpperCase();"DIV"!=d&&"TABLE"!=d&&"UL"!=d||++c;for(d=b.firstChild;d;d=d.nextSibling){var e=M(d);null!=e&&(c+=Ya(a,e))}return c}n.ga=function(a){var b=document.body.style.display;document.body.style.display="none";this.L(a);document.body.style.display=b};
n.L=function(a){var b=window.getComputedStyle(a);"nowrap"==b.getPropertyValue("white-space")&&K(a,"white-space","normal");Ua(this,a,this.L);var b=window.getComputedStyle(a),c,d,e;for(c=0;c<Sa.length;++c)d=Sa[c],(e=b.getPropertyValue(d))&&"100%"!=e&&"auto"!=e&&0<e.length&&"%"==e[e.length-1]&&K(a,d,"auto");c=a.tagName.toUpperCase();var f="UL"==c||"OL"==c,g="BODY"==c,k=!1,h="";for(c=0;c<Qa.length;++c){d=Qa[c];if(e=f)e=d.length-5,e=0<=e&&d.indexOf("-left",e)==e;e||g&&0==d.lastIndexOf("margin-",0)||(e=
I(b,d),null!=e&&(4<e?h+=d+":4px !important;":0>e&&(k=!0,"margin-bottom"==d&&(k=-30<e),k?h+=d+":0px !important;":a.setAttribute("data-pagespeed-negative-bottom-margin","1"))))}Ba(a,h)};
n.V=function(a){Ua(this,a,this.V);if("IMG"==a.tagName.toUpperCase()){var b=window.getComputedStyle(a),c=Aa(a,"width"),d=Aa(a,"height");if(c&&d&&b){var e=I(b,"width"),b=I(b,"height");if(e&&b&&(e/=c,b/=d,.95<(e>b?b/e:e/b)||(console.log("aspect ratio problem for "+a.getAttribute("src")),1==a.naturalHeight&&1==a.naturalWidth?(b=Math.min(e,b),J(a,"width"),J(a,"height"),a.style.width=c*b,a.style.height=d*b):e>b?J(a,"height"):(J(a,"width"),J(a,"height"),a.style.maxHeight=d)),.25>e)){for(console.log("overshrinkage for "+
a.getAttribute("src"));a&&a.tagName&&"TD"!=a.tagName.toUpperCase();)a=a.parentNode;if(a&&(c=a.parentNode)){d=0;for(a=c.firstChild;a;a=a.nextSibling)a.tagName&&"TD"==a.tagName.toUpperCase()&&++d;if(1<d)for(d="width:"+Math.round(100/d)+"%;",c=c.firstChild;c;c=c.nextSibling)a=M(c),null!=a&&"TD"==a.tagName.toUpperCase()&&Ba(a,d)}}}}};
n.Y=function(a){var b=window.getComputedStyle(a).getPropertyValue("position");if("fixed"==b)return"fixed";if(a.classList.contains("nivoSlider"))return b;var c,d,e,f,g=[];c=null;var k,h=!1;for(d=a.firstChild;d;d=d.nextSibling)if(e=U(this,d),null!=e){var l=window.getComputedStyle(e);f=this.Y(e);if("fixed"!=f&&null!=l&&null!=U(this,e)){"absolute"!=f||Ja(l)||K(e,"position","relative");f=l.getPropertyValue("float");var m="right"==f;k="inline-block";if(m||"left"==f)m&&"right"==l.getPropertyValue("clear")&&
(m=!1,k="block",c&&h&&K(c,"margin-bottom","0px")),K(e,"float","none"),"none"!=l.getPropertyValue("display")&&K(e,"display",k);m&&g.push(e);c=e;e=I(l,"margin-bottom");h=null!=e&&0>e}}for(c=g.length-1;0<=c;--c)d=g[c],a.removeChild(d);for(c=g.length-1;0<=c;--c)d=g[c],a.appendChild(d);return b};
n.Q=function(a){if("fixed"!=window.getComputedStyle(a).getPropertyValue("position")){var b,c,d,e=[],f=[];for(c=a.firstChild;c;c=c.nextSibling)if(d=U(this,c),null!=d){b=window.getComputedStyle(d);var g=b.getPropertyValue("position");"fixed"!=g&&"absolute"!=g&&0!=c.offsetWidth&&(e.push(d),f.push(b))}var k=null;for(c=0;c<e.length;++c)d=e[c],b=c<e.length-1?e[c+1]:null,g=d.offsetLeft+d.offsetWidth,(null==k||d.offsetLeft<k)&&(null==b||b.offsetLeft<g)&&(b=d,k=b.tagName.toUpperCase(),"INPUT"!=k&&"SELECT"!=
k&&(""==b.style.backgroundSize&&"auto"!=f[c].width&&K(b,"width","auto"),"IMG"!=k&&b.removeAttribute("width"),J(b,"border-left"),J(b,"border-right"),J(b,"margin-left"),J(b,"margin-right"),J(b,"padding-left"),J(b,"padding-right"),b.className=""!=b.className?b.className+" psSingleColumn":"psSingleColumn"),this.Q(d)),a.getAttribute("data-pagespeed-negative-bottom-margin")&&(a.removeAttribute("data-pagespeed-negative-bottom-margin"),b=window.getComputedStyle(a),d=I(b,"height"),null!=d&&K(a,"margin-bottom",
""+-d+"px")),k=g}};var W=[T.prototype.X,"shrink wide elements",T.prototype.Y,"string floats",T.prototype.ga,"cleanup styles",T.prototype.V,"repair distored images",T.prototype.W,"resize if too wide",T.prototype.Q,"expand columns",T.prototype.oa,"resize vertically"];function Za(a){this.l=a;this.K=[]}function $a(){this.k=-1;this.g=this.la=null;this.d="";this.backgroundColor=this.fa=this.backgroundImage=this.da=this.c=this.i=null}n=Za.prototype;n.J=20;n.I=10;n.n=200;n.ba=400;n.H=6E3;n.ca=.5;
function X(a,b,c,d,e){var f=Ia(b),g="hidden"!=ab(b),k=f.width*f.height,h=f.width>a.J&&f.height>a.I&&k>a.ba&&f.top<a.H&&f.height<a.n;if(g&&h&&k>=c&&k<=d){var k=g=null,l;for(l in N)if(k=Q(b,N[l])){g=N[l];h=!0;if("IMG"==g){var m=Va(a.l,b.src);m?(f.width=m.width,f.height=m.height):b.naturalWidth?(f.width=b.naturalWidth,f.height=b.naturalHeight):(console.log("Image "+b.src+" may be the logo. It has not been loaded so may be missed."),h=!1);h&&(f.width<=a.J||f.height<=a.I||f.height>=a.n)&&(h=!1)}if(h)return a=
new $a,a.d=k,a.g=b,a.i=g,a.c=f,a}}if(e)for(b=b.firstChild;b;b=b.nextSibling){if(f=M(b),null!=f&&(f=X(a,f,c,d,e)))return f}else if(b.parentNode&&(b=M(b.parentNode),null!=b))return X(a,b,c,d,e);return null}
function bb(a,b,c){var d;a:{var e=Ia(b);d="hidden"!=ab(b);if(e.top<a.H&&e.height<a.n&&d){d=0;b.title&&(d+=x(b.title,"logo"));b.id&&(d+=x(b.id,"logo"));b.className&&(d+=x(b.className,"logo"));b.alt&&(d+=x(b.alt,"logo"));var f;f=document.domain.toLowerCase().split(".");var g=f.length;f=4<g&&2==f[g-3].length?f[g-5]:3<g?f[g-4]:null;g=0;f&&(b.id&&(d+=x(b.id,f)),b.className&&(d+=x(b.className,f)),b.title&&(g+=0<=P(b.title).indexOf(P(f))?1:0),b.alt&&(g+=0<=P(b.alt).indexOf(P(f))?1:0));var k=e.width*e.height;
(e=X(a,b,k*a.ca,k,!0))||(e=X(a,b,k,Infinity,!1));if(e){k=e.d;if(!k||0<=k.indexOf("data:image/"))k="";else{var h=k.lastIndexOf("/");0>h?h=0:++h;var l=k.indexOf(".",h);0>l&&(l=k.length);k=k.substring(h,l)}b:{if(h=k)if(h=h.toLowerCase(),0<=h.indexOf("logo")&&0>h.indexOf("logout")&&0>h.indexOf("no_logo")&&0>h.indexOf("no-logo")){h=1;break b}h=0}k&&f&&(g+=0<=P(k).indexOf(P(f))?1:0);d=d+h+g;if(0<d){e.k=d;e.la=b;d=e;break a}}}d=null}d&&(a.K.push(d),++c);for(b=b.firstChild;b;b=b.nextSibling)d=M(b),null!=
d&&bb(a,d,c)}
function cb(a){var b=null,c=a.K;if(!c||0==c.length)return null;if(1==c.length)return b=c[0];var d=1,e=0,f=Infinity,g;for(a=0;b=c[a];++a)g=b.c,f=Math.min(f,g.top),e=Math.max(e,g.bottom),b=g.width*g.height,d=Math.max(d,b);for(a=0;b=c[a];++a)g=b.c,b.k=g.width*g.height/d*b.k*(1-(g.top-f)/(e-f));for(a=g=0;b=c[a];++a)g=Math.max(g,b.k);d=[];for(a=0;b=c[a];++a)b.k==g&&d.push(b);if(1==d.length)return b=d[0];c=d[0];e=c.c;for(a=1;b=d[a];++a)if(g=b.c,e.top>g.top||e.top==g.top&&e.left>g.left||e.top==g.top&&e.left==
g.left&&e.width*e.height>g.width*g.height)c=b,e=c.c;return c}
function db(a){if(a=document.defaultView.getComputedStyle(a,null)){var b=a.getPropertyValue("background-color");if(b){a:{a=b.indexOf("(");var c=b.lastIndexOf(")");if(a=0<=a&&c>a?b.substring(a+1,c):null){a=a.split(",");for(var b=[],c=0,d=a.length;c<d;++c)if(b[c]=3!=c?parseInt(a[c],10):parseFloat(a[c]),isNaN(b[c])){a=null;break a}a=3==b.length||4==b.length?b:null}else a="transparent"==b?[0,0,0,0]:null}if(a&&(3==a.length||4==a.length&&0!=a[3]))return a}}return null}
n.run=function(){if(!document.body)return null;bb(this,document.body,0);var a;if((a=cb(this))&&a.g){var b=a.g,c=null;if("IMG"==a.i||"SVG"==a.i)c=Q(b,"background-image");var d=db(b),e=null;for(b.parentNode&&(e=M(b.parentNode));e&&!c&&!d;)b=e,c=Q(b,"IMG")||Q(b,"SVG")||Q(b,"background-image"),d=db(b),e=b.parentNode?M(b.parentNode):null;a.da=b;a.backgroundImage=c;a.backgroundColor=d||[255,255,255];a.fa=Ia(b)}else a=null;return a};w("pagespeed.MobLogo.prototype.run",Za.prototype.run);function eb(){this.u=[];this.Z=!0}eb.prototype.$="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAQAAABNTyozAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAATdJREFUeNrt0klOBTEQREHfDI7FTEn/4M2GBULQo22wK+ICKT1lKQAAAAAAAAAAAAAAAAAA/Jm7rmv3o+W5laU8d1uLspQYLc/SLVF8rsVoefokii9rMVqe9oni21qMlqdtovhhLUbL0y5R/LIWo+VZylKeuuX5t4nW8tRPFBtrMV6gmolic+t9xA/VSjRonl6JBs7TI9HgeVonmiDPvkSPmfO0SjRRnhaJJstTO9GEeWom2s7zVgZVI9HEeWokmjzPvkQPmfNcSZQkz9lEifKcSZQsz9FECfMcSZQ0z95E23ley8S2E6XOcz3R9HmuJUqR53yiNHnOJUqV53iidHmOJUqZZ3+itHn2JXopyd3kOZ9IntVE8qwmkmc1kTyrieRZTSTPaiJ5AAAAAAAAAAAAAAAAAGjgA62rM0XB6dNxAAAAAElFTkSuQmCC";
eb.prototype.aa="R0lGODlhJAAkAPAAAAAA/wAAACH5BAEAAAEALAAAAAAkACQAAAJkjA95y+2e4psURVXzulx73nkUCIoPWZoNmqoWe7kvjMm0JM9ovrE8s/utWkIdrmgEIIFEJGnZC0EDz2lwpPxUT8fMlSmtfJNZ7xemDd40t7W5PZ7A49h5TWQvu+DCtpPeF8NQAAA7";function fb(a,b,c){var d=[];for(b=b.firstChild;b;b=b.nextSibling)"UL"==b.tagName?d=ia(d,fb(a,b,c+1)):("A"==b.tagName&&(b.setAttribute("data-mobilize-nav-level",c),d.push(b)),d=ia(d,fb(a,b,c)));return d}
function gb(){var a=document.querySelector(".psmob-nav-panel"),b=document.querySelector(".psmob-header-bar");G(b,"open");G(a,"open");G(document.body,"noscroll")}function hb(a){var b=document.querySelector(".psmob-menu-button");document.body.addEventListener("click",function(a){if(b.contains(a.target))gb();else{var d=document.querySelector(".psmob-nav-panel");E(d,"open")&&!d.contains(a.target)&&(gb(),a.stopPropagation(),a.preventDefault())}}.bind(a),!0)}
function ib(){document.querySelector("nav.psmob-nav-panel > ul").addEventListener("click",function(a){var b=a.target;a=u(b)&&1==b.nodeType&&E(a.target,"psmob-menu-expand-icon")?a.target.parentNode:a.target;"DIV"==a.tagName&&(G(a.nextSibling,"open"),G(a.firstChild,"open"))})};function jb(){this.S=null}
jb.prototype.ha=function(a,b,c){var d=document.createElement("span");d.id="psmob-logo-span";if(a&&a.d){var e=document.createElement("IMG");e.src=a.d;e.style.backgroundColor=O(b);e.id="psmob-logo-image";d.appendChild(e)}else d.innerHTML=window.location.host;e=document.createElement("button");F(e,"psmob-menu-button");var f=document.createElement("div");F(f,"psmob-hamburger-div");e.appendChild(f);for(var g=O(c),k=0;3>k;++k){var h=document.createElement("div");F(h,"psmob-hamburger-line");h.style.backgroundColor=
g;f.appendChild(h)}b=new Fa(c,b,e,d);if(a&&a.g&&a.i)switch(c=a.g,a.i){case "IMG":case "SVG":c.parentNode.removeChild(c);break;case "background-image":c.style.backgroundImage="none"}this.ia(b)};function Y(){this.p=0;this.j={};this.pa=Date.now();this.M=!1;this.f=this.D=this.U=this.a=this.e=0;this.t=!1;this.F=this.B=0;this.q=new T(this);this.q.O["ps-progress-scrim"]=!0}var kb=new za(-1,-1);function mb(a){if(0==a.f)if(console.log("mobilizing site"),window.psNavMode&&!Da()){++a.B;var b=a.ka.bind(a);b||alert("Not expecting to start onloads after the callback is called");var c=new jb;c.ia=b;c.S=(new Za(a)).run();(new R).run(c.S,v(c.ha,c))}else nb(a);else a.t=!0}
Y.prototype.ka=function(a){--this.B;Z(this,this.e,"extract theme");var b=new eb;console.log("Starting nav resynthesis.");var c;if(window.pagespeedNavigationalIds){var d=window.pagespeedNavigationalIds.length;c=Array(d);for(var e=0;e<d;e++){var f=window.pagespeedNavigationalIds[e];c[e]=document.getElementById(f)||document.querySelector("[id="+Ka(f)+"]")}}else c=[];b.u=c;c=document.getElementsByTagName("*");for(d=0;e=c[d];d++){f=window.getComputedStyle(e);if("fixed"==f.getPropertyValue("position")){var g=
e.getBoundingClientRect().top;e.style.top=String(60+g)+"px"}999999<=f.getPropertyValue("z-index")&&(console.log("Element z-index exceeded 999999, setting to 999998."),e.style.zIndex=999998)}d=document.createElement("div");document.body.insertBefore(d,document.body.childNodes[0]);F(d,"psmob-header-spacer-div");c=document.createElement("header");document.body.insertBefore(c,d);F(c,"psmob-header-bar");c.appendChild(a.na);c.appendChild(a.ma);c.style.borderBottom="thin solid "+O(a.s);c.style.backgroundColor=
O(a.T);window.psAddCallButton&&(d=document.createElement("button"),F(d,"psmob-call-button"),e=document.createElement("img"),f=a.s,g=window.atob(b.aa),e.src="data:image/gif;base64,"+window.btoa(g.substring(0,13)+String.fromCharCode(f[0],f[1],f[2])+g.substring(16,g.length)),d.appendChild(e),c.appendChild(d));c=b.Z?O(a.T):"#3c78d8";a=b.Z?O(a.s):"white";d=document.createElement("style");d.type="text/css";d.appendChild(document.createTextNode(".psmob-header-bar { background-color: "+c+" }\n.psmob-nav-panel { background-color: "+
a+" }\n.psmob-nav-panel > ul li { color: "+c+" }\n.psmob-nav-panel > ul li a { color: "+c+" }\n"));document.head.appendChild(d);if(0!=b.u.length&&!Da()){a=document.body.insertBefore(document.createElement("nav"),document.getElementsByClassName("psmob-header-bar")[0].nextSibling);F(a,"psmob-nav-panel");a=a.appendChild(document.createElement("ul"));F(a,"open");for(c=0;d=b.u[c];c++){d.setAttribute("data-mobilize-nav-section",c);e=fb(b,d,0);f=[];f.push(a);for(var g=0,k=e.length;g<k;g++){var h=e[g].getAttribute("data-mobilize-nav-level"),
l=g+1==k?h:e[g+1].getAttribute("data-mobilize-nav-level");if(h<l){var m=document.createElement("li"),h=m.appendChild(document.createElement("div")),l=h.appendChild(document.createElement("img"));l.setAttribute("src",b.$);F(l,"psmob-menu-expand-icon");h.appendChild(document.createTextNode(e[g].textContent||e[g].innerText));f[f.length-1].appendChild(m);h=document.createElement("ul");m.appendChild(h);f.push(h)}else for(m=document.createElement("li"),f[f.length-1].appendChild(m),m.appendChild(e[g].cloneNode(!0)),
m=h-l;0<m&&1<f.length;)f.pop(),m--}d.parentNode.removeChild(d)}d=document.querySelector(".psmob-nav-panel > ul a");e={};a=[];for(c=0;f=d[c];c++)f.href in e?(g=f.innerHTML.toLowerCase(),-1==e[f.href].indexOf(g)?e[f.href].push(g):"LI"==f.parentNode.tagName&&a.push(f.parentNode)):(e[f.href]=[],e[f.href].push(f.innerHTML.toLowerCase()));for(c=0;d=a[c];c++)d.parentNode.removeChild(d);c=document.querySelectorAll(".psmob-nav-panel *");for(a=0;d=c[a];a++)d.removeAttribute("style"),d.removeAttribute("width"),
d.removeAttribute("height"),"A"==d.tagName&&""==d.innerText&&d.hasAttribute("title")&&d.appendChild(document.createTextNode(d.getAttribute("title")));c=document.querySelectorAll(".psmob-nav-panel img:not(.psmob-menu-expand-icon)");for(a=0;d=c[a];++a)e=Math.min(2*d.naturalHeight,40),d.setAttribute("height",e);hb(b);ib()}Z(this,this.e,"navigation");nb(this)};
Y.prototype.ea=function(a){this.j[a.src]=new za(a.width,a.height);--this.f;Z(this,1E3,"background image");0==this.f&&this.t&&(mb(this),this.t=!1)};function ob(a,b){var c=U(a.q,b);if(null!=c){var d=L(c);if(d&&(0==d.lastIndexOf("http://",0)||0==d.lastIndexOf("https://",0))&&!a.j[d]){a.j[d]=kb;var e=new Image;++a.f;e.onload=a.ea.bind(a,e);e.onerror=e.onload;e.src=d}for(c=c.firstChild;c;c=c.nextSibling)ob(a,c)}}Y.prototype.xhrSendHook=function(){++this.p};
Y.prototype.xhrResponseHook=function(){--this.p;this.a+=this.F;nb(this)};Y.prototype.ja=function(){pb(this,window.psDebugMode);this.e=Ea(document.body);this.F=W.length/2*this.e;this.a+=this.F;window.psNavMode&&Da()&&(this.a+=this.e,this.a+=this.e);if(null!=document.body){for(var a in window.psMobStaticImageInfo){var b=window.psMobStaticImageInfo[a];this.j[a]=new za(b.w,b.h)}ob(this,document.body)}this.a+=1E3*this.f;window.psLayoutMode&&window.pagespeedXhrHijackSetListener(this);mb(this)};
function nb(a){if(0==a.p&&0==a.B&&0==a.f){if(window.psLayoutMode){var b=a.q;if(null!=document.body)for(var c=0;c<W.length;++c){W[c].call(b,document.body);++c;var d=b.l;Z(d,d.e,W[c])}}if(a.M){if(a=document.getElementById("ps-progress-remove"))a.textContent="Remove Progress Bar and show mobilized site"}else qb()}}function Va(a,b){var c=a.j[b];c==kb&&(c=null);return c}
function pb(a,b){a.M=b;var c=document.getElementById("ps-progress-log");c&&(c.style.color=b?"#333":"white");b&&(c=document.getElementById("ps-progress-show-log"))&&(c.style.display="none")}function ab(a){var b=a.getAttribute("ps-save-visibility");b||((a=window.getComputedStyle(a))&&(b=a.getPropertyValue("visibility")),b||(b="visible"));return b}
function Z(a,b,c){a.D+=b;b=100;0<a.a&&(b=Math.round(100*a.D/a.a),100<b&&(b=100));if(b!=a.U){var d=document.getElementById("ps-progress-span");d&&(d.style.width=b+"%");a.U=b}a=""+b+"% "+(Date.now()-a.pa)+"ms: "+c;console.log(a);if(c=document.getElementById("ps-progress-log"))c.textContent+=a+"\n"}function qb(){var a=document.getElementById("ps-progress-scrim");a&&(a.style.display="none",a.parentNode.removeChild(a))}var rb=new Y;window.addEventListener("load",v(rb.ja,rb));
w("psSetDebugMode",function(){pb(rb,!0)});w("psRemoveProgressBar",function(){qb()});})();
