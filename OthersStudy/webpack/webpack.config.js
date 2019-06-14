// webpack 是 node 写出来的， so 用 node 语法

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // 模式，production/development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名, hash 8位
    path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
  },
  plugins: [ // 数组，放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板
      filename: 'index.html', // 打包后的文件名
      minify: {
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true, // 折叠一行
      },
      hash: true, // 哈希戳
    })
  ],
  devServer: {
    port: 3000,
    progress: true, // 进度条
    // contentBase: './dist', // 初始地址
    compress: true, // 压缩
    open: true // 自动打开
  }
}
