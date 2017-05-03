const path = require('path')

module.exports = {
  path: {
    srcDir: path.resolve(__dirname, '../src'),
    buildDir: path.resolve(__dirname, '../build'),
    publicDir: path.resolve(__dirname, '../public'),
    modulesDir: path.resolve(__dirname, '../node_modules'),
    configDir: path.resolve(__dirname, '../config'),
  },
  file: {
    indexHtml: path.resolve(__dirname, '../src/index.twig'),
    buildHtml: path.resolve(__dirname, '../build/index.html'),
    indexJs: path.resolve(__dirname, '../src/scripts/app.js'),
    indexCss: path.resolve(__dirname, '../src/sass/app.scss'),
    yarnLock: path.resolve(__dirname, '../yarn.lock'),
    packageJson: path.resolve(__dirname, '../package.json'),
  },
  server: {
    analytics: 'UA-97812447-1',
    port: 3000,
  },
}
