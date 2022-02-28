const http = require('http')

http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
  res.end('Hello')
}).listen(8000, () => {
  console.log(`server is running in http://localhost:8000`);
})
