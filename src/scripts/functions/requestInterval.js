// Copyright 2011, Joe Lambert.
// https://gist.github.com/joelambert/1002116

import { requestAnimFrame } from './requestAnimFrame'
/**
 * Behaves the same as setInterval except uses requestAnimationFrame()
 * where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */

export const requestInterval = (fn, delay) => {
  if (!window.requestAnimationFrame &&
    !window.webkitRequestAnimationFrame &&
    !(window.mozRequestAnimationFrame &&
      window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
    !window.oRequestAnimationFrame &&
    !window.msRequestAnimationFrame) {
    return window.setInterval(fn, delay)
  }
  let start = new Date().getTime()
  const handle = new Object() //eslint-disable-line
  function loop() {
    const current = new Date().getTime()
    const delta = current - start
    if (delta >= delay) {
      fn.call()
      start = new Date().getTime()
    }
    handle.value = requestAnimFrame(loop)
  }
  handle.value = requestAnimFrame(loop)
  return handle
}

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame()
 * where possible for better performance
 * @param {int|object} fn The callback function
 */
export const clearRequestInterval = (handle) => {
  /* eslint-disable */
  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
  window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
  window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
  window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
  window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
  window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearInterval(handle)
  /* eslint-enable */
}
