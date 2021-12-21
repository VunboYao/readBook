const path = require('path')

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
		]
	}
}
