const { resolve } = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: './src/index.js',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, './dist'), // 绝对路径。当前文件所在的绝对路径
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader:'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin(),
      new CleanWebpackPlugin()
  ]
}
