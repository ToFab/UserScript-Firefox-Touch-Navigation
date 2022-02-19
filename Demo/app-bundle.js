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
            console.log(`%c${this._className}.${caller} - ${message}`, 'color: green;font-weight:bold;');
        }
    }
    ;
    LogWarn(message, caller, enabled) {
        if (enabled) {
            console.log(`%c${this._className}.${caller} - ${message}`, 'color: yellow;font-weight:bold;');
        }
    }
    ;
    LogError(message, caller, enabled) {
        if (enabled) {
            console.log(`%c${this._className}.${caller} - ${message}`, 'color: red;font-weight:bold;');
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
exports.BaseService = exports.thredshold = void 0;
const TouchDetectionHelper_1 = __webpack_require__(/*! ./helpers/TouchDetectionHelper */ "./src/services/NavigationManager/helpers/TouchDetectionHelper.ts");
const LoggingService_1 = __webpack_require__(/*! ../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
const CalculationHelper_1 = __webpack_require__(/*! ./helpers/CalculationHelper */ "./src/services/NavigationManager/helpers/CalculationHelper.ts");
exports.thredshold = 75;
class BaseService {
    constructor() {
        this._printSummary = true;
        this._traceSwipeGesture = false;
        this._traceTouchGesture = false;
        this._traceThredshold = false;
        this._traceCalcuations = false;
        this.className = BaseService.name;
        this._traceBaseService = false; //Will be maintained by system
        if (this._traceTouchGesture == true) {
            console.log("Logging enabled for TouchDetection");
        }
        if (this._traceSwipeGesture == true) {
            console.log("Logging enabled for SwipeDetection");
        }
        if (this._traceThredshold == true) {
            console.log("Logging enabled for Thredshold");
        }
        ;
        if (this._traceCalcuations == true) {
            console.log("Logging enabled for Calculations");
        }
        ;
        if (this._traceTouchGesture == true || this._traceSwipeGesture == true || this._traceThredshold == true || this._traceCalcuations == true) {
            console.log("Logging enabled for BaseService");
            this._traceBaseService = true;
        }
        ;
        this.LoggingService = new LoggingService_1.LoggingService(BaseService.name);
        this.TouchDetectionHelper = new TouchDetectionHelper_1.TouchDetectionHelper();
        this.CalculationHelper = new CalculationHelper_1.CalculationHelper();
    }
    static getInstance() {
        if (!BaseService.instance) {
            BaseService.instance = new BaseService();
        }
        return BaseService.instance;
    }
    ShouldNavigate(current, first, previous, thredshold, multiTouchDetected) {
        if (multiTouchDetected) {
            this.LoggingService.LogInfo("MultiTouch detected. Abort", this.ShouldNavigate.name, this._traceBaseService);
            return false;
        }
        var check4MultiTouch = !multiTouchDetected;
        var check4SwipeGesture = BaseService.instance.TouchDetectionHelper.DetectSwipeGesture(current, first, this._traceSwipeGesture);
        var check4OneFingerTouch = BaseService.instance.TouchDetectionHelper.IsOneFingerTouch(current, this._traceTouchGesture);
        var checkTouchSerie = BaseService.instance.TouchDetectionHelper.wasPreviousOneFingerTouch(previous, this._traceTouchGesture);
        var checkSwipeLength = BaseService.instance.CalculationHelper.ThredsholdExceeded(current, thredshold, first, this._traceCalcuations);
        var shouldNavigate = !check4MultiTouch && check4SwipeGesture && check4OneFingerTouch && checkTouchSerie && checkSwipeLength;
        this.printSummary(check4MultiTouch, check4SwipeGesture, check4OneFingerTouch, checkTouchSerie, checkSwipeLength);
        if (shouldNavigate) {
            if (history.length == 0) {
                this.LoggingService.LogInfo("History is empty", this.ShouldNavigate.name, this._traceBaseService);
                return false;
            }
        }
        return shouldNavigate;
    }
    printSummary(check4MultiTouch, check4SwipeGesture, check4OneFingerTouch, checkTouchSerie, checkSwipeLength) {
        if (this._printSummary) {
            this.LoggingService.LogWarn(`All test below must pass before navigation start`, this.ShouldNavigate.name, true);
            var result = "FAIL";
            if (!check4MultiTouch) {
                result = "PASS";
                this.LoggingService.LogSuccess(`multiTouchDetected : ${result}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`multiTouchDetected : ${result}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (!check4SwipeGesture) {
                result = "PASS";
                this.LoggingService.LogSuccess(`DetectSwipeGesture : ${result}}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`DetectSwipeGesture : ${result}}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (!check4OneFingerTouch) {
                result = "PASS";
                this.LoggingService.LogSuccess(`IsOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`IsOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (!checkTouchSerie) {
                result = "PASS";
                this.LoggingService.LogSuccess(`wasPreviousOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`wasPreviousOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (!checkSwipeLength) {
                result = "PASS";
                this.LoggingService.LogSuccess(`ThredsholdExceeded : ${result}`, this.ShouldNavigate.name, this._traceBaseService);
            }
            else {
                this.LoggingService.LogError(`ThredsholdExceeded : ${result}`, this.ShouldNavigate.name, this._traceBaseService);
            }
            ;
        }
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
    GetDegree(current, first, log) {
        this.loggingService.LogInfo("Calculate the degree / angel of the swipe", CalculationHelper.name, log);
        this.loggingService.LogInfo(`x1: ${first.clientX}`, CalculationHelper.name, log);
        this.loggingService.LogInfo(`y1: ${first.clientY}`, CalculationHelper.name, log);
        this.loggingService.LogInfo(`x2: ${current.clientX}`, CalculationHelper.name, log);
        this.loggingService.LogInfo(`y2: ${current.clientY}`, CalculationHelper.name, log);
        var rad = Math.atan2((current.clientY - first.clientY), (current.clientX - first.clientX)); // In radians
        var degree = Math.round(rad * (180 / Math.PI));
        this.loggingService.LogInfo(`Degree: ${degree}`, this.GetDegree.name, log);
        return degree;
    }
    ThredsholdExceeded(current, thredshold, first, log) {
        var deltas = this.GetDeltas(current, first);
        if (deltas.deltaX > thredshold && deltas.deltaX > -1) {
            this.loggingService.LogSuccess(`Thredshold: true deltaX: ${deltas.deltaX} thredshold: ${thredshold}`, this.ThredsholdExceeded.name, log);
            return true;
        }
        this.loggingService.LogInfo(`Thredshold: false deltaX: ${deltas.deltaX}`, this.ThredsholdExceeded.name, log);
        return false;
    }
    GetDeltas(current, first) {
        return {
            deltaX: current.clientX - first.clientX,
            deltaY: current.clientY - first.clientY
        };
    }
}
exports.CalculationHelper = CalculationHelper;


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
    IsOneFingerTouch(current, log) {
        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        if (retval) {
            this.loggingService.LogSuccess(`isCurrentTouchOneFinger: ${retval}`, this.IsOneFingerTouch.name, log);
        }
        else {
            this.loggingService.LogInfo(`isCurrentTouchOneFinger: ${retval}`, this.IsOneFingerTouch.name, log);
        }
        return retval;
    }
    wasPreviousOneFingerTouch(previous, log) {
        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        if (retval) {
            this.loggingService.LogSuccess(`wasPreviousTouchOneFinger: ${retval}`, this.IsOneFingerTouch.name, log);
        }
        else {
            this.loggingService.LogInfo(`wasPreviousTouchOneFinger: ${retval}`, this.IsOneFingerTouch.name, log);
        }
        return retval;
    }
    DetectSwipeGesture(last, first, log) {
        var degree = BaseService_1.BaseService.getInstance().CalculationHelper.GetDegree(last, first, log);
        // Swipe right action.
        if (last.clientX > first.clientX) {
            if (last.clientY < first.clientY) {
                this.loggingService.LogWarn("Swipe 'right up' in progress", this.DetectSwipeGesture.name, log);
            }
            else {
                this.loggingService.LogWarn("Swipe 'right down' in progress", this.DetectSwipeGesture.name, log);
            }
            ;
            var high = 45;
            var low = -45;
            if (degree >= low && degree <= high) {
                this.loggingService.LogSuccess(`Degree ${degree} is within valid range.`, this.DetectSwipeGesture.name, log);
                return true;
            }
        }
        // Swipe left action
        if (first.clientX > last.clientX) {
            if (last.clientY < first.clientY) {
                this.loggingService.LogWarn("Swipe 'left up' in progress", this.DetectSwipeGesture.name, log);
            }
            else {
                this.loggingService.LogWarn("Swipe 'left down' in progress", this.DetectSwipeGesture.name, log);
            }
            ;
            var high = 105;
            var low = -135;
            if (degree >= low && degree <= high) {
                this.loggingService.LogSuccess(`Degree ${degree} is within valid range.`, this.DetectSwipeGesture.name, log);
                return true;
            }
        }
        return false;
    }
}
exports.TouchDetectionHelper = TouchDetectionHelper;


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
const LoggingService_1 = __webpack_require__(/*! ./services/LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
(function () {
    var loggingService = new LoggingService_1.LoggingService("Main");
    /* user settings */
    const thredshold = 75;
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
        let src = document.getElementsByTagName("body")[0];
        if (src == null) {
            loggingService.LogError("Did not find source element", "Main", true);
        }
        if (src != null) {
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
                    var deltas = BaseService_1.BaseService.getInstance().CalculationHelper.GetDeltas(current, first);
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
        }
    });
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxpR0FBMEM7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL1RvdWNoUG9pbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlci9CYXNlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvaGVscGVycy9DYWxjdWxhdGlvbkhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvaGVscGVycy9Ub3VjaERldGVjdGlvbkhlbHBlci50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Ub3VjaFBvaW50ID0gdm9pZCAwO1xyXG5jbGFzcyBUb3VjaFBvaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGUsIHVzZUNoYW5nZWRUb3VjaGVzID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmNsaWVudFggPSAtMTtcclxuICAgICAgICB0aGlzLmNsaWVudFkgPSAtMTtcclxuICAgICAgICB0aGlzLnRvdWNoZXMgPSAtMTtcclxuICAgICAgICB0aGlzLnRhcmdldFRvdWNoZXMgPSAtMTtcclxuICAgICAgICB0aGlzLmNoYW5nZWRUb3VjaGVzID0gLTE7XHJcbiAgICAgICAgaWYgKHVzZUNoYW5nZWRUb3VjaGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGUudG91Y2hlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50WSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnRvdWNoZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoZXMgPSBlLnRvdWNoZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRUb3VjaGVzID0gZS50YXJnZXRUb3VjaGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkVG91Y2hlcyA9IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVG91Y2hQb2ludCA9IFRvdWNoUG9pbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTG9nZ2luZ1NlcnZpY2UgPSB2b2lkIDA7XHJcbmNsYXNzIExvZ2dpbmdTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuX2NsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgIH1cclxuICAgIExvZ0luZm8obWVzc2FnZSwgY2FsbGVyLCBlbmFibGVkKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5fY2xhc3NOYW1lfS4ke2NhbGxlcn0gLSAke21lc3NhZ2V9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgTG9nU3VjY2VzcyhtZXNzYWdlLCBjYWxsZXIsIGVuYWJsZWQpIHtcclxuICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMke3RoaXMuX2NsYXNzTmFtZX0uJHtjYWxsZXJ9IC0gJHttZXNzYWdlfWAsICdjb2xvcjogZ3JlZW47Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBMb2dXYXJuKG1lc3NhZ2UsIGNhbGxlciwgZW5hYmxlZCkge1xyXG4gICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyR7dGhpcy5fY2xhc3NOYW1lfS4ke2NhbGxlcn0gLSAke21lc3NhZ2V9YCwgJ2NvbG9yOiB5ZWxsb3c7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBMb2dFcnJvcihtZXNzYWdlLCBjYWxsZXIsIGVuYWJsZWQpIHtcclxuICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMke3RoaXMuX2NsYXNzTmFtZX0uJHtjYWxsZXJ9IC0gJHttZXNzYWdlfWAsICdjb2xvcjogcmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG59XHJcbmV4cG9ydHMuTG9nZ2luZ1NlcnZpY2UgPSBMb2dnaW5nU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5CYXNlU2VydmljZSA9IGV4cG9ydHMudGhyZWRzaG9sZCA9IHZvaWQgMDtcclxuY29uc3QgVG91Y2hEZXRlY3Rpb25IZWxwZXJfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvVG91Y2hEZXRlY3Rpb25IZWxwZXJcIik7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2VcIik7XHJcbmNvbnN0IENhbGN1bGF0aW9uSGVscGVyXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL0NhbGN1bGF0aW9uSGVscGVyXCIpO1xyXG5leHBvcnRzLnRocmVkc2hvbGQgPSA3NTtcclxuY2xhc3MgQmFzZVNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fcHJpbnRTdW1tYXJ5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl90cmFjZVN3aXBlR2VzdHVyZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlVG91Y2hHZXN0dXJlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VUaHJlZHNob2xkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDYWxjdWF0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gQmFzZVNlcnZpY2UubmFtZTtcclxuICAgICAgICB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlID0gZmFsc2U7IC8vV2lsbCBiZSBtYWludGFpbmVkIGJ5IHN5c3RlbVxyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZVRvdWNoR2VzdHVyZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBUb3VjaERldGVjdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlU3dpcGVHZXN0dXJlID09IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIFN3aXBlRGV0ZWN0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VUaHJlZHNob2xkID09IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIFRocmVkc2hvbGRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDYWxjdWF0aW9ucyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBDYWxjdWxhdGlvbnNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VUb3VjaEdlc3R1cmUgPT0gdHJ1ZSB8fCB0aGlzLl90cmFjZVN3aXBlR2VzdHVyZSA9PSB0cnVlIHx8IHRoaXMuX3RyYWNlVGhyZWRzaG9sZCA9PSB0cnVlIHx8IHRoaXMuX3RyYWNlQ2FsY3VhdGlvbnMgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dpbmcgZW5hYmxlZCBmb3IgQmFzZVNlcnZpY2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKEJhc2VTZXJ2aWNlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSBuZXcgVG91Y2hEZXRlY3Rpb25IZWxwZXJfMS5Ub3VjaERldGVjdGlvbkhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRpb25IZWxwZXIgPSBuZXcgQ2FsY3VsYXRpb25IZWxwZXJfMS5DYWxjdWxhdGlvbkhlbHBlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghQmFzZVNlcnZpY2UuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgQmFzZVNlcnZpY2UuaW5zdGFuY2UgPSBuZXcgQmFzZVNlcnZpY2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEJhc2VTZXJ2aWNlLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgU2hvdWxkTmF2aWdhdGUoY3VycmVudCwgZmlyc3QsIHByZXZpb3VzLCB0aHJlZHNob2xkLCBtdWx0aVRvdWNoRGV0ZWN0ZWQpIHtcclxuICAgICAgICBpZiAobXVsdGlUb3VjaERldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhcIk11bHRpVG91Y2ggZGV0ZWN0ZWQuIEFib3J0XCIsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdGhpcy5fdHJhY2VCYXNlU2VydmljZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoZWNrNE11bHRpVG91Y2ggPSAhbXVsdGlUb3VjaERldGVjdGVkO1xyXG4gICAgICAgIHZhciBjaGVjazRTd2lwZUdlc3R1cmUgPSBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci5EZXRlY3RTd2lwZUdlc3R1cmUoY3VycmVudCwgZmlyc3QsIHRoaXMuX3RyYWNlU3dpcGVHZXN0dXJlKTtcclxuICAgICAgICB2YXIgY2hlY2s0T25lRmluZ2VyVG91Y2ggPSBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci5Jc09uZUZpbmdlclRvdWNoKGN1cnJlbnQsIHRoaXMuX3RyYWNlVG91Y2hHZXN0dXJlKTtcclxuICAgICAgICB2YXIgY2hlY2tUb3VjaFNlcmllID0gQmFzZVNlcnZpY2UuaW5zdGFuY2UuVG91Y2hEZXRlY3Rpb25IZWxwZXIud2FzUHJldmlvdXNPbmVGaW5nZXJUb3VjaChwcmV2aW91cywgdGhpcy5fdHJhY2VUb3VjaEdlc3R1cmUpO1xyXG4gICAgICAgIHZhciBjaGVja1N3aXBlTGVuZ3RoID0gQmFzZVNlcnZpY2UuaW5zdGFuY2UuQ2FsY3VsYXRpb25IZWxwZXIuVGhyZWRzaG9sZEV4Y2VlZGVkKGN1cnJlbnQsIHRocmVkc2hvbGQsIGZpcnN0LCB0aGlzLl90cmFjZUNhbGN1YXRpb25zKTtcclxuICAgICAgICB2YXIgc2hvdWxkTmF2aWdhdGUgPSAhY2hlY2s0TXVsdGlUb3VjaCAmJiBjaGVjazRTd2lwZUdlc3R1cmUgJiYgY2hlY2s0T25lRmluZ2VyVG91Y2ggJiYgY2hlY2tUb3VjaFNlcmllICYmIGNoZWNrU3dpcGVMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wcmludFN1bW1hcnkoY2hlY2s0TXVsdGlUb3VjaCwgY2hlY2s0U3dpcGVHZXN0dXJlLCBjaGVjazRPbmVGaW5nZXJUb3VjaCwgY2hlY2tUb3VjaFNlcmllLCBjaGVja1N3aXBlTGVuZ3RoKTtcclxuICAgICAgICBpZiAoc2hvdWxkTmF2aWdhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGhpc3RvcnkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhcIkhpc3RvcnkgaXMgZW1wdHlcIiwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hvdWxkTmF2aWdhdGU7XHJcbiAgICB9XHJcbiAgICBwcmludFN1bW1hcnkoY2hlY2s0TXVsdGlUb3VjaCwgY2hlY2s0U3dpcGVHZXN0dXJlLCBjaGVjazRPbmVGaW5nZXJUb3VjaCwgY2hlY2tUb3VjaFNlcmllLCBjaGVja1N3aXBlTGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ByaW50U3VtbWFyeSkge1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2dpbmdTZXJ2aWNlLkxvZ1dhcm4oYEFsbCB0ZXN0IGJlbG93IG11c3QgcGFzcyBiZWZvcmUgbmF2aWdhdGlvbiBzdGFydGAsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIkZBSUxcIjtcclxuICAgICAgICAgICAgaWYgKCFjaGVjazRNdWx0aVRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIlBBU1NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgbXVsdGlUb3VjaERldGVjdGVkIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoYG11bHRpVG91Y2hEZXRlY3RlZCA6ICR7cmVzdWx0fWAsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcIkZBSUxcIjtcclxuICAgICAgICAgICAgaWYgKCFjaGVjazRTd2lwZUdlc3R1cmUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBEZXRlY3RTd2lwZUdlc3R1cmUgOiAke3Jlc3VsdH19YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoYERldGVjdFN3aXBlR2VzdHVyZSA6ICR7cmVzdWx0fX1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJGQUlMXCI7XHJcbiAgICAgICAgICAgIGlmICghY2hlY2s0T25lRmluZ2VyVG91Y2gpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBJc09uZUZpbmdlclRvdWNoIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoYElzT25lRmluZ2VyVG91Y2ggOiAke3Jlc3VsdH1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJGQUlMXCI7XHJcbiAgICAgICAgICAgIGlmICghY2hlY2tUb3VjaFNlcmllKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIlBBU1NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2Vzcyhgd2FzUHJldmlvdXNPbmVGaW5nZXJUb3VjaCA6ICR7cmVzdWx0fWAsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvZ2dpbmdTZXJ2aWNlLkxvZ0Vycm9yKGB3YXNQcmV2aW91c09uZUZpbmdlclRvdWNoIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiRkFJTFwiO1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrU3dpcGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBUaHJlZHNob2xkRXhjZWVkZWQgOiAke3Jlc3VsdH1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dFcnJvcihgVGhyZWRzaG9sZEV4Y2VlZGVkIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQmFzZVNlcnZpY2UgPSBCYXNlU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5DYWxjdWxhdGlvbkhlbHBlciA9IHZvaWQgMDtcclxuY29uc3QgTG9nZ2luZ1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi8uLi9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZVwiKTtcclxuY2xhc3MgQ2FsY3VsYXRpb25IZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKENhbGN1bGF0aW9uSGVscGVyLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgR2V0RGVncmVlKGN1cnJlbnQsIGZpcnN0LCBsb2cpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oXCJDYWxjdWxhdGUgdGhlIGRlZ3JlZSAvIGFuZ2VsIG9mIHRoZSBzd2lwZVwiLCBDYWxjdWxhdGlvbkhlbHBlci5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgeDE6ICR7Zmlyc3QuY2xpZW50WH1gLCBDYWxjdWxhdGlvbkhlbHBlci5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgeTE6ICR7Zmlyc3QuY2xpZW50WX1gLCBDYWxjdWxhdGlvbkhlbHBlci5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgeDI6ICR7Y3VycmVudC5jbGllbnRYfWAsIENhbGN1bGF0aW9uSGVscGVyLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dJbmZvKGB5MjogJHtjdXJyZW50LmNsaWVudFl9YCwgQ2FsY3VsYXRpb25IZWxwZXIubmFtZSwgbG9nKTtcclxuICAgICAgICB2YXIgcmFkID0gTWF0aC5hdGFuMigoY3VycmVudC5jbGllbnRZIC0gZmlyc3QuY2xpZW50WSksIChjdXJyZW50LmNsaWVudFggLSBmaXJzdC5jbGllbnRYKSk7IC8vIEluIHJhZGlhbnNcclxuICAgICAgICB2YXIgZGVncmVlID0gTWF0aC5yb3VuZChyYWQgKiAoMTgwIC8gTWF0aC5QSSkpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgRGVncmVlOiAke2RlZ3JlZX1gLCB0aGlzLkdldERlZ3JlZS5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHJldHVybiBkZWdyZWU7XHJcbiAgICB9XHJcbiAgICBUaHJlZHNob2xkRXhjZWVkZWQoY3VycmVudCwgdGhyZWRzaG9sZCwgZmlyc3QsIGxvZykge1xyXG4gICAgICAgIHZhciBkZWx0YXMgPSB0aGlzLkdldERlbHRhcyhjdXJyZW50LCBmaXJzdCk7XHJcbiAgICAgICAgaWYgKGRlbHRhcy5kZWx0YVggPiB0aHJlZHNob2xkICYmIGRlbHRhcy5kZWx0YVggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYFRocmVkc2hvbGQ6IHRydWUgZGVsdGFYOiAke2RlbHRhcy5kZWx0YVh9IHRocmVkc2hvbGQ6ICR7dGhyZWRzaG9sZH1gLCB0aGlzLlRocmVkc2hvbGRFeGNlZWRlZC5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dJbmZvKGBUaHJlZHNob2xkOiBmYWxzZSBkZWx0YVg6ICR7ZGVsdGFzLmRlbHRhWH1gLCB0aGlzLlRocmVkc2hvbGRFeGNlZWRlZC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIEdldERlbHRhcyhjdXJyZW50LCBmaXJzdCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhWDogY3VycmVudC5jbGllbnRYIC0gZmlyc3QuY2xpZW50WCxcclxuICAgICAgICAgICAgZGVsdGFZOiBjdXJyZW50LmNsaWVudFkgLSBmaXJzdC5jbGllbnRZXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkNhbGN1bGF0aW9uSGVscGVyID0gQ2FsY3VsYXRpb25IZWxwZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSB2b2lkIDA7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vLi4vTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2VcIik7XHJcbmNvbnN0IEJhc2VTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vQmFzZVNlcnZpY2VcIik7XHJcbmNsYXNzIFRvdWNoRGV0ZWN0aW9uSGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBuZXcgTG9nZ2luZ1NlcnZpY2VfMS5Mb2dnaW5nU2VydmljZShUb3VjaERldGVjdGlvbkhlbHBlci5uYW1lKTtcclxuICAgIH1cclxuICAgIElzT25lRmluZ2VyVG91Y2goY3VycmVudCwgbG9nKSB7XHJcbiAgICAgICAgdmFyIHJldHZhbCA9IChjdXJyZW50LnRvdWNoZXMgPT0gMCAmJiBjdXJyZW50LnRhcmdldFRvdWNoZXMgPT0gMCAmJiBjdXJyZW50LmNoYW5nZWRUb3VjaGVzID09IDApO1xyXG4gICAgICAgIGlmIChyZXR2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBpc0N1cnJlbnRUb3VjaE9uZUZpbmdlcjogJHtyZXR2YWx9YCwgdGhpcy5Jc09uZUZpbmdlclRvdWNoLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYGlzQ3VycmVudFRvdWNoT25lRmluZ2VyOiAke3JldHZhbH1gLCB0aGlzLklzT25lRmluZ2VyVG91Y2gubmFtZSwgbG9nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcclxuICAgIH1cclxuICAgIHdhc1ByZXZpb3VzT25lRmluZ2VyVG91Y2gocHJldmlvdXMsIGxvZykge1xyXG4gICAgICAgIHZhciByZXR2YWwgPSAocHJldmlvdXMudG91Y2hlcyA9PSAxICYmIHByZXZpb3VzLnRhcmdldFRvdWNoZXMgPT0gMSAmJiBwcmV2aW91cy5jaGFuZ2VkVG91Y2hlcyA9PSAxKTtcclxuICAgICAgICBpZiAocmV0dmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2Vzcyhgd2FzUHJldmlvdXNUb3VjaE9uZUZpbmdlcjogJHtyZXR2YWx9YCwgdGhpcy5Jc09uZUZpbmdlclRvdWNoLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYHdhc1ByZXZpb3VzVG91Y2hPbmVGaW5nZXI6ICR7cmV0dmFsfWAsIHRoaXMuSXNPbmVGaW5nZXJUb3VjaC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dmFsO1xyXG4gICAgfVxyXG4gICAgRGV0ZWN0U3dpcGVHZXN0dXJlKGxhc3QsIGZpcnN0LCBsb2cpIHtcclxuICAgICAgICB2YXIgZGVncmVlID0gQmFzZVNlcnZpY2VfMS5CYXNlU2VydmljZS5nZXRJbnN0YW5jZSgpLkNhbGN1bGF0aW9uSGVscGVyLkdldERlZ3JlZShsYXN0LCBmaXJzdCwgbG9nKTtcclxuICAgICAgICAvLyBTd2lwZSByaWdodCBhY3Rpb24uXHJcbiAgICAgICAgaWYgKGxhc3QuY2xpZW50WCA+IGZpcnN0LmNsaWVudFgpIHtcclxuICAgICAgICAgICAgaWYgKGxhc3QuY2xpZW50WSA8IGZpcnN0LmNsaWVudFkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nV2FybihcIlN3aXBlICdyaWdodCB1cCcgaW4gcHJvZ3Jlc3NcIiwgdGhpcy5EZXRlY3RTd2lwZUdlc3R1cmUubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nV2FybihcIlN3aXBlICdyaWdodCBkb3duJyBpbiBwcm9ncmVzc1wiLCB0aGlzLkRldGVjdFN3aXBlR2VzdHVyZS5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgdmFyIGhpZ2ggPSA0NTtcclxuICAgICAgICAgICAgdmFyIGxvdyA9IC00NTtcclxuICAgICAgICAgICAgaWYgKGRlZ3JlZSA+PSBsb3cgJiYgZGVncmVlIDw9IGhpZ2gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgRGVncmVlICR7ZGVncmVlfSBpcyB3aXRoaW4gdmFsaWQgcmFuZ2UuYCwgdGhpcy5EZXRlY3RTd2lwZUdlc3R1cmUubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN3aXBlIGxlZnQgYWN0aW9uXHJcbiAgICAgICAgaWYgKGZpcnN0LmNsaWVudFggPiBsYXN0LmNsaWVudFgpIHtcclxuICAgICAgICAgICAgaWYgKGxhc3QuY2xpZW50WSA8IGZpcnN0LmNsaWVudFkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nV2FybihcIlN3aXBlICdsZWZ0IHVwJyBpbiBwcm9ncmVzc1wiLCB0aGlzLkRldGVjdFN3aXBlR2VzdHVyZS5uYW1lLCBsb2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dXYXJuKFwiU3dpcGUgJ2xlZnQgZG93bicgaW4gcHJvZ3Jlc3NcIiwgdGhpcy5EZXRlY3RTd2lwZUdlc3R1cmUubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHZhciBoaWdoID0gMTA1O1xyXG4gICAgICAgICAgICB2YXIgbG93ID0gLTEzNTtcclxuICAgICAgICAgICAgaWYgKGRlZ3JlZSA+PSBsb3cgJiYgZGVncmVlIDw9IGhpZ2gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgRGVncmVlICR7ZGVncmVlfSBpcyB3aXRoaW4gdmFsaWQgcmFuZ2UuYCwgdGhpcy5EZXRlY3RTd2lwZUdlc3R1cmUubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRvdWNoRGV0ZWN0aW9uSGVscGVyID0gVG91Y2hEZXRlY3Rpb25IZWxwZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gPT1Vc2VyU2NyaXB0PT1cclxuLy8gQG5hbWUgICAgICAgICBUb3VjaCBVSSBiYWNrIGFuZCBmb3J3YXJkIGJ1dHRvbnMgZm9yIEZpcmVGb3hcclxuLy8gQG5hbWVzcGFjZSAgICB1c2Vyc2NyaXB0QGZhYmlhbi5ka1xyXG4vLyBAdmVyc2lvbiAgICAgIDAuM1xyXG4vLyBAZGVzY3JpcHRpb24gIEZpeGluZyBGaXJlRm94IFRvdWNoIG5hdmlnYXRpb25cclxuLy8gQGF1dGhvciAgICAgICBUb255IEZhYmlhblxyXG4vLyBAaW5jbHVkZSAgICAgICo6Ly8qLypcclxuLy8gQGdyYW50ICAgICAgICBub25lXHJcbi8vIEBsaWNlbnNlIE1JVFxyXG4vLyBAbm9mcmFtZXNcclxuLy8gPT0vVXNlclNjcmlwdD09XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQmFzZVNlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL0Jhc2VTZXJ2aWNlXCIpO1xyXG5jb25zdCBUb3VjaFBvaW50XzEgPSByZXF1aXJlKFwiLi9tb2RlbHMvVG91Y2hQb2ludFwiKTtcclxuY29uc3QgTG9nZ2luZ1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UoXCJNYWluXCIpO1xyXG4gICAgLyogdXNlciBzZXR0aW5ncyAqL1xyXG4gICAgY29uc3QgdGhyZWRzaG9sZCA9IDc1O1xyXG4gICAgLyogdXNlciBzZXR0aW5ncyBlbmQgKi9cclxuICAgIGNvbnNvbGUubG9nKFwiSGVsbG8gd29ybGRcIik7XHJcbiAgICAvLyB2YXIgbmF2aWdhdG9yID0gbmV3IE5hdmlnYXRpb25TZXJ2aWNlKCk7XHJcbiAgICB2YXIgcHJldmlvdXM7XHJcbiAgICB2YXIgbXVsdGlUb3VjaERldGVjdGVkID0gZmFsc2U7XHJcbiAgICB2YXIgZmlyc3Q7XHJcbiAgICBmdW5jdGlvbiByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCkge1xyXG4gICAgICAgIGlmIChjdXJyZW50LnRvdWNoZXMgPiAxKSB7XHJcbiAgICAgICAgICAgIG11bHRpVG91Y2hEZXRlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc3JjID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdO1xyXG4gICAgICAgIGlmIChzcmMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsb2dnaW5nU2VydmljZS5Mb2dFcnJvcihcIkRpZCBub3QgZmluZCBzb3VyY2UgZWxlbWVudFwiLCBcIk1haW5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcmMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBzdGFydFxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBuZXcgVG91Y2hQb2ludF8xLlRvdWNoUG9pbnQoZSk7XHJcbiAgICAgICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IGNvbXBsZXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3QgPT0gbnVsbCB8fCAoZmlyc3QuY2xpZW50WCA9PSAtMSAmJiBmaXJzdC5jbGllbnRZID09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gY3VycmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgc3RhcnRcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUpO1xyXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJNdWx0aVRvdWNoKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHNyYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IG5ldyBUb3VjaFBvaW50XzEuVG91Y2hQb2ludChlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyTXVsdGlUb3VjaChjdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICAgICAgICAgIGlmIChCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuU2hvdWxkTmF2aWdhdGUoY3VycmVudCwgZmlyc3QsIHByZXZpb3VzLCB0aHJlZHNob2xkLCBtdWx0aVRvdWNoRGV0ZWN0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhcyA9IEJhc2VTZXJ2aWNlXzEuQmFzZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5DYWxjdWxhdGlvbkhlbHBlci5HZXREZWx0YXMoY3VycmVudCwgZmlyc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWx0YXMuZGVsdGFYIDw9IC03NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlIG11c3QgbmF2aWdhdGUgYmFja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWx0YXMuZGVsdGFYID49IDc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgbXVzdCBuYXZpZ2F0ZSBmb3J3YXJkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoaXN0b3J5LmZvcndhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5ldyBUb3VjaFBvaW50XzEuVG91Y2hQb2ludCgtMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudC50b3VjaGVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aVRvdWNoRGV0ZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=