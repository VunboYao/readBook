const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  mode: 'production', // development / production
  /*  optimization: {
     minimizer: [
       new TerserJSPlugin({
         cache: true,
         parallel: true,
         sourceMap: true,
       }),
       new OptimizeCSSAssetsPlugin({})
     ]
   }, */
  // 多入口
  entry: {
    index: './src/index.js',
  },
  output: {
    // [name]  home,other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "http://localhost:63342/webpack/dist"
  },
  devtool: 'cheap-module-source-map', // 增加映射文件，帮助调试 bug
  /*
  * 1) source-map,源码映射， 单独生成一个 sourceMap文件，出错后标识当前行, 大而全，独立
  * 2) eval-source-map, 不会产生单独的文件，但是可以显示行和列
  * 3) cheap-module-source-map, 不会产生列， 但是是一个单独的映射文件
  * 4) cheap-module-eval-source-map,不会产生文件，集成在打包后的文件中， 不会产生列
  * */
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/index.html',
      filename: 'index.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader']
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        // 限制，当图片小于？k时， 用 base64
        // 否则用file-loader
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            outputPath: '/img/',
            publicPath: "http://localhost:63342/webpack/dist/img/"
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      }
    ]
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    progress: true,
    // compress: true,
    open: true,
  }
}
