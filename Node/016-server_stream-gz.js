const http = require('http');
const url = require('url');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((req, res) => {
  let rs = fs.createReadStream(`www${req.url}`);

  // rs.pipe(res);
  res.setHeader('content-encoding', 'gzip');
  let gz = zlib.createGzip()
  rs.pipe(gz).pipe(res);

  rs.on('error', err => {
    res.writeHead(404)
    res.write('Not Found');
    res.end();
  })
}).listen(3000, () => {
  console.log('服务启动');
})
