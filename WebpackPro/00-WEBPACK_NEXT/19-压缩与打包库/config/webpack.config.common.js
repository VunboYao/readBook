const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')
const CompressionPlugin = require('compression-webpack-plugin')
const resolveApp = require('./path')

const config = {
  entry: {
    index: './src/index.js',
  },
  optimization: {
    usedExports: true, // TODO：标注未使用的代码.结合terser使用
    minimize: false,
    minimizer: [new TerserPlugin({
      parallel: true,
      extractComments: false, // 是否提取注释文件
      terserOptions: {
        compress: true,
      },
    })],
    runtimeChunk: 'single', // 运行时代码单独分离
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name].[hash:6].bundle.js',
    path: resolveApp('./dist'), // TODO: 静态资源的输出目录。
    // TODO: 默认空字符串。 访问时：host + publicPath + path
    // 建议是：'/'. 本地访问则是：'./'
    // publicPath: "",
    clean: true,
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
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css',
    }),
    // TODO： Html中代码的压缩
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'yao', // webpack-dev-server默认的模板文件名称必须是index.html
      inject: 'head', // false body head true
      cache: true,
      minify: {
        removeAttributeQuotes: false,
        removeComments: true,
        removeRedundantAttributes: true, // 移除多余属性
        collapseWhitespace: true,
        minifyCSS: true, // 压缩内联的css
        minifyJS: {
          mangle: {
            toplevel: true, // 丑化JS
          },
        },
      },
    }),
    // TODO: CSS tree Shaking
    new PurgeCSSPlugin({
      // 匹配所有的路径，排除文件夹
      paths: glob.sync(`${resolveApp('./src')}/**/*`, { nodir: true }),
      safelist() {
        return {
          standard: ['body'],
        }
      },
    }),
    new CompressionPlugin({
      test: /\.(css|js)$/i,
      minRatio: 0.8,
      threshold: 0, // 设置文件从多大开始压缩
      // exclude: /\.map$/i,
      algorithm: 'gzip',
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
