// ==UserScript==
// @name         Touch UI back and forward buttons for FireFox
// @namespace    userscript@fabian.dk
// @version      0.1
// @description  Fixing FireFox Touch navigation
// @author       Tony Fabian
// @include      *://*/*
// @grant        none
// @noframes
// @license MIT
// ==/UserScript==

(function() {
  
    window.addEventListener('load', function(){
            
      var bodyTag = document.getElementsByTagName("body");
      if (bodyTag != null){
        var body = bodyTag[0];
        
        if (body != null){                   

          var clientX: number, clientY: number;
    
          body.addEventListener('touchstart', function(e) {
            // Cache the client X/Y coordinates
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
          
          }, false);
          
          body.addEventListener('touchend', function(e) {
            var deltaX: number, deltaY: number;
          
            // Compute the change in X and Y coordinates.
            // The first touch point in the changedTouches
            // list is the touch point that was just removed from the surface.
            deltaX = e.changedTouches[0].clientX - clientX;
            deltaY = e.changedTouches[0].clientY - clientY;
          
            if (deltaX <= -75){
              console.log("navigate back");
              history.back();
            }
          
            if (deltaX >= 75){
              console.log("navigate forward");
              history.forward();
            }
      
          }, false);

        }
      }
      
    });
})();
