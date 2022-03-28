const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  const html = fs.readFileSync('95-form.html', 'utf-8');
  const img = fs.readFileSync('foo.png')
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Connection': 'close',
      'Link': '<./foo.png>; as=image;rel=preload'
    })
    res.end(html)
  } else {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Connection': 'close'
    })
    res.end(img)
  }
}).listen(8888)
