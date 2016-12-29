# metalsmith-webpack-suite

> A boilerplate implementation to effectively merge webpack and metalsmith in
> development and production environments.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://axe312.mit-license.org)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://img.shields.io/circleci/project/axe312ger/metalsmith-webpack-suite.svg?maxAge=2592000)](https://circleci.com/gh/axe312ger/metalsmith-webpack-suite)
[![bitHound Code](https://www.bithound.io/github/axe312ger/metalsmith-webpack-suite/badges/code.svg)](https://www.bithound.io/github/axe312ger/metalsmith-webpack-suite)
[![semantic-release](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

The project uses webpack features like chunking to allow metalsmith
to inject the scripts and styles in the DOM where they actually belong. These
chunks reflect the scripts in the document head, the scripts at the end of the
document body and also a stylesheet file for the css. Thanks to hashed filenames,
we can effectively use browser caching and cache busting.

This is still work in progress. See the checkboxes below to get an overview
about the project status.

## Install

```js
yarn || npm install
```

## Usage

Check `npm run` for an overview of all available scripts.

### `npm run build`

- [x] Build webpack and store assets to disk
- [x] Build metalsmith, take webpack assets and combine to static site
- [ ] Discover a way to use metalsmith-cached when building via circleci

### `npm run dev`

Starts development server at http://localhost:3000

- [x] Run basic express server to expose the actual static site
- [x] Implement webpack via webpack-dev-middleware
- [x] Use metalsmith-watch to watch and publish metalsmith changes
- [x] Use fs.watch to load new webpack bundle names into metalsmith
- [ ] Enable hot module reloading with webpack-dev-middleware

### `npm run server`

- [x] Run basic express server to expose the last build static site

## Contributing

This project follows the [standard](https://github.com/feross/standard) coding and the [conventional changelog](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md) commit message style. Also it is configured to never decrease the code coverage of its tests.


Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/axe312ger/metalsmith-sharp/issues/new).
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.
