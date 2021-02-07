const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.config.common')

const Prod = {
  devtool: 'cheap-module-source-map', // 生产：cheap-module-source-map 开发：cheap-module-eval-source-map
  mode: 'production', // production | none
  // webpack优化项
  optimization: {
    // 压缩JS、CSS
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: []
}
module.exports = merge(CommonConfig, Prod)
