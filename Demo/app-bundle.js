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

/***/ "./src/models/enums.ts":
/*!*****************************!*\
  !*** ./src/models/enums.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["DoNothing"] = 0] = "DoNothing";
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Right"] = 2] = "Right";
})(Direction = exports.Direction || (exports.Direction = {}));


/***/ }),

/***/ "./src/services/LoggingManager/LoggingService.ts":
/*!*******************************************************!*\
  !*** ./src/services/LoggingManager/LoggingService.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingService = void 0;
class LoggingService {
    constructor(className) {
        this._className = className;
    }
    LogInfo(message, caller, enabled) {
        if (enabled) {
            console.log(`${this._className}.${caller} - ${message}`);
        }
    }
    ;
    LogSuccess(message, caller, enabled) {
        if (enabled) {
            console.log(`${this._className}.${caller} - %c${message}`, 'color: green;font-weight:bold;');
        }
    }
    ;
    LogWarn(message, caller, enabled) {
        if (enabled) {
            console.log(`${this._className}.${caller} - %c${message}`, 'color: yellow;font-weight:bold;');
        }
    }
    ;
    LogError(message, caller, enabled) {
        if (enabled) {
            console.log(`${this._className}.${caller} - %c${message}`, 'color: red;font-weight:bold;');
        }
    }
    ;
}
exports.LoggingService = LoggingService;


/***/ }),

/***/ "./src/services/NavigationManager/BaseService.ts":
/*!*******************************************************!*\
  !*** ./src/services/NavigationManager/BaseService.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseService = void 0;
const TouchDetectionHelper_1 = __webpack_require__(/*! ./helpers/TouchDetectionHelper */ "./src/services/NavigationManager/helpers/TouchDetectionHelper.ts");
const LoggingService_1 = __webpack_require__(/*! ../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
const CalculationHelper_1 = __webpack_require__(/*! ./helpers/CalculationHelper */ "./src/services/NavigationManager/helpers/CalculationHelper.ts");
const enums_1 = __webpack_require__(/*! ../../models/enums */ "./src/models/enums.ts");
const SummaryReportHelper_1 = __webpack_require__(/*! ./helpers/SummaryReportHelper */ "./src/services/NavigationManager/helpers/SummaryReportHelper.ts");
class BaseService {
    constructor() {
        this._minimumSwipeLength = -1;
        this.className = BaseService.name;
        this._traceBaseService = false; //Will be maintained by system. Use Main 
        this._printSummary = false; //Will be maintained by system. Use Main
        this._traceSwipeGesture = false; //Will be maintained by system. Use Main
        this._traceTouchGesture = false; //Will be maintained by system. Use Main    
        this._traceCalcuations = false; //Will be maintained by system. Use Main
        if (this._traceTouchGesture == true) {
            console.log("Logging enabled for TouchDetection");
        }
        if (this._traceSwipeGesture == true) {
            console.log("Logging enabled for SwipeDetection");
        }
        if (this._traceCalcuations == true) {
            console.log("Logging enabled for Calculations");
        }
        ;
        if (this._traceTouchGesture == true || this._traceSwipeGesture == true || this._traceCalcuations == true) {
            console.log("Logging enabled for BaseService");
            this._traceBaseService = true;
        }
        ;
        this.LoggingService = new LoggingService_1.LoggingService(BaseService.name);
        this.TouchDetectionHelper = new TouchDetectionHelper_1.TouchDetectionHelper();
        this.CalculationHelper = new CalculationHelper_1.CalculationHelper();
        this.SummaryReportHelper = new SummaryReportHelper_1.SummaryReportHelper();
    }
    InitializeSettings(minimumSwipeLength) {
        this._minimumSwipeLength = minimumSwipeLength;
    }
    InitializeLogging(printSummary, traceSwipeGesture, traceTouchGesture, traceCalcuations) {
        this._printSummary = printSummary;
        this._traceSwipeGesture = traceSwipeGesture;
        this._traceTouchGesture = traceTouchGesture;
        this._traceCalcuations = traceCalcuations;
    }
    ;
    static getInstance() {
        if (!BaseService.instance) {
            BaseService.instance = new BaseService();
        }
        return BaseService.instance;
    }
    ShouldWeNavigate(last, first, previous, minimumSwipeLength, multiTouchDetected) {
        var retVal = [false, enums_1.Direction.DoNothing];
        if (multiTouchDetected) {
            this.LoggingService.LogInfo("MultiTouch detected. Abort", this.ShouldWeNavigate.name, this._traceBaseService);
            return retVal;
        }
        var validateSwipeAngle = BaseService.instance.TouchDetectionHelper.ValidateSwipeAngle(first, last, this._traceSwipeGesture);
        var validateSwipeLength = BaseService.instance.CalculationHelper.ValidateSwipeLength(first, last, minimumSwipeLength, this._traceCalcuations);
        var validateTouch = BaseService.instance.TouchDetectionHelper.ValidateTouch(last, this._traceTouchGesture);
        var validateTouchSeries = BaseService.instance.TouchDetectionHelper.ValidateTouchSeries(previous, this._traceTouchGesture);
        var shouldNavigate = ((multiTouchDetected == false) && (validateSwipeAngle == true) && (validateTouch == true) && (validateTouchSeries == true) && (validateSwipeLength == true));
        BaseService.getInstance().SummaryReportHelper.printSummary(multiTouchDetected, validateSwipeAngle, validateTouch, validateTouchSeries, validateSwipeLength, this._printSummary, this._printSummary);
        if (shouldNavigate) {
            if (history.length == 0) {
                this.LoggingService.LogInfo("History is empty", this.ShouldWeNavigate.name, this._traceBaseService);
                retVal = [shouldNavigate, enums_1.Direction.DoNothing];
            }
            ;
            if (first.clientX < last.clientX) {
                this.LoggingService.LogInfo("Swiping left", this.ShouldWeNavigate.name, this._traceBaseService);
                retVal = [shouldNavigate, enums_1.Direction.Left];
            }
            ;
            if (first.clientX > last.clientX) {
                this.LoggingService.LogInfo("Swiping right", this.ShouldWeNavigate.name, this._traceBaseService);
                retVal = [shouldNavigate, enums_1.Direction.Right];
            }
        }
        this.LoggingService.LogInfo(`Direction: ${retVal[1]}`, this.ShouldWeNavigate.name, this._traceBaseService);
        return retVal;
    }
}
exports.BaseService = BaseService;


/***/ }),

