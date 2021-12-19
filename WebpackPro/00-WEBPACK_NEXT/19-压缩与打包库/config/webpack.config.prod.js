const { merge } = require('webpack-merge')
const InlineChunkPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.config.common')

const config = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new InlineChunkPlugin(HtmlWebpackPlugin, [/runtime.+\.js/]),
  ],
}

module.exports = merge([commonConfig, config])
