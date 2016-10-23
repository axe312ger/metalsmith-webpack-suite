import { resolve, join } from 'path'

const projectRoot = resolve(__dirname, '..', '..')

const __DEV__ = process.env.NODE_ENV !== 'production'

export default {
  projectRoot,
  distribution: join(projectRoot, 'dist'),
  metalsmithSource: 'content',
  metalsmithDestination: join('dist', 'site'),
  webpackSource: join(projectRoot, 'src', 'assets'),
  webpackDestination: join(projectRoot, 'dist', 'assets'),
  webpackPublicPath: __DEV__ ? '/assets/' : '/bewusst-wie/assets/'
}
