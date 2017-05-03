/* eslint-disable */

process.env.NODE_ENV = 'production'

require('dotenv').config({ silent: true })

const chalk = require('chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const config = require('../config/webpack.config.prod')
const paths = require('../config/config')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild

if (!checkRequiredFiles([paths.file.indexHtml, paths.file.indexJs])) {
  process.exit(1)
}

function printErrors(summary, errors) {
  console.log(chalk.red(summary))
  console.log()
  errors.forEach(err => {
    console.log(err.message || err)
    console.log()
  })
}

function build(previousFileSizes) {
  console.log('Creating an optimized production build...')
  webpack(config).run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err])
      process.exit(1)
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors)
      process.exit(1)
    }

    if (process.env.CI && stats.compilation.warnings.length) {
      printErrors('Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.', stats.compilation.warnings)
      process.exit(1)
    }

    console.log(chalk.green('Build bundle compiled successfully.'))
    console.log()

    console.log('File sizes after gzip:')
    console.log()
    printFileSizesAfterBuild(stats, previousFileSizes)
    console.log()
  })
}

function copyPublicFolder() {
  fs.copySync(paths.path.publicDir, paths.path.buildDir, {
    dereference: true,
    filter: file => file !== paths.path.indexHtml,
  })
}

measureFileSizesBeforeBuild(paths.path.buildDir).then(previousFileSizes => {
  fs.emptyDirSync(paths.path.buildDir)
  build(previousFileSizes)
  copyPublicFolder()
})
