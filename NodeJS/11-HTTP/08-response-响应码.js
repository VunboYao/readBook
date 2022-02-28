const Http = require('http')

// create server
const server = Http.createServer((req, res) => {

  // TODO: 设置状态码
  // TODO: 1.直接给属性赋值
  // res.statusCode = 404

  // TODO: 2.和header一起设置
  res.writeHead(402, {

  })

  res.write('response one')
  res.end('Hello Http') // 相当于res.write 和 res.close
})

server.listen(9999, 'localhost', () => {
  console.log('server listening in port 9999', `http://localhost:9999`);
})

/*
nodemon，实施监听服务器的修改
*/
