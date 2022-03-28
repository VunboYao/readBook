const http = require('http')
const fs = require('fs')
const zib = require('zlib')

http.createServer((req, res) => {
  console.log(req.headers.host);
  if (req.url === '/') {
    const html = fs.readFileSync('95-form.html', 'utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html',
    })
    res.end(html)
  }
  if (req.url === '/data') {
    setTimeout(() => {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 's-maxage=200',
        'Vary': 'X-Test-Cache'
      })
      res.end('success')
    }, 2000);
  }
}).listen(8888)
