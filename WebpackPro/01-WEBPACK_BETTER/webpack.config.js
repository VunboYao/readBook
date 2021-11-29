const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  // 入口
  // 多页面应用，多入口 对应 多出口
  // chunk => chunks => chunkName => bundle
  entry: {
    index: './src/index.js',
    // login: './src/login.js',
  },
  // 出口
  output: {
    // 生成资源存放的位置，必须是绝对路径
    path: path.resolve(__dirname, './dist'),
    // 生成资源的名称
    filename: 'js/[name].js', // 占位符[name]
  },
  resolveLoader: {
    modules: ['node_modules', 'src/loaders']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'],
      },
      // 2.npm i less less-loader@7 -D
      /*{
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'],
      },*/
      // 3.自定义loader
      {
        test: /.index\.js$/,
        use: [
          {
            loader: 'loader-normal',
            options: {
              action: '学习'
            }
          },
          {
            loader: 'loader-async'
          }
        ]
      },
      // 4.自定义loader解析less
      {
        test: /\.less$/,
        use: [
          'yyb-style-loader',
          'yyb-css-loader',
          'yyb-less-loader'
        ]
      },
      // 5.图片解析：file-loader => url-loader
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              // 资源存放的位置
              outputPath: 'images',
              // 资源引入的位置 src=publicPath/[name].png
              publicPath: '../images', // webpack5中已修复。无需手动传入该值
              // 限制大小
              limit: 2 * 1024
            }
          },
          // 6.图片压缩：image-webpack-loader 必须在url-loader/file-loader前调用.必须用 cnpm 安装
          'image-webpack-loader'
        ]
      },
      // 7.font字体处理
      {
        test:/\.(eot|woff|woff2|svg|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            // 资源存放的位置
            outputPath: 'font',
            publicPath: '../font'
          }
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    /*new HtmlWebpackPlugin({
      template: './src/public/login.html',
      filename: 'login.html',
      chunks: ['login'] // 指定关联的资源。入口的chunk
    }),*/
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      // filename: 'html/index.html', // js路径处理: img图片引用地址问题
      filename: 'index.html',
      chunks: ['index']
    }),
  ],
}
