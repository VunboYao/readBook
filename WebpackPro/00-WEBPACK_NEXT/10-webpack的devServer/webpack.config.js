const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devServer: { // webpack-dev-server
		// static: './dist',
		open: false,
		hot: true, // 开启模块热更新
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, './dist'),
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: ['babel-loader']
			},
			{
				test: /\.js$/, // JS中用到JSX
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(), // vue编译插件
		new ReactRefreshPlugin(), // react热更新配置
		new HtmlWebpackPlugin({
			template: "public/index.html",
			title: 'yao', // webpack-dev-server默认的模板文件名称必须是index.html
		}),
	]
}
