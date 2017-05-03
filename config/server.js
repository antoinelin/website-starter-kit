const express = require('express')
const helmet = require('helmet')
const http = require('http')
const fs = require('fs')
const chalk = require('chalk')
const flash = require('express-flash')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const gzip = require('compression')
const emoji = require('node-emoji')
const clearConsole = require('react-dev-utils/clearConsole')

const config = require('./config')

const isInteractive = process.stdout.isTTY
const cacheTime = 86400000 * 7 // 7 days

const createAnalytics = require('./middlewares/scripts')

const app = express()
app.server = http.createServer(app)

app.set('port', (config.server.port || 3000))
app.use(helmet())
app.use(helmet.hidePoweredBy())
if (app.get('env') === 'production') {
  app.use(gzip())
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.set('trust proxy', 'loopback')

app.use(express.static(config.path.buildDir, { maxAge: cacheTime }))
app.use((req, res, next) => {
  if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
    res.setHeader('Cache-Control', `public, max-age=${cacheTime}`)
  }
  next()
})

const analytics = createAnalytics(config.server.analytics)

app.get('*', (req, res) => {
  const html = fs.readFileSync(config.file.buildHtml, 'utf8')
  res.send(html)
})
// Displayed logs
// -------------------o
if (isInteractive) {
  clearConsole()
}
/* eslint-disable */
console.log()
console.log(chalk.green('Starting the Express server... '))
console.log()
console.log(`ENV: ${chalk.cyan(app.get('env'))}`)
if (app.get('env') === 'development') {
  console.log()
  console.log(`MIDDLEWARES: ${chalk.cyan(app.get('middlewares'))}`)  
}
console.log()
console.log(`PORT: ${chalk.cyan(app.get('port'))}`)
console.log()
console.log(`ANALYTICS_ID: ${chalk.cyan(app.get('analytics'))}`)
console.log()
console.log(chalk.green('Server successfully started! ') + emoji.get('raised_hands'))
console.log()
/* eslint-enable */

app.use(flash())

app.server.listen(app.get('port'))
