
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory(FusionCharts);
  }
}(function (FusionCharts) {
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 660:
/***/ ((module) => {

function insertAtTop(element){var parent=document.querySelector('head');// eslint-disable-next-line no-underscore-dangle
const metaTag=document.querySelector(`meta[http-equiv="Content-Security-Policy"]`);if(metaTag){const content=metaTag.getAttribute('content');if(content){const match=content.match(/'nonce-([^']+)'/);if(match){element.setAttribute('nonce',match[1])}}}var lastInsertedElement=window._lastElementInsertedByStyleLoader;if(!lastInsertedElement){parent.insertBefore(element,parent.firstChild)}else if(lastInsertedElement.nextSibling){parent.insertBefore(element,lastInsertedElement.nextSibling)}else{parent.appendChild(element)}// eslint-disable-next-line no-underscore-dangle
window._lastElementInsertedByStyleLoader=element}module.exports=insertAtTop;

/***/ }),

/***/ 759:
/***/ ((module, exports, __webpack_require__) => {

exports = module.exports = __webpack_require__(765)(false);
// imports


// module
exports.push([module.id, "@font-face {\n  font-family: \"Source Sans Pro\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2)\n    format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n@font-face {\n  font-family: \"Source Sans Pro Semi-Bold\";\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdu3cOWxw.woff2)\n    format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}", ""]);

// exports


/***/ }),

/***/ 765:
/***/ ((module) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 72:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 540:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 825:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./insert-function.js
var insert_function = __webpack_require__(660);
var insert_function_default = /*#__PURE__*/__webpack_require__.n(insert_function);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/index.js!./develop/src/accessibility/fusioncharts.theme.accessibility.css
var fusioncharts_theme_accessibility = __webpack_require__(759);
var fusioncharts_theme_accessibility_default = /*#__PURE__*/__webpack_require__.n(fusioncharts_theme_accessibility);
;// ./develop/src/accessibility/fusioncharts.theme.accessibility.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = (insert_function_default());
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()((fusioncharts_theme_accessibility_default()), options);




       /* harmony default export */ const accessibility_fusioncharts_theme_accessibility = ((fusioncharts_theme_accessibility_default()) && (fusioncharts_theme_accessibility_default()).locals ? (fusioncharts_theme_accessibility_default()).locals : undefined);

;// ./develop/src/accessibility/index.js
/*
 Accessibility Theme
 FusionCharts JavaScript Library

 Copyright FusionCharts, Inc.
 License Information at <http://www.fusioncharts.com/license>
*/var themeObject={name:"accessibility",theme:{base:{chart:{showBorder:0,showCanvasBorder:0,bgColor:"#ffffff",canvasBgcolor:"#ffffff",showPlotBorder:0,usePlotGradientColor:0,showAlternateHGridColor:0,showAlternateVGridColor:0,divLineColor:"#545454",divLineAlpha:100,divLineThickness:1,paletteColors:"#5D62B5, #009E73, #F0E442, #56B4E9, #D55E00, #E69F00, #56B4E9",baseFont:"Source Sans Pro",baseFontSize:"0.875rem",baseFontColor:"#545454",outCnvBaseFont:"Source Sans Pro",outCnvBaseFontSize:"0.875rem",outCnvBaseFontColor:"#545454",captionFont:"Source Sans Pro Semi-Bold",captionFontColor:"#000000",captionFontSize:"1.5rem",captionFontBold:0,subCaptionFont:"Source Sans Pro",subCaptionFontColor:"#545454",subCaptionFontSize:"1.25rem",subCaptionFontBold:0,xAxisNameFont:"Source Sans Pro",yAxisNameFont:"Source Sans Pro",xAxisNameFontBold:0,yAxisNameFontBold:0,xAxisNameFontColor:"#000000",yAxisNameFontColor:"#000000",xAxisNameFontSize:"1rem",yAxisNameFontSize:"1rem",valueFont:"Source Sans Pro",valueFontBold:0,valueFontSize:"1rem",showValues:0,legendItemFont:"Source Sans Pro",legendItemFontBold:0,legendItemFontSize:"1rem",legendItemFontColor:"#545454",drawCustomLegendIcon:1,legendShadow:0,legendBorderAlpha:0,legendBorderThickness:0,legendIconBorderThickness:0,legendBgAlpha:0,legendCaptionFontColor:"#000000",legendCaptionFontSize:"1.125rem",legendCaptionFontBold:0,crossLineAnimation:1,crossLineColor:"#545454",legendIconScale:1.25,legendItemHiddenColor:"#545454",alignLegendWithCanvas:1,toolTipBgColor:"#ffffff",toolTipBgAlpha:100,toolTipColor:"#000000",showToolTipShadow:0,tooltipBorderColor:"#545454",showShadow:0,plotFillAlpha:100,legendIconBgAlpha:"inherit",legendIconAlpha:"inherit"}},// column2d chart
column2d:{chart:{paletteColors:"#5D62B5"}},// column3d chart
column3d:{chart:{paletteColors:"#5D62B5"}},// line2d chart
line:{chart:{paletteColors:"#5D62B5"}},// area2d chart
area2d:{chart:{paletteColors:"#5D62B5"}},// bar2d chart
bar2d:{chart:{paletteColors:"#5D62B5"}},// bar3d chart
bar3d:{chart:{paletteColors:"#5D62B5"}},// ms-column 2d
mscolumn2d:{chart:{formatnumberscale:"1"}},// ms line 
msline:{chart:{showhovereffect:"1",lineThickness:2,anchorRadius:4,anchorBgColor:"inherit",legendIconSides:1}},// pie 2d
pie2d:{chart:{use3DLighting:0,showPercentValues:1,showValues:1,showPercentInTooltip:0,showLegend:1,legendIconSides:1}},// doughnut2d chart
doughnut2d:{chart:{centerLabelColor:"#000000",centerLabelFontSize:"1rem",showPercentInTooltip:0,showLegend:1,legendIconSides:1,showValues:1,showPercentValues:1,use3DLighting:0}},// doughnut3d chart
doughnut3d:{chart:{centerLabelColor:"#000000",centerLabelFontSize:"1rem"}},// pareto2d chart
pareto2d:{chart:{paletteColors:"#5D62B5"}},// pareto3d chart
pareto3d:{chart:{paletteColors:"#5D62B5"}},// multi-series area2d chart
msarea:{chart:{plotFillAlpha:60,showAnchors:0,anchorRadius:4,anchorBgColor:"inherit",legendIconSides:1}},// gantt Chart
gantt:{categories:[{baseFont:"Source Sans Pro",baseFontSize:"0.875rem",baseFontColor:"#545454"}]},// funnel
funnel:{chart:{is2D:1,smartLineThickness:1,smartLineColor:"#545454",smartLineAlpha:100,useSameSlantAngle:1,alignCaptionWithCanvas:1,labelFontSize:"1rem"}},// Single-Series Spline 2D
spline:{chart:{paletteColors:"#5D62B5"}},// Single-Series Spline Area 2D
splinearea:{chart:{paletteColors:"#5D62B5"}},// drag-able Column 2D Chart
dragcolumn2d:{categories:[{category:[{fontItalic:"1"}]}]},// drag-able Line 2D Chart
dragline:{categories:[{category:[{fontItalic:"1"}]}]},// drag-able Area 2D Chart
dragarea:{categories:[{category:[{fontItalic:"1"}]}]},// radar Chart
radar:{chart:{anchorRadius:4,anchorBgColor:"inherit",anchorBgAlpha:60,anchorBorderAlpha:60,plotFillAlpha:60,legendIconSides:1}},// Waterfall / Cascade Chart
waterfall2d:{chart:{positiveColor:"#F0E442",negativeColor:"#D55E00"}},// timeseries
timeseries:{chart:{paletteColors:"#5D62B5, #009E73, #F0E442, #56B4E9, #D55E00, #E69F00, #56B4E9",baseFont:"Source Sans Pro",multiCanvasTooltip:1,style:{text:{"font-family":"Source Sans Pro","font-size":"14px",fill:"#545454"},canvas:{stroke:"#545454","stroke-width":1}}},caption:{style:{text:{"font-size":"24px","font-family":"Source Sans Pro Semi-Bold",fill:"#000000"}}},subcaption:{style:{text:{"font-size":"20px","font-family":"Source Sans Pro",fill:"#545454","font-weight":400}}},crossline:{style:{line:{stroke:"#545454","stroke-width":1,opacity:0.5}}},tooltip:{style:{container:{"background-color":"#FFFFFF",opacity:1,border:"1px solid #545454","border-radius":"0px",padding:"6px"},text:{"font-size":"14px",color:"#545454"},header:{color:"#000000","font-family":"Source Sans Pro","font-size":"16px",padding:"0px"},body:{padding:"0px"}}},legend:{style:{text:{fill:"#545454","font-size":"16px","font-family":"Source Sans Pro"}}},navigator:{text:{style:{fill:"#ff0000"}},scrollbar:{style:{button:{fill:"rgba(84, 84, 84, 0.2)"},track:{fill:"#ededed"},scroller:{fill:"rgba(84, 84, 84, 0.2)"}}},window:{style:{handle:{fill:"rgba(84, 84, 84, 0.2)"},mask:{opacity:1,stroke:"#rgba(84, 84, 84, 0.2)","stroke-width":1}}}},extensions:{standardRangeSelector:{style:{"button-text":{fill:"#545454","font-family":"Source Sans Pro","font-size":"16px"},"button-text:hover":{fill:"#000000","font-family":"Source Sans Pro","font-size":"16px"},"button-text:active":{fill:"#000000","font-family":"Source Sans Pro","font-size":"16px"},separator:{stroke:"#545454"}}},customRangeSelector:{style:{"title-text":{"font-family":"Source Sans Pro","font-size":"16px",fill:"#ff0000"},"title-icon":{"font-family":"Source Sans Pro","font-size":"16px",fill:"#000000"},label:{color:"#545454","font-family":"Source Sans Pro","font-size":"14px"},input:{"background-color":"#fcfcfc",color:"#545454","font-family":"Source Sans Pro","font-size":"14px"},"button-apply":{color:"#FFFFFF","background-color":"#5D62B5",border:"none","font-family":"Source Sans Pro","font-size":"16px"},"button-cancel":{color:"#545454","background-color":"#ffffff",border:"none","font-family":"Source Sans Pro","font-size":"16px"},"button-cancel:hover":{color:"#000000"},"cal-header":{"background-color":"#5D62B5","font-family":"Source Sans Pro","font-size":"16px"},"cal-navprev":{"font-family":"Source Sans Pro","font-size":"16px"},"cal-navnext":{"font-family":"Source Sans Pro","font-size":"16px"},"cal-weekend":{"background-color":"#e2e3f2"},"cal-days":{color:"#000000","font-family":"Source Sans Pro","font-size":"14px"},"cal-date":{color:"#545454","font-family":"Source Sans Pro","font-size":"14px"},"cal-date:hover":{"background-color":"#5D62B5",color:"#FFFFFF","font-family":"Source Sans Pro",border:"none"},"cal-selecteddate":{"background-color":"#5D62B5",color:"#FFFFFF","font-family":"Source Sans Pro",border:"none"},"cal-disableddate":{color:"rgba(84, 84, 84, 0.5)","font-family":"Source Sans Pro"}}}},xaxis:{style:{title:{"font-size":16,"font-family":"Source Sans Pro",fill:"#000000"},"grid-line":{stroke:"#545454","stroke-width":1},"tick-mark-major":{stroke:"#545454","stroke-width":1},"tick-mark-minor":{stroke:"#545454","stroke-width":0.75},"label-major":{color:"#545454","font-size":14,"font-family":"Source Sans Pro"},"label-minor":{color:"#545454","font-size":14,opacity:0.75,"font-family":"Source Sans Pro"},"label-context":{color:"#545454","font-size":14,"font-family":"Source Sans Pro"}}},yaxis:[{style:{title:{"font-size":"16","font-family":"Source Sans Pro",fill:"#000000"},"tick-mark":{stroke:"#545454","stroke-width":1},"grid-line":{stroke:"#545454","stroke-width":1},label:{color:"#545454","font-size":14,"font-family":"Source Sans Pro"}},plot:[{value:"Downloads",type:"column"},{value:"Web Visits",type:"line"}]}]}}};/* harmony default export */ const accessibility = ({extension:themeObject,name:"accessibilityTheme",type:"theme"});
;// ./develop/wrappers/fusioncharts.theme.accessibility.js
FusionCharts.addDep(accessibility);
})();

/******/ })()
;
}));
