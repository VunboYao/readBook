const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // assetModuleFilename: 'img/[name].[hash:6][ext]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              "@babel/plugin-transform-arrow-functions",
              "@babel/plugin-transform-block-scoping"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    /* 清除历史打包文件 */
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'VunboYao',
      template: path.resolve(__dirname, 'public/index.html')
    }),
  ]
}
