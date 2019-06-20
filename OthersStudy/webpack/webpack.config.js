const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack'); // 多线程打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    noParse: /jquery/, // 不去解析jQuery中的依赖关系
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.resolve('src'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      }
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }]
  },
  plugins: [
    /*  new webpack.DllReferencePlugin({
       manifest: path.resolve(__dirname, 'dist', 'manifest.json')
     }), */
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
  ],
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  }
}
