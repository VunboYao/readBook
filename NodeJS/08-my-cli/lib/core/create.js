const program = require('commander')
const { createProject } = require('./actions')
const createCommands = () => {
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a folder')
    .action(createProject)
}


module.exports = createCommands