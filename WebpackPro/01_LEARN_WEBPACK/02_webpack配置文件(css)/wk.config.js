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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 重新执行之前的loader
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 重新执行之前的loader
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
  }
}
