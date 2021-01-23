const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	devtool: 'cheap-module-source-map', // 生产：cheap-module-source-map 开发：cheap-module-eval-source-map
	mode: 'development', // production | none
	entry: './src/entry.js', // 入口文件
	output: {
		filename: "yybWebpack.js", // 输出文件名
		path: path.resolve(__dirname, 'dist') // 输出文件路径
	},
	module: {
		rules: [
			// 图片解析loader
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						// loader: 'file-loader', // 将文件打包后，并提供路径访问
						loader: 'url-loader', // 同file-loader，增加了limit限制
						options: {
							limit: 1024 * 2,
							publicPath: '../dist/img', // 自定义输出文件路径（上线后图片地址更换）
							name: '[name].[ext]',
							outputPath: './img/' // 指定图片打包到特定的目录下
						}
					}
				]
			},
			// CSS解析loader
			{
				test: /\.css$/,
				// use: ['style-loader', 'css-loader']
				use: [
					{
						// loader: 'style-loader' // 将webpack处理之后的内容插入到HTML的HEAD代码种
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader', // 解析CSS文件中的@import依赖关系
						options: {
							modules: false
						}
					},
					{
						loader: 'postcss-loader'
					}
				]
			},
			// 解析less
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader' // creates style nodes from JS strings
					},
					{
						loader: 'css-loader' // translates css into commonJS
					},
					{
						loader: 'less-loader' // compiles less to css
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer')(['chrome >= 3']),
								require('postcss-pxtorem')({
									rootValue: 100,
									propList: ['*']
								})
							]
						}
					}
				]
			},
			// 解析scss
			{
				test: /\.scss/,
				use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
			},
			// 解析字体图标
			{
				test: /\.(eot|json|ttf|woff|woff2|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'font/'
						}
					}
				]
			}
		]
	},
	plugins: [
		// 自动生成包的index.html
		new HtmlWebpackPlugin({
			title: 'My Webpack', // 需要在模板中对应设置
			minify: {
				collapseWhitespace: true // 压缩代码
			},
			template: './src/index.html'
		}),
		// 清除历史打包文件
		new CleanWebpackPlugin(),
		// 拷贝固定的文件
		new CopyWebpackPlugin([
			{
				from: './src/doc',
				to: 'doc'
			}
		]),
		// CSS提取到单独的文件
		new MiniCssExtractPlugin({
			filename: "css/[name].[hash].css"
		})
	]
}
