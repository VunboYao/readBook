const program = require('commander')
const { createProject, addCompAction, addPageAndRouteAction, addStoreAction } = require('./actions')
const createCommands = () => {
  // 创建项目
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a folder')
    .action(createProject)

  // 添加组件
  program
    .command('addcomp <name> [otherArgs...]')
    .description('add vue component, eg: vunbo addCom helloWorld [-d src/components]')
    .action(name => {
      const { dest } = program.opts()
      addCompAction(name, dest || 'src/components')
    })

  // 添加页面以及路由
  program
    .command('addpage <page> [otherArgs...]')
    .description('add vue page and router config, eg: vunbo addpage Home [-d src/pages]')
    .action(page => {
      const { dest } = program.opts()
      addPageAndRouteAction(page, dest || 'src/pages')
    })

  // 添加vuex
  program
    .command('addstore <store> [otherArgs...]')
    .description('add vue store config, eg: vunbo addstore Home [-d src/store]')
    .action(page => {
      const { dest } = program.opts()
      addStoreAction(page, dest || 'src/store/modules')
    })
}


module.exports = createCommands