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

(function () {


  console.log("Hello world a2");

  const Thredshold: number = 75;
  var previous: TouchPoint;
  var multiTouchDetected = false;
  var firstX: number = -1;
  var firstY: number = -1;
  var degree: number = -1;
  var deltaX: number = -1;
  var deltaY: number = -1;

  function GetDegree(current: TouchPoint) {

    var tmpX = current.clientX - firstX;
    var tmpY = current.clientY - firstY;
    var rad = Math.atan2(tmpY, tmpX); // In radians
    var degree = rad * (180 / Math.PI);
    return degree;
  }

  function isHorisontalIsh() {

    if ((degree >= -36 && degree <= 15) || (degree >= -150 && degree <= 165)) {
      console.log("Degree is valid");
      return true;
    } else {
      console.log("Degree is invalid");
    }

    return false;
  }

  function isCurrentTouchOneFinger(current: TouchPoint) {
    var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
    console.log(`isCurrentTouchOneFinger: ${retval}`);
    return retval;
  }

  function wasPreviousTouchOneFinger() {
    var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
    console.log(`wasPreviousTouchOneFinger: ${retval}`);
    return retval;
  }

  function ThredsholdExceeded() {
    if ((deltaX <= Thredshold) || (deltaX >= Thredshold) && deltaX > -1) {
      console.log(`Thredshold: true deltaX: ${deltaX}`);
      return true;
    }
    console.log(`Thredshold: false deltaX: ${deltaX}`);
    return false;
  }

  function MustNavigate(current: TouchPoint): boolean {

    degree = GetDegree(current);
    console.log(`degree: ${degree}`);

    console.log(`multiTouchDetected: ${multiTouchDetected}`);
    if (multiTouchDetected) {
      return false;
    }

    if (history.length == 0) {
      console.log("History is empty");
      return false;
    }

    var retval = (!multiTouchDetected && isHorisontalIsh() && isCurrentTouchOneFinger(current) && wasPreviousTouchOneFinger() && ThredsholdExceeded());
    console.log(`MustNavigate: ${retval}`);
    return retval;
  }

  window.addEventListener("load", function () {

    var src = document.getElementsByTagName("body")[0];

    src.addEventListener('touchstart', function (e) {
      console.log("-----------------");
      var current = new TouchPoint(e);
      previous = current;
      deltaX = current.clientX;
      deltaY = current.clientY;

      if (current.touches > 1) {
        multiTouchDetected = true;
      }

      if (firstX == -1 && firstY == -1) {
        firstX = current.clientX; firstY = current.clientY;
      }

    }, false);

    src.addEventListener('touchmove', function (e) {
      var current = new TouchPoint(e);

      deltaX = current.clientX;
      deltaY = current.clientY;

      if (current.touches > 1) {
        multiTouchDetected = true;
      }

      previous = current;

    }, false);

    src.addEventListener('touchend', function (e) {

      var current = new TouchPoint(e, true);
      deltaX = current.clientX;
      deltaY = current.clientY;

      if (current.touches > 1) {
        multiTouchDetected = true;
      };

      if (MustNavigate(current)) {

        if (deltaX <= -75) {

          console.log("We must navigate back");
          // history.back();
        }

        if (deltaX >= 75) {

          console.log("We must navigate forward");
          // history.forward();
        }
      }

      previous = new TouchPoint(-1);
      if (current.touches == 0) {
        multiTouchDetected = false;
      }

    }, false);
  });
})();

class TouchPoint {

  public clientX: number = -1;
  public clientY: number = -1;
  public touches: number = -1;
  public targetTouches: number = -1;
  public changedTouches: number = -1;

  constructor(e: any, useChangedTouches: boolean = false) {

    if (useChangedTouches) {
      this.clientX = e.changedTouches[0].clientX;
      this.clientY = e.changedTouches[0].clientY;
    } else {
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


