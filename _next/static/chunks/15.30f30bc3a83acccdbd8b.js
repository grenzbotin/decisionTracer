(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[15],{hNxu:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return O}));var n=r("nKUr"),o=r("cpVT"),a=r("q1tI"),i=r("Vvt1"),c=r.n(i),s=r("4s29"),u=r("kKAo"),b=r("JSsD");function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var l=c()((function(){return Promise.all([r.e(6),r.e(16)]).then(r.t.bind(null,"o+DJ",7))}),{ssr:!1,loadableGenerated:{webpack:function(){return["o+DJ"]},modules:["react-apexcharts"]}}),f={chart:{id:"basicValues",type:"bar"},plotOptions:{bar:{borderRadius:6,endingShape:"rounded",distributed:!0}},grid:{row:{colors:["#fff","#f2f2f2"]}},yaxis:{title:{text:"Nutzwert"}},dataLabels:{enabled:!1},legend:{show:!1},annotations:{yaxis:[{y:0,strokeDashArray:0,borderColor:"#919191",borderWidth:2}]}};var O=function(){var e=Object(a.useContext)(s.a).decisions,t=e.map((function(e){return e.title})),r=function(e){return e.map((function(e){var t=0;return e.cases.forEach((function(e){t+=e.value*(e.probability/100)})),Math.round(100*t/100)}))}(e),o=Object(b.b)(e.length);return Object(n.jsx)(u.a,{style:{minWidth:"200px",padding:"1rem",marginTop:"1rem"},children:Object(n.jsx)(l,{options:d(d({},f),{},{colors:o,xaxis:{categories:t}}),series:[{name:"Nutzwert",data:r}],type:"bar",height:300,width:"100%"})})}}}]);