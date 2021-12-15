const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const { ProvidePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolveApp = require('./path')

const config = {
  entry: {
    // 配置一
    /* index: { import: './src/index.js', dependOn: ['lodash', 'dayjs'] },
    main: { import: './src/main.js', dependOn: 'lodash' },
    lodash: 'lodash',
    dayjs: 'dayjs', */
    // 配置二
    /* index: { import: './src/index.js', dependOn: 'shared' },
    main: { import: './src/main.js', dependOn: 'shared' },
    shared: ['lodash', 'dayjs'], */
    index: './src/index.js',
    main: './src/main.js',
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false, // 是否提取注释文件
    })],
    // chunkIds: 'deterministic', // natural：自然数 named:包所在name, deterministic:生产使用。方便缓存
    // runtimeChunk: 'single', // 运行时代码单独分离
    splitChunks: {
      // async 异步：import 动态导入。会单独打成一个包
      // initial 同步导入
      // all 异步/同步导入
      chunks: 'all',
      // 最小尺寸：拆分出来的包，最小20kb
      minSize: 6000, // 默认。20kb=20000(bytes)
      // 将大于maxSize，拆分成不小于minSize
      maxSize: 6000, // 6kb.超出则自动拆包
      // 表示最少被引入几次的包，需要分包
      minChunks: 2,
      // 缓存组
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendor-chunks.js', // 固定的名字
          filename: '[id]_vendors.js',
          priority: -20, // 优先级
        },
        /* Demo: {
          test: /bar+/,
          filename: '[id]_bar.js',
        }, */
        default: {
          minChunks: 2,
          filename: 'common_[id].js',
          priority: -10, // 优先级
          reuseExistingChunk: true, // 缓存
        },
      },
    },
  },
  output: {
    filename: 'js/[name].[chunkhash:6].bundle.js',
    path: resolveApp('./dist'), // TODO: 静态资源的输出目录。
    // TODO: 默认空字符串。 访问时：host + publicPath + path
    // 建议是：'/'. 本地访问则是：'./'
    // publicPath: "",
    clean: true,
    // TODO: 如果所有资源都放到cdn上，在publicPath上添加cdn地址
    // publicPath: 'https://vunbo.com/cdn/',
    chunkFilename: 'js/[name].[contenthash:6].chunk.js', // TODO:动态导入的模块的输出命名.魔法注释精确命名
  },
  resolve: {
    modules: ['node_modules'], // 模块的解析目录
    extensions: ['.ts', '.vue', '.jsx', '...'], // 可以使用 '...' 访问默认拓展名
    mainFiles: ['index'], // 文件扩展名解析
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/, // JS中用到JSX
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    // TODO: shimming预知全局变量.不推荐此方法
    new ProvidePlugin({
      axios: 'axios', // 文件中引用了axios方法，未引入axios，webpack进行自动引入
      get: ['axios', 'get'], // get方法，axios中去查找get方法进行引入。
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
    }),
    new VueLoaderPlugin(), // vue编译插件
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'yao', // webpack-dev-server默认的模板文件名称必须是index.html
    }),
  ],
}

module.exports = config

/*
* hash: 和项目整体有关。修改后会变动
* chunkhash: 根据入口的是否变动来触发变动.css如果没改动，也无法缓存
* contenthash: 根据内容来触发变动。
* 最佳实践：
* 出口：chunkhash
* 其余：contenthash
* */
