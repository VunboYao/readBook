const webpack = require('webpack')
const path = require('path')
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    resolveLoader: {
      modules: ['./src/loaders', 'node_modules']
    },
    module: {
      rules: [
        {
          test: /yyb-router\.js$/,
          use: ['route-loader'],
          include: path.resolve(__dirname, 'src/route')
        }
      ]
    },
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
