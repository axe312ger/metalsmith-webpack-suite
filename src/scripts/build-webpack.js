import webpackConfig from '../config/webpack'

import webpack from 'webpack'

webpack(webpackConfig, function (err, stats) {
  if (err) {
    throw err
  }

  const jsonStats = stats.toJson()
  if (jsonStats.errors.length > 0) {
    console.log(stats.toString({colors: true}))
    throw new Error('Webpack build failed!')
  }

  if (jsonStats.warnings.length > 0) {
    console.error(jsonStats.warnings)
  }

  console.log(stats.toString({colors: true}))
  console.log('Webpacked build finished!')
})
