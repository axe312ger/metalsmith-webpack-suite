import Metalsmith from 'metalsmith'
import markdown from 'metalsmith-markdownit'
import assets from 'metalsmith-assets'

import paths from '../config/paths'

module.exports = new Metalsmith(paths.projectRoot)
  // .clean(false) reenable for cache plugin
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(markdown({
    html: true
  }))
  .use(assets({
    source: './dist/assets',
    destination: './assets'
  }))
  .use((files, metalsmith, done) => {
    const assets = JSON.parse(files['assets/webpack-assets.json'].contents.toString())
    let html = files['index.html'].contents.toString()
    const assetsHead = `<script src="${assets.head.js}"></script><link rel="stylesheet" type="text/css" href="${assets.styles.css}">`
    const assetsBody = `<script src="${assets.page.js}"></script>`

    html = html.replace('<!-- assets-head -->', assetsHead)
    html = html.replace('<!-- assets-body -->', assetsBody)

    files['index.html'].contents = new Buffer(html)

    done()
  })
  .build(function (err) {
    if (err) {
      throw err
    }
    console.log('Metalsmith build finished!')
  })
