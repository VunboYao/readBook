const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
	mode: 'development',
	// 入口
	// 多页面应用，多入口 对应 多出口
	// chunk => chunks => chunkName => bundle
	entry: {
		index: './src/index.js',
		// login: './src/login.js',
	},
	// 出口
	output: {
		// 生成资源存放的位置，必须是绝对路径
		path: path.resolve(__dirname, './dist'),
		// 生成资源的名称
		filename: '[name]-new.js', // 占位符[name]
	},
	resolveLoader: {
		modules: ['node_modules', 'src/loaders']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'],
			},
			// 2.npm i less less-loader@7 -D
			/*{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader'],
			},*/
			// 3.自定义loader
			{
				test: /.index\.js$/,
				use: [
					{
						loader: 'loader-normal',
						options: {
							action: '学习'
						}
					},
					{
						loader: 'loader-async'
					}
				]
			},
			// 4.自定义loader解析less
			{
				test: /\.less$/,
				use: [
					'yyb-style-loader',
					'yyb-css-loader',
					'yyb-less-loader'
				]
			},
			// 5.
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		/*new HtmlWebpackPlugin({
			template: './src/public/login.html',
			filename: 'login.html',
			chunks: ['login'] // 指定关联的资源。入口的chunk
		}),*/
		new HtmlWebpackPlugin({
			template: './src/public/index.html',
			filename: 'index.html',
			chunks: ['index']
		}),
	],
}
