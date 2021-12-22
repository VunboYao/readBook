const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const CompressAsset = require('./plugins/CompressAsset.js')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, './dist'),
		clean: true
	},
	plugins: [
			new HtmlWebpackPlugin(),
			new CompressAsset()
	]
}
