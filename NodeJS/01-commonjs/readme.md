# commonJS

## exports

- node 中实现 CommonJS 的本质是对象的引用赋值
- exports 默认导出的是一个空对象
- exports.xxx 导出的任意变量，在任何模块以 exports.xxx 更改后，都可以在其他模块实现变更

# module.exports

- CommonJS 中没有 module.exports
- 本质上是 module.exports 在导出
- module.exports = exports
- 若 module.exports = {}， 则 module.exports 不再引用 exports.
- exports 的意义是 NodeJS 实现 CommonJS 规范
- **module.exports = exports 操作在顶层**
- module 本质是一个类：Module
