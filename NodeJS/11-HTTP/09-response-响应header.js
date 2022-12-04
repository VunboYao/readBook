const Http = require('http')

// create server
const server = Http.createServer((req, res) => {
  console.log('req.message', req.headers)
  // TODO: 1.设置返回header
  // res.setHeader('Content-Type', 'application/json;charset=utf8')
  // TODO: 2.writeHead一起写入
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf8',
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "*",
    "access-control-expose-headers": "x-demo-xxx,xixi-demo,X-demo-1",
    "X-demo-xxx": "123",
    "xixi-demo": 'xixi',
    "X-demo-1": "demo"
  })

  res.end("<h2>Hello Server</h2>") // 相当于res.write 和 res.close
})

server.listen(9999, 'localhost', () => {
  console.log('server listening in port 9999', `http://localhost:9999`);
})

/*
nodemon，实施监听服务器的修改
*/
