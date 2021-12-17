const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const config = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  // TODO：外部扩展：开发环境不合适。通过CDN引入
  externals: {
    // 包名：全局变量
    lodash: '_',
  },
}

module.exports = merge([commonConfig, config])
