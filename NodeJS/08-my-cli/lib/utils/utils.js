const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

function compilerEjs (template, data) {
  const templatePath = path.resolve(__dirname, `../templates/${template}`)
  // 编译ejs
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

function fsWriteFile(path, content) {
  return fs.promises.writeFile(path, content)
}

function translateName(name) {
  const firstLetter = name.slice(0, 1)
  return {
    name: firstLetter.toUpperCase() + name.slice(1),
    lowerName: name.toLowerCase()
  }
}

// TODO: 递归创建文件夹
function createDirSync(pathName) {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    // source/components/category/goods
    // source/components/category
    // source/components
    // source
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

module.exports = {
  fsWriteFile,
  translateName,
  compilerEjs,
  createDirSync
}