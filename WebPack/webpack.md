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
    - **`publicPath: 'dist/images'`, 配置文件 public 发布目录（上线后图片地址路径）**
      - devServer时不设置此值
    - `outputPath: './images/'`, **配置文件输出目录，务必使用相对目录，热更新时会导致路径错误**
- 打包字体图标。若字体图标列名失效，css-loader中模块化关闭

    ```js
        // 打包字体图片规则
        {
            test: /\.(eot|json|svg|ttf|woff|woff2)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    publicPath: 'dist/font/',
                    name: '[name].[ext]',
                    outputPath: 'font/'
                }
            }]
        }
    ```

## url-loader

通过`limit`参数将文件加载为`base64`编码的url，如果超出该限制，则打包成独立文件

- limit（byte）: 限制图片的大小。小于该数值的以`base64`格式显示。1kb = 1024，**默认4KB大小**
- 同 file-loader 可设置文件名称，打包路径等。
- mac 环境下，打包时需要设置 `publicPath`，否则路径无效


## css-loader

- 解析 CSS 文件中 @import 和 URL（）, 会 import/require() 后再解析(resolve)它们。
- 分离 CSS 导致的图片解析问题， url 参数为 false
- CSS 模块化，引入的CSS文件必须通过 **`文件名.类名`** 才能生效

```js
{
    loader: 'css-loader',
    options: {
        modules: true， // 启用css模块化
        url: false // 不解析 Url(), 解析CSS中图片引入的路径问题
    }
}
```

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

## sass-loader

npm install sass-loader node-sass --save-dev

```js
{
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
}
```

## postcss-loader

- `npm i -D postcss-loader`, 在css-loader, style-loader之后，,less-loader,sass-loader之前添加postcss-loader
- `npm i -D autoprefixer`, 添加私有前缀
- 1.添加`postcss.config.js`配置文件

    ```js
    module.exports = {
        plugins: {
            'autoprefixer': {
                'overrideBrowserslist': [
                    'ie >= 8',
                    'Firefox >= 3.5',
                    'chrome >= 35',
                    'opera >= 11.5'
                ]
            }
        }
    }
    ````

- 2.不需要配置文件

    ```js
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                require('autoprefixer')(['chrome >= 3'])
            ]
        }
    }
    ```

- `npm i -D postcss-pxtorem`, 将 px 转换为 rem

    ```js
    {
        loader: 'postcss-loader',
        options: {
            plugins: [
                require('autoprefixer')(['chrome >= 3']),
                require('postcss-pxtorem')({
                    rootValue: 100,
                    propList: ['*'] // * 全都转换， 传递特定的属性，则转换特定的属性
                })
            ]
        }
    }
    ```

## image-webpack-loader

- `npm install image-webpack-loader --save-dev`，图片压缩

  ```javascript
  {
      loader: 'image-webpack-loader',
          options: {
              mozjpeg: {
                  progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                  enabled: false,
              },
  			pngquant: {
  				quality: [0.65, 0.90],
  				speed: 4
  			},
  			gifsicle: {
  				interlaced: false,
  			},
  			// the webp option will enable WEBP
  			webp: {
  				quality: 75
  			}
  		}
  },
  ```

  

# 插件

## HtmlWebpackPlugin

- `npm i --save-dev html-webpack-plugin`
- https://github.com/jantimon/html-webpack-plugin#minification

## CleanWebpackPlugin

- 清楚上一次打包残留的文件
- npm i -D clean-webpack-plugin
- `const { CleanWebpackPlugin } = require('clean-webpack-plugin')`

## copy-webpack-plugin

- 拷贝指定的文件
- `npm i -D copy-webpack-plugin`
- `const CopyWebpackPlugin = require('copy-webpack-plugin')`

    ```js
    new CopyWebpackPlugin([{
        from: './src/doc', // 源文件地址
        to: 'doc' // 打包后的地址目录
    }])
    ```

## MiniCssExtractPlugin

- 提取独立css文件

- `npm install --save-dev mini-css-extract-plugin`

- **插件中options里如果名称带有hash,则热更新会失败**

    ```js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    module.exports = {
        plugins: [new MiniCssExtractPlugin()], // 提取css文件名称时，如果有hash,导致热更新失败
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'， // 修复分离背景图片问题
                            hmr: true // 热更新时生效
                        }
                    }, 'css-loader'],
                },
            ],
        },
    };
    ```

## optimization:优化项，压缩CSS

- `npm i -D optimize-css-assets-webpack-plugin`, 压缩css插件
- **但是使用该插件之后，会覆盖webpack默认的压缩JS功能。因此需要独立下载一个压缩JS插件**
- `npm i -D terser-webpack-plugin`

    ```js
    const TerserJSPlugin = require('terser-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
    module.exports = {
        // webpack优化项
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
        plugins: [
            new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            }),
        ],
        module: {
            rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            ],
        },
    };
    ```

# watch

监听文件变化， 当文件修改后会重新编译

```js
watch: true, // 开启监听文件变化
watchOptions: {
    ignored: /node_modules/, // 排除巨大的文件夹
    aggregateTimeout: 300, // 防抖
    poll: 1000 //每隔多少时间检查一次，指定毫秒为单位进行轮询
}
```

# webpack-dev-server

`webpack-dev-server` 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)

- `npm install --save-dev webpack-dev-server`

    > publicPath: 假设服务器运行在 `http://localhost:8080` 并且 [`output.filename`](https://v4.webpack.docschina.org/configuration/output/#output-filename) 被设置为 `bundle.js`。默认 `devServer.publicPath` 是 `'/'`，所以你的包(bundle)可以通过 `http://localhost:8080/bundle.js` 访问
    >
    > ```js
    > module.exports = {
    >       //...
    >       devServer: {
    >         publicPath: '/assets/'
    >       }
    > };
    > ```
    >
    > 现在可以通过 http://localhost:8080/assets/bundle.js 访问 bundle。

    ```js
    devServer: {
        publicPath: './assets', // 用于确定应该从哪里提供入口文件，并且此选项优先
        contentBase: path.join(__dirname, 'public'), // 告诉webpack-dev-server，告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
        port: 2020,
        open: true, // 是否自动打开页面 或者指令中webpack-dev-server --open
        compress: false, // 是否启用压缩
    }
    ```

