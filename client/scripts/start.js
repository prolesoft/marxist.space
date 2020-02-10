/* eslint-disable no-console */

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

process.on('unhandledRejection', (err) => {
  throw err
})

require('../config/env')

const fs = require('fs')
const chalk = require('react-dev-utils/chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')
const createDevServerConfig = require('../config/webpack-dev-server.config')

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  )
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  )
  console.log()
}

// We require that you explictly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper')
checkBrowsers(paths.appPath, isInteractive)
  .then(() => choosePort(HOST, DEFAULT_PORT))
  .then((port) => {
    if (port == null) {
      return
    }
    const config = configFactory('development')
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const appName = require(paths.appPackageJson).name
    const urls = prepareUrls(protocol, HOST, port)
    const compiler = createCompiler(webpack, config, appName, urls, useYarn)
    const proxySetting = require(paths.appPackageJson).proxy
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic)
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    )
    const devServer = new WebpackDevServer(compiler, serverConfig)
    devServer.listen(port, HOST, (err) => {
      if (err) {
        console.log(err)
        return
      }
      if (isInteractive) {
        clearConsole()
      }
      console.log(chalk.cyan('Starting the development server...\n'))
      openBrowser(urls.localUrlForBrowser)
    })
    ;['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close()
        process.exit()
      })
    })
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
