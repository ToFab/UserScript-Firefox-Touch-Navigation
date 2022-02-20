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

import { BaseService } from "./services/NavigationManager/BaseService";
import { TouchPoint } from "./models/TouchPoint";
import { LoggingService } from "./services/LoggingManager/LoggingService";
import { Direction } from "./models/enums";

(function () {

  /* user settings */
  const minimumSwipeLength: number = 45;

  var _printSummary: boolean = false;
  var _traceSwipeGesture: boolean = false;
  var _traceTouchGesture: boolean = false;  
  var _traceCalcuations: boolean = false;
  /* user settings end */

  console.clear();
  var loggingService = new LoggingService("Main");
  BaseService.getInstance().InitializeLogging(_printSummary, _traceSwipeGesture, _traceTouchGesture, _traceCalcuations);
  BaseService.getInstance().InitializeSettings(minimumSwipeLength);

  // var navigator = new NavigationService();
  var previous: TouchPoint;
  var multiTouchDetected = false;
  var first: TouchPoint;

  function registerMultiTouch(current: TouchPoint) {
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

      src.addEventListener('touchstart', function (e: any) {
        // init start
        var current = new TouchPoint(e);
        registerMultiTouch(current);
        previous = current;
        // init complete

        if (first == null || (first.clientX == -1 && first.clientY == -1)) {
          first = current;
        }
      }, false);

      src.addEventListener('touchmove', function (e: any) {
        // init start
        var current = new TouchPoint(e);
        registerMultiTouch(current);
        previous = current;
        // init complete

      }, false);

      src.addEventListener('touchend', function (e: any) {
        // init start
        var current = new TouchPoint(e, true);
        registerMultiTouch(current);
        // init complete

        var tuple = BaseService.getInstance().ShouldWeNavigate(current, first, previous, minimumSwipeLength, multiTouchDetected);

        // We must navigate
        if (tuple[0] == true) {

          if (tuple[1] == Direction.Left) {

            console.log("We must navigate back");            
            // history.back();
          }

          if (tuple[1] == Direction.Right) {

            console.log("We must navigate forward");            
            // history.forward();
          }
        } 

        // init start
        previous = new TouchPoint(-1);

        if (current.touches == 0) { // no fingers detected
          multiTouchDetected = false;
          first = new TouchPoint(-1);
        }else{
          console.log("tuple is false");
        }
        // init complete

      }, false);
    }
  });
})();