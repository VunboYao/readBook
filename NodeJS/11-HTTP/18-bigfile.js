const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
http.createServer((req, res) => {
  console.time('img')
  // 异步读取
  /*   fs.readFile(__dirname + '/247050.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Error')
      } else {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': data.length
        })
        res.end(data)
        console.timeEnd('img')
      }
    }) */

  // 流读取
  // fs.createReadStream(__dirname + '/247050.jpg').pipe(res)

  // 流压缩文件
  res.writeHead(200, {
    'Content-Encoding': 'gzip'
  })
  fs.createReadStream(__dirname + '/95-form.html')
    .pipe(zlib.createGzip())
    .pipe(res)
  console.timeEnd('img')
}).listen(8080)
