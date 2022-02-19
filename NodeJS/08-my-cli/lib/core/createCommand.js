const program = require('commander')

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
      addCompAction(componentName, dest || 'src/components')
    })

  // 添加页面以及路由
  program
    .command('addpage <pageName> [destination...]')
    .description('add vue page and router config, eg: vunbo addpage Home [-d src/pages]')
    .action(pageName => {
      const { dest } = program.opts()
      addPageAndRouteAction(pageName, dest || 'src/pages')
    })

  // 添加vuex
  program
    .command('addstore <store> [destination...]')
    .description('add vue store config, eg: vunbo addstore Home [-d src/store]')
    .action(page => {
      const { dest } = program.opts()
      addStoreAction(page, dest || 'src/store/modules')
    })
}


module.exports = createCommands
