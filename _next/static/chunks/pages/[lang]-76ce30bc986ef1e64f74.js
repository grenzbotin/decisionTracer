_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[16],{"50B7":function(e,t,a){"use strict";var c=a("wx14"),i=a("Ff2n"),r=a("q1tI"),n=(a("17x9"),a("iuhU")),s=a("H2TA"),o=a("ofer"),d=r.forwardRef((function(e,t){var a=e.action,s=e.avatar,d=e.classes,l=e.className,m=e.component,b=void 0===m?"div":m,u=e.disableTypography,g=void 0!==u&&u,p=e.subheader,h=e.subheaderTypographyProps,f=e.title,j=e.titleTypographyProps,x=Object(i.a)(e,["action","avatar","classes","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"]),v=f;null==v||v.type===o.a||g||(v=r.createElement(o.a,Object(c.a)({variant:s?"body2":"h5",className:d.title,component:"span",display:"block"},j),v));var w=p;return null==w||w.type===o.a||g||(w=r.createElement(o.a,Object(c.a)({variant:s?"body2":"body1",className:d.subheader,color:"textSecondary",component:"span",display:"block"},h),w)),r.createElement(b,Object(c.a)({className:Object(n.a)(d.root,l),ref:t},x),s&&r.createElement("div",{className:d.avatar},s),r.createElement("div",{className:d.content},v,w),a&&r.createElement("div",{className:d.action},a))}));t.a=Object(s.a)({root:{display:"flex",alignItems:"center",padding:16},avatar:{flex:"0 0 auto",marginRight:16},action:{flex:"0 0 auto",alignSelf:"flex-start",marginTop:-8,marginRight:-8},content:{flex:"1 1 auto"},title:{},subheader:{}},{name:"MuiCardHeader"})(d)},Ae98:function(e,t,a){"use strict";a.r(t),a.d(t,"__N_SSG",(function(){return q})),a.d(t,"default",(function(){return z}));var c=a("nKUr"),i=a("q1tI"),r=a("30+C"),n=a("tRbT"),s=a("ofer"),o=a("wx14"),d=a("Ff2n"),l=(a("17x9"),a("iuhU")),m=a("H2TA"),b=["video","audio","picture","iframe","img"],u=i.forwardRef((function(e,t){var a=e.children,c=e.classes,r=e.className,n=e.component,s=void 0===n?"div":n,m=e.image,u=e.src,g=e.style,p=Object(d.a)(e,["children","classes","className","component","image","src","style"]),h=-1!==b.indexOf(s),f=!h&&m?Object(o.a)({backgroundImage:'url("'.concat(m,'")')},g):g;return i.createElement(s,Object(o.a)({className:Object(l.a)(c.root,r,h&&c.media,-1!=="picture img".indexOf(s)&&c.img),ref:t,style:f,src:h?m||u:void 0},p),a)})),g=Object(m.a)({root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"},img:{objectFit:"cover"}},{name:"MuiCardMedia"})(u),p=a("XzT5"),h=a("Vvt1"),f=a.n(h),j=a("XN6s"),x=a("4s29"),v=a("YFqc"),w=a.n(v),y=a("E3hX"),O=a.n(y),_=a("R/WZ"),T=a("50B7"),N=a("5AJ6"),S=Object(N.a)(i.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var k=i.forwardRef((function(e,t){var a=e.alt,c=e.children,r=e.classes,n=e.className,s=e.component,m=void 0===s?"div":s,b=e.imgProps,u=e.sizes,g=e.src,p=e.srcSet,h=e.variant,f=void 0===h?"circle":h,j=Object(d.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),x=null,v=function(e){var t=e.src,a=e.srcSet,c=i.useState(!1),r=c[0],n=c[1];return i.useEffect((function(){if(t||a){n(!1);var e=!0,c=new Image;return c.src=t,c.srcSet=a,c.onload=function(){e&&n("loaded")},c.onerror=function(){e&&n("error")},function(){e=!1}}}),[t,a]),r}({src:g,srcSet:p}),w=g||p,y=w&&"error"!==v;return x=y?i.createElement("img",Object(o.a)({alt:a,src:g,srcSet:p,sizes:u,className:r.img},b)):null!=c?c:w&&a?a[0]:i.createElement(S,{className:r.fallback}),i.createElement(m,Object(o.a)({className:Object(l.a)(r.root,r.system,r[f],n,!y&&r.colorDefault),ref:t},j),x)})),E=Object(m.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},circular:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(k),C=a("oa/T"),R=a("PsDL"),I=a("gxeb"),P=a("JSsD"),A=Object(_.a)({root:{cursor:"pointer"},avatar:{backgroundColor:P.b},media:{height:"200px"},content:{"&.MuiCardContent-root:last-child":{padding:"1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}});function H(e){var t=e.preset,i=A(),n=a("fAca")("./".concat(t.image,".jpg"));return Object(c.jsx)(w.a,{href:{pathname:"/[lang]/".concat(t.url),query:{lang:p.a.language}},children:Object(c.jsxs)(r.a,{className:i.root,variant:"outlined",children:[Object(c.jsx)(T.a,{avatar:Object(c.jsx)(E,{"aria-label":p.a.t(t.title),className:i.avatar,children:Object(c.jsx)(I.a,{name:t.icon})}),title:p.a.t(t.title)}),Object(c.jsx)(g,{component:"img",srcSet:n.srcSet,src:n.src,className:i.media,title:p.a.t(t.title)}),Object(c.jsxs)(C.a,{className:i.content,children:[Object(c.jsxs)("div",{children:[Object(c.jsx)(s.a,{variant:"body2",component:"p",children:p.a.t(t.question)}),Object(c.jsx)(s.a,{variant:"caption",color:"textSecondary",component:"p",children:p.a.t(t.description)})]}),Object(c.jsx)(R.a,{color:"primary","aria-label":"go to preset",children:Object(c.jsx)(O.a,{fontSize:"small"})})]})]})})}var F=f()((function(){return Promise.all([a.e(1),a.e(26)]).then(a.bind(null,"j1XH"))}),{loadableGenerated:{webpack:function(){return["j1XH"]},modules:["../../components/HtmlHeader"]}}),q=!0;function z(){var e=Object(i.useContext)(x.a),t=e.active,a=e.setActiveFromPreset;return Object(i.useEffect)((function(){t&&a(null)}),[t,a]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(F,{title:p.a.t("home.meta.title"),description:p.a.t("home.meta.description"),keywords:p.a.t("home.meta.keywords"),metaImg:"meta_home"}),Object(c.jsx)(r.a,{variant:"outlined",style:{margin:"1rem 0 2rem 0",padding:"1rem"},children:Object(c.jsxs)(n.a,{container:!0,spacing:3,children:[Object(c.jsxs)(n.a,{item:!0,md:8,sm:6,xs:12,children:[Object(c.jsx)(s.a,{variant:"h6",gutterBottom:!0,children:"Howdy!"}),p.a.t("home.intro").split("\n").map((function(e,t){return Object(c.jsx)(s.a,{variant:"body2",component:"p",style:{marginBottom:(2===t||5===t)&&".6rem"},children:e},e)}))]}),Object(c.jsx)(n.a,{item:!0,md:4,sm:6,xs:12,style:{display:"flex",alignItems:"center",justifyContent:"center"},children:Object(c.jsx)(g,{component:"iframe",image:"https://www.youtube-nocookie.com/embed/qRZys9H_ihc",title:"Tutorial video",style:{height:200,width:300}})})]})}),Object(c.jsx)(n.a,{container:!0,spacing:2,children:j.a.map((function(e){return Object(c.jsx)(n.a,{md:4,sm:6,lg:3,xs:12,item:!0,children:Object(c.jsx)(H,{preset:e})},e.key)}))})]})}},DDHp:function(e,t){e.exports={srcSet:"/decisionTracer/_next/static/images/custom-400-b3d773e3306db726086e7c731a4124db.jpg 400w,/decisionTracer/_next/static/images/custom-500-fa009edb82dab2f38b2ac94aa3df0bae.jpg 500w,/decisionTracer/_next/static/images/custom-600-6317ce65122296a4997a1b407b747497.jpg 600w",images:[{path:"/decisionTracer/_next/static/images/custom-400-b3d773e3306db726086e7c731a4124db.jpg",width:400,height:267},{path:"/decisionTracer/_next/static/images/custom-500-fa009edb82dab2f38b2ac94aa3df0bae.jpg",width:500,height:334},{path:"/decisionTracer/_next/static/images/custom-600-6317ce65122296a4997a1b407b747497.jpg",width:600,height:400}],src:"/decisionTracer/_next/static/images/custom-400-b3d773e3306db726086e7c731a4124db.jpg",toString:function(){return"/decisionTracer/_next/static/images/custom-400-b3d773e3306db726086e7c731a4124db.jpg"},width:400,height:267}},E3hX:function(e,t,a){"use strict";var c=a("TqRt"),i=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(a("q1tI")),n=(0,c(a("8/g6")).default)(r.createElement("path",{d:"M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"}),"ArrowForwardIos");t.default=n},NB6b:function(e,t){e.exports={srcSet:"/decisionTracer/_next/static/images/virus-400-a7cb081b253b32d2d3e95a6d5abde402.jpg 400w,/decisionTracer/_next/static/images/virus-500-476bc5071fe2db91d89de0ab44882c9f.jpg 500w,/decisionTracer/_next/static/images/virus-600-081ebe2d83d00db6e9526c1f6a46d0fb.jpg 600w",images:[{path:"/decisionTracer/_next/static/images/virus-400-a7cb081b253b32d2d3e95a6d5abde402.jpg",width:400,height:225},{path:"/decisionTracer/_next/static/images/virus-500-476bc5071fe2db91d89de0ab44882c9f.jpg",width:500,height:281},{path:"/decisionTracer/_next/static/images/virus-600-081ebe2d83d00db6e9526c1f6a46d0fb.jpg",width:600,height:338}],src:"/decisionTracer/_next/static/images/virus-400-a7cb081b253b32d2d3e95a6d5abde402.jpg",toString:function(){return"/decisionTracer/_next/static/images/virus-400-a7cb081b253b32d2d3e95a6d5abde402.jpg"},width:400,height:225}},fAca:function(e,t,a){var c={"./coin.jpg":"wlCC","./custom.jpg":"DDHp","./virus.jpg":"NB6b"};function i(e){var t=r(e);return a(t)}function r(e){if(!a.o(c,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return c[e]}i.keys=function(){return Object.keys(c)},i.resolve=r,e.exports=i,i.id="fAca"},kjbI:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[lang]",function(){return a("Ae98")}])},"oa/T":function(e,t,a){"use strict";var c=a("wx14"),i=a("Ff2n"),r=a("q1tI"),n=(a("17x9"),a("iuhU")),s=a("H2TA"),o=r.forwardRef((function(e,t){var a=e.classes,s=e.className,o=e.component,d=void 0===o?"div":o,l=Object(i.a)(e,["classes","className","component"]);return r.createElement(d,Object(c.a)({className:Object(n.a)(a.root,s),ref:t},l))}));t.a=Object(s.a)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(o)},wlCC:function(e,t){e.exports={srcSet:"/decisionTracer/_next/static/images/coin-400-a2b575997132d10e1687e8982159f612.jpg 400w,/decisionTracer/_next/static/images/coin-500-5154419f8e6f4719887c8ed30ea2dda4.jpg 500w,/decisionTracer/_next/static/images/coin-600-2ef61b2ae523b80f084279643e22959a.jpg 600w",images:[{path:"/decisionTracer/_next/static/images/coin-400-a2b575997132d10e1687e8982159f612.jpg",width:400,height:266},{path:"/decisionTracer/_next/static/images/coin-500-5154419f8e6f4719887c8ed30ea2dda4.jpg",width:500,height:333},{path:"/decisionTracer/_next/static/images/coin-600-2ef61b2ae523b80f084279643e22959a.jpg",width:600,height:399}],src:"/decisionTracer/_next/static/images/coin-400-a2b575997132d10e1687e8982159f612.jpg",toString:function(){return"/decisionTracer/_next/static/images/coin-400-a2b575997132d10e1687e8982159f612.jpg"},width:400,height:266}}},[["kjbI",2,3,0,4,5,6,11]]]);