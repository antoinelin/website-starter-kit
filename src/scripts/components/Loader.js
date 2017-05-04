import $ from 'zepto-modules'
import Emitter from 'component-emitter/index'
import gsap from 'gsap/src/minified/TweenMax.min'//eslint-disable-line
import AssetsLoader from 'assets-loader/src/index'

import { requestTimeout, clearRequestTimeout } from './../functions/requestTimeout'
import Progress from './Progress'

export default class Loader extends Emitter {
  constructor($dom) {
    super()
    this.$dom = $dom
    this.$lightning = this.$dom.find('.c-loader__content__logo')
    this.$firstPanel = this.$dom.find('.c-loader__panel--1')
    this.$secondPanel = this.$dom.find('.c-loader__panel--2')
    this.$progress = new Progress()
    this.loadAssets()
  }
  // METHODS
  loadAssets() {
    const self = this
    this.$progress.start()
    this.assetsLoader = new AssetsLoader({
      assets: [
        `${process.env.PUBLIC_URL}/image.jpg`,
      ],
    })
    .on('progress', (progress) => {
      console.log(`%cload assets : ${(progress * 100).toFixed()}%`, 'font-size: 14px; color:rgb(6, 106, 255)') // eslint-disable-line
    })
    .on('complete', () => {
      const timeout = requestTimeout(() => {
        this.$progress.done()
        self.emit('assetsLoaded')
        clearRequestTimeout(timeout)
      }, 3000)
    })
    .start()
  }
  hide(callback) {
    /* eslint-disable */
    
    let timeline = new TimelineMax()
    
    // Hide logo
    timeline.add(
      TweenMax.to(this.$lightning, .5, {
        opacity: 0,
        ease: Power2.easeInOut,
      }),
      'start'
    )
    // Translate first panel
    timeline.add(
      TweenMax.to(this.$firstPanel, .6, {
        y: '-100%',
        ease: Power2.easeInOut,
      }),
      'start+=0.5'
    )
    // Translate second panel
    timeline.add(
      TweenMax.to(this.$secondPanel, .6, {
        y: '-100%',
        ease: Power2.easeInOut,
        onComplete: () => {
          $('body').addClass('loaded')
          if (callback) {
            this.destroy()
            callback()
          }
        },
      }),
      'start+=0.6'
    )
    /* eslint-enable */
  }
  destroy() {
    this.$dom.remove()
  }
}
