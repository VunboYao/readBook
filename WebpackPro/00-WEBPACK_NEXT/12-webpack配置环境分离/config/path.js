const path = require('path')

// TODO: 返回Node.js进程的当前工作目录。__dirname是当前模块的目录名
const appDir = process.cwd()
const resolveApp = (relPath) => path.resolve(appDir, relPath)
module.exports = resolveApp
