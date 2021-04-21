const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolveApp('./dist'),
    // assetModuleFilename: 'img/[name].[hash:6][ext]'
  },
  module: {
    rules: [
      // CSS处理
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['postcss-preset-env'],
          //     },
          //   },
          // },
        ],
      },
      // LESS 处理
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      // SASS处理
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      // 图片处理
      /*
      asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现
      asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现
      asset/source 导出资源的源代码。之前通过使用 raw-loader 实现
      asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现；
      */
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:6][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 15 * 1024
          }
        }
      },
      // 字体文件
      {
        test: /\.(woff2?|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]'
        }
      },
      // JS文件处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            /*options: {
              presets: [
                ['@babel/preset-env', {
                  /!*targets: {
                    'chrome': 88
                  }*!/
                  targets: 'defaults'
                }]
              ]
            }*/
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'VunboPack',
      template: resolveApp('./public/index.html')
    }),
    new CleanWebpackPlugin(),
    // 全局常量配置
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: [
              '**/index.html'
            ]
          }
        }
      ]
    })
  ],
}

module.exports = config
