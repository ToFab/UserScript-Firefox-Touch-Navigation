/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/models/TouchPoint.ts":
/*!**********************************!*\
  !*** ./src/models/TouchPoint.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TouchPoint = void 0;
class TouchPoint {
    constructor(e, useChangedTouches = false) {
        this.clientX = -1;
        this.clientY = -1;
        this.touches = -1;
        this.targetTouches = -1;
        this.changedTouches = -1;
        if (useChangedTouches) {
            this.clientX = e.changedTouches[0].clientX;
            this.clientY = e.changedTouches[0].clientY;
        }
        else {
            if (e.touches != null) {
                this.clientX = e.touches[0].clientX;
                this.clientY = e.touches[0].clientY;
            }
        }
        if (e.touches != null) {
            this.touches = e.touches.length;
        }
        if (e.targetTouches != null) {
            this.targetTouches = e.targetTouches.length;
            this.changedTouches = e.targetTouches.length;
        }
    }
}
exports.TouchPoint = TouchPoint;


/***/ }),

/***/ "./src/services/LoggingManager/LoggingService.ts":
/*!*******************************************************!*\
  !*** ./src/services/LoggingManager/LoggingService.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingService = void 0;
class LoggingService {
    constructor(enableLogging, name) {
        this.loggingEnabled = false;
        this._name = "";
        this.loggingEnabled = enableLogging;
        this._name = name;
    }
    Log(message) {
        if (this.loggingEnabled) {
            console.log(this._name, message);
        }
    }
    EnableLog(enable, name) {
        this.loggingEnabled = enable;
        this._name = name;
    }
}
exports.LoggingService = LoggingService;


/***/ }),

/***/ "./src/services/NavigationManager/BaseService.ts":
/*!*******************************************************!*\
  !*** ./src/services/NavigationManager/BaseService.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseService = exports.thredshold = void 0;
const DegreeHelper_1 = __webpack_require__(/*! ./helpers/Utilities/DegreeHelper */ "./src/services/NavigationManager/helpers/Utilities/DegreeHelper.ts");
const TouchDetectionHelper_1 = __webpack_require__(/*! ./helpers/TouchDetectionHelper */ "./src/services/NavigationManager/helpers/TouchDetectionHelper.ts");
const HorisontalHelper_1 = __webpack_require__(/*! ./helpers/Utilities/HorisontalHelper */ "./src/services/NavigationManager/helpers/Utilities/HorisontalHelper.ts");
const ThredsholdHelper_1 = __webpack_require__(/*! ./helpers/Utilities/ThredsholdHelper */ "./src/services/NavigationManager/helpers/Utilities/ThredsholdHelper.ts");
const LoggingService_1 = __webpack_require__(/*! ../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
exports.thredshold = 75;
class BaseService {
    constructor() {
        this._baseServiceloggingEnabled = false;
        this.BaseServiceloggingEnabled = this._baseServiceloggingEnabled;
        this.BaseServiceloggingEnabled = this._baseServiceloggingEnabled;
        this.LoggingService = new LoggingService_1.LoggingService(this.BaseServiceloggingEnabled, "LoggingService");
        this.DegreeHelper = new DegreeHelper_1.DegreeHelper();
        this.HorisontalHelper = new HorisontalHelper_1.HorisontalHelper();
        this.TouchDetectionHelper = new TouchDetectionHelper_1.TouchDetectionHelper();
        this.ThredsholdHelper = new ThredsholdHelper_1.ThredsholdHelper();
    }
    static getInstance() {
        if (!BaseService.instance) {
            BaseService.instance = new BaseService();
        }
        return BaseService.instance;
    }
    ShouldNavigate(current, first, previous, thredshold, multiTouchDetected) {
        if (multiTouchDetected) {
            return false;
        }
        var shouldNavigate = (!multiTouchDetected
            && BaseService.instance.HorisontalHelper.isHorisontalIsh(current, first)
            && BaseService.instance.TouchDetectionHelper.isCurrentTouchOneFinger(current)
            && BaseService.instance.TouchDetectionHelper.wasPreviousTouchOneFinger(previous)
            && BaseService.instance.ThredsholdHelper.ThredsholdExceeded(current, thredshold, first));
        if (shouldNavigate) {
            if (history.length == 0) {
                this.LoggingService.Log("History is empty");
                return false;
            }
        }
        return shouldNavigate;
    }
}
exports.BaseService = BaseService;


/***/ }),

