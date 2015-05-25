{% autoescape off %}
//called as sefaria.tag("#element-id");

(function(ns){

    //Test browser support
    var supports = !!document.querySelectorAll && !!window.addEventListener;
    if ( !supports ) return;

    //Libraries
    //XRegExp 2.0.0 <xregexp.com> MIT License
    var XRegExp;XRegExp=XRegExp||function(n){"use strict";function v(n,i,r){var u;for(u in t.prototype)t.prototype.hasOwnProperty(u)&&(n[u]=t.prototype[u]);return n.xregexp={captureNames:i,isNative:!!r},n}function g(n){return(n.global?"g":"")+(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":"")}function o(n,r,u){if(!t.isRegExp(n))throw new TypeError("type RegExp expected");var f=i.replace.call(g(n)+(r||""),h,"");return u&&(f=i.replace.call(f,new RegExp("["+u+"]+","g"),"")),n=n.xregexp&&!n.xregexp.isNative?v(t(n.source,f),n.xregexp.captureNames?n.xregexp.captureNames.slice(0):null):v(new RegExp(n.source,f),null,!0)}function a(n,t){var i=n.length;if(Array.prototype.lastIndexOf)return n.lastIndexOf(t);while(i--)if(n[i]===t)return i;return-1}function s(n,t){return Object.prototype.toString.call(n).toLowerCase()==="[object "+t+"]"}function d(n){return n=n||{},n==="all"||n.all?n={natives:!0,extensibility:!0}:s(n,"string")&&(n=t.forEach(n,/[^\s,]+/,function(n){this[n]=!0},{})),n}function ut(n,t,i,u){var o=p.length,s=null,e,f;y=!0;try{while(o--)if(f=p[o],(f.scope==="all"||f.scope===i)&&(!f.trigger||f.trigger.call(u))&&(f.pattern.lastIndex=t,e=r.exec.call(f.pattern,n),e&&e.index===t)){s={output:f.handler.call(u,e,i),match:e};break}}catch(h){throw h;}finally{y=!1}return s}function b(n){t.addToken=c[n?"on":"off"],f.extensibility=n}function tt(n){RegExp.prototype.exec=(n?r:i).exec,RegExp.prototype.test=(n?r:i).test,String.prototype.match=(n?r:i).match,String.prototype.replace=(n?r:i).replace,String.prototype.split=(n?r:i).split,f.natives=n}var t,c,u,f={natives:!1,extensibility:!1},i={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},r={},k={},p=[],e="default",rt="class",it={"default":/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/,"class":/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/},et=/\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g,h=/([\s\S])(?=[\s\S]*\1)/g,nt=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,ft=i.exec.call(/()??/,"")[1]===n,l=RegExp.prototype.sticky!==n,y=!1,w="gim"+(l?"y":"");return t=function(r,u){if(t.isRegExp(r)){if(u!==n)throw new TypeError("can't supply flags when constructing one RegExp from another");return o(r)}if(y)throw new Error("can't call the XRegExp constructor within token definition functions");var l=[],a=e,b={hasNamedCapture:!1,captureNames:[],hasFlag:function(n){return u.indexOf(n)>-1}},f=0,c,s,p;if(r=r===n?"":String(r),u=u===n?"":String(u),i.match.call(u,h))throw new SyntaxError("invalid duplicate regular expression flag");for(r=i.replace.call(r,/^\(\?([\w$]+)\)/,function(n,t){if(i.test.call(/[gy]/,t))throw new SyntaxError("can't use flag g or y in mode modifier");return u=i.replace.call(u+t,h,""),""}),t.forEach(u,/[\s\S]/,function(n){if(w.indexOf(n[0])<0)throw new SyntaxError("invalid regular expression flag "+n[0]);});f<r.length;)c=ut(r,f,a,b),c?(l.push(c.output),f+=c.match[0].length||1):(s=i.exec.call(it[a],r.slice(f)),s?(l.push(s[0]),f+=s[0].length):(p=r.charAt(f),p==="["?a=rt:p==="]"&&(a=e),l.push(p),++f));return v(new RegExp(l.join(""),i.replace.call(u,/[^gimy]+/g,"")),b.hasNamedCapture?b.captureNames:null)},c={on:function(n,t,r){r=r||{},n&&p.push({pattern:o(n,"g"+(l?"y":"")),handler:t,scope:r.scope||e,trigger:r.trigger||null}),r.customFlags&&(w=i.replace.call(w+r.customFlags,h,""))},off:function(){throw new Error("extensibility must be installed before using addToken");}},t.addToken=c.off,t.cache=function(n,i){var r=n+"/"+(i||"");return k[r]||(k[r]=t(n,i))},t.escape=function(n){return i.replace.call(n,/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},t.exec=function(n,t,i,u){var e=o(t,"g"+(u&&l?"y":""),u===!1?"y":""),f;return e.lastIndex=i=i||0,f=r.exec.call(e,n),u&&f&&f.index!==i&&(f=null),t.global&&(t.lastIndex=f?e.lastIndex:0),f},t.forEach=function(n,i,r,u){for(var e=0,o=-1,f;f=t.exec(n,i,e);)r.call(u,f,++o,n,i),e=f.index+(f[0].length||1);return u},t.globalize=function(n){return o(n,"g")},t.install=function(n){n=d(n),!f.natives&&n.natives&&tt(!0),!f.extensibility&&n.extensibility&&b(!0)},t.isInstalled=function(n){return!!f[n]},t.isRegExp=function(n){return s(n,"regexp")},t.matchChain=function(n,i){return function r(n,u){for(var o=i[u].regex?i[u]:{regex:i[u]},f=[],s=function(n){f.push(o.backref?n[o.backref]||"":n[0])},e=0;e<n.length;++e)t.forEach(n[e],o.regex,s);return u===i.length-1||!f.length?f:r(f,u+1)}([n],0)},t.replace=function(i,u,f,e){var c=t.isRegExp(u),s=u,h;return c?(e===n&&u.global&&(e="all"),s=o(u,e==="all"?"g":"",e==="all"?"":"g")):e==="all"&&(s=new RegExp(t.escape(String(u)),"g")),h=r.replace.call(String(i),s,f),c&&u.global&&(u.lastIndex=0),h},t.split=function(n,t,i){return r.split.call(n,t,i)},t.test=function(n,i,r,u){return!!t.exec(n,i,r,u)},t.uninstall=function(n){n=d(n),f.natives&&n.natives&&tt(!1),f.extensibility&&n.extensibility&&b(!1)},t.union=function(n,i){var l=/(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,o=0,f,h,c=function(n,t,i){var r=h[o-f];if(t){if(++o,r)return"(?<"+r+">"}else if(i)return"\\"+(+i+f);return n},e=[],r,u;if(!(s(n,"array")&&n.length))throw new TypeError("patterns must be a nonempty array");for(u=0;u<n.length;++u)r=n[u],t.isRegExp(r)?(f=o,h=r.xregexp&&r.xregexp.captureNames||[],e.push(t(r.source).source.replace(l,c))):e.push(t.escape(r));return t(e.join("|"),i)},t.version="2.0.0",r.exec=function(t){var r,f,e,o,u;if(this.global||(o=this.lastIndex),r=i.exec.apply(this,arguments),r){if(!ft&&r.length>1&&a(r,"")>-1&&(e=new RegExp(this.source,i.replace.call(g(this),"g","")),i.replace.call(String(t).slice(r.index),e,function(){for(var t=1;t<arguments.length-2;++t)arguments[t]===n&&(r[t]=n)})),this.xregexp&&this.xregexp.captureNames)for(u=1;u<r.length;++u)f=this.xregexp.captureNames[u-1],f&&(r[f]=r[u]);this.global&&!r[0].length&&this.lastIndex>r.index&&(this.lastIndex=r.index)}return this.global||(this.lastIndex=o),r},r.test=function(n){return!!r.exec.call(this,n)},r.match=function(n){if(t.isRegExp(n)){if(n.global){var u=i.match.apply(this,arguments);return n.lastIndex=0,u}}else n=new RegExp(n);return r.exec.call(n,this)},r.replace=function(n,r){var e=t.isRegExp(n),u,f,h,o;return e?(n.xregexp&&(u=n.xregexp.captureNames),n.global||(o=n.lastIndex)):n+="",s(r,"function")?f=i.replace.call(String(this),n,function(){var t=arguments,i;if(u)for(t[0]=new String(t[0]),i=0;i<u.length;++i)u[i]&&(t[0][u[i]]=t[i+1]);return e&&n.global&&(n.lastIndex=t[t.length-2]+t[0].length),r.apply(null,t)}):(h=String(this),f=i.replace.call(h,n,function(){var n=arguments;return i.replace.call(String(r),et,function(t,i,r){var f;if(i){if(f=+i,f<=n.length-3)return n[f]||"";if(f=u?a(u,i):-1,f<0)throw new SyntaxError("backreference to undefined group "+t);return n[f+1]||""}if(r==="$")return"$";if(r==="&"||+r==0)return n[0];if(r==="`")return n[n.length-1].slice(0,n[n.length-2]);if(r==="'")return n[n.length-1].slice(n[n.length-2]+n[0].length);if(r=+r,!isNaN(r)){if(r>n.length-3)throw new SyntaxError("backreference to undefined group "+t);return n[r]||""}throw new SyntaxError("invalid token "+t);})})),e&&(n.lastIndex=n.global?0:o),f},r.split=function(r,u){if(!t.isRegExp(r))return i.split.apply(this,arguments);var e=String(this),h=r.lastIndex,f=[],o=0,s;return u=(u===n?-1:u)>>>0,t.forEach(e,r,function(n){n.index+n[0].length>o&&(f.push(e.slice(o,n.index)),n.length>1&&n.index<e.length&&Array.prototype.push.apply(f,n.slice(1)),s=n[0].length,o=n.index+s)}),o===e.length?(!i.test.call(r,"")||s)&&f.push(""):f.push(e.slice(o)),r.lastIndex=h,f.length>u?f.slice(0,u):f},u=c.on,u(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/,function(n,t){if(n[1]==="B"&&t===e)return n[0];throw new SyntaxError("invalid escape "+n[0]);},{scope:"all"}),u(/\[(\^?)]/,function(n){return n[1]?"[\\s\\S]":"\\b\\B"}),u(/(?:\(\?#[^)]*\))+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"}),u(/\\k<([\w$]+)>/,function(n){var t=isNaN(n[1])?a(this.captureNames,n[1])+1:+n[1],i=n.index+n[0].length;if(!t||t>this.captureNames.length)throw new SyntaxError("backreference to undefined group "+n[0]);return"\\"+t+(i===n.input.length||isNaN(n.input.charAt(i))?"":"(?:)")}),u(/(?:\s+|#.*)+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"},{trigger:function(){return this.hasFlag("x")},customFlags:"x"}),u(/\./,function(){return"[\\s\\S]"},{trigger:function(){return this.hasFlag("s")},customFlags:"s"}),u(/\(\?P?<([\w$]+)>/,function(n){if(!isNaN(n[1]))throw new SyntaxError("can't use integer as capture name "+n[0]);return this.captureNames.push(n[1]),this.hasNamedCapture=!0,"("}),u(/\\(\d+)/,function(n,t){if(!(t===e&&/^[1-9]/.test(n[1])&&+n[1]<=this.captureNames.length)&&n[1]!=="0")throw new SyntaxError("can't use octal escape or backreference to undefined group "+n[0]);return n[0]},{scope:"all"}),u(/\((?!\?)/,function(){return this.hasFlag("n")?"(?:":(this.captureNames.push(null),"(")},{customFlags:"n"}),typeof exports!="undefined"&&(exports.XRegExp=t),t}()
    /*! atomic v1.0.0 | (c) 2014 @toddmotto | github.com/toddmotto/atomic */
    !function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b:a.atomic=b(a)}(this,function(a){"use strict";var b={},c=function(a){var b;try{b=JSON.parse(a.responseText)}catch(c){b=a.responseText}return[b,a]},d=function(b,d,e){var f={success:function(){},error:function(){}},g=a.XMLHttpRequest||ActiveXObject,h=new g("MSXML2.XMLHTTP.3.0");return h.open(b,d,!0),h.setRequestHeader("Content-type","application/x-www-form-urlencoded"),h.onreadystatechange=function(){4===h.readyState&&(200===h.status?f.success.apply(f,c(h)):f.error.apply(f,c(h)))},h.send(e),{success:function(a){return f.success=a,f},error:function(a){return f.error=a,f}}};return b.get=function(a){return d("GET",a)},b.put=function(a,b){return d("PUT",a,b)},b.post=function(a,b){return d("POST",a,b)},b["delete"]=function(a){return d("DELETE",a)},b});
    /* findAndReplaceDOMText v 0.4.3 | https://github.com/padolsey/findAndReplaceDOMText */
    !function(e,t){"object"==typeof module&&module.exports?module.exports=t():"function"==typeof define&&define.amd?define(t):e.findAndReplaceDOMText=t()}(this,function(){function e(e){return String(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")}function t(){return n.apply(null,arguments)||r.apply(null,arguments)}function n(e,n,i,o,d){if(n&&!n.nodeType&&arguments.length<=2)return!1;var a="function"==typeof i;a&&(i=function(e){return function(t,n){return e(t.text,n.startIndex)}}(i));var s=r(n,{find:e,wrap:a?null:i,replace:a?i:"$"+(o||"&"),prepMatch:function(e,t){if(!e[0])throw"findAndReplaceDOMText cannot handle zero-length matches";if(o>0){var n=e[o];e.index+=e[0].indexOf(n),e[0]=n}return e.endIndex=e.index+e[0].length,e.startIndex=e.index,e.index=t,e},filterElements:d});return t.revert=function(){return s.revert()},!0}function r(e,t){return new i(e,t)}function i(e,n){var r=n.preset&&t.PRESETS[n.preset];if(n.portionMode=n.portionMode||o,r)for(var i in r)s.call(r,i)&&!s.call(n,i)&&(n[i]=r[i]);this.node=e,this.options=n,this.prepMatch=n.prepMatch||this.prepMatch,this.reverts=[],this.matches=this.search(),this.matches.length&&this.processMatches()}var o="retain",d="first",a=document,s=({}.toString,{}.hasOwnProperty);return t.NON_PROSE_ELEMENTS={br:1,hr:1,script:1,style:1,img:1,video:1,audio:1,canvas:1,svg:1,map:1,object:1,input:1,textarea:1,select:1,option:1,optgroup:1,button:1},t.NON_CONTIGUOUS_PROSE_ELEMENTS={address:1,article:1,aside:1,blockquote:1,dd:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,nav:1,noscript:1,ol:1,output:1,p:1,pre:1,section:1,ul:1,br:1,li:1,summary:1,dt:1,details:1,rp:1,rt:1,rtc:1,script:1,style:1,img:1,video:1,audio:1,canvas:1,svg:1,map:1,object:1,input:1,textarea:1,select:1,option:1,optgroup:1,button:1,table:1,tbody:1,thead:1,th:1,tr:1,td:1,caption:1,col:1,tfoot:1,colgroup:1},t.NON_INLINE_PROSE=function(e){return s.call(t.NON_CONTIGUOUS_PROSE_ELEMENTS,e.nodeName.toLowerCase())},t.PRESETS={prose:{forceContext:t.NON_INLINE_PROSE,filterElements:function(e){return!s.call(t.NON_PROSE_ELEMENTS,e.nodeName.toLowerCase())}}},t.Finder=i,i.prototype={search:function(){function t(e){for(var d=0,p=e.length;p>d;++d){var h=e[d];if("string"==typeof h){if(o.global)for(;n=o.exec(h);)a.push(s.prepMatch(n,r++,i));else(n=h.match(o))&&a.push(s.prepMatch(n,0,i));i+=h.length}else t(h)}}var n,r=0,i=0,o=this.options.find,d=this.getAggregateText(),a=[],s=this;return o="string"==typeof o?RegExp(e(o),"g"):o,t(d),a},prepMatch:function(e,t,n){if(!e[0])throw new Error("findAndReplaceDOMText cannot handle zero-length matches");return e.endIndex=n+e.index+e[0].length,e.startIndex=n+e.index,e.index=t,e},getAggregateText:function(){function e(r,i){if(3===r.nodeType)return[r.data];if(t&&!t(r))return[];var i=[""],o=0;if(r=r.firstChild)do if(3!==r.nodeType){var d=e(r);n&&1===r.nodeType&&(n===!0||n(r))?(i[++o]=d,i[++o]=""):("string"==typeof d[0]&&(i[o]+=d.shift()),d.length&&(i[++o]=d,i[++o]=""))}else i[o]+=r.data;while(r=r.nextSibling);return i}var t=this.options.filterElements,n=this.options.forceContext;return e(this.node)},processMatches:function(){var e,t,n,r=this.matches,i=this.node,o=this.options.filterElements,d=[],a=i,s=r.shift(),p=0,h=0,l=0,c=[i];e:for(;;){if(3===a.nodeType&&(!t&&a.length+p>=s.endIndex?t={node:a,index:l++,text:a.data.substring(s.startIndex-p,s.endIndex-p),indexInMatch:p-s.startIndex,indexInNode:s.startIndex-p,endIndexInNode:s.endIndex-p,isEnd:!0}:e&&d.push({node:a,index:l++,text:a.data,indexInMatch:p-s.startIndex,indexInNode:0}),!e&&a.length+p>s.startIndex&&(e={node:a,index:l++,indexInMatch:0,indexInNode:s.startIndex-p,endIndexInNode:s.endIndex-p,text:a.data.substring(s.startIndex-p,s.endIndex-p)}),p+=a.data.length),n=1===a.nodeType&&o&&!o(a),e&&t){if(a=this.replaceMatch(s,e,d,t),p-=t.node.data.length-t.endIndexInNode,e=null,t=null,d=[],s=r.shift(),l=0,h++,!s)break}else if(!n&&(a.firstChild||a.nextSibling)){a.firstChild?(c.push(a),a=a.firstChild):a=a.nextSibling;continue}for(;;){if(a.nextSibling){a=a.nextSibling;break}if(a=c.pop(),a===i)break e}}},revert:function(){for(var e=this.reverts.length;e--;)this.reverts[e]();this.reverts=[]},prepareReplacementString:function(e,t,n){var r=this.options.portionMode;return r===d&&t.indexInMatch>0?"":(e=e.replace(/\$(\d+|&|`|')/g,function(e,t){var r;switch(t){case"&":r=n[0];break;case"`":r=n.input.substring(0,n.startIndex);break;case"'":r=n.input.substring(n.endIndex);break;default:r=n[+t]}return r}),r===d?e:t.isEnd?e.substring(t.indexInMatch):e.substring(t.indexInMatch,t.indexInMatch+t.text.length))},getPortionReplacementNode:function(e,t,n){var r=this.options.replace||"$&",i=this.options.wrap;if(i&&i.nodeType){var o=a.createElement("div");o.innerHTML=i.outerHTML||(new XMLSerializer).serializeToString(i),i=o.firstChild}if("function"==typeof r)return r=r(e,t,n),r&&r.nodeType?r:a.createTextNode(String(r));var d="string"==typeof i?a.createElement(i):i;return r=a.createTextNode(this.prepareReplacementString(r,e,t,n)),r.data&&d?(d.appendChild(r),d):r},replaceMatch:function(e,t,n,r){var i,o,d=t.node,s=r.node;if(d===s){var p=d;t.indexInNode>0&&(i=a.createTextNode(p.data.substring(0,t.indexInNode)),p.parentNode.insertBefore(i,p));var h=this.getPortionReplacementNode(r,e);return p.parentNode.insertBefore(h,p),r.endIndexInNode<p.length&&(o=a.createTextNode(p.data.substring(r.endIndexInNode)),p.parentNode.insertBefore(o,p)),p.parentNode.removeChild(p),this.reverts.push(function(){i===h.previousSibling&&i.parentNode.removeChild(i),o===h.nextSibling&&o.parentNode.removeChild(o),h.parentNode.replaceChild(p,h)}),h}i=a.createTextNode(d.data.substring(0,t.indexInNode)),o=a.createTextNode(s.data.substring(r.endIndexInNode));for(var l=this.getPortionReplacementNode(t,e),c=[],u=0,f=n.length;f>u;++u){var x=n[u],g=this.getPortionReplacementNode(x,e);x.node.parentNode.replaceChild(g,x.node),this.reverts.push(function(e,t){return function(){t.parentNode.replaceChild(e.node,t)}}(x,g)),c.push(g)}var N=this.getPortionReplacementNode(r,e);return d.parentNode.insertBefore(i,d),d.parentNode.insertBefore(l,d),d.parentNode.removeChild(d),s.parentNode.insertBefore(N,s),s.parentNode.insertBefore(o,s),s.parentNode.removeChild(s),this.reverts.push(function(){i.parentNode.removeChild(i),l.parentNode.replaceChild(d,l),o.parentNode.removeChild(o),N.parentNode.replaceChild(s,N)}),N}},t});

    var base_url = 'http://lev.sefaria.org/'; //'http://www.sefaria.org/';
    var enBooksRe = RegExp("{{ book_title_re.en }}",'gi');
    var heBooksRe = RegExp("{{ book_title_re.he }}",'gi');
    var popUpElem;
    var heBox;
    var enBox;
    var heElems;
    var enElems;

    var setupPopup = function(styles) {
        popUpElem = document.createElement("div");
        popUpElem.id = "sefaria-popup";

        // Set default content for the popup
        popUpElem.innerHTML = popUpElem.innerHTML +
            '<style scoped>' +
                '#sefaria-popup {'+
                    'max-width: 400px;'+
                    'font-size: 16px;'+
                    'border: 1px black solid;'+
                    'background-color: #d3d3d3;'+
                    'color: #222222;'+
                    'padding: 10px 20px 5px 20px;'+
                '}'+
            '</style>'+
            '<span class="sefaria-text en"></span>' +
            '<span class="sefaria-text he" dir="rtl"></span>' +
            '<div class = "sefaria-notice" style="font-size: 10px; margin-top: 10px;">' +
                '<span class="en">Text from Sefaria.org.  Click the reference for full context and commentary.</span>' +
                '<span class="he" dir="rtl">תוכן מספאריה. תלחץ לראות הקשר ופרושים</span>' +
            '</div>';

        // Apply any override styles
        if (styles) {
            for (var n in styles) {
                if (styles.hasOwnProperty(n)) {
                    popUpElem.style[n] = styles[n];
                }
            }
        }

        // Apply function-critical styles
        popUpElem.style.position = "fixed";
        popUpElem.style.overflow = "hidden";
        popUpElem.style.display = "none";

        popUpElem = document.body.appendChild(popUpElem);

        heBox = popUpElem.querySelector(".sefaria-text.he");
        enBox = popUpElem.querySelector(".sefaria-text.en");
        heElems = popUpElem.querySelectorAll(".he");
        enElems = popUpElem.querySelectorAll(".en");
    };

    var showPopup = function(e) {
        var rect = e.getBoundingClientRect();
        popUpElem.style.top = (rect.top > 100)?rect.top - 50 + "px":rect.top + 30 + "px";
        if (rect.left < window.innerWidth / 2) {
            popUpElem.style.left = rect.left + 100 + "px";
            popUpElem.style.right = "auto";
        } else {
            popUpElem.style.left = "auto";
            popUpElem.style.right = window.innerWidth - rect.left + "px";
        }

        var source = ns.sources[e.getAttribute('data-ref')];
        if (source.lang == "en") {
            [].forEach.call(heElems, function(e) {e.style.display = "None"});
            [].forEach.call(enElems, function(e) {e.style.display = "Block"});
        } else if (source.lang == "he") {
            [].forEach.call(heElems, function(e) {e.style.display = "Block"});
            [].forEach.call(enElems, function(e) {e.style.display = "None"});
        }
        enBox.innerHTML = source.en;
        heBox.innerHTML = source.he;

        popUpElem.style.display = "block";
    };
    var hidePopup = function() {
        popUpElem.style.display = "none";
    };



    // Public API
    ns.matches = [];
    ns.sources = {};

    ns.link = function(options) {
        options = options || {};
        var popupStyles = options.popupStyles || {};
        var selector = options.selector || "body";

        setupPopup(popupStyles);

        var elems = document.querySelectorAll(selector);

        //Find text titles in the document
        var bookNames = [];
        for (var i = 0; i < elems.length; i++) {
            //todo: Use the text joining described in http://james.padolsey.com/javascript/replacing-text-in-the-dom-solved to catch titles that span across nodes.
            var re_match;
            //todo: compact this
            while ((re_match = enBooksRe.exec(elems[i].innerHTML)) !== null) {
                bookNames.push(re_match[1]);
                //re_match.index;
            }
            while ((re_match = heBooksRe.exec(elems[i].innerHTML)) !== null) {
                bookNames.push(re_match[1]);
            }
        }
        // todo: hold locations of title matches

        // Get regexes for each of the titles
        atomic.get(base_url + "api/regexs/" + bookNames.join("|"))
            .success(function (data, xhr) {
                //console.log(data);
                if ("error" in data) {
                    console.log(data["error"]);
                    delete data.error;
                }
                for (var book in data) {
                    if (data.hasOwnProperty(book)) {
                        // Run each regex over the document, and wrap results
                        var r = XRegExp(data[book],"xgm");
                        for (var i = 0; i < elems.length; i++) {
                            findAndReplaceDOMText(elems[i], {
                                preset: 'prose',
                                find: r,
                                replace: function(portion, match) {
                                    ns.matches.push(match[0]);

                                    var node = document.createElement("a");
                                    node.className = "sefaria-ref";
                                    node.href = base_url + match[0];
                                    node.setAttribute('data-ref', match[0]);
                                    node.textContent = portion.text;

                                    return node;
                                }
                            });
                        }
                        /*
                        for (var i = 0; i < elems.length; i++) {
                            elems[i].innerHTML = elems[i].innerHTML.replace(r, function(match) {
                                ns.matches.push(match);
                                return "<a class='sefaria-ref' href='" + base_url + match  + "' data-ref='" + match + "'>" + match + "</a>";
                            }, "gm");
                        }
                        */

                    }
                }

                atomic.get(base_url + "api/bulktext/" + ns.matches.join("|"))
                    .success(function (data, xhr) {
                        //Put text data into sefaria.sources
                        ns.sources = data;

                        // Bind a click event and a mouseover event to each link
                        [].forEach.call(document.querySelectorAll('.sefaria-ref'),function(e) {
                            e.setAttribute('href', base_url + ns.sources[e.getAttribute('data-ref')].url);
                            e.addEventListener('mouseover', function(event) {
                                showPopup(this);
                            }, false);
                            e.addEventListener('mouseout', hidePopup, false);
                        });
                    })
                    .error(function (data, xhr) { });  // api/bulktext
            })
            .error(function (data, xhr) { });  // api/regexs
    };

}(this.sefaria = this.sefaria || {}));

{% endautoescape %}