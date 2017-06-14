# metalsmith-webpack-suite

> A boilerplate implementation to effectively merge webpack and metalsmith in
> development and production environments.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://axe312.mit-license.org)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://img.shields.io/circleci/project/axe312ger/metalsmith-webpack-suite.svg?maxAge=2592000)](https://circleci.com/gh/axe312ger/metalsmith-webpack-suite)
[![bitHound Code](https://www.bithound.io/github/axe312ger/metalsmith-webpack-suite/badges/code.svg)](https://www.bithound.io/github/axe312ger/metalsmith-webpack-suite)
[![semantic-release](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## :cloud: Installation

Cloning the repo or downloading a release might be the best idea. This is a boilerplate, not a library.

You may build on top of this project or extract parts you need for your own projects.

Afterwards, simply install all dependencies by running:

```js
yarn || npm install
```

## :rocket: Technology

This boilerplate tries to combine the best out of [metalsmith](http://www.metalsmith.io/) and [webpack](webpack.js.org).

### Content generation via metalsmith

* Simple, pretty much not special metalsmith implementation
* [metalsmith-assets](https://github.com/treygriffith/metalsmith-assets) to copy webpack files
* [metalsmith-markdownit](https://github.com/segmentio/metalsmith-markdown) to render markdown
* [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts) to apply layouts


### Scripts and stylesheets via webpack

* Full power of webpack including tree shaking and minimize
* Uses webpack-dev-server (actually [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)) under the hood for dev
* Styles get included via require within `page.js` and extracted to a css file via [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)

## :bookmark_tabs: Project File Structure
|Pattern|Description|
|-|-|
|`./content/*` | website content files, mainly markdown files|
|`./layouts/*.html` | [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts) layout files|
|`./src/config/paths.js` | path configuration
|`./src/assets/css,js` | page javascript and stylesheet files|
|`./src/scripts/*.js`  | build process & dev environment scripts|
|`./dist/assets/**/*` | webpack output directory|
|`./dist/site/**/*` | metalsmith output directory|

## :hammer_and_wrench: Development and tooling

You can start a fully featured development server via `yarn dev` (or `npm run dev`).

It will spawn a html server at `http://localhost:3000` including browser-sync for live reload.

### :recycle: Live reload details

Browser sync spawns a basic webserver with the webpack-dev-middleware injected.

The live reload gets very effective by combining 3 different reload techniques:

* [browser-sync](https://browsersync.io/): Rebuilds metalsmith when content or layouts change.
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware): Triggers browser-sync when webpack files like scripts or styles change
* [nodemon](https://github.com/remy/nodemon): Restarts dev server when build scripts or config changes

### :bulb: Tipps & tricks

1. The dev server supports the `rs` shortcut while running. Simply type and hit enter to restart the server manually
2. The `metalsmith-helpers.js` in the scripts folder exports two metalsmith debugging plugins: A `StatisticsPlugin` for a general overview and a `DebugPlugin` for in-deepth insights
3. The metalsmith-layouts config contains a little helper for handlebars to output variable content. Usage: `<pre>{{debug YOUR_VARIABLE}}</pre>` (Hint: use `this` as variable to debug display the whole file metadata)
4. Check `npm run` for an overview of all available scripts.

## :gear: Build process

You can run a fresh page build via `yarn build` (Or `npm run build`)

1. `npm-scripts`: Set `DEBUG` environment variable to `metalsmith*` to enable metalsmith debugging
2. `npm-scripts`: Clean up `./dist/*` directories
3. `webpack`: Build javascript and stylesheet files via webpack
4. `metalsmith`: Copy webpack assets to site directory
5. `metalsmith`: Fingerprint webpack assets
6. `metalsmith`: Compile markdown files
7. `metalsmith`: Apply layouts
8. `metalsmith`: Show statistics

Et voilà. You can find your generated website in `./dist/site/`. See below how you can preview and deploy the result.

## :ship: Deployment & production server

With `yarn deploy` (or `npm run deploy`) you can deploy your latest website directly to GitHub pages via [gh-pages](https://www.npmjs.com/package/gh-pages)

Running `yarn server` (or `npm run server`) will spawn a simple production server which is great for testing the final version.

## :sparkling_heart: Contributing

This project follows the [standard](https://github.com/feross/standard) coding and the [conventional changelog](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md) commit message style. Also it is configured to never decrease the code coverage of its tests.


Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/axe312ger/metalsmith-webpack-suite/issues/new).
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.
