const fs = require('fs')

// 1.同步读取
// const res = fs.readFileSync('./abc.txt', {
// 	encoding: 'utf-8'
// })
// console.log(res)

// 2.异步读取：回调函数
// fs.readFile('./abc.txt', {
// 	encoding: 'utf-8'
// }, (err, data) => {
// 	if (err) {
// 		console.log('ReadFileError:', err)
// 		return
// 	}
//
// 	console.log(data)
// })

// 3.异步读取：Promise
// fs.promises.readFile('./abc.txt', {
// 	encoding: 'utf8'
// }).then(res => {
// 	console.log(res)
// })

fs.readdir('./', (err, files) => {
  if (err) {
    console.log('ReadDirError:', err)
    return
  }

  console.log(files)
})
