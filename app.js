"use strict";

/* use strict */

var PAGE = function () {

  function run() {
    var blah = 'world';
    console.log("Hello " + blah);
  }

  return {
    run: run
  };
}();

document.addEventListener("DOMContentLoaded", function (event) {
  PAGE.run();
});
