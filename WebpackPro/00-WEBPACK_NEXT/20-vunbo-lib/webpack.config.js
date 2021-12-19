const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'vunbo.js',
    library: 'vunbo', // 包导出后的引用名称
    libraryTarget: 'umd', // AMD/CommonJS/浏览器
    globalObject: 'window' // 全局对象
  }
}
