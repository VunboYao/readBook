const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const fs = require('fs')
const Webpack = require('webpack')

const config = {
	mode: 'development',
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		clean: true
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
}
function getDllPlugins(config) {
	// 自动导入dll包
	const plugins = []
	const dllPath = path.resolve(__dirname, 'dll')
	const files = fs.readdirSync(dllPath)
	files.forEach(item => {
		if (item.endsWith('.js')) {
			// 将资源复制到输出的文件中
			plugins.push(new AddAssetHtmlPlugin({
				outputPath: './auto',
				filepath: path.resolve(__dirname, 'dll', item)
			}))
		} else if (item.endsWith('.json')) {
			plugins.push(new Webpack.DllReferencePlugin({
				context: path.resolve(__dirname, './'),
				manifest: path.resolve(__dirname, 'dll', item)
			}))
		}
	})
	config.plugins.push(...plugins)
}
getDllPlugins(config)
module.exports = config
