const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {DefinePlugin} = require('webpack')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: resolve(__dirname, './dist'), // 绝对路径。当前文件所在的绝对路径
    // 静态资源输出位置设置
    // assetModuleFilename: 'img/[hash][ext]' // ext默认带了点(.)
  },
  resolveLoader: {
    modules: ['node_modules', 'src/loaders'],
  },
  module: {
    // loader: 特定的模块类型。转换对应的文件
    // rule对象
    rules: [
      {
        test: /\.css$/,
        // 1.完整使用方式。loader加载从后往前
        use: [
          // { loader: 'style-loader' },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 允许重新加载css-loader前的importLoaders
              /*
               * TODO：当css中存在@import引入的css时，postcss-loader未能处理。此时需要重新执行postcss-loader重载分析
               * */
            },
          },
          {
            loader: 'postcss-loader',
            /*options: {
							// TODO：内联方式设置 PostCSS 选项与插件
							postcssOptions: {
								plugins: [require('autoprefixer')]
							}
						}*/
          },
        ],
        // 2.省略使用方式
        // use: ['style-loader', 'css-loader']
        // 3.只有一个loader时的缩写
        // loader: 'css-loader'
      },
      /* npm i less-loader -D */
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      // webpack5静态资源处理
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        // type: 'asset/resource', // 1.file-loader
        // type: 'asset/inline', // 2.url-loader。转换成base64.
        type: 'asset', // 通用资源
        generator: { // TODO:asset/inline不能设置该值
          filename: 'images/[name].[hash:6][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 6 * 1024
          }
        }
      },
      // webpack5:asset/resource方式设置字体
      {
        test: /\.(ttf|eot|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]'
        }
      },
    ],
  },
  // 打包优化、资源管理、环境变量注入等。执行更加广泛的任务。
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Yao',
      filename: 'Vunbo.html',
    }),
    // 全局常量插件
    new DefinePlugin({
      BASE_URL: "'./'"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
          globOptions: {
            // 忽略文件。必须用：**/file.xxx
            ignore: ['**/index.html', '**/.DS_Store']
          }
        }
      ]
    })
  ],
}
