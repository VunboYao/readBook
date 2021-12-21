const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './build')
	},
	resolveLoader: {
		modules: ['node_modules', './loaders/']
	},
	module: {
		rules: [
			/*{
				test: /\.js$/i,
				loader: 'yyb-loader',
				enforce: 'pre'
			},
			{
				test: /\.js$/i,
				use: 'yyb-loader2',
				enforce: 'pre'
			},
			{
				test: /\.js$/i,
				use: 'yyb-loader3',
				enforce: 'post'
			}*/
			{
				test: /\.js$/i,
				use: {
					loader: 'async-loader',
					options: {
						name: 'Vunbo',
						age: 123,
						// old: false // schema中additionalProperties false 时报错
					}
				}
			}
		]
	},
	plugins: [
			new HtmlWebpackPlugin()
	]
}
