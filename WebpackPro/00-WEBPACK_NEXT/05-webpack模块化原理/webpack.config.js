const { resolve } = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, './dist'), // 绝对路径。当前文件所在的绝对路径
    // 静态资源输出位置设置
    // assetModuleFilename: 'img/[hash][ext]' // ext默认带了点(.)
  },
  plugins: [
      new CleanWebpackPlugin()
  ]
}
