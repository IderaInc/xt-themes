!function(o){"object"==typeof module&&void 0!==module.exports?module.exports=o:o(FusionCharts)}((function(o){!function(){var e={660:function(o){o.exports=function(o){var e=document.querySelector("head");const t=document.querySelector('meta[http-equiv="Content-Security-Policy"]');if(t){const e=t.getAttribute("content");if(e){const t=e.match(/'nonce-([^']+)'/);t&&o.setAttribute("nonce",t[1])}}var n=window._lastElementInsertedByStyleLoader;n?n.nextSibling?e.insertBefore(o,n.nextSibling):e.appendChild(o):e.insertBefore(o,e.firstChild),window._lastElementInsertedByStyleLoader=o}},759:function(o,e,t){(o.exports=t(765)(!1)).push([o.id,'@font-face {\n  font-family: "Source Sans Pro";\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2)\n    format("woff2");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n@font-face {\n  font-family: "Source Sans Pro Semi-Bold";\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdu3cOWxw.woff2)\n    format("woff2");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}',""])},765:function(o){o.exports=function(o){var e=[];return e.toString=function(){return this.map((function(e){var t=function(o,e){var t,n=o[1]||"",r=o[3];if(!r)return n;if(e&&"function"==typeof btoa){var a=(t=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"),i=r.sources.map((function(o){return"/*# sourceURL="+r.sourceRoot+o+" */"}));return[n].concat(i).concat([a]).join("\n")}return[n].join("\n")}(e,o);return e[2]?"@media "+e[2]+"{"+t+"}":t})).join("")},e.i=function(o,t){"string"==typeof o&&(o=[[null,o,""]]);for(var n={},r=0;r<this.length;r++){var a=this[r][0];"number"==typeof a&&(n[a]=!0)}for(r=0;r<o.length;r++){var i=o[r];"number"==typeof i[0]&&n[i[0]]||(t&&!i[2]?i[2]=t:t&&(i[2]="("+i[2]+") and ("+t+")"),e.push(i))}},e}},72:function(o){"use strict";var e=[];function t(o){for(var t=-1,n=0;n<e.length;n++)if(e[n].identifier===o){t=n;break}return t}function n(o,n){for(var a={},i=[],s=0;s<o.length;s++){var l=o[s],c=n.base?l[0]+n.base:l[0],f=a[c]||0,u="".concat(c," ").concat(f);a[c]=f+1;var d=t(u),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==d)e[d].references++,e[d].updater(p);else{var m=r(p,n);n.byIndex=s,e.splice(s,0,{identifier:u,updater:m,references:1})}i.push(u)}return i}function r(o,e){var t=e.domAPI(e);return t.update(o),function(e){if(e){if(e.css===o.css&&e.media===o.media&&e.sourceMap===o.sourceMap&&e.supports===o.supports&&e.layer===o.layer)return;t.update(o=e)}else t.remove()}}o.exports=function(o,r){var a=n(o=o||[],r=r||{});return function(o){o=o||[];for(var i=0;i<a.length;i++){var s=t(a[i]);e[s].references--}for(var l=n(o,r),c=0;c<a.length;c++){var f=t(a[c]);0===e[f].references&&(e[f].updater(),e.splice(f,1))}a=l}}},540:function(o){"use strict";o.exports=function(o){var e=document.createElement("style");return o.setAttributes(e,o.attributes),o.insert(e,o.options),e}},56:function(o,e,t){"use strict";o.exports=function(o){var e=t.nc;e&&o.setAttribute("nonce",e)}},825:function(o){"use strict";o.exports=function(o){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=o.insertStyleElement(o);return{update:function(t){!function(o,e,t){var n="";t.supports&&(n+="@supports (".concat(t.supports,") {")),t.media&&(n+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(n+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),n+=t.css,r&&(n+="}"),t.media&&(n+="}"),t.supports&&(n+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(n,o,e.options)}(e,o,t)},remove:function(){!function(o){if(null===o.parentNode)return!1;o.parentNode.removeChild(o)}(e)}}}},113:function(o){"use strict";o.exports=function(o,e){if(e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={id:o,exports:{}};return e[o](a,a.exports,n),a.exports}n.n=function(o){var e=o&&o.__esModule?function(){return o.default}:function(){return o};return n.d(e,{a:e}),e},n.d=function(o,e){for(var t in e)n.o(e,t)&&!n.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:e[t]})},n.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},n.nc=void 0,function(){"use strict";var e=n(72),t=n.n(e),r=n(825),a=n.n(r),i=n(660),s=n.n(i),l=n(56),c=n.n(l),f=n(540),u=n.n(f),d=n(113),p=n.n(d),m=n(759),h=n.n(m),S={};S.styleTagTransform=p(),S.setAttributes=c(),S.insert=s(),S.domAPI=a(),S.insertStyleElement=u(),t()(h(),S),h()&&h().locals&&h().locals;o.addDep({extension:{name:"accessibility",theme:{base:{chart:{showBorder:0,showCanvasBorder:0,bgColor:"#ffffff",canvasBgcolor:"#ffffff",showPlotBorder:0,usePlotGradientColor:0,showAlternateHGridColor:0,showAlternateVGridColor:0,divLineColor:"#545454",divLineAlpha:100,divLineThickness:1,paletteColors:"#5D62B5, #009E73, #F0E442, #56B4E9, #D55E00, #E69F00, #56B4E9",baseFont:"Source Sans Pro",baseFontSize:"0.875rem",baseFontColor:"#545454",outCnvBaseFont:"Source Sans Pro",outCnvBaseFontSize:"0.875rem",outCnvBaseFontColor:"#545454",captionFont:"Source Sans Pro Semi-Bold",captionFontColor:"#000000",captionFontSize:"1.5rem",captionFontBold:0,subCaptionFont:"Source Sans Pro",subCaptionFontColor:"#545454",subCaptionFontSize:"1.25rem",subCaptionFontBold:0,xAxisNameFont:"Source Sans Pro",yAxisNameFont:"Source Sans Pro",xAxisNameFontBold:0,yAxisNameFontBold:0,xAxisNameFontColor:"#000000",yAxisNameFontColor:"#000000",xAxisNameFontSize:"1rem",yAxisNameFontSize:"1rem",valueFont:"Source Sans Pro",valueFontBold:0,valueFontSize:"1rem",showValues:0,legendItemFont:"Source Sans Pro",legendItemFontBold:0,legendItemFontSize:"1rem",legendItemFontColor:"#545454",drawCustomLegendIcon:1,legendShadow:0,legendBorderAlpha:0,legendBorderThickness:0,legendIconBorderThickness:0,legendBgAlpha:0,legendCaptionFontColor:"#000000",legendCaptionFontSize:"1.125rem",legendCaptionFontBold:0,crossLineAnimation:1,crossLineColor:"#545454",legendIconScale:1.25,legendItemHiddenColor:"#545454",alignLegendWithCanvas:1,toolTipBgColor:"#ffffff",toolTipBgAlpha:100,toolTipColor:"#000000",showToolTipShadow:0,tooltipBorderColor:"#545454",showShadow:0,plotFillAlpha:100,legendIconBgAlpha:"inherit",legendIconAlpha:"inherit"}},column2d:{chart:{paletteColors:"#5D62B5"}},column3d:{chart:{paletteColors:"#5D62B5"}},line:{chart:{paletteColors:"#5D62B5"}},area2d:{chart:{paletteColors:"#5D62B5"}},bar2d:{chart:{paletteColors:"#5D62B5"}},bar3d:{chart:{paletteColors:"#5D62B5"}},mscolumn2d:{chart:{formatnumberscale:"1"}},msline:{chart:{showhovereffect:"1",lineThickness:2,anchorRadius:4,anchorBgColor:"inherit",legendIconSides:1}},pie2d:{chart:{use3DLighting:0,showPercentValues:1,showValues:1,showPercentInTooltip:0,showLegend:1,legendIconSides:1}},doughnut2d:{chart:{centerLabelColor:"#000000",centerLabelFontSize:"1rem",showPercentInTooltip:0,showLegend:1,legendIconSides:1,showValues:1,showPercentValues:1,use3DLighting:0}},doughnut3d:{chart:{centerLabelColor:"#000000",centerLabelFontSize:"1rem"}},pareto2d:{chart:{paletteColors:"#5D62B5"}},pareto3d:{chart:{paletteColors:"#5D62B5"}},msarea:{chart:{plotFillAlpha:60,showAnchors:0,anchorRadius:4,anchorBgColor:"inherit",legendIconSides:1}},gantt:{categories:[{baseFont:"Source Sans Pro",baseFontSize:"0.875rem",baseFontColor:"#545454"}]},funnel:{chart:{is2D:1,smartLineThickness:1,smartLineColor:"#545454",smartLineAlpha:100,useSameSlantAngle:1,alignCaptionWithCanvas:1,labelFontSize:"1rem"}},spline:{chart:{paletteColors:"#5D62B5"}},splinearea:{chart:{paletteColors:"#5D62B5"}},dragcolumn2d:{categories:[{category:[{fontItalic:"1"}]}]},dragline:{categories:[{category:[{fontItalic:"1"}]}]},dragarea:{categories:[{category:[{fontItalic:"1"}]}]},radar:{chart:{anchorRadius:4,anchorBgColor:"inherit",anchorBgAlpha:60,anchorBorderAlpha:60,plotFillAlpha:60,legendIconSides:1}},waterfall2d:{chart:{positiveColor:"#F0E442",negativeColor:"#D55E00"}},timeseries:{chart:{paletteColors:"#5D62B5, #009E73, #F0E442, #56B4E9, #D55E00, #E69F00, #56B4E9",baseFont:"Source Sans Pro",multiCanvasTooltip:1,style:{text:{"font-family":"Source Sans Pro","font-size":"14px",fill:"#545454"},canvas:{stroke:"#545454","stroke-width":1}}},caption:{style:{text:{"font-size":"24px","font-family":"Source Sans Pro Semi-Bold",fill:"#000000"}}},subcaption:{style:{text:{"font-size":"20px","font-family":"Source Sans Pro",fill:"#545454","font-weight":400}}},crossline:{style:{line:{stroke:"#545454","stroke-width":1,opacity:.5}}},tooltip:{style:{container:{"background-color":"#FFFFFF",opacity:1,border:"1px solid #545454","border-radius":"0px",padding:"6px"},text:{"font-size":"14px",color:"#545454"},header:{color:"#000000","font-family":"Source Sans Pro","font-size":"16px",padding:"0px"},body:{padding:"0px"}}},legend:{style:{text:{fill:"#545454","font-size":"16px","font-family":"Source Sans Pro"}}},navigator:{text:{style:{fill:"#ff0000"}},scrollbar:{style:{button:{fill:"rgba(84, 84, 84, 0.2)"},track:{fill:"#ededed"},scroller:{fill:"rgba(84, 84, 84, 0.2)"}}},window:{style:{handle:{fill:"rgba(84, 84, 84, 0.2)"},mask:{opacity:1,stroke:"#rgba(84, 84, 84, 0.2)","stroke-width":1}}}},extensions:{standardRangeSelector:{style:{"button-text":{fill:"#545454","font-family":"Source Sans Pro","font-size":"16px"},"button-text:hover":{fill:"#000000","font-family":"Source Sans Pro","font-size":"16px"},"button-text:active":{fill:"#000000","font-family":"Source Sans Pro","font-size":"16px"},separator:{stroke:"#545454"}}},customRangeSelector:{style:{"title-text":{"font-family":"Source Sans Pro","font-size":"16px",fill:"#ff0000"},"title-icon":{"font-family":"Source Sans Pro","font-size":"16px",fill:"#000000"},label:{color:"#545454","font-family":"Source Sans Pro","font-size":"14px"},input:{"background-color":"#fcfcfc",color:"#545454","font-family":"Source Sans Pro","font-size":"14px"},"button-apply":{color:"#FFFFFF","background-color":"#5D62B5",border:"none","font-family":"Source Sans Pro","font-size":"16px"},"button-cancel":{color:"#545454","background-color":"#ffffff",border:"none","font-family":"Source Sans Pro","font-size":"16px"},"button-cancel:hover":{color:"#000000"},"cal-header":{"background-color":"#5D62B5","font-family":"Source Sans Pro","font-size":"16px"},"cal-navprev":{"font-family":"Source Sans Pro","font-size":"16px"},"cal-navnext":{"font-family":"Source Sans Pro","font-size":"16px"},"cal-weekend":{"background-color":"#e2e3f2"},"cal-days":{color:"#000000","font-family":"Source Sans Pro","font-size":"14px"},"cal-date":{color:"#545454","font-family":"Source Sans Pro","font-size":"14px"},"cal-date:hover":{"background-color":"#5D62B5",color:"#FFFFFF","font-family":"Source Sans Pro",border:"none"},"cal-selecteddate":{"background-color":"#5D62B5",color:"#FFFFFF","font-family":"Source Sans Pro",border:"none"},"cal-disableddate":{color:"rgba(84, 84, 84, 0.5)","font-family":"Source Sans Pro"}}}},xaxis:{style:{title:{"font-size":16,"font-family":"Source Sans Pro",fill:"#000000"},"grid-line":{stroke:"#545454","stroke-width":1},"tick-mark-major":{stroke:"#545454","stroke-width":1},"tick-mark-minor":{stroke:"#545454","stroke-width":.75},"label-major":{color:"#545454","font-size":14,"font-family":"Source Sans Pro"},"label-minor":{color:"#545454","font-size":14,opacity:.75,"font-family":"Source Sans Pro"},"label-context":{color:"#545454","font-size":14,"font-family":"Source Sans Pro"}}},yaxis:[{style:{title:{"font-size":"16","font-family":"Source Sans Pro",fill:"#000000"},"tick-mark":{stroke:"#545454","stroke-width":1},"grid-line":{stroke:"#545454","stroke-width":1},label:{color:"#545454","font-size":14,"font-family":"Source Sans Pro"}},plot:[{value:"Downloads",type:"column"},{value:"Web Visits",type:"line"}]}]}}},name:"accessibilityTheme",type:"theme"})}()}()}));
//# sourceMappingURL=fusioncharts.theme.accessibility.js.map