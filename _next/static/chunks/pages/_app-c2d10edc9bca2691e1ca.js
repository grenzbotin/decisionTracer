_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[9],{0:function(e,t,n){n("74v/"),e.exports=n("nOHt")},"74v/":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n("cha2")}])},"76vg":function(e,t,n){"use strict";var o=n("TqRt"),a=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("q1tI")),r=(0,o(n("8/g6")).default)(i.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"ChevronLeft");t.default=r},E2gh:function(e,t,n){"use strict";var o=n("TqRt"),a=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("q1tI")),r=(0,o(n("8/g6")).default)(i.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"ChevronRight");t.default=r},FjbK:function(e,t,n){"use strict";var o=n("TqRt"),a=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("q1tI")),r=(0,o(n("8/g6")).default)(i.createElement("path",{d:"M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"}),"MoveToInbox");t.default=r},"Pz+C":function(e){e.exports=JSON.parse('{"home":{"meta":{"title":"Decision Tracer | Home","description":"Make the right choice with ease","keywords":"Calculator, Decision helper, Corona"}},"common":{"navbar":{},"heading":{"logo":"Welcome to Decision Tracer"}},"calculator":{"new_decision":"Decision","probability":"Occurence probability","value":"Utility","expected_utility":"Expected utility","subcases":"Sub cases","add_scenario":"Add scenario","add_case":"Add sub scenario","remove_scenario":"Delete scenario","remove_case":"Delete sub scenario","remove_decision":"Delete decision","independent":"independent","results":"Result"}}')},cha2:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return Qe}));var o=n("nKUr"),a=n("cpVT"),i=n("wx14"),r=n("q1tI"),s=n.n(r),c=(n("17x9"),n("OKji")),l=n("aXM8"),d=n("hfi/");var u=function(e){var t=e.children,n=e.theme,o=Object(l.a)(),a=s.a.useMemo((function(){var e=null===o?n:function(e,t){return"function"===typeof t?t(e):Object(i.a)({},e,t)}(o,n);return null!=e&&(e[d.a]=null!==o),e}),[n,o]);return s.a.createElement(c.a.Provider,{value:a},t)},p=n("JSsD"),f=n("H2TA"),g={WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box"},m=function(e){return Object(i.a)({color:e.palette.text.primary},e.typography.body2,{backgroundColor:e.palette.background.default,"@media print":{backgroundColor:e.palette.common.white}})};var h=Object(f.a)((function(e){return{"@global":{html:g,"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:Object(i.a)({margin:0},m(e),{"&::backdrop":{backgroundColor:e.palette.background.default}})}}}),{name:"MuiCssBaseline"})((function(e){var t=e.children,n=void 0===t?null:t;return e.classes,r.createElement(r.Fragment,null,n)})),b=n("XzT5"),v=n("z7pX"),O=n("1OyB"),j=n("vuIU"),x=[],y=x.forEach,k=x.slice;function w(e){return y.call(k.call(arguments,1),(function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])})),e}var S=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,E=function(e,t,n){var o=n||{};o.path=o.path||"/";var a=e+"="+encodeURIComponent(t);if(o.maxAge>0){var i=o.maxAge-0;if(isNaN(i))throw new Error("maxAge should be a Number");a+="; Max-Age="+Math.floor(i)}if(o.domain){if(!S.test(o.domain))throw new TypeError("option domain is invalid");a+="; Domain="+o.domain}if(o.path){if(!S.test(o.path))throw new TypeError("option path is invalid");a+="; Path="+o.path}if(o.expires){if("function"!==typeof o.expires.toUTCString)throw new TypeError("option expires is invalid");a+="; Expires="+o.expires.toUTCString()}if(o.httpOnly&&(a+="; HttpOnly"),o.secure&&(a+="; Secure"),o.sameSite)switch("string"===typeof o.sameSite?o.sameSite.toLowerCase():o.sameSite){case!0:a+="; SameSite=Strict";break;case"lax":a+="; SameSite=Lax";break;case"strict":a+="; SameSite=Strict";break;case"none":a+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return a},C=function(e,t,n,o){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{path:"/",sameSite:"strict"};n&&(a.expires=new Date,a.expires.setTime(a.expires.getTime()+60*n*1e3)),o&&(a.domain=o),document.cookie=E(e,encodeURIComponent(t),a)},P=function(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var a=n[o];" "===a.charAt(0);)a=a.substring(1,a.length);if(0===a.indexOf(t))return a.substring(t.length,a.length)}return null},T={name:"cookie",lookup:function(e){var t;if(e.lookupCookie&&"undefined"!==typeof document){var n=P(e.lookupCookie);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupCookie&&"undefined"!==typeof document&&C(t.lookupCookie,e,t.cookieMinutes,t.cookieDomain,t.cookieOptions)}},D={name:"querystring",lookup:function(e){var t;if("undefined"!==typeof window)for(var n=window.location.search.substring(1).split("&"),o=0;o<n.length;o++){var a=n[o].indexOf("=");if(a>0)n[o].substring(0,a)===e.lookupQuerystring&&(t=n[o].substring(a+1))}return t}},N=null,L=function(){if(null!==N)return N;try{N="undefined"!==window&&null!==window.localStorage;var e="i18next.translate.boo";window.localStorage.setItem(e,"foo"),window.localStorage.removeItem(e)}catch(t){N=!1}return N},I={name:"localStorage",lookup:function(e){var t;if(e.lookupLocalStorage&&L()){var n=window.localStorage.getItem(e.lookupLocalStorage);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupLocalStorage&&L()&&window.localStorage.setItem(t.lookupLocalStorage,e)}},R=null,_=function(){if(null!==R)return R;try{R="undefined"!==window&&null!==window.sessionStorage;var e="i18next.translate.boo";window.sessionStorage.setItem(e,"foo"),window.sessionStorage.removeItem(e)}catch(t){R=!1}return R},M={name:"sessionStorage",lookup:function(e){var t;if(e.lookupSessionStorage&&_()){var n=window.sessionStorage.getItem(e.lookupSessionStorage);n&&(t=n)}return t},cacheUserLanguage:function(e,t){t.lookupSessionStorage&&_()&&window.sessionStorage.setItem(t.lookupSessionStorage,e)}},z={name:"navigator",lookup:function(e){var t=[];if("undefined"!==typeof navigator){if(navigator.languages)for(var n=0;n<navigator.languages.length;n++)t.push(navigator.languages[n]);navigator.userLanguage&&t.push(navigator.userLanguage),navigator.language&&t.push(navigator.language)}return t.length>0?t:void 0}},W={name:"htmlTag",lookup:function(e){var t,n=e.htmlTag||("undefined"!==typeof document?document.documentElement:null);return n&&"function"===typeof n.getAttribute&&(t=n.getAttribute("lang")),t}},A={name:"path",lookup:function(e){var t;if("undefined"!==typeof window){var n=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(n instanceof Array)if("number"===typeof e.lookupFromPathIndex){if("string"!==typeof n[e.lookupFromPathIndex])return;t=n[e.lookupFromPathIndex].replace("/","")}else t=n[0].replace("/","")}return t}},F={name:"subdomain",lookup:function(e){var t;if("undefined"!==typeof window){var n=window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);n instanceof Array&&(t="number"===typeof e.lookupFromSubdomainIndex?n[e.lookupFromSubdomainIndex].replace("http://","").replace("https://","").replace(".",""):n[0].replace("http://","").replace("https://","").replace(".",""))}return t}};var B=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(O.a)(this,e),this.type="languageDetector",this.detectors={},this.init(t,n)}return Object(j.a)(e,[{key:"init",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.services=e,this.options=w(t,this.options||{},{order:["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag"],lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",lookupSessionStorage:"i18nextLng",caches:["localStorage"],excludeCacheFor:["cimode"]}),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=n,this.addDetector(T),this.addDetector(D),this.addDetector(I),this.addDetector(M),this.addDetector(z),this.addDetector(W),this.addDetector(A),this.addDetector(F)}},{key:"addDetector",value:function(e){this.detectors[e.name]=e}},{key:"detect",value:function(e){var t=this;e||(e=this.options.order);var n=[];return e.forEach((function(e){if(t.detectors[e]){var o=t.detectors[e].lookup(t.options);o&&"string"===typeof o&&(o=[o]),o&&(n=n.concat(o))}})),this.services.languageUtils.getBestMatchFromCodes?n:n.length>0?n[0]:null}},{key:"cacheUserLanguage",value:function(e,t){var n=this;t||(t=this.options.caches),t&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(e)>-1||t.forEach((function(t){n.detectors[t]&&n.detectors[t].cacheUserLanguage(e,n.options)})))}}]),e}();B.type="languageDetector";var H=B,U=["en","de"],q=Object.assign.apply(Object,[{}].concat(Object(v.a)(Object.keys(U).map((function(e){return Object(a.a)({},U[e],{translations:n("eP7u")("./"+U[e]+"/translation.json")})})))));b.a.use(H).init({detection:{order:["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag","path","subdomain"],lookupCookie:"lng",lookupLocalStorage:"lng",lookupFromPathIndex:0,lookupFromSubdomainIndex:0,caches:["localStorage","cookie"],excludeCacheFor:["cimode"],cookieOptions:{path:"/",sameSite:"strict"}},fallbackLng:"en",resources:q,ns:["translations"],defaultNS:"translations",returnObjects:!0,debug:!1,interpolation:{escapeValue:!1},react:{wait:!0}});b.a;var X=n("iuhU"),G=n("R/WZ");var V=n("tr08"),J=n("Ff2n"),K=n("Xt1q"),Y=n("ODXe"),Q=n("dRu9"),Z=n("wpWl"),$=n("4Hym"),ee=n("bfFb"),te={entering:{opacity:1},entered:{opacity:1}},ne={enter:Z.b.enteringScreen,exit:Z.b.leavingScreen},oe=r.forwardRef((function(e,t){var n=e.children,o=e.disableStrictModeCompat,a=void 0!==o&&o,s=e.in,c=e.onEnter,l=e.onEntered,d=e.onEntering,u=e.onExit,p=e.onExited,f=e.onExiting,g=e.style,m=e.TransitionComponent,h=void 0===m?Q.a:m,b=e.timeout,v=void 0===b?ne:b,O=Object(J.a)(e,["children","disableStrictModeCompat","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","TransitionComponent","timeout"]),j=Object(V.a)(),x=j.unstable_strictMode&&!a,y=r.useRef(null),k=Object(ee.a)(n.ref,t),w=Object(ee.a)(x?y:void 0,k),S=function(e){return function(t,n){if(e){var o=x?[y.current,t]:[t,n],a=Object(Y.a)(o,2),i=a[0],r=a[1];void 0===r?e(i):e(i,r)}}},E=S(d),C=S((function(e,t){Object($.b)(e);var n=Object($.a)({style:g,timeout:v},{mode:"enter"});e.style.webkitTransition=j.transitions.create("opacity",n),e.style.transition=j.transitions.create("opacity",n),c&&c(e,t)})),P=S(l),T=S(f),D=S((function(e){var t=Object($.a)({style:g,timeout:v},{mode:"exit"});e.style.webkitTransition=j.transitions.create("opacity",t),e.style.transition=j.transitions.create("opacity",t),u&&u(e)})),N=S(p);return r.createElement(h,Object(i.a)({appear:!0,in:s,nodeRef:x?y:void 0,onEnter:C,onEntered:P,onEntering:E,onExit:D,onExited:N,onExiting:T,timeout:v},O),(function(e,t){return r.cloneElement(n,Object(i.a)({style:Object(i.a)({opacity:0,visibility:"exited"!==e||s?void 0:"hidden"},te[e],g,n.props.style),ref:w},t))}))})),ae=r.forwardRef((function(e,t){var n=e.children,o=e.classes,a=e.className,s=e.invisible,c=void 0!==s&&s,l=e.open,d=e.transitionDuration,u=e.TransitionComponent,p=void 0===u?oe:u,f=Object(J.a)(e,["children","classes","className","invisible","open","transitionDuration","TransitionComponent"]);return r.createElement(p,Object(i.a)({in:l,timeout:d},f),r.createElement("div",{className:Object(X.a)(o.root,a,c&&o.invisible),"aria-hidden":!0,ref:t},n))})),ie=Object(f.a)({root:{zIndex:-1,position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},invisible:{backgroundColor:"transparent"}},{name:"MuiBackdrop"})(ae),re=n("i8i4"),se=n("l3Wi");function ce(e,t){var n=function(e,t){var n,o=t.getBoundingClientRect();if(t.fakeTransform)n=t.fakeTransform;else{var a=window.getComputedStyle(t);n=a.getPropertyValue("-webkit-transform")||a.getPropertyValue("transform")}var i=0,r=0;if(n&&"none"!==n&&"string"===typeof n){var s=n.split("(")[1].split(")")[0].split(",");i=parseInt(s[4],10),r=parseInt(s[5],10)}return"left"===e?"translateX(".concat(window.innerWidth,"px) translateX(").concat(i-o.left,"px)"):"right"===e?"translateX(-".concat(o.left+o.width-i,"px)"):"up"===e?"translateY(".concat(window.innerHeight,"px) translateY(").concat(r-o.top,"px)"):"translateY(-".concat(o.top+o.height-r,"px)")}(e,t);n&&(t.style.webkitTransform=n,t.style.transform=n)}var le={enter:Z.b.enteringScreen,exit:Z.b.leavingScreen},de=r.forwardRef((function(e,t){var n=e.children,o=e.direction,a=void 0===o?"down":o,s=e.in,c=e.onEnter,l=e.onEntered,d=e.onEntering,u=e.onExit,p=e.onExited,f=e.onExiting,g=e.style,m=e.timeout,h=void 0===m?le:m,b=e.TransitionComponent,v=void 0===b?Q.a:b,O=Object(J.a)(e,["children","direction","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"]),j=Object(V.a)(),x=r.useRef(null),y=r.useCallback((function(e){x.current=re.findDOMNode(e)}),[]),k=Object(ee.a)(n.ref,y),w=Object(ee.a)(k,t),S=function(e){return function(t){e&&(void 0===t?e(x.current):e(x.current,t))}},E=S((function(e,t){ce(a,e),Object($.b)(e),c&&c(e,t)})),C=S((function(e,t){var n=Object($.a)({timeout:h,style:g},{mode:"enter"});e.style.webkitTransition=j.transitions.create("-webkit-transform",Object(i.a)({},n,{easing:j.transitions.easing.easeOut})),e.style.transition=j.transitions.create("transform",Object(i.a)({},n,{easing:j.transitions.easing.easeOut})),e.style.webkitTransform="none",e.style.transform="none",d&&d(e,t)})),P=S(l),T=S(f),D=S((function(e){var t=Object($.a)({timeout:h,style:g},{mode:"exit"});e.style.webkitTransition=j.transitions.create("-webkit-transform",Object(i.a)({},t,{easing:j.transitions.easing.sharp})),e.style.transition=j.transitions.create("transform",Object(i.a)({},t,{easing:j.transitions.easing.sharp})),ce(a,e),u&&u(e)})),N=S((function(e){e.style.webkitTransition="",e.style.transition="",p&&p(e)})),L=r.useCallback((function(){x.current&&ce(a,x.current)}),[a]);return r.useEffect((function(){if(!s&&"down"!==a&&"right"!==a){var e=Object(se.a)((function(){x.current&&ce(a,x.current)}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}}),[a,s]),r.useEffect((function(){s||L()}),[s,L]),r.createElement(v,Object(i.a)({nodeRef:x,onEnter:E,onEntered:P,onEntering:C,onExit:D,onExited:N,onExiting:T,appear:!0,in:s,timeout:h},O),(function(e,t){return r.cloneElement(n,Object(i.a)({ref:w,style:Object(i.a)({visibility:"exited"!==e||s?void 0:"hidden"},g,n.props.style)},t))}))})),ue=n("kKAo"),pe=n("NqtD"),fe={left:"right",right:"left",top:"down",bottom:"up"};var ge={enter:Z.b.enteringScreen,exit:Z.b.leavingScreen},me=r.forwardRef((function(e,t){var n=e.anchor,o=void 0===n?"left":n,a=e.BackdropProps,s=e.children,c=e.classes,l=e.className,d=e.elevation,u=void 0===d?16:d,p=e.ModalProps,f=(p=void 0===p?{}:p).BackdropProps,g=Object(J.a)(p,["BackdropProps"]),m=e.onClose,h=e.open,b=void 0!==h&&h,v=e.PaperProps,O=void 0===v?{}:v,j=e.SlideProps,x=e.TransitionComponent,y=void 0===x?de:x,k=e.transitionDuration,w=void 0===k?ge:k,S=e.variant,E=void 0===S?"temporary":S,C=Object(J.a)(e,["anchor","BackdropProps","children","classes","className","elevation","ModalProps","onClose","open","PaperProps","SlideProps","TransitionComponent","transitionDuration","variant"]),P=Object(V.a)(),T=r.useRef(!1);r.useEffect((function(){T.current=!0}),[]);var D=function(e,t){return"rtl"===e.direction&&function(e){return-1!==["left","right"].indexOf(e)}(t)?fe[t]:t}(P,o),N=r.createElement(ue.a,Object(i.a)({elevation:"temporary"===E?u:0,square:!0},O,{className:Object(X.a)(c.paper,c["paperAnchor".concat(Object(pe.a)(D))],O.className,"temporary"!==E&&c["paperAnchorDocked".concat(Object(pe.a)(D))])}),s);if("permanent"===E)return r.createElement("div",Object(i.a)({className:Object(X.a)(c.root,c.docked,l),ref:t},C),N);var L=r.createElement(y,Object(i.a)({in:b,direction:fe[D],timeout:w,appear:T.current},j),N);return"persistent"===E?r.createElement("div",Object(i.a)({className:Object(X.a)(c.root,c.docked,l),ref:t},C),L):r.createElement(K.a,Object(i.a)({BackdropProps:Object(i.a)({},a,f,{transitionDuration:w}),BackdropComponent:ie,className:Object(X.a)(c.root,c.modal,l),open:b,onClose:m,ref:t},C,g),L)})),he=Object(f.a)((function(e){return{root:{},docked:{flex:"0 0 auto"},paper:{overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:e.zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0},paperAnchorLeft:{left:0,right:"auto"},paperAnchorRight:{left:"auto",right:0},paperAnchorTop:{top:0,left:0,bottom:"auto",right:0,height:"auto",maxHeight:"100%"},paperAnchorBottom:{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"},paperAnchorDockedLeft:{borderRight:"1px solid ".concat(e.palette.divider)},paperAnchorDockedTop:{borderBottom:"1px solid ".concat(e.palette.divider)},paperAnchorDockedRight:{borderLeft:"1px solid ".concat(e.palette.divider)},paperAnchorDockedBottom:{borderTop:"1px solid ".concat(e.palette.divider)},modal:{}}}),{name:"MuiDrawer",flip:!1})(me),be=n("bXiM"),ve=n("rePB"),Oe=r.forwardRef((function(e,t){var n=e.classes,o=e.className,a=e.component,s=void 0===a?"div":a,c=e.disableGutters,l=void 0!==c&&c,d=e.variant,u=void 0===d?"regular":d,p=Object(J.a)(e,["classes","className","component","disableGutters","variant"]);return r.createElement(s,Object(i.a)({className:Object(X.a)(n.root,n[u],o,!l&&n.gutters),ref:t},p))})),je=Object(f.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center"},gutters:Object(ve.a)({paddingLeft:e.spacing(2),paddingRight:e.spacing(2)},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),regular:e.mixins.toolbar,dense:{minHeight:48}}}),{name:"MuiToolbar"})(Oe),xe=n("eD//"),ye=n("ofer"),ke=n("ye/S"),we=r.forwardRef((function(e,t){var n=e.absolute,o=void 0!==n&&n,a=e.classes,s=e.className,c=e.component,l=void 0===c?"hr":c,d=e.flexItem,u=void 0!==d&&d,p=e.light,f=void 0!==p&&p,g=e.orientation,m=void 0===g?"horizontal":g,h=e.role,b=void 0===h?"hr"!==l?"separator":void 0:h,v=e.variant,O=void 0===v?"fullWidth":v,j=Object(J.a)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return r.createElement(l,Object(i.a)({className:Object(X.a)(a.root,s,"fullWidth"!==O&&a[O],o&&a.absolute,u&&a.flexItem,f&&a.light,"vertical"===m&&a.vertical),role:b,ref:t},j))})),Se=Object(f.a)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:Object(ke.b)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(we),Ee=n("PsDL"),Ce=n("uniG"),Pe=n.n(Ce),Te=n("76vg"),De=n.n(Te),Ne=n("E2gh"),Le=n.n(Ne),Ie=n("tVbE"),Re=n("56Ss"),_e=n("MquD"),Me=r.forwardRef((function(e,t){var n=e.children,o=e.classes,a=e.className,s=e.disableTypography,c=void 0!==s&&s,l=e.inset,d=void 0!==l&&l,u=e.primary,p=e.primaryTypographyProps,f=e.secondary,g=e.secondaryTypographyProps,m=Object(J.a)(e,["children","classes","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"]),h=r.useContext(_e.a).dense,b=null!=u?u:n;null==b||b.type===ye.a||c||(b=r.createElement(ye.a,Object(i.a)({variant:h?"body2":"body1",className:o.primary,component:"span",display:"block"},p),b));var v=f;return null==v||v.type===ye.a||c||(v=r.createElement(ye.a,Object(i.a)({variant:"body2",className:o.secondary,color:"textSecondary",display:"block"},g),v)),r.createElement("div",Object(i.a)({className:Object(X.a)(o.root,a,h&&o.dense,d&&o.inset,b&&v&&o.multiline),ref:t},m),b,v)})),ze=Object(f.a)({root:{flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},multiline:{marginTop:6,marginBottom:6},dense:{},inset:{paddingLeft:56},primary:{},secondary:{}},{name:"MuiListItemText"})(Me),We=n("FjbK"),Ae=n.n(We),Fe=r.forwardRef((function(e,t){var n=e.classes,o=e.className,a=e.component,s=void 0===a?"div":a,c=e.disableGutters,l=void 0!==c&&c,d=e.fixed,u=void 0!==d&&d,p=e.maxWidth,f=void 0===p?"lg":p,g=Object(J.a)(e,["classes","className","component","disableGutters","fixed","maxWidth"]);return r.createElement(s,Object(i.a)({className:Object(X.a)(n.root,o,u&&n.fixed,l&&n.disableGutters,!1!==f&&n["maxWidth".concat(Object(pe.a)(String(f)))]),ref:t},g))})),Be=Object(f.a)((function(e){return{root:Object(ve.a)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",paddingLeft:e.spacing(2),paddingRight:e.spacing(2),display:"block"},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),disableGutters:{paddingLeft:0,paddingRight:0},fixed:Object.keys(e.breakpoints.values).reduce((function(t,n){var o=e.breakpoints.values[n];return 0!==o&&(t[e.breakpoints.up(n)]={maxWidth:o}),t}),{}),maxWidthXs:Object(ve.a)({},e.breakpoints.up("xs"),{maxWidth:Math.max(e.breakpoints.values.xs,444)}),maxWidthSm:Object(ve.a)({},e.breakpoints.up("sm"),{maxWidth:e.breakpoints.values.sm}),maxWidthMd:Object(ve.a)({},e.breakpoints.up("md"),{maxWidth:e.breakpoints.values.md}),maxWidthLg:Object(ve.a)({},e.breakpoints.up("lg"),{maxWidth:e.breakpoints.values.lg}),maxWidthXl:Object(ve.a)({},e.breakpoints.up("xl"),{maxWidth:e.breakpoints.values.xl})}}),{name:"MuiContainer"})(Fe),He=n("gxeb"),Ue=n("4s29");function qe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function Xe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?qe(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):qe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Ge=240,Ve=Object(G.a)((function(e){return{root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(Ge,"px)"),transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginRight:Ge},title:{flexGrow:1,display:"flex",alignItems:"center",fontWeight:500},hide:{display:"none"},drawer:{width:Ge,flexShrink:0},drawerPaper:{width:Ge},drawerHeader:Xe(Xe({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-start"}),content:{flexGrow:1,padding:e.spacing(3),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginRight:-240},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginRight:0}}}));function Je(e){var t=e.children,n=Ve(),i=Object(V.a)(),s=Object(r.useContext)(Ue.a).active,c=Object(r.useState)(!1),l=c[0],d=c[1];return Object(o.jsxs)("div",{className:n.root,children:[Object(o.jsx)(be.a,{position:"fixed",className:Object(X.a)(n.appBar,Object(a.a)({},n.appBarShift,l)),children:Object(o.jsxs)(je,{children:[Object(o.jsxs)(ye.a,{component:"h1",variant:"body1",noWrap:!0,className:n.title,children:[s.icon&&Object(o.jsx)(He.a,{name:s.icon,fontSize:"large",style:{marginRight:"2rem"}})," ",s.title]}),Object(o.jsx)(Ee.a,{color:"inherit","aria-label":"open drawer",edge:"end",onClick:function(){d(!0)},className:Object(X.a)(l&&n.hide),children:Object(o.jsx)(Pe.a,{})})]})}),Object(o.jsx)("div",{className:Object(X.a)(n.content,Object(a.a)({},n.contentShift,l)),children:Object(o.jsx)("main",{children:Object(o.jsxs)(Be,{maxWidth:"xl",children:[Object(o.jsx)("div",{className:n.drawerHeader}),t]})})}),Object(o.jsxs)(he,{className:n.drawer,variant:"persistent",anchor:"right",open:l,classes:{paper:n.drawerPaper},children:[Object(o.jsx)("div",{className:n.drawerHeader,children:Object(o.jsx)(Ee.a,{onClick:function(){d(!1)},children:"rtl"===i.direction?Object(o.jsx)(De.a,{}):Object(o.jsx)(Le.a,{})})}),Object(o.jsx)(Se,{}),Object(o.jsx)(xe.a,{children:Object(o.jsxs)(Ie.a,{button:!0,children:[Object(o.jsx)(Re.a,{children:Object(o.jsx)(Ae.a,{})}),Object(o.jsx)(ze,{primary:"some text"})]})}),Object(o.jsx)(Se,{})]})]})}function Ke(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function Ye(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ke(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ke(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Qe(e){var t=e.Component,n=e.pageProps;return b.a.changeLanguage(n.language),Object(o.jsx)(Ue.b,{children:Object(o.jsxs)(u,{theme:p.c,children:[Object(o.jsx)(h,{}),Object(o.jsx)(Je,{children:Object(o.jsx)(t,Ye({},n))})]})})}},eP7u:function(e,t,n){var o={"./de/translation.json":"o9J7","./en/translation.json":"Pz+C"};function a(e){var t=i(e);return n(t)}function i(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}a.keys=function(){return Object.keys(o)},a.resolve=i,e.exports=a,a.id="eP7u"},o9J7:function(e){e.exports=JSON.parse('{"home":{"meta":{"title":"Decision Tracer | Home","description":"Finde einfach und mit Substanz zu Deiner Entscheidung","keywords":"Rechner, Entscheidungshilfe, Corona"}},"common":{"navbar":{},"heading":{"logo":"Willkommen auf Decision Tracer"}},"calculator":{"new_decision":"Entscheidung","probability":"Wahrscheinlichkeit","value":"Nutzwert","expected_utility":"Erwartungsnutzen","subcases":"Sub-Szenarien","add_scenario":"Szenario hinzuf\xfcgen","add_case":"Sub-Szenario hinzuf\xfcgen","remove_scenario":"Szenario l\xf6schen","remove_case":"Sub-Szenario l\xf6schen","remove_decision":"Entscheidung l\xf6schen","independent":"Unabh\xe4ngig","result":"Ergebnis"}}')},uniG:function(e,t,n){"use strict";var o=n("TqRt"),a=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("q1tI")),r=(0,o(n("8/g6")).default)(i.createElement("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");t.default=r}},[[0,1,2,0,3,5,4]]]);