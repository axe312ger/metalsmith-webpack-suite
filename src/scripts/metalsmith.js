// This is the actual metalsmith configuration script.
// The relevant part is the webpack asset injection into the metalsmith pages.
import Metalsmith from 'metalsmith'
import markdown from 'metalsmith-markdownit'
import layouts from 'metalsmith-layouts'
import assets from 'metalsmith-assets'

import paths from '../config/paths'

const __PROD__ = process.env.NODE_ENV === 'production'

let injectHeadAssets = () => 'noop-injectHeadAssets'
let injectBodyAssets = () => 'noop-injectBodyAssets'

export default new Metalsmith(paths.projectRoot)
  .clean(__PROD__)
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(assets({
    source: './dist/assets',
    destination: './assets'
  }))
  .use((files, metalsmith, done) => {
    // Parse assets.json to locate hashed entry files including hased
    const assets = JSON.parse(files['assets/webpack-assets.json'].contents.toString())

    const assetsHead = []
    if (assets.hasOwnProperty('loader')) {
      assetsHead.push(`<script src="${paths.pageBasePath}${assets.loader.js}"></script>`)
      delete assets.loader
    }

    // Extract inline and extracted css
    if (assets.hasOwnProperty('styles')) {
      if (assets.styles.hasOwnProperty('css')) {
        assetsHead.push(`<link rel="stylesheet" href="${paths.pageBasePath}${assets.styles.css}"/>`)
      } else {
        assetsHead.push(`<script src="${paths.pageBasePath}${assets.styles.js}"></script>`)
      }

      delete assets.styles
    }

    // Extract wepack entry for head
    assetsHead.push(`<script src="${paths.pageBasePath}${assets.head.js}"></script>`)
    delete assets.head

    // Gather all other entries for body
    const assetsBody = Object.keys(assets).map((asset) => {
      return `<script src="${paths.pageBasePath}${assets[asset].js}"></script>`
    })

    injectHeadAssets = () => {
      return assetsHead.join('\n')
    }
    injectBodyAssets = () => {
      return assetsBody.join('\n')
    }

    done()
  })
  .use(markdown({
    html: true
  }))
  .use(layouts({
    engine: 'handlebars',
    default: 'default.html',
    // to avoid conflics, we match only html files
    pattern: '**/*.html',
    helpers: {
      // neat little handlebars debugger
      debug: (obj) => JSON.stringify(obj, null, 2),
      // helper to inject head assets of current build run
      injectHeadAssets: () => {
        return injectHeadAssets(arguments)
      },
      // helper to inject body assets of current build run
      injectBodyAssets: () => {
        return injectBodyAssets(arguments)
      }
    }
  }))
