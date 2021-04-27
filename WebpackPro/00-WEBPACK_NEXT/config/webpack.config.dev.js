const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const Dev = {
  target: 'web', // 默认值：browserslist，存在.browserslistrc时热更新失效
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true, // webpack-dev-serve启动
    open: true,
    hotOnly: true,
    port: 2021,
    compress: true
  },
}

module.exports = merge(commonConfig, Dev)
