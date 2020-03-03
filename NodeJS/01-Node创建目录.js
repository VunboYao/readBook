const fs = require('fs')
const path = require('path')

const str = path.join(__dirname, 'yyb.txt')
const str2 = path.join(__dirname, '123.txt')

const writeStream = fs.createWriteStream(str2)
const readStream = fs.createReadStream(str)

readStream.pipe(writeStream)

