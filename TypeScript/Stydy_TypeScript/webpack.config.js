const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
	/*
	* devServer: 自动检测文件变化
	* */
	devServer: {
		// contentBase: path.join(__dirname, 'public'),
		open: true, // 自动打开页面
		port: 2021,
		hot: false, // 开启热更新
		hotOnly: false // 如果热更新失败，也不刷新网页
	},
	/*
	* 配置sourcemap
	* */
	devtool: 'cheap-module-source-map',
	/*
	* mode: 打包模式
	* */
	mode: "development",
	/*
	* entry: 指定入口需要打包的文件
	* */
	entry: './src/js/index.ts',
	/*
	* output: 指定打包之后输出的路径和输出的文件名称
	* */
	output: {
		/*
		* 指定打包之后的的文件名称
		* */
		filename: '[name].[hash:8].js',
		/*
		* 指定输出的文件路径
		* */
		path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
	// watch: true,
	// watchOptions: {
	// 	ignored: /node_modules/,
	// 	aggregateTimeout: 300,
	// 	poll: 1000
	// },
	module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
	plugins: [
		// 自动生成包的index.html
		new HtmlWebpackPlugin({
			minify: {
				collapseWhitespace: false // 压缩代码
			},
			template: './src/index.html'
		}),
		new CleanWebpackPlugin(),
		// 热更新插件
		new Webpack.HotModuleReplacementPlugin()
	]
}
