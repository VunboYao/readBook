const Http = require('http')

// create server
const server = Http.createServer((req, res) => {
  console.log(req.headers);
  res.end('Hello Http') // 相当于res.write 和 res.close
})

server.listen(9999, 'localhost', () => {
  console.log('server listening in port 9999', `http://localhost:9999`);
})

/*
nodemon，实施监听服务器的修改
*/
