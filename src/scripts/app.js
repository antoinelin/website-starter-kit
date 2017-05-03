import $ from 'zepto-modules'
import Loader from './components/Loader' //eslint-disable-line

require('./../sass/app.scss')

class App {
  constructor() {
    // assetsLoad state
    this.assetsLoaded = false
    this.init()
  }
  init() {
    this.loader = new Loader($('body .c-loader'))
    this.initEvents()
  }
  initEvents() {
    // assetsLoaded
    this.loader.on('assetsLoaded', () => {
      this.assetsLoaded = true
      this.hideLoader()
    })
  }
  hideLoader() {
    if (this.assetsLoaded) {
      this.loader.hide()
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
