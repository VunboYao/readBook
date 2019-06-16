// webpack 是 node 写出来的， so 用 node 语法

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');// 压缩css
const TerserJSPlugin = require('terser-webpack-plugin');// JS压缩
const webpack = require('webpack');


module.exports = {
  mode: 'development', // 模式，production/development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后的文件名, hash 8位
    path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: true, // 缓存
        parallel: true, // 并发打包压缩
        sourceMap: true, // 源码映射
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [ // 数组，放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板
      filename: 'index.html', // 打包后的文件名
      minify: {
        // removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: false, // 折叠一行
      },
      // hash: true, // 哈希戳
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css', // 抽离css的文件名
    }),
   /*  new webpack.ProvidePlugin({// 在每个模块中都注入 $
      $: 'jquery'
    }) */
  ],
  externals: {
    jquery: 'jQuery'
  },
  module: { // 模块
    rules: [ // 规则
      // {
      //   test: require.resolve('jquery'),
      //   use: "expose-loader?$"
      // },
     /*  {
        enforce: 'pre', // previous 需要先执行
        test: /\.js$/i,
        use: {
          loader: 'eslint-loader',
        },
      }, */
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,// 抽离css,link链接
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader', // @Import 解析路径
          'postcss-loader',
          'less-loader' // 转换less => css
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.styl$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    port: 8080,
    progress: true, // 进度条
    // contentBase: './dist', // 初始地址
    compress: false, // 压缩
    open: true // 自动打开
  }
}
