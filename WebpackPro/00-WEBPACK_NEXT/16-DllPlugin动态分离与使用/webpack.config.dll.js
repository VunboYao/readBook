const path = require('path')
const Webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
	mode: 'production',
	entry: ['react', 'react-dom'],
	output: {
		path: path.resolve(__dirname, './dll'),
		filename: 'dll_[name].js',
		library: 'dll_[name]',
	},
	optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false, // 是否提取注释文件
		})]
	},
	plugins: [
			new Webpack.DllPlugin({
				name: 'dll_[name]',
				path: path.resolve(__dirname, './dll/[name].manifest.json')
			})
	]
}
