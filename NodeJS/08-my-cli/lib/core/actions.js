const fs = require('fs')
const { promisify } = require('util') // 利用util中的工具加工传统的回调函数

const download = promisify(require('download-git-repo')) // 加工成Promise
const chalk = require('chalk')

const { VueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
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

module.exports = {
  createProject
}
