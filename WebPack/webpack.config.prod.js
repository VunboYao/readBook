const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.config.common')
const PurifyCSSPlugin = require('purifycss-webpack')
const glob = require('glob-all')
const path = require('path')

const Prod = {
  devtool: 'cheap-module-source-map', // 生产：cheap-module-source-map 开发：cheap-module-eval-source-map
  mode: 'production', // production | none
  // webpack优化项
  optimization: {
    // 告诉webpack只打包导入模块中用到的内容
    usedExports: true,
    // 压缩JS、CSS
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    // 提取使用的CSS
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, 'src/*.html'),
        path.join(__dirname, 'src/js/*.js')
      ])
    })
  ]
}
module.exports = merge(CommonConfig, Prod)
