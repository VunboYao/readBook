const { promisify } = require('util') // 利用util中的工具加工传统的回调函数
const download = promisify(require('download-git-repo')) // 加工成Promise

const { VueRepo } = require('../config/repo-config')

// callback => promisify(函数） => Promise => async await
const createProject = async (project, others) => {
  // 1.clone项目
  await download(VueRepo, project, { clone: true })

  // 2.执行npm i
  // 3.npm run serve
  // 4.open browser
}

module.exports = {
  createProject
}
