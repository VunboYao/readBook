const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader: 'css-loader', // 简写1：只有一个laoder时
        // use: ['style-loader', 'css-loader'], // 简写2:无需配置时的简写
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              /*
              * TODO：当css中存在@import引入的css时，postcss-loader未能处理。此时需要重新执行postcss-loader重载分析
              * */
            },
          },
          {
            loader: 'postcss-loader',
            // 行内参数
            /* options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            }, */
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
}
