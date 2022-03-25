const http = require('http')
const fs = require('fs')
const zib = require('zlib')

http.createServer((req, res) => {
  console.log(req.headers.host);
  const html = fs.readFileSync('95-form.html', 'utf-8')
  res.writeHead(200, {
    'Content-Type': 'text/html',
  })
  res.end(html)
}).listen(8888)
