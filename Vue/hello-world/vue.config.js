const webpack = require('webpack')
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.BannerPlugin({
        banner: 'VunboYao'
      })
    ]
  },
  runtimeCompiler: true,
  devServer: {
    open: true
  }
}