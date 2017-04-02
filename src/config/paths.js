const { resolve, join } = require('path')

const projectRoot = resolve(__dirname, '..', '..')

module.exports = {
  projectRoot,
  distribution: join(projectRoot, 'dist'),
  // Metalsmith
  metalsmithSource: 'content',
  metalsmithDestination: join('dist', 'site'),
  // Webpack
  webpackSource: join(projectRoot, 'src', 'assets'),
  webpackDestination: join(projectRoot, 'dist', 'assets'),
  webpackPublicPath: '/assets/',
  // Server
  serverRoot: join(projectRoot, 'dist', 'site'),
  pageBasePath: process.env.NODE_ENV !== 'production' ? '' : '/metalsmith-webpack-suite'
}
