const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
	// watch: true, // 开启监听文件变化
	// watchOptions: {
	//     ignored: /node_modules/, // 排除巨大的文件夹
	//     aggregateTimeout: 300, // 防抖
	//     poll: 1000 //每隔多少时间检查一次，指定毫秒为单位进行轮询
	// },
	// optimization：配置webpack优化项
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	},
	/*
	devtool: 配置 source map
	*/
	devtool: 'none',
	/*
	mode: 指定打包的模式，两种
	开发模式（development）: 不会对打包的JS代码进行压缩
	生产模式（production）: 会对打包的JS代码进行压缩
	*/
	mode: 'development', // "production" | "development" | "none"

	/*
	entry: 指定打包需要的文件
	*/
	entry: './src/js/entry',

	/*
	output: 指定打包之后的文件输出的路径和输出的文件名称
	*/
	output: {
		/**
		 * filename: 指定打包之后的JS文件的名称
		 */
		filename: 'main.js',
		/**
		 *  path: 指定打包之后的文件存储到什么地方
		 */
		path: path.resolve(__dirname, 'dist')
	},
	/*
	module: 告诉 webpack 如何处理 webpack 不能够识别的文件
	*/
	module: {
		rules: [
			// 打包JS规则
			{
				test: /\.js$/,
				exclude: /node_modules/, // 不做处理的目录
				loader: 'babel-loader',
				options: {
					'presets': [
						['@babel/preset-env', { // 高级版本不做转换
							"targets": {
								"chrome": "58"
							},
							// "useBuiltIns": "usage"
						}]
					],
					"plugins": [
						[
							"@babel/plugin-transform-runtime",
							{
								"absoluteRuntime": false,
								"corejs": 2,
								"helpers": true,
								"regenerator": true,
								"useESModules": false,
								"version": "7.0.0-beta.0"
							}
						]
					]
				}
			},
			// 打包字体图片规则
			{
				test: /\.(eot|json|svg|ttf|woff|woff2)$/,
				use: [{
					loader: 'file-loader',
					options: {
						publicPath: 'dist/font/',
						name: '[name].[ext]',
						outputPath: 'font/'
					}
				}]
			},
			/**
			 * 打包图片规则
			 */
			{
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1024 * 3,
						publicPath: 'images', // 文件的公共路径
						name: '[name].[ext]', // 文件名称
						outputPath: './images', // 文件输出的目录
						esModule: false
					}
				}]
			},
			// 打包html中图片规则
			{
				test: /\.(htm|html)$/i,
				loader: 'html-withimg-loader'
			},
			/**
			 * css-loader: 解析css文件中的@import依赖关系
			 * style-loader: 将webpack处理之后的内容插入到HTML的style标签中
			 */
			{
				test: /\.css$/,
				// use: ['style-loader', 'css-loader']
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: true,
						publicPath: '../'
					}
				},
					{
						loader: 'css-loader',
						options: {
							url: false
						}
					}
				]
			},
			// less
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			// sass
			{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader'
				},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer')(['chrome >= 3']),
								require('postcss-pxtorem')({
									rootValue: 100,
									propList: ['*'] // * 全都转换， 传递特定的属性，则转换特定的属性
								})
							]
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	// plugins: 告诉webpack需要新增一些什么样的功能
	plugins: [
		// 清除残留文件
		new CleanWebpackPlugin(),
		// 打包出口index.html
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: false
			}
		}),
		// 复制指定的文件
		// new CopyWebpackPlugin([{
		//     from: './src/doc',
		//     to: 'doc'
		// }]),
		// 打包css文件
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new Webpack.HotModuleReplacementPlugin()
	],
	// web 服务
	devServer: {
		contentBase: path.join(__dirname, 'dist'), // 告诉webpack-dev-server， dist目录下的文件，可以作为访问文件
		port: 2020,
		open: true, // 是否自动打开页面
		compress: false, // 是否启用压缩
		hot: true, // 开启热更新，就不会自动刷新网页
		hotOnly: true // 即使不支持热更新，也不刷新网页
	}
}
