const Path = require('path')
const Fs = require('fs')
const mime = require('./mime.json')

function readFile(req, res, rootPath) {
  // 文件路径
  let readPath = Path.join(rootPath, req.url)
  // 扩展名
  const extName = Path.extname(readPath)
  // 对应数据类型的响应头类型
  let type = mime[extName]
  // 存在文件扩展类型
  const mimeType = type && type.startsWith('text')
  if (!mimeType) {
    res.end('Unavailable mime Type ')
    return
  }
  if (mimeType) {
    type += ';charset=utf8'
  }
  // 设置响应头
  res.writeHead(200, {
    'Content-Type': type
  })
  Fs.readFile(readPath, (err, data) => {
    if (err) {
      res.end('Serving Error')
    } else {
      res.end(data)
    }
  })
}

module.exports.staticServer = readFile
