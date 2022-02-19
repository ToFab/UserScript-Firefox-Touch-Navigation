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
        this._traceThredshold = true;
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
        var check4SwipeGesture = BaseService.instance.TouchDetectionHelper.DetectSwipeGesture(current, first, this._traceSwipeGesture);
        var check4OneFingerTouch = BaseService.instance.TouchDetectionHelper.IsOneFingerTouch(current, this._traceTouchGesture);
        var checkTouchSerie = BaseService.instance.TouchDetectionHelper.wasPreviousOneFingerTouch(previous, this._traceTouchGesture);
        var checkSwipeLength = BaseService.instance.CalculationHelper.ThredsholdExceeded(current, thredshold, first, this._traceCalcuations);
        var shouldNavigate = !multiTouchDetected && check4SwipeGesture && check4OneFingerTouch && checkTouchSerie && checkSwipeLength;
        this.printSummary(multiTouchDetected, check4SwipeGesture, check4OneFingerTouch, checkTouchSerie, checkSwipeLength);
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
            if (check4MultiTouch == false) {
                result = "PASS";
                this.LoggingService.LogSuccess(`multiTouchDetected : ${result}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`multiTouchDetected : ${result}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (check4SwipeGesture == true) {
                result = "PASS";
                this.LoggingService.LogSuccess(`DetectSwipeGesture : ${result}}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`DetectSwipeGesture : ${result}}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (check4OneFingerTouch == true) {
                result = "PASS";
                this.LoggingService.LogSuccess(`IsOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`IsOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (checkTouchSerie == true) {
                result = "PASS";
                this.LoggingService.LogSuccess(`wasPreviousOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            else {
                this.LoggingService.LogError(`wasPreviousOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }
            ;
            result = "FAIL";
            if (checkSwipeLength == true) {
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
        var deltas = this.GetDeltas(current, first, log);
        if (deltas.deltaX > thredshold && deltas.deltaX > -1) {
            this.loggingService.LogSuccess(`Thredshold: true deltaX: ${deltas.deltaX} thredshold: ${thredshold}`, this.ThredsholdExceeded.name, log);
            return true;
        }
        this.loggingService.LogInfo(`Thredshold: false deltaX: ${deltas.deltaX}`, this.ThredsholdExceeded.name, log);
        return false;
    }
    GetDeltas(current, first, log) {
        var deltaX = current.clientX - first.clientX;
        var deltaY = current.clientY - first.clientY;
        this.loggingService.LogInfo(`deltaX ${deltaX}`, this.ThredsholdExceeded.name, log);
        this.loggingService.LogInfo(`deltaY: ${deltaY}`, this.ThredsholdExceeded.name, log);
        return {
            deltaX: deltaX,
            deltaY: deltaY
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
        this.loggingService.LogInfo(`Degree ${degree} is outside of the valid range.`, this.DetectSwipeGesture.name, log);
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
    var _traceCalcuations = false;
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
                    var deltas = BaseService_1.BaseService.getInstance().CalculationHelper.GetDeltas(current, first, _traceCalcuations);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBMEM7QUFDeEUscUJBQXFCLG1CQUFPLENBQUMsdURBQXFCO0FBQ2xELHlCQUF5QixtQkFBTyxDQUFDLGlHQUEwQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9Ub3VjaFBvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvQmFzZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL2hlbHBlcnMvQ2FsY3VsYXRpb25IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL2hlbHBlcnMvVG91Y2hEZXRlY3Rpb25IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVG91Y2hQb2ludCA9IHZvaWQgMDtcclxuY2xhc3MgVG91Y2hQb2ludCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlLCB1c2VDaGFuZ2VkVG91Y2hlcyA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRYID0gLTE7XHJcbiAgICAgICAgdGhpcy5jbGllbnRZID0gLTE7XHJcbiAgICAgICAgdGhpcy50b3VjaGVzID0gLTE7XHJcbiAgICAgICAgdGhpcy50YXJnZXRUb3VjaGVzID0gLTE7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkVG91Y2hlcyA9IC0xO1xyXG4gICAgICAgIGlmICh1c2VDaGFuZ2VkVG91Y2hlcykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50WSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRvdWNoZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50b3VjaGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50b3VjaGVzID0gZS50b3VjaGVzLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0VG91Y2hlcyA9IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZFRvdWNoZXMgPSBlLnRhcmdldFRvdWNoZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRvdWNoUG9pbnQgPSBUb3VjaFBvaW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkxvZ2dpbmdTZXJ2aWNlID0gdm9pZCAwO1xyXG5jbGFzcyBMb2dnaW5nU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLl9jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICB9XHJcbiAgICBMb2dJbmZvKG1lc3NhZ2UsIGNhbGxlciwgZW5hYmxlZCkge1xyXG4gICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuX2NsYXNzTmFtZX0uJHtjYWxsZXJ9IC0gJHttZXNzYWdlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIDtcclxuICAgIExvZ1N1Y2Nlc3MobWVzc2FnZSwgY2FsbGVyLCBlbmFibGVkKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjJHt0aGlzLl9jbGFzc05hbWV9LiR7Y2FsbGVyfSAtICR7bWVzc2FnZX1gLCAnY29sb3I6IGdyZWVuO2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgTG9nV2FybihtZXNzYWdlLCBjYWxsZXIsIGVuYWJsZWQpIHtcclxuICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMke3RoaXMuX2NsYXNzTmFtZX0uJHtjYWxsZXJ9IC0gJHttZXNzYWdlfWAsICdjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgTG9nRXJyb3IobWVzc2FnZSwgY2FsbGVyLCBlbmFibGVkKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjJHt0aGlzLl9jbGFzc05hbWV9LiR7Y2FsbGVyfSAtICR7bWVzc2FnZX1gLCAnY29sb3I6IHJlZDtmb250LXdlaWdodDpib2xkOycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIDtcclxufVxyXG5leHBvcnRzLkxvZ2dpbmdTZXJ2aWNlID0gTG9nZ2luZ1NlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQmFzZVNlcnZpY2UgPSBleHBvcnRzLnRocmVkc2hvbGQgPSB2b2lkIDA7XHJcbmNvbnN0IFRvdWNoRGV0ZWN0aW9uSGVscGVyXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL1RvdWNoRGV0ZWN0aW9uSGVscGVyXCIpO1xyXG5jb25zdCBMb2dnaW5nU2VydmljZV8xID0gcmVxdWlyZShcIi4uL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG5jb25zdCBDYWxjdWxhdGlvbkhlbHBlcl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9DYWxjdWxhdGlvbkhlbHBlclwiKTtcclxuZXhwb3J0cy50aHJlZHNob2xkID0gNzU7XHJcbmNsYXNzIEJhc2VTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3ByaW50U3VtbWFyeSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VTd2lwZUdlc3R1cmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl90cmFjZVRvdWNoR2VzdHVyZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlVGhyZWRzaG9sZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDYWxjdWF0aW9ucyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gQmFzZVNlcnZpY2UubmFtZTtcclxuICAgICAgICB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlID0gZmFsc2U7IC8vV2lsbCBiZSBtYWludGFpbmVkIGJ5IHN5c3RlbVxyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZVRvdWNoR2VzdHVyZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBUb3VjaERldGVjdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlU3dpcGVHZXN0dXJlID09IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIFN3aXBlRGV0ZWN0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VUaHJlZHNob2xkID09IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIFRocmVkc2hvbGRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDYWxjdWF0aW9ucyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBDYWxjdWxhdGlvbnNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VUb3VjaEdlc3R1cmUgPT0gdHJ1ZSB8fCB0aGlzLl90cmFjZVN3aXBlR2VzdHVyZSA9PSB0cnVlIHx8IHRoaXMuX3RyYWNlVGhyZWRzaG9sZCA9PSB0cnVlIHx8IHRoaXMuX3RyYWNlQ2FsY3VhdGlvbnMgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dpbmcgZW5hYmxlZCBmb3IgQmFzZVNlcnZpY2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKEJhc2VTZXJ2aWNlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSBuZXcgVG91Y2hEZXRlY3Rpb25IZWxwZXJfMS5Ub3VjaERldGVjdGlvbkhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FsY3VsYXRpb25IZWxwZXIgPSBuZXcgQ2FsY3VsYXRpb25IZWxwZXJfMS5DYWxjdWxhdGlvbkhlbHBlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghQmFzZVNlcnZpY2UuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgQmFzZVNlcnZpY2UuaW5zdGFuY2UgPSBuZXcgQmFzZVNlcnZpY2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEJhc2VTZXJ2aWNlLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgU2hvdWxkTmF2aWdhdGUoY3VycmVudCwgZmlyc3QsIHByZXZpb3VzLCB0aHJlZHNob2xkLCBtdWx0aVRvdWNoRGV0ZWN0ZWQpIHtcclxuICAgICAgICBpZiAobXVsdGlUb3VjaERldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhcIk11bHRpVG91Y2ggZGV0ZWN0ZWQuIEFib3J0XCIsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdGhpcy5fdHJhY2VCYXNlU2VydmljZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoZWNrNFN3aXBlR2VzdHVyZSA9IEJhc2VTZXJ2aWNlLmluc3RhbmNlLlRvdWNoRGV0ZWN0aW9uSGVscGVyLkRldGVjdFN3aXBlR2VzdHVyZShjdXJyZW50LCBmaXJzdCwgdGhpcy5fdHJhY2VTd2lwZUdlc3R1cmUpO1xyXG4gICAgICAgIHZhciBjaGVjazRPbmVGaW5nZXJUb3VjaCA9IEJhc2VTZXJ2aWNlLmluc3RhbmNlLlRvdWNoRGV0ZWN0aW9uSGVscGVyLklzT25lRmluZ2VyVG91Y2goY3VycmVudCwgdGhpcy5fdHJhY2VUb3VjaEdlc3R1cmUpO1xyXG4gICAgICAgIHZhciBjaGVja1RvdWNoU2VyaWUgPSBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci53YXNQcmV2aW91c09uZUZpbmdlclRvdWNoKHByZXZpb3VzLCB0aGlzLl90cmFjZVRvdWNoR2VzdHVyZSk7XHJcbiAgICAgICAgdmFyIGNoZWNrU3dpcGVMZW5ndGggPSBCYXNlU2VydmljZS5pbnN0YW5jZS5DYWxjdWxhdGlvbkhlbHBlci5UaHJlZHNob2xkRXhjZWVkZWQoY3VycmVudCwgdGhyZWRzaG9sZCwgZmlyc3QsIHRoaXMuX3RyYWNlQ2FsY3VhdGlvbnMpO1xyXG4gICAgICAgIHZhciBzaG91bGROYXZpZ2F0ZSA9ICFtdWx0aVRvdWNoRGV0ZWN0ZWQgJiYgY2hlY2s0U3dpcGVHZXN0dXJlICYmIGNoZWNrNE9uZUZpbmdlclRvdWNoICYmIGNoZWNrVG91Y2hTZXJpZSAmJiBjaGVja1N3aXBlTGVuZ3RoO1xyXG4gICAgICAgIHRoaXMucHJpbnRTdW1tYXJ5KG11bHRpVG91Y2hEZXRlY3RlZCwgY2hlY2s0U3dpcGVHZXN0dXJlLCBjaGVjazRPbmVGaW5nZXJUb3VjaCwgY2hlY2tUb3VjaFNlcmllLCBjaGVja1N3aXBlTGVuZ3RoKTtcclxuICAgICAgICBpZiAoc2hvdWxkTmF2aWdhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGhpc3RvcnkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhcIkhpc3RvcnkgaXMgZW1wdHlcIiwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hvdWxkTmF2aWdhdGU7XHJcbiAgICB9XHJcbiAgICBwcmludFN1bW1hcnkoY2hlY2s0TXVsdGlUb3VjaCwgY2hlY2s0U3dpcGVHZXN0dXJlLCBjaGVjazRPbmVGaW5nZXJUb3VjaCwgY2hlY2tUb3VjaFNlcmllLCBjaGVja1N3aXBlTGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ByaW50U3VtbWFyeSkge1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2dpbmdTZXJ2aWNlLkxvZ1dhcm4oYEFsbCB0ZXN0IGJlbG93IG11c3QgcGFzcyBiZWZvcmUgbmF2aWdhdGlvbiBzdGFydGAsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIkZBSUxcIjtcclxuICAgICAgICAgICAgaWYgKGNoZWNrNE11bHRpVG91Y2ggPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBtdWx0aVRvdWNoRGV0ZWN0ZWQgOiAke3Jlc3VsdH1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dFcnJvcihgbXVsdGlUb3VjaERldGVjdGVkIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiRkFJTFwiO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2s0U3dpcGVHZXN0dXJlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBEZXRlY3RTd2lwZUdlc3R1cmUgOiAke3Jlc3VsdH19YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoYERldGVjdFN3aXBlR2VzdHVyZSA6ICR7cmVzdWx0fX1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJGQUlMXCI7XHJcbiAgICAgICAgICAgIGlmIChjaGVjazRPbmVGaW5nZXJUb3VjaCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIlBBU1NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgSXNPbmVGaW5nZXJUb3VjaCA6ICR7cmVzdWx0fWAsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvZ2dpbmdTZXJ2aWNlLkxvZ0Vycm9yKGBJc09uZUZpbmdlclRvdWNoIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiRkFJTFwiO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tUb3VjaFNlcmllID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGB3YXNQcmV2aW91c09uZUZpbmdlclRvdWNoIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nRXJyb3IoYHdhc1ByZXZpb3VzT25lRmluZ2VyVG91Y2ggOiAke3Jlc3VsdH1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJGQUlMXCI7XHJcbiAgICAgICAgICAgIGlmIChjaGVja1N3aXBlTGVuZ3RoID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFwiUEFTU1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dTdWNjZXNzKGBUaHJlZHNob2xkRXhjZWVkZWQgOiAke3Jlc3VsdH1gLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUsIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2dFcnJvcihgVGhyZWRzaG9sZEV4Y2VlZGVkIDogJHtyZXN1bHR9YCwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQmFzZVNlcnZpY2UgPSBCYXNlU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5DYWxjdWxhdGlvbkhlbHBlciA9IHZvaWQgMDtcclxuY29uc3QgTG9nZ2luZ1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi8uLi9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZVwiKTtcclxuY2xhc3MgQ2FsY3VsYXRpb25IZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKENhbGN1bGF0aW9uSGVscGVyLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgR2V0RGVncmVlKGN1cnJlbnQsIGZpcnN0LCBsb2cpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oXCJDYWxjdWxhdGUgdGhlIGRlZ3JlZSAvIGFuZ2VsIG9mIHRoZSBzd2lwZVwiLCBDYWxjdWxhdGlvbkhlbHBlci5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgeDE6ICR7Zmlyc3QuY2xpZW50WH1gLCBDYWxjdWxhdGlvbkhlbHBlci5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgeTE6ICR7Zmlyc3QuY2xpZW50WX1gLCBDYWxjdWxhdGlvbkhlbHBlci5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgeDI6ICR7Y3VycmVudC5jbGllbnRYfWAsIENhbGN1bGF0aW9uSGVscGVyLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dJbmZvKGB5MjogJHtjdXJyZW50LmNsaWVudFl9YCwgQ2FsY3VsYXRpb25IZWxwZXIubmFtZSwgbG9nKTtcclxuICAgICAgICB2YXIgcmFkID0gTWF0aC5hdGFuMigoY3VycmVudC5jbGllbnRZIC0gZmlyc3QuY2xpZW50WSksIChjdXJyZW50LmNsaWVudFggLSBmaXJzdC5jbGllbnRYKSk7IC8vIEluIHJhZGlhbnNcclxuICAgICAgICB2YXIgZGVncmVlID0gTWF0aC5yb3VuZChyYWQgKiAoMTgwIC8gTWF0aC5QSSkpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgRGVncmVlOiAke2RlZ3JlZX1gLCB0aGlzLkdldERlZ3JlZS5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHJldHVybiBkZWdyZWU7XHJcbiAgICB9XHJcbiAgICBUaHJlZHNob2xkRXhjZWVkZWQoY3VycmVudCwgdGhyZWRzaG9sZCwgZmlyc3QsIGxvZykge1xyXG4gICAgICAgIHZhciBkZWx0YXMgPSB0aGlzLkdldERlbHRhcyhjdXJyZW50LCBmaXJzdCwgbG9nKTtcclxuICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA+IHRocmVkc2hvbGQgJiYgZGVsdGFzLmRlbHRhWCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgVGhyZWRzaG9sZDogdHJ1ZSBkZWx0YVg6ICR7ZGVsdGFzLmRlbHRhWH0gdGhyZWRzaG9sZDogJHt0aHJlZHNob2xkfWAsIHRoaXMuVGhyZWRzaG9sZEV4Y2VlZGVkLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYFRocmVkc2hvbGQ6IGZhbHNlIGRlbHRhWDogJHtkZWx0YXMuZGVsdGFYfWAsIHRoaXMuVGhyZWRzaG9sZEV4Y2VlZGVkLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgR2V0RGVsdGFzKGN1cnJlbnQsIGZpcnN0LCBsb2cpIHtcclxuICAgICAgICB2YXIgZGVsdGFYID0gY3VycmVudC5jbGllbnRYIC0gZmlyc3QuY2xpZW50WDtcclxuICAgICAgICB2YXIgZGVsdGFZID0gY3VycmVudC5jbGllbnRZIC0gZmlyc3QuY2xpZW50WTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYGRlbHRhWCAke2RlbHRhWH1gLCB0aGlzLlRocmVkc2hvbGRFeGNlZWRlZC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nSW5mbyhgZGVsdGFZOiAke2RlbHRhWX1gLCB0aGlzLlRocmVkc2hvbGRFeGNlZWRlZC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhWDogZGVsdGFYLFxyXG4gICAgICAgICAgICBkZWx0YVk6IGRlbHRhWVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5DYWxjdWxhdGlvbkhlbHBlciA9IENhbGN1bGF0aW9uSGVscGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRvdWNoRGV0ZWN0aW9uSGVscGVyID0gdm9pZCAwO1xyXG5jb25zdCBMb2dnaW5nU2VydmljZV8xID0gcmVxdWlyZShcIi4uLy4uL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlXCIpO1xyXG5jb25zdCBCYXNlU2VydmljZV8xID0gcmVxdWlyZShcIi4uL0Jhc2VTZXJ2aWNlXCIpO1xyXG5jbGFzcyBUb3VjaERldGVjdGlvbkhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UoVG91Y2hEZXRlY3Rpb25IZWxwZXIubmFtZSk7XHJcbiAgICB9XHJcbiAgICBJc09uZUZpbmdlclRvdWNoKGN1cnJlbnQsIGxvZykge1xyXG4gICAgICAgIHZhciByZXR2YWwgPSAoY3VycmVudC50b3VjaGVzID09IDAgJiYgY3VycmVudC50YXJnZXRUb3VjaGVzID09IDAgJiYgY3VycmVudC5jaGFuZ2VkVG91Y2hlcyA9PSAwKTtcclxuICAgICAgICBpZiAocmV0dmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nU3VjY2VzcyhgaXNDdXJyZW50VG91Y2hPbmVGaW5nZXI6ICR7cmV0dmFsfWAsIHRoaXMuSXNPbmVGaW5nZXJUb3VjaC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dJbmZvKGBpc0N1cnJlbnRUb3VjaE9uZUZpbmdlcjogJHtyZXR2YWx9YCwgdGhpcy5Jc09uZUZpbmdlclRvdWNoLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXR2YWw7XHJcbiAgICB9XHJcbiAgICB3YXNQcmV2aW91c09uZUZpbmdlclRvdWNoKHByZXZpb3VzLCBsb2cpIHtcclxuICAgICAgICB2YXIgcmV0dmFsID0gKHByZXZpb3VzLnRvdWNoZXMgPT0gMSAmJiBwcmV2aW91cy50YXJnZXRUb3VjaGVzID09IDEgJiYgcHJldmlvdXMuY2hhbmdlZFRvdWNoZXMgPT0gMSk7XHJcbiAgICAgICAgaWYgKHJldHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYHdhc1ByZXZpb3VzVG91Y2hPbmVGaW5nZXI6ICR7cmV0dmFsfWAsIHRoaXMuSXNPbmVGaW5nZXJUb3VjaC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2dJbmZvKGB3YXNQcmV2aW91c1RvdWNoT25lRmluZ2VyOiAke3JldHZhbH1gLCB0aGlzLklzT25lRmluZ2VyVG91Y2gubmFtZSwgbG9nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcclxuICAgIH1cclxuICAgIERldGVjdFN3aXBlR2VzdHVyZShsYXN0LCBmaXJzdCwgbG9nKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZSA9IEJhc2VTZXJ2aWNlXzEuQmFzZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5DYWxjdWxhdGlvbkhlbHBlci5HZXREZWdyZWUobGFzdCwgZmlyc3QsIGxvZyk7XHJcbiAgICAgICAgLy8gU3dpcGUgcmlnaHQgYWN0aW9uLlxyXG4gICAgICAgIGlmIChsYXN0LmNsaWVudFggPiBmaXJzdC5jbGllbnRYKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXN0LmNsaWVudFkgPCBmaXJzdC5jbGllbnRZKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1dhcm4oXCJTd2lwZSAncmlnaHQgdXAnIGluIHByb2dyZXNzXCIsIHRoaXMuRGV0ZWN0U3dpcGVHZXN0dXJlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1dhcm4oXCJTd2lwZSAncmlnaHQgZG93bicgaW4gcHJvZ3Jlc3NcIiwgdGhpcy5EZXRlY3RTd2lwZUdlc3R1cmUubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHZhciBoaWdoID0gNDU7XHJcbiAgICAgICAgICAgIHZhciBsb3cgPSAtNDU7XHJcbiAgICAgICAgICAgIGlmIChkZWdyZWUgPj0gbG93ICYmIGRlZ3JlZSA8PSBoaWdoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYERlZ3JlZSAke2RlZ3JlZX0gaXMgd2l0aGluIHZhbGlkIHJhbmdlLmAsIHRoaXMuRGV0ZWN0U3dpcGVHZXN0dXJlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTd2lwZSBsZWZ0IGFjdGlvblxyXG4gICAgICAgIGlmIChmaXJzdC5jbGllbnRYID4gbGFzdC5jbGllbnRYKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXN0LmNsaWVudFkgPCBmaXJzdC5jbGllbnRZKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1dhcm4oXCJTd2lwZSAnbGVmdCB1cCcgaW4gcHJvZ3Jlc3NcIiwgdGhpcy5EZXRlY3RTd2lwZUdlc3R1cmUubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nV2FybihcIlN3aXBlICdsZWZ0IGRvd24nIGluIHByb2dyZXNzXCIsIHRoaXMuRGV0ZWN0U3dpcGVHZXN0dXJlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB2YXIgaGlnaCA9IDEwNTtcclxuICAgICAgICAgICAgdmFyIGxvdyA9IC0xMzU7XHJcbiAgICAgICAgICAgIGlmIChkZWdyZWUgPj0gbG93ICYmIGRlZ3JlZSA8PSBoaWdoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ1N1Y2Nlc3MoYERlZ3JlZSAke2RlZ3JlZX0gaXMgd2l0aGluIHZhbGlkIHJhbmdlLmAsIHRoaXMuRGV0ZWN0U3dpcGVHZXN0dXJlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZ0luZm8oYERlZ3JlZSAke2RlZ3JlZX0gaXMgb3V0c2lkZSBvZiB0aGUgdmFsaWQgcmFuZ2UuYCwgdGhpcy5EZXRlY3RTd2lwZUdlc3R1cmUubmFtZSwgbG9nKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Ub3VjaERldGVjdGlvbkhlbHBlciA9IFRvdWNoRGV0ZWN0aW9uSGVscGVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vID09VXNlclNjcmlwdD09XHJcbi8vIEBuYW1lICAgICAgICAgVG91Y2ggVUkgYmFjayBhbmQgZm9yd2FyZCBidXR0b25zIGZvciBGaXJlRm94XHJcbi8vIEBuYW1lc3BhY2UgICAgdXNlcnNjcmlwdEBmYWJpYW4uZGtcclxuLy8gQHZlcnNpb24gICAgICAwLjNcclxuLy8gQGRlc2NyaXB0aW9uICBGaXhpbmcgRmlyZUZveCBUb3VjaCBuYXZpZ2F0aW9uXHJcbi8vIEBhdXRob3IgICAgICAgVG9ueSBGYWJpYW5cclxuLy8gQGluY2x1ZGUgICAgICAqOi8vKi8qXHJcbi8vIEBncmFudCAgICAgICAgbm9uZVxyXG4vLyBAbGljZW5zZSBNSVRcclxuLy8gQG5vZnJhbWVzXHJcbi8vID09L1VzZXJTY3JpcHQ9PVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEJhc2VTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlci9CYXNlU2VydmljZVwiKTtcclxuY29uc3QgVG91Y2hQb2ludF8xID0gcmVxdWlyZShcIi4vbW9kZWxzL1RvdWNoUG9pbnRcIik7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZVwiKTtcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfdHJhY2VDYWxjdWF0aW9ucyA9IGZhbHNlO1xyXG4gICAgdmFyIGxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UoXCJNYWluXCIpO1xyXG4gICAgLyogdXNlciBzZXR0aW5ncyAqL1xyXG4gICAgY29uc3QgdGhyZWRzaG9sZCA9IDc1O1xyXG4gICAgLyogdXNlciBzZXR0aW5ncyBlbmQgKi9cclxuICAgIGNvbnNvbGUubG9nKFwiSGVsbG8gd29ybGRcIik7XHJcbiAgICAvLyB2YXIgbmF2aWdhdG9yID0gbmV3IE5hdmlnYXRpb25TZXJ2aWNlKCk7XHJcbiAgICB2YXIgcHJldmlvdXM7XHJcbiAgICB2YXIgbXVsdGlUb3VjaERldGVjdGVkID0gZmFsc2U7XHJcbiAgICB2YXIgZmlyc3Q7XHJcbiAgICBmdW5jdGlvbiByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCkge1xyXG4gICAgICAgIGlmIChjdXJyZW50LnRvdWNoZXMgPiAxKSB7XHJcbiAgICAgICAgICAgIG11bHRpVG91Y2hEZXRlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc3JjID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdO1xyXG4gICAgICAgIGlmIChzcmMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsb2dnaW5nU2VydmljZS5Mb2dFcnJvcihcIkRpZCBub3QgZmluZCBzb3VyY2UgZWxlbWVudFwiLCBcIk1haW5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcmMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBzdGFydFxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBuZXcgVG91Y2hQb2ludF8xLlRvdWNoUG9pbnQoZSk7XHJcbiAgICAgICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IGNvbXBsZXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3QgPT0gbnVsbCB8fCAoZmlyc3QuY2xpZW50WCA9PSAtMSAmJiBmaXJzdC5jbGllbnRZID09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gY3VycmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgc3RhcnRcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUpO1xyXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJNdWx0aVRvdWNoKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHNyYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IG5ldyBUb3VjaFBvaW50XzEuVG91Y2hQb2ludChlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyTXVsdGlUb3VjaChjdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICAgICAgICAgIGlmIChCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuU2hvdWxkTmF2aWdhdGUoY3VycmVudCwgZmlyc3QsIHByZXZpb3VzLCB0aHJlZHNob2xkLCBtdWx0aVRvdWNoRGV0ZWN0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhcyA9IEJhc2VTZXJ2aWNlXzEuQmFzZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5DYWxjdWxhdGlvbkhlbHBlci5HZXREZWx0YXMoY3VycmVudCwgZmlyc3QsIF90cmFjZUNhbGN1YXRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA8PSAtNzUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSBtdXN0IG5hdmlnYXRlIGJhY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA+PSA3NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlIG11c3QgbmF2aWdhdGUgZm9yd2FyZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGlzdG9yeS5mb3J3YXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBzdGFydFxyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgVG91Y2hQb2ludF8xLlRvdWNoUG9pbnQoLTEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQudG91Y2hlcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlUb3VjaERldGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0IGNvbXBsZXRlXHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9