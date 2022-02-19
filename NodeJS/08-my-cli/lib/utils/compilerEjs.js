const ejs = require('ejs')
const path = require('path')

const compiler = (template, data) => {
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
module.exports = compiler