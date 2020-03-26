module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/timeZones.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lambdas/timeZones.ts":
/*!**********************************!*\
  !*** ./src/lambdas/timeZones.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst date_fns_tz_1 = __webpack_require__(/*! date-fns-tz */ \"date-fns-tz\");\nconst timeZones = async (options, s3) => {\n    const { time, timeZones } = options;\n    console.log('timeZones', options);\n    const date = new Date(time);\n    const weatherImage = await s3.getSignedUrlPromise('getObject', {\n        Bucket: 'serverless-webpack-example',\n        Key: 'sun.png',\n    });\n    console.log('weatherImage:', weatherImage);\n    return {\n        time,\n        timeZones: timeZones.reduce((timeZones, timeZone) => {\n            const zonedTime = date_fns_tz_1.utcToZonedTime(date, timeZone);\n            timeZones[timeZone] = {\n                time: date_fns_tz_1.format(zonedTime, 'hh:mm:ss'),\n                weatherImage,\n            };\n            return timeZones;\n        }, {}),\n    };\n};\nexports.default = timeZones;\n\n\n//# sourceURL=webpack:///./src/lambdas/timeZones.ts?");

/***/ }),

/***/ "./src/timeZones.ts":
/*!**************************!*\
  !*** ./src/timeZones.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst timeZones_1 = __webpack_require__(/*! ./lambdas/timeZones */ \"./src/lambdas/timeZones.ts\");\nconst aws_sdk_1 = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\nconst s3 = new aws_sdk_1.S3();\n/**\n * Example post body\n * {\n *   \"time\": \"2020-03-25Z16:01:36.386Z\",\n *   \"timeZones\": [\n *     \"America/Los_Angeles\",\n *     \"America/Denver\",\n *     \"America/Chicago\",\n *     \"America/New_York\"\n *   ]\n * }\n */\nexports.handler = async (event) => {\n    const data = JSON.parse(event.body);\n    const result = await timeZones_1.default(data, s3);\n    console.log('result:', result);\n    return {\n        statusCode: 200,\n        body: JSON.stringify(result, null, 2),\n    };\n};\n\n\n//# sourceURL=webpack:///./src/timeZones.ts?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

/***/ }),

/***/ "date-fns-tz":
/*!******************************!*\
  !*** external "date-fns-tz" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns-tz\");\n\n//# sourceURL=webpack:///external_%22date-fns-tz%22?");

/***/ })

/******/ });