import Metalsmith from 'metalsmith'
import watch from 'metalsmith-watch'
import markdown from 'metalsmith-markdownit'
import assets from 'metalsmith-assets'

import paths from '../config/paths'

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

const devOnly = (plugin, config) => {
  return __DEV__ ? plugin(config) : (files, metalsmith, done) => {
    done()
  }
}

export default new Metalsmith(paths.projectRoot)
  .clean(__PROD__)
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(devOnly(watch, {
    livereload: true,
    invalidateCache: true
  }))
  .use(markdown({
    html: true
  }))
  .use(assets({
    source: './dist/assets',
    destination: './assets'
  }))
  // Inject webpack bundles into your html.
  // Relies on <!-- assets-head --> & <!-- assets-body --> placeholders.
  .use((files, metalsmith, done) => {
    const assets = JSON.parse(files['assets/webpack-assets.json'].contents.toString())

    const assetsHead = []
    if (assets.hasOwnProperty('loader')) {
      assetsHead.push(`<script src="${assets.loader.js}"></script>`)
      delete assets.loader
    }

    if (assets.hasOwnProperty('styles')) {
      if (assets.styles.hasOwnProperty('css')) {
        assetsHead.push(`<link rel="stylesheet" href="${assets.styles.css}"/>`)
      } else {
        assetsHead.push(`<script src="${assets.styles.js}"></script>`)
      }

      delete assets.styles
    }

    assetsHead.push(`<script src="${assets.head.js}"></script>`)
    delete assets.head

    const assetsBody = Object.keys(assets).map((asset) => {
      return `<script src="${assets[asset].js}"></script>`
    })

    if (__DEV__) {
      assetsBody.push('<script src="http://localhost:35729/livereload.js"></script>')
    }

    const html = files['index.html'].contents.toString()
      .replace('<!-- assets-head -->', assetsHead.join('\n'))
      .replace('<!-- assets-body -->', assetsBody.join('\n'))

    files['index.html'].contents = new Buffer(html)

    done()
  })
