const path = require('path')

module.exports = {
	devtool: 'cheap-module-source-map', // 生产：cheap-module-source-map 开发：cheap-module-eval-source-map
	mode: 'development', // production | none
	entry: './entry.js', // 入口文件
	output: {
		filename: "yybWebpack.js", // 输出文件名
		path: path.resolve(__dirname, 'dist') // 输出文件路径
	},
	module: {
		rules: [
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
			}
		]
	}
}
