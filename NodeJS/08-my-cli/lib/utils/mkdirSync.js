const path = require('path')
const fs = require('fs')

// TODO: 递归创建文件夹
function createDirSync(pathName) {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    // source/components/category 有 
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName) // source/components/category/goods
      return true
    }
  }
}

module.exports = createDirSync