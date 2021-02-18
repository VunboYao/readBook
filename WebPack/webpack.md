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

```js
{
    // loader: 'file-loader', // 将文件打包后，并提供路径访问
    loader: 'url-loader', // 同file-loader，增加了limit限制
        options: {
            esModule: false,
            limit: 1024, // 限制图片大小，小于此值会转为base64
            // publicPath: 'http://127.0.0.1:2021/img', // 自定义输出文件路径（上线后图片地址更换）。devServer时不设置此路径。设置则只能是./img
            name: '[name].[ext]',
            outputPath: './img/' // 指定图片打包到特定的目录下
        }
}
```




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

  

## ESLint代码格式检查

### 安装

```js
npm install eslint-loader --save-dev
npm install eslint --save-dev
```

### 配置

```js
{
  test: /\.js$/,
  enforce: 'pre', // 当前loader优先执行
  include: path.resolve(__dirname, 'src'), // 检查src目录下代码格式
  exclude: /node_modules/, // 排除文件
  loader: 'eslint-loader',
  options: {
    fix: false // 打包时自动修复
  }
}
```

```js
// .eslinttrc.js配置文件
module.exports = {
  root: true, // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  parserOptions: {
    ecmaVersion: 10, // 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本
    sourceType: 'module' //  设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
  },
  // 继承规则
  extends: [
    'standard'
  ],
  // 扩展或覆盖规则
  rules: {
    /*
    * "off" 或 0 - 关闭规则
    * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    * */
    semi: ['error', 'never'], // 禁止使用分号
    indent: ['error', 2],
    'no-console': [
     	'error', {
        allow: ['warn', 'error']
      }
    ],
    quotes: ['error', 'single'] // 单引号
  },
  env: { // 环境定义
    browser: true,
    node: true,
    es6: true // 启用除了 modules 以外的所有 ECMAScript 6 特性
  }
}
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

## 配置文件优化

- 公共的配置文件: `webpack.config.common.js`

- 开发的配置文件：`webpack.config.dev.js`

- 生产的配置文件: `webpack.config.prod.js`

- 插件安装：`npm i -D webpack-merge`

  ```js
  const { merge } = require('webpack-merge')
  const CommonConfig = require('./webpack.config.common')
  const config = {}
  module.exports = merge(CommonConfig, config)
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

# 合并精灵图

`cnpm i -D postcss-sprites postcss`

```js
// postcss.config.js
module.exports = {
	plugins: {
		'autoprefixer': {
			'overrideBrowserslist': [
				// 'ie >= 8',
				// 'Firefox >= 3.5',
				'chrome >= 32',
				// 'opera >= 11.5'
			]
		},
		// 合并精灵图
		"postcss-sprites": {
			// 告诉webpack合并之后的图片保存到什么位置
			spritePath: './dist/img',
			// 告诉webpack合并图片的时候如何分组
			groupBy: function (image) {
				// url: '../images/animal/animal1.png'
				let path = image.url.substr(0, image.url.lastIndexOf('/'))
				let name = path.substr(path.lastIndexOf('/') + 1)
				// 必须返回promise
				return Promise.resolve(name)
			},
			// 过滤图片合并
			filterBy: function (image) {
				let path = image.url
				if (!/\.png$/.test(path)) {
					return Promise.reject()
				}
				return Promise.resolve()
			}
		}
	}
}
```

# 进阶

## TreeShaking

```js
// 告诉webpack只打包导入模块中用到的内容
  optimization: {
    usedExports: true
  }

// package.json文件中
"sideEffects": ["*.css", "*.less", "*.scss"] // 遇到此类文件不过滤
```

## CSSTreeShaking

- `npm i -D purifycss-webpack purify-css glob-all`

```js
const PurifyCSSPlugin = require('purifycss-webpack')
const glob = require('glob-all')

// 提取使用的CSS
new PurifyCSSPlugin({
    paths: glob.sync([
     		// 告诉需要过滤哪些文件
        path.join(__dirname, 'src/*.html'),
        path.join(__dirname, 'src/js/*.js')
    ])
})
```

## 代码分割(code-splitting)

新增配置

