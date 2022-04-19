const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    // webpack5 export asset fileName
    assetModuleFilename: 'img/[name].[hash:6][ext]',
  },
  resolve: {
    extensions: ['.ts', '.js', '...'],
  },
  devServer: {
    port: 7999,
    open: false,
    compress: true,
    hot: true,
  },
  module: {
    rules: [
      // !css
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
      // !less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      // !图片
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        // type: 'asset/resource', // ! === file-loader
        type: 'asset', // ! === url-loader
        // * config the filename
        generator: {
          filename: 'imgs/[name].[hash:6][ext]',
        },
        // * like url-loader limit
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      // !字体文件
      {
        test: /\.(ttf|eot|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]',
        },
      },
      // !ts配置
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpackDemo',
      template: './public/index.html',
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
  ],
}
