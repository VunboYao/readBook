const {compilation} = require("webpack")

class TextWebpackPlugin{

	constructor(options) {
		console.log(options)
	}

	apply(compiler) {
		compiler.hooks.emit.tapAsync('TextWebpackPlugin', (compilation, cb) => {
			const content = 'VunboYao'
			compilation.assets['yyb.txt'] = {
				source: function () {
					return content
				},
				size: function () {
					return content.length
				}
			}
			console.log(compilation.assets, '>>>>>>>>>>>>')
			cb()
		})
	}
}

module.exports = TextWebpackPlugin
