import $ from 'zepto-modules'
import Emitter from 'component-emitter/index'
import gsap from 'gsap/src/minified/TweenMax.min'//eslint-disable-line
import { requestTimeout, clearRequestTimeout } from './../functions/requestTimeout'

export default class Page extends Emitter {
  constructor($dom) {
    super()
    this.$dom = $dom
    this.$firstPanel = $dom.find($('.c-panel--1'))
    this.$secondPanel = $dom.find($('.c-panel--2'))
    this.$content = $dom.find($('.l-content'))
    this.$stagger = $dom.find($('.l-content__stagger'))
    this.init()
  }
  init() {
    const self = this
    const timeout = requestTimeout(() => {
      self.emit('firstViewLoaded')
      clearRequestTimeout(timeout)
    }, 500)
  }
  show() {
    /* eslint-disable */
    
    let timeline = new TimelineMax()
    
    // Translate first panel
    timeline.add(
      TweenMax.to(this.$firstPanel, .6, {
        y: '0%',
        ease: Power2.easeInOut,
      }),
      'start'
    )
    // Translate second panel
    timeline.add(
      TweenMax.to(this.$secondPanel, .6, {
        y: '0%',
        ease: Power2.easeInOut,
      }),
      'start+=0.1'
    )
    timeline.add(
      TweenMax.staggerTo(this.$stagger, .6, {
        opacity: 1,
        y: -5,
        ease: Power2.easeOut,
      }, 0.1),
      'start+=0.7'
    )
    /* eslint-enable */
  }
}
