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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader',
          options: {
            name: "img/[name].[hash:8].[ext]",
            // outputPath: 'img',
            limit: 10 * 1024
          }
        }
      }
    ]
  }
}
