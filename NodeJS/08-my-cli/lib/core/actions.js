const fs = require('fs')
const path = require('path')
const { promisify } = require('util') // 利用util中的工具加工传统的回调函数

const download = promisify(require('download-git-repo')) // 加工成Promise
const chalk = require('chalk')

const {
  fsWriteFile,
  translateName,
  compilerEjs,
  createDirSync } = require('../utils/utils')
const { VueRepo } = require('../config/repo-config')
const commandSpawn = require('../utils/terminal')
const log = console.log

// callback => promisify(函数） => Promise => async await

// 0.创建工程
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

// 1.添加组件
const addCompAction = async (componentName, dest) => {
  const { name, lowerName } = translateName(componentName)
  // 1.编译ejs模版
  const result = await compilerEjs('vue-component.ejs', { name, lowerName })

  // 2.拼接路径
  const targetPath = path.resolve(dest, `${name}.vue`)

  if (createDirSync(dest)) {
    fsWriteFile(targetPath, result)
  }
}

// 2.添加页面和路由
const addPageAndRouteAction = async (pageName, dest) => {
  const { name, lowerName } = translateName(pageName)
  const { pageRoutePath, routePath } = handleRouterName(dest)
  // 1.编译ejs模版
  const pageResult = await compilerEjs('vue-component.ejs', { name, lowerName })
  const routeResult = await compilerEjs('vue-router.ejs', { name, pageRoutePath, routePath })

  // 2.写入页面
  const targetPagePath = path.resolve(dest, `${name}.vue`)
  if (createDirSync(dest)) {
    fsWriteFile(targetPagePath, pageResult)
  }

  // 3.写入路由
  const routerDirPath = `./src/router/${routePath}`
  const targetRoutePath = path.resolve(routerDirPath, `${name}.js`)
  if (createDirSync(routerDirPath)) {
    fsWriteFile(targetRoutePath, routeResult)
  }
}

// 3.添加store
const addStoreAction = async (name, dest) => {
  // 1.编译ejs模版
  const storeResult = await compilerEjs('vue-store.ejs', {})
  // const typesResult = await compilerEjs('vue-types.ejs', {})

  // 2.写入文件
  const targetStorePath = path.resolve(dest, `${name}.js`)
  // const targetTypesPath = path.resolve(dest, 'type.js')

  if (createDirSync(dest)) {
    fsWriteFile(targetStorePath, storeResult)
    // fsWriteFile(targetTypesPath, typesResult)
  }
}

function handleRouterName(dest) {
  const reg = /(.*)src\/(.*)$/g
  const regRoute = /(.*)src\/pages\/(.*)$/g
  let pageRoutePath = dest.replace(reg, (match, $1, $2) => {
    return $2
  })
  let routePath = dest.replace(regRoute, (match, $1, $2) => {
    return $2
  })
  return {
    pageRoutePath: pageRoutePath,
    routePath: routePath === 'src/pages' ? '' : routePath
  }
}

module.exports = {
  createProject,
  addCompAction,
  addPageAndRouteAction,
  addStoreAction
}
