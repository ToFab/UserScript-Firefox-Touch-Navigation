# UserScript Firefox Touch Navigation
Tampermonkey script that enable back and forward navigation using touch in firefox. Inspired by Microsoft Edge.
This script enable you to using a single finger to move back and forward in the browser history by swiping anywhere on the body of the page.

How it works
=============
When you touch the screen the x,y coordinates are being registred. When you lift your finger again. If you have moved the finger more than 75px to the right or left navigation will be triggered.

installation
=============
Can be installed from https://greasyfork.org/en/scripts/440013-touch-ui-back-and-forward-buttons-for-firefox
or by:

- open UserScript-FireFox-Touch-Navigation.js
- Add script from UserScript-FireFox-Touch-Navigation.js to tampermonkey.
Save
Reload the browser
Start swimping left or right
Enjoy :)

Compile from source
===================
Install node.js
npm install -g typescript

Navigate to directory where UserScript-FireFox-Touch-Navigation.ts is placed
run: tsc .\UserScript-FireFox-Touch-Navigation.ts

Pull requests are welcome. 
