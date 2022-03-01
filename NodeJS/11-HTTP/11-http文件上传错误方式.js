const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
  if (req.url === '/upload') {
    if (req.method === 'POST') {
      const fileWriter = fs.createWriteStream(path.resolve(__dirname, './foo.png'), { flags: 'a+' })

      // TODO: 错误一
      /* req.on('data', data => {
        fileWriter.write(data)
      })

      req.on('end', () => {
        console.log('success');
        res.end('success file')
      }) */

      // TODO： 错误二
      req.pipe(fileWriter)
      res.end('success file')
    }
  }
}).listen(9999, () => {
  console.log(`文件上传服务器地址：http://localhost:9999`);
})
