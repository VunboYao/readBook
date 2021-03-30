const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    // 打包后输出目录
    path: path.resolve(__dirname, './build'),
    // 打包后静态资源前面加一个路径拼接
    // publicPath: '/abc'
    // http://localhost:8080/ + publickPath + path
  },
  devServer: {
    hot: true,
    hotOnly: true, // 当编译失败后，不重新刷新整个页面
    open: true,
    compress: true,
    contentBase: '/', // 绝对路径，打包后的资源从哪里开始加载
    // publicPath: '/abc' // 开发时打包环境的目录。应与output中的publicPath一样
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
}
