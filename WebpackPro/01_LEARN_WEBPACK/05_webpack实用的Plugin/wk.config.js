const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // assetModuleFilename: 'img/[name].[hash:6][ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 重新执行之前的loader
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 重新执行之前的loader
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // 加载静态资源
        /*
        asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现
        asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现
        asset/source 导出资源的源代码。之前通过使用 raw-loader 实现
        asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源
体积限制实现
        */
        type: 'asset',
        // asset/inline 时不需要generator
        generator: {
          filename: 'img/[name].[hash:6][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]'
        }
      }
    ]
  },
  plugins: [
    /* 清除历史打包文件 */
    new CleanWebpackPlugin(),
    /* 利用特定的模板生成HTML文件 */
    new HtmlWebpackPlugin({
      title: 'VunboYao',
      template: path.resolve(__dirname, 'public/index.html')
    }),
    /* 定义全局路径 */
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    /* 拷贝静态文件 */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/'),
          globOptions: {
            ignore: ['**/index.html', '**/.DS_Store']
          }
        }
      ]
    })
  ]
}