/***/ "./src/services/NavigationManager/helpers/CalculationHelper.ts":
/*!*********************************************************************!*\
  !*** ./src/services/NavigationManager/helpers/CalculationHelper.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculationHelper = void 0;
const LoggingService_1 = __webpack_require__(/*! ../../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
class CalculationHelper {
    constructor() {
        this.loggingService = new LoggingService_1.LoggingService(CalculationHelper.name);
    }
    ;
    // 
    GetVirtualCoordinates(p1, p2, log) {
        var originalx1 = p1.clientX;
        var originaly1 = p1.clientY;
        var originalx2 = p2.clientX;
        var originaly2 = p2.clientY;
        var virtualx1 = 0;
        var virtualy1 = 0;
        var virtualx2 = originalx2 - originalx1;
        var virtualy2 = originaly1 - originaly2;
        this.loggingService.LogInfo(`Virtual p1: (${virtualx1},${virtualy1})`, this.GetVirtualCoordinates.name, log);
        this.loggingService.LogInfo(`Virtual p2 (deltaX,deltaY): (${virtualx2},${virtualy2})`, this.GetVirtualCoordinates.name, log);
        return {
            X: Math.abs(virtualx2),
            Y: Math.abs(virtualy2)
        };
    }
    ;
    GetAngle(first, last, log) {
        var virtualTouchPoint = this.GetVirtualCoordinates(first, last, log);
        var radian = Math.atan2(virtualTouchPoint.Y, virtualTouchPoint.X); // In radian           
        var angle = Math.round(radian * (180 / Math.PI));
        this.loggingService.LogInfo(`Swipe angle: ${angle}`, this.GetAngle.name, log);
        return angle;
    }
    ;
    ValidateSwipeLength(first, last, minimumSwipeLength, log) {
        var virtualTouchPoint = this.GetVirtualCoordinates(first, last, log);
        if (virtualTouchPoint.X > minimumSwipeLength) {
            this.loggingService.LogInfo("Swipe has the minimum required length", this.ValidateSwipeLength.name, log);
            return true;
        }
        this.loggingService.LogInfo("Swipe is too short", this.ValidateSwipeLength.name, log);
        return false;
    }
    ;
}
exports.CalculationHelper = CalculationHelper;


/***/ }),

/***/ "./src/services/NavigationManager/helpers/SummaryReportHelper.ts":
/*!***********************************************************************!*\
  !*** ./src/services/NavigationManager/helpers/SummaryReportHelper.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummaryReportHelper = void 0;
const LoggingService_1 = __webpack_require__(/*! ../../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
class SummaryReportHelper {
    constructor() {
        this.loggingService = new LoggingService_1.LoggingService(SummaryReportHelper.name);
    }
    printSummary(check4MultiTouch, check4SwipeGesture, check4OneFingerTouch, checkTouchSerie, checkSwipeLength, printSummary, log) {
        if (printSummary) {
            this.loggingService.LogInfo(`Summary Report`, this.printSummary.name, log);
            var result = "FAIL";
            var message = "Not multi-touch?";
            if (check4MultiTouch == false) {
                result = "PASS";
                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            }
            else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            }
            ;
            result = "FAIL";
            message = "Is Swipe gesture?";
            if (check4SwipeGesture == true) {
                result = "PASS";
                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            }
            else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            }
            ;
            result = "FAIL";
            message = "Is one finger touch?";
            if (check4OneFingerTouch == true) {
                result = "PASS";
                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            }
            else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            }
            ;
            result = "FAIL";
            message = "Touch serie ok?";
            if (checkTouchSerie == true) {
                result = "PASS";
                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            }
            else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            }
            ;
            result = "FAIL";
            message = "Swipe has required minimum length? ";
            if (checkSwipeLength == true) {
                result = "PASS";
                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            }
            else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            }
            ;
            result = "FAIL";
            message = "There a pages in the history. OK.";
            if (history.length > 0) {
                result = "PASS";
                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            }
            else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            }
            ;
        }
    }
}
exports.SummaryReportHelper = SummaryReportHelper;


/***/ }),

