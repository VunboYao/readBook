const path = require('path')

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
							limit: 1024 * 5,
							publicPath: 'dist/img', // 自定义输出文件路径（上线后图片地址更换）
							name: '[name].[ext]',
							outputPath: 'img/' // 指定图片打包到特定的目录下
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
						loader: 'style-loader' // 将webpack处理之后的内容插入到HTML的HEAD代码种
					},
					{
						loader: 'css-loader', // 解析CSS文件中的@import依赖关系
						options: {
							modules: true
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
			}
		]
	}
}
