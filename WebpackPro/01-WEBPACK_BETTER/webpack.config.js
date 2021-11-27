const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  // 入口
  // 多页面应用，多入口 对应 多出口
  entry: {
    index: './src/index.js',
    login: './src/login.js',
  },
  // 出口
  output: {
    // 生成资源存放的位置，必须是绝对路径
    path: path.resolve(__dirname, './dist'),
    // 生成资源的名称
    filename: '[name]-new.js', // 占位符[name]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/public/login.html',
      filename: 'login.html',
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
  ],
}
