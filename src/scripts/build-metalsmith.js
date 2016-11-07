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

    const assetsHead = []
    if (assets.hasOwnProperty('loader')) {
      assetsHead.push(`<script src="${assets.loader.js}"></script>`)
      delete assets.loader
    }

    assetsHead.push(`<script src="${assets.head.js}"></script>`)
    delete assets.head

    const assetsBody = Object.keys(assets).map((asset) => {
      return `<script src="${assets[asset].js}"></script>`
    })

    const html = files['index.html'].contents.toString()
      .replace('<!-- assets-head -->', assetsHead.join('\n'))
      .replace('<!-- assets-body -->', assetsBody.join('\n'))

    files['index.html'].contents = new Buffer(html)

    done()
  })
  .build(function (err) {
    if (err) {
      throw err
    }
    console.log('Metalsmith build finished!')
  })
