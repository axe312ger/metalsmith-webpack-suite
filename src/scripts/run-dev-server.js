import http from 'http'
import { watch } from 'fs'

import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../config/webpack'

import metalsmith from './metalsmith'

import paths from '../config/paths'

const app = express()

const webpackCompiler = webpack(webpackConfig)
const webpackMiddlewareInstance = webpackMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: false,
  stats: {
    colors: true,
    chunks: false
  }
})

function buildMetalsmith () {
  metalsmith.build((err) => {
    if (err) {
      throw err
    }

    http.get('http://localhost:35729/changed?files=*.html')
    console.log('Metalsmith build finished! Live reload was called.')
  })
}

app.use(webpackMiddlewareInstance)
app.use(express.static(paths.serverRoot))

// Since there is no reliable way to find out when the dev middleware is finished,
// we watch the resulting webpack-assets.json for changes.
watch(paths.webpackDestination, (eventType, filename) => {
  if (filename === 'webpack-assets.json') {
    buildMetalsmith()
  }
})

app.listen(3000, function () {
  console.log('Development server startet at http://localhost:3000')
})
