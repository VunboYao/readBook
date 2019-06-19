const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

/*
* 1）cleanWebpackPlugin   清除 dist 目录
* 2) copyWebpackPlugin
* 3) bannerPlugin
* */

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
  watch: true,
  watchOptions: { // 监控的选项
    poll: 3000, // 每3秒更新一次
    aggregateTimeout: 600, // 防抖，将这段时间内进行的任何其他更改都聚合到一次重新构建里
    ignored: /node_modules/, // 不监控
  },
  output: {
    // [name]  home,other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "http://localhost:63342/webpack/dist"
  },
  // devtool: 'cheap-module-source-map', // 增加映射文件，帮助调试 bug
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
    // 清空dist
    new CleanWebpackPlugin(),

    // new CopyWebpackPlugin([
    //   {from: './doc'}
    // ]),

    new webpack.BannerPlugin('make by Vunbo Yao'),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),

    new webpack.DefinePlugin({
      DEV: JSON.stringify('DEV'),
      FLAG: 'true',
      expression: '1+1'
    })
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
  resolve: { // 解析 第三方包 common
    // modules: [path.resolve('node_modules')], // 只在当前目录中查找
    extensions: ['.js', '.css', '.json'],// 自动解析确定的扩展, 能够使用户在引入模块时不带扩展
    mainFields: ['style', 'main'], // 先找style文件
    alias: { // 别名
      bootstrap: 'bootstrap/dist/css/bootstrap.min.css'
    }
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
    progress: true,
    // compress: true,
    open: true,
    proxy: {
      // '/api': 'http://localhost:3000', // 配置代理  api开头去 localhost: 3000
      /* '/api': { // 当接口不是 api开头时
         target: 'http://localhost:3000',
         pathRewrite: {"^/api" : ""}
       }*/

    },
    // 单纯模拟数据
    /*before(app) { // 提供的方法
      app.get('/user', (req, res) => {
        res.json('VunboYao-before');
      })
    }*/
  }
}
