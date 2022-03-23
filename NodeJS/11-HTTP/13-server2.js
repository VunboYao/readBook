const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  // const html = fs.readFileSync('99-test.html', 'utf8')
  if (req.url === '/') {
    const html = fs.readFileSync('97-max-age.html', 'utf8')
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(html)
  }

  if (req.url === '/script.js') {
    const etag = req.headers['if-none-match']
    if (etag === '99999') {
      // 返回码304 Not Modified
      res.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000, no-cache',
        'Last-Modified': '123456',
        'Etag': '99999' // etag校验
      })
      res.end(`console.log('none msg')`)
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000, no-cache', // no-cache 需要来服务器验证.如果通过，返回304
        // 'Cache-Control': 'max-age=2000, no-store', // no-store，一直去服务器请求
        'Last-Modified': '123456',
        'Etag': '99999'
      })
      res.end(`console.log('script loaded')`)
    }

  }

}).listen(8888)