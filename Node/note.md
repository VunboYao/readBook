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
    - write
    - end

## fs file System
- readFile(文件名，回调)
    - 回调参数：error,data
- writeFile(文件名，内容，回调)
    - 回调参数：error

## exports 和 module.exports 的区别
- exports 只能使用(.)点语法来向外暴露内部变量. exports.xxx = xxx;   exports 是 module.exports 的一个引用.
- module.exports 既可以通过点语法, 也可以直接赋值一个对象
- **module.exports 包含了 exports.**
- module.exports 指向一个对象, exports 指向对象的属性. **值类型与引用类型**
