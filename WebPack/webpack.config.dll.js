const path = require('path')
const Webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    jquery: ['jquery'],
    lodash: ['lodash']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dll'),
    library: '[name]'
  },
  plugins: [
    /*
      DllPlugin作用：
      在打包第三方库的时候生成一个清单文件
    */
    new Webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'dll/[name].manifest.json')
    })
  ]
}
