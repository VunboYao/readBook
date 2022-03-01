const http = require('http')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')

http.createServer((req, res) => {
  if (req.url === '/upload') {
    if (req.method === 'POST') {
      // TODO: 要处理数据编码.图片上传。设置为二进制
      req.setEncoding('binary')
      let body = ''
      const boundary = req.headers['content-type'].split(';')[1].replace(/\sboundary=(.*)/, (match, target) => {
        return target
      })
      req.on('data', data => {
        body += data
      })

      req.on('end', () => {
        // 1.分割数据
        const payload = qs.parse(body, '\r\n', ': ')

        // 2.获取类型
        const type = payload['Content-Type']
        const typeIndex = body.indexOf(type)
        const typeLength = type.length
        // 截取 boundary
        let imageData = body.substring(typeIndex + typeLength)
        // 3.截取数据
        // 删除换行符、空格
        imageData = imageData.replace(/\s\s*/, '')
        // 截取图片数据尾部的boundary
        imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`))

        fs.writeFile(path.resolve(__dirname, './foo.png'), imageData, 'binary', err => {
          res.end('success file')
        })
      })
    }
  }
}).listen(9999, () => {
  console.log(`文件上传服务器地址：http://localhost:9999`);
})
