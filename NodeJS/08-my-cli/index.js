#!/usr/bin/env node
const program = require('commander')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')
// 查看版本
program.version(require('./package.json').version, '-v, --version')

// 帮助和可选信息
helpOptions()
createCommands()

// TODO: 必须添加解析中断指令
program.parse(program.argv) 