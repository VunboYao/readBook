#!/usr/bin/env node
const program = require('commander')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/createCommand')
// 查看版本
program.version(require('./package.json').version, '-v, --version')

// 1.帮助和可选信息
helpOptions()

// 2.创建命令行
createCommands()

// TODO: 3.必须添加解析指令
program.parse(program.argv)



// =================================================
/* console.log(program.opts()); // 获取指定的参数
console.log(process.argv); // 所有命令行参数 */
