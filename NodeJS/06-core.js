let Path = require('path')
let fs = require('fs')

// 读取文件状态，判断是文件/文件夹
/* fs.stat(__dirname, (err, status) => {
  if (status.isFile()) {
    console.log('is a File');
  } else if (status.isDirectory()) {
    console.log('is a Directory');
  }
})
const status = fs.statSync(__filename) */

// 1.获取读取文件的路径
/* let path = Path.join(__dirname, 'www/index.html')

// 2.读取文件
fs.readFile(path, 'utf8', (err, data) => {
  if(err) {
    throw new Error('readFile error')
  }
  console.log(data); // 指定第二个参数
  // console.log(data.toString()); // 未指定第二个参数，则返回buffer
})

let data = fs.readFileSync(path, 'utf8')
console.log(data); */

/* let str = Path.join(__dirname, 'www/demo.txt')
fs.writeFile(str, 'some demo txt', 'utf-8', (err) => {
  if (err) {
    throw new Error('writeFile error')
  } else {
    console.log('success');
  }
})

let  res = fs.writeFileSync(str, 'some demo sync txt', 'utf-8') */

/* let str = Path.join(__dirname, 'www/append.txt')
let br = '\n'
const content = `${'some append.txt'}${br}`
fs.appendFile(str, content, 'utf8', err => {
  if (err) throw err;
  console.log('success appendFile');
})
let file = fs.appendFileSync(str, content, 'utf8') */
// 1.Create Url of ReadFile
/* let readStr = Path.join(__dirname, 'www/demo.txt')

// 2.Create ReadStream
let readStream = fs.createReadStream(readStr, {
  encoding: 'utf8',
  highWaterMark: 1
})

// 3. Open Stream
readStream.on('open', () => {
  console.log('ReadStream Open');
})

readStream.on('error', () => {
  console.log('ReadStream error');
})

readStream.on('data', (data) => {
  console.log('ReadStream has get Data: ', data);
})

readStream.on('close', () => {
  console.log('ReadStream Close');
}) */
// 1.write url
/* let writeStr = Path.join(__dirname, 'www/new.txt')
// 2.CreateWriteStream
let writeStream = fs.createWriteStream(writeStr, {
  encoding: 'utf-8'
})
// 3.Listening Open
writeStream.on('open', () => {
  console.log('writeStream Open');
})

writeStream.on('error', () => {
  console.log('writeStream error');
})

writeStream.on('close', () => {
  console.log('writeStream Close');
})

let index = 0
let str = 'www.vunbo.com'
let timerId = setInterval(() => {
  writeStream.write(str[index])
  console.log('writing data: ', str[index]);
  index++
  if (index === str.length) {
    clearInterval(timerId)
    writeStream.end()
  }
}, 1000) */

// 1.Create url
/* let readUrl = Path.join(__dirname, 'www/demo.mp4')
let writeUrl = Path.join(__dirname, 'www/write.mp4')

// 2.Create ReadStream
let readStream = fs.createReadStream(readUrl)
// 3.Create WriteStream
let writeStream = fs.createWriteStream(writeUrl)
// 4.Listening ReadStream
readStream.on('open', () => {
  console.log('readSteam open');
})
readStream.on('error', () => {
  console.log('readSteam error');
})
readStream.on('close', () => {
  console.log('readSteam close');
  // 读取结束，写入结束
  writeStream.end()
})
readStream.on('data', (data) => {
  console.log('readSteam data: ', data);
  // 写入数据
  writeStream.write(data)
})

// 5.Listening WriteStream
writeStream.on('open', () => {
  console.log('writeStream open');
})
writeStream.on('error', () => {
  console.log('writeStream error');
})
writeStream.on('close', () => {
  console.log('writeStream close');
}) */

let readUrl = Path.join(__dirname, 'www/demo.mp4')
let writeUrl = Path.join(__dirname, 'www/write2.mp4')

// 2.Create ReadStream
let readStream = fs.createReadStream(readUrl)
// 3.Create WriteStream
let writeStream = fs.createWriteStream(writeUrl)
readStream.pipe(writeStream)