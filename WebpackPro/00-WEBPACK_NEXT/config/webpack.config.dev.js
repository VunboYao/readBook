const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const Dev = {
  target: 'web', // 默认值：browserslist，存在.browserslistrc时热更新失效
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true, // webpack-dev-serve启动
    open: true,
    hotOnly: true, // 编译失败后也不刷新
    port: 2021,
    compress: true,
    // publicPath: '/' // 默认值是/。建议 devServer.publicPath 与 output.publicPath相同
  },
}

module.exports = merge(commonConfig, Dev)
