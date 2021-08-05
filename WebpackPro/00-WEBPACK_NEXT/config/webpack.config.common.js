const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const config = {
  entry: {
    // 可配置多文件入口
    index: './src/index.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      
    },
    // minimize: false // 压缩代码。默认是true
    minimizer: [new TerserPlugin()] // 定制
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.ts', '.jsx', '.vue'], // 扩展名解析
    modules: ['node_modules'], // 默认的模块检索路径
    mainFiles: ['index'], // 对于文件目录，默认找index文件，后缀根据extensions来解析
    alias: {
      '@': resolveApp('./src/js') // 别名
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: resolveApp('./dist'),
    // publicPath: '', // 默认值为空。 在打包后的静态资源前面加上一个路径的拼接
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
              importLoaders: 2,
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
              importLoaders: 2,
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
          filename: 'img/[name].[hash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 15 * 1024,
          },
        },
      },
      // 字体文件
      {
        test: /\.(woff2?|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]',
        },
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
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      // TS
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'babel-loader', // ts-loader
      },
      // Vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'VunboPack',
      template: resolveApp('./public/index.html'),
    }),
    new CleanWebpackPlugin(),
    // 全局常量配置
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new VueLoaderPlugin()
  ],
}

module.exports = config
