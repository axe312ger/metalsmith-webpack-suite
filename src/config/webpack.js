import { join } from 'path'

import Webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import paths from './paths'

const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
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
        // loaders: [
        //   'style-loader',
        //   'css-loader'
        // ]
      }
    ]
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'loader',
      chunks: ['head', 'page', 'styles']
    }),
    new ExtractTextPlugin('page-[hash].css'),
    new AssetsPlugin({
      path: paths.webpackDestination,
      prettyPrint: __DEV__
    })
  ]
}
