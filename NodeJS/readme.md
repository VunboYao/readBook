# commonJS

## exports

- node 中实现 CommonJS 的本质是对象的引用赋值
- exports 默认导出的是一个空对象
- exports.xxx 导出的任意变量，在任何模块以 importExportsName.xxx 更改后，都可以在其他模块实现变更

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

| NPM                                | Yarn                  | pnpm              |
| ---------------------------------- | --------------------- | ----------------- |
| npm install                        | yarn install          | pnpm add          |
| npm install xxx                    | yarn add xxx          | pnpm add          |
| npm install --save xx              | yarn add xxx          | pnpm add          |
| npm install --save-dev xxx         | yarn add xxx --dev/-D | pnpm add -D xxx   |
| npm rebuild                        | yarn install --force  |
| npm uninstall xxx                  | yarn remove xxx       | pnpm remove       |
| npm uninstall --save xxx           | yarn remove xxx       | pnpm remove -P xx |
| npm uninstall --save-dev xxx       | yarn remove xxx       | pnpm remove -D xx |
| npm cache clean                    | yarn cache clean      |
| rm -rf node_modules && npm install | yarn upgrade          | pnpm up --latest  |

# where & which

快捷查看命令所在的位置：`where npm`

# process.argv

包含启动 Node.js 进程时传入的命令行参数

# process.env.NODE_ENV

process.env 下，此属性默认并不存在，自己配置。

```js
// node xxx --environment NODE_ENV:development
let argv = process.argv // 获取命令行中的参数
if (argv[2] === '--environment') {
	// 判断参数环境
	let arr = argv[3].split(':') // 切割命令行信息
	console.log('环境变量设置是：', (process.env[arr[0]] = arr[1])) // 设置相关环境变量
	console.log(process.env)
}

// package.json 中脚本
// "argvTest": "node 00HelloWorld.js --environment NODE_ENV:development"
```

# 事件循环

连接着应用程序的 JS 和系统调用之间的通道

`async,await`是 Promise 的一个语法糖（实则是 Promise+Generator+iterator）

- 可以将 await 关键字后边执行的代码，看作是包裹在`(resolve, reject) => {函数行} 中的代码`, 会立即执行
- await 的下一条语句，可以看作是`then(res => {函数行})`中的代码

## Node = V8 + LibUV

- `LibUV`提供了一个线程池
  - 轮训获取结果，将对应的回调放到事件循环(某一个事件队列)中

## 阻塞和非阻塞，同步和异步的区别？

- 阻塞和非阻塞对于被调用者来说的：系统调用
- 同步和异步对于调用者来说

## NodeJS 中的队列

### 执行顺序

- 同步
- nextTicks
- other 微任务
- timers 定时器
- immediate

```js
timers             执行setTimeout() 和 setInterval() 中到期的 callback
pending callbacks  执行系统操作的回调， 如： TCP, UDP通信的错误callback
idle,prepare       只在内部使用
poll               执行与 I/O 相关的回调。（除了close回调，定时器回调和setImmediate（）之外，几乎所有回调都执行
check              执行 setImmediate的callback
close              执行close事件的callback, 例如socket.on('close', ()=>{})
```

# npm 发布问题

- 地址： `https://registry.npmjs.com`
- 发布：查看包是否正确，名称是否已重复

# Stream

所有的流都是 EventEmitter 的实例

- fs.createReadStream
- fs.createWriteStream
- reader.pipe(writer)
- writer.end('hello world'),相当于 writer 写入并结束,writer.end()

# express

## 中间件

- `app.use()`或者`app.[method]`，匹配到后，如果未调用**next()**，则只执行第一个匹配到的
- 连续注册中间件，也需要调用next

## 内置解析请求

- `app.use(express.json())`
- `app**.**use(express**.**urlencoded({ extended: true }))` *// x-www-form-urlencoded*
  - extended: true: 使用第三方库: qs  
  - false: 使用内置的模块：querystring

# express & koa 的区别

- koa内部的dispatch返回的是一个Promise，在调用next时，可以通过async/await实现同步调用
- 解决某个中间件的异步请求结果无法同步返回问题。
- express 内的 next 返回值不是 promise。 异步调用时无法处理