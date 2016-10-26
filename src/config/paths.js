import { resolve, join } from 'path'

const projectRoot = resolve(__dirname, '..', '..')

export default {
  projectRoot,
  distribution: join(projectRoot, 'dist'),
  metalsmithSource: 'content',
  metalsmithDestination: join('dist', 'site'),
  webpackSource: join(projectRoot, 'src', 'assets'),
  webpackDestination: join(projectRoot, 'dist', 'assets'),
  webpackPublicPath: '/assets/',
  serverRoot: join(projectRoot, 'dist', 'site')
}
