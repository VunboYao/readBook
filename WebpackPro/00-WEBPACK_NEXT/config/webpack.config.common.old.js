const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolveApp('./dist'),
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
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader', //  默认情况下url-loader会将所有的图片文件转成base64编码
          options: {
            limit: 15 * 1024,
            name: 'img/[name].[hash:8].[ext]',
            // outputPath: 'img'
          }
        }
      },
      // 字体文件
      {
        test: /\.(woff2?|eot|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'font/'
          }
        }
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new CleanWebpackPlugin()],
}

module.exports = config
