const program = require('commander')

module.exports = function () {
  program.option('-s, --src <src>', 'the source folder')
  program.option('-d, --dest <dest>', 'the destination folder, eg: -d src/pages')

  program.on('--help', function () {
    console.log('');
    console.log('usage');
    console.log('  vunbo -v');
    console.log('  vunbo --version');
  })
}