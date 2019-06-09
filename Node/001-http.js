const http = require('http');
const fs = require('fs');
const url = require('url');


let server = http.createServer((req, res) => {

  const {pathname, query} = url.parse(req.url, true);
  console.log(pathname, query);
  

  fs.readFile(`www${req.url}`, (err,data) => {
    if (err) {
      res.writeHeader(404); // 状态码
      res.write('404');
    } else {
      res.write(data);
    }
    res.end();
  })
}).listen(3000, () => {
  console.log('启动监听');
})
