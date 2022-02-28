const fs = require('fs')
const path = require('path')
/* fs.writeFile(path.resolve(__dirname, './bar.txt'), 'hello stream12213', { flag: 'a' }, err => {
  if (err) {
    console.log(err);
  }
}) */

const writer = fs.createWriteStream(path.resolve(__dirname, './bar.txt'), {
  flag: 'a',
  start: 0
})

writer.write('xixi', err => {
  if (err) return
  console.log('success');
})
writer.write('xixi', err => {
  if (err) return
  console.log('success');
})
writer.write('xixi', err => {
  if (err) return
  console.log('success');
})
// writer.close() // 关闭写入流
writer.end('Hello Close') // 相当于写入的同时，并关闭流

writer.on('close', () => {
  console.log('close');
})
