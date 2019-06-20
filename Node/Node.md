## ```babel```

- npm install --save-dev @babel/core @babel/cli @babel/preset-env

- script脚本命令： `babel src -d dist`  -d(destination目的地，终点)
  
- .babelrc 配置文件
  
  ```javascript
  {
    "presets": ["@babel/preset-env"]
  }
  ````

## http 协议
- createServer 创建服务
    - listen 监听端口
- request 请求
    - url 路径地址
- response 响应
    - writeHeader
    - write
    - end, **必须写**
- get 数据
    - 在 `req.url`里面, `url.parse(req.url, true)`
- post 数据
    - 数据较大
    - 监听`req.on('data', data => {})`
    - 监听`req.on('end', () => {})`

## fs file System
- readFile(文件名，回调)
    - 回调参数：error,data
    - data 为 Buffer 对象(二进制数据)
- writeFile(文件名，内容，回调)
    - 回调参数：error

## exports 和 module.exports 的区别
- exports 只能使用(.)点语法来向外暴露内部变量. exports.xxx = xxx;   exports 是 module.exports 的一个引用.
- module.exports 既可以通过点语法, 也可以直接赋值一个对象
- **module.exports 包含了 exports.**
- module.exports 指向一个对象, exports 指向对象的属性. **值类型与引用类型**

## 进程与线程

- 一个程序中有多个进程, 每个进程由多个线程组成
- 程序中有一个主进程, 进程中有一个主线程
- 主进程结束, 程序结束

**进程拥有独立的执行空间, 存储**

**同一个进程内的所有线程共享一套空间,代码**

- 多进程: 成本高(慢)   **优点**--安全(进程间隔离)       进程间通信麻烦           写代码简单
- 多线程: 成本低(块)   **缺点**--不安全(线程同时中断)    线程间通信容易        写代码复杂



## url

- url.parse(req.url, [true]), 路径解析, **整个地址**

## querystring

- qs.parse(data), 路径解析, **仅仅解析数据**



## NPM

- npm root -g 获取全局安装的路径

  

## webpack

- 初始化：`npm init -y`

- 安装： `npm i webpack webpack-cli -D`

- 执行： `npx webpack`

  ```javascript
  const path = require('path');
  
  module.exports = {
    mode: 'development', // 模式，production/development
    entry: './src/index.js', // 入口
    output: {
      filename: 'bundle.[hash:8].js', // 打包后的文件名, hash 8位
      path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
    },
  }
  ```

### webpack-dev-server, 本地服务

- `npm i webpack-dev-server -D`

  ```javascript
   devServer: {
      port: 3000,
      progress: true, // 进度条
      // contentBase: './dist', // 初始地址
      compress: true, // 压缩
      open: true // 自动打开
    }
  ```

### 复制HTML

- `cnpm i html-webpack-plugin -D`

  ```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  plugins: [ // 数组，放着所有的webpack插件
      new HtmlWebpackPlugin({
        template: './src/index.html', // 模板
        filename: 'index.html', // 打包后的文件名
        minify: {
          removeAttributeQuotes: true, // 删除双引号
          collapseWhitespace: true, // 折叠一行
        },
        hash: true, // 哈希戳
      })
    ],
  ```

### loader

`cnpm i css-loader style-loader -D`

- **css-loader**解析 `@import`语法,路径等
- **style-loader**将 css 插入到 head 的标签中
- **loader**特点, 单一
- 多个 **loader** 需要用到数组
- **loader**的顺序, **从右向左, 从下到上**

```javascript
 module: { // 模块
    rules: [ // 规则
      {
        test: /\.css$/i, // 正则匹配
        use: [
          {
            loader: 'style-loader', // 插入到head标签中
            options: {
              insertAt: 'top', // 置顶
            }
          },
          'css-loader', // 解析路径 @import 等
        ]
      },
   ]
 }
