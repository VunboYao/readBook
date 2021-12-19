const { merge } = require('webpack-merge')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const commonConfig = require('./webpack.config.common')
const resolveApp = require('./path')

process.env.isProduction = 'false' // TODO: 字符串

const config = {
  mode: 'development',
  devtool: 'source-map',
  devServer: { // webpack-dev-server
    static: {
      directory: resolveApp('static'),
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
  plugins: [
    // new ReactRefreshPlugin(), // react热更新配置
  ],
}
module.exports = merge([commonConfig, config])
