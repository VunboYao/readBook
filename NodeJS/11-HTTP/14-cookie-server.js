const http = require('http')
const fs = require('fs')
const zib = require('zlib')

http.createServer((req, res) => {
  console.log('req.url :>> ', req.url);
  if (req.url === '/') {
    res.writeHead(303, {
      // 'Location': '/new' // 同域
    })
    res.end('')
  }

  if (req.url === '/new') {
    res.writeHead(302, {
      'Content-Type': 'text/html
    })
    res.end('<h2>Hello World</h2>')
  }

}).listen(8888)
