const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')

// 多页应用配置
const setMPA = () => {
	const entry = {}
	const htmlWebpackPlugins = []

	// 查询页面入口模块 路径 以及相应html模块
	// 提取页面入口的名称，用于entry的chunkName
	// 所有页面入口模块和相应的html模块都要放在一个文件目录下

	const entryPath = glob.sync(path.join(__dirname, './src/page/*/index.js'))

	entryPath.map(item => {
		const chunkName = item.match(/src\/page\/(.*)\/index.js$/)[1]
		entry[chunkName] = item

		htmlWebpackPlugins.push(new HtmlWebpackPlugin({
			template: path.join(__dirname, `./src/page/${chunkName}/index.html`),
			filename: `${chunkName}.html`,
			chunks: [chunkName]
		}))

	})

	return {
		entry,
		htmlWebpackPlugins
	}
}
const {entry, htmlWebpackPlugins} = setMPA()

module.exports = {
	mode: 'development',
	// 入口
	// 多页面应用，多入口 对应 多出口
	// chunk => chunks => chunkName => bundle
	entry,
	// 出口
	output: {
		// 生成资源存放的位置，必须是绝对路径
		path: path.resolve(__dirname, './mpa'),
		// 生成资源的名称
		filename: 'js/[name].js', // 占位符[name]
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
			// 5.图片解析：file-loader => url-loader
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							// 资源存放的位置
							outputPath: 'images',
							// 资源引入的位置 src=publicPath/[name].png
							publicPath: '../images',
							// 限制大小
							limit: 2 * 1024
						}
					},
					// 6.TODO：图片压缩：image-webpack-loader 必须在url-loader/file-loader前调用.必须用 cnpm 安装
					'image-webpack-loader'
				]
			},
			// 7.font字体处理
			{
				test: /\.(eot|woff|woff2|svg|ttf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						// 资源存放的位置
						outputPath: 'font',
						publicPath: '../font'
					}
				}
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		...htmlWebpackPlugins
	],
}
