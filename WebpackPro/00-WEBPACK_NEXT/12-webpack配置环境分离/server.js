const express = require('express')
const app = express()
const webpack = require('webpack')

const webpackDevMiddle = require('webpack-dev-middleware')

const compiler = webpack(require('./webpack.config.js'))

const middleware = webpackDevMiddle(compiler)

app.use(middleware)

app.listen(3000, () => {
	console.log('listening 3000')
})
