const fs = require('fs')
const path = require('path')

/* fs.readFile(path.resolve(__dirname, './foo.txt'), (err, data) => {
  console.log(data);
}) */

const reader = fs.createReadStream(path.resolve(__dirname, './foo.txt'), {
  start: 3,
  end: 6,
  highWaterMark: 2
})

// 数据读取
reader.on('data', data => {
  console.log(data);

  reader.pause() // 暂停
  setTimeout(() => {
    reader.resume()
  }, 1000);
})

reader.on('open', () => {
  console.log('open');

})

reader.on('close', () => {
  console.log('close');
})
