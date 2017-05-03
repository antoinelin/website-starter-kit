import $ from 'zepto-modules'
import Emitter from 'component-emitter/index'
import gsap from 'gsap/src/minified/TweenMax.min'//eslint-disable-line
import AssetsLoader from 'assets-loader/src/index'//eslint-disable-line

export default class Loader extends Emitter {
  constructor($dom) {
    super()
    this.$dom = $dom
    this.loadAssets()
  }
  // METHODS
  loadAssets() {
    let self = this //eslint-disable-line
    this.assetsLoader = new AssetsLoader({
      assets: [
        `${process.env.PUBLIC_URL}/image.jpg`,
      ],
    })
    .on('progress', (progress) => {
      console.log(`%cload assets : ${(progress * 100).toFixed()}%`, 'color: #3faede; font-size: 13px') //eslint-disable-line
    })
    .on('complete', () => {
      self.emit('assetsLoaded')
    })
    .start()
  }
  hide(callback) {
    // eslint-disable-next-line
    TweenMax.to(this.$dom, .3, {
      alpha: 0,
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
