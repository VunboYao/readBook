const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	devtool: 'cheap-module-source-map', // 生产：cheap-module-source-map 开发：cheap-module-eval-source-map
	mode: 'development', // production | none
	// webpack优化项
	optimization: {
		// 压缩JS、CSS
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
	},
	entry: './src/entry.js', // 入口文件
	output: {
		filename: "yybWebpack.js", // 输出文件名
		path: path.resolve(__dirname, 'dist') // 输出文件路径
	},
	// 监听器
	/*watch: true,
	watchOptions: {
		// 防抖
		aggregateTimeout: 300,
		// 忽略大文件
		ignored: /node_modules/,
		// 轮询时间
		poll: 1000
	},*/
	// devServer
	devServer: {
		contentBase: './dist', // 默认情况下，将使用当前工作目录作为提供内容的目录
		open: true, // 在启动server后打开浏览器。默认禁用。或者指令中webpack-dev-server --open
		port: 2021, // 指定请求端口
		hot: true, // 开启热更新，就不会自动刷新网页
		hotOnly: true  // 即使不支持热更新，也不刷新网页
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
							esModule: false,
							limit: 1024, // 限制图片大小，小于此值会转为base64
							// publicPath: 'http://127.0.0.1:2021/img', // 自定义输出文件路径（上线后图片地址更换）。devServer时不设置此路径。设置则只能是./img
							name: '[name].[ext]',
							outputPath: './img/' // 指定图片打包到特定的目录下
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.90],
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						}
					},
				]
			},
			// CSS解析loader
			{
				test: /\.css$/,
				// use: ['style-loader', 'css-loader']
				use: [
					{
						// loader: 'style-loader' // 将webpack处理之后的内容插入到HTML的HEAD代码种
						loader: MiniCssExtractPlugin.loader,
						// 热更新时分离文件不生效，增加此配置
						options: {
							hmr: true,
							publicPath: '../'
						}
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
			},
			// 解析ES678高级语法
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							['@babel/preset-env', {
								targets: {
									"chrome": "25"
								},
								"corejs": '2',
								"useBuiltIns": "usage"
							}]
						]
					}
				}
			},
			// 解析html中的图片
			{
				test: /\.(htm|html)$/i,
				loader: 'html-withimg-loader'
			}
		]
	},
	plugins: [
		// 自动生成包的index.html
		new HtmlWebpackPlugin({
			title: 'My Webpack', // 需要在模板中对应设置
			minify: {
				collapseWhitespace: false // 压缩代码
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
			filename: "css/[name].css"
		}),
		// 热更新插件
		new webpack.HotModuleReplacementPlugin(),
	]
}
