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

import { BaseService } from "./services/NavigationManager/BaseService";
import { TouchPoint } from "./models/TouchPoint";

(function () { 

  
  /* user settings */
  const thredshold: number = 75;    

  /* user settings end */

  console.log("Hello world");

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

    var src = document.getElementsByTagName("body")[0];

    src.addEventListener('touchstart', function (e) {
      console.log("-----------------");
      // init start
      var current = new TouchPoint(e);
      registerMultiTouch(current);
      previous = current;
      // init complete

      if (first == null || (first.clientX == -1 && first.clientY == -1)) {
        first = current;
      }
    }, false);

    src.addEventListener('touchmove', function (e) {
      // init start
      var current = new TouchPoint(e);
      registerMultiTouch(current);
      previous = current;
      // init complete

    }, false);

    src.addEventListener('touchend', function (e) {
      // init start
      var current = new TouchPoint(e, true);
      registerMultiTouch(current);
      // init complete

      if (BaseService.getInstance().ShouldNavigate(current, first, previous, thredshold, multiTouchDetected)) {

        var deltas = BaseService.getInstance().ThredsholdHelper.GetDeltas(current, first);
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
      previous = new TouchPoint(-1);
      if (current.touches == 0) {
        multiTouchDetected = false;
      }
      // init complete

    }, false);






  });
})();




