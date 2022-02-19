const program = require('commander')
const { createProject, addCompAction } = require('./actions')
const createCommands = () => {
  // 创建项目
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a folder')
    .action(createProject)

  // 添加组件
  program
    .command('addcomp <name> [otherArgs...]')
    .description('add vue component, eg: vunbo addCom helloWorld -d src/components')
    .action(name => {
      const {dest} = program.opts()
      addCompAction(name, dest || 'src/components')
    })
}


module.exports = createCommands