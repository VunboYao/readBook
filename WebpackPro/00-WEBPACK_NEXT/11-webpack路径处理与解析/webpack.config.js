const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'), // TODO: 静态资源的输出目录。
    // TODO: 默认空字符串。 访问时：host + publicPath + path
    // 建议是：'/'. 本地访问则是：'./'
    // publicPath: "",
    clean: true,
  },
  devServer: { // webpack-dev-server
    static: {
      directory: path.join(__dirname, 'static'),
      // TODO: 默认值'/' 。告诉服务器在哪个 URL 上提供 static.directory 的内容。如../static/static.js 通过abc/static.js访问
      // publicPath: '/',
      watch: false, // 通过 static.directory 配置项告诉 dev-server 监听文件。默认启用
    },
    port: 7999, // 指定端口号
    open: false,
    compress: true, // gzip压缩
    // hot: true, // 开启模块热更新
    hot: 'only', // 构建失败时不回退
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 路径重写
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true, // 是否改变源host
      },
    },
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
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // vue编译插件
    // new ReactRefreshPlugin(), // react热更新配置
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'yao', // webpack-dev-server默认的模板文件名称必须是index.html
    }),
  ],
}
