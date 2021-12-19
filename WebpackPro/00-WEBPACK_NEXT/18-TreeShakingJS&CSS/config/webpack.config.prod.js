const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const config = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
}

module.exports = merge([commonConfig, config])
