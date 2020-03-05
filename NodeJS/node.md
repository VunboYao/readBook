# 环境代码区别

- 浏览器内置提供window 全局对象, this 默认指向window
- NodeJS则是global, this 默认指向空对象 {}

# 全局属性和方法

- dirname: 该文件所处的目录
- filename: 当前文件的绝对路径

# 模块暴露的方式

- **都需要先 require 导入**
- exports.xxx = xxx, 不能直接赋值 exports = xxx
- module.exports.xxx = xxx
- global.xxx = xxx

# require 导入注意点

- 可以省略后缀
- 先.js, .json, .node 文件
- 导入自定义模块时,必须添加路径
      
# NPM 包管理

## 全局管理

- npm install -g xx 全局安装
- npm install -g xx@1.0.0 安装特定版本
- npm uninstall -g xxx 卸载
- npm update -g xxx 更新

## 本地管理

- npm config list 查看配置
- npm init -y 初始化 package.json
- npm install xxx (生产环境包依赖)等同于 npm install xxx --save  
- npm install xxx --save-dev (开发环境包依赖) 
- 版本差异:
    - '5.0.3', 表示指定安装的 5.0.3 版本
    - '~5.0.3', 表示安装 5.0.X 中最新的版本
    - '^5.0.3', 表示安装 5.X.X 中最新的版本

# fs

- wirteStream 写入流执行完成后. 需要执行 writeStream.end()
- readStream.pipe(writeStream), 读取流管道方法实现拷贝
