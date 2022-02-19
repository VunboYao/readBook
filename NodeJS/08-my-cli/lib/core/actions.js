const fs = require('fs')
const path = require('path')
const { promisify } = require('util') // 利用util中的工具加工传统的回调函数

const download = promisify(require('download-git-repo')) // 加工成Promise
const chalk = require('chalk')

const { VueRepo } = require('../config/repo-config')
const commandSpawn = require('../utils/terminal')
const compiler = require('../utils/compilerEjs')
const writeFile = require('../utils/writeToFile')
const mkdirSync = require('../utils/mkdirSync');
const log = console.log

// callback => promisify(函数） => Promise => async await
const createProject = async (project, others) => {
  // 工程提示
  log(chalk.green('vunbo helps you create your project, Please wait a moment...'));

  // 0.判断文件是否存在
  if (fs.existsSync(project)) {
    log(chalk.red(`${project} already exists!!!`))
    return
  }

  // 1.clone项目
  await download(VueRepo, project, { clone: true })

  // TODO: return 安装异常问题
  return

  // 2.执行npm i
  const command = project.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 3.npm run serve
  await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
}


// 添加组件
const addCompAction = async (name, dest) => {
  // 1.编译ejs模版
  const result = await compiler('vue-component.ejs', { name, lowerName: name.toLowerCase() })

  // 2.写入文件
  const targetPath = path.resolve(dest, `${name}.vue`)

  if (mkdirSync(dest)) {
    writeFile(targetPath, result)
  }
}

// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模版
  const data = { name, lowerName: name.toLowerCase() }
  const pageResult = await compiler('vue-component.ejs', data)
  const routeResult = await compiler('vue-router.ejs', data)

  // 2.写入文件
  const targetPagePath = path.resolve(dest, `${name}.vue`)
  const targetRoutePath = path.resolve(dest, 'route.js')

  if (mkdirSync(dest)) {
    writeFile(targetPagePath, pageResult)
    writeFile(targetRoutePath, routeResult)
  }
}

const addStoreAction = async (name, dest) => {
  // 1.编译ejs模版
  const storeResult = await compiler('vue-store.ejs', {})
  const typesResult = await compiler('vue-types.ejs', {})

  // 2.写入文件
  const targetStorePath = path.resolve(dest, `${name}.js`)
  const targetTypesPath = path.resolve(dest, 'type.js')

  if (mkdirSync(dest)) {
    writeFile(targetStorePath, storeResult)
    writeFile(targetTypesPath, typesResult)
  }
}

module.exports = {
  createProject,
  addCompAction,
  addPageAndRouteAction,
  addStoreAction
}
