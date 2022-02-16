const path = require('path')

const basePath = '../User/yyb'
const filename = '/abc.txt'
// join the dirPath + file

const filePath = path.resolve(basePath, filename)
console.log(filePath)

const filePath2 = path.join(basePath, filename)
console.log(filePath2)
