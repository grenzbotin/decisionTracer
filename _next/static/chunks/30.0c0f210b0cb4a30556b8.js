(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[30,10,15],{"/0+H":function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=i,t.useAmp=function(){return i(r.default.useContext(a.AmpStateContext))};var o,r=(o=n("q1tI"))&&o.__esModule?o:{default:o},a=n("lwAK");function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,o=e.hybrid,r=void 0!==o&&o,a=e.hasQuery,i=void 0!==a&&a;return n||r&&i}},"20a2":function(e,t,n){e.exports=n("nOHt")},"48fX":function(e,t,n){var o=n("qhzo");e.exports=function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}},"5fIB":function(e,t,n){var o=n("7eYB");e.exports=function(e){if(Array.isArray(e))return o(e)}},"8Kt/":function(e,t,n){"use strict";n("oI91");t.__esModule=!0,t.defaultHead=d,t.default=void 0;var o,r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var a=o?Object.getOwnPropertyDescriptor(e,r):null;a&&(a.get||a.set)?Object.defineProperty(n,r,a):n[r]=e[r]}n.default=e,t&&t.set(e,n);return n}(n("q1tI")),a=(o=n("Xuae"))&&o.__esModule?o:{default:o},i=n("lwAK"),c=n("FYa8"),s=n("/0+H");function u(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[r.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(r.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===r.default.Fragment?e.concat(r.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var l=["name","httpEquiv","charSet","itemProp"];function f(e,t){return e.reduce((function(e,t){var n=r.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(p,[]).reverse().concat(d(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,o={};return function(r){var a=!0,i=!1;if(r.key&&"number"!==typeof r.key&&r.key.indexOf("$")>0){i=!0;var c=r.key.slice(r.key.indexOf("$")+1);e.has(c)?a=!1:e.add(c)}switch(r.type){case"title":case"base":t.has(r.type)?a=!1:t.add(r.type);break;case"meta":for(var s=0,u=l.length;s<u;s++){var d=l[s];if(r.props.hasOwnProperty(d))if("charSet"===d)n.has(d)?a=!1:n.add(d);else{var p=r.props[d],f=o[d]||new Set;"name"===d&&i||!f.has(p)?(f.add(p),o[d]=f):a=!1}}}return a}}()).reverse().map((function(e,t){var n=e.key||t;return r.default.cloneElement(e,{key:n})}))}function h(e){var t=e.children,n=(0,r.useContext)(i.AmpStateContext),o=(0,r.useContext)(c.HeadManagerContext);return r.default.createElement(a.default,{reduceComponentsToState:f,headManager:o,inAmpMode:(0,s.isInAmpMode)(n)},t)}h.rewind=function(){};var m=h;t.default=m},FYa8:function(e,t,n){"use strict";var o;t.__esModule=!0,t.HeadManagerContext=void 0;var r=((o=n("q1tI"))&&o.__esModule?o:{default:o}).default.createContext({});t.HeadManagerContext=r},T0f4:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},Xuae:function(e,t,n){"use strict";var o=n("mPvQ"),r=n("/GRZ"),a=n("i2R6"),i=(n("qXWd"),n("48fX")),c=n("tCBg"),s=n("T0f4");function u(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=s(e);if(t){var r=s(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return c(this,n)}}t.__esModule=!0,t.default=void 0;var d=n("q1tI"),p=function(e){i(n,e);var t=u(n);function n(e){var a;return r(this,n),(a=t.call(this,e))._hasHeadManager=void 0,a.emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(o(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(d.Component);t.default=p},g4pe:function(e,t,n){e.exports=n("8Kt/")},j1XH:function(e,t,n){"use strict";n.r(t);var o=n("nKUr"),r=n("g4pe"),a=n.n(r),i=n("20a2");t.default=function(e){var t=e.title,n=e.description,r=e.keywords,c=void 0===r?"":r,s=e.metaImg,u=void 0===s?"meta_home":s,d=e.noRobots,p=void 0!==d&&d,l=Object(i.useRouter)().asPath,f="https://www.rational-decision.org",h=l.includes("de")?"de":"en";return Object(o.jsxs)(a.a,{children:[Object(o.jsx)("title",{children:t}),Object(o.jsx)("meta",{name:"robots",content:p?"noindex,nofollow":"index,follow"}),Object(o.jsx)("meta",{name:"description",content:n}),Object(o.jsx)("meta",{name:"keywords",content:c||""}),Object(o.jsx)("meta",{property:"og:url",content:"".concat(f).concat(l)},"ogurl"),Object(o.jsx)("meta",{property:"og:image",content:"".concat(f,"/img/").concat(u,"_").concat(h,".png")},"ogimage"),Object(o.jsx)("meta",{property:"og:title",content:t},"ogtitle"),Object(o.jsx)("meta",{property:"og:description",content:n},"ogdesc"),Object(o.jsx)("meta",{name:"viewport",content:"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,shrink-to-fit=no"}),Object(o.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://rational-decision.org/#organization",name:"Rational Decision",url:"https://www.rational-decision.org",logo:{"@type":"ImageObject","@id":"https://rational-decision.org/#logo",url:"https://rational-decision.org/img/meta_home_en.png",contentUrl:"https://rational-decision.org/img/meta_home_en.png",width:658,height:329,caption:"Rational Decision"},image:{"@id":"https://rational-decision.org/#logo"}},{"@type":"WebSite","@id":"https://rational-decision.org/en/#website",url:"https://rational-decision.org/en",name:"Rational Decision",description:"Rational based decision making",publisher:{"@id":"https://rational-decision.org/#organization"},inLanguage:"en"},{"@type":"WebSite","@id":"https://rational-decision.org/de/#website",url:"https://rational-decision.org/de",name:"Rational Decision",description:"Rationale Entscheidungen f\xe4llen",publisher:{"@id":"https://rational-decision.org/#organization"},inLanguage:"de"}]})}})]})}},kG2m:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},lwAK:function(e,t,n){"use strict";var o;t.__esModule=!0,t.AmpStateContext=void 0;var r=((o=n("q1tI"))&&o.__esModule?o:{default:o}).default.createContext({});t.AmpStateContext=r},mPvQ:function(e,t,n){var o=n("5fIB"),r=n("rlHP"),a=n("KckH"),i=n("kG2m");e.exports=function(e){return o(e)||r(e)||a(e)||i()}},qXWd:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},rlHP:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},tCBg:function(e,t,n){var o=n("C+bE"),r=n("qXWd");e.exports=function(e,t){return!t||"object"!==o(t)&&"function"!==typeof t?r(e):t}}}]);