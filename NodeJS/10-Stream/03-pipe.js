const fs = require('fs')
const path = require('path')


const reader = fs.createReadStream(path.resolve(__dirname, './foo.txt'))
const writer = fs.createWriteStream(path.resolve(__dirname, './baz.txt'))

// pipe 事件流直接写入
reader.pipe(writer)