- 跨越代理 proxy

- 使用方式一

    ```js
    proxy: {
        // 请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
        "/api": {
            "target": "http://localhost:3000",
            "secure": false, // HTTPS跨域
            "changeOrigin": true, // 域名跨域
        },
        "/login": {
            ...
        }
    }
    ```

- 使用方式二. 代理多个特定路径到同一个目标，则可以使用带有上下文属性的一个或多个对象数组

    ```js
    proxy: [{
        context: ["/auth", "/api"],
        target: "http://localhost:3000",
        pathRewrite: {"^/api" : ""} // 重写路径
    }]
    ```

- devServer只能解决开发阶段的问题，因为项目上线之后是将打包好的文件上传到服务器， 而打包后的文件中没有devServer

# webpack热更新

1. 通过webpack-dev-server自动打包并没有真正的放到指定的目录中。因为读写磁盘是非常耗时和消耗性能的，所以为了提升性能， webpack-dev-server将转换好的内容放到了内存中

2. 通过webpack-dev-server可以实时监听打包内容的变化，每次打包之后都会自动刷新网页，因此带了有很多不便，这时就需要通过HMR插件来优化调试开发

3. HMR（HotModuleReplacementPlugin）热更新插件会在内容发生变化的时候更新修改的内容并不会重新刷新网站  

4. **如果分离css下热更新失败，检查分离css的文件名称是否包含hash**

    ```js
    const Webpack = require('webpack')
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
    devServer: {
        contentBase: './dist', // 告诉webpack-dev-server， dist目录下的文件，可以作为访问文件
        port: 2020,
        open: true, // 是否自动打开页面
        compress: false, // 是否启用压缩
        // 热更新服务设置
        hot: true, // 开启热更新，就不会自动刷新网页
        hotOnly: true // 即使不支持热更新，也不刷新网页
    }
    
    // 如果CSS使用分离模块方式，需要增加options
    ```

5. 热更新JS模块

    ```js   
    // demo.js
    function add() {
        const li = document.createElement('p')
        li.innerHTML = 'are you ok123?'
        document.body.appendChild(li)
    }
    export default add
    
    // entry.js
    // 判断当前是否开启热更新
    if (module.hot) {
        // 如果开启热更新，监听当前模块
        module.hot.accept('./dmeo.js', function () {
            const p = document.querySelector('p')
            document.body.removeChild(p)
            add()
        })
    }
    ```

# 转换ES678高级语法

- `npm install --save-dev babel-loader @babel/core`
- `npm install @babel/preset-env --save-dev`

    ```js
    {
        test: /\.js$/,
        exclude: /node_modules/, // 不做处理的目录
        loader: 'babel-loader',
        options: {
            'presets': [
                ['@babel/preset-env', { // 高级版本不做转换
                    "targets": {
                        "chrome": "58"
                    }
                }]
            ]
        }
    }
    ```

# babel低版本语法实现

## 实现方式一

- `npm install --save @babel/polyfill`

    ```js
    // import "@babel/polyfill"; // webpack中配置了useBuiltIns: usage，不用该选项
    options: {
        'presets': [
            ['@babel/preset-env', { // 高级版本不做转换
                "targets": {
                    "chrome": "58"
                },
                "useBuiltIns": "usage" // 只打包用的的语法。避免代码臃肿
            }]
        ]
    }
    ```

## 实现方式二

直接倒入 polyfill 的方式只适用于一般项目开发，但是如果在编写一些第三方模块的时候这种方式会出现一些问题。因为这种方式是通过全局变量的方式来注入代码的，会污染全局环境

1. `npm install --save-dev @babel/plugin-transform-runtime`
2. `npm install --save @babel/runtime`

    ```js
    options: {
        'presets': [
            ['@babel/preset-env', { // 高级版本不做转换
                "targets": {
                    "chrome": "58"
                },
                // "useBuiltIns": "usage"
            }]
        ],
        "plugins": [
            [
                "@babel/plugin-transform-runtime",
                {
                    "absoluteRuntime": false,
                    "corejs": 2, // 需要安装独立的包，只支持全局变量promise和静态属性Array.from
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false,
                    "version": "7.0.0-beta.0"
                }
            ]
        ]
    }
    ```

3. `npm install --save @babel/runtime-corejs2`

## babel-使用技巧

- 查看错误提示
- 根据错误信息查询文档
- 根据文档缺什么就配置什么

# html 中图片解析

- `npm install html-withimg-loader --save`

    ```js
    loaders: [
        {
            test: /\.(htm|html)$/i,
            loader: 'html-withimg-loader'
        }
    ]

    ```

- 错误处理：若新包更新出错，url-loader 中 esModule: false
