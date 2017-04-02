// Builds Metalsmith based on the metalsmith.js.
// Script used by the build commands for deploying the page.

import Debug from 'debug'
import metalsmith from './metalsmith'

const debug = Debug('metalsmith-webpack-suite')

metalsmith.build(function (err) {
  if (err) {
    debug(err)
    throw err
  }
  debug('Metalsmith build finished!')
})
