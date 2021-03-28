const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')

const app = express()

const config = require('./webpack.config')

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler))

app.listen(8888, () => {
  console.log('listening in port:8888');
})