```

### less

- `cnpm i less less-loader -D`

  ```javascript
  {
      test: /\.less$/i,
          use: [
              {
                  loader: 'style-loader',
                  options: {
                      insertAt: 'top'
                  }
              },
              'css-loader', // @Import 解析路径
              'less-loader' // 转换less => css
          ]
  },
  ```

### scss

- `cnpm i node-sass sass-loader -D`

  ```javascript
  {
      test: /\.scss$/i,
          use: [
              {
                  loader: 'style-loader',
                  options: {
                      insertAt: 'top'
                  }
              },
              'css-loader',
              'sass-loader'
          ]
  },
  ```

### stylus

- `cnpm i stylus stylus-loader -D`

### 抽离CSS

- ` cnpm i mini-css-extract-plugin -D`

  ```javascript
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  
  // plugins
  new MiniCssExtractPlugin({
      filename: 'main.css', // 抽离css的文件名
  })
  
  // module
  rules: [ // 规则
      {
          test: /\.css$/i,
          use: [
              MiniCssExtractPlugin.loader,// 抽离css,link链接
              // 'style-loader',
              'css-loader'
          ]
      },
  ]
  
  ```

### CSS前缀

- `cnpm i autoprefixer postcss-loader -D`

  ```javascript
   module: { // 模块
      rules: [ // 规则
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,// 抽离css,link链接
            'css-loader', // 解析路径 import等
            'postcss-loader'// 先添加前缀
          ]
        },
        {
          test: /\.less$/i,
          use: [
            'style-loader',
            // MiniCssExtractPlugin.loader, // 若不抽离,则添加至head标签中
            'css-loader', // @Import 解析路径
            'postcss-loader',
            'less-loader' // 转换less => css
          ]
        },
     ]
   }
  
  // postcss配置 postcss-config.js
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
  ```

-  **autoprefixer 失效原因**, **packpage.json文件中新增字段 browserslist**,无效则版本号增大

  ```javascript
  "browserslist": [
      "last 5 version"
  ]
  ```

### CSS优化插件(压缩)

- `cnpm i optimize-css-assets-webpack-plugin -D`, CSS压缩
- `cnpm i terser-webpack-plugin -D`, JS压缩
- **压缩需要为生成模式(mode: production)**

- To minify the output, use a plugin like [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin). Setting `optimization.minimizer` overrides the defaults provided by webpack, so make sure to also specify a JS minimizer:

```javascript
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
        new TerserJSPlugin({ // 优化CSS
            cache: true, // 缓存
            parallel: true, // 并发打包压缩
            sourceMap: true, // 源码映射
      	}), 
        new OptimizeCSSAssetsPlugin({})], // 优化JS
  },
};
```

### JS转换-Babel

- `cnpm i babel-loader @babel/core @babel/preset-env -D`

  ```javascript
  module: {
      rules: [
          {
              test: /\.js$/i,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env'],
                      plugins: [
                          '@babel/plugin-proposal-class-properties'
                      ]
                  }
              }
          }
      ]
  }
  ```

  

- `cnpm i @babel/plugin-proposal-class-properties -D`, **class 语法转ES5**

### ES7 generator 转 ES5

- `npm install --save-dev @babel/plugin-transform-runtime`

- `npm install --save @babel/runtime`, 生产依赖

  ```javascript
  {
    "plugins": ["@babel/plugin-transform-runtime"]
  }
  ```

- 匹配对应文件

  ```javascript
  {
      test: /\.js$/i,
      use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env'],
              plugins: [
                  '@babel/plugin-proposal-class-properties',
                  "@babel/plugin-transform-runtime"
              ]
      	}
      },
      include: path.resolve(__dirname, 'src'), 
      exclude: /node_modules/, // 不包含文件
  },
  ```

- ES7实例语法转低级

  ```javascript
  npm install --save @babel/polyfill // 7.4.0废弃
  
  // 项目入口文件处
  require("@babel/polyfill");
  ```

### Eslint 校验代码

- `cnpm i eslint eslint-loader -D`

  ```javascript
  module: {
      rules: [
          {
          enforce: 'pre', // previous 需要先执行
          test: /\.js$/i,
          use: {
            loader: 'eslint-loader',
          },
        },
      ]
  }
  ```

- `.eslintrc.json`配置文件

### 全局loader

- pre 前面执行的loader

- normal 普通loader

- 内联loader

- 后置loader postloader

  

1. **`cnpm i expose-loader -D`, 暴露全局的loader**

```javascript
// 暴露到window上
// 内联loader
// expose-loader?$!fileName
import $ from "expose-loader?$!jquery";
console.log(window.$);
```

2. **另一种规则配置**

```javascript
// 所有模块提供一个$
module: {
    rules: [
       {
        test: require.resolve('jquery'),
        use: "expose-loader?$"
      },
    ]
}
```

webpack插件引入, **使用时将不再需要import和require进行引入，直接使用即可**

```javascript
const webpack = require('webpack');

// plugins
 new webpack.ProvidePlugin({// 在每个模块中都注入 $
     $: 'jquery'
 })
