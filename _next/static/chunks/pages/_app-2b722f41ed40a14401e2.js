_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[18],{0:function(e,t,n){n("74v/"),e.exports=n("nOHt")},"20a2":function(e,t,n){e.exports=n("nOHt")},"74v/":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n("cha2")}])},"76vg":function(e,t,n){"use strict";var i=n("TqRt"),o=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("q1tI")),a=(0,i(n("8/g6")).default)(r.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"ChevronLeft");t.default=a},E2gh:function(e,t,n){"use strict";var i=n("TqRt"),o=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("q1tI")),a=(0,i(n("8/g6")).default)(r.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"ChevronRight");t.default=a},"Pz+C":function(e){e.exports=JSON.parse('{"home":{"meta":{"title":"Decision Tracer | Home","description":"Make the right choice with ease","keywords":"Calculator, Decision helper, Corona"}},"common":{"navbar":{"home":"Overview"},"heading":{"logo":"Welcome to Decision Tracer"}},"presets":{"corona":{"meta":{"title":"Should I get vaccinated? | Decision Tracer","description":"Vaccination: Yes or no? Are disadvantages of a vaccination higher than the benefits?","keywords":"Corona, vaccination, decision, help, calculator"},"title":"Corona","question":"Should I get vaccinated?","description":"Simple decision guidance","decisions":{"0":{"title":"No vaccination","sub":{"0":{"title":"No infection"},"1":{"title":"Corona","cases":{"0":{"title":"Asymptomatic"},"1":{"title":"Mild progression"},"2":{"title":"Difficult progression"},"3":{"title":"Death"}}}}},"1":{"title":"Vaccination","sub":{"0":{"title":"No infection"},"1":{"title":"Corona","cases":{"0":{"title":"Asymptomatic"},"1":{"title":"Mild progression"},"2":{"title":"Difficult progression"},"3":{"title":"Death"}}},"2":{"title":"Vaccination damage"}}}}},"corona-2":{"meta":{"title":"Should I get vaccinated? | Decision Tracer","description":"Vaccination: Yes or no? Are disadvantages of a vaccination higher than the benefits?","keywords":"Corona, vaccination, decision, help, calculator, complex"},"title":"Corona (complex)","question":"Should I get vaccinated?","description":"Decision guidance with complex decision tree","decisions":{"0":{"title":"No vaccination","sub":{"0":{"title":"No infection"},"1":{"title":"Corona","cases":{"0":{"title":"Asymptomatic"},"1":{"title":"Mild progression","subcases":{"0":{"title":"Long Covid"},"1":{"title":"Unforeseeable consequences "},"2":{"title":"Complete Healing"}}},"2":{"title":"Difficult progression","subcases":{"0":{"title":"Long Covid"},"1":{"title":"Unforeseeable consequences"},"2":{"title":"Complete healing"}}},"3":{"title":"Death"}}},"2":{"title":"Infect other people"},"3":{"title":"Positive or negative gut feeling"}}},"1":{"title":"Vaccination","sub":{"0":{"title":"No infection"},"1":{"title":"Corona","cases":{"0":{"title":"Asymptomatic"},"1":{"title":"Mild progression","subcases":{"0":{"title":"Long Covid"},"1":{"title":"Unforeseeable consequences"},"2":{"title":"Complete Healing"}}},"2":{"title":"schwerer Verlauf","subcases":{"0":{"title":"Long Covid"},"1":{"title":"Unforeseeable consequences"},"2":{"title":"Complete Healing"}}},"3":{"title":"Death"}}},"2":{"title":"Infect other people"},"3":{"title":"Positive or negative gut feeling"},"4":{"title":"Usual vaccine reaction"},"5":{"title":"Severe vaccine reaction"},"6":{"title":"Unforeseeable consequences"}}}}}},"calculator":{"new_decision":"Decision","probability":"Occurence probability","probability_short":"Prob. (\ud835\udc5d)","value":"Utility","expected_utility":"Expected utility","subcases":"Cases","subCasesItems":"Sub cases","add_scenario":"Add scenario","add_case":"Add case","add_sub_case":"Add sub case","remove_scenario":"Delete scenario","remove_sub_case":"Delete sub case","remove_case":"Delete case","remove_decision":"Delete decision","independent":"independent","result":"Result"}}')},YFqc:function(e,t,n){e.exports=n("cTJO")},cTJO:function(e,t,n){"use strict";var i=n("zoAU"),o=n("7KCV");t.__esModule=!0,t.default=void 0;var r=o(n("q1tI")),a=n("elyg"),c=n("nOHt"),s=n("vNVm"),l={};function u(e,t,n,i){if(e&&(0,a.isLocalURL)(t)){e.prefetch(t,n,i).catch((function(e){0}));var o=i&&"undefined"!==typeof i.locale?i.locale:e&&e.locale;l[t+"%"+n+(o?"%"+o:"")]=!0}}var d=function(e){var t=!1!==e.prefetch,n=(0,c.useRouter)(),o=n&&n.pathname||"/",d=r.default.useMemo((function(){var t=(0,a.resolveHref)(o,e.href,!0),n=i(t,2),r=n[0],c=n[1];return{href:r,as:e.as?(0,a.resolveHref)(o,e.as):c||r}}),[o,e.href,e.as]),p=d.href,f=d.as,g=e.children,h=e.replace,b=e.shallow,m=e.scroll,v=e.locale;"string"===typeof g&&(g=r.default.createElement("a",null,g));var O=r.Children.only(g),j=O&&"object"===typeof O&&O.ref,y=(0,s.useIntersection)({rootMargin:"200px"}),x=i(y,2),w=x[0],k=x[1],S=r.default.useCallback((function(e){w(e),j&&("function"===typeof j?j(e):"object"===typeof j&&(j.current=e))}),[j,w]);(0,r.useEffect)((function(){var e=k&&t&&(0,a.isLocalURL)(p),i="undefined"!==typeof v?v:n&&n.locale,o=l[p+"%"+f+(i?"%"+i:"")];e&&!o&&u(n,p,f,{locale:i})}),[f,p,k,v,t,n]);var E={ref:S,onClick:function(e){O.props&&"function"===typeof O.props.onClick&&O.props.onClick(e),e.defaultPrevented||function(e,t,n,i,o,r,c,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,a.isLocalURL)(n))&&(e.preventDefault(),null==c&&(c=i.indexOf("#")<0),t[o?"replace":"push"](n,i,{shallow:r,locale:s,scroll:c}).then((function(e){e&&c&&document.body.focus()})))}(e,n,p,f,h,b,m,v)},onMouseEnter:function(e){(0,a.isLocalURL)(p)&&(O.props&&"function"===typeof O.props.onMouseEnter&&O.props.onMouseEnter(e),u(n,p,f,{priority:!0}))}};if(e.passHref||"a"===O.type&&!("href"in O.props)){var C="undefined"!==typeof v?v:n&&n.locale,P=n&&n.isLocaleDomain&&(0,a.getDomainLocale)(f,C,n&&n.locales,n&&n.domainLocales);E.href=P||(0,a.addBasePath)((0,a.addLocale)(f,C,n&&n.defaultLocale))}return r.default.cloneElement(O,E)};t.default=d},cha2:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return it}));var i=n("nKUr"),o=n("cpVT"),r=n("q1tI"),a=n.n(r),c=n("wx14"),s=(n("17x9"),n("OKji")),l=n("aXM8"),u=n("hfi/");var d=function(e){var t=e.children,n=e.theme,i=Object(l.a)(),o=a.a.useMemo((function(){var e=null===i?n:function(e,t){return"function"===typeof t?t(e):Object(c.a)({},e,t)}(i,n);return null!=e&&(e[u.a]=null!==i),e}),[n,i]);return a.a.createElement(s.a.Provider,{value:o},t)},p=n("JSsD"),f=n("H2TA"),g={WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box"},h=function(e){return Object(c.a)({color:e.palette.text.primary},e.typography.body2,{backgroundColor:e.palette.background.default,"@media print":{backgroundColor:e.palette.common.white}})};var b=Object(f.a)((function(e){return{"@global":{html:g,"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:Object(c.a)({margin:0},h(e),{"&::backdrop":{backgroundColor:e.palette.background.default}})}}}),{name:"MuiCssBaseline"})((function(e){var t=e.children,n=void 0===t?null:t;return e.classes,r.createElement(r.Fragment,null,n)})),m=n("XzT5"),v=n("z7pX"),O=n("1OyB"),j=n("vuIU"),y=[],x=y.forEach,w=y.slice;function k(e){return x.call(w.call(arguments,1),(function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])})),e}var S=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,E=function(e,t,n){var i=n||{};i.path=i.path||"/";var o=e+"="+encodeURIComponent(t);if(i.maxAge>0){var r=i.maxAge-0;if(isNaN(r))throw new Error("maxAge should be a Number");o+="; Max-Age="+Math.floor(r)}if(i.domain){if(!S.test(i.domain))throw new TypeError("option domain is invalid");o+="; Domain="+i.domain}if(i.path){if(!S.test(i.path))throw new TypeError("option path is invalid");o+="; Path="+i.path}if(i.expires){if("function"!==typeof i.expires.toUTCString)throw new TypeError("option expires is invalid");o+="; Expires="+i.expires.toUTCString()}if(i.httpOnly&&(o+="; HttpOnly"),i.secure&&(o+="; Secure"),i.sameSite)switch("string"===typeof i.sameSite?i.sameSite.toLowerCase():i.sameSite){case!0:o+="; SameSite=Strict";break;case"lax":o+="; SameSite=Lax";break;case"strict":o+="; SameSite=Strict";break;case"none":o+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return o},C=function(e,t,n,i){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{path:"/",sameSite:"strict"};n&&(o.expires=new Date,o.expires.setTime(o.expires.getTime()+60*n*1e3)),i&&(o.domain=i),document.cookie=E(e,encodeURIComponent(t),o)},P=function(e){for(var t=e+"=",n=document.cookie.split(";"),i=0;i<n.length;i++){for(var o=n[i];" "===o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return null},D={name:"cookie",lookup:function(e){var t;if(e.lookupCookie&&"undefined"!==typeof document){var n=P(e.lookupCookie);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupCookie&&"undefined"!==typeof document&&C(t.lookupCookie,e,t.cookieMinutes,t.cookieDomain,t.cookieOptions)}},I={name:"querystring",lookup:function(e){var t;if("undefined"!==typeof window)for(var n=window.location.search.substring(1).split("&"),i=0;i<n.length;i++){var o=n[i].indexOf("=");if(o>0)n[i].substring(0,o)===e.lookupQuerystring&&(t=n[i].substring(o+1))}return t}},T=null,N=function(){if(null!==T)return T;try{T="undefined"!==window&&null!==window.localStorage;var e="i18next.translate.boo";window.localStorage.setItem(e,"foo"),window.localStorage.removeItem(e)}catch(t){T=!1}return T},L={name:"localStorage",lookup:function(e){var t;if(e.lookupLocalStorage&&N()){var n=window.localStorage.getItem(e.lookupLocalStorage);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupLocalStorage&&N()&&window.localStorage.setItem(t.lookupLocalStorage,e)}},M=null,_=function(){if(null!==M)return M;try{M="undefined"!==window&&null!==window.sessionStorage;var e="i18next.translate.boo";window.sessionStorage.setItem(e,"foo"),window.sessionStorage.removeItem(e)}catch(t){M=!1}return M},R={name:"sessionStorage",lookup:function(e){var t;if(e.lookupSessionStorage&&_()){var n=window.sessionStorage.getItem(e.lookupSessionStorage);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupSessionStorage&&_()&&window.sessionStorage.setItem(t.lookupSessionStorage,e)}},A={name:"navigator",lookup:function(e){var t=[];if("undefined"!==typeof navigator){if(navigator.languages)for(var n=0;n<navigator.languages.length;n++)t.push(navigator.languages[n]);navigator.userLanguage&&t.push(navigator.userLanguage),navigator.language&&t.push(navigator.language)}return t.length>0?t:void 0}},z={name:"htmlTag",lookup:function(e){var t,n=e.htmlTag||("undefined"!==typeof document?document.documentElement:null);return n&&"function"===typeof n.getAttribute&&(t=n.getAttribute("lang")),t}},q={name:"path",lookup:function(e){var t;if("undefined"!==typeof window){var n=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(n instanceof Array)if("number"===typeof e.lookupFromPathIndex){if("string"!==typeof n[e.lookupFromPathIndex])return;t=n[e.lookupFromPathIndex].replace("/","")}else t=n[0].replace("/","")}return t}},U={name:"subdomain",lookup:function(e){var t;if("undefined"!==typeof window){var n=window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);n instanceof Array&&(t="number"===typeof e.lookupFromSubdomainIndex?n[e.lookupFromSubdomainIndex].replace("http://","").replace("https://","").replace(".",""):n[0].replace("http://","").replace("https://","").replace(".",""))}return t}};var F=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(O.a)(this,e),this.type="languageDetector",this.detectors={},this.init(t,n)}return Object(j.a)(e,[{key:"init",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.services=e,this.options=k(t,this.options||{},{order:["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag"],lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",lookupSessionStorage:"i18nextLng",caches:["localStorage"],excludeCacheFor:["cimode"]}),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=n,this.addDetector(D),this.addDetector(I),this.addDetector(L),this.addDetector(R),this.addDetector(A),this.addDetector(z),this.addDetector(q),this.addDetector(U)}},{key:"addDetector",value:function(e){this.detectors[e.name]=e}},{key:"detect",value:function(e){var t=this;e||(e=this.options.order);var n=[];return e.forEach((function(e){if(t.detectors[e]){var i=t.detectors[e].lookup(t.options);i&&"string"===typeof i&&(i=[i]),i&&(n=n.concat(i))}})),this.services.languageUtils.getBestMatchFromCodes?n:n.length>0?n[0]:null}},{key:"cacheUserLanguage",value:function(e,t){var n=this;t||(t=this.options.caches),t&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(e)>-1||t.forEach((function(t){n.detectors[t]&&n.detectors[t].cacheUserLanguage(e,n.options)})))}}]),e}();F.type="languageDetector";var W=F,H=["en","de"],V=Object.assign.apply(Object,[{}].concat(Object(v.a)(Object.keys(H).map((function(e){return Object(o.a)({},H[e],{translations:n("eP7u")("./"+H[e]+"/translation.json")})})))));m.a.use(W).init({detection:{order:["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag","path","subdomain"],lookupCookie:"lng",lookupLocalStorage:"lng",lookupFromPathIndex:0,lookupFromSubdomainIndex:0,caches:["localStorage","cookie"],excludeCacheFor:["cimode"],cookieOptions:{path:"/",sameSite:"strict"}},fallbackLng:"de",resources:V,ns:["translations"],defaultNS:"translations",returnObjects:!0,debug:!1,interpolation:{escapeValue:!1},react:{wait:!0}});m.a;var B=n("iuhU"),X=n("R/WZ");var K=n("bXiM"),G=n("Ff2n"),J=n("rePB"),Y=r.forwardRef((function(e,t){var n=e.classes,i=e.className,o=e.component,a=void 0===o?"div":o,s=e.disableGutters,l=void 0!==s&&s,u=e.variant,d=void 0===u?"regular":u,p=Object(G.a)(e,["classes","className","component","disableGutters","variant"]);return r.createElement(a,Object(c.a)({className:Object(B.a)(n.root,n[d],i,!l&&n.gutters),ref:t},p))})),Q=Object(f.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center"},gutters:Object(J.a)({paddingLeft:e.spacing(2),paddingRight:e.spacing(2)},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),regular:e.mixins.toolbar,dense:{minHeight:48}}}),{name:"MuiToolbar"})(Y),Z=n("ofer"),$=n("PsDL"),ee=n("uniG"),te=n.n(ee),ne=n("NqtD"),ie=r.forwardRef((function(e,t){var n=e.classes,i=e.className,o=e.component,a=void 0===o?"div":o,s=e.disableGutters,l=void 0!==s&&s,u=e.fixed,d=void 0!==u&&u,p=e.maxWidth,f=void 0===p?"lg":p,g=Object(G.a)(e,["classes","className","component","disableGutters","fixed","maxWidth"]);return r.createElement(a,Object(c.a)({className:Object(B.a)(n.root,i,d&&n.fixed,l&&n.disableGutters,!1!==f&&n["maxWidth".concat(Object(ne.a)(String(f)))]),ref:t},g))})),oe=Object(f.a)((function(e){return{root:Object(J.a)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",paddingLeft:e.spacing(2),paddingRight:e.spacing(2),display:"block"},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),disableGutters:{paddingLeft:0,paddingRight:0},fixed:Object.keys(e.breakpoints.values).reduce((function(t,n){var i=e.breakpoints.values[n];return 0!==i&&(t[e.breakpoints.up(n)]={maxWidth:i}),t}),{}),maxWidthXs:Object(J.a)({},e.breakpoints.up("xs"),{maxWidth:Math.max(e.breakpoints.values.xs,444)}),maxWidthSm:Object(J.a)({},e.breakpoints.up("sm"),{maxWidth:e.breakpoints.values.sm}),maxWidthMd:Object(J.a)({},e.breakpoints.up("md"),{maxWidth:e.breakpoints.values.md}),maxWidthLg:Object(J.a)({},e.breakpoints.up("lg"),{maxWidth:e.breakpoints.values.lg}),maxWidthXl:Object(J.a)({},e.breakpoints.up("xl"),{maxWidth:e.breakpoints.values.xl})}}),{name:"MuiContainer"})(ie),re=n("gxeb"),ae=n("4s29"),ce=n("YFqc"),se=n.n(ce),le=n("tr08"),ue=n("Xt1q"),de=n("ODXe"),pe=n("dRu9"),fe=n("wpWl"),ge=n("4Hym"),he=n("bfFb"),be={entering:{opacity:1},entered:{opacity:1}},me={enter:fe.b.enteringScreen,exit:fe.b.leavingScreen},ve=r.forwardRef((function(e,t){var n=e.children,i=e.disableStrictModeCompat,o=void 0!==i&&i,a=e.in,s=e.onEnter,l=e.onEntered,u=e.onEntering,d=e.onExit,p=e.onExited,f=e.onExiting,g=e.style,h=e.TransitionComponent,b=void 0===h?pe.a:h,m=e.timeout,v=void 0===m?me:m,O=Object(G.a)(e,["children","disableStrictModeCompat","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","TransitionComponent","timeout"]),j=Object(le.a)(),y=j.unstable_strictMode&&!o,x=r.useRef(null),w=Object(he.a)(n.ref,t),k=Object(he.a)(y?x:void 0,w),S=function(e){return function(t,n){if(e){var i=y?[x.current,t]:[t,n],o=Object(de.a)(i,2),r=o[0],a=o[1];void 0===a?e(r):e(r,a)}}},E=S(u),C=S((function(e,t){Object(ge.b)(e);var n=Object(ge.a)({style:g,timeout:v},{mode:"enter"});e.style.webkitTransition=j.transitions.create("opacity",n),e.style.transition=j.transitions.create("opacity",n),s&&s(e,t)})),P=S(l),D=S(f),I=S((function(e){var t=Object(ge.a)({style:g,timeout:v},{mode:"exit"});e.style.webkitTransition=j.transitions.create("opacity",t),e.style.transition=j.transitions.create("opacity",t),d&&d(e)})),T=S(p);return r.createElement(b,Object(c.a)({appear:!0,in:a,nodeRef:y?x:void 0,onEnter:C,onEntered:P,onEntering:E,onExit:I,onExited:T,onExiting:D,timeout:v},O),(function(e,t){return r.cloneElement(n,Object(c.a)({style:Object(c.a)({opacity:0,visibility:"exited"!==e||a?void 0:"hidden"},be[e],g,n.props.style),ref:k},t))}))})),Oe=r.forwardRef((function(e,t){var n=e.children,i=e.classes,o=e.className,a=e.invisible,s=void 0!==a&&a,l=e.open,u=e.transitionDuration,d=e.TransitionComponent,p=void 0===d?ve:d,f=Object(G.a)(e,["children","classes","className","invisible","open","transitionDuration","TransitionComponent"]);return r.createElement(p,Object(c.a)({in:l,timeout:u},f),r.createElement("div",{className:Object(B.a)(i.root,o,s&&i.invisible),"aria-hidden":!0,ref:t},n))})),je=Object(f.a)({root:{zIndex:-1,position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},invisible:{backgroundColor:"transparent"}},{name:"MuiBackdrop"})(Oe),ye=n("i8i4"),xe=n("l3Wi");function we(e,t){var n=function(e,t){var n,i=t.getBoundingClientRect();if(t.fakeTransform)n=t.fakeTransform;else{var o=window.getComputedStyle(t);n=o.getPropertyValue("-webkit-transform")||o.getPropertyValue("transform")}var r=0,a=0;if(n&&"none"!==n&&"string"===typeof n){var c=n.split("(")[1].split(")")[0].split(",");r=parseInt(c[4],10),a=parseInt(c[5],10)}return"left"===e?"translateX(".concat(window.innerWidth,"px) translateX(").concat(r-i.left,"px)"):"right"===e?"translateX(-".concat(i.left+i.width-r,"px)"):"up"===e?"translateY(".concat(window.innerHeight,"px) translateY(").concat(a-i.top,"px)"):"translateY(-".concat(i.top+i.height-a,"px)")}(e,t);n&&(t.style.webkitTransform=n,t.style.transform=n)}var ke={enter:fe.b.enteringScreen,exit:fe.b.leavingScreen},Se=r.forwardRef((function(e,t){var n=e.children,i=e.direction,o=void 0===i?"down":i,a=e.in,s=e.onEnter,l=e.onEntered,u=e.onEntering,d=e.onExit,p=e.onExited,f=e.onExiting,g=e.style,h=e.timeout,b=void 0===h?ke:h,m=e.TransitionComponent,v=void 0===m?pe.a:m,O=Object(G.a)(e,["children","direction","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"]),j=Object(le.a)(),y=r.useRef(null),x=r.useCallback((function(e){y.current=ye.findDOMNode(e)}),[]),w=Object(he.a)(n.ref,x),k=Object(he.a)(w,t),S=function(e){return function(t){e&&(void 0===t?e(y.current):e(y.current,t))}},E=S((function(e,t){we(o,e),Object(ge.b)(e),s&&s(e,t)})),C=S((function(e,t){var n=Object(ge.a)({timeout:b,style:g},{mode:"enter"});e.style.webkitTransition=j.transitions.create("-webkit-transform",Object(c.a)({},n,{easing:j.transitions.easing.easeOut})),e.style.transition=j.transitions.create("transform",Object(c.a)({},n,{easing:j.transitions.easing.easeOut})),e.style.webkitTransform="none",e.style.transform="none",u&&u(e,t)})),P=S(l),D=S(f),I=S((function(e){var t=Object(ge.a)({timeout:b,style:g},{mode:"exit"});e.style.webkitTransition=j.transitions.create("-webkit-transform",Object(c.a)({},t,{easing:j.transitions.easing.sharp})),e.style.transition=j.transitions.create("transform",Object(c.a)({},t,{easing:j.transitions.easing.sharp})),we(o,e),d&&d(e)})),T=S((function(e){e.style.webkitTransition="",e.style.transition="",p&&p(e)})),N=r.useCallback((function(){y.current&&we(o,y.current)}),[o]);return r.useEffect((function(){if(!a&&"down"!==o&&"right"!==o){var e=Object(xe.a)((function(){y.current&&we(o,y.current)}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}}),[o,a]),r.useEffect((function(){a||N()}),[a,N]),r.createElement(v,Object(c.a)({nodeRef:y,onEnter:E,onEntered:P,onEntering:C,onExit:I,onExited:T,onExiting:D,appear:!0,in:a,timeout:b},O),(function(e,t){return r.cloneElement(n,Object(c.a)({ref:k,style:Object(c.a)({visibility:"exited"!==e||a?void 0:"hidden"},g,n.props.style)},t))}))})),Ee=n("kKAo"),Ce={left:"right",right:"left",top:"down",bottom:"up"};var Pe={enter:fe.b.enteringScreen,exit:fe.b.leavingScreen},De=r.forwardRef((function(e,t){var n=e.anchor,i=void 0===n?"left":n,o=e.BackdropProps,a=e.children,s=e.classes,l=e.className,u=e.elevation,d=void 0===u?16:u,p=e.ModalProps,f=(p=void 0===p?{}:p).BackdropProps,g=Object(G.a)(p,["BackdropProps"]),h=e.onClose,b=e.open,m=void 0!==b&&b,v=e.PaperProps,O=void 0===v?{}:v,j=e.SlideProps,y=e.TransitionComponent,x=void 0===y?Se:y,w=e.transitionDuration,k=void 0===w?Pe:w,S=e.variant,E=void 0===S?"temporary":S,C=Object(G.a)(e,["anchor","BackdropProps","children","classes","className","elevation","ModalProps","onClose","open","PaperProps","SlideProps","TransitionComponent","transitionDuration","variant"]),P=Object(le.a)(),D=r.useRef(!1);r.useEffect((function(){D.current=!0}),[]);var I=function(e,t){return"rtl"===e.direction&&function(e){return-1!==["left","right"].indexOf(e)}(t)?Ce[t]:t}(P,i),T=r.createElement(Ee.a,Object(c.a)({elevation:"temporary"===E?d:0,square:!0},O,{className:Object(B.a)(s.paper,s["paperAnchor".concat(Object(ne.a)(I))],O.className,"temporary"!==E&&s["paperAnchorDocked".concat(Object(ne.a)(I))])}),a);if("permanent"===E)return r.createElement("div",Object(c.a)({className:Object(B.a)(s.root,s.docked,l),ref:t},C),T);var N=r.createElement(x,Object(c.a)({in:m,direction:Ce[I],timeout:k,appear:D.current},j),T);return"persistent"===E?r.createElement("div",Object(c.a)({className:Object(B.a)(s.root,s.docked,l),ref:t},C),N):r.createElement(ue.a,Object(c.a)({BackdropProps:Object(c.a)({},o,f,{transitionDuration:k}),BackdropComponent:je,className:Object(B.a)(s.root,s.modal,l),open:m,onClose:h,ref:t},C,g),N)})),Ie=Object(f.a)((function(e){return{root:{},docked:{flex:"0 0 auto"},paper:{overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:e.zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0},paperAnchorLeft:{left:0,right:"auto"},paperAnchorRight:{left:"auto",right:0},paperAnchorTop:{top:0,left:0,bottom:"auto",right:0,height:"auto",maxHeight:"100%"},paperAnchorBottom:{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"},paperAnchorDockedLeft:{borderRight:"1px solid ".concat(e.palette.divider)},paperAnchorDockedTop:{borderBottom:"1px solid ".concat(e.palette.divider)},paperAnchorDockedRight:{borderLeft:"1px solid ".concat(e.palette.divider)},paperAnchorDockedBottom:{borderTop:"1px solid ".concat(e.palette.divider)},modal:{}}}),{name:"MuiDrawer",flip:!1})(De),Te=n("eD//"),Ne=n("ye/S"),Le=r.forwardRef((function(e,t){var n=e.absolute,i=void 0!==n&&n,o=e.classes,a=e.className,s=e.component,l=void 0===s?"hr":s,u=e.flexItem,d=void 0!==u&&u,p=e.light,f=void 0!==p&&p,g=e.orientation,h=void 0===g?"horizontal":g,b=e.role,m=void 0===b?"hr"!==l?"separator":void 0:b,v=e.variant,O=void 0===v?"fullWidth":v,j=Object(G.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return r.createElement(l,Object(c.a)({className:Object(B.a)(o.root,a,"fullWidth"!==O&&o[O],i&&o.absolute,d&&o.flexItem,f&&o.light,"vertical"===h&&o.vertical),role:m,ref:t},j))})),Me=Object(f.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(Ne.b)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(Le),_e=n("76vg"),Re=n.n(_e),Ae=n("E2gh"),ze=n.n(Ae),qe=n("tVbE"),Ue=n("56Ss"),Fe=n("MquD"),We=r.forwardRef((function(e,t){var n=e.children,i=e.classes,o=e.className,a=e.disableTypography,s=void 0!==a&&a,l=e.inset,u=void 0!==l&&l,d=e.primary,p=e.primaryTypographyProps,f=e.secondary,g=e.secondaryTypographyProps,h=Object(G.a)(e,["children","classes","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"]),b=r.useContext(Fe.a).dense,m=null!=d?d:n;null==m||m.type===Z.a||s||(m=r.createElement(Z.a,Object(c.a)({variant:b?"body2":"body1",className:i.primary,component:"span",display:"block"},p),m));var v=f;return null==v||v.type===Z.a||s||(v=r.createElement(Z.a,Object(c.a)({variant:"body2",className:i.secondary,color:"textSecondary",display:"block"},g),v)),r.createElement("div",Object(c.a)({className:Object(B.a)(i.root,o,b&&i.dense,u&&i.inset,m&&v&&i.multiline),ref:t},h),m,v)})),He=Object(f.a)({root:{flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},multiline:{marginTop:6,marginBottom:6},dense:{},inset:{paddingLeft:56},primary:{},secondary:{}},{name:"MuiListItemText"})(We),Ve=n("20a2"),Be=n("XN6s");function Xe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function Ke(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Xe(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Xe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Ge=Object(X.a)((function(e){return{drawer:{width:p.a,flexShrink:0},drawerPaper:{width:p.a},drawerHeader:Ke(Ke({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-start"})}}));function Je(e){var t=e.open,n=e.handleClose,o=Ge(),r=Object(le.a)(),a=Object(Ve.useRouter)().pathname;return Object(i.jsxs)(Ie,{className:o.drawer,variant:"persistent",anchor:"right",open:t,classes:{paper:o.drawerPaper},children:[Object(i.jsx)("div",{className:o.drawerHeader,children:Object(i.jsx)($.a,{onClick:n,children:"rtl"===r.direction?Object(i.jsx)(Re.a,{}):Object(i.jsx)(ze.a,{})})}),Object(i.jsx)(Me,{}),Object(i.jsxs)(Te.a,{children:[Object(i.jsx)(se.a,{href:{pathname:"/[lang]",query:{lang:m.a.language}},children:Object(i.jsxs)(qe.a,{disabled:"/[lang]"===a,selected:"/[lang]"===a,button:!0,children:[Object(i.jsx)(Ue.a,{children:Object(i.jsx)(re.a,{name:"question"})}),Object(i.jsx)(He,{primary:m.a.t("common.navbar.home")})]})},"home"),Be.a.map((function(e){return Object(i.jsx)(se.a,{href:{pathname:"/[lang]/".concat(e.url),query:{lang:m.a.language}},children:Object(i.jsxs)(qe.a,{disabled:"/[lang]/".concat(e.url)===a,selected:"/[lang]/".concat(e.url)===a,button:!0,children:[Object(i.jsx)(Ue.a,{children:Object(i.jsx)(re.a,{name:e.icon})}),Object(i.jsx)(He,{primary:m.a.t(e.title),secondary:m.a.t(e.question)})]})},e.key)}))]}),Object(i.jsx)(Me,{})]})}function Ye(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function Qe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ye(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ye(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Ze=Object(X.a)((function(e){return{root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(p.a,"px)"),transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginRight:p.a},title:{flexGrow:1,display:"flex",alignItems:"center",fontWeight:500},hide:{display:"none"},drawer:{width:p.a,flexShrink:0},drawerPaper:{width:p.a},drawerHeader:Qe(Qe({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-start"}),content:{flexGrow:1,padding:e.spacing(3),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginRight:-p.a},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginRight:0}}}));function $e(e){var t=e.children,n=Ze(),a=Object(r.useContext)(ae.a).active,c=Object(r.useState)(!1),s=c[0],l=c[1],u={icon:a?a.icon:"question",title:a?m.a.t(a.question):"Decision Tracer"};return Object(i.jsxs)("div",{className:n.root,children:[Object(i.jsx)(K.a,{position:"fixed",className:Object(B.a)(n.appBar,Object(o.a)({},n.appBarShift,s)),children:Object(i.jsxs)(Q,{children:[Object(i.jsxs)(Z.a,{component:"h1",variant:"body1",noWrap:!0,className:n.title,children:[Object(i.jsx)(re.a,{name:u.icon,fontSize:"large",style:{marginRight:"2rem"}}),u.title]}),Object(i.jsx)($.a,{color:"inherit","aria-label":"open drawer",edge:"end",onClick:function(){l(!0)},className:Object(B.a)(s&&n.hide),children:Object(i.jsx)(te.a,{})})]})}),Object(i.jsx)("div",{className:Object(B.a)(n.content,Object(o.a)({},n.contentShift,s)),children:Object(i.jsx)("main",{children:Object(i.jsxs)(oe,{maxWidth:"xl",style:{padding:0},children:[Object(i.jsx)("div",{className:n.drawerHeader}),t]})})}),Object(i.jsx)(Je,{open:s,handleClose:function(){l(!1)}})]})}var et=n("lVM7");function tt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function nt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?tt(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):tt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function it(e){var t=e.Component,n=e.pageProps;return Object(r.useEffect)((function(){var e=document.querySelector("#jss-server-side");e&&e.parentElement.removeChild(e)}),[]),m.a.changeLanguage(n.language),Object(i.jsx)(et.b,{children:Object(i.jsx)(ae.b,{children:Object(i.jsxs)(d,{theme:p.d,children:[Object(i.jsx)(b,{}),Object(i.jsx)($e,{children:Object(i.jsx)(t,nt({},n))})]})})})}},eP7u:function(e,t,n){var i={"./de/translation.json":"o9J7","./en/translation.json":"Pz+C"};function o(e){var t=r(e);return n(t)}function r(e){if(!n.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}o.keys=function(){return Object.keys(i)},o.resolve=r,e.exports=o,o.id="eP7u"},lVM7:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return u}));var i=n("nKUr"),o=n("cpVT"),r=n("q1tI"),a=n.n(r);n("17x9");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var l=a.a.createContext({mobileFooter:!0,toggleMobileFooter:function(){}}),u=function(e){var t=e.children,n=Object(r.useState)({mobileFooter:!0}),o=n[0],a=n[1];return Object(i.jsx)(l.Provider,{value:s(s({},o),{},{toggleMobileFooter:function(){a(s(s({},o),{},{mobileFooter:!o.mobileFooter}))}}),children:o&&t})}},o9J7:function(e){e.exports=JSON.parse('{"home":{"meta":{"title":"Decision Tracer | Home","description":"Finde einfach und mit Substanz zu Deiner Entscheidung","keywords":"Rechner, Entscheidungshilfe, Corona"}},"common":{"navbar":{"home":"\xdcbersicht"},"heading":{"logo":"Willkommen auf Decision Tracer"}},"presets":{"corona":{"meta":{"title":"Soll ich mich impfen lassen? | Decision Tracer","description":"Impfung: Ja oder nein? Sind die Nachteile einer Impfung es wert, nicht geimpft zu werden?","keywords":"Corona, Impfung, Entscheidung, Hilfe, Rechner"},"title":"Corona (einfach)","question":"Soll ich mich impfen lassen?","description":"Einfache Entscheidungshilfe","decisions":{"0":{"title":"Nicht impfen","sub":{"0":{"title":"Keine Ansteckung"},"1":{"title":"Corona","cases":{"0":{"title":"asymptomatisch"},"1":{"title":"milder Verlauf"},"2":{"title":"schwerer Verlauf"},"3":{"title":"Tod"}}}}},"1":{"title":"Impfen","sub":{"0":{"title":"Keine Ansteckung"},"1":{"title":"Corona","cases":{"0":{"title":"asymptomatisch"},"1":{"title":"milder Verlauf"},"2":{"title":"schwerer Verlauf"},"3":{"title":"Tod"}}},"2":{"title":"Impfschaden"}}}}},"corona-2":{"meta":{"title":"Soll ich mich impfen lassen? | Decision Tracer","description":"Impfung: Ja oder nein? Sind die Nachteile einer Impfung es wert, nicht geimpft zu werden?","keywords":"Corona, Impfung, Entscheidung, Hilfe, Rechner, kompliziert"},"title":"Corona (kompliziert)","question":"Soll ich mich impfen lassen?","description":"Entscheidungshilfe mit komplexem Baum","decisions":{"0":{"title":"Nicht impfen","sub":{"0":{"title":"Keine Ansteckung"},"1":{"title":"Corona","cases":{"0":{"title":"Asymptomatisch"},"1":{"title":"Milder Verlauf","subcases":{"0":{"title":"Long Covid"},"1":{"title":"Unabsehbare Sp\xe4tfolgen"},"2":{"title":"Vollst\xe4ndige Heilung"}}},"2":{"title":"Schwerer Verlauf","subcases":{"0":{"title":"Long Covid"},"1":{"title":"Unabsehbare Sp\xe4tfolgen"},"2":{"title":"Vollst\xe4ndige Heilung"}}},"3":{"title":"Tod"}}},"2":{"title":"Anderen Menschen anstecken"},"3":{"title":"Positives oder negatives Bauchgef\xfchl"}}},"1":{"title":"Impfen","sub":{"0":{"title":"Keine Ansteckung"},"1":{"title":"Corona","cases":{"0":{"title":"Asymptomatisch"},"1":{"title":"Milder Verlauf","subcases":{"0":{"title":"Long Covid"},"1":{"title":"Unabsehbare Sp\xe4tfolgen"},"2":{"title":"Vollst\xe4ndige Heilung"}}},"2":{"title":"Schwerer Verlauf","subcases":{"0":{"title":"Long Covid"},"1":{"title":"Unabsehbare Sp\xe4tfolgen"},"2":{"title":"Vollst\xe4ndige Heilung"}}},"3":{"title":"Tod"}}},"2":{"title":"Anderen Menschen anstecken"},"3":{"title":"Positives oder negatives Bauchgef\xfchl"},"4":{"title":"Normale Impfreaktion"},"5":{"title":"Schwerer Impfschaden"},"6":{"title":"Unabsehbare Impf-Sp\xe4tfolgen"}}}}}},"calculator":{"new_decision":"Entscheidung","probability":"Wahrscheinlichkeit","probability_short":"Ws (\ud835\udc5d)","value":"Nutzwert","expected_utility":"Erwartungsnutzen","subcases":"Sub-Szenarien","subCasesItems":"F\xe4lle","add_scenario":"Szenario hinzuf\xfcgen","add_case":"Sub-Szenario hinzuf\xfcgen","add_sub_case":"Fall hinzuf\xfcgen","remove_scenario":"Szenario l\xf6schen","remove_case":"Sub-Szenario l\xf6schen","remove_sub_case":"Fall l\xf6schen","remove_decision":"Entscheidung l\xf6schen","independent":"Unabh\xe4ngig","result":"Ergebnis"}}')},tr08:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n("aXM8"),o=(n("q1tI"),n("cNwE"));function r(){return Object(i.a)()||o.a}},uniG:function(e,t,n){"use strict";var i=n("TqRt"),o=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("q1tI")),a=(0,i(n("8/g6")).default)(r.createElement("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");t.default=a},vNVm:function(e,t,n){"use strict";var i=n("zoAU");t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!a,s=(0,o.useRef)(),l=(0,o.useState)(!1),u=i(l,2),d=u[0],p=u[1],f=(0,o.useCallback)((function(e){s.current&&(s.current(),s.current=void 0),n||d||e&&e.tagName&&(s.current=function(e,t,n){var i=function(e){var t=e.rootMargin||"",n=c.get(t);if(n)return n;var i=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=i.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return c.set(t,n={id:t,observer:o,elements:i}),n}(n),o=i.id,r=i.observer,a=i.elements;return a.set(e,t),r.observe(e),function(){a.delete(e),r.unobserve(e),0===a.size&&(r.disconnect(),c.delete(o))}}(e,(function(e){return e&&p(e)}),{rootMargin:t}))}),[n,t,d]);return(0,o.useEffect)((function(){if(!a&&!d){var e=(0,r.requestIdleCallback)((function(){return p(!0)}));return function(){return(0,r.cancelIdleCallback)(e)}}}),[d]),[f,d]};var o=n("q1tI"),r=n("0G5g"),a="undefined"!==typeof IntersectionObserver;var c=new Map}},[[0,2,0,4,6,1,7,5]]]);