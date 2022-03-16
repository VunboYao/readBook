const program = require('commander')
const chalk = require('chalk')
const log = console.log

const {
  createProject,
  addCompAction,
  addPageAndRouteAction,
  addStoreAction } = require('./actions')

const createCommands = () => {
  // 创建项目
  program
    .command('create <projectName>')
    .description('clone a repository into a newly created directory')
    .action(createProject)

  // 添加组件
  program
    .command('addcomp <componentName> [destination...]')
    .description('add vue component, eg: vunbo addCom helloWorld [-d src/components]')
    .action(componentName => {
      const { dest } = program.opts() // 获取目标路径
      if (handleArgv(dest)) return
      addCompAction(componentName, dest || 'src/components')
    })

  // 添加页面以及路由
  program
    .command('addpage <pageName> [destination...]')
    .description('add vue page and router config, eg: vunbo addpage Home [-d src/views]')
    .action(pageName => {
      const { dest } = program.opts()
      if (handleArgv(dest)) return
      addPageAndRouteAction(pageName, dest || 'src/views')
    })

  // 添加vuex
  program
    .command('addstore <store> [destination...]')
    .description('add vue store config, eg: vunbo addstore Home [-d src/store]')
    .action(page => {
      const { dest } = program.opts()
      if (handleArgv(dest)) return
      addStoreAction(page, dest || 'src/store/modules')
    })
}


function handleArgv(dest) {
  if (!dest && process.argv.length >= 5) {
    log(chalk.red('参数错误，目标路径缺失 -d 指令'))
    return true
  }
}

module.exports = createCommands