/***/ "./src/services/NavigationManager/helpers/TouchDetectionHelper.ts":
/*!************************************************************************!*\
  !*** ./src/services/NavigationManager/helpers/TouchDetectionHelper.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TouchDetectionHelper = void 0;
const LoggingService_1 = __webpack_require__(/*! ../../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
const BaseService_1 = __webpack_require__(/*! ../BaseService */ "./src/services/NavigationManager/BaseService.ts");
class TouchDetectionHelper {
    constructor() {
        this.loggingService = new LoggingService_1.LoggingService(TouchDetectionHelper.name);
    }
    ValidateTouch(current, log) {
        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        if (retval) {
            this.loggingService.LogSuccess(`${retval}`, this.ValidateTouch.name, log);
        }
        else {
            this.loggingService.LogInfo(`${retval}`, this.ValidateTouch.name, log);
        }
        return retval;
    }
    ValidateTouchSeries(previous, log) {
        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        if (retval) {
            this.loggingService.LogSuccess(`${retval}`, this.ValidateTouchSeries.name, log);
        }
        else {
            this.loggingService.LogInfo(`${retval}`, this.ValidateTouchSeries.name, log);
        }
        return retval;
    }
    ValidateSwipeAngle(first, last, log) {
        // We want to disregard all swipe that are almost virtical or very steep in angle.
        var angle = BaseService_1.BaseService.getInstance().CalculationHelper.GetAngle(first, last, log);
        if (angle < 75) {
            this.loggingService.LogSuccess(`The swipe angle is OK`, this.ValidateSwipeAngle.name, log);
            return true;
        }
        ;
        this.loggingService.LogWarn(`The swipe is too steep. Continue`, this.ValidateSwipeAngle.name, log);
        return false;
    }
    ;
    ValidateSwipeLength(first, last, minimumSwipeLength, log) {
        var virtualTouchPoint = BaseService_1.BaseService.getInstance().CalculationHelper.GetVirtualCoordinates(first, last, log);
        if (virtualTouchPoint.X > minimumSwipeLength) {
            this.loggingService.LogSuccess(`The swipe is horisontal. Continue`, this.ValidateSwipeLength.name, log);
            return true;
        }
        ;
        this.loggingService.LogWarn(`The swipe is too steep. Continue`, this.ValidateSwipeLength.name, log);
        return false;
    }
    ;
}
exports.TouchDetectionHelper = TouchDetectionHelper;
;


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
// @name         Touch navigation enhancments for FireFox
// @namespace    userscript@fabian.dk
// @version      0.3
// @description  Zero configuration Edge like swipe navigation for Firefox
// @author       Tony Fabian
// @include      *://*/*
// @grant        none
// @license MIT
// @noframes
// ==/UserScript==
Object.defineProperty(exports, "__esModule", ({ value: true }));
const BaseService_1 = __webpack_require__(/*! ./services/NavigationManager/BaseService */ "./src/services/NavigationManager/BaseService.ts");
const TouchPoint_1 = __webpack_require__(/*! ./models/TouchPoint */ "./src/models/TouchPoint.ts");
const LoggingService_1 = __webpack_require__(/*! ./services/LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
const enums_1 = __webpack_require__(/*! ./models/enums */ "./src/models/enums.ts");
(function () {
    /* user settings */
    const minimumSwipeLength = 45;
    var _printSummary = false;
    var _traceSwipeGesture = false;
    var _traceTouchGesture = false;
    var _traceCalcuations = false;
    /* user settings end */
    console.clear();
    var loggingService = new LoggingService_1.LoggingService("Main");
    BaseService_1.BaseService.getInstance().InitializeLogging(_printSummary, _traceSwipeGesture, _traceTouchGesture, _traceCalcuations);
    BaseService_1.BaseService.getInstance().InitializeSettings(minimumSwipeLength);
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
        let src = document.getElementsByTagName("body")[0];
        if (src == null) {
            loggingService.LogError("Did not find source element", "Main", true);
        }
        if (src != null) {
            src.addEventListener('touchstart', function (e) {
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
                var tuple = BaseService_1.BaseService.getInstance().ShouldWeNavigate(current, first, previous, minimumSwipeLength, multiTouchDetected);
                // We must navigate
                if (tuple[0] == true) {
                    if (tuple[1] == enums_1.Direction.Left) {
                        console.log("We must navigate back");
                        // history.back();
                    }
                    if (tuple[1] == enums_1.Direction.Right) {
                        console.log("We must navigate forward");
                        // history.forward();
                    }
                }
                // init start
                previous = new TouchPoint_1.TouchPoint(-1);
                if (current.touches == 0) { // no fingers detected
                    multiTouchDetected = false;
                    first = new TouchPoint_1.TouchPoint(-1);
                }
                else {
                    console.log("tuple is false");
                }
                // init complete
            }, false);
        }
    });
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcz90PTE2NDUzMzk2Njc2NjAiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQzdCTDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DLGlCQUFpQixLQUFLOzs7Ozs7Ozs7OztBQ1I5QztBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdCQUFnQixHQUFHLFFBQVEsSUFBSSxRQUFRO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCLEdBQUcsUUFBUSxNQUFNLFFBQVEsaUJBQWlCLGlCQUFpQjtBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdCQUFnQixHQUFHLFFBQVEsTUFBTSxRQUFRLGtCQUFrQixpQkFBaUI7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnQkFBZ0IsR0FBRyxRQUFRLE1BQU0sUUFBUSxlQUFlLGlCQUFpQjtBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUNoQ1Q7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CLCtCQUErQixtQkFBTyxDQUFDLHdHQUFnQztBQUN2RSx5QkFBeUIsbUJBQU8sQ0FBQyx5RkFBa0M7QUFDbkUsNEJBQTRCLG1CQUFPLENBQUMsa0dBQTZCO0FBQ2pFLGdCQUFnQixtQkFBTyxDQUFDLGlEQUFvQjtBQUM1Qyw4QkFBOEIsbUJBQU8sQ0FBQyxzR0FBK0I7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsb0NBQW9DO0FBQ3BDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMsd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFVBQVU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COzs7Ozs7Ozs7OztBQ3JGTjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUI7QUFDekIseUJBQXlCLG1CQUFPLENBQUMsNEZBQXFDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxVQUFVLEdBQUcsVUFBVTtBQUMzRSxvRUFBb0UsVUFBVSxHQUFHLFVBQVU7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRTtBQUMzRTtBQUNBLG9EQUFvRCxNQUFNO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7Ozs7Ozs7Ozs7O0FDOUNaO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDJCQUEyQjtBQUMzQix5QkFBeUIsbUJBQU8sQ0FBQyw0RkFBcUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxTQUFTLEVBQUUsT0FBTztBQUNwRTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVMsRUFBRSxPQUFPO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxTQUFTLEVBQUUsT0FBTztBQUNwRTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVMsRUFBRSxPQUFPO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxTQUFTLEVBQUUsT0FBTztBQUNwRTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVMsRUFBRSxPQUFPO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxTQUFTLEVBQUUsT0FBTztBQUNwRTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVMsRUFBRSxPQUFPO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxTQUFTLEVBQUUsT0FBTztBQUNwRTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVMsRUFBRSxPQUFPO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxTQUFTLEVBQUUsT0FBTztBQUNwRTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVMsRUFBRSxPQUFPO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7Ozs7Ozs7Ozs7O0FDMUVkO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDRCQUE0QjtBQUM1Qix5QkFBeUIsbUJBQU8sQ0FBQyw0RkFBcUM7QUFDdEUsc0JBQXNCLG1CQUFPLENBQUMsdUVBQWdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE9BQU87QUFDckQ7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxPQUFPO0FBQ3JEO0FBQ0E7QUFDQSwyQ0FBMkMsT0FBTztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7Ozs7Ozs7VUN0REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCLG1CQUFPLENBQUMsaUdBQTBDO0FBQ3hFLHFCQUFxQixtQkFBTyxDQUFDLHVEQUFxQjtBQUNsRCx5QkFBeUIsbUJBQU8sQ0FBQyxpR0FBMEM7QUFDM0UsZ0JBQWdCLG1CQUFPLENBQUMsNkNBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tb2RlbHMvVG91Y2hQb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL2VudW1zLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvQmFzZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL2hlbHBlcnMvQ2FsY3VsYXRpb25IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL2hlbHBlcnMvU3VtbWFyeVJlcG9ydEhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvaGVscGVycy9Ub3VjaERldGVjdGlvbkhlbHBlci50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Ub3VjaFBvaW50ID0gdm9pZCAwO1xyXG5jbGFzcyBUb3VjaFBvaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGUsIHVzZUNoYW5nZWRUb3VjaGVzID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmNsaWVudFggPSAtMTtcclxuICAgICAgICB0aGlzLmNsaWVudFkgPSAtMTtcclxuICAgICAgICB0aGlzLnRvdWNoZXMgPSAtMTtcclxuICAgICAgICB0aGlzLnRhcmdldFRvdWNoZXMgPSAtMTtcclxuICAgICAgICB0aGlzLmNoYW5nZWRUb3VjaGVzID0gLTE7XHJcbiAgICAgICAgaWYgKHVzZUNoYW5nZWRUb3VjaGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGUudG91Y2hlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50WSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnRvdWNoZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoZXMgPSBlLnRvdWNoZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRUb3VjaGVzID0gZS50YXJnZXRUb3VjaGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkVG91Y2hlcyA9IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVG91Y2hQb2ludCA9IFRvdWNoUG9pbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRGlyZWN0aW9uID0gdm9pZCAwO1xyXG52YXIgRGlyZWN0aW9uO1xyXG4oZnVuY3Rpb24gKERpcmVjdGlvbikge1xyXG4gICAgRGlyZWN0aW9uW0RpcmVjdGlvbltcIkRvTm90aGluZ1wiXSA9IDBdID0gXCJEb05vdGhpbmdcIjtcclxuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJMZWZ0XCJdID0gMV0gPSBcIkxlZnRcIjtcclxuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJSaWdodFwiXSA9IDJdID0gXCJSaWdodFwiO1xyXG59KShEaXJlY3Rpb24gPSBleHBvcnRzLkRpcmVjdGlvbiB8fCAoZXhwb3J0cy5EaXJlY3Rpb24gPSB7fSkpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkxvZ2dpbmdTZXJ2aWNlID0gdm9pZCAwO1xyXG5jbGFzcyBMb2dnaW5nU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLl9jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICB9XHJcbiAgICBMb2dJbmZvKG1lc3NhZ2UsIGNhbGxlciwgZW5hYmxlZCkge1xyXG4gICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuX2NsYXNzTmFtZX0uJHtjYWxsZXJ9IC0gJHttZXNzYWdlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIDtcclxuICAgIExvZ1N1Y2Nlc3MobWVzc2FnZSwgY2FsbGVyLCBlbmFibGVkKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5fY2xhc3NOYW1lfS4ke2NhbGxlcn0gLSAlYyR7bWVzc2FnZX1gLCAnY29sb3I6IGdyZWVuO2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgTG9nV2FybihtZXNzYWdlLCBjYWxsZXIsIGVuYWJsZWQpIHtcclxuICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLl9jbGFzc05hbWV9LiR7Y2FsbGVyfSAtICVjJHttZXNzYWdlfWAsICdjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgTG9nRXJyb3IobWVzc2FnZSwgY2FsbGVyLCBlbmFibGVkKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5fY2xhc3NOYW1lfS4ke2NhbGxlcn0gLSAlYyR7bWVzc2FnZX1gLCAnY29sb3I6IHJlZDtmb250LXdlaWdodDpib2xkOycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIDtcclxufVxyXG5leHBvcnRzLkxvZ2dpbmdTZXJ2aWNlID0gTG9nZ2luZ1NlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQmFzZVNlcnZpY2UgPSB2b2lkIDA7XHJcbmNvbnN0IFRvdWNoRGV0ZWN0aW9uSGVscGVyXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL1RvdWNoRGV0ZWN0aW9uSGVscGVyXCIpO1xyXG5jb25zdCBMb2dnaW5nU2VydmljZV8xID0gcmVxdWlyZShcIi4uL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG5jb25zdCBDYWxjdWxhdGlvbkhlbHBlcl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9DYWxjdWxhdGlvbkhlbHBlclwiKTtcclxuY29uc3QgZW51bXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9tb2RlbHMvZW51bXNcIik7XHJcbmNvbnN0IFN1bW1hcnlSZXBvcnRIZWxwZXJfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvU3VtbWFyeVJlcG9ydEhlbHBlclwiKTtcclxuY2xhc3MgQmFzZVNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbWluaW11bVN3aXBlTGVuZ3RoID0gLTE7XHJcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBCYXNlU2VydmljZS5uYW1lO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UgPSBmYWxzZTsgLy9XaWxsIGJlIG1haW50YWluZWQgYnkgc3lzdGVtLiBVc2UgTWFpbiBcclxuICAgICAgICB0aGlzLl9wcmludFN1bW1hcnkgPSBmYWxzZTsgLy9XaWxsIGJlIG1haW50YWluZWQgYnkgc3lzdGVtLiBVc2UgTWFpblxyXG4gICAgICAgIHRoaXMuX3RyYWNlU3dpcGVHZXN0dXJlID0gZmFsc2U7IC8vV2lsbCBiZSBtYWludGFpbmVkIGJ5IHN5c3RlbS4gVXNlIE1haW5cclxuICAgICAgICB0aGlzLl90cmFjZVRvdWNoR2VzdHVyZSA9IGZhbHNlOyAvL1dpbGwgYmUgbWFpbnRhaW5lZCBieSBzeXN0ZW0uIFVzZSBNYWluICAgIFxyXG4gICAgICAgIHRoaXMuX3RyYWNlQ2FsY3VhdGlvbnMgPSBmYWxzZTsgLy9XaWxsIGJlIG1haW50YWluZWQgYnkgc3lzdGVtLiBVc2UgTWFpblxyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZVRvdWNoR2VzdHVyZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBUb3VjaERldGVjdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlU3dpcGVHZXN0dXJlID09IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIFN3aXBlRGV0ZWN0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDYWxjdWF0aW9ucyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBDYWxjdWxhdGlvbnNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VUb3VjaEdlc3R1cmUgPT0gdHJ1ZSB8fCB0aGlzLl90cmFjZVN3aXBlR2VzdHVyZSA9PSB0cnVlIHx8IHRoaXMuX3RyYWNlQ2FsY3VhdGlvbnMgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dpbmcgZW5hYmxlZCBmb3IgQmFzZVNlcnZpY2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKEJhc2VTZXJ2aWNlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSBuZXcgVG91Y2hEZXRlY3Rpb25IZWxwZXJfMS5Ub3VjaERldGVjdGlvbkhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRpb25IZWxwZXIgPSBuZXcgQ2FsY3VsYXRpb25IZWxwZXJfMS5DYWxjdWxhdGlvbkhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuU3VtbWFyeVJlcG9ydEhlbHBlciA9IG5ldyBTdW1tYXJ5UmVwb3J0SGVscGVyXzEuU3VtbWFyeVJlcG9ydEhlbHBlcigpO1xyXG4gICAgfVxyXG4gICAgSW5pdGlhbGl6ZVNldHRpbmdzKG1pbmltdW1Td2lwZUxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuX21pbmltdW1Td2lwZUxlbmd0aCA9IG1pbmltdW1Td2lwZUxlbmd0aDtcclxuICAgIH1cclxuICAgIEluaXRpYWxpemVMb2dnaW5nKHByaW50U3VtbWFyeSwgdHJhY2VTd2lwZUdlc3R1cmUsIHRyYWNlVG91Y2hHZXN0dXJlLCB0cmFjZUNhbGN1YXRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fcHJpbnRTdW1tYXJ5ID0gcHJpbnRTdW1tYXJ5O1xyXG4gICAgICAgIHRoaXMuX3RyYWNlU3dpcGVHZXN0dXJlID0gdHJhY2VTd2lwZUdlc3R1cmU7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VUb3VjaEdlc3R1cmUgPSB0cmFjZVRvdWNoR2VzdHVyZTtcclxuICAgICAgICB0aGlzLl90cmFjZUNhbGN1YXRpb25zID0gdHJhY2VDYWxjdWF0aW9ucztcclxuICAgIH1cclxuICAgIDtcclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIUJhc2VTZXJ2aWNlLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIEJhc2VTZXJ2aWNlLmluc3RhbmNlID0gbmV3IEJhc2VTZXJ2aWNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBCYXNlU2VydmljZS5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIFNob3VsZFdlTmF2aWdhdGUobGFzdCwgZmlyc3QsIHByZXZpb3VzLCBtaW5pbXVtU3dpcGVMZW5ndGgsIG11bHRpVG91Y2hEZXRlY3RlZCkge1xyXG4gICAgICAgIHZhciByZXRWYWwgPSBbZmFsc2UsIGVudW1zXzEuRGlyZWN0aW9uLkRvTm90aGluZ107XHJcbiAgICAgICAgaWYgKG11bHRpVG91Y2hEZXRlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oXCJNdWx0aVRvdWNoIGRldGVjdGVkLiBBYm9ydFwiLCB0aGlzLlNob3VsZFdlTmF2aWdhdGUubmFtZSwgdGhpcy5fdHJhY2VCYXNlU2VydmljZSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXRWYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2YWxpZGF0ZVN3aXBlQW5nbGUgPSBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci5WYWxpZGF0ZVN3aXBlQW5nbGUoZmlyc3QsIGxhc3QsIHRoaXMuX3RyYWNlU3dpcGVHZXN0dXJlKTtcclxuICAgICAgICB2YXIgdmFsaWRhdGVTd2lwZUxlbmd0aCA9IEJhc2VTZXJ2aWNlLmluc3RhbmNlLkNhbGN1bGF0aW9uSGVscGVyLlZhbGlkYXRlU3dpcGVMZW5ndGgoZmlyc3QsIGxhc3QsIG1pbmltdW1Td2lwZUxlbmd0aCwgdGhpcy5fdHJhY2VDYWxjdWF0aW9ucyk7XHJcbiAgICAgICAgdmFyIHZhbGlkYXRlVG91Y2ggPSBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci5WYWxpZGF0ZVRvdWNoKGxhc3QsIHRoaXMuX3RyYWNlVG91Y2hHZXN0dXJlKTtcclxuICAgICAgICB2YXIgdmFsaWRhdGVUb3VjaFNlcmllcyA9IEJhc2VTZXJ2aWNlLmluc3RhbmNlLlRvdWNoRGV0ZWN0aW9uSGVscGVyLlZhbGlkYXRlVG91Y2hTZXJpZXMocHJldmlvdXMsIHRoaXMuX3RyYWNlVG91Y2hHZXN0dXJlKTtcclxuICAgICAgICB2YXIgc2hvdWxkTmF2aWdhdGUgPSAoKG11bHRpVG91Y2hEZXRlY3RlZCA9PSBmYWxzZSkgJiYgKHZhbGlkYXRlU3dpcGVBbmdsZSA9PSB0cnVlKSAmJiAodmFsaWRhdGVUb3VjaCA9PSB0cnVlKSAmJiAodmFsaWRhdGVUb3VjaFNlcmllcyA9PSB0cnVlKSAmJiAodmFsaWRhdGVTd2lwZUxlbmd0aCA9PSB0cnVlKSk7XHJcbiAgICAgICAgQmFzZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5TdW1tYXJ5UmVwb3J0SGVscGVyLnByaW50U3VtbWFyeShtdWx0aVRvdWNoRGV0ZWN0ZWQsIHZhbGlkYXRlU3dpcGVBbmdsZSwgdmFsaWRhdGVUb3VjaCwgdmFsaWRhdGVUb3VjaFNlcmllcywgdmFsaWRhdGVTd2lwZUxlbmd0aCwgdGhpcy5fcHJpbnRTdW1tYXJ5LCB0aGlzLl9wcmludFN1bW1hcnkpO1xyXG4gICAgICAgIGlmIChzaG91bGROYXZpZ2F0ZSkge1xyXG4gICAgICAgICAgICBpZiAoaGlzdG9yeS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dJbmZvKFwiSGlzdG9yeSBpcyBlbXB0eVwiLCB0aGlzLlNob3VsZFdlTmF2aWdhdGUubmFtZSwgdGhpcy5fdHJhY2VCYXNlU2VydmljZSk7XHJcbiAgICAgICAgICAgICAgICByZXRWYWwgPSBbc2hvdWxkTmF2aWdhdGUsIGVudW1zXzEuRGlyZWN0aW9uLkRvTm90aGluZ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBpZiAoZmlyc3QuY2xpZW50WCA8IGxhc3QuY2xpZW50WCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dJbmZvKFwiU3dpcGluZyBsZWZ0XCIsIHRoaXMuU2hvdWxkV2VOYXZpZ2F0ZS5uYW1lLCB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlKTtcclxuICAgICAgICAgICAgICAgIHJldFZhbCA9IFtzaG91bGROYXZpZ2F0ZSwgZW51bXNfMS5EaXJlY3Rpb24uTGVmdF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBpZiAoZmlyc3QuY2xpZW50WCA+IGxhc3QuY2xpZW50WCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dJbmZvKFwiU3dpcGluZyByaWdodFwiLCB0aGlzLlNob3VsZFdlTmF2aWdhdGUubmFtZSwgdGhpcy5fdHJhY2VCYXNlU2VydmljZSk7XHJcbiAgICAgICAgICAgICAgICByZXRWYWwgPSBbc2hvdWxkTmF2aWdhdGUsIGVudW1zXzEuRGlyZWN0aW9uLlJpZ2h0XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYERpcmVjdGlvbjogJHtyZXRWYWxbMV19YCwgdGhpcy5TaG91bGRXZU5hdmlnYXRlLm5hbWUsIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UpO1xyXG4gICAgICAgIHJldHVybiByZXRWYWw7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5CYXNlU2VydmljZSA9IEJhc2VTZXJ2aWNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNhbGN1bGF0aW9uSGVscGVyID0gdm9pZCAwO1xyXG5jb25zdCBMb2dnaW5nU2VydmljZV8xID0gcmVxdWlyZShcIi4uLy4uL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG5jbGFzcyBDYWxjdWxhdGlvbkhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UoQ2FsY3VsYXRpb25IZWxwZXIubmFtZSk7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICAvLyBcclxuICAgIEdldFZpcnR1YWxDb29yZGluYXRlcyhwMSwgcDIsIGxvZykge1xyXG4gICAgICAgIHZhciBvcmlnaW5hbHgxID0gcDEuY2xpZW50WDtcclxuICAgICAgICB2YXIgb3JpZ2luYWx5MSA9IHAxLmNsaWVudFk7XHJcbiAgICAgICAgdmFyIG9yaWdpbmFseDIgPSBwMi5jbGllbnRYO1xyXG4gICAgICAgIHZhciBvcmlnaW5hbHkyID0gcDIuY2xpZW50WTtcclxuICAgICAgICB2YXIgdmlydHVhbHgxID0gMDtcclxuICAgICAgICB2YXIgdmlydHVhbHkxID0gMDtcclxuICAgICAgICB2YXIgdmlydHVhbHgyID0gb3JpZ2luYWx4MiAtIG9yaWdpbmFseDE7XHJcbiAgICAgICAgdmFyIHZpcnR1YWx5MiA9IG9yaWdpbmFseTEgLSBvcmlnaW5hbHkyO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgVmlydHVhbCBwMTogKCR7dmlydHVhbHgxfSwke3ZpcnR1YWx5MX0pYCwgdGhpcy5HZXRWaXJ0dWFsQ29vcmRpbmF0ZXMubmFtZSwgbG9nKTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYFZpcnR1YWwgcDIgKGRlbHRhWCxkZWx0YVkpOiAoJHt2aXJ0dWFseDJ9LCR7dmlydHVhbHkyfSlgLCB0aGlzLkdldFZpcnR1YWxDb29yZGluYXRlcy5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFg6IE1hdGguYWJzKHZpcnR1YWx4MiksXHJcbiAgICAgICAgICAgIFk6IE1hdGguYWJzKHZpcnR1YWx5MilcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgR2V0QW5nbGUoZmlyc3QsIGxhc3QsIGxvZykge1xyXG4gICAgICAgIHZhciB2aXJ0dWFsVG91Y2hQb2ludCA9IHRoaXMuR2V0VmlydHVhbENvb3JkaW5hdGVzKGZpcnN0LCBsYXN0LCBsb2cpO1xyXG4gICAgICAgIHZhciByYWRpYW4gPSBNYXRoLmF0YW4yKHZpcnR1YWxUb3VjaFBvaW50LlksIHZpcnR1YWxUb3VjaFBvaW50LlgpOyAvLyBJbiByYWRpYW4gICAgICAgICAgIFxyXG4gICAgICAgIHZhciBhbmdsZSA9IE1hdGgucm91bmQocmFkaWFuICogKDE4MCAvIE1hdGguUEkpKTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYFN3aXBlIGFuZ2xlOiAke2FuZ2xlfWAsIHRoaXMuR2V0QW5nbGUubmFtZSwgbG9nKTtcclxuICAgICAgICByZXR1cm4gYW5nbGU7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBWYWxpZGF0ZVN3aXBlTGVuZ3RoKGZpcnN0LCBsYXN0LCBtaW5pbXVtU3dpcGVMZW5ndGgsIGxvZykge1xyXG4gICAgICAgIHZhciB2aXJ0dWFsVG91Y2hQb2ludCA9IHRoaXMuR2V0VmlydHVhbENvb3JkaW5hdGVzKGZpcnN0LCBsYXN0LCBsb2cpO1xyXG4gICAgICAgIGlmICh2aXJ0dWFsVG91Y2hQb2ludC5YID4gbWluaW11bVN3aXBlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhcIlN3aXBlIGhhcyB0aGUgbWluaW11bSByZXF1aXJlZCBsZW5ndGhcIiwgdGhpcy5WYWxpZGF0ZVN3aXBlTGVuZ3RoLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oXCJTd2lwZSBpcyB0b28gc2hvcnRcIiwgdGhpcy5WYWxpZGF0ZVN3aXBlTGVuZ3RoLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgO1xyXG59XHJcbmV4cG9ydHMuQ2FsY3VsYXRpb25IZWxwZXIgPSBDYWxjdWxhdGlvbkhlbHBlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TdW1tYXJ5UmVwb3J0SGVscGVyID0gdm9pZCAwO1xyXG5jb25zdCBMb2dnaW5nU2VydmljZV8xID0gcmVxdWlyZShcIi4uLy4uL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG5jbGFzcyBTdW1tYXJ5UmVwb3J0SGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBuZXcgTG9nZ2luZ1NlcnZpY2VfMS5Mb2dnaW5nU2VydmljZShTdW1tYXJ5UmVwb3J0SGVscGVyLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHJpbnRTdW1tYXJ5KGNoZWNrNE11bHRpVG91Y2gsIGNoZWNrNFN3aXBlR2VzdHVyZSwgY2hlY2s0T25lRmluZ2VyVG91Y2gsIGNoZWNrVG91Y2hTZXJpZSwgY2hlY2tTd2lwZUxlbmd0aCwgcHJpbnRTdW1tYXJ5LCBsb2cpIHtcclxuICAgICAgICBpZiAocHJpbnRTdW1tYXJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgU3VtbWFyeSBSZXBvcnRgLCB0aGlzLnByaW50U3VtbWFyeS5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJGQUlMXCI7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCJOb3QgbXVsdGktdG91Y2g/XCI7XHJcbiAgICAgICAgICAgIGlmIChjaGVjazRNdWx0aVRvdWNoID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIlBBU1NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgJHttZXNzYWdlfSAke3Jlc3VsdH1gLCB0aGlzLnByaW50U3VtbWFyeS5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dFcnJvcihgJHttZXNzYWdlfSAke3Jlc3VsdH1gLCB0aGlzLnByaW50U3VtbWFyeS5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJGQUlMXCI7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBcIklzIFN3aXBlIGdlc3R1cmU/XCI7XHJcbiAgICAgICAgICAgIGlmIChjaGVjazRTd2lwZUdlc3R1cmUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gXCJQQVNTXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYCR7bWVzc2FnZX0gJHtyZXN1bHR9YCwgdGhpcy5wcmludFN1bW1hcnkubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoYCR7bWVzc2FnZX0gJHtyZXN1bHR9YCwgdGhpcy5wcmludFN1bW1hcnkubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiRkFJTFwiO1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gXCJJcyBvbmUgZmluZ2VyIHRvdWNoP1wiO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2s0T25lRmluZ2VyVG91Y2ggPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gXCJQQVNTXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYCR7bWVzc2FnZX0gJHtyZXN1bHR9YCwgdGhpcy5wcmludFN1bW1hcnkubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoYCR7bWVzc2FnZX0gJHtyZXN1bHR9YCwgdGhpcy5wcmludFN1bW1hcnkubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiRkFJTFwiO1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gXCJUb3VjaCBzZXJpZSBvaz9cIjtcclxuICAgICAgICAgICAgaWYgKGNoZWNrVG91Y2hTZXJpZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIlBBU1NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgJHttZXNzYWdlfSAke3Jlc3VsdH1gLCB0aGlzLnByaW50U3VtbWFyeS5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dFcnJvcihgJHttZXNzYWdlfSAke3Jlc3VsdH1gLCB0aGlzLnByaW50U3VtbWFyeS5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJGQUlMXCI7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlN3aXBlIGhhcyByZXF1aXJlZCBtaW5pbXVtIGxlbmd0aD8gXCI7XHJcbiAgICAgICAgICAgIGlmIChjaGVja1N3aXBlTGVuZ3RoID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGAke21lc3NhZ2V9ICR7cmVzdWx0fWAsIHRoaXMucHJpbnRTdW1tYXJ5Lm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0Vycm9yKGAke21lc3NhZ2V9ICR7cmVzdWx0fWAsIHRoaXMucHJpbnRTdW1tYXJ5Lm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcIkZBSUxcIjtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IFwiVGhlcmUgYSBwYWdlcyBpbiB0aGUgaGlzdG9yeS4gT0suXCI7XHJcbiAgICAgICAgICAgIGlmIChoaXN0b3J5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGAke21lc3NhZ2V9ICR7cmVzdWx0fWAsIHRoaXMucHJpbnRTdW1tYXJ5Lm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0Vycm9yKGAke21lc3NhZ2V9ICR7cmVzdWx0fWAsIHRoaXMucHJpbnRTdW1tYXJ5Lm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlN1bW1hcnlSZXBvcnRIZWxwZXIgPSBTdW1tYXJ5UmVwb3J0SGVscGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRvdWNoRGV0ZWN0aW9uSGVscGVyID0gdm9pZCAwO1xyXG5jb25zdCBMb2dnaW5nU2VydmljZV8xID0gcmVxdWlyZShcIi4uLy4uL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG5jb25zdCBCYXNlU2VydmljZV8xID0gcmVxdWlyZShcIi4uL0Jhc2VTZXJ2aWNlXCIpO1xyXG5jbGFzcyBUb3VjaERldGVjdGlvbkhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UoVG91Y2hEZXRlY3Rpb25IZWxwZXIubmFtZSk7XHJcbiAgICB9XHJcbiAgICBWYWxpZGF0ZVRvdWNoKGN1cnJlbnQsIGxvZykge1xyXG4gICAgICAgIHZhciByZXR2YWwgPSAoY3VycmVudC50b3VjaGVzID09IDAgJiYgY3VycmVudC50YXJnZXRUb3VjaGVzID09IDAgJiYgY3VycmVudC5jaGFuZ2VkVG91Y2hlcyA9PSAwKTtcclxuICAgICAgICBpZiAocmV0dmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgJHtyZXR2YWx9YCwgdGhpcy5WYWxpZGF0ZVRvdWNoLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYCR7cmV0dmFsfWAsIHRoaXMuVmFsaWRhdGVUb3VjaC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dmFsO1xyXG4gICAgfVxyXG4gICAgVmFsaWRhdGVUb3VjaFNlcmllcyhwcmV2aW91cywgbG9nKSB7XHJcbiAgICAgICAgdmFyIHJldHZhbCA9IChwcmV2aW91cy50b3VjaGVzID09IDEgJiYgcHJldmlvdXMudGFyZ2V0VG91Y2hlcyA9PSAxICYmIHByZXZpb3VzLmNoYW5nZWRUb3VjaGVzID09IDEpO1xyXG4gICAgICAgIGlmIChyZXR2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGAke3JldHZhbH1gLCB0aGlzLlZhbGlkYXRlVG91Y2hTZXJpZXMubmFtZSwgbG9nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgJHtyZXR2YWx9YCwgdGhpcy5WYWxpZGF0ZVRvdWNoU2VyaWVzLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXR2YWw7XHJcbiAgICB9XHJcbiAgICBWYWxpZGF0ZVN3aXBlQW5nbGUoZmlyc3QsIGxhc3QsIGxvZykge1xyXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gZGlzcmVnYXJkIGFsbCBzd2lwZSB0aGF0IGFyZSBhbG1vc3QgdmlydGljYWwgb3IgdmVyeSBzdGVlcCBpbiBhbmdsZS5cclxuICAgICAgICB2YXIgYW5nbGUgPSBCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuQ2FsY3VsYXRpb25IZWxwZXIuR2V0QW5nbGUoZmlyc3QsIGxhc3QsIGxvZyk7XHJcbiAgICAgICAgaWYgKGFuZ2xlIDwgNzUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBUaGUgc3dpcGUgYW5nbGUgaXMgT0tgLCB0aGlzLlZhbGlkYXRlU3dpcGVBbmdsZS5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nV2FybihgVGhlIHN3aXBlIGlzIHRvbyBzdGVlcC4gQ29udGludWVgLCB0aGlzLlZhbGlkYXRlU3dpcGVBbmdsZS5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIFZhbGlkYXRlU3dpcGVMZW5ndGgoZmlyc3QsIGxhc3QsIG1pbmltdW1Td2lwZUxlbmd0aCwgbG9nKSB7XHJcbiAgICAgICAgdmFyIHZpcnR1YWxUb3VjaFBvaW50ID0gQmFzZVNlcnZpY2VfMS5CYXNlU2VydmljZS5nZXRJbnN0YW5jZSgpLkNhbGN1bGF0aW9uSGVscGVyLkdldFZpcnR1YWxDb29yZGluYXRlcyhmaXJzdCwgbGFzdCwgbG9nKTtcclxuICAgICAgICBpZiAodmlydHVhbFRvdWNoUG9pbnQuWCA+IG1pbmltdW1Td2lwZUxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYFRoZSBzd2lwZSBpcyBob3Jpc29udGFsLiBDb250aW51ZWAsIHRoaXMuVmFsaWRhdGVTd2lwZUxlbmd0aC5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nV2FybihgVGhlIHN3aXBlIGlzIHRvbyBzdGVlcC4gQ29udGludWVgLCB0aGlzLlZhbGlkYXRlU3dpcGVMZW5ndGgubmFtZSwgbG9nKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICA7XHJcbn1cclxuZXhwb3J0cy5Ub3VjaERldGVjdGlvbkhlbHBlciA9IFRvdWNoRGV0ZWN0aW9uSGVscGVyO1xyXG47XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gPT1Vc2VyU2NyaXB0PT1cclxuLy8gQG5hbWUgICAgICAgICBUb3VjaCBuYXZpZ2F0aW9uIGVuaGFuY21lbnRzIGZvciBGaXJlRm94XHJcbi8vIEBuYW1lc3BhY2UgICAgdXNlcnNjcmlwdEBmYWJpYW4uZGtcclxuLy8gQHZlcnNpb24gICAgICAwLjNcclxuLy8gQGRlc2NyaXB0aW9uICBaZXJvIGNvbmZpZ3VyYXRpb24gRWRnZSBsaWtlIHN3aXBlIG5hdmlnYXRpb24gZm9yIEZpcmVmb3hcclxuLy8gQGF1dGhvciAgICAgICBUb255IEZhYmlhblxyXG4vLyBAaW5jbHVkZSAgICAgICo6Ly8qLypcclxuLy8gQGdyYW50ICAgICAgICBub25lXHJcbi8vIEBsaWNlbnNlIE1JVFxyXG4vLyBAbm9mcmFtZXNcclxuLy8gPT0vVXNlclNjcmlwdD09XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQmFzZVNlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL0Jhc2VTZXJ2aWNlXCIpO1xyXG5jb25zdCBUb3VjaFBvaW50XzEgPSByZXF1aXJlKFwiLi9tb2RlbHMvVG91Y2hQb2ludFwiKTtcclxuY29uc3QgTG9nZ2luZ1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG5jb25zdCBlbnVtc18xID0gcmVxdWlyZShcIi4vbW9kZWxzL2VudW1zXCIpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgLyogdXNlciBzZXR0aW5ncyAqL1xyXG4gICAgY29uc3QgbWluaW11bVN3aXBlTGVuZ3RoID0gNDU7XHJcbiAgICB2YXIgX3ByaW50U3VtbWFyeSA9IGZhbHNlO1xyXG4gICAgdmFyIF90cmFjZVN3aXBlR2VzdHVyZSA9IGZhbHNlO1xyXG4gICAgdmFyIF90cmFjZVRvdWNoR2VzdHVyZSA9IGZhbHNlO1xyXG4gICAgdmFyIF90cmFjZUNhbGN1YXRpb25zID0gZmFsc2U7XHJcbiAgICAvKiB1c2VyIHNldHRpbmdzIGVuZCAqL1xyXG4gICAgY29uc29sZS5jbGVhcigpO1xyXG4gICAgdmFyIGxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UoXCJNYWluXCIpO1xyXG4gICAgQmFzZVNlcnZpY2VfMS5CYXNlU2VydmljZS5nZXRJbnN0YW5jZSgpLkluaXRpYWxpemVMb2dnaW5nKF9wcmludFN1bW1hcnksIF90cmFjZVN3aXBlR2VzdHVyZSwgX3RyYWNlVG91Y2hHZXN0dXJlLCBfdHJhY2VDYWxjdWF0aW9ucyk7XHJcbiAgICBCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuSW5pdGlhbGl6ZVNldHRpbmdzKG1pbmltdW1Td2lwZUxlbmd0aCk7XHJcbiAgICAvLyB2YXIgbmF2aWdhdG9yID0gbmV3IE5hdmlnYXRpb25TZXJ2aWNlKCk7XHJcbiAgICB2YXIgcHJldmlvdXM7XHJcbiAgICB2YXIgbXVsdGlUb3VjaERldGVjdGVkID0gZmFsc2U7XHJcbiAgICB2YXIgZmlyc3Q7XHJcbiAgICBmdW5jdGlvbiByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCkge1xyXG4gICAgICAgIGlmIChjdXJyZW50LnRvdWNoZXMgPiAxKSB7XHJcbiAgICAgICAgICAgIG11bHRpVG91Y2hEZXRlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc3JjID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdO1xyXG4gICAgICAgIGlmIChzcmMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsb2dnaW5nU2VydmljZS5Mb2dFcnJvcihcIkRpZCBub3QgZmluZCBzb3VyY2UgZWxlbWVudFwiLCBcIk1haW5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcmMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IG5ldyBUb3VjaFBvaW50XzEuVG91Y2hQb2ludChlKTtcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyTXVsdGlUb3VjaChjdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICAgICAgICAgIGlmIChmaXJzdCA9PSBudWxsIHx8IChmaXJzdC5jbGllbnRYID09IC0xICYmIGZpcnN0LmNsaWVudFkgPT0gLTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHNyYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBzdGFydFxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBuZXcgVG91Y2hQb2ludF8xLlRvdWNoUG9pbnQoZSk7XHJcbiAgICAgICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IGNvbXBsZXRlXHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgc3JjLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgc3RhcnRcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJNdWx0aVRvdWNoKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgdmFyIHR1cGxlID0gQmFzZVNlcnZpY2VfMS5CYXNlU2VydmljZS5nZXRJbnN0YW5jZSgpLlNob3VsZFdlTmF2aWdhdGUoY3VycmVudCwgZmlyc3QsIHByZXZpb3VzLCBtaW5pbXVtU3dpcGVMZW5ndGgsIG11bHRpVG91Y2hEZXRlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBtdXN0IG5hdmlnYXRlXHJcbiAgICAgICAgICAgICAgICBpZiAodHVwbGVbMF0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0dXBsZVsxXSA9PSBlbnVtc18xLkRpcmVjdGlvbi5MZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgbXVzdCBuYXZpZ2F0ZSBiYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoaXN0b3J5LmJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR1cGxlWzFdID09IGVudW1zXzEuRGlyZWN0aW9uLlJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgbXVzdCBuYXZpZ2F0ZSBmb3J3YXJkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoaXN0b3J5LmZvcndhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5ldyBUb3VjaFBvaW50XzEuVG91Y2hQb2ludCgtMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudC50b3VjaGVzID09IDApIHsgLy8gbm8gZmluZ2VycyBkZXRlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpVG91Y2hEZXRlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KC0xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHVwbGUgaXMgZmFsc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IGNvbXBsZXRlXHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9