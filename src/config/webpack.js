import { join } from 'path'

import Webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'

import paths from './paths'

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    head: join(paths.webpackSource, 'js', 'head.js'),
    page: join(paths.webpackSource, 'js', 'page.js'),
    styles: join(paths.webpackSource, 'css', 'page.css')
  },
  devtool: __DEV__ ? '#cheap-module-eval-source-map' : false,
  output: {
    path: paths.webpackDestination,
    publicPath: paths.webpackPublicPath,
    filename: '[name]-[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('page-[hash].css'),
    new AssetsPlugin({
      path: paths.webpackDestination,
      prettyPrint: __DEV__
    }),
    // Make sure everything is written to disk in dev, otherwise metalsmith would fail
    new WriteFilePlugin({
      test: /\.json$/,
      log: false
    })
  ]
}

if (__DEV__) {
  config.plugins.push(new Webpack.optimize.CommonsChunkPlugin({
    name: 'loader',
    chunks: ['head', 'page', 'styles']
  }))
}

if (__PROD__) {
  config.plugins.push(new Webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  config.plugins.push(new Webpack.optimize.AggressiveMergingPlugin())
  config.plugins.push(new Webpack.optimize.DedupePlugin())
  config.plugins.push(new Webpack.optimize.UglifyJsPlugin())
}

export default config
