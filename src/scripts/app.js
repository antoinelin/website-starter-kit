import $ from 'zepto-modules'
import Loader from './components/Loader'
import Page from './components/Page'

require('./../sass/app.scss')

class App {
  constructor() {
    // assetsLoad state
    this.assetsLoaded = false
    this.isFirstView = false
    this.init()
  }
  init() {
    this.loader = new Loader($('body .c-loader'))
    this.page = new Page($('body .l-container'))
    this.initEvents()
  }
  initEvents() {
    // assetsLoaded
    this.loader.on('assetsLoaded', () => {
      this.assetsLoaded = true
      this.hideLoader()
    })
    this.page.on('firstViewLoaded', () => {
      this.isFirstView = true
      this.hideLoader()
    })
  }
  hideLoader() {
    if (this.assetsLoaded && this.isFirstView) {
      this.loader.hide(() => {
        this.page.show()
      })
    }
  }
  update = () => {}
}

$(document).ready(() => {
  const app = new App();
  (function tick() {
    app.update()
    window.requestAnimationFrame(tick)
  }())
})
