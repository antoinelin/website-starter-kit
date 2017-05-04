import $ from 'zepto-modules'
import Emitter from 'component-emitter/index'
import gsap from 'gsap/src/minified/TweenMax.min'//eslint-disable-line
import AssetsLoader from 'assets-loader/src/index'

import Progress from './Progress'

export default class Loader extends Emitter {
  constructor($dom) {
    super()
    this.$dom = $dom
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
      this.$progress.done()
      self.emit('assetsLoaded')
    })
    .start()
  }
  hide(callback) {
    // eslint-disable-next-line
    TweenMax.to(this.$dom, 1, {
      opacity: 0,
      onComplete: () => {
        $('body').addClass('loaded')
        if (callback) {
          this.destroy()
          callback()
        }
      },
    })
  }
  destroy() {
    this.$dom.remove()
  }
}
