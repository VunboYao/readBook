const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const Dev = {
  mode: 'development'
}

module.exports = merge(commonConfig, Dev)
