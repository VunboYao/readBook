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















