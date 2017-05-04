// Base on zprogress by Thomas Fuchs
// MIT-licensed - https://github.com/madrobby/zprogress

import $ from 'zepto-modules'
import Emitter from 'component-emitter/index'
// import gsap from 'gsap/src/minified/TweenMax.min'

import { requestTimeout, clearRequestTimeout } from './../functions/requestTimeout'

export default class Progress extends Emitter {
  constructor() {
    super()
    let $wrapper
    let $bar
    let $value
    let $timeout
    let $margin
    let $leftMargin
    let $rightMargin

    this.$wrapper = $wrapper
    this.$bar = $bar
    this.$value = $value
    this.$timeout = $timeout
    this.$margin = $margin
    this.$leftMargin = $leftMargin
    this.$rightMargin = $rightMargin
  }
  init() {
    const html = '<div class=progress><div class=progress_bar></div></div>'
    $('body').append(html)
    this.$wrapper = $('.progress')
    this.$bar = $('.progress_bar')
    this.$margin = 15
    this.$leftMargin = this.$margin / 100
    this.$rightMargin = 1 - this.$leftMargin
  }
  clear() {
    if (this.$timeout) {
      clearRequestTimeout(this.$timeout)
      this.$timeout = undefined
    }
  }
  anim() {
    // eslint-disable-next-line
    TweenMax.to(this.$bar, .2, {
      x: `${this.$value * 100}%`,
    })
  }
  trickle() {
    this.$timeout = requestTimeout(() => {
      this.inc((this.$rightMargin - this.$value) * .035 * Math.random())
      this.trickle()
    }, 350 + (400 * Math.random()))
  }
  start() {
    this.init()
    this.clear()
    this.$value = this.$leftMargin
    /* eslint-disable */
    let timelime = new TimelineMax();
    timelime.add(
      TweenMax.to(this.$wrapper, .2, {
        opacity: 1,
      }),
      'start'
    )
    timelime.add(
      TweenMax.to(this.$bar, .2, {
        x: '0%',
      }),
      'start+=0'
    )
    /* eslint-enable */
    requestTimeout(() => {
      this.anim()
      this.trickle()
    }, 0)
  }
  inc(delta) {
    if (this.$value < this.$rightMargin) {
      this.$value += delta || .05
      this.anim()
    }
  }
  set(newValue) {
    this.init()
    this.clear()
    this.$value = newValue
    this.anim()
    this.trickle()
  }
  color(color) {
    this.$bar.css({ backgroundColor: color })
  }
  done() {
    this.init()
    this.clear()
    this.$value = 1
    this.anim()
    requestTimeout(() => {
      // eslint-disable-next-line
      TweenMax.to(this.$wrapper, .2, {
        opacity: 0,
        onComplete: () => {
          this.destroy()
        },
      })
    }, 100)
  }
  destroy() {
    this.$wrapper.remove()
  }
}
