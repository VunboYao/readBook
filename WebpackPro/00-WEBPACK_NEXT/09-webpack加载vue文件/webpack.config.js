const { VueLoaderPlugin } = require("vue-loader");
const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "./dist"), // 绝对路径。当前文件所在的绝对路径
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        // use: ['ts-loader'] // 需要依赖typescript，tsc文件
        use: "ts-loader", // 可以直接使用babel-loader
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", {
          loader: "css-loader",
          options: {
            importLoaders: 1,
          },
        }, "postcss-loader", "less-loader"],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Yao",
      filename: "VunboYao.html",
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new DefinePlugin({
      BASE_URL: "\"./\"",
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};
