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
    Log(message, caller, enabled) {
        if (enabled) {
            console.log(caller, message);
        }
    }
    GetIdentifier(className, functionName) {
        return className + "." + functionName;
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
const TouchDetectionHelper_1 = __webpack_require__(/*! ./helpers/TouchDetectionHelper */ "./src/services/NavigationManager/helpers/TouchDetectionHelper.ts");
const ThredsholdHelper_1 = __webpack_require__(/*! ./helpers/Utilities/ThredsholdHelper */ "./src/services/NavigationManager/helpers/Utilities/ThredsholdHelper.ts");
const LoggingService_1 = __webpack_require__(/*! ../LoggingManager/LoggingService */ "./src/services/LoggingManager/LoggingService.ts");
exports.thredshold = 75;
class BaseService {
    constructor() {
        this._baseServiceloggingEnabled = true;
        this.className = BaseService.name;
        this.BaseServiceloggingEnabled = this._baseServiceloggingEnabled;
        this.BaseServiceloggingEnabled = this._baseServiceloggingEnabled;
        this.LoggingService = new LoggingService_1.LoggingService();
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
            this.LoggingService.Log("MultiTouch detected. Abort", this.LoggingService.GetIdentifier(this.className, this.ShouldNavigate.name), this._baseServiceloggingEnabled);
            return false;
        }
        var shouldNavigate = (!multiTouchDetected
            && BaseService.instance.TouchDetectionHelper.isHorisontalSwipe(current, first)
            && BaseService.instance.TouchDetectionHelper.isCurrentTouchOneFinger(current)
            && BaseService.instance.TouchDetectionHelper.wasPreviousTouchOneFinger(previous)
            && BaseService.instance.ThredsholdHelper.ThredsholdExceeded(current, thredshold, first));
        if (shouldNavigate) {
            if (history.length == 0) {
                this.LoggingService.Log("History is empty", this.LoggingService.GetIdentifier(this.className, this.ShouldNavigate.name), this._baseServiceloggingEnabled);
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
        this.className = TouchDetectionHelper.name;
        this.loggingEnabled = false;
        this.loggingService = new LoggingService_1.LoggingService();
    }
    ;
    EnableLogging(enable) {
        if (enable) {
            console.log("Logging enabled for TouchDetectionHelper");
        }
        this.loggingEnabled = enable;
    }
    isCurrentTouchOneFinger(current) {
        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        this.loggingService.Log(`isCurrentTouchOneFinger: ${retval}`, this.loggingService.GetIdentifier(this.className, this.isCurrentTouchOneFinger.name), this.loggingEnabled);
        return retval;
    }
    wasPreviousTouchOneFinger(previous) {
        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        this.loggingService.Log(`wasPreviousTouchOneFinger: ${retval}`, this.loggingService.GetIdentifier(this.className, this.isCurrentTouchOneFinger.name), this.loggingEnabled);
        return retval;
    }
    isHorisontalSwipe(current, first) {
        var name = "TouchDetectionHelper.isHorisontalSwipe";
        this.loggingService.Log("Entering isHorisontalIsh", this.loggingService.GetIdentifier(this.className, this.isHorisontalSwipe.name), this.loggingEnabled);
        var degree = this.GetDegree(current, first);
        this.loggingService.Log(`Degree A: ${degree}`, name, this.loggingEnabled);
        if ((degree >= -36 && degree <= 15) || (degree >= -150 && degree <= 165)) {
            this.loggingService.Log("Degree is within valid range", this.loggingService.GetIdentifier(this.className, this.isHorisontalSwipe.name), this.loggingEnabled);
            return true;
        }
        else {
            console.log("Degree is outside of valid range.", this.loggingService.GetIdentifier(this.className, this.isHorisontalSwipe.name));
        }
        return false;
    }
    GetDegree(current, first) {
        var tmpX = current.clientX - first.clientX;
        var tmpY = current.clientY - first.clientY;
        var rad = Math.atan2(tmpY, tmpX); // In radians
        var degree = Math.round(rad * (180 / Math.PI));
        this.loggingService.Log(`Degreexxx: ${degree}`, this.loggingService.GetIdentifier(this.className, this.GetDegree.name), this.loggingEnabled);
        return degree;
    }
}
exports.TouchDetectionHelper = TouchDetectionHelper;


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
        this.className = ThredsholdHelper.name;
        this.loggingEnabled = false;
        this.loggingService = new LoggingService_1.LoggingService();
    }
    ;
    EnableLogging(enable) {
        if (enable) {
            console.log("Logging enabled for ThredsholdHelper");
        }
        this.loggingEnabled = enable;
    }
    ThredsholdExceeded(current, thredshold, first) {
        var deltas = this.GetDeltas(current, first);
        if (deltas.deltaX > thredshold && deltas.deltaX > -1) {
            this.loggingService.Log(`Thredshold: true deltaX: ${deltas.deltaX} thredshold: ${thredshold}`, this.loggingService.GetIdentifier(this.className, this.ThredsholdExceeded.name), this.loggingEnabled);
            return true;
        }
        this.loggingService.Log(`Thredshold: false deltaX: ${deltas.deltaX}`, this.loggingService.GetIdentifier(this.className, this.ThredsholdExceeded.name), this.loggingEnabled);
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
    var enableLoggingTouchDetectionHelper = true;
    var enableLoggingThredsholdHelper = false;
    // note: you can enable/disable logging for baseservice on the baseservice class  
    BaseService_1.BaseService.getInstance().TouchDetectionHelper.EnableLogging(enableLoggingTouchDetectionHelper);
    BaseService_1.BaseService.getInstance().ThredsholdHelper.EnableLogging(enableLoggingThredsholdHelper);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9Ub3VjaFBvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvQmFzZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL2hlbHBlcnMvVG91Y2hEZXRlY3Rpb25IZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL2hlbHBlcnMvVXRpbGl0aWVzL1RocmVkc2hvbGRIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVG91Y2hQb2ludCA9IHZvaWQgMDtcclxuY2xhc3MgVG91Y2hQb2ludCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlLCB1c2VDaGFuZ2VkVG91Y2hlcyA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRYID0gLTE7XHJcbiAgICAgICAgdGhpcy5jbGllbnRZID0gLTE7XHJcbiAgICAgICAgdGhpcy50b3VjaGVzID0gLTE7XHJcbiAgICAgICAgdGhpcy50YXJnZXRUb3VjaGVzID0gLTE7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkVG91Y2hlcyA9IC0xO1xyXG4gICAgICAgIGlmICh1c2VDaGFuZ2VkVG91Y2hlcykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50WSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRvdWNoZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50b3VjaGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50b3VjaGVzID0gZS50b3VjaGVzLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0VG91Y2hlcyA9IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZFRvdWNoZXMgPSBlLnRhcmdldFRvdWNoZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRvdWNoUG9pbnQgPSBUb3VjaFBvaW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkxvZ2dpbmdTZXJ2aWNlID0gdm9pZCAwO1xyXG5jbGFzcyBMb2dnaW5nU2VydmljZSB7XHJcbiAgICBMb2cobWVzc2FnZSwgY2FsbGVyLCBlbmFibGVkKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2FsbGVyLCBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHZXRJZGVudGlmaWVyKGNsYXNzTmFtZSwgZnVuY3Rpb25OYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSArIFwiLlwiICsgZnVuY3Rpb25OYW1lO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuTG9nZ2luZ1NlcnZpY2UgPSBMb2dnaW5nU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5CYXNlU2VydmljZSA9IGV4cG9ydHMudGhyZWRzaG9sZCA9IHZvaWQgMDtcclxuY29uc3QgVG91Y2hEZXRlY3Rpb25IZWxwZXJfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvVG91Y2hEZXRlY3Rpb25IZWxwZXJcIik7XHJcbmNvbnN0IFRocmVkc2hvbGRIZWxwZXJfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvVXRpbGl0aWVzL1RocmVkc2hvbGRIZWxwZXJcIik7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2VcIik7XHJcbmV4cG9ydHMudGhyZWRzaG9sZCA9IDc1O1xyXG5jbGFzcyBCYXNlU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9iYXNlU2VydmljZWxvZ2dpbmdFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IEJhc2VTZXJ2aWNlLm5hbWU7XHJcbiAgICAgICAgdGhpcy5CYXNlU2VydmljZWxvZ2dpbmdFbmFibGVkID0gdGhpcy5fYmFzZVNlcnZpY2Vsb2dnaW5nRW5hYmxlZDtcclxuICAgICAgICB0aGlzLkJhc2VTZXJ2aWNlbG9nZ2luZ0VuYWJsZWQgPSB0aGlzLl9iYXNlU2VydmljZWxvZ2dpbmdFbmFibGVkO1xyXG4gICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UgPSBuZXcgTG9nZ2luZ1NlcnZpY2VfMS5Mb2dnaW5nU2VydmljZSgpO1xyXG4gICAgICAgIHRoaXMuVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSBuZXcgVG91Y2hEZXRlY3Rpb25IZWxwZXJfMS5Ub3VjaERldGVjdGlvbkhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuVGhyZWRzaG9sZEhlbHBlciA9IG5ldyBUaHJlZHNob2xkSGVscGVyXzEuVGhyZWRzaG9sZEhlbHBlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghQmFzZVNlcnZpY2UuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgQmFzZVNlcnZpY2UuaW5zdGFuY2UgPSBuZXcgQmFzZVNlcnZpY2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEJhc2VTZXJ2aWNlLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgU2hvdWxkTmF2aWdhdGUoY3VycmVudCwgZmlyc3QsIHByZXZpb3VzLCB0aHJlZHNob2xkLCBtdWx0aVRvdWNoRGV0ZWN0ZWQpIHtcclxuICAgICAgICBpZiAobXVsdGlUb3VjaERldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nKFwiTXVsdGlUb3VjaCBkZXRlY3RlZC4gQWJvcnRcIiwgdGhpcy5Mb2dnaW5nU2VydmljZS5HZXRJZGVudGlmaWVyKHRoaXMuY2xhc3NOYW1lLCB0aGlzLlNob3VsZE5hdmlnYXRlLm5hbWUpLCB0aGlzLl9iYXNlU2VydmljZWxvZ2dpbmdFbmFibGVkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2hvdWxkTmF2aWdhdGUgPSAoIW11bHRpVG91Y2hEZXRlY3RlZFxyXG4gICAgICAgICAgICAmJiBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci5pc0hvcmlzb250YWxTd2lwZShjdXJyZW50LCBmaXJzdClcclxuICAgICAgICAgICAgJiYgQmFzZVNlcnZpY2UuaW5zdGFuY2UuVG91Y2hEZXRlY3Rpb25IZWxwZXIuaXNDdXJyZW50VG91Y2hPbmVGaW5nZXIoY3VycmVudClcclxuICAgICAgICAgICAgJiYgQmFzZVNlcnZpY2UuaW5zdGFuY2UuVG91Y2hEZXRlY3Rpb25IZWxwZXIud2FzUHJldmlvdXNUb3VjaE9uZUZpbmdlcihwcmV2aW91cylcclxuICAgICAgICAgICAgJiYgQmFzZVNlcnZpY2UuaW5zdGFuY2UuVGhyZWRzaG9sZEhlbHBlci5UaHJlZHNob2xkRXhjZWVkZWQoY3VycmVudCwgdGhyZWRzaG9sZCwgZmlyc3QpKTtcclxuICAgICAgICBpZiAoc2hvdWxkTmF2aWdhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGhpc3RvcnkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nKFwiSGlzdG9yeSBpcyBlbXB0eVwiLCB0aGlzLkxvZ2dpbmdTZXJ2aWNlLkdldElkZW50aWZpZXIodGhpcy5jbGFzc05hbWUsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSksIHRoaXMuX2Jhc2VTZXJ2aWNlbG9nZ2luZ0VuYWJsZWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaG91bGROYXZpZ2F0ZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkJhc2VTZXJ2aWNlID0gQmFzZVNlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSB2b2lkIDA7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vLi4vTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2VcIik7XHJcbmNsYXNzIFRvdWNoRGV0ZWN0aW9uSGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gVG91Y2hEZXRlY3Rpb25IZWxwZXIubmFtZTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKCk7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBFbmFibGVMb2dnaW5nKGVuYWJsZSkge1xyXG4gICAgICAgIGlmIChlbmFibGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIFRvdWNoRGV0ZWN0aW9uSGVscGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2dpbmdFbmFibGVkID0gZW5hYmxlO1xyXG4gICAgfVxyXG4gICAgaXNDdXJyZW50VG91Y2hPbmVGaW5nZXIoY3VycmVudCkge1xyXG4gICAgICAgIHZhciByZXR2YWwgPSAoY3VycmVudC50b3VjaGVzID09IDAgJiYgY3VycmVudC50YXJnZXRUb3VjaGVzID09IDAgJiYgY3VycmVudC5jaGFuZ2VkVG91Y2hlcyA9PSAwKTtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZyhgaXNDdXJyZW50VG91Y2hPbmVGaW5nZXI6ICR7cmV0dmFsfWAsIHRoaXMubG9nZ2luZ1NlcnZpY2UuR2V0SWRlbnRpZmllcih0aGlzLmNsYXNzTmFtZSwgdGhpcy5pc0N1cnJlbnRUb3VjaE9uZUZpbmdlci5uYW1lKSwgdGhpcy5sb2dnaW5nRW5hYmxlZCk7XHJcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcclxuICAgIH1cclxuICAgIHdhc1ByZXZpb3VzVG91Y2hPbmVGaW5nZXIocHJldmlvdXMpIHtcclxuICAgICAgICB2YXIgcmV0dmFsID0gKHByZXZpb3VzLnRvdWNoZXMgPT0gMSAmJiBwcmV2aW91cy50YXJnZXRUb3VjaGVzID09IDEgJiYgcHJldmlvdXMuY2hhbmdlZFRvdWNoZXMgPT0gMSk7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2coYHdhc1ByZXZpb3VzVG91Y2hPbmVGaW5nZXI6ICR7cmV0dmFsfWAsIHRoaXMubG9nZ2luZ1NlcnZpY2UuR2V0SWRlbnRpZmllcih0aGlzLmNsYXNzTmFtZSwgdGhpcy5pc0N1cnJlbnRUb3VjaE9uZUZpbmdlci5uYW1lKSwgdGhpcy5sb2dnaW5nRW5hYmxlZCk7XHJcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcclxuICAgIH1cclxuICAgIGlzSG9yaXNvbnRhbFN3aXBlKGN1cnJlbnQsIGZpcnN0KSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBcIlRvdWNoRGV0ZWN0aW9uSGVscGVyLmlzSG9yaXNvbnRhbFN3aXBlXCI7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2coXCJFbnRlcmluZyBpc0hvcmlzb250YWxJc2hcIiwgdGhpcy5sb2dnaW5nU2VydmljZS5HZXRJZGVudGlmaWVyKHRoaXMuY2xhc3NOYW1lLCB0aGlzLmlzSG9yaXNvbnRhbFN3aXBlLm5hbWUpLCB0aGlzLmxvZ2dpbmdFbmFibGVkKTtcclxuICAgICAgICB2YXIgZGVncmVlID0gdGhpcy5HZXREZWdyZWUoY3VycmVudCwgZmlyc3QpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKGBEZWdyZWUgQTogJHtkZWdyZWV9YCwgbmFtZSwgdGhpcy5sb2dnaW5nRW5hYmxlZCk7XHJcbiAgICAgICAgaWYgKChkZWdyZWUgPj0gLTM2ICYmIGRlZ3JlZSA8PSAxNSkgfHwgKGRlZ3JlZSA+PSAtMTUwICYmIGRlZ3JlZSA8PSAxNjUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKFwiRGVncmVlIGlzIHdpdGhpbiB2YWxpZCByYW5nZVwiLCB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkdldElkZW50aWZpZXIodGhpcy5jbGFzc05hbWUsIHRoaXMuaXNIb3Jpc29udGFsU3dpcGUubmFtZSksIHRoaXMubG9nZ2luZ0VuYWJsZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVncmVlIGlzIG91dHNpZGUgb2YgdmFsaWQgcmFuZ2UuXCIsIHRoaXMubG9nZ2luZ1NlcnZpY2UuR2V0SWRlbnRpZmllcih0aGlzLmNsYXNzTmFtZSwgdGhpcy5pc0hvcmlzb250YWxTd2lwZS5uYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIEdldERlZ3JlZShjdXJyZW50LCBmaXJzdCkge1xyXG4gICAgICAgIHZhciB0bXBYID0gY3VycmVudC5jbGllbnRYIC0gZmlyc3QuY2xpZW50WDtcclxuICAgICAgICB2YXIgdG1wWSA9IGN1cnJlbnQuY2xpZW50WSAtIGZpcnN0LmNsaWVudFk7XHJcbiAgICAgICAgdmFyIHJhZCA9IE1hdGguYXRhbjIodG1wWSwgdG1wWCk7IC8vIEluIHJhZGlhbnNcclxuICAgICAgICB2YXIgZGVncmVlID0gTWF0aC5yb3VuZChyYWQgKiAoMTgwIC8gTWF0aC5QSSkpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKGBEZWdyZWV4eHg6ICR7ZGVncmVlfWAsIHRoaXMubG9nZ2luZ1NlcnZpY2UuR2V0SWRlbnRpZmllcih0aGlzLmNsYXNzTmFtZSwgdGhpcy5HZXREZWdyZWUubmFtZSksIHRoaXMubG9nZ2luZ0VuYWJsZWQpO1xyXG4gICAgICAgIHJldHVybiBkZWdyZWU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Ub3VjaERldGVjdGlvbkhlbHBlciA9IFRvdWNoRGV0ZWN0aW9uSGVscGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRocmVkc2hvbGRIZWxwZXIgPSB2b2lkIDA7XHJcbmNvbnN0IExvZ2dpbmdTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vTG9nZ2luZ01hbmFnZXIvTG9nZ2luZ1NlcnZpY2VcIik7XHJcbmNsYXNzIFRocmVkc2hvbGRIZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBUaHJlZHNob2xkSGVscGVyLm5hbWU7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBuZXcgTG9nZ2luZ1NlcnZpY2VfMS5Mb2dnaW5nU2VydmljZSgpO1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgRW5hYmxlTG9nZ2luZyhlbmFibGUpIHtcclxuICAgICAgICBpZiAoZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBUaHJlZHNob2xkSGVscGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2dpbmdFbmFibGVkID0gZW5hYmxlO1xyXG4gICAgfVxyXG4gICAgVGhyZWRzaG9sZEV4Y2VlZGVkKGN1cnJlbnQsIHRocmVkc2hvbGQsIGZpcnN0KSB7XHJcbiAgICAgICAgdmFyIGRlbHRhcyA9IHRoaXMuR2V0RGVsdGFzKGN1cnJlbnQsIGZpcnN0KTtcclxuICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA+IHRocmVkc2hvbGQgJiYgZGVsdGFzLmRlbHRhWCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKGBUaHJlZHNob2xkOiB0cnVlIGRlbHRhWDogJHtkZWx0YXMuZGVsdGFYfSB0aHJlZHNob2xkOiAke3RocmVkc2hvbGR9YCwgdGhpcy5sb2dnaW5nU2VydmljZS5HZXRJZGVudGlmaWVyKHRoaXMuY2xhc3NOYW1lLCB0aGlzLlRocmVkc2hvbGRFeGNlZWRlZC5uYW1lKSwgdGhpcy5sb2dnaW5nRW5hYmxlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLkxvZyhgVGhyZWRzaG9sZDogZmFsc2UgZGVsdGFYOiAke2RlbHRhcy5kZWx0YVh9YCwgdGhpcy5sb2dnaW5nU2VydmljZS5HZXRJZGVudGlmaWVyKHRoaXMuY2xhc3NOYW1lLCB0aGlzLlRocmVkc2hvbGRFeGNlZWRlZC5uYW1lKSwgdGhpcy5sb2dnaW5nRW5hYmxlZCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgR2V0RGVsdGFzKGN1cnJlbnQsIGZpcnN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVsdGFYOiBjdXJyZW50LmNsaWVudFggLSBmaXJzdC5jbGllbnRYLFxyXG4gICAgICAgICAgICBkZWx0YVk6IGN1cnJlbnQuY2xpZW50WSAtIGZpcnN0LmNsaWVudFlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVGhyZWRzaG9sZEhlbHBlciA9IFRocmVkc2hvbGRIZWxwZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gPT1Vc2VyU2NyaXB0PT1cclxuLy8gQG5hbWUgICAgICAgICBUb3VjaCBVSSBiYWNrIGFuZCBmb3J3YXJkIGJ1dHRvbnMgZm9yIEZpcmVGb3hcclxuLy8gQG5hbWVzcGFjZSAgICB1c2Vyc2NyaXB0QGZhYmlhbi5ka1xyXG4vLyBAdmVyc2lvbiAgICAgIDAuM1xyXG4vLyBAZGVzY3JpcHRpb24gIEZpeGluZyBGaXJlRm94IFRvdWNoIG5hdmlnYXRpb25cclxuLy8gQGF1dGhvciAgICAgICBUb255IEZhYmlhblxyXG4vLyBAaW5jbHVkZSAgICAgICo6Ly8qLypcclxuLy8gQGdyYW50ICAgICAgICBub25lXHJcbi8vIEBsaWNlbnNlIE1JVFxyXG4vLyBAbm9mcmFtZXNcclxuLy8gPT0vVXNlclNjcmlwdD09XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQmFzZVNlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyL0Jhc2VTZXJ2aWNlXCIpO1xyXG5jb25zdCBUb3VjaFBvaW50XzEgPSByZXF1aXJlKFwiLi9tb2RlbHMvVG91Y2hQb2ludFwiKTtcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qIHVzZXIgc2V0dGluZ3MgKi9cclxuICAgIGNvbnN0IHRocmVkc2hvbGQgPSA3NTtcclxuICAgIHZhciBlbmFibGVMb2dnaW5nVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSB0cnVlO1xyXG4gICAgdmFyIGVuYWJsZUxvZ2dpbmdUaHJlZHNob2xkSGVscGVyID0gZmFsc2U7XHJcbiAgICAvLyBub3RlOiB5b3UgY2FuIGVuYWJsZS9kaXNhYmxlIGxvZ2dpbmcgZm9yIGJhc2VzZXJ2aWNlIG9uIHRoZSBiYXNlc2VydmljZSBjbGFzcyAgXHJcbiAgICBCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuVG91Y2hEZXRlY3Rpb25IZWxwZXIuRW5hYmxlTG9nZ2luZyhlbmFibGVMb2dnaW5nVG91Y2hEZXRlY3Rpb25IZWxwZXIpO1xyXG4gICAgQmFzZVNlcnZpY2VfMS5CYXNlU2VydmljZS5nZXRJbnN0YW5jZSgpLlRocmVkc2hvbGRIZWxwZXIuRW5hYmxlTG9nZ2luZyhlbmFibGVMb2dnaW5nVGhyZWRzaG9sZEhlbHBlcik7XHJcbiAgICAvKiB1c2VyIHNldHRpbmdzIGVuZCAqL1xyXG4gICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZFwiKTtcclxuICAgIC8vIHZhciBuYXZpZ2F0b3IgPSBuZXcgTmF2aWdhdGlvblNlcnZpY2UoKTtcclxuICAgIHZhciBwcmV2aW91cztcclxuICAgIHZhciBtdWx0aVRvdWNoRGV0ZWN0ZWQgPSBmYWxzZTtcclxuICAgIHZhciBmaXJzdDtcclxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyTXVsdGlUb3VjaChjdXJyZW50KSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQudG91Y2hlcyA+IDEpIHtcclxuICAgICAgICAgICAgbXVsdGlUb3VjaERldGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzcmMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XHJcbiAgICAgICAgc3JjLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUpO1xyXG4gICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgICAgICBpZiAoZmlyc3QgPT0gbnVsbCB8fCAoZmlyc3QuY2xpZW50WCA9PSAtMSAmJiBmaXJzdC5jbGllbnRZID09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgIHNyYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUpO1xyXG4gICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUsIHRydWUpO1xyXG4gICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICAgICAgaWYgKEJhc2VTZXJ2aWNlXzEuQmFzZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5TaG91bGROYXZpZ2F0ZShjdXJyZW50LCBmaXJzdCwgcHJldmlvdXMsIHRocmVkc2hvbGQsIG11bHRpVG91Y2hEZXRlY3RlZCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWx0YXMgPSBCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuVGhyZWRzaG9sZEhlbHBlci5HZXREZWx0YXMoY3VycmVudCwgZmlyc3QpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhcy5kZWx0YVggPD0gLTc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSBtdXN0IG5hdmlnYXRlIGJhY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA+PSA3NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgbXVzdCBuYXZpZ2F0ZSBmb3J3YXJkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhpc3RvcnkuZm9yd2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGluaXQgc3RhcnRcclxuICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgVG91Y2hQb2ludF8xLlRvdWNoUG9pbnQoLTEpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudC50b3VjaGVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIG11bHRpVG91Y2hEZXRlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9KTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9