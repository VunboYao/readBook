const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: "bundle.js",
		path: resolve(__dirname, './dist') // 绝对路径。当前文件所在的绝对路径
	},
	resolveLoader: {
		modules: ['node_modules', 'src/loaders']
	},
	module: {
		// rule对象
		rules: [
			{
				test: /\.css$/,
				// 1.完整使用方式。loader加载从后往前
				use: [
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1 // 允许重新加载css-loader前的importLoaders
							/*
							* TODO：当css中存在@import引入的css时，postcss-loader未能处理。此时需要重新执行postcss-loader重载分析
							* */
						}
					},
					{
						loader: 'postcss-loader',
						/*options: {
							// TODO：内联方式设置 PostCSS 选项与插件
							postcssOptions: {
								plugins: [require('autoprefixer')]
							}
						}*/
					}
				],
				// 2.省略使用方式
				// use: ['style-loader', 'css-loader']
				// 3.只有一个loader时的缩写
				// loader: 'css-loader'
			},
			/* npm i less-loader -D */
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'vunbo.html',
		})
	]
}