```

3. **externals 不打包配置**

- 以 cdn 的方式引入一个库, 不进行打包.

- 引入一个库,但不打包, 以全局变量的模式加载所引入外部的库()

```javascript
// 引入不打包
module.exports = {
    externals: {
    jquery: 'jQuery'
  },
}
```

### 图片导入

- 在 JS 中创建图片来引入

  - `cnpm i file-loader -D`
  - file-loader 默认会在内部生成一张图片到build目录下，把生成的图片的名字返回回来

  ```javascript
  // js
  import logo from './home.png'
  
  let image = new Image();
  image.src = logo;
  document.body.appendChild(image);
  
  // config
  module: {
      rules:[
         {
            test: /\.(png|jpg|gif)$/i,
            use: 'file-loader'
         }
      ]
  }
  ```

  - sass/less 中默认支持CSS引入背景图片引入

- html 中图片地址的引入

  - `cnpm i html-withimg-loader -D`

    ```javascript
    {
        test: /\.html$/,
        use: 'html-withimg-loader'
    }
    ```

- url-loader, 超出一定的大小，则使用原图片，否则使用base64

  - `cnpm i url-loader -D`

  ```javascript
  {
      test: /\.(png|jpg|gif)$/i,
      // 限制，当图片小于？k时， 用 base64
      // 否则用file-loader
      use: {
      	loader: 'url-loader',
          options: {
              limit: 300 * 1024，
              outputPath: '/img/'， // 输出路径选择
          }
      }
  },
  ```

  

### 公共路径

```javascript
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "http://localhost:63342/webpack/dist",// 所有资源前都有该路径
  },
```

- 单独为图片加上公共路径（publicPath)

  ```javascript
  {
      test: /\.(png|jpg|gif)$/i,
      // 限制，当图片小于？k时， 用 base64
      // 否则用file-loader
      use: {
      	loader: 'url-loader',
          options: {
              limit: 300 * 1024，
              outputPath: '/img/'， // 输出路径选择,
              publicPath: "http://localhost:63342/webpack/dist/img/"
          }
      }
  },
  ```

### 多页应用

- **多入口**

  ```javascript
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  ```

- **出口**

  ```javascript
  output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
  }
  ```

- **html多页面配置**

  ```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  plugins: [
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          filename: 'index.html',
          chunks: ['index'], // 入口包name
      }),
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          filename: 'other.html',
          chunks: ['other'], // 入口包name
      }),
  ]
  ```


### **source-map**

```javascript
module.exports = {
    devtool: 'source-map', // 增加映射文件， 帮助调试bug
    
}
```

- source-map,源码映射， **单独生成一个** sourceMap文件，出错后标识当前行, 大而全，独立

- eval-source-map, 不会产生单独的文件，但是可以显示行和列
- cheap-module-source-map, 不会产生列， 但是是一个**单独的映射文件**

- cheap-module-eval-source-map,不会产生文件，集成在打包后的文件中， 不会产生列

### watch

**实时编译**打包文件

```js
module.exports = {
    watch: true,
    watchOptions: {
        poll: 3000, // 每2秒更新一次
        aggregateTimeout: 600, // 防抖， 将这段时间内进行的任何其他更改都聚合到一次重新构建里
        ignored: /node_modules/,
    }
}
```

### clean-webpack-plugin

- `cnpm i clean-webpack-plugin -D`

  ```js
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  plugins: [
      new CleanWebpackPlugin(), // 清空dist文件
  ]
  ```

### CopyWebpackPlugin

- `npm install --save-dev copy-webpack-plugin`

  ```js
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  plugins: [
      new CopyWebpackPlugin([
        {from: './doc'}
      ]),
  ]
  // from: Required
  ```

### BannerPlugin

​	为每个 chunk 文件头部添加 banner

```js
new webpack.BannerPlugin(banner)
```

### webpack跨越配置

- 代理

```js
devServer: {
    proxy: {
      // '/api': 'http://localhost:3000', // 配置代理  api开头去 localhost: 3000
      '/api': { // 当接口不是 api开头时
        target: 'http://localhost:3000',
        pathRewrite: {"^/api" : ""}
      }
    }
}
```

- 单纯模拟数据

```js
devServer: {
    // 单纯模拟数据
    before(app) { // 提供的方法
        app.get('/user', (req, res) => {
            res.json('VunboYao-before');
        })
    }
}
```

- 服务端启动webpack

  `cnpm i webpack-dev-middleware -D`

  `webpack-dev-middleware` 是一个包装器，通过将webpack配置文件传递给服务器端。由服务端来启动。使用共同的端口，解决跨域问题

  ```JS
  let express = require('express');
  let app = express()
  const webpack = require('webpack');
  
  // 中间件
  const middle = require('webpack-dev-middleware');
  const config = require('./webpack.config');
  
  let compiler = webpack(config)
  app.use(middle(compiler))
  
  app.get('/user', (req, res) => {
      res.json('VunboYao1');
  })
  
  app.listen(3000)
  ```

### resolve解析

- `resolve.modules`，参数`array`, 告诉 webpack 解析模块时应该搜索的目录
- `resolve.extensions`, 参数`array`，自动解析确定的扩展，能够使用户在引入模块时不带扩展， 默认值为`['.js', '.json']`

- `resolve。mainFields`, 参数`array`，当从 npm 包中导入模块时， 此选项决定在`package.json`使用哪个字段导入模块.

- `resolve.alias`, 参数 `object`,创建 `import` 或 `require` 的别名，来确保模块引入变得更简单

```js
 module.exports = {
     resolve: { // 解析 第三方包 common
        // modules: [path.resolve('node_modules')], // 只在当前目录中查找
        extensions: ['.js', '.css', '.json'],// 自动解析确定的扩展名
        mainFields: ['style', 'main'], // 先找style文件
        alias: { // 别名
          bootstrap: 'bootstrap/dist/css/bootstrap.min.css'
        }
      },
 }
```

### 环境变量（开发/生产）

```js
plugins: [
    new webpack.DefinePlugin({
        DEV: JSON.stringify('DEV'),
        FLAG: 'true',
        expression: '1+1'
    })
]

// index.js
let url = '';
if (DEV === 'DEV') {
  url = 'http://localhost:8080'
} else {
  url = 'http://www.zhufengpeixun.cn'
}

console.log(DEV, url); // DEV http://localhost:8080
console.log(typeof FLAG); // boolean
console.log(typeof expression, expression); // number 2
```

### 区分不同环境

`cnpm i webpack-merge -D`

```js
// webpack.config.js => webpack.base.js
// + webpack.dev.js
const {smart} = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = smart(base, {
  mode: 'development',
  devServer: {

  },
  devtool: 'source-map'
})


// + webpack.prod.js
const {smart} = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = smart(base, {
  mode: 'production',
  optimization: {
    minimizer: []
  },
  plugins: []
})

```

执行脚本：`npm run build --config webpack.prod.js`

### noParse

```js
module.exports = {
    module: {
        noParse: /jquery/, // 不去解析jQuery中的依赖关系
    }
}
```



### IgnorePlugin

忽略插件中引入的包

```js
const webpack = require('webpack');
plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 忽略 moment 中的locale文件
]
```

### 动态链接库

`npm i react react-dom -D`

```js
// index.js
import React from 'react';
import {render} from 'react-dom';

render(<h1>jsx</h1>, window.root);
       
// index.html
<div id="root"></div>
```

独立打包 react react-dom

```js
// +webpack.config.react.js

let path = require('path');
let webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js', // 产生的文件名
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]', // _dll_react
    // libraryTarget: 'var' // commonjs umd this  默认为var
  },
  plugins: [
    new webpack.DllPlugin({ //name == library
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}

// webpack.config.js
plugins: [
     new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
]
```

- 先执行webpack.config.react.js， 将react react-dom先打包
- 执行文件时动态链接。不必每次重新再打包react react-dom

### 多线程打包

`cnpm i happypack -D`

```js
const HappyPack = require('happypack'); // 多线程打包

module: {
    rules: [
       {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: 'HappyPack/loader?id=js' // id等于相应的文件名
      },
    ]
}

plugins: [
    new HappyPack({
      id: 'js',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }]
    }),
]
```

### webpack自带优化

**生产环境下**， 去除未用到的代码

```js
// ohter.js
let sum = (a, b) => {
  return a + b + 'sum';
}
let minus = (a, b) => {
  return a + b + 'minus';
}

export default {
  sum,minus
}

// index.js
import calc from './other';
// import 在生产环境下，会自动删除没用的代码
// tree-shaking 把没用到的代码自动删除掉
console.log(calc.sum(1,2)); // 此时打包后的代码中，只有sum方法


const a = require('./other');
// common.js的放入引入。会将数据放在 default 下
// require 在生产环境下，不会删除没用的代码
console.log(a.default.minus(3,1));
```

**简化代码**,去除冗余定义

```js
const c = 1;
const b = 3;
console.log(c + b, '---------'); // 在webpack中自当省略 可以简化代码
```

### 抽离公共代码

当多个模块使用到相同的代码模块时，将相同的模块进行代码抽离

```js
module.exports = {
    optimization: {
    splitChunks: { // 分割代码块
      cacheGroups: { // 缓存组
        common: { // 公共模块
          chunks: 'initial', // 初始化时
          minSize: 0, // 大小
          minChunks: 2, // 使用次数？以上
        },
        // 第三方库抽离
        vendor: {
          priority: 1, // 优先级
          test: /node_modules/, // 抽离node_modules中的文件
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
}
```

### 懒加载

`cnpm i @babel/plugin-syntax-dynamic-import -D`

```js
// index.js
let button = document.createElement('button');
button.innerHTML = 'Hello';

// vue的路由懒加载， react
button.addEventListener('click', function() {
  // 草案中的语法， jsonP实现动态加载文件
  import('./other.js').then(data => {
    console.log(data.default);
  })
})

document.body.appendChild(button);


// webpack.config.js
rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.resolve('src'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import', // 插件
          ]
        }
      }
    }]
```

