## babel

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

  

