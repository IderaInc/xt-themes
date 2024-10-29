
(function (factory) {
  if (typeof module === 'object' && typeof module.exports !== "undefined") {
      module.exports = factory;
  } else {
      factory(FusionCharts);
  }
}(function (FusionCharts) {
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(2);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function getNonceFromMetaTag() {
	const metaTag = document.querySelector(`meta[http-equiv="Content-Security-Policy"]`);
	if (metaTag) {
		const content = metaTag.getAttribute('content');
		if (content) {
			const match = content.match(/'nonce-([^']+)'/);
			if (match) {
				return match[1];
			}
		}
	}
	return null;
}

function insertStyleElement (options, style) {
  const chartNonce = getNonceFromMetaTag();

	style.setAttribute('nonce', chartNonce);
	var target = getElement(options.insertInto);

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_accessibility___ = __webpack_require__(4);
FusionCharts.addDep(__WEBPACK_IMPORTED_MODULE_0__src_accessibility___["a" /* default */]);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fusioncharts_theme_accessibility_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fusioncharts_theme_accessibility_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fusioncharts_theme_accessibility_css__);
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
timeseries:{chart:{paletteColors:"#5D62B5, #009E73, #F0E442, #56B4E9, #D55E00, #E69F00, #56B4E9",baseFont:"Source Sans Pro",multiCanvasTooltip:1,style:{text:{"font-family":"Source Sans Pro","font-size":"14px",fill:"#545454"},canvas:{stroke:"#545454","stroke-width":1}}},caption:{style:{text:{"font-size":"24px","font-family":"Source Sans Pro Semi-Bold",fill:"#000000"}}},subcaption:{style:{text:{"font-size":"20px","font-family":"Source Sans Pro",fill:"#545454","font-weight":400}}},crossline:{style:{line:{stroke:"#545454","stroke-width":1,opacity:0.5}}},tooltip:{style:{container:{"background-color":"#FFFFFF",opacity:1,border:"1px solid #545454","border-radius":"0px",padding:"6px"},text:{"font-size":"14px",color:"#545454"},header:{color:"#000000","font-family":"Source Sans Pro","font-size":"16px",padding:"0px"},body:{padding:"0px"}}},legend:{style:{text:{fill:"#545454","font-size":"16px","font-family":"Source Sans Pro"}}},navigator:{text:{style:{fill:"#ff0000"}},scrollbar:{style:{button:{fill:"rgba(84, 84, 84, 0.2)"},track:{fill:"#ededed"},scroller:{fill:"rgba(84, 84, 84, 0.2)"}}},window:{style:{handle:{fill:"rgba(84, 84, 84, 0.2)"},mask:{opacity:1,stroke:"#rgba(84, 84, 84, 0.2)","stroke-width":1}}}},extensions:{standardRangeSelector:{style:{"button-text":{fill:"#545454","font-family":"Source Sans Pro","font-size":"16px"},"button-text:hover":{fill:"#000000","font-family":"Source Sans Pro","font-size":"16px"},"button-text:active":{fill:"#000000","font-family":"Source Sans Pro","font-size":"16px"},separator:{stroke:"#545454"}}},customRangeSelector:{style:{"title-text":{"font-family":"Source Sans Pro","font-size":"16px",fill:"#ff0000"},"title-icon":{"font-family":"Source Sans Pro","font-size":"16px",fill:"#000000"},label:{color:"#545454","font-family":"Source Sans Pro","font-size":"14px"},input:{"background-color":"#fcfcfc",color:"#545454","font-family":"Source Sans Pro","font-size":"14px"},"button-apply":{color:"#FFFFFF","background-color":"#5D62B5",border:"none","font-family":"Source Sans Pro","font-size":"16px"},"button-cancel":{color:"#545454","background-color":"#ffffff",border:"none","font-family":"Source Sans Pro","font-size":"16px"},"button-cancel:hover":{color:"#000000"},"cal-header":{"background-color":"#5D62B5","font-family":"Source Sans Pro","font-size":"16px"},"cal-navprev":{"font-family":"Source Sans Pro","font-size":"16px"},"cal-navnext":{"font-family":"Source Sans Pro","font-size":"16px"},"cal-weekend":{"background-color":"#e2e3f2"},"cal-days":{color:"#000000","font-family":"Source Sans Pro","font-size":"14px"},"cal-date":{color:"#545454","font-family":"Source Sans Pro","font-size":"14px"},"cal-date:hover":{"background-color":"#5D62B5",color:"#FFFFFF","font-family":"Source Sans Pro",border:"none"},"cal-selecteddate":{"background-color":"#5D62B5",color:"#FFFFFF","font-family":"Source Sans Pro",border:"none"},"cal-disableddate":{color:"rgba(84, 84, 84, 0.5)","font-family":"Source Sans Pro"}}}},xaxis:{style:{title:{"font-size":16,"font-family":"Source Sans Pro",fill:"#000000"},"grid-line":{stroke:"#545454","stroke-width":1},"tick-mark-major":{stroke:"#545454","stroke-width":1},"tick-mark-minor":{stroke:"#545454","stroke-width":0.75},"label-major":{color:"#545454","font-size":14,"font-family":"Source Sans Pro"},"label-minor":{color:"#545454","font-size":14,opacity:0.75,"font-family":"Source Sans Pro"},"label-context":{color:"#545454","font-size":14,"font-family":"Source Sans Pro"}}},yaxis:[{style:{title:{"font-size":"16","font-family":"Source Sans Pro",fill:"#000000"},"tick-mark":{stroke:"#545454","stroke-width":1},"grid-line":{stroke:"#545454","stroke-width":1},label:{color:"#545454","font-size":14,"font-family":"Source Sans Pro"}},plot:[{value:"Downloads",type:"column"},{value:"Web Visits",type:"line"}]}]}}};/* harmony default export */ __webpack_exports__["a"] = ({extension:themeObject,name:"accessibilityTheme",type:"theme"});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(6);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!./fusioncharts.theme.accessibility.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!./fusioncharts.theme.accessibility.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: \"Source Sans Pro\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2)\n    format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}\n\n@font-face {\n  font-family: \"Source Sans Pro Semi-Bold\";\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdu3cOWxw.woff2)\n    format(\"woff2\");\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,\n    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,\n    U+FEFF, U+FFFD;\n}", ""]);

// exports


/***/ })
/******/ ]);
}));
