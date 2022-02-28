# commonJS

## exports

- node 中实现 CommonJS 的本质是对象的引用赋值
- exports 默认导出的是一个空对象
- exports.xxx 导出的任意变量，在任何模块以 exports.xxx 更改后，都可以在其他模块实现变更

# module.exports

- CommonJS 中没有 module.exports
- NodeJS 本质上是 module.exports 在导出
- module.exports = exports
- 若 module.exports = {}， 则 module.exports 不再引用 exports.
- exports 的意义是 NodeJS 实现 CommonJS 规范
- **module.exports = exports 操作在顶层**
- module 本质是一个类：Module。内部有 this.exports = {}, 然后 exports = module.exports

## require

- NodeJS 中 require 方法的加载过程是同步的（性能：服务器同一个目录，没啥影响）
- require 本质是一个函数，动态执行

# ESModule

- 异步加载
- export { xxx } 实际导出的是 xxx 的引用，**不是值**
- 导出的数据，在**模块环境记录**中 Bindings（实时绑定）。`const name = name`
- 导入的数据，从**模块环境记录**中引入。
- **模块环境记录，实时数据监控记录并分发，上游可以改下游。下游禁止改 const 声明的常量**
  - 如果导出的是一个对象 XXX，下游可以更改对象内部的属性，因为指向*同一块内存空间*

## import()

- 异步加载，返回一个 Promise

# CommonJS 和 ES Module 交互

- 通常情况下，CommonJS 不能加载 ESModule
  - 因为 CommonJS 是同步加载的，但是 ES Module 必须经过静态分析等，无法在这个时候执行 JavaScript 代码
  - Node 中不支持
  - webpack 可以
- ESModule 可以加载 CommonJS

# NodeJS 中 this

this 为空对象({}). 源码内部 call 绑定了 exports, 该值默认赋值是 {}

# yarn

| NPM | Yarn |
|---|---|
|npm install | yarn install |
|npm install xxx|yarn add xxx|
|npm install --save xx|yarn add xxx|
|npm install --save-dev xxx|yarn add xxx --dev/-D|
|npm rebuild|yarn install --force|
|npm uninstall xxx|yarn remove xxx|
|npm uninstall --save xxx|yarn remove xxx|
|npm uninstall --save-dev xxx|yarn remove xxx|
|npm cache clean|yarn cache clean|
|rm -rf node_modules && npm install|yarn upgrade|

# where & which

快捷查看命令所在的位置：`where npm`

# process.argv

包含启动 Node.js 进程时传入的命令行参数

# process.env.NODE_ENV

process.env下，此属性默认并不存在，自己配置。

```js
// node xxx --environment NODE_ENV:development
let argv = process.argv // 获取命令行中的参数
if (argv[2] === '--environment') { // 判断参数环境
	let arr = argv[3].split(':') // 切割命令行信息
	console.log('环境变量设置是：', process.env[arr[0]] = arr[1]) // 设置相关环境变量
	console.log(process.env)
}

// package.json 中脚本
// "argvTest": "node 00HelloWorld.js --environment NODE_ENV:development"
```

# 事件循环

`async,await`是 Promise 的一个语法糖（实则是Promise+Generator+iterator）
- 可以将await关键字后边执行的代码，看作是包裹在`(resolve, reject) => {函数行} 中的代码`, 会立即执行
- await 的下一条语句，可以看作是`then(res => {函数行})`中的代码

## Node = V8 + LibUV

- `LibUV`提供了一个线程池
  - 轮训获取结果，将对应的回调放到事件循环(某一个事件队列)中