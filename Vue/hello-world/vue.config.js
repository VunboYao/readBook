const webpack = require('webpack')
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.BannerPlugin({
        banner: 'VunboYao'
      })
    ]
  },
  lintOnSave: true,
  runtimeCompiler: true,
  devServer: {
    open: true
  }
}
