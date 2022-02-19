const path = require('path')
const fs = require('fs')

module.exports = function (path, content) {
  return fs.promises.writeFile(path, content)
}