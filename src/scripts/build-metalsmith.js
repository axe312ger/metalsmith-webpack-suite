import metalsmith from './metalsmith'

metalsmith.build(function (err) {
  if (err) {
    throw err
  }
  console.log('Metalsmith build finished!')
})