/***/ "./src/services/NavigationManager/helpers/TouchDetectionHelper.ts":
/*!************************************************************************!*\
  !*** ./src/services/NavigationManager/helpers/TouchDetectionHelper.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TouchDetectionHelper = void 0;
const LoggingService_1 = __webpack_require__(/*! ../../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
class TouchDetectionHelper {
    constructor() {
        this.loggingEnabled = false;
        this.loggingService = new LoggingService_1.LoggingService(this.loggingEnabled, "TouchDetectionHelper");
    }
    ;
    EnableLogging(enable) {
        if (enable) {
            console.log("Logging enabled for TouchDetectionHelper");
        }
        this.loggingEnabled = enable;
    }
    isCurrentTouchOneFinger(current) {
        var loggingService = new LoggingService_1.LoggingService(this.loggingEnabled, "TouchDetectionHelper.isCurrentTouchOneFinger");
        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        loggingService.Log(`isCurrentTouchOneFinger: ${retval}`);
        return retval;
    }
    wasPreviousTouchOneFinger(previous) {
        var loggingService = new LoggingService_1.LoggingService(this.loggingEnabled, "TouchDetectionHelper.wasPreviousTouchOneFinger");
        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        loggingService.Log(`wasPreviousTouchOneFinger: ${retval}`);
        return retval;
    }
}
exports.TouchDetectionHelper = TouchDetectionHelper;


/***/ }),

/***/ "./src/services/NavigationManager/helpers/Utilities/DegreeHelper.ts":
/*!**************************************************************************!*\
  !*** ./src/services/NavigationManager/helpers/Utilities/DegreeHelper.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DegreeHelper = void 0;
const LoggingService_1 = __webpack_require__(/*! ../../../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
class DegreeHelper {
    constructor() {
        this.loggingEnabled = false;
        this._loggingService = new LoggingService_1.LoggingService(this.loggingEnabled, "DegreeHelper");
    }
    ;
    EnableLogging(enable) {
        if (enable) {
            console.log("Logging enabled for DegreeHelper");
        }
        this.loggingEnabled = enable;
    }
    GetDegree(current, first) {
        var tmpX = current.clientX - first.clientX;
        var tmpY = current.clientY - first.clientY;
        var rad = Math.atan2(tmpY, tmpX); // In radians
        var degree = Math.round(rad * (180 / Math.PI));
        this._loggingService.Log(`Degreexxx: ${degree}`);
        return degree;
    }
}
exports.DegreeHelper = DegreeHelper;


/***/ }),

/***/ "./src/services/NavigationManager/helpers/Utilities/HorisontalHelper.ts":
/*!******************************************************************************!*\
  !*** ./src/services/NavigationManager/helpers/Utilities/HorisontalHelper.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HorisontalHelper = void 0;
const LoggingService_1 = __webpack_require__(/*! ../../../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
const BaseService_1 = __webpack_require__(/*! ../../BaseService */ "./src/services/NavigationManager/BaseService.ts");
class HorisontalHelper {
    constructor() {
        this.loggingEnabled = false;
        this.loggingService = new LoggingService_1.LoggingService(this.loggingEnabled, "HorisontalHelper");
    }
    ;
    EnableLogging(enable) {
        if (enable) {
            console.log("Logging enabled for HorisontalHelper");
        }
        this.loggingEnabled = enable;
    }
    isHorisontalIsh(current, first) {
        var loggingService = new LoggingService_1.LoggingService(this.loggingEnabled, "HorisontalHelper");
        loggingService.Log("Entering isHorisontalIsh");
        var degree = BaseService_1.BaseService.getInstance().DegreeHelper.GetDegree(current, first);
        loggingService.Log(`Degree A: ${degree}`);
        if ((degree >= -36 && degree <= 15) || (degree >= -150 && degree <= 165)) {
            loggingService.Log("Degree is validxx");
            return true;
        }
        else {
            console.log("Degree is invalidxx");
        }
        return false;
    }
}
exports.HorisontalHelper = HorisontalHelper;


/***/ }),

