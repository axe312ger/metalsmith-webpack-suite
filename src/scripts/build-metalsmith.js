import Metalsmith from 'metalsmith'
import markdown from 'metalsmith-markdown'
import assets from 'metalsmith-assets'

import paths from '../config/paths'

module.exports = new Metalsmith(paths.projectRoot)
  // .clean(false) reenable for cache plugin
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(markdown())
  .use(assets({
    source: './dist/assets',
    destination: './assets'
  }))
  .use((files, metalsmith, done) => {
    const assets = JSON.parse(files['assets/webpack-assets.json'].contents.toString())
    let html = files['index.html'].contents.toString()
    const assetsHead = `<script src="${assets.header.js}"/>`
    const assetsBody = `<script src="${assets.page.js}"/><link type="stylesheet" src="${assets.styles.css}"/>`
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
