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
    Log(message, caller, enabled) {
        if (enabled) {
            console.log(`${this._className}.${caller} : ${message}`);
        }
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
        this._traceHorisontalSwipe = true;
        this._traceCurrentTouch = false;
        this._traceThredshold = false;
        this._traceBaseService = false;
        this.className = BaseService.name;
        if (this._traceCurrentTouch == true || this._traceHorisontalSwipe == true || this._traceThredshold == true) {
            console.log("Logging enabled for BaseService");
            this._traceBaseService = true;
            if (this._traceCurrentTouch == true) {
                console.log("Logging enabled for CurrentTouch");
            }
            if (this._traceHorisontalSwipe == true) {
                console.log("Logging enabled for HorisontalSwipe");
            }
            if (this._traceThredshold == true) {
                console.log("Logging enabled for Thredshold");
            }
        }
        else {
            console.log("wtf");
        }
        this.LoggingService = new LoggingService_1.LoggingService(BaseService.name);
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
            this.LoggingService.Log("MultiTouch detected. Abort", this.ShouldNavigate.name, this._traceBaseService);
            return false;
        }
        var shouldNavigate = (!multiTouchDetected
            && BaseService.instance.TouchDetectionHelper.isHorisontalSwipe(current, first, this._traceHorisontalSwipe)
            && BaseService.instance.TouchDetectionHelper.isCurrentTouchOneFinger(current, this._traceCurrentTouch)
            && BaseService.instance.TouchDetectionHelper.wasPreviousTouchOneFinger(previous, this._traceCurrentTouch)
            && BaseService.instance.ThredsholdHelper.ThredsholdExceeded(current, thredshold, first, this._traceThredshold));
        if (shouldNavigate) {
            if (history.length == 0) {
                this.LoggingService.Log("History is empty", this.ShouldNavigate.name, this._traceBaseService);
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
        this.loggingService = new LoggingService_1.LoggingService(TouchDetectionHelper.name);
    }
    isCurrentTouchOneFinger(current, log) {
        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        this.loggingService.Log(`isCurrentTouchOneFinger: ${retval}`, this.isCurrentTouchOneFinger.name, log);
        return retval;
    }
    wasPreviousTouchOneFinger(previous, log) {
        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        this.loggingService.Log(`wasPreviousTouchOneFinger: ${retval}`, this.isCurrentTouchOneFinger.name, log);
        return retval;
    }
    isHorisontalSwipe(current, first, log) {
        this.loggingService.Log("Entering isHorisontalIsh", this.isHorisontalSwipe.name, log);
        var degree = this.GetDegree(current, first, log);
        this.loggingService.Log(`Degree A: ${degree}`, this.isHorisontalSwipe.name, log);
        if ((degree >= -36 && degree <= 15) || (degree >= -150 && degree <= 165)) {
            this.loggingService.Log("Degree is within valid range", this.isHorisontalSwipe.name, log);
            return true;
        }
        else {
            console.log("Degree is outside of valid range.", this.isHorisontalSwipe.name, this.isHorisontalSwipe.name, true);
        }
        return false;
    }
    GetDegree(current, first, log) {
        var tmpX = current.clientX - first.clientX;
        var tmpY = current.clientY - first.clientY;
        var rad = Math.atan2(tmpY, tmpX); // In radians
        var degree = Math.round(rad * (180 / Math.PI));
        this.loggingService.Log(`Degreexxx: ${degree}`, this.GetDegree.name, log);
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
        this.loggingService = new LoggingService_1.LoggingService(ThredsholdHelper.name);
    }
    ;
    ThredsholdExceeded(current, thredshold, first, log) {
        var deltas = this.GetDeltas(current, first);
        if (deltas.deltaX > thredshold && deltas.deltaX > -1) {
            this.loggingService.Log(`Thredshold: true deltaX: ${deltas.deltaX} thredshold: ${thredshold}`, this.ThredsholdExceeded.name, log);
            return true;
        }
        this.loggingService.Log(`Thredshold: false deltaX: ${deltas.deltaX}`, this.ThredsholdExceeded.name, log);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL1RvdWNoUG9pbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL0xvZ2dpbmdNYW5hZ2VyL0xvZ2dpbmdTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlci9CYXNlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvaGVscGVycy9Ub3VjaERldGVjdGlvbkhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIvaGVscGVycy9VdGlsaXRpZXMvVGhyZWRzaG9sZEhlbHBlci50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Ub3VjaFBvaW50ID0gdm9pZCAwO1xyXG5jbGFzcyBUb3VjaFBvaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGUsIHVzZUNoYW5nZWRUb3VjaGVzID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmNsaWVudFggPSAtMTtcclxuICAgICAgICB0aGlzLmNsaWVudFkgPSAtMTtcclxuICAgICAgICB0aGlzLnRvdWNoZXMgPSAtMTtcclxuICAgICAgICB0aGlzLnRhcmdldFRvdWNoZXMgPSAtMTtcclxuICAgICAgICB0aGlzLmNoYW5nZWRUb3VjaGVzID0gLTE7XHJcbiAgICAgICAgaWYgKHVzZUNoYW5nZWRUb3VjaGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGUudG91Y2hlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50WSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnRvdWNoZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoZXMgPSBlLnRvdWNoZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRUb3VjaGVzID0gZS50YXJnZXRUb3VjaGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkVG91Y2hlcyA9IGUudGFyZ2V0VG91Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVG91Y2hQb2ludCA9IFRvdWNoUG9pbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTG9nZ2luZ1NlcnZpY2UgPSB2b2lkIDA7XHJcbmNsYXNzIExvZ2dpbmdTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuX2NsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgIH1cclxuICAgIExvZyhtZXNzYWdlLCBjYWxsZXIsIGVuYWJsZWQpIHtcclxuICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLl9jbGFzc05hbWV9LiR7Y2FsbGVyfSA6ICR7bWVzc2FnZX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Mb2dnaW5nU2VydmljZSA9IExvZ2dpbmdTZXJ2aWNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkJhc2VTZXJ2aWNlID0gZXhwb3J0cy50aHJlZHNob2xkID0gdm9pZCAwO1xyXG5jb25zdCBUb3VjaERldGVjdGlvbkhlbHBlcl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9Ub3VjaERldGVjdGlvbkhlbHBlclwiKTtcclxuY29uc3QgVGhyZWRzaG9sZEhlbHBlcl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9VdGlsaXRpZXMvVGhyZWRzaG9sZEhlbHBlclwiKTtcclxuY29uc3QgTG9nZ2luZ1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZVwiKTtcclxuZXhwb3J0cy50aHJlZHNob2xkID0gNzU7XHJcbmNsYXNzIEJhc2VTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3RyYWNlSG9yaXNvbnRhbFN3aXBlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl90cmFjZUN1cnJlbnRUb3VjaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlVGhyZWRzaG9sZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IEJhc2VTZXJ2aWNlLm5hbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlQ3VycmVudFRvdWNoID09IHRydWUgfHwgdGhpcy5fdHJhY2VIb3Jpc29udGFsU3dpcGUgPT0gdHJ1ZSB8fCB0aGlzLl90cmFjZVRocmVkc2hvbGQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dpbmcgZW5hYmxlZCBmb3IgQmFzZVNlcnZpY2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQmFzZVNlcnZpY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdHJhY2VDdXJyZW50VG91Y2ggPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIEN1cnJlbnRUb3VjaFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdHJhY2VIb3Jpc29udGFsU3dpcGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIGVuYWJsZWQgZm9yIEhvcmlzb250YWxTd2lwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdHJhY2VUaHJlZHNob2xkID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBlbmFibGVkIGZvciBUaHJlZHNob2xkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInd0ZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKEJhc2VTZXJ2aWNlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuVG91Y2hEZXRlY3Rpb25IZWxwZXIgPSBuZXcgVG91Y2hEZXRlY3Rpb25IZWxwZXJfMS5Ub3VjaERldGVjdGlvbkhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuVGhyZWRzaG9sZEhlbHBlciA9IG5ldyBUaHJlZHNob2xkSGVscGVyXzEuVGhyZWRzaG9sZEhlbHBlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghQmFzZVNlcnZpY2UuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgQmFzZVNlcnZpY2UuaW5zdGFuY2UgPSBuZXcgQmFzZVNlcnZpY2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEJhc2VTZXJ2aWNlLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgU2hvdWxkTmF2aWdhdGUoY3VycmVudCwgZmlyc3QsIHByZXZpb3VzLCB0aHJlZHNob2xkLCBtdWx0aVRvdWNoRGV0ZWN0ZWQpIHtcclxuICAgICAgICBpZiAobXVsdGlUb3VjaERldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9nZ2luZ1NlcnZpY2UuTG9nKFwiTXVsdGlUb3VjaCBkZXRlY3RlZC4gQWJvcnRcIiwgdGhpcy5TaG91bGROYXZpZ2F0ZS5uYW1lLCB0aGlzLl90cmFjZUJhc2VTZXJ2aWNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2hvdWxkTmF2aWdhdGUgPSAoIW11bHRpVG91Y2hEZXRlY3RlZFxyXG4gICAgICAgICAgICAmJiBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci5pc0hvcmlzb250YWxTd2lwZShjdXJyZW50LCBmaXJzdCwgdGhpcy5fdHJhY2VIb3Jpc29udGFsU3dpcGUpXHJcbiAgICAgICAgICAgICYmIEJhc2VTZXJ2aWNlLmluc3RhbmNlLlRvdWNoRGV0ZWN0aW9uSGVscGVyLmlzQ3VycmVudFRvdWNoT25lRmluZ2VyKGN1cnJlbnQsIHRoaXMuX3RyYWNlQ3VycmVudFRvdWNoKVxyXG4gICAgICAgICAgICAmJiBCYXNlU2VydmljZS5pbnN0YW5jZS5Ub3VjaERldGVjdGlvbkhlbHBlci53YXNQcmV2aW91c1RvdWNoT25lRmluZ2VyKHByZXZpb3VzLCB0aGlzLl90cmFjZUN1cnJlbnRUb3VjaClcclxuICAgICAgICAgICAgJiYgQmFzZVNlcnZpY2UuaW5zdGFuY2UuVGhyZWRzaG9sZEhlbHBlci5UaHJlZHNob2xkRXhjZWVkZWQoY3VycmVudCwgdGhyZWRzaG9sZCwgZmlyc3QsIHRoaXMuX3RyYWNlVGhyZWRzaG9sZCkpO1xyXG4gICAgICAgIGlmIChzaG91bGROYXZpZ2F0ZSkge1xyXG4gICAgICAgICAgICBpZiAoaGlzdG9yeS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnaW5nU2VydmljZS5Mb2coXCJIaXN0b3J5IGlzIGVtcHR5XCIsIHRoaXMuU2hvdWxkTmF2aWdhdGUubmFtZSwgdGhpcy5fdHJhY2VCYXNlU2VydmljZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNob3VsZE5hdmlnYXRlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQmFzZVNlcnZpY2UgPSBCYXNlU2VydmljZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Ub3VjaERldGVjdGlvbkhlbHBlciA9IHZvaWQgMDtcclxuY29uc3QgTG9nZ2luZ1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi8uLi9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZVwiKTtcclxuY2xhc3MgVG91Y2hEZXRlY3Rpb25IZWxwZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IG5ldyBMb2dnaW5nU2VydmljZV8xLkxvZ2dpbmdTZXJ2aWNlKFRvdWNoRGV0ZWN0aW9uSGVscGVyLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgaXNDdXJyZW50VG91Y2hPbmVGaW5nZXIoY3VycmVudCwgbG9nKSB7XHJcbiAgICAgICAgdmFyIHJldHZhbCA9IChjdXJyZW50LnRvdWNoZXMgPT0gMCAmJiBjdXJyZW50LnRhcmdldFRvdWNoZXMgPT0gMCAmJiBjdXJyZW50LmNoYW5nZWRUb3VjaGVzID09IDApO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKGBpc0N1cnJlbnRUb3VjaE9uZUZpbmdlcjogJHtyZXR2YWx9YCwgdGhpcy5pc0N1cnJlbnRUb3VjaE9uZUZpbmdlci5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHJldHVybiByZXR2YWw7XHJcbiAgICB9XHJcbiAgICB3YXNQcmV2aW91c1RvdWNoT25lRmluZ2VyKHByZXZpb3VzLCBsb2cpIHtcclxuICAgICAgICB2YXIgcmV0dmFsID0gKHByZXZpb3VzLnRvdWNoZXMgPT0gMSAmJiBwcmV2aW91cy50YXJnZXRUb3VjaGVzID09IDEgJiYgcHJldmlvdXMuY2hhbmdlZFRvdWNoZXMgPT0gMSk7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2coYHdhc1ByZXZpb3VzVG91Y2hPbmVGaW5nZXI6ICR7cmV0dmFsfWAsIHRoaXMuaXNDdXJyZW50VG91Y2hPbmVGaW5nZXIubmFtZSwgbG9nKTtcclxuICAgICAgICByZXR1cm4gcmV0dmFsO1xyXG4gICAgfVxyXG4gICAgaXNIb3Jpc29udGFsU3dpcGUoY3VycmVudCwgZmlyc3QsIGxvZykge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKFwiRW50ZXJpbmcgaXNIb3Jpc29udGFsSXNoXCIsIHRoaXMuaXNIb3Jpc29udGFsU3dpcGUubmFtZSwgbG9nKTtcclxuICAgICAgICB2YXIgZGVncmVlID0gdGhpcy5HZXREZWdyZWUoY3VycmVudCwgZmlyc3QsIGxvZyk7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5Mb2coYERlZ3JlZSBBOiAke2RlZ3JlZX1gLCB0aGlzLmlzSG9yaXNvbnRhbFN3aXBlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgaWYgKChkZWdyZWUgPj0gLTM2ICYmIGRlZ3JlZSA8PSAxNSkgfHwgKGRlZ3JlZSA+PSAtMTUwICYmIGRlZ3JlZSA8PSAxNjUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKFwiRGVncmVlIGlzIHdpdGhpbiB2YWxpZCByYW5nZVwiLCB0aGlzLmlzSG9yaXNvbnRhbFN3aXBlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWdyZWUgaXMgb3V0c2lkZSBvZiB2YWxpZCByYW5nZS5cIiwgdGhpcy5pc0hvcmlzb250YWxTd2lwZS5uYW1lLCB0aGlzLmlzSG9yaXNvbnRhbFN3aXBlLm5hbWUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBHZXREZWdyZWUoY3VycmVudCwgZmlyc3QsIGxvZykge1xyXG4gICAgICAgIHZhciB0bXBYID0gY3VycmVudC5jbGllbnRYIC0gZmlyc3QuY2xpZW50WDtcclxuICAgICAgICB2YXIgdG1wWSA9IGN1cnJlbnQuY2xpZW50WSAtIGZpcnN0LmNsaWVudFk7XHJcbiAgICAgICAgdmFyIHJhZCA9IE1hdGguYXRhbjIodG1wWSwgdG1wWCk7IC8vIEluIHJhZGlhbnNcclxuICAgICAgICB2YXIgZGVncmVlID0gTWF0aC5yb3VuZChyYWQgKiAoMTgwIC8gTWF0aC5QSSkpO1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKGBEZWdyZWV4eHg6ICR7ZGVncmVlfWAsIHRoaXMuR2V0RGVncmVlLm5hbWUsIGxvZyk7XHJcbiAgICAgICAgcmV0dXJuIGRlZ3JlZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRvdWNoRGV0ZWN0aW9uSGVscGVyID0gVG91Y2hEZXRlY3Rpb25IZWxwZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVGhyZWRzaG9sZEhlbHBlciA9IHZvaWQgMDtcclxuY29uc3QgTG9nZ2luZ1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9Mb2dnaW5nTWFuYWdlci9Mb2dnaW5nU2VydmljZVwiKTtcclxuY2xhc3MgVGhyZWRzaG9sZEhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbmV3IExvZ2dpbmdTZXJ2aWNlXzEuTG9nZ2luZ1NlcnZpY2UoVGhyZWRzaG9sZEhlbHBlci5uYW1lKTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIFRocmVkc2hvbGRFeGNlZWRlZChjdXJyZW50LCB0aHJlZHNob2xkLCBmaXJzdCwgbG9nKSB7XHJcbiAgICAgICAgdmFyIGRlbHRhcyA9IHRoaXMuR2V0RGVsdGFzKGN1cnJlbnQsIGZpcnN0KTtcclxuICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA+IHRocmVkc2hvbGQgJiYgZGVsdGFzLmRlbHRhWCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKGBUaHJlZHNob2xkOiB0cnVlIGRlbHRhWDogJHtkZWx0YXMuZGVsdGFYfSB0aHJlZHNob2xkOiAke3RocmVkc2hvbGR9YCwgdGhpcy5UaHJlZHNob2xkRXhjZWVkZWQubmFtZSwgbG9nKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuTG9nKGBUaHJlZHNob2xkOiBmYWxzZSBkZWx0YVg6ICR7ZGVsdGFzLmRlbHRhWH1gLCB0aGlzLlRocmVkc2hvbGRFeGNlZWRlZC5uYW1lLCBsb2cpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIEdldERlbHRhcyhjdXJyZW50LCBmaXJzdCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhWDogY3VycmVudC5jbGllbnRYIC0gZmlyc3QuY2xpZW50WCxcclxuICAgICAgICAgICAgZGVsdGFZOiBjdXJyZW50LmNsaWVudFkgLSBmaXJzdC5jbGllbnRZXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRocmVkc2hvbGRIZWxwZXIgPSBUaHJlZHNob2xkSGVscGVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vID09VXNlclNjcmlwdD09XHJcbi8vIEBuYW1lICAgICAgICAgVG91Y2ggVUkgYmFjayBhbmQgZm9yd2FyZCBidXR0b25zIGZvciBGaXJlRm94XHJcbi8vIEBuYW1lc3BhY2UgICAgdXNlcnNjcmlwdEBmYWJpYW4uZGtcclxuLy8gQHZlcnNpb24gICAgICAwLjNcclxuLy8gQGRlc2NyaXB0aW9uICBGaXhpbmcgRmlyZUZveCBUb3VjaCBuYXZpZ2F0aW9uXHJcbi8vIEBhdXRob3IgICAgICAgVG9ueSBGYWJpYW5cclxuLy8gQGluY2x1ZGUgICAgICAqOi8vKi8qXHJcbi8vIEBncmFudCAgICAgICAgbm9uZVxyXG4vLyBAbGljZW5zZSBNSVRcclxuLy8gQG5vZnJhbWVzXHJcbi8vID09L1VzZXJTY3JpcHQ9PVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEJhc2VTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlci9CYXNlU2VydmljZVwiKTtcclxuY29uc3QgVG91Y2hQb2ludF8xID0gcmVxdWlyZShcIi4vbW9kZWxzL1RvdWNoUG9pbnRcIik7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAvKiB1c2VyIHNldHRpbmdzICovXHJcbiAgICBjb25zdCB0aHJlZHNob2xkID0gNzU7XHJcbiAgICAvKiB1c2VyIHNldHRpbmdzIGVuZCAqL1xyXG4gICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZFwiKTtcclxuICAgIC8vIHZhciBuYXZpZ2F0b3IgPSBuZXcgTmF2aWdhdGlvblNlcnZpY2UoKTtcclxuICAgIHZhciBwcmV2aW91cztcclxuICAgIHZhciBtdWx0aVRvdWNoRGV0ZWN0ZWQgPSBmYWxzZTtcclxuICAgIHZhciBmaXJzdDtcclxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyTXVsdGlUb3VjaChjdXJyZW50KSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQudG91Y2hlcyA+IDEpIHtcclxuICAgICAgICAgICAgbXVsdGlUb3VjaERldGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzcmMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XHJcbiAgICAgICAgc3JjLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUpO1xyXG4gICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgICAgICBpZiAoZmlyc3QgPT0gbnVsbCB8fCAoZmlyc3QuY2xpZW50WCA9PSAtMSAmJiBmaXJzdC5jbGllbnRZID09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgIHNyYy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUpO1xyXG4gICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgLy8gaW5pdCBjb21wbGV0ZVxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLyBpbml0IHN0YXJ0XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IFRvdWNoUG9pbnRfMS5Ub3VjaFBvaW50KGUsIHRydWUpO1xyXG4gICAgICAgICAgICByZWdpc3Rlck11bHRpVG91Y2goY3VycmVudCk7XHJcbiAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICAgICAgaWYgKEJhc2VTZXJ2aWNlXzEuQmFzZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5TaG91bGROYXZpZ2F0ZShjdXJyZW50LCBmaXJzdCwgcHJldmlvdXMsIHRocmVkc2hvbGQsIG11bHRpVG91Y2hEZXRlY3RlZCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWx0YXMgPSBCYXNlU2VydmljZV8xLkJhc2VTZXJ2aWNlLmdldEluc3RhbmNlKCkuVGhyZWRzaG9sZEhlbHBlci5HZXREZWx0YXMoY3VycmVudCwgZmlyc3QpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhcy5kZWx0YVggPD0gLTc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSBtdXN0IG5hdmlnYXRlIGJhY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFzLmRlbHRhWCA+PSA3NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgbXVzdCBuYXZpZ2F0ZSBmb3J3YXJkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhpc3RvcnkuZm9yd2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGluaXQgc3RhcnRcclxuICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgVG91Y2hQb2ludF8xLlRvdWNoUG9pbnQoLTEpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudC50b3VjaGVzID09IDApIHtcclxuICAgICAgICAgICAgICAgIG11bHRpVG91Y2hEZXRlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGluaXQgY29tcGxldGVcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9KTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9