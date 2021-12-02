const { resolve } = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, './dist'), // 绝对路径。当前文件所在的绝对路径
  },
  plugins: [
      new CleanWebpackPlugin()
  ]
}
