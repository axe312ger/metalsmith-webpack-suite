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
    filename: '[name]-[hash].js',
    libraryTarget: 'umd',
    library: 'Page'
  },
  // devServer: {
  //   contentBase: paths.distribution,
  //   publicPath: paths.assetsPublicPath,
  //   path: join(paths.distribution, 'assets'),
  //   lazy: false,
  //   hot: false,
  //   inline: false,
  //   quiet: false,
  //   noInfo: false,
  //   stats: {
  //     colors: true,
  //     chunks: false
  //   }
  // },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract([
        //   'css-loader'
        // ])
        loader: 'css-loader'
      }
    ]
  },
  plugins: [
    new AssetsPlugin({
      path: paths.webpackDestination,
      prettyPrint: __DEV__,
      includeManifest: 'loader.js'
    }),
    // Only add this for dev
    new Webpack.optimize.CommonsChunkPlugin('loader.js', {
      names: ['head', 'page', 'styles']
    })
    // new ExtractTextPlugin('page.css', {
    //   allChunks: true
    // })
  ]
}
