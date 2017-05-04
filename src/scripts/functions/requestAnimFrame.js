// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
export const requestAnimFrame = (() => {
  return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      //eslint-disable-next-line
      function(/* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60)
      }
})()
