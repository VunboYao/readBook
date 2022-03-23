const Http = require('http')

// create server
const server = Http.createServer((req, res) => {
  res.writeHead(200, {
    // * 允许特定源跨域访问
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8888'
    'Access-Control-Allow-Origin': '*', // 允许跨域
    'Access-Control-Allow-Headers': 'X-Test-Cors', // 允许特定的请求头
    'Access-Control-Allow-Methods': 'PUT, post, delete', // 允许特定的请求方法
    'Access-Control-Max-Age': '10' // 跨域允许的时长，客户端不需要再次预请求
  })
  res.end('Hello Http') // 相当于res.write 和 res.close
})

server.listen(9999, 'localhost', () => {
  console.log('server listening in port 9999', `http://localhost:9999`);
})

/*
nodemon，实施监听服务器的修改
*/
