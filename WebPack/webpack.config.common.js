const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const fs = require('fs')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
  // 配置模块如何解析
  resolve: {
    // alias: {
    //   // 创建 import 或 require 的别名，来确保模块引入变得简单
    //   bootStrap: 'bootstrap/dist/css/bootstrap.css'
    // }
    // 指定模块入口的查找顺序
    mainFields: ['style', 'main']
    // 指定导入模块查找顺序
    // extensions: ['.css', '.js'],
  },
  // 告诉webpack启动代码分割
  optimization: {
    splitChunks: {
      chunks: 'all', // 对哪些代码进行分割 async（只分割异步加载模块）、all(所有导入模块)
      minSize: 30000, // 表示被分割的代码体积至少有多大才可以分割（单位字节）
      maxSize: 0,
      minChunks: 1, // 表示至少被引用多少次才可以分割，默认1
      maxAsyncRequests: 5, // 异步加载并发最大请求数
      maxInitialRequests: 3, // 最大初始化请求数
      automaticNameDelimiter: '~', // 指定被分割的文件名称的连接符
      name: true, // 拆分出来的名字使用0/1/2，还是指定名称
      /*
      * 缓存组：将当前文件中导入的所有模块都缓存起来统一处理
      * */
      cacheGroups: {
        /*
        * 1.默认情况下，如果所有的模块都是从node_modules中导入的，那么会将所有从node_modules中导入的模块打包到同一个文件中
        * 2.默认情况下，如果所有的模块都不是从node_modules中导入的，那么会将所有不是从node_modules中导入的模块打包到同一个文件中
        * 3.如果当前文件中导入的模块有的是从node_modules中导入的，有的不是从node_modules中导入的，那么会将所有从node_modules中导入的打包到一个文件，不是从node_modules中导入的打包到一个文件
        * */
        /*
        * vendors: 专门用户处理从node_modules中导入的模块
        *           将所有从node_modules中导入的模块写入到一个文件中
        * */
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 优先级加强
        },
        /*
        * default: 专门用于处理从任意位置导入的模块
        *           会将所有从任意位置导入的模块写入到一个文件中
        * */
        /*
        * 注意点：如果导入的模块同时满足了两个条件。通过priority优先级控制，只写入高优先级
        *
        * */
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true // 是否复用分割的代码
        }
      }
    }
  },
  entry: {
    index: './src/js/entry.js',
    detail: './src/js/detail.js'
  }, // 入口文件
  output: {
    filename: 'js/[name].[hash:8].js', // 输出文件名
    path: path.resolve(__dirname, 'dist') // 输出文件路径
  },
  module: {
    // 忽略解析文件
    // noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4
            }
          }
        ]
      },
      // eslint编码规范检查
      {
        test: /\.js$/,
        enforce: 'pre', // 当前loader优先执行
        include: path.resolve(__dirname, 'src'), // 检查src目录下代码格式
        exclude: /node_modules/, // 排除文件
        loader: 'eslint-loader',
        options: {
          fix: false // 打包时自动修复
        }
      },
      // imports-loader处理全局导入
      /* {
        test: /\.js$/,
        exclude: /node_modules/, // 排除文件
        loader: 'imports-loader?$=jquery,this=>window', // 在JS中用到了$就去自动加载jQuery
         options:{
          imports: 'avatar'
         }
      }, */
      // 图片解析loader
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            // loader: 'file-loader', // 将文件打包后，并提供路径访问
            loader: 'url-loader', // 同file-loader，增加了limit限制
            options: {
              esModule: false,
              limit: 1024, // 限制图片大小，小于此值会转为base64
              // publicPath: 'http://127.0.0.1:2021/img', // 自定义输出文件路径（上线后图片地址更换）。devServer时不设置此路径。设置则只能是./img
              name: '[name].[hash:8].[ext]',
              outputPath: './img/' // 指定图片打包到特定的目录下
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      // CSS解析loader
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [
          {
            // loader: 'style-loader' // 将webpack处理之后的内容插入到HTML的HEAD代码种
            loader: MiniCssExtractPlugin.loader,
            // 热更新时分离文件不生效，增加此配置
            options: {
              hmr: true,
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader', // 解析CSS文件中的@import依赖关系
            options: {
              modules: false
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      // 解析less
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates css into commonJS
          },
          {
            loader: 'less-loader' // compiles less to css
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')(['chrome >= 3']),
                require('postcss-pxtorem')({
                  rootValue: 100,
                  propList: ['*']
                })
              ]
            }
          }
        ]
      },
      // 解析scss
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      // 解析字体图标
      {
        test: /\.(eot|json|ttf|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'font/'
            }
          }
        ]
      },
      // 解析ES678高级语法
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  chrome: '25'
                },
                corejs: '2',
                useBuiltIns: 'usage'
              }]
            ]
          }
        }
      },
      // 解析html中的图片
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      }
    ]
  }
}
config.plugins = makePlugins(config)

function makePlugins (config) {
  const plugins = [
    new BundleAnalyzerPlugin(),
    // 清除历史打包文件
    new CleanWebpackPlugin(),
    // 拷贝固定的文件
    new CopyWebpackPlugin([
      {
        from: './src/doc',
        to: 'doc'
      }
    ]),
    // CSS提取到单独的文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css'
    }),
    // 全局导入
    new Webpack.ProvidePlugin({
      $: 'jquery'
    }),
    // 在打包moment这个库的时候，将整个locale目录都忽略掉
    new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
  /* 动态链接库，动态添加dll中的文件 */
  const dllPath = path.resolve(__dirname, 'dll')
  /* 同步读取所有的文件 */
  const files = fs.readdirSync(dllPath)
  files.forEach(item => {
    /* JS结尾的文件，统一自动添加至index.html */
    if (item.endsWith('.js')) {
      plugins.push(new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, 'dll', item)
      }))
      /* 动态遍历json清单文件 */
    } else if (item.endsWith('.json')) {
      plugins.push(new Webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dll', item)
      }))
    }
  })
  // 自动生成包的index.html
  Object.keys(config.entry).forEach(key => {
    plugins.push(new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: false // 压缩代码
      },
      filename: key + '.html',
      chunks: [key, 'vendors~' + key]
    }))
  })
  return plugins
}
module.exports = config
