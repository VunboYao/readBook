const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  const { query, pathname} = url.parse(req.url, true);
  console.log(query, pathname);

  res.write(req.url);
  res.end();
}).listen(3000,() => {
  console.log('get请求服务启动');
})
