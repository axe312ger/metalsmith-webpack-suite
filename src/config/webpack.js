import { join } from 'path'

// import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import paths from './paths'

const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    header: join(paths.webpackSource, 'js', 'header.js'),
    body: join(paths.webpackSource, 'js', 'body.js'),
    styles: join(paths.webpackSource, 'css', 'page.css')
  },
  devtool: __DEV__ ? '#eval-source-map' : false,
  output: {
    path: paths.webpackDestination,
    publicPath: paths.webpackPublicPath,
    filename: '[name]-[hash].js',
    libraryTarget: 'var',
    library: 'page'
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
        loader: ExtractTextPlugin.extract([
          'css-loader'
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('page.css', {
      allChunks: true
    })
  ]
}
