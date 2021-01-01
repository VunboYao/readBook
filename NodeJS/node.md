# NVM

- nvm list 查看当前安装的Node.JS所有版本
- nvm install 版本号 安装指定版本的Node.js
- num uninstall 版本号 卸载指定版本的Node.js
- num use 版本号 选择指定版本的Node.js
- nvm list available 查看可下载版本

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
- npm install === npm install --development 安装开发依赖
- npm install --production 安装生产依赖
- 版本差异:
    - '5.0.3', 表示指定安装的 5.0.3 版本
    - '~5.0.3', 表示安装 5.0.X 中最新的版本
    - '^5.0.3', 表示安装 5.X.X 中最新的版本

# fs

- writeStream 写入流执行完成后. 需要执行 writeStream.end()
- readStream.pipe(writeStream), 读取流管道方法实现拷贝

# 核心原理

执行引入的文件，但引入的为字符串，如何执行字符串中的代码？

## 执行字符串代码

- eval， 执行字符串， 存在依赖关系， 字符串可以访问外界数据， 不安全
- new Function， 存在依赖关系， 字符串可以访问外界数据， 不安全

## vm

- vm.runInThisContext: 提供了一个安全的环境执行字符串中的代码。提供的代码不能访问本地的变量， 但是可以访问全局的变量（global上的变量
- vm.runInNewContext: 提供了一个安全的环境执行字符串中的代码。不能访问本地与 global 上的变量

## 手写Node模块系统-代码实现

```js
const path = require('path')
const fs = require('fs')
const vm = require('vm')

class YModule {
    constructor(id) {
        this.id = id // 保存当前模块的绝对路径
        this.exports = {}
    }
}
YModule._cache = {}
YModule._extensions = {
    '.js': function(module) {
        // 1. 读取JS代码
        const script = fs.readFileSync(module.id)
        // 2. 将JS代码包裹到函数中
        const strScript = YModule.wrapper[0] + script + YModule.wrapper[1]
        // 3. 将字符串转换为JS代码
        const jsScript = vm.runInThisContext(strScript)
        // 4. 执行转换之后的JS代码
        jsScript.call(module.exports, module.exports, yRequire)
    },
    '.json': function(module) {
        const json = fs.readFileSync(module.id)
        const obj = JSON.parse(json)
        module.exports = obj
    }
}
YModule.wrapper = ['(function (exports, require, module, __filename, __dirname) {', '\n});']

function yRequire(filePath) {
    // 1. 将传入的相对路径转换为绝对路径
    const absPath = path.join(__dirname, filePath)
    // 2. 尝试从缓存中获取当前模块
    const cachedModule = YModule._cache[absPath]
    if (cachedModule) {
        return cachedModule.exports
    }
    // 3. 如果没有缓存就自己创建一个Module对象
    const module = new YModule(absPath)
    YModule._cache[absPath] = module
    // 4.利用 tryModuleLoad 方法加载模块
    tryModuleLoad(module)
    // 5.返回模块的 exports
    return module.exports
}

function tryModuleLoad(module, filename) {
    // 1.取出模块后缀
    const extName = path.extname(module.id)
    YModule._extensions[extName](module)
}

// const aModule = yRequire('07-core.js')
const aModule = yRequire('./07-core.js')
console.log(aModule);
```

# 面试

- NodeJS 中 this 为什么是空对象？
- **答：call(module.exports)传入的 exports 默认为空**
- NodeJS中为什么可以直接用exports, require, module, __filename, __dirname
- **答：因为以上都是直接传入包装函数的参数**
- NodeJS中为什么不能直接给exports赋值， 而可以给module.exports赋值
- **答：exports 指向 module.exports 的对象，如果直接赋值，将中断对象的连接关系，从而不再相等。**

# EventLoop

- 宏任务， setTimeout, setInterval
- 微任务， promise, MutationObserver, 优先执行

# npm 包发布

- npm addUser
- npm publish

## script

- test: 可省略为 npm test
- start: 同 test
- bin: 添加一个 key/value， 定义全局包