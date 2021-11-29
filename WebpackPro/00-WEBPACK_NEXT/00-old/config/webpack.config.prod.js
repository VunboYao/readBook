const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const Prod = {
  mode: 'production'
}

module.exports = merge(commonConfig, Prod)
