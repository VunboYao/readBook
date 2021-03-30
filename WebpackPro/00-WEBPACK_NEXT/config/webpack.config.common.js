const resolveApp = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolveApp('./dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [
          'style-loader',
          { loader: 'css-loader' },
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['postcss-preset-env'],
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new CleanWebpackPlugin()],
}

module.exports = config
