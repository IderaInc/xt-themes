
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

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
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _candy = __webpack_require__(6);

var _candy2 = _interopRequireDefault(_candy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

FusionCharts.addDep(_candy2['default']);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

__webpack_require__(7);

/* jshint ignore:end */
var themeObject = {
  name: 'candy',
  theme: {
    base: {
      chart: {
        // plot customization
        usePlotGradientColor: '0',
        showPlotBorder: '0',
        paletteColors: '#36B5D8, #F0DC46, #F066AC, #6EC85A, #6E80CA, #E09653, #E1D7AD, #61C8C8, #EBE4F4, #E64141',
        showShadow: '0',

        // hover effects
        showHoverEffect: '1',
        plotHoverEffect: '1',
        plotFillHoverAlpha: '80',
        columnHoverAlpha: '80',
        barHoverAlpha: '80',
        plotBorderHoverThickness: '0',

        // borders, margins, padding and canvas customization
        showBorder: '0',
        showCanvasBorder: '0',
        bgAlpha: '100',
        canvasBgAlpha: '0',
        bgColor: '#262A33',
        captionPadding: '15',
        labelPadding: '6',
        yAxisValuesPadding: '6',
        xAxisNamePadding: '8',
        yAxisNamePadding: '8',

        // axis and grid lines
        showAlternateHGridColor: '0',
        showAlternateVGridColor: '0',
        divLineAlpha: '50',
        divLineColor: '#4B4B4B',
        divLineThickness: '0.5',
        vDivLineColor: '#4B4B4B',
        vDivLineThickness: '0.5',
        vDivLineAlpha: '50',
        transposeAxis: '1',
        crossLineColor: '#4B4B4B',
        crossLineAnimation: '1',
        crossLineAlpha: '60',
        drawCrossLineOnTop: '0',
        trendlineColor: '#F6F6F6',
        trendlineThickness: '1',
        vtrendlineColor: '#F6F6F6',
        vtrendlineThickness: '1',

        // font & typography customization
        baseFont: 'Fira Sans Light',
        outCnvBaseFont: 'Fira Sans Light',
        baseFontSize: '13',
        outCnvBaseFontSize: '13',
        baseFontColor: '#999CA5',
        outCnvBaseFontColor: '#999CA5',
        labelFontColor: '#F6F6F6',
        captionFontBold: '0',
        captionFontSize: '18',
        captionFont: 'Fira Sans Regular',
        captionFontColor: '#F6F6F6',
        subCaptionFontBold: '0',
        subCaptionFontSize: '15',
        subCaptionFont: 'Fira Sans Light',
        subCaptionFontColor: '#999CA5',
        valueFontColor: '#F6F6F6',
        valueFontBold: '1',
        valueFontSize: '14',
        valueFont: 'Fira Sans Regular',
        xAxisNameFontSize: '14',
        xAxisNameFontBold: '0',
        xAxisNameFont: 'Fira Sans Regular',
        xAxisNameFontColor: '#999CA5',
        yAxisNameFontSize: '14',
        yAxisNameFontBold: '0',
        yAxisNameFont: 'Fira Sans Regular',
        yAxisNameFontColor: '#999CA5',
        sYAxisNameFontSize: '14',
        sYAxisNameFontBold: '0',
        sYAxisNameFont: 'Fira Sans Regular',
        sYAxisNameFontColor: '#999CA5',
        showValues: '0',

        // tooltip customization
        toolTipColor: '#F6F6F6',
        toolTipBgColor: '#000000',
        toolTipBorderAlpha: '0',
        toolTipBgAlpha: '70',
        toolTipPadding: '7',
        toolTipBorderRadius: '2',

        // legend customization
        drawCustomLegendIcon: '1',
        legendShadow: '0',
        legendBorderAlpha: '0',
        legendBorderThickness: '0',
        legendItemFont: 'Fira Sans Regular',
        legendItemFontColor: '#999CA5',
        legendIconBorderThickness: '0',
        legendBgAlpha: '0',
        legendItemFontSize: '14',
        legendItemFontBold: '1',
        legendCaptionFont: 'Fira Sans Regular',
        legendCaptionFontColor: '#F6F6F6',
        legendCaptionFontSize: '14',
        legendCaptionFontBold: '0',
        legendScrollBgColor: '#ABABAB'
      }
    },

    // 1. Column 2D Chart
    column2d: {
      chart: {
        showValues: '1',
        paletteColors: '#36B5D8'
      }
    },

    // 2. Column 3D Chart
    column3d: {
      chart: {
        paletteColors: '#36B5D8',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 3. Line 2D Chart
    line: {
      chart: {
        paletteColors: '#36B5D8',
        anchorBgColor: '#36B5D8',
        drawCrossLine: '1',
        setAdaptiveYMin: '1',
        lineThickness: '2',
        drawAnchors: '1',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBgHoverColor: '#262A33',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 4. Area 2D Chart
    area2d: {
      chart: {
        drawAnchors: '0',
        paletteColors: '#36B5D8',
        drawCrossLine: '1',
        plotFillAlpha: '85'
      }
    },

    // 5. Bar 2D Chart
    bar2d: {
      chart: {
        showValues: '1',
        paletteColors: '#36B5D8'
      }
    },

    // 6. Bar 3D Chart
    bar3d: {
      chart: {
        paletteColors: '#36B5D8',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 7. Pie 2D Chart
    pie2d: {
      chart: {
        showZeroPies: '1',
        use3DLighting: '0',
        showPercentValues: '1',
        showValues: '1',
        showPercentInTooltip: '0',
        useDataPlotColorForLabels: '0',
        showLegend: '1',
        legendIconSides: '2',
        labelFontBold: '0',
        labelFont: 'Fira Sans Light',
        labelFontColor: '#999CA5',
        enableMultiSlicing: '0',
        isSmartLineSlanted: '0',
        smartLineColor: '#999CA5',
        smartLineThickness: '1',
        smartLabelClearance: '0'
      }
    },

    // 8. Pie 3D Chart
    pie3d: {
      chart: {
        showZeroPies: '1',
        showPercentValues: '1',
        showValues: '1',
        showPercentInToolTip: '0',
        use3DLighting: '0',
        enableMultiSlicing: '0',
        pieYScale: '55',
        pieSliceDepth: '10',
        isSmartLineSlanted: '0',
        smartLineColor: '#999CA5',
        smartLineThickness: '1',
        smartLabelClearance: '0',
        showLegend: '1',
        legendIconSides: '2',
        labelFontBold: '0',
        labelFont: 'Fira Sans Light',
        labelFontColor: '#999CA5'
      }
    },

    // 9. Doughnut 2D Chart
    doughnut2d: {
      chart: {
        showZeroPies: '1',
        showPercentValues: '1',
        showValues: '1',
        showPercentInToolTip: '0',
        use3DLighting: '0',
        enableMultiSlicing: '0',
        isSmartLineSlanted: '0',
        smartLineColor: '#999CA5',
        smartLineThickness: '1',
        smartLabelClearance: '0',
        showLegend: '1',
        legendIconSides: '2',
        labelFontBold: '0',
        labelFont: 'Fira Sans Light',
        labelFontColor: '#999CA5',
        centerLabelFont: 'Fira Sans Light',
        centerLabelBold: '0'
      }
    },

    // 10. Doughnut 3D Chart
    doughnut3d: {
      chart: {
        showZeroPies: '1',
        showValues: '1',
        showPercentValues: '1',
        showPercentInToolTip: '0',
        use3DLighting: '0',
        enableMultiSlicing: '0',
        pieYScale: '55',
        pieSliceDepth: '10',
        isSmartLineSlanted: '0',
        smartLineColor: '#999CA5',
        smartLineThickness: '1',
        smartLabelClearance: '0',
        showLegend: '1',
        legendIconSides: '2',
        labelFontBold: '0',
        labelFont: 'Fira Sans Light',
        labelFontColor: '#999CA5'
      }
    },

    // 11. Pareto 2D Chart
    pareto2d: {
      chart: {
        paletteColors: '#36B5D8',
        lineColor: '#F0DC46',
        lineThickness: '3',
        drawAnchors: '1',
        anchorBgColor: '#F0DC46',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverColor: '#262A33',
        anchorBgHoverAlpha: '100'
      }
    },

    // 12. Pareto 3D Chart
    pareto3d: {
      chart: {
        paletteColors: '#36B5D8',
        lineColor: '#F0DC46',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058',
        lineThickness: '3',
        drawAnchors: '1',
        anchorBgColor: '#F0DC46',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverColor: '#262A33',
        anchorBgHoverAlpha: '100'
      }
    },

    // 13. Multi-Series Column2D Chart
    mscolumn2d: {
      chart: {
        drawCrossLine: '1',
        showLegend: '1',
        legendIconSides: '4'
      }
    },

    // 14. Multi-Series Column3D Chart
    mscolumn3d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 15. Multi-series Line2D Chart
    msline: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        drawCrossLine: '1',
        setAdaptiveYMin: '1',
        lineThickness: '2',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 16. Multi-series Bar2D Chart
    msbar2d: {
      chart: {
        drawCrossLine: '1',
        showLegend: '1',
        legendIconSides: '4'
      }
    },

    // 17. Multi-series Bar3D Chart
    msbar3d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 18. Multi-series Area2D Chart
    msarea: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        plotFillAlpha: '70',
        drawCrossLine: '1'
      }
    },

    // 19. Marimekko Chart
    marimekko: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        showSum: '0',
        valueBgColor: '#262A33',
        valueBgAlpha: '70',
        drawCrossLine: '1',
        showPlotBorder: '1',
        plotBorderColor: '#262A33',
        plotBorderThickness: '0.75',
        plotBorderAlpha: '100'
      }
    },

    // 20. Zoom Line Chart
    zoomline: {
      chart: {
        paletteColors: '#36B5D8, #6EC85A, #6E80CA, #E09653, #E1D7AD, #61C8C8, #EBE4F4, #E64141, #F0DC46, #F066AC',
        crossLineValueFont: 'Fira Sans Regular',
        lineThickness: '2.5',
        flatScrollBars: '1',
        scrollShowButtons: '0',
        scrollColor: '#ABABAB',
        scrollheight: '10',
        crossLineThickness: '1',
        crossLineColor: '#4B4B4B',
        crossLineAlpha: '100',
        showLegend: '1',
        legendIconSides: '2',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 21. Zoom Line Dual Y-Axis Chart
    zoomlinedy: {
      chart: {
        paletteColors: '#36B5D8, #6EC85A, #6E80CA, #E09653, #E1D7AD, #61C8C8, #EBE4F4, #E64141, #F0DC46, #F066AC',
        crossLineValueFont: 'Fira Sans Regular',
        lineThickness: '2.5',
        flatScrollBars: '1',
        scrollShowButtons: '0',
        scrollColor: '#ABABAB',
        scrollheight: '10',
        crossLineThickness: '1',
        crossLineColor: '#4B4B4B',
        crossLineAlpha: '100',
        showLegend: '1',
        legendIconSides: '2',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 22. Stacked Column2D Chart
    stackedcolumn2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        drawCrossLine: '1'
      }
    },

    // 23. Stacked Column3D Chart
    stackedcolumn3d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 24. Stacked Bar2D Chart
    stackedbar2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        drawCrossLine: '1'
      }
    },

    // 25. Stacked Bar3D Chart
    stackedbar3d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 26. Stacked Area 2D Chart
    stackedarea2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        plotFillAlpha: '85',
        drawCrossLine: '1'
      }
    },

    // 27. Multi-series Stacked Column2D Chart
    msstackedcolumn2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4'
      }
    },

    // 28. Multi-series 2D Single Y Combination Chart
    mscombi2d: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawCrossLine: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 29. Multi-series 3D Single Y Combination Chart
    mscombi3d: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 30. Multi-series Column 3D + Line - Single Y Axis Chart
    mscolumnline3d: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 31. Stacked Column 2D + Line Single Y Axis Chart
    stackedcolumn2dline: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawCrossLine: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 32. Stacked Column 3D + Line Single Y Axis Chart
    stackedcolumn3dline: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 33. Multi-series 2D Dual Y Combination Chart
    mscombidy2d: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawCrossLine: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 34. Multi-series Column 3D + Line - Dual Y Axis Chart
    mscolumn3dlinedy: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 35. Stacked Column 3D + Line Dual Y Axis Chart
    stackedcolumn3dlinedy: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        canvasBaseDepth: '2',
        canvasBaseColor: '#4D5058'
      }
    },

    // 36. Multi-series Stacked Column 2D + Line Dual Y Axis Chart
    msstackedcolumn2dlinedy: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawCrossLine: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 37. Scatter Chart
    scatter: {
      chart: {
        showLegend: '1',
        drawCustomLegendIcon: '0',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        outCnvBaseFontColor: '#F6F6F6',
        divLineAlpha: '100',
        vDivLineAlpha: '100'
      },
      dataset: [{
        regressionLineColor: '#F6F6F6',
        regressionLineThickness: '1'
      }]
    },

    // 38. Bubble Chart
    bubble: {
      chart: {
        use3DLighting: '0',
        showLegend: '1',
        legendIconSides: '2',
        plotFillAlpha: '50',
        outCnvBaseFontColor: '#F6F6F6',
        divLineAlpha: '100',
        vDivLineAlpha: '100',
        quadrantLineThickness: '2',
        quadrantLineColor: '#4B4B4B',
        quadrantLineAlpha: '100',
        setAdaptiveYMin: '1',
        setAdaptiveXMin: '1'
      }
    },

    // 39. Zoom Scatter Chart
    zoomscatter: {
      chart: {
        showLegend: '1',
        legendIconBorderThickness: '2',
        outCnvBaseFontColor: '#F6F6F6',
        divLineAlpha: '100',
        vDivLineAlpha: '100'
      },
      dataset: [{
        drawLine: '0',
        anchorRadius: '6',
        anchorBorderThickness: '0.1',
        anchorAlpha: '50',
        hoverColor: '#999CA5',
        regressionLineColor: '#F6F6F6',
        regressionLineAlpha: '100',
        regressionLineThickness: '1'
      }]
    },

    // 40. Scroll Column 2D
    scrollcolumn2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        flatScrollBars: '1',
        scrollShowButtons: '0',
        scrollColor: '#ABABAB',
        scrollheight: '10'
      }
    },

    // 41. Scroll Line 2D
    scrollline2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        flatScrollBars: '1',
        scrollShowButtons: '0',
        scrollColor: '#ABABAB',
        scrollheight: '10',
        setAdaptiveYMin: '1',
        lineThickness: '2',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 42. Scroll Area 2D
    scrollarea2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        flatScrollBars: '1',
        scrollShowButtons: '0',
        scrollColor: '#ABABAB',
        scrollheight: '10',
        plotFillAlpha: '70'
      }
    },

    // 43. Scroll Stacked Column 2D Chart
    scrollstackedcolumn2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        flatScrollBars: '1',
        scrollShowButtons: '0',
        scrollColor: '#ABABAB',
        scrollheight: '10'
      }
    },

    // 44. Scroll Combination 2D (Single Y)
    scrollcombi2d: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        flatScrollBars: '1',
        scrollShowButtons: '0',
        scrollColor: '#ABABAB',
        scrollheight: '10'
      }
    },

    // 45. Scroll Combination 2D (Dual Y)
    scrollcombidy2d: {
      chart: {
        lineThickness: '3',
        showLegend: '1',
        drawCrossLine: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        flatScrollBars: '1',
        scrollShowButtons: '0',
        scrollColor: '#ABABAB',
        scrollheight: '10'
      }
    },

    // 46. Real-time Angular
    angulargauge: {
      chart: {
        setAdaptiveMin: '1',
        adjustTM: '1',
        tickvaluedistance: '10',
        placeTicksInside: '0',
        autoAlignTickValues: '1',
        showGaugeBorder: '0',
        minortmnumber: '1',
        minortmHeight: '5',
        majorTMHeight: '10',
        majortmthickness: '1.5',
        minortmthickness: '1.5',
        minorTMAlpha: '50',
        gaugeFillMix: '{light-0}',
        pivotbgcolor: '#000000',
        pivotfillmix: '0',
        showpivotborder: '1',
        pivotBorderColor: '#F6F6F6',
        showValue: '0',
        valueBelowPivot: '1'
      },
      dials: {
        dial: [{
          bgColor: '#F6F6F6',
          borderColor: '#262A33',
          borderThickness: '0.5'
        }]
      }
    },

    // 47. Real-time bulb
    bulb: {
      chart: {
        is3D: '0',
        placeValuesInside: '1',
        valueFontColor: '#262A33',
        valueFontBold: '1',
        valueFontSize: '14',
        valueFont: 'Fira Sans Regular'
      }
    },

    // 48. Real-time Cylinder
    cylinder: {
      chart: {
        cylRadius: '50',
        cylYScale: '13',
        cylFillColor: '#36B5D8',
        adjustTM: '1',
        majorTMColor: '#F6F6F6',
        minortmnumber: '1',
        minortmHeight: '5',
        majorTMHeight: '10',
        minorTMAlpha: '50',
        setAdaptiveMin: '1',
        tickValueDistance: '5'
      }
    },

    // 49. Real-time Horizontal LED
    hled: {
      chart: {
        majorTMColor: '#F6F6F6',
        minortmnumber: '1',
        minortmHeight: '5',
        majorTMHeight: '10',
        minorTMAlpha: '50',
        setAdaptiveMin: '1',
        tickValueDistance: '5',
        adjustTM: '1',
        showValue: '0'
      }
    },

    // 50. Real-time Horizontal Linear Gauge
    hlineargauge: {
      chart: {
        showGaugeBorder: '0',
        setAdaptiveMin: '1',
        adjustTM: '1',
        placeTicksInside: '0',
        autoAlignTickValues: '1',
        majorTMColor: '#F6F6F6',
        minortmnumber: '1',
        minortmHeight: '5',
        minorTMAlpha: '50',
        majorTMHeight: '10',
        tickValueDistance: '5',
        gaugeFillMix: '{light-0}',
        baseFontColor: '#262A33',
        pointerOnTop: '0',
        valueAbovePointer: '1',
        pointerRadius: '10',
        pointerBgAlpha: '100',
        pointerBgColor: '#F6F6F6',
        pointerBorderColor: '#262A33',
        valueBgColor: '#262A33',
        valueBgAlpha: '70',
        showPointerShadow: '1'
      }
    },

    // 51. Real-time Thermometer
    thermometer: {
      chart: {
        use3DLighting: '0',
        manageResize: '1',
        autoScale: '1',
        showGaugeBorder: '1',
        placeTicksInside: '0',
        autoAlignTickValues: '1',
        majorTMColor: '#F6F6F6',
        setAdaptiveMin: '1',
        minortmnumber: '1',
        minortmHeight: '5',
        minorTMAlpha: '50',
        majorTMHeight: '10',
        tickValueDistance: '5',
        thmFillColor: '#36B5D8',
        adjustTM: '1',
        gaugeBorderColor: '#999CA5',
        gaugeBorderAlpha: '80',
        gaugeBorderThickness: '1'
      }
    },

    // 52. Real-time Vertical LED Gauge
    vled: {
      chart: {
        adjustTM: '1',
        majorTMColor: '#F6F6F6',
        minortmnumber: '1',
        setAdaptiveMin: '1',
        minortmHeight: '5',
        majorTMHeight: '10',
        minorTMAlpha: '50',
        tickValueDistance: '5',
        showValue: '0'
      }
    },

    // 53. Real-time Area
    realtimearea: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        plotFillAlpha: '70',
        showRealTimeValue: '0'
      }
    },

    // 54. Real-time Column
    realtimecolumn: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        showRealTimeValue: '0'
      }
    },

    // 55. Real-time Line
    realtimeline: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        setAdaptiveYMin: '1',
        lineThickness: '2.5',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        showRealTimeValue: '0'
      }
    },

    // 56. Real-time Stacked Area
    realtimestackedarea: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        plotFillAlpha: '85',
        showRealTimeValue: '0'
      }
    },

    // 57. Real-time Stacked Column
    realtimestackedcolumn: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        showRealTimeValue: '0'
      }
    },

    // 58. Real-time Line (Dual Y)
    realtimelinedy: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        setAdaptiveYMin: '1',
        lineThickness: '2.5',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        showRealTimeValue: '0'
      }
    },

    // 59. Spark Line
    sparkline: {
      chart: {
        plotFillColor: '#36B5D8',
        anchorRadius: '4',
        highColor: '#6EC85A',
        lowColor: '#E64141',
        showOpenAnchor: '0',
        showCloseAnchor: '0',
        showOpenValue: '0',
        showCloseValue: '0',
        showHighLowValue: '0',
        periodColor: '#4B4B4B',
        periodAlpha: '50',
        chartLeftMargin: '15',
        chartRightMargin: '10'
      }
    },

    // 60. Spark Column
    sparkcolumn: {
      chart: {
        plotFillColor: '#36B5D8',
        highColor: '#6EC85A',
        lowColor: '#E64141',
        periodColor: '#4B4B4B',
        periodAlpha: '50',
        chartLeftMargin: '15',
        chartRightMargin: '10'
      }
    },

    // 61. Spark Win/Loss
    sparkwinloss: {
      chart: {
        winColor: '#6EC85A',
        lossColor: '#E64141',
        drawColor: 'F0DC46',
        scoreLessColor: '#36B5D8',
        periodColor: '#4B4B4B',
        periodAlpha: '50',
        chartLeftMargin: '15',
        chartRightMargin: '10'
      }
    },

    // 62. Horizontal bullet graph
    hbullet: {
      chart: {
        adjustTM: '1',
        majorTMColor: '#F6F6F6',
        minortmnumber: '1',
        setAdaptiveMin: '1',
        minortmHeight: '5',
        majorTMHeight: '10',
        minorTMAlpha: '50',
        tickValueDistance: '5',
        showValue: '0',
        colorRangeFillMix: '{light+0}',
        targetCapStyle: 'round',
        plotFillColor: '#3A3A3A',
        targetColor: '#3A3A3A'
      }
    },

    // 63. Vertical bullet graph
    vbullet: {
      chart: {
        adjustTM: '1',
        majorTMColor: '#F6F6F6',
        minortmnumber: '1',
        setAdaptiveMin: '1',
        minortmHeight: '5',
        majorTMHeight: '10',
        minorTMAlpha: '50',
        tickValueDistance: '5',
        showValue: '0',
        colorRangeFillMix: '{light+0}',
        targetCapStyle: 'round',
        plotFillColor: '#3A3A3A',
        targetColor: '#3A3A3A'
      }
    },

    // 64. Funnel Chart
    funnel: {
      chart: {
        is2D: '1',
        isSmartLineSlanted: '0',
        smartLineColor: '#999CA5',
        smartLineThickness: '1',
        smartLabelClearance: '0',
        streamlinedData: '1',
        useSameSlantAngle: '1',
        alignCaptionWithCanvas: '1',
        showPlotBorder: '1',
        plotBorderColor: '#262A33',
        plotBorderThickness: '1',
        plotBorderAlpha: '100',
        labelFontColor: '#999CA5'
      }
    },

    // 65. Pyramid Chart
    pyramid: {
      chart: {
        is2D: '1',
        isSmartLineSlanted: '0',
        smartLineColor: '#999CA5',
        smartLineThickness: '1',
        smartLabelClearance: '0',
        streamlinedData: '1',
        useSameSlantAngle: '1',
        alignCaptionWithCanvas: '1',
        use3dlighting: '0',
        showPlotBorder: '1',
        plotBorderColor: '#262A33',
        plotBorderThickness: '1',
        plotBorderAlpha: '100',
        labelFontColor: '#999CA5'
      }
    },

    // 66. Gantt Chart
    gantt: {
      chart: {
        taskBarFillMix: '{light+0}',
        gridBorderAlpha: '100',
        gridBorderColor: '#4B4B4B',
        ganttLineColor: '#4B4B4B',
        ganttLineAlpha: '100',
        taskBarRoundRadius: '3',
        flatScrollBars: '1',
        showHoverEffect: '1',
        plotHoverEffect: '1',
        plotFillHoverAlpha: '50',
        showCategoryHoverBand: '1',
        categoryHoverBandAlpha: '50',
        showGanttPaneVerticalHoverBand: '1',
        showProcessHoverBand: '1',
        processHoverBandAlpha: '50',
        showGanttPaneHorizontalHoverBand: '1',
        showConnectorHoverEffect: '1',
        connectorHoverAlpha: '50',
        showTaskHoverEffect: '1',
        taskHoverFillAlpha: '50',
        slackHoverFillAlpha: '50',
        scrollShowButtons: '0',
        drawCustomLegendIcon: '0',
        legendShadow: '0',
        legendBorderAlpha: '0',
        legendBorderThickness: '0',
        legendIconBorderThickness: '0',
        legendBgAlpha: '0'
      },
      categories: [{
        fontcolor: '#F6F6F6',
        fontsize: '14',
        bgcolor: '#888A8F',
        hoverBandAlpha: '45',
        showGanttPaneHoverBand: '1',
        bgAlpha: '50',
        headerbgAlpha: '50',
        showHoverBand: '1',
        category: [{
          fontcolor: '#F6F6F6',
          fontsize: '14',
          bgAlpha: '50',
          bgcolor: '#888A8F'
        }]
      }],

      tasks: {
        showBorder: '0',
        showHoverEffect: '0',
        task: [{
          color: '#36B5D8'
        }]

      },
      processes: {
        fontcolor: '#F6F6F6',
        isanimated: '0',
        bgcolor: '#888A8F',
        headerbgAlpha: '50',
        bgAlpha: '50',
        headerbgcolor: '#888A8F',
        headerfontcolor: '#F6F6F6',
        showGanttPaneHoverBand: '1',
        showHoverBand: '1'
      },

      text: {
        fontcolor: '#F6F6F6',
        bgcolor: '#888A8F',
        bgAlpha: '50'
      },

      datatable: {
        fontcolor: '#F6F6F6',
        bgcolor: '#888A8F',
        bgAlpha: '50',
        datacolumn: [{
          bgcolor: '#888A8F',
          bgAlpha: '50'
        }]
      },

      connectors: [{
        hoverThickness: '2',
        connector: [{
          color: '#E09653'
        }]
      }],

      milestones: {
        milestone: [{
          color: '#6EC85A'
        }]
      }
    },

    // 67. Logarithmic Column 2D Chart
    logmscolumn2d: {
      chart: {
        drawCrossLine: '1',
        showLegend: '1',
        legendIconSides: '4'
      }
    },

    // 68. Logarithmic Line 2D Chart
    logmsline: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        drawCrossLine: '1',
        setAdaptiveYMin: '1',
        lineThickness: '2',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 69. Single-Series Spline 2D
    spline: {
      chart: {
        paletteColors: '#36B5D8',
        anchorBgColor: '#36B5D8',
        //drawCrossLine: '1',
        setAdaptiveYMin: '1',
        lineThickness: '2',
        drawAnchors: '1',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBgHoverColor: '#262A33',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 70. Single-Series Spline Area 2D
    splinearea: {
      chart: {
        drawAnchors: '0',
        paletteColors: '#36B5D8',
        //drawCrossLine: '1',
        plotFillAlpha: '85'
      }
    },

    // 71. Multi-Series Spline 2D
    msspline: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        //drawCrossLine: '1',
        setAdaptiveYMin: '1',
        lineThickness: '2',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 72. Multi-Series Spline Area 2D
    mssplinearea: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        plotFillAlpha: '70'
        //drawCrossLine: '1'
      }
    },

    // 73. Error Bar Chart
    errorbar2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4',
        errorBarColor: '#999CA5',
        errorBarThickness: '1'
      }
    },

    // 74. Error Line 2D Chart
    errorline: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        setAdaptiveYMin: '1',
        lineThickness: '2',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        errorBarColor: '#999CA5',
        errorBarThickness: '1'
      }
    },

    // 75. Error Scatter Chart
    errorscatter: {
      chart: {
        showLegend: '1',
        drawCustomLegendIcon: '0',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        outCnvBaseFontColor: '#F6F6F6',
        divLineAlpha: '100',
        vDivLineAlpha: '100',
        errorBarColor: '#999CA5',
        errorBarThickness: '1'
      },
      dataset: [{
        regressionLineColor: '#F6F6F6',
        regressionLineThickness: '1'
      }]
    },

    // 76. Inverse Y-Axis Area 2D Chart
    inversemsarea: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        plotFillAlpha: '70',
        drawCrossLine: '1'
      }
    },

    // 77. Inverse Y-Axis Column 2D Chart
    inversemscolumn2d: {
      chart: {
        drawCrossLine: '1',
        showLegend: '1',
        legendIconSides: '4'
      }
    },

    // 78. Inverse Y-Axis Line 2D Chart
    inversemsline: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        drawCrossLine: '1',
        setAdaptiveYMin: '1',
        lineThickness: '2',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      }
    },

    // 79. Drag-able Column 2D Chart
    dragcolumn2d: {
      chart: {
        showLegend: '1',
        legendIconSides: '4'
      },
      categories: [{
        category: [{
          fontItalic: '1'
        }]
      }],
      dataset: [{
        allowDrag: '1',
        data: [{
          alpha: '70'
        }]
      }]
    },

    // 80. Drag-able Line 2D Chart
    dragline: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        drawCrossLine: '1',
        setAdaptiveYMin: '1',
        lineThickness: '2',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      },
      categories: [{
        category: [{
          fontItalic: '1'
        }]
      }],
      dataset: [{
        allowDrag: '1',
        data: [{
          alpha: '70',
          dashed: '1'
        }]
      }]
    },

    // 81. Drag-able Area 2D Chart
    dragarea: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        plotFillAlpha: '70',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100'
      },
      categories: [{
        category: [{
          fontItalic: '1'
        }]
      }],
      dataset: [{
        allowDrag: '1'
      }]
    },

    // 82. Treemap Chart
    treemap: {
      chart: {
        parentLabelLineHeight: '13',
        baseFontSize: '11',
        labelFontSize: '11',
        showParent: '1',
        showNavigationBar: '0',
        plotBorderThickness: '0.75',
        plotBorderColor: '#4B4B4B',
        labelGlow: '0',
        btnBackChartTooltext: 'Back',
        btnResetChartTooltext: 'Home',
        legendScaleLineThickness: '0',
        legendaxisborderalpha: '0',
        legendShadow: '0',
        toolbarButtonScale: '1.55',
        legendPointerColor: '#262A33',
        legendpointerbordercolor: '#F6F6F6',
        legendPointerAlpha: '80',
        defaultParentBgColor: '#36B5D8',
        fontcolor: '#F6F6F6'
      },
      data: [{
        fillColor: '#4A5264',
        data: [{
          fillColor: '#4A5264'
        }]
      }]
    },

    // 83. Radar Chart
    radar: {
      chart: {
        showLegend: '1',
        legendIconSides: '2',
        lineThickness: '2',
        drawAnchors: '0',
        legendIconBorderThickness: '2',
        plotFillAlpha: '45',
        anchorBgAlpha: '45',
        radarBorderColor: '#4B4B4B',
        radarBorderThickness: '1.5',
        radarSpikeColor: '#4B4B4B',
        radarSpikeThickness: '1',
        radarSpikeAlpha: '50',
        radarFillColor: '#262A33',
        outCnvBaseFontColor: '#F6F6F6'
      }
    },

    // 84. Heat Map Chart
    heatmap: {
      chart: {
        labelFontSize: '13',
        showPlotBorder: '1',
        plotBorderAlpha: '100',
        plotBorderThickness: '0.75',
        plotBorderColor: '#979797',
        tlFontColor: '#F6F6F6',
        tlFont: 'Fira Sans Light',
        tlFontSize: '11',
        trFontColor: '#F6F6F6',
        trFont: 'Fira Sans Light',
        trFontSize: '11',
        blFontColor: '#F6F6F6',
        blFont: 'Fira Sans Light',
        blFontSize: '11',
        brFontColor: '#F6F6F6',
        brFont: 'Fira Sans Light',
        brFontSize: '11',
        captionPadding: '20',
        legendScaleLineThickness: '0',
        legendaxisborderalpha: '0',
        legendShadow: '0',
        outCnvBaseFontColor: '#F6F6F6',
        legendPointerColor: '#262A33',
        legendpointerbordercolor: '#F6F6F6',
        legendPointerAlpha: '80'
      },
      colorrange: {
        gradient: '1',
        code: '#36B5D8'
      }
    },

    // 85. Box and Whisker Chart
    boxandwhisker2d: {
      chart: {
        paletteColors: '#36B5D8, #8BD4E9, #F0DC46, #F9F1B4, #F066AC, #F8B3D6',
        drawCustomLegendIcon: '0',
        showLegend: '1',
        showDetailedLegend: '1',
        showAllOutliers: '1',
        outlierIconShape: 'polygon',
        outlierIconRadius: '6',
        outlierIconSides: '2',
        outlierIconColor: '#F6F6F6',
        outlierIconAlpha: '70',
        upperWhiskerColor: '#999CA5',
        upperWhiskerAlpha: '100',
        upperWhiskerThickness: '1',
        lowerWhiskerColor: '#999CA5',
        lowerWhiskerAlpha: '100',
        lowerWhiskerThickness: '1',
        medianColor: '#262A33',
        medianThickness: '1.3',
        medianAlpha: '100',
        meanIconShape: 'polygon',
        meanIconSides: '2',
        meanIconColor: '#F6F6F6',
        meanIconAlpha: '70',
        meanIconRadius: '3',
        SDIconColor: '#F6F6F6',
        SDIconAlpha: '80',
        MDIconColor: '#F6F6F6',
        MDIconAlpha: '80',
        QDIconColor: '#F6F6F6',
        QSDIconAlpha: '80',
        connectNullData: '1'
      }
    },

    // 86. Candle-Stick Chart
    candlestick: {
      chart: {
        showShadow: '0',
        showVPlotBorder: '0',
        bearFillColor: '#E64141',
        bullFillColor: '#6EC85A',
        plotLineThickness: '0.5',
        plotLineAlpha: '100',
        divLineDashed: '0',
        showDetailedLegend: '1',
        legendIconSides: '2',
        showHoverEffect: '1',
        plotHoverEffect: '1',
        showVolumeChart: '0',
        trendLineColor: '#F6F6F6',
        trendLineThickness: '1',
        trendValueAlpha: '100',
        rollOverBandAlpha: '60',
        rollOverBandColor: '#4B4B4B',
        trendlineAlpha: '100',
        showTrendlinesOnTop: '1'
      },

      categories: [{
        verticalLineColor: '#4B4B4B',
        verticalLineThickness: '1',
        verticalLineAlpha: '50'
      }],

      trendlines: [{
        line: [{
          color: '#F6F6F6'
        }]
      }],

      vTRendlines: [{
        line: [{
          color: '#F6F6F6'
        }]
      }]
    },

    // 87. Drag Node Chart
    dragnode: {
      chart: {
        use3DLighting: '0',
        plotBorderThickness: '0',
        plotBorderAlpha: '0',
        showDetailedLegend: '1',
        divLineAlpha: '0'
      },
      dataset: [{
        color: '#36B5D8'
      }],
      connectors: [{
        connector: [{
          color: '#F0DC46',
          strength: '1'
        }]
      }]
    },

    // 88. Step Line Chart
    msstepline: {
      chart: {
        drawAnchors: '0',
        lineThickness: '2',
        showValues: '0',
        legendIconSides: '2',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        setAdaptiveYMin: '1'
      }
    },

    // 89. Multi-axis Line Chart
    multiaxisline: {
      chart: {
        showValues: '0',
        showLegend: '1',
        legendIconSides: '2',
        lineThickness: '2',
        connectNullData: '1',
        divLineDashed: '0',
        divLineColor: '#4B4B4B',
        divLineAlpha: '50',
        vDivLineColor: '#4B4B4B',
        vdivLineAlpha: '50',
        vDivLineDashed: '0',
        yAxisNameFontSize: '12',
        setAdaptiveYMin: '1',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        checkBoxColor: '#262A33'
      },

      axis: [{
        divLineColor: '#4B4B4B',
        divLineAlpha: '50',
        setAdaptiveYMin: '1',
        divLineDashed: '0'
      }]
    },

    // 90. Multi-level Pie Chart
    multilevelpie: {
      chart: {
        valueFontColor: '#F6F6F6',
        valueFontBold: '1',
        valueFontSize: '12.5',
        valueFont: 'Fira Sans Light',
        useHoverColor: '1',
        hoverFillColor: '#4B4B4B',
        showHoverEffect: '1',
        plotHoverEffect: '1'
      },

      category: [{
        color: '#262A33',
        category: [{
          color: '#36B5D8',
          category: [{
            color: '#36B5D8'
          }]
        }]
      }]
    },

    // 91. Select-Scatter Chart
    selectscatter: {
      chart: {
        showLegend: '1',
        drawCustomLegendIcon: '0',
        drawAnchors: '1',
        legendIconBorderThickness: '2',
        anchorBgColor: '#262A33',
        anchorRadius: '4',
        anchorHoverRadius: '7',
        anchorBorderHoverThickness: '1',
        anchorBorderHoverColor: '#ECEBE4',
        anchorBgHoverAlpha: '100',
        outCnvBaseFontColor: '#F6F6F6',
        divLineAlpha: '100',
        vDivLineAlpha: '100'
      }
    },

    // 92. Waterfall / Cascade Chart
    waterfall2d: {
      chart: {
        showValues: '0',
        positiveColor: '#6EC85A',
        negativeColor: '#E64141',
        showConnectors: '1',
        connectorDashed: '1',
        connectorThickness: '1',
        connectorColor: '#F6F6F6',
        connectorAlpha: '40'
      }
    },

    // 93. Kagi Chart
    kagi: {
      chart: {
        rallyThickness: '2',
        declineThickness: '2',
        drawAnchors: '0',
        rallyColor: '#6EC85A',
        declineColor: '#E64141',
        showValues: '0'
      }
    },

    // 94 Geo Maps
    geo: {
      chart: {
        showLabels: '0',
        legendScaleLineThickness: '0',
        legendaxisborderalpha: '0',
        legendShadow: '0',
        fillColor: '#36B5D8',
        showEntityHoverEffect: '1',
        entityFillHoverAlpha: '100',
        connectorHoverAlpha: '70',
        markerBorderHoverAlpha: '70',
        showBorder: '1',
        borderColor: '#979797',
        borderThickness: '0.5',
        nullEntityColor: '#B9B9B9',
        nullEntityAlpha: '30',
        entityFillHoverColor: '#36B5D8',
        legendPointerColor: '#262A33',
        legendpointerbordercolor: '#F6F6F6',
        legendPointerAlpha: '80'
      },
      colorrange: {
        gradient: '1',
        code: '#36B5D8'
      }
    },

    // 95. Overlapped Column 2D Chart
    overlappedcolumn2d: {
      chart: {
        drawCrossLine: '1',
        showLegend: '1',
        legendIconSides: '4'
      }
    },

    // 96. Overlapped Bar 2D Chart
    overlappedbar2d: {
      chart: {
        drawCrossLine: '1',
        showLegend: '1',
        legendIconSides: '4'
      }
    }
  }
}; /*
    Candy Theme v0.1
    FusionCharts JavaScript Library
   
    Copyright FusionCharts Technologies LLP
    License Information at <http://www.fusioncharts.com/license>
   */
/* jshint ignore:start */
exports['default'] = {
  extension: themeObject,
  name: 'candyTheme',
  type: 'theme'
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(8);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!./fusioncharts.theme.candy.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!./fusioncharts.theme.candy.css");

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Fira Sans Light';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Fira Sans Light'), local('FiraSans-Light'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnPKreRhf6Xl7Glw.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\n@font-face {\n  font-family: 'Fira Sans Regular';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}", ""]);

// exports


/***/ })
/******/ ]);
}));
