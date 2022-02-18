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
