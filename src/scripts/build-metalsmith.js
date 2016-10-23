import Metalsmith from 'metalsmith'
import markdown from 'metalsmith-markdown'

import paths from '../config/paths'

module.exports = new Metalsmith(paths.projectRoot)
  // .clean(false) reenable for cache plugin
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(markdown())
  .use((files, metalsmith, done) => {
    console.dir(Object.keys(files))
    console.log('add smart bundle replace plugin here')
    done()
  })
  .build(function (err) {
    if (err) {
      throw err
    }
    console.log('Metalsmith build finished!')
  })
