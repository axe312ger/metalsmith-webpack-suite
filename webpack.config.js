const { join } = require('path')
const Webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const paths = require('./src/config/paths')

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    immediate: join(paths.webpackSource, 'js', 'immediate.js'),
    page: join(paths.webpackSource, 'js', 'page.js')
  },
  devtool: __DEV__ ? '#cheap-module-eval-source-map' : false,
  output: {
    path: paths.webpackDestination,
    publicPath: paths.webpackPublicPath,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'page.css',
      allChunks: true
    })
  ]
}

if (__DEV__) {
  config.plugins.push(new Webpack.LoaderOptionsPlugin({
    debug: true
  }))
  // Force webpack-dev-middleware to write files to the disk for metalsmith
  config.plugins.push(new WriteFilePlugin({
    log: false
  }))
}

if (__PROD__) {
  config.plugins.push(new Webpack.LoaderOptionsPlugin({
    minimize: true
  }))
  config.plugins.push(new Webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  config.plugins.push(new Webpack.optimize.AggressiveMergingPlugin())
  config.plugins.push(new Webpack.optimize.UglifyJsPlugin())
}

module.exports = config