```js
// 告诉webpack启动代码分割
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```

## 异步加载模块

```js
function getComponent () {
  return import('jquery').then(({ default: $ }) => {
    const oDiv = $('<div>i am Div</div>')
    return oDiv
  })
}
document.getElementById('btn').onclick = function () {
  getComponent().then(res => {
    document.body.appendChild(res[0])
  })
}
```

## 异步模块预加载prefetch

- prefetch(预取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源

```js
// 预加载jquery, 同时打包名称更改
import(/* webpackPrefetch: true *//* webpackChunkName: "jquery" */'jquery')
```

## 浏览器长缓存优化

浏览器会自动缓存网页上的资源，以便于提升下次访问的速度。

**`hash/chunkhash/contenthash`**

- **hash**: 根据每次编译打包的内容生成的哈希值，每次打包都不一样，不能很好利用缓存，不推荐
- **chunkhash**: 根据不同的入口文件（Entry）进行依赖文件解析、构建对应的chunk，生成对应的哈希值。在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着采用chunkhash的方式生成哈希值，那么只要不改动公共库的代码，就可以保证哈希值不受影响。**只支持css和js,不支持img等其他资源**
- **contenthash（推荐）**：根据某个文件内容生成的哈希值，只要某个文件内容发生改变，该文件的contenthash就会发生变化
- **开发模式下：热更新插件与长缓存优化存在冲突，需要关闭热更新**

```js
// JS打包文件名中添加hash值
output: {
    filename: 'js/[name].[contenthash:8].js', // 输出文件名
    path: path.resolve(__dirname, 'dist') // 输出文件路径
},
// 图片解析
{
    // loader: 'file-loader', // 将文件打包后，并提供路径访问
    loader: 'url-loader', // 同file-loader，增加了limit限制
    options: {
       esModule: false,
       limit: 1024, // 限制图片大小，小于此值会转为base64
       // publicPath: 'http://127.0.0.1:2021/img', // 自定义输出文件路径（上线后图片地址更换）。devServer时不设置此路径。设置则只能是./img
       name: '[name].[contenthash:8].[ext]',
       outputPath: './img/' // 指定图片打包到特定的目录下
    }
},
// 提取CSS到单独的文件
new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css'
})
```

## SplitChunksPlugin

```js
  // 告诉webpack启动代码分割
  optimization: {
    splitChunks: {
      chunks: 'async', // 对哪些代码进行分割 async（只分割异步加载模块）、all(所有导入模块)
      minSize: 30000, // 表示被分割的代码体积至少有多大才可以分割（单位字节）
      maxSize: 0,
      minChunks: 1, // 表示至少被引用多少次才可以分割，默认1
      maxAsyncRequests: 5, // 异步加载并发最大请求数
      maxInitialRequests: 3, // 最大初始化请求数
      automaticNameDelimiter: '+', // 指定被分割的文件名称的连接符
      name: true, // 拆分出来的名字使用0/1/2，还是指定名称
      /*
      * 缓存组：将当前文件中导入的所有模块都缓存起来统一处理
      * */
      cacheGroups: {
        /*
        * 1.默认情况下，如果所有的模块都是从node_modules中导入的，那么会将所有从node_modules中导入的模块打包到同一个文件中
        * 2.默认情况下，如果所有的模块都不是从node_modules中导入的，那么会将所有不是从node_modules中导入的模块打包到同一个文件中
        * 3.如果当前文件中导入的模块有的是从node_modules中导入的，有的不是从node_modules中导入的，那么会将所有从node_modules中导入的打包到一个文件，不是从node_modules中导入的打包到一个文件
        * */
        /*
        * vendors: 专门用户处理从node_modules中导入的模块
        *           将所有从node_modules中导入的模块写入到一个文件中
        * */
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 优先级加强
        },
        /*
        * default: 专门用于处理从任意位置导入的模块
        *           会将所有从任意位置导入的模块写入到一个文件中
        * */
        /*
        * 注意点：如果导入的模块同时满足了两个条件。通过priority优先级控制，只写入高优先级
        *
        * */
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true // 是否复用分割的代码
        }
      }
    }
  }
```

