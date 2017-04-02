// Spawns a dev server with Metalsmith & Webpack live reloading via Browsersync
// Inspired by https://github.com/Browsersync/recipes/tree/master/recipes/webpack.babel

import { resolve } from 'path'
import Debug from 'debug'
import Webpack from 'webpack'
import WebpackMiddleware from 'webpack-dev-middleware'
import BrowserSync from 'browser-sync'
import stripAnsi from 'strip-ansi'

import metalsmith from './metalsmith'
import webpackConfig from '../../webpack.config.js'
import paths from '../config/paths'

const debug = Debug('metalsmith-webpack-suite')

// Store last webpack hash to avoid unnecessary Metalsmith rebuilds
let lastWebpackBuildHash

// Initialize Browsersync and webpack
const browserSync = BrowserSync.create()
const webpack = Webpack(webpackConfig)
const webpackMiddleware = WebpackMiddleware(webpack, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: false,
  stats: false
})

// Run metalsmith and reload browsers
// or send a fullscreen error message to the browser instead
function buildMetalsmith (rebuild) {
  debug('Building Metalsmith')

  metalsmith.build((err) => {
    if (err) {
      debug('Metalsmith build error:')
      console.error(err)
      return browserSync.sockets.emit('fullscreen:message', {
        title: 'Metalsmith Error:',
        body: stripAnsi(`${err.message}\n\n${err.stack}`),
        timeout: 100000
      })
    }
    debug('Metalsmith build successfully finished! Reloading browsers.')
    browserSync.reload()
  })
}

// Reload all devices when webpack bundle is complete
// or send a fullscreen error message to the browser instead
webpack.plugin('done', function (stats) {
  console.log('--- Webpack Stats: ---')
  console.log(stats.toString({colors: true, chunks: false}))
  console.log('------')

  if (stats.hasErrors() || stats.hasWarnings()) {
    return browserSync.sockets.emit('fullscreen:message', {
      title: 'Webpack Error:',
      body: stripAnsi(stats.toString()),
      timeout: 100000
    })
  }

  // Rebuild Metalsmith only when webpack created new bundle files
  if (stats.hash === lastWebpackBuildHash) {
    debug('No webpack bundle file changed. Waiting for new changes.')
    return
  }
  lastWebpackBuildHash = stats.hash

  buildMetalsmith()
})

// Run Browsersync for server and watching
// Use webpack dev middleware for Hot Module Replacement
// Apply custom chokidar function to rebuild metalsmith when files changed
browserSync.init({
  server: paths.serverRoot,
  open: false,
  logFileChanges: true,
  middleware: [
    webpackMiddleware
  ],
  plugins: ['bs-fullscreen-message'],
  files: [
    {
      match: [
        resolve(paths.projectRoot, 'content', '**', '*'),
        resolve(paths.projectRoot, 'layouts', '**', '*.html'),
        resolve(paths.projectRoot, 'webpack.config.js'),
        resolve(paths.projectRoot, 'postcss.config.js')
      ],
      fn: function (event, file) {
        buildMetalsmith()
      }
    }
  ]
})