/***/ "./src/services/NavigationManager/helpers/Utilities/ThredsholdHelper.ts":
/*!******************************************************************************!*\
  !*** ./src/services/NavigationManager/helpers/Utilities/ThredsholdHelper.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThredsholdHelper = void 0;
const LoggingService_1 = __webpack_require__(/*! ../../../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
class ThredsholdHelper {
    constructor() {
        this.loggingEnabled = false;
        this.loggingService = new LoggingService_1.LoggingService(this.loggingEnabled, "ThredsholdHelper");
    }
    ;
    EnableLogging(enable) {
        if (enable) {
            console.log("Logging enabled for ThredsholdHelper");
        }
        this.loggingEnabled = enable;
    }
    ThredsholdExceeded(current, thredshold, first) {
        var loggingService = new LoggingService_1.LoggingService(this.loggingEnabled, "ThredsholdHelper");
        var deltas = this.GetDeltas(current, first);
        if (deltas.deltaX > thredshold && deltas.deltaX > -1) {
            loggingService.Log(`Thredshold: true deltaX: ${deltas.deltaX} thredshold: ${thredshold}`);
            return true;
        }
        loggingService.Log(`Thredshold: false deltaX: ${deltas.deltaX}`);
        return false;
    }
    GetDeltas(current, first) {
        return {
            deltaX: current.clientX - first.clientX,
            deltaY: current.clientY - first.clientY
        };
    }
}
exports.ThredsholdHelper = ThredsholdHelper;


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
/******/ 			// no module.id needed
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/

