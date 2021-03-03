const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // 使用方式一： 单例使用，二的简写
        // loader: 'css-loader'
        // use: 'css-loader'
        // 使用方式二
       /*  use: [
          {
            loader: 'css-loader',
            options: {}
          }
        ] */

        // 使用方式三： 二的简写
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
  }
}
