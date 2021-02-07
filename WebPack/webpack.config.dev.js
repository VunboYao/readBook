const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.config.common')

const Dev = {
  devtool: 'cheap-module-eval-source-map', // 生产：cheap-module-source-map 开发：cheap-module-eval-source-map
  mode: 'development', // production | none
  // devServer
  devServer: {
    contentBase: './dist', // 默认情况下，将使用当前工作目录作为提供内容的目录
    open: true, // 在启动server后打开浏览器。默认禁用。或者指令中webpack-dev-server --open
    port: 2021, // 指定请求端口
    hot: true, // 开启热更新，就不会自动刷新网页
    hotOnly: true // 即使不支持热更新，也不刷新网页
  },
  plugins: [
    // 热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(CommonConfig, Dev)