// ==UserScript==
// @name         Touch UI back and forward buttons for FireFox
// @namespace    userscript@fabian.dk
// @version      0.3
// @description  Fixing FireFox Touch navigation
// @author       Tony Fabian
// @include      *://*/*
// @grant        none
// @license MIT
// @noframes
// ==/UserScript==
Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseService_1 = __webpack_require__(/*! ./services/NavigationManager/BaseService */ "./src/services/NavigationManager/BaseService.ts");
const TouchPoint_1 = __webpack_require__(/*! ./models/TouchPoint */ "./src/models/TouchPoint.ts");
(function () {
    /* user settings */
    const thredshold = 75;
    var enableLoggingDegreeHelper = false;
    var enableLoggingHorisontalHelper = false;
    var enableLoggingTouchDetectionHelper = false;
    var enableLoggingThredsholdHelper = false;
    var instance = BaseService_1.BaseService.getInstance();
    instance.DegreeHelper.EnableLogging(enableLoggingDegreeHelper);
    instance.HorisontalHelper.EnableLogging(enableLoggingHorisontalHelper);
    instance.TouchDetectionHelper.EnableLogging(enableLoggingTouchDetectionHelper);
    instance.ThredsholdHelper.EnableLogging(enableLoggingThredsholdHelper);
    /* user settings end */
    console.log("Hello world");
    // var navigator = new NavigationService();
    var previous;
    var multiTouchDetected = false;
    var first;
    function registerMultiTouch(current) {
        if (current.touches > 1) {
            multiTouchDetected = true;
        }
    }
    window.addEventListener("load", function () {
        var src = document.getElementsByTagName("body")[0];
        src.addEventListener('touchstart', function (e) {
            console.log("-----------------");
            // init start
            var current = new TouchPoint_1.TouchPoint(e);
            registerMultiTouch(current);
            previous = current;
            // init complete
            if (first == null || (first.clientX == -1 && first.clientY == -1)) {
                first = current;
            }
        }, false);
        src.addEventListener('touchmove', function (e) {
            // init start
            var current = new TouchPoint_1.TouchPoint(e);
            registerMultiTouch(current);
            previous = current;
            // init complete
        }, false);
        src.addEventListener('touchend', function (e) {
            // init start
            var current = new TouchPoint_1.TouchPoint(e, true);
            registerMultiTouch(current);
            // init complete
            if (BaseService_1.BaseService.getInstance().ShouldNavigate(current, first, previous, thredshold, multiTouchDetected)) {
                var deltas = BaseService_1.BaseService.getInstance().ThredsholdHelper.GetDeltas(current, first);
                if (deltas.deltaX <= -75) {
                    console.log("We must navigate back");
                    // history.back();
                }
                if (deltas.deltaX >= 75) {
                    console.log("We must navigate forward");
                    // history.forward();
                }
            }
            // init start
            previous = new TouchPoint_1.TouchPoint(-1);
            if (current.touches == 0) {
                multiTouchDetected = false;
            }
            // init complete
        }, false);
    });
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcz90PTE2NDUxOTY0MjQ5ODMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQzdCTDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUNwQlQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CLEdBQUcsa0JBQWtCO0FBQ3hDLHVCQUF1QixtQkFBTyxDQUFDLDRHQUFrQztBQUNqRSwrQkFBK0IsbUJBQU8sQ0FBQyx3R0FBZ0M7QUFDdkUsMkJBQTJCLG1CQUFPLENBQUMsb0hBQXNDO0FBQ3pFLDJCQUEyQixtQkFBTyxDQUFDLG9IQUFzQztBQUN6RSx5QkFBeUIsbUJBQU8sQ0FBQyx5RkFBa0M7QUFDbkUsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7O0FDNUNOO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDRCQUE0QjtBQUM1Qix5QkFBeUIsbUJBQU8sQ0FBQyw0RkFBcUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxPQUFPO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7Ozs7Ozs7Ozs7QUM3QmY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CO0FBQ3BCLHlCQUF5QixtQkFBTyxDQUFDLCtGQUF3QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQSwrQ0FBK0MsT0FBTztBQUN0RDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7Ozs7Ozs7Ozs7O0FDekJQO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QjtBQUN4Qix5QkFBeUIsbUJBQU8sQ0FBQywrRkFBd0M7QUFDekUsc0JBQXNCLG1CQUFPLENBQUMsMEVBQW1CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7Ozs7Ozs7Ozs7O0FDaENYO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QjtBQUN4Qix5QkFBeUIsbUJBQU8sQ0FBQywrRkFBd0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsZUFBZSxjQUFjLFdBQVc7QUFDbkc7QUFDQTtBQUNBLHdEQUF3RCxjQUFjO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qjs7Ozs7OztVQ2pDeEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCLG1CQUFPLENBQUMsaUdBQTBDO0FBQ3hFLHFCQUFxQixtQkFBTyxDQUFDLHVEQUFxQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tb2RlbHMvVG91Y2hQb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL0Jhc2VTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlci9oZWxwZXJzL1RvdWNoRGV0ZWN0aW9uSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlci9oZWxwZXJzL1V0aWxpdGllcy9EZWdyZWVIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL2hlbHBlcnMvVXRpbGl0aWVzL0hvcmlzb250YWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL2hlbHBlcnMvVXRpbGl0aWVzL1RocmVkc2hvbGRIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVG91Y2hQb2ludCA9IHZvaWQgMDtcclxuY2xhc3MgVG91Y2hQb2ludCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlLCB1c2VDaGFuZ2VkVG91Y2hlcyA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRYID0gLTE7XHJcbiAgICAgICAgdGhpcy5jbGllbnRZID0gLTE7XHJcbiAgICAgICAgdGhpcy50b3VjaGVzID0gLTE7XHJcbiAgICAgICAgdGhpcy50YXJnZXRUb3VjaGVzID0gLTE7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkVG91Y2hlcyA9IC0xO1xyXG4gICAgICAgIGlmICh1c2VDaGFuZ2VkVG91Y2hlcykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50WSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRvdWNoZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50b3VjaGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50b3VjaGVzID0gZS50b3VjaGVzLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0VG91Y2hlcyA9IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZFRvdWNoZXMgPSBlLnRhcmdldFRvdWNoZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRvdWNoUG9pbnQgPSBUb3VjaFBvaW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkxvZ2dpbmdTZXJ2aWNlID0gdm9pZCAwO1xyXG5jbGFzcyBMb2dnaW5nU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbmFibGVMb2dnaW5nLCBuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ0VuYWJsZWQgPSBlbmFibGVMb2dnaW5nO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG4gICAgTG9nKG1lc3NhZ2UpIHtcclxuICAgICAgICBpZiAodGhpcy5sb2dnaW5nRW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9uYW1lLCBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBFbmFibGVMb2coZW5hYmxlLCBuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nRW5hYmxlZCA9IGVuYWJsZTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkxvZ2dpbmdTZXJ2aWNlID0gTG9nZ2luZ1NlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQmFzZVNlcnZpY2UgPSBleHBvcnRzLnRocmVkc2hvbGQgPSB2b2lkIDA7XHJcbmNvbnN0IERlZ3JlZUhlbHBlcl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9VdGlsaXRpZXMvRGVncmVlSGVscGVyXCIpO1xyXG5jb25zdCBUb3VjaERldGVjdGlvbkhlbHBlcl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9Ub3VjaERldGVjdGlvbkhlbHBlclwiKTtcclxuY29uc3QgSG9yaXNvbnRhbEhlbHBlcl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9VdGlsaXRpZXMvSG9yaXNvbnRhbEhlbHBlclwiKTtcclxuY29uc3QgVGhyZWRzaG9sZEhlbHBlcl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9VdGlsaXRpZXMvVGhyZWRzaG9sZEhlbHBlclwiKTtcclxuY29uc3QgTG9nZ2luZ1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZVwiKTtcclxuZXhwb3J0cy50aHJlZHNob2xkID0gNzU7XHJcbmNsYXNzIEJhc2VTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2Jhc2VTZXJ2aWNlbG9nZ2luZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJhc2VTZXJ2aWNlbG9nZ2luZ0VuYWJsZWQgPSB0aGlzLl9iYXNlU2VydmljZWxvZ2dpbmdFbmFibGVkO1xyXG4gICAgICAgIHRoaXMuQmFzZVNlcnZpY2Vsb2dnaW5nRW5hYmxlZCA9IHRoaXMuX2Jhc2VTZXJ2aWNlbG9nZ2luZ0VuYWJsZWQ7XHJcbiAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKHRoaXMuQmFzZVNlcnZpY2Vsb2dnaW5nRW5hYmxlZCwgXCJMb2dnaW5nU2VydmljZVwiKTtcclxuICAgICAgICB0aGlzLkRlZ3JlZUhlbHBlciA9IG5ldyBEZWdyZWVIZWxwZXJfMS5EZWdyZWVIZWxwZXIoKTtcclxuICAgICAgICB0aGlzLkhvcmlzb250YWxIZWxwZXIgPSBuZXcgSG9yaXNvbnRhbEhlbHBlcl8xLkhvcmlzb250YWxIZWxwZXIoKTtcclxuICAgICAgICB0aGlzLlRvdWNoRGV0ZWN0aW9uSGVscGVyID0gbmV3IFRvdWNoRGV0ZWN0aW9uSGVscGVyXzEuVG91Y2hEZXRlY3Rpb25IZWxwZXIoKTtcclxuICAgICAgICB0aGlzLlRocmVkc2hvbGRIZWxwZXIgPSBuZXcgVGhyZWRzaG9sZEhlbHBlcl8xLlRocmVkc2hvbGRIZWxwZXIoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIUJhc2VTZXJ2aWNlLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIEJhc2VTZXJ2aWNlLmluc3RhbmNlID0gbmV3IEJhc2VTZXJ2aWNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBCYXNlU2VydmljZS5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIFNob3VsZE5hdmlnYXRlKGN1cnJlbnQsIGZpcnN0LCBwcmV2aW91cywgdGhyZWRzaG9sZCwgbXVsdGlUb3VjaERldGVjdGVkKSB7XHJcbiAgICAgICAgaWYgKG11bHRpVG91Y2hEZXRlY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzaG91bGROYXZpZ2F0ZSA9ICghbXVsdGlUb3VjaERldGVjdGVkXHJcbiAgICAgICAgICAgICYmIEJhc2VTZXJ2aWNlLmluc3RhbmNlLkhvcmlzb250YWxIZWxwZXIuaXNIb3Jpc29udGFsSXNoKGN1cnJlbnQsIGZpcnN0KVxyXG4gICAgICAgICAgICAmJiBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci5pc0N1cnJlbnRUb3VjaE9uZUZpbmdlcihjdXJyZW50KVxyXG4gICAgICAgICAgICAmJiBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci53YXNQcmV2aW91c1RvdWNoT25lRmluZ2VyKHByZXZpb3VzKVxyXG4gICAgICAgICAgICAmJiBCYXNlU2VydmljZS5pbnN0YW5jZS5UaHJlZHNob2xkSGVscGVyLlRocmVkc2hvbGRFeGNlZWRlZChjdXJyZW50LCB0aHJlZHNob2xkLCBmaXJzdCkpO1xyXG4gICAgICAgIGlmIChzaG91bGROYXZpZ2F0ZSkge1xyXG4gICAgICAgICAgICBpZiAoaGlzdG9yeS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2coXCJIaXN0b3J5IGlzIGVtcHR5XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaG91bGROYXZpZ2F0ZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkJhc2VTZXJ2aWNlID0gQmFzZVNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSB2b2lkIDA7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vLi4vTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2VcIik7XHJcbmNsYXNzIFRvdWNoRGV0ZWN0aW9uSGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UodGhpcy5sb2dnaW5nRW5hYmxlZCwgXCJUb3VjaERldGVjdGlvbkhlbHBlclwiKTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIEVuYWJsZUxvZ2dpbmcoZW5hYmxlKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dpbmcgZW5hYmxlZCBmb3IgVG91Y2hEZXRlY3Rpb25IZWxwZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9nZ2luZ0VuYWJsZWQgPSBlbmFibGU7XHJcbiAgICB9XHJcbiAgICBpc0N1cnJlbnRUb3VjaE9uZUZpbmdlcihjdXJyZW50KSB7XHJcbiAgICAgICAgdmFyIGxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UodGhpcy5sb2dnaW5nRW5hYmxlZCwgXCJUb3VjaERldGVjdGlvbkhlbHBlci5pc0N1cnJlbnRUb3VjaE9uZUZpbmdlclwiKTtcclxuICAgICAgICB2YXIgcmV0dmFsID0gKGN1cnJlbnQudG91Y2hlcyA9PSAwICYmIGN1cnJlbnQudGFyZ2V0VG91Y2hlcyA9PSAwICYmIGN1cnJlbnQuY2hhbmdlZFRvdWNoZXMgPT0gMCk7XHJcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2UuTG9nKGBpc0N1cnJlbnRUb3VjaE9uZUZpbmdlcjogJHtyZXR2YWx9YCk7XHJcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcclxuICAgIH1cclxuICAgIHdhc1ByZXZpb3VzVG91Y2hPbmVGaW5nZXIocHJldmlvdXMpIHtcclxuICAgICAgICB2YXIgbG9nZ2luZ1NlcnZpY2UgPSBuZXcgTG9nZ2luZ1NlcnZpY2VfMS5Mb2dnaW5nU2VydmljZSh0aGlzLmxvZ2dpbmdFbmFibGVkLCBcIlRvdWNoRGV0ZWN0aW9uSGVscGVyLndhc1ByZXZpb3VzVG91Y2hPbmVGaW5nZXJcIik7XHJcbiAgICAgICAgdmFyIHJldHZhbCA9IChwcmV2aW91cy50b3VjaGVzID09IDEgJiYgcHJldmlvdXMudGFyZ2V0VG91Y2hlcyA9PSAxICYmIHByZXZpb3VzLmNoYW5nZWRUb3VjaGVzID09IDEpO1xyXG4gICAgICAgIGxvZ2dpbmdTZXJ2aWNlLkxvZyhgd2FzUHJldmlvdXNUb3VjaE9uZUZpbmdlcjogJHtyZXR2YWx9YCk7XHJcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRvdWNoRGV0ZWN0aW9uSGVscGVyID0gVG91Y2hEZXRlY3Rpb25IZWxwZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRGVncmVlSGVscGVyID0gdm9pZCAwO1xyXG5jb25zdCBMb2dnaW5nU2VydmljZV8xID0gcmVxdWlyZShcIi4uLy4uLy4uL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG5jbGFzcyBEZWdyZWVIZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2xvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UodGhpcy5sb2dnaW5nRW5hYmxlZCwgXCJEZWdyZWVIZWxwZXJcIik7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBFbmFibGVMb2dnaW5nKGVuYWJsZSkge1xyXG4gICAgICAgIGlmIChlbmFibGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIERlZ3JlZUhlbHBlclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nRW5hYmxlZCA9IGVuYWJsZTtcclxuICAgIH1cclxuICAgIEdldERlZ3JlZShjdXJyZW50LCBmaXJzdCkge1xyXG4gICAgICAgIHZhciB0bXBYID0gY3VycmVudC5jbGllbnRYIC0gZmlyc3QuY2xpZW50WDtcclxuICAgICAgICB2YXIgdG1wWSA9IGN1cnJlbnQuY2xpZW50WSAtIGZpcnN0LmNsaWVudFk7XHJcbiAgICAgICAgdmFyIHJhZCA9IE1hdGguYXRhbjIodG1wWSwgdG1wWCk7IC8vIEluIHJhZGlhbnNcclxuICAgICAgICB2YXIgZGVncmVlID0gTWF0aC5yb3VuZChyYWQgKiAoMTgwIC8gTWF0aC5QSSkpO1xyXG4gICAgICAgIHRoaXMuX2xvZ2dpbmdTZXJ2aWNlLkxvZyhgRGVncmVleHh4OiAke2RlZ3JlZX1gKTtcclxuICAgICAgICByZXR1cm4gZGVncmVlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuRGVncmVlSGVscGVyID0gRGVncmVlSGVscGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkhvcmlzb250YWxIZWxwZXIgPSB2b2lkIDA7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2VcIik7XHJcbmNvbnN0IEJhc2VTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vLi4vQmFzZVNlcnZpY2VcIik7XHJcbmNsYXNzIEhvcmlzb250YWxIZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBuZXcgTG9nZ2luZ1NlcnZpY2VfMS5Mb2dnaW5nU2VydmljZSh0aGlzLmxvZ2dpbmdFbmFibGVkLCBcIkhvcmlzb250YWxIZWxwZXJcIik7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBFbmFibGVMb2dnaW5nKGVuYWJsZSkge1xyXG4gICAgICAgIGlmIChlbmFibGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIEhvcmlzb250YWxIZWxwZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9nZ2luZ0VuYWJsZWQgPSBlbmFibGU7XHJcbiAgICB9XHJcbiAgICBpc0hvcmlzb250YWxJc2goY3VycmVudCwgZmlyc3QpIHtcclxuICAgICAgICB2YXIgbG9nZ2luZ1NlcnZpY2UgPSBuZXcgTG9nZ2luZ1NlcnZpY2VfMS5Mb2dnaW5nU2VydmljZSh0aGlzLmxvZ2dpbmdFbmFibGVkLCBcIkhvcmlzb250YWxIZWxwZXJcIik7XHJcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2UuTG9nKFwiRW50ZXJpbmcgaXNIb3Jpc29udGFsSXNoXCIpO1xyXG4gICAgICAgIHZhciBkZWdyZWUgPSBCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuRGVncmVlSGVscGVyLkdldERlZ3JlZShjdXJyZW50LCBmaXJzdCk7XHJcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2UuTG9nKGBEZWdyZWUgQTogJHtkZWdyZWV9YCk7XHJcbiAgICAgICAgaWYgKChkZWdyZWUgPj0gLTM2ICYmIGRlZ3JlZSA8PSAxNSkgfHwgKGRlZ3JlZSA+PSAtMTUwICYmIGRlZ3JlZSA8PSAxNjUpKSB7XHJcbiAgICAgICAgICAgIGxvZ2dpbmdTZXJ2aWNlLkxvZyhcIkRlZ3JlZSBpcyB2YWxpZHh4XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVncmVlIGlzIGludmFsaWR4eFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuSG9yaXNvbnRhbEhlbHBlciA9IEhvcmlzb250YWxIZWxwZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVGhyZWRzaG9sZEhlbHBlciA9IHZvaWQgMDtcclxuY29uc3QgTG9nZ2luZ1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZVwiKTtcclxuY2xhc3MgVGhyZWRzaG9sZEhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKHRoaXMubG9nZ2luZ0VuYWJsZWQsIFwiVGhyZWRzaG9sZEhlbHBlclwiKTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIEVuYWJsZUxvZ2dpbmcoZW5hYmxlKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dpbmcgZW5hYmxlZCBmb3IgVGhyZWRzaG9sZEhlbHBlclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nRW5hYmxlZCA9IGVuYWJsZTtcclxuICAgIH1cclxuICAgIFRocmVkc2hvbGRFeGNlZWRlZChjdXJyZW50LCB0aHJlZHNob2xkLCBmaXJzdCkge1xyXG4gICAgICAgIHZhciBsb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKHRoaXMubG9nZ2luZ0VuYWJsZWQsIFwiVGhyZWRzaG9sZEhlbHBlclwiKTtcclxuICAgICAgICB2YXIgZGVsdGFzID0gdGhpcy5HZXREZWx0YXMoY3VycmVudCwgZmlyc3QpO1xyXG4gICAgICAgIGlmIChkZWx0YXMuZGVsdGFYID4gdGhyZWRzaG9sZCAmJiBkZWx0YXMuZGVsdGFYID4gLTEpIHtcclxuICAgICAgICAgICAgbG9nZ2luZ1NlcnZpY2UuTG9nKGBUaHJlZHNob2xkOiB0cnVlIGRlbHRhWDogJHtkZWx0YXMuZGVsdGFYfSB0aHJlZHNob2xkOiAke3RocmVkc2hvbGR9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb2dnaW5nU2VydmljZS5Mb2coYFRocmVkc2hvbGQ6IGZhbHNlIGRlbHRhWDogJHtkZWx0YXMuZGVsdGFYfWApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIEdldERlbHRhcyhjdXJyZW50LCBmaXJzdCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhWDogY3VycmVudC5jbGllbnRYIC0gZmlyc3QuY2xpZW50WCxcclxuICAgICAgICAgICAgZGVsdGFZOiBjdXJyZW50LmNsaWVudFkgLSBmaXJzdC5jbGllbnRZXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRocmVkc2hvbGRIZWxwZXIgPSBUaHJlZHNob2xkSGVscGVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vID09VXNlclNjcmlwdD09XHJcbi8vIEBuYW1lICAgICAgICAgVG91Y2ggVUkgYmFjayBhbmQgZm9yd2FyZCBidXR0b25zIGZvciBGaXJlRm94XHJcbi8vIEBuYW1lc3BhY2UgICAgdXNlcnNjcmlwdEBmYWJpYW4uZGtcclxuLy8gQHZlcnNpb24gICAgICAwLjNcclxuLy8gQGRlc2NyaXB0aW9uICBGaXhpbmcgRmlyZUZveCBUb3VjaCBuYXZpZ2F0aW9uXHJcbi8vIEBhdXRob3IgICAgICAgVG9ueSBGYWJpYW5cclxuLy8gQGluY2x1ZGUgICAgICAqOi8vKi8qXHJcbi8vIEBncmFudCAgICAgICAgbm9uZVxyXG4vLyBAbGljZW5zZSBNSVRcclxuLy8gQG5vZnJhbWVzXHJcbi8vID09L1VzZXJTY3JpcHQ9PVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEJhc2VTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlci9CYXNlU2VydmljZVwiKTtcclxuY29uc3QgVG91Y2hQb2ludF8xID0gcmVxdWlyZShcIi4vbW9kZWxzL1RvdWNoUG9pbnRcIik7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAvKiB1c2VyIHNldHRpbmdzICovXHJcbiAgICBjb25zdCB0aHJlZHNob2xkID0gNzU7XHJcbiAgICB2YXIgZW5hYmxlTG9nZ2luZ0RlZ3JlZUhlbHBlciA9IGZhbHNlO1xyXG4gICAgdmFyIGVuYWJsZUxvZ2dpbmdIb3Jpc29udGFsSGVscGVyID0gZmFsc2U7XHJcbiAgICB2YXIgZW5hYmxlTG9nZ2luZ1RvdWNoRGV0ZWN0aW9uSGVscGVyID0gZmFsc2U7XHJcbiAgICB2YXIgZW5hYmxlTG9nZ2luZ1RocmVkc2hvbGRIZWxwZXIgPSBmYWxzZTtcclxuICAgIHZhciBpbnN0YW5jZSA9IEJhc2VTZXJ2aWNlXzEuQmFzZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGluc3RhbmNlLkRlZ3JlZUhlbHBlci5FbmFibGVMb2dnaW5nKGVuYWJsZUxvZ2dpbmdEZWdyZWVIZWxwZXIpO1xyXG4gICAgaW5zdGFuY2UuSG9yaXNvbnRhbEhlbHBlci5FbmFibGVMb2dnaW5nKGVuYWJsZUxvZ2dpbmdIb3Jpc29udGFsSGVscGVyKTtcclxuICAgIGluc3RhbmNlLlRvdWNoRGV0ZWN0aW9uSGVscGVyLkVuYWJsZUxvZ2dpbmcoZW5hYmxlTG9nZ2luZ1RvdWNoRGV0ZWN0aW9uSGVscGVyKTtcclxuICAgIGluc3RhbmNlLlRocmVkc2hvbGRIZWxwZXIuRW5hYmxlTG9nZ2luZyhlbmFibGVMb2dnaW5nVGhyZWRzaG9sZEhlbHBlcik7XHJcbiAgICAvKiB1c2VyIHNldHRpbmdzIGVuZCAqL1xyXG4gICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZFwiKTtcclxuICAgIC8vIHZhciBuYXZpZ2F0b3IgPSBuZXcgTmF2aWdhdGlvblNlcnZpY2UoKTtcclxuICAgIHZhciBwcmV2aW91cztcclxuICAgIHZhciBtdWx0aVRvdWNoRGV0ZWN0ZWQgPSBmYWxzZTtcclxuICAgIHZhciBmaXJzdDtcclxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyTXVsdGlUb3VjaChjdXJyZW50KSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQudG91Y2hlcyA+IDEpIHtcclxuICAgICAgICAgICAgbXVsdGlUb3VjaERldGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzcmMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XHJcbiAgICAgICAgc3JjLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUpO1xyXG4gICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgICAgICBpZiAoZmlyc3QgPT0gbnVsbCB8fCAoZmlyc3QuY2xpZW50WCA9PSAtMSAmJiBmaXJzdC5jbGllbnRZID09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgIHNyYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUpO1xyXG4gICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUsIHRydWUpO1xyXG4gICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICAgICAgaWYgKEJhc2VTZXJ2aWNlXzEuQmFzZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5TaG91bGROYXZpZ2F0ZShjdXJyZW50LCBmaXJzdCwgcHJldmlvdXMsIHRocmVkc2hvbGQsIG11bHRpVG91Y2hEZXRlY3RlZCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWx0YXMgPSBCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuVGhyZWRzaG9sZEhlbHBlci5HZXREZWx0YXMoY3VycmVudCwgZmlyc3QpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhcy5kZWx0YVggPD0gLTc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSBtdXN0IG5hdmlnYXRlIGJhY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA+PSA3NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgbXVzdCBuYXZpZ2F0ZSBmb3J3YXJkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhpc3RvcnkuZm9yd2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGluaXQgc3RhcnRcclxuICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgVG91Y2hQb2ludF8xLlRvdWNoUG9pbnQoLTEpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudC50b3VjaGVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIG11bHRpVG91Y2hEZXRlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9KTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9