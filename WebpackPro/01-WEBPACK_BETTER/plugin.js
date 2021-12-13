const webpack = require('webpack')
const config = require('./webpack.config')

const compiler = webpack(config)

Object.keys(compiler.hooks).forEach(hookName => {
	// 同步 tap
	// 异步 tapAsync

	compiler.hooks[hookName].tap('事件名称', () => {
		console.log('run----------------------=>',hookName)
	})
})

compiler.run()
