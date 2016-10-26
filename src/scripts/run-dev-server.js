import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../config/webpack'

webpackConfig.entry.app = [
  'webpack-dev-server/client?http://localhost:8080/',
  'webpack/hot/dev-server'
]
webpackConfig.plugins.unshift(new Webpack.HotModuleReplacementPlugin())

webpackConfig.output.filename = '[name]-nodeapi.js'

const compiler = Webpack(webpackConfig)

const server = new WebpackDevServer(compiler, {
  publicPath: 'http://localhost:8080/assets/', // webpackConfig.output.publicPath,
  webpackDestination: webpackConfig.output.publicPath,
  hot: true,
  stats: {
    colors: true
  },
  proxy: {
    // [/^(?!\/assets\/).*/]: 'http://localhost:3000',
    '**': 'http://localhost:3000'
  }
})

server.listen(8080, '127.0.0.1', function () {
  console.log('Starting server on http://localhost:8080')
})
