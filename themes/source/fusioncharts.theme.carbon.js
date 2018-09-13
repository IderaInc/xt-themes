
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**!
 * @license Carbon Theme v//? write(JSON.parse(require('fs').readFileSync('./package.json')).version);
 * FusionCharts JavaScript Library
 *
 * Copyright FusionCharts Technologies LLP
 * License Information at <http://www.fusioncharts.com/license>
 */
var themeObject = {
  name: 'carbon',
  theme: {
    base: {
      chart: {
        paletteColors: '#444444,#666666,#888888,#aaaaaa,#cccccc,#555555,#777777,#999999,#bbbbbb,#dddddd',
        labelDisplay: 'auto',
        baseFontColor: '#333333',
        baseFont: 'Helvetica Neue,Arial',
        captionFontSize: '14',
        subcaptionFontSize: '14',
        subcaptionFontBold: '0',
        showBorder: '0',
        bgColor: '#ffffff',
        showShadow: '0',
        canvasBgColor: '#ffffff',
        showCanvasBorder: '0',
        useplotgradientcolor: '0',
        useRoundEdges: '0',
        showPlotBorder: '0',
        showAlternateHGridColor: '0',
        showAlternateVGridColor: '0',
        toolTipColor: '#ffffff',
        toolTipBorderThickness: '0',
        toolTipBgColor: '#000000',
        toolTipBgAlpha: '80',
        toolTipBorderRadius: '2',
        toolTipPadding: '5',
        legendBgAlpha: '0',
        legendBorderAlpha: '0',
        legendShadow: '0',
        legendItemFontSize: '10',
        legendItemFontColor: '#666666',
        legendCaptionFontSize: '9',
        divlineAlpha: '100',
        divlineColor: '#999999',
        divlineThickness: '1',
        divLineIsDashed: '1',
        divLineDashLen: '1',
        divLineGapLen: '1',
        scrollheight: '10',
        flatScrollBars: '1',
        scrollShowButtons: '0',
        scrollColor: '#cccccc',
        showHoverEffect: '1',
        valueFontSize: '10',
        showXAxisLine: '1',
        xAxisLineThickness: '1',
        xAxisLineColor: '#999999'
      },
      dataset: [{}],
      trendlines: [{}]
    },
    geo: {
      chart: {
        showLabels: '0',
        fillColor: '#444444',
        showBorder: '1',
        borderColor: '#eeeeee',
        borderThickness: '1',
        borderAlpha: '50',
        entityFillhoverColor: '#444444',
        entityFillhoverAlpha: '80',
        connectorColor: '#cccccc',
        connectorThickness: '1.5',
        markerFillHoverAlpha: '90'
      }
    },
    pie2d: {
      chart: {
        placeValuesInside: '0',
        use3dlighting: '0',
        valueFontColor: '#333333',
        captionPadding: '15'
      },
      data: function data(index, dataItem, dataLength) {
        var math = window.Math,
            alphaSlab = dataLength > 50 ? math.round(100 / math.ceil(dataLength / 10)) : 20,
            alpha = 100 - alphaSlab * math.floor(index / 10);
        return {
          alpha: alpha
        };
      }
    },
    doughnut2d: {
      chart: {
        placeValuesInside: '0',
        use3dlighting: '0',
        valueFontColor: '#333333',
        centerLabelFontSize: '12',
        centerLabelBold: '1',
        centerLabelFontColor: '#333333',
        captionPadding: '15'
      },
      data: function data(index, dataItem, dataLength) {
        var math = window.Math,
            alphaSlab = dataLength > 50 ? math.round(100 / math.ceil(dataLength / 10)) : 20,
            alpha = 100 - alphaSlab * math.floor(index / 10);
        return {
          alpha: alpha
        };
      }
    },
    line: {
      chart: {
        lineThickness: '2'
      }
    },
    spline: {
      chart: {
        lineThickness: '2'
      }
    },
    column2d: {
      chart: {
        paletteColors: '#444444',
        valueFontColor: '#ffffff',
        placeValuesInside: '1',
        rotateValues: '1'
      }
    },
    bar2d: {
      chart: {
        paletteColors: '#444444',
        valueFontColor: '#ffffff',
        placeValuesInside: '1'
      }
    },
    column3d: {
      chart: {
        paletteColors: '#444444',
        valueFontColor: '#ffffff',
        placeValuesInside: '1',
        rotateValues: '1'
      }
    },
    bar3d: {
      chart: {
        paletteColors: '#444444',
        valueFontColor: '#ffffff',
        placeValuesInside: '1'
      }
    },
    area2d: {
      chart: {
        valueBgColor: '#ffffff',
        valueBgAlpha: '90',
        valueBorderPadding: '-2',
        valueBorderRadius: '2'
      }
    },
    splinearea: {
      chart: {
        valueBgColor: '#ffffff',
        valueBgAlpha: '90',
        valueBorderPadding: '-2',
        valueBorderRadius: '2'
      }
    },
    mscolumn2d: {
      chart: {
        valueFontColor: '#ffffff',
        placeValuesInside: '1',
        rotateValues: '1'
      }
    },
    mscolumn3d: {
      chart: {
        showValues: '0'
      }
    },
    msstackedcolumn2dlinedy: {
      chart: {
        showValues: '0'
      }
    },
    stackedcolumn2d: {
      chart: {
        showValues: '0'
      }
    },
    stackedarea2d: {
      chart: {
        valueBgColor: '#ffffff',
        valueBgAlpha: '90',
        valueBorderPadding: '-2',
        valueBorderRadius: '2'
      }
    },
    stackedbar2d: {
      chart: {
        showValues: '0'
      }
    },
    msstackedcolumn2d: {
      chart: {
        showValues: '0'
      }
    },
    mscombi3d: {
      chart: {
        showValues: '0'
      }
    },
    mscombi2d: {
      chart: {
        showValues: '0'
      }
    },
    mscolumn3dlinedy: {
      chart: {
        showValues: '0'
      }
    },
    stackedcolumn3dline: {
      chart: {
        showValues: '0'
      }
    },
    stackedcolumn2dline: {
      chart: {
        showValues: '0'
      }
    },
    scrollstackedcolumn2d: {
      chart: {
        valueFontColor: '#ffffff'
      }
    },
    scrollcombi2d: {
      chart: {
        showValues: '0'
      }
    },
    scrollcombidy2d: {
      chart: {
        showValues: '0'
      }
    },
    logstackedcolumn2d: {
      chart: {
        showValues: '0'
      }
    },
    logmsline: {
      chart: {
        showValues: '0'
      }
    },
    logmscolumn2d: {
      chart: {
        showValues: '0'
      }
    },
    msstackedcombidy2d: {
      chart: {
        showValues: '0'
      }
    },
    scrollcolumn2d: {
      chart: {
        valueFontColor: '#ffffff',
        placeValuesInside: '1',
        rotateValues: '1'
      }
    },
    pareto2d: {
      chart: {
        paletteColors: '#444444',
        showValues: '0'
      }
    },
    pareto3d: {
      chart: {
        paletteColors: '#444444',
        showValues: '0'
      }
    },
    angulargauge: {
      chart: {
        pivotFillColor: '#ffffff',
        pivotRadius: '4',
        gaugeFillMix: '{light+0}',
        showTickValues: '1',
        majorTMHeight: '12',
        majorTMThickness: '2',
        majorTMColor: '#000000',
        minorTMNumber: '0',
        tickValueDistance: '10',
        valueFontSize: '24',
        valueFontBold: '1',
        gaugeInnerRadius: '50%',
        showHoverEffect: '0'
      },
      dials: {
        dial: [{
          baseWidth: '10',
          rearExtension: '7',
          bgColor: '#000000',
          bgAlpha: '100',
          borderColor: '#666666',
          bgHoverAlpha: '20'
        }]
      }
    },
    hlineargauge: {
      chart: {
        pointerFillColor: '#ffffff',
        gaugeFillMix: '{light+0}',
        showTickValues: '1',
        majorTMHeight: '3',
        majorTMColor: '#000000',
        minorTMNumber: '0',
        valueFontSize: '18',
        valueFontBold: '1'
      },
      pointers: {
        pointer: [{}]
      }
    },
    bubble: {
      chart: {
        use3dlighting: '0',
        showplotborder: '0',
        showYAxisLine: '1',
        yAxisLineThickness: '1',
        yAxisLineColor: '#999999',
        showAlternateHGridColor: '0',
        showAlternateVGridColor: '0'
      },
      categories: [{
        verticalLineDashed: '1',
        verticalLineDashLen: '1',
        verticalLineDashGap: '1',
        verticalLineThickness: '1',
        verticalLineColor: '#000000',
        category: [{}]
      }],
      vtrendlines: [{
        line: [{
          alpha: '0'
        }]
      }]
    },
    scatter: {
      chart: {
        use3dlighting: '0',
        showYAxisLine: '1',
        yAxisLineThickness: '1',
        yAxisLineColor: '#999999',
        showAlternateHGridColor: '0',
        showAlternateVGridColor: '0'
      },
      categories: [{
        verticalLineDashed: '1',
        verticalLineDashLen: '1',
        verticalLineDashGap: '1',
        verticalLineThickness: '1',
        verticalLineColor: '#000000',
        category: [{}]
      }],
      vtrendlines: [{
        line: [{
          alpha: '0'
        }]
      }]
    },
    boxandwhisker2d: {
      chart: {
        valueBgColor: '#ffffff',
        valueBgAlpha: '90',
        valueBorderPadding: '-2',
        valueBorderRadius: '2'
      }
    },
    thermometer: {
      chart: {
        gaugeFillColor: '#444444'
      }
    },
    cylinder: {
      chart: {
        cylFillColor: '#444444'
      }
    },
    sparkline: {
      chart: {
        linecolor: '#444444'
      }
    },
    sparkcolumn: {
      chart: {
        plotFillColor: '#444444'
      }
    },
    sparkwinloss: {
      chart: {
        winColor: '#444444',
        lossColor: '#666666',
        drawColor: '#888888',
        scoreLessColor: '#aaaaaa'
      }
    },
    hbullet: {
      chart: {
        plotFillColor: '#444444',
        targetColor: '#666666'
      }
    },
    vbullet: {
      chart: {
        plotFillColor: '#444444',
        targetColor: '#666666'
      }
    }
  }
};

exports['default'] = {
  extension: themeObject,
  name: 'carbonTheme',
  type: 'theme'
};

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _carbon = __webpack_require__(10);

var _carbon2 = _interopRequireDefault(_carbon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

FusionCharts.addDep(_carbon2['default']);

/***/ })

/******/ });
}));
