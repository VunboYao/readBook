# webpack 安装

- npm init -y
- npm i -D webpack
- npm i -D webpack-cli
- npx webpack 执行编译

# 基础配置

- mode: "production" | "development" | "none"
- entry: 入口。string | object | array
- output：编译打包后的地址
    - filename: 打包后的文件名
    - path: 所有输出文件的目标路径。 必须是绝对值

## webpack 配置注意事项

- 配置文件必须叫： webpack.config.js. 否则输入 npx webpack 打包会出错
- 如果使用其他名称， 在输入打包命令时必须通过 --config 指定配置文件名称 npx webpack --config xxx
- 可将 npx webpack --config xxx 该命令配置到 package.json 文件中 

# source map

保存打包之前与打包之后的错误代码映射关系

## devtool 选项

通过此选项控制是否生成， 以及如何生成 source map

## 各配置项说明

- eval: 不会单独生成 source map 文件，会将映射关系存储到打包的文件中，并且通过 eval 存储
    - 优点：性能最好
    - 缺点：业务逻辑比较复杂时提示信息不全面不正确
- source-map: 会单独生成 sourcemap 文件，通过单独文件来存储映射关系
    - 优点：提示信息全面，可以直接定位到错误代码的行和列
    - 缺点：打包速度慢
- inline: 不会单独生成 sourcemap 文件，会将映射关系存储到打包的文件中，并且通过 base64 字符串形式存储
- cheap: 生成的映射信息只能定位到错误行不能定位到错误列
- module: 不仅希望存储代码的映射关系，还希望存储第三方模块映射关系。以便于第三方模块出错时也能更好的排错

## 企业开发配置

- development: `cheap-module-eval-source-map`, 只需要错误行信息， 并且包含第三方模块错误信息，并且不会生成单独sourcemap文件
- production: `cheap-module-source-map`, 只需要错误行信息， 并且包含第三方模块错误信息， 并且会生成单独的sourcemap文件

# Loaders

## file-loader

让 webpack 将文件转换为 webpack 可以识别的模块

- 如果通过 require 引入的图片，打包后需要通过 xxx.default 获取打包后的图片名称
- options{}
    - 若图片地址报错，需要在对应的 options 选项中，配置打包后的 publicPath 文件目录。
    - 默认情况下， 打包后的图片名称为文件内容的 MD5 哈希值
    - `name:'[name].[ext]'`属性，控制打包后图片名
    - `publicPath: 'dist/images'`, 配置文件 public 发布目录
    - `outputPath: 'images/'`, 配置文件输出目录

## url-loader

通过`limit`参数将文件加载为`base64`编码的url，如果超出该限制，则打包成独立文件

- limit（byte）: 限制图片的大小。小于该数值的以`base64`格式显示。1kb = 1024
- 同 file-loader 可设置文件名称，打包路径等。
- mac 环境下，打包时需要设置 `publicPath`，否则路径无效

## css-loader

解析 CSS 文件中 @import 和 URL（）, 会 import/require() 后再解析(resolve)它们。

## style-loader

将 CSS 添加到 DOM 节点的 style 标签中

```js
{
    test: /\.css$/,
    // use: ['style-loader', 'css-loader']
    use: [{
            // 将webpack处理之后的内容插入到HTML的style标签中
            loader: 'style-loader'
        },
        {
            // 解析css文件中的@import依赖关系
            loader: 'css-loader'
        }
    ]
}
```

## loader特点

- 单一原则，一个loader只做一件事
- 多个loader按照从右到左， 从下到上依次执行

## less-loader

npm i -D less less-loader

```js
{
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
}
```
