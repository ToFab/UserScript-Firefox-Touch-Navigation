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
        var param1 = !multiTouchDetected;
        var param2 = BaseService.instance.TouchDetectionHelper.DetectSwipeGesture(current, first, this._traceSwipeGesture);
        var param3 = BaseService.instance.TouchDetectionHelper.IsOneFingerTouch(current, this._traceTouchGesture);
        var param4 = BaseService.instance.TouchDetectionHelper.wasPreviousOneFingerTouch(previous, this._traceTouchGesture);
        var param5 = BaseService.instance.CalculationHelper.ThredsholdExceeded(current, thredshold, first, this._traceCalcuations);
        if (this._printSummary) {
            this.LoggingService.LogWarn(`All test below must pass before navigation start`, this.ShouldNavigate.name, true);
            var result = "FAIL";
            if (!param1) {
                result = "PASS";
                this.LoggingService.LogSuccess(`multiTouchDetected : ${result}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`multiTouchDetected : ${result}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (!param2) {
                result = "PASS";
                this.LoggingService.LogSuccess(`DetectSwipeGesture : ${result}}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`DetectSwipeGesture : ${result}}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (!param3) {
                result = "PASS";
                this.LoggingService.LogSuccess(`IsOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`IsOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (!param4) {
                result = "PASS";
                this.LoggingService.LogSuccess(`wasPreviousOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`wasPreviousOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (!param5) {
                result = "PASS";
                this.LoggingService.LogSuccess(`ThredsholdExceeded : ${result}`, this.ShouldNavigate.name, this._traceBaseService);
            }
            else {
                this.LoggingService.LogError(`ThredsholdExceeded : ${result}`, this.ShouldNavigate.name, this._traceBaseService);
            }
            ;
        }
        var shouldNavigate = !param1 && param2 && param3 && param4 && param5;
        if (shouldNavigate) {
            if (history.length == 0) {
                this.LoggingService.LogInfo("History is empty", this.ShouldNavigate.name, this._traceBaseService);
                return false;
            }
        }
        return shouldNavigate;
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
            var high = 135;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL1RvdWNoUG9pbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlci9CYXNlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvaGVscGVycy9DYWxjdWxhdGlvbkhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvaGVscGVycy9Ub3VjaERldGVjdGlvbkhlbHBlci50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Ub3VjaFBvaW50ID0gdm9pZCAwO1xyXG5jbGFzcyBUb3VjaFBvaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGUsIHVzZUNoYW5nZWRUb3VjaGVzID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmNsaWVudFggPSAtMTtcclxuICAgICAgICB0aGlzLmNsaWVudFkgPSAtMTtcclxuICAgICAgICB0aGlzLnRvdWNoZXMgPSAtMTtcclxuICAgICAgICB0aGlzLnRhcmdldFRvdWNoZXMgPSAtMTtcclxuICAgICAgICB0aGlzLmNoYW5nZWRUb3VjaGVzID0gLTE7XHJcbiAgICAgICAgaWYgKHVzZUNoYW5nZWRUb3VjaGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGUudG91Y2hlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50WSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnRvdWNoZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoZXMgPSBlLnRvdWNoZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRUb3VjaGVzID0gZS50YXJnZXRUb3VjaGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkVG91Y2hlcyA9IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVG91Y2hQb2ludCA9IFRvdWNoUG9pbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTG9nZ2luZ1NlcnZpY2UgPSB2b2lkIDA7XHJcbmNsYXNzIExvZ2dpbmdTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuX2NsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgIH1cclxuICAgIExvZ0luZm8obWVzc2FnZSwgY2FsbGVyLCBlbmFibGVkKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5fY2xhc3NOYW1lfS4ke2NhbGxlcn0gLSAke21lc3NhZ2V9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgTG9nU3VjY2VzcyhtZXNzYWdlLCBjYWxsZXIsIGVuYWJsZWQpIHtcclxuICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMke3RoaXMuX2NsYXNzTmFtZX0uJHtjYWxsZXJ9IC0gJHttZXNzYWdlfWAsICdjb2xvcjogZ3JlZW47Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBMb2dXYXJuKG1lc3NhZ2UsIGNhbGxlciwgZW5hYmxlZCkge1xyXG4gICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyR7dGhpcy5fY2xhc3NOYW1lfS4ke2NhbGxlcn0gLSAke21lc3NhZ2V9YCwgJ2NvbG9yOiB5ZWxsb3c7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBMb2dFcnJvcihtZXNzYWdlLCBjYWxsZXIsIGVuYWJsZWQpIHtcclxuICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMke3RoaXMuX2NsYXNzTmFtZX0uJHtjYWxsZXJ9IC0gJHttZXNzYWdlfWAsICdjb2xvcjogcmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG59XHJcbmV4cG9ydHMuTG9nZ2luZ1NlcnZpY2UgPSBMb2dnaW5nU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5CYXNlU2VydmljZSA9IGV4cG9ydHMudGhyZWRzaG9sZCA9IHZvaWQgMDtcclxuY29uc3QgVG91Y2hEZXRlY3Rpb25IZWxwZXJfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvVG91Y2hEZXRlY3Rpb25IZWxwZXJcIik7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2VcIik7XHJcbmNvbnN0IENhbGN1bGF0aW9uSGVscGVyXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL0NhbGN1bGF0aW9uSGVscGVyXCIpO1xyXG5leHBvcnRzLnRocmVkc2hvbGQgPSA3NTtcclxuY2xhc3MgQmFzZVNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fcHJpbnRTdW1tYXJ5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl90cmFjZVN3aXBlR2VzdHVyZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlVG91Y2hHZXN0dXJlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VUaHJlZHNob2xkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDYWxjdWF0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gQmFzZVNlcnZpY2UubmFtZTtcclxuICAgICAgICB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlID0gZmFsc2U7IC8vV2lsbCBiZSBtYWludGFpbmVkIGJ5IHN5c3RlbVxyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZVRvdWNoR2VzdHVyZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBUb3VjaERldGVjdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlU3dpcGVHZXN0dXJlID09IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIFN3aXBlRGV0ZWN0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VUaHJlZHNob2xkID09IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIFRocmVkc2hvbGRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDYWxjdWF0aW9ucyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBDYWxjdWxhdGlvbnNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VUb3VjaEdlc3R1cmUgPT0gdHJ1ZSB8fCB0aGlzLl90cmFjZVN3aXBlR2VzdHVyZSA9PSB0cnVlIHx8IHRoaXMuX3RyYWNlVGhyZWRzaG9sZCA9PSB0cnVlIHx8IHRoaXMuX3RyYWNlQ2FsY3VhdGlvbnMgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dpbmcgZW5hYmxlZCBmb3IgQmFzZVNlcnZpY2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKEJhc2VTZXJ2aWNlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSBuZXcgVG91Y2hEZXRlY3Rpb25IZWxwZXJfMS5Ub3VjaERldGVjdGlvbkhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRpb25IZWxwZXIgPSBuZXcgQ2FsY3VsYXRpb25IZWxwZXJfMS5DYWxjdWxhdGlvbkhlbHBlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghQmFzZVNlcnZpY2UuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgQmFzZVNlcnZpY2UuaW5zdGFuY2UgPSBuZXcgQmFzZVNlcnZpY2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEJhc2VTZXJ2aWNlLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgU2hvdWxkTmF2aWdhdGUoY3VycmVudCwgZmlyc3QsIHByZXZpb3VzLCB0aHJlZHNob2xkLCBtdWx0aVRvdWNoRGV0ZWN0ZWQpIHtcclxuICAgICAgICBpZiAobXVsdGlUb3VjaERldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhcIk11bHRpVG91Y2ggZGV0ZWN0ZWQuIEFib3J0XCIsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdGhpcy5fdHJhY2VCYXNlU2VydmljZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHBhcmFtMSA9ICFtdWx0aVRvdWNoRGV0ZWN0ZWQ7XHJcbiAgICAgICAgdmFyIHBhcmFtMiA9IEJhc2VTZXJ2aWNlLmluc3RhbmNlLlRvdWNoRGV0ZWN0aW9uSGVscGVyLkRldGVjdFN3aXBlR2VzdHVyZShjdXJyZW50LCBmaXJzdCwgdGhpcy5fdHJhY2VTd2lwZUdlc3R1cmUpO1xyXG4gICAgICAgIHZhciBwYXJhbTMgPSBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci5Jc09uZUZpbmdlclRvdWNoKGN1cnJlbnQsIHRoaXMuX3RyYWNlVG91Y2hHZXN0dXJlKTtcclxuICAgICAgICB2YXIgcGFyYW00ID0gQmFzZVNlcnZpY2UuaW5zdGFuY2UuVG91Y2hEZXRlY3Rpb25IZWxwZXIud2FzUHJldmlvdXNPbmVGaW5nZXJUb3VjaChwcmV2aW91cywgdGhpcy5fdHJhY2VUb3VjaEdlc3R1cmUpO1xyXG4gICAgICAgIHZhciBwYXJhbTUgPSBCYXNlU2VydmljZS5pbnN0YW5jZS5DYWxjdWxhdGlvbkhlbHBlci5UaHJlZHNob2xkRXhjZWVkZWQoY3VycmVudCwgdGhyZWRzaG9sZCwgZmlyc3QsIHRoaXMuX3RyYWNlQ2FsY3VhdGlvbnMpO1xyXG4gICAgICAgIGlmICh0aGlzLl9wcmludFN1bW1hcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dXYXJuKGBBbGwgdGVzdCBiZWxvdyBtdXN0IHBhc3MgYmVmb3JlIG5hdmlnYXRpb24gc3RhcnRgLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJGQUlMXCI7XHJcbiAgICAgICAgICAgIGlmICghcGFyYW0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIlBBU1NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgbXVsdGlUb3VjaERldGVjdGVkIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoYG11bHRpVG91Y2hEZXRlY3RlZCA6ICR7cmVzdWx0fWAsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcIkZBSUxcIjtcclxuICAgICAgICAgICAgaWYgKCFwYXJhbTIpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBEZXRlY3RTd2lwZUdlc3R1cmUgOiAke3Jlc3VsdH19YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoYERldGVjdFN3aXBlR2VzdHVyZSA6ICR7cmVzdWx0fX1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJGQUlMXCI7XHJcbiAgICAgICAgICAgIGlmICghcGFyYW0zKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIlBBU1NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgSXNPbmVGaW5nZXJUb3VjaCA6ICR7cmVzdWx0fWAsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvZ2dpbmdTZXJ2aWNlLkxvZ0Vycm9yKGBJc09uZUZpbmdlclRvdWNoIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiRkFJTFwiO1xyXG4gICAgICAgICAgICBpZiAoIXBhcmFtNCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gXCJQQVNTXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYHdhc1ByZXZpb3VzT25lRmluZ2VyVG91Y2ggOiAke3Jlc3VsdH1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dFcnJvcihgd2FzUHJldmlvdXNPbmVGaW5nZXJUb3VjaCA6ICR7cmVzdWx0fWAsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcIkZBSUxcIjtcclxuICAgICAgICAgICAgaWYgKCFwYXJhbTUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBUaHJlZHNob2xkRXhjZWVkZWQgOiAke3Jlc3VsdH1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dFcnJvcihgVGhyZWRzaG9sZEV4Y2VlZGVkIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzaG91bGROYXZpZ2F0ZSA9ICFwYXJhbTEgJiYgcGFyYW0yICYmIHBhcmFtMyAmJiBwYXJhbTQgJiYgcGFyYW01O1xyXG4gICAgICAgIGlmIChzaG91bGROYXZpZ2F0ZSkge1xyXG4gICAgICAgICAgICBpZiAoaGlzdG9yeS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dJbmZvKFwiSGlzdG9yeSBpcyBlbXB0eVwiLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaG91bGROYXZpZ2F0ZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkJhc2VTZXJ2aWNlID0gQmFzZVNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ2FsY3VsYXRpb25IZWxwZXIgPSB2b2lkIDA7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vLi4vTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2VcIik7XHJcbmNsYXNzIENhbGN1bGF0aW9uSGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBuZXcgTG9nZ2luZ1NlcnZpY2VfMS5Mb2dnaW5nU2VydmljZShDYWxjdWxhdGlvbkhlbHBlci5uYW1lKTtcclxuICAgIH1cclxuICAgIEdldERlZ3JlZShjdXJyZW50LCBmaXJzdCwgbG9nKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dJbmZvKFwiQ2FsY3VsYXRlIHRoZSBkZWdyZWUgLyBhbmdlbCBvZiB0aGUgc3dpcGVcIiwgQ2FsY3VsYXRpb25IZWxwZXIubmFtZSwgbG9nKTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYHgxOiAke2ZpcnN0LmNsaWVudFh9YCwgQ2FsY3VsYXRpb25IZWxwZXIubmFtZSwgbG9nKTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYHkxOiAke2ZpcnN0LmNsaWVudFl9YCwgQ2FsY3VsYXRpb25IZWxwZXIubmFtZSwgbG9nKTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYHgyOiAke2N1cnJlbnQuY2xpZW50WH1gLCBDYWxjdWxhdGlvbkhlbHBlci5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgeTI6ICR7Y3VycmVudC5jbGllbnRZfWAsIENhbGN1bGF0aW9uSGVscGVyLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgdmFyIHJhZCA9IE1hdGguYXRhbjIoKGN1cnJlbnQuY2xpZW50WSAtIGZpcnN0LmNsaWVudFkpLCAoY3VycmVudC5jbGllbnRYIC0gZmlyc3QuY2xpZW50WCkpOyAvLyBJbiByYWRpYW5zXHJcbiAgICAgICAgdmFyIGRlZ3JlZSA9IE1hdGgucm91bmQocmFkICogKDE4MCAvIE1hdGguUEkpKTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYERlZ3JlZTogJHtkZWdyZWV9YCwgdGhpcy5HZXREZWdyZWUubmFtZSwgbG9nKTtcclxuICAgICAgICByZXR1cm4gZGVncmVlO1xyXG4gICAgfVxyXG4gICAgVGhyZWRzaG9sZEV4Y2VlZGVkKGN1cnJlbnQsIHRocmVkc2hvbGQsIGZpcnN0LCBsb2cpIHtcclxuICAgICAgICB2YXIgZGVsdGFzID0gdGhpcy5HZXREZWx0YXMoY3VycmVudCwgZmlyc3QpO1xyXG4gICAgICAgIGlmIChkZWx0YXMuZGVsdGFYID4gdGhyZWRzaG9sZCAmJiBkZWx0YXMuZGVsdGFYID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBUaHJlZHNob2xkOiB0cnVlIGRlbHRhWDogJHtkZWx0YXMuZGVsdGFYfSB0aHJlZHNob2xkOiAke3RocmVkc2hvbGR9YCwgdGhpcy5UaHJlZHNob2xkRXhjZWVkZWQubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgVGhyZWRzaG9sZDogZmFsc2UgZGVsdGFYOiAke2RlbHRhcy5kZWx0YVh9YCwgdGhpcy5UaHJlZHNob2xkRXhjZWVkZWQubmFtZSwgbG9nKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBHZXREZWx0YXMoY3VycmVudCwgZmlyc3QpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkZWx0YVg6IGN1cnJlbnQuY2xpZW50WCAtIGZpcnN0LmNsaWVudFgsXHJcbiAgICAgICAgICAgIGRlbHRhWTogY3VycmVudC5jbGllbnRZIC0gZmlyc3QuY2xpZW50WVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5DYWxjdWxhdGlvbkhlbHBlciA9IENhbGN1bGF0aW9uSGVscGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRvdWNoRGV0ZWN0aW9uSGVscGVyID0gdm9pZCAwO1xyXG5jb25zdCBMb2dnaW5nU2VydmljZV8xID0gcmVxdWlyZShcIi4uLy4uL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG5jb25zdCBCYXNlU2VydmljZV8xID0gcmVxdWlyZShcIi4uL0Jhc2VTZXJ2aWNlXCIpO1xyXG5jbGFzcyBUb3VjaERldGVjdGlvbkhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UoVG91Y2hEZXRlY3Rpb25IZWxwZXIubmFtZSk7XHJcbiAgICB9XHJcbiAgICBJc09uZUZpbmdlclRvdWNoKGN1cnJlbnQsIGxvZykge1xyXG4gICAgICAgIHZhciByZXR2YWwgPSAoY3VycmVudC50b3VjaGVzID09IDAgJiYgY3VycmVudC50YXJnZXRUb3VjaGVzID09IDAgJiYgY3VycmVudC5jaGFuZ2VkVG91Y2hlcyA9PSAwKTtcclxuICAgICAgICBpZiAocmV0dmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgaXNDdXJyZW50VG91Y2hPbmVGaW5nZXI6ICR7cmV0dmFsfWAsIHRoaXMuSXNPbmVGaW5nZXJUb3VjaC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dJbmZvKGBpc0N1cnJlbnRUb3VjaE9uZUZpbmdlcjogJHtyZXR2YWx9YCwgdGhpcy5Jc09uZUZpbmdlclRvdWNoLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXR2YWw7XHJcbiAgICB9XHJcbiAgICB3YXNQcmV2aW91c09uZUZpbmdlclRvdWNoKHByZXZpb3VzLCBsb2cpIHtcclxuICAgICAgICB2YXIgcmV0dmFsID0gKHByZXZpb3VzLnRvdWNoZXMgPT0gMSAmJiBwcmV2aW91cy50YXJnZXRUb3VjaGVzID09IDEgJiYgcHJldmlvdXMuY2hhbmdlZFRvdWNoZXMgPT0gMSk7XHJcbiAgICAgICAgaWYgKHJldHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYHdhc1ByZXZpb3VzVG91Y2hPbmVGaW5nZXI6ICR7cmV0dmFsfWAsIHRoaXMuSXNPbmVGaW5nZXJUb3VjaC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dJbmZvKGB3YXNQcmV2aW91c1RvdWNoT25lRmluZ2VyOiAke3JldHZhbH1gLCB0aGlzLklzT25lRmluZ2VyVG91Y2gubmFtZSwgbG9nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcclxuICAgIH1cclxuICAgIERldGVjdFN3aXBlR2VzdHVyZShsYXN0LCBmaXJzdCwgbG9nKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZSA9IEJhc2VTZXJ2aWNlXzEuQmFzZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5DYWxjdWxhdGlvbkhlbHBlci5HZXREZWdyZWUobGFzdCwgZmlyc3QsIGxvZyk7XHJcbiAgICAgICAgLy8gU3dpcGUgcmlnaHQgYWN0aW9uLlxyXG4gICAgICAgIGlmIChsYXN0LmNsaWVudFggPiBmaXJzdC5jbGllbnRYKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXN0LmNsaWVudFkgPCBmaXJzdC5jbGllbnRZKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1dhcm4oXCJTd2lwZSAncmlnaHQgdXAnIGluIHByb2dyZXNzXCIsIHRoaXMuRGV0ZWN0U3dpcGVHZXN0dXJlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1dhcm4oXCJTd2lwZSAncmlnaHQgZG93bicgaW4gcHJvZ3Jlc3NcIiwgdGhpcy5EZXRlY3RTd2lwZUdlc3R1cmUubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHZhciBoaWdoID0gNDU7XHJcbiAgICAgICAgICAgIHZhciBsb3cgPSAtNDU7XHJcbiAgICAgICAgICAgIGlmIChkZWdyZWUgPj0gbG93ICYmIGRlZ3JlZSA8PSBoaWdoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYERlZ3JlZSAke2RlZ3JlZX0gaXMgd2l0aGluIHZhbGlkIHJhbmdlLmAsIHRoaXMuRGV0ZWN0U3dpcGVHZXN0dXJlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTd2lwZSBsZWZ0IGFjdGlvblxyXG4gICAgICAgIGlmIChmaXJzdC5jbGllbnRYID4gbGFzdC5jbGllbnRYKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXN0LmNsaWVudFkgPCBmaXJzdC5jbGllbnRZKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1dhcm4oXCJTd2lwZSAnbGVmdCB1cCcgaW4gcHJvZ3Jlc3NcIiwgdGhpcy5EZXRlY3RTd2lwZUdlc3R1cmUubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nV2FybihcIlN3aXBlICdsZWZ0IGRvd24nIGluIHByb2dyZXNzXCIsIHRoaXMuRGV0ZWN0U3dpcGVHZXN0dXJlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB2YXIgaGlnaCA9IDEzNTtcclxuICAgICAgICAgICAgdmFyIGxvdyA9IC0xMzU7XHJcbiAgICAgICAgICAgIGlmIChkZWdyZWUgPj0gbG93ICYmIGRlZ3JlZSA8PSBoaWdoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYERlZ3JlZSAke2RlZ3JlZX0gaXMgd2l0aGluIHZhbGlkIHJhbmdlLmAsIHRoaXMuRGV0ZWN0U3dpcGVHZXN0dXJlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Ub3VjaERldGVjdGlvbkhlbHBlciA9IFRvdWNoRGV0ZWN0aW9uSGVscGVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vID09VXNlclNjcmlwdD09XHJcbi8vIEBuYW1lICAgICAgICAgVG91Y2ggVUkgYmFjayBhbmQgZm9yd2FyZCBidXR0b25zIGZvciBGaXJlRm94XHJcbi8vIEBuYW1lc3BhY2UgICAgdXNlcnNjcmlwdEBmYWJpYW4uZGtcclxuLy8gQHZlcnNpb24gICAgICAwLjNcclxuLy8gQGRlc2NyaXB0aW9uICBGaXhpbmcgRmlyZUZveCBUb3VjaCBuYXZpZ2F0aW9uXHJcbi8vIEBhdXRob3IgICAgICAgVG9ueSBGYWJpYW5cclxuLy8gQGluY2x1ZGUgICAgICAqOi8vKi8qXHJcbi8vIEBncmFudCAgICAgICAgbm9uZVxyXG4vLyBAbGljZW5zZSBNSVRcclxuLy8gQG5vZnJhbWVzXHJcbi8vID09L1VzZXJTY3JpcHQ9PVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEJhc2VTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlci9CYXNlU2VydmljZVwiKTtcclxuY29uc3QgVG91Y2hQb2ludF8xID0gcmVxdWlyZShcIi4vbW9kZWxzL1RvdWNoUG9pbnRcIik7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZVwiKTtcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKFwiTWFpblwiKTtcclxuICAgIC8qIHVzZXIgc2V0dGluZ3MgKi9cclxuICAgIGNvbnN0IHRocmVkc2hvbGQgPSA3NTtcclxuICAgIC8qIHVzZXIgc2V0dGluZ3MgZW5kICovXHJcbiAgICBjb25zb2xlLmxvZyhcIkhlbGxvIHdvcmxkXCIpO1xyXG4gICAgLy8gdmFyIG5hdmlnYXRvciA9IG5ldyBOYXZpZ2F0aW9uU2VydmljZSgpO1xyXG4gICAgdmFyIHByZXZpb3VzO1xyXG4gICAgdmFyIG11bHRpVG91Y2hEZXRlY3RlZCA9IGZhbHNlO1xyXG4gICAgdmFyIGZpcnN0O1xyXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJNdWx0aVRvdWNoKGN1cnJlbnQpIHtcclxuICAgICAgICBpZiAoY3VycmVudC50b3VjaGVzID4gMSkge1xyXG4gICAgICAgICAgICBtdWx0aVRvdWNoRGV0ZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNyYyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXTtcclxuICAgICAgICBpZiAoc3JjID09IG51bGwpIHtcclxuICAgICAgICAgICAgbG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoXCJEaWQgbm90IGZpbmQgc291cmNlIGVsZW1lbnRcIiwgXCJNYWluXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3JjICE9IG51bGwpIHtcclxuICAgICAgICAgICAgc3JjLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgc3RhcnRcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUpO1xyXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJNdWx0aVRvdWNoKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0ID09IG51bGwgfHwgKGZpcnN0LmNsaWVudFggPT0gLTEgJiYgZmlyc3QuY2xpZW50WSA9PSAtMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgc3JjLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IG5ldyBUb3VjaFBvaW50XzEuVG91Y2hQb2ludChlKTtcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyTXVsdGlUb3VjaChjdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBzdGFydFxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBuZXcgVG91Y2hQb2ludF8xLlRvdWNoUG9pbnQoZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IGNvbXBsZXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoQmFzZVNlcnZpY2VfMS5CYXNlU2VydmljZS5nZXRJbnN0YW5jZSgpLlNob3VsZE5hdmlnYXRlKGN1cnJlbnQsIGZpcnN0LCBwcmV2aW91cywgdGhyZWRzaG9sZCwgbXVsdGlUb3VjaERldGVjdGVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWx0YXMgPSBCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuQ2FsY3VsYXRpb25IZWxwZXIuR2V0RGVsdGFzKGN1cnJlbnQsIGZpcnN0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA8PSAtNzUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSBtdXN0IG5hdmlnYXRlIGJhY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA+PSA3NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlIG11c3QgbmF2aWdhdGUgZm9yd2FyZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGlzdG9yeS5mb3J3YXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBzdGFydFxyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgVG91Y2hQb2ludF8xLlRvdWNoUG9pbnQoLTEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQudG91Y2hlcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlUb3VjaERldGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IGNvbXBsZXRlXHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9