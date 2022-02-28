const http = require('http')

// 方式一.内部本质就是调用的http.Server()
http.createServer((req, res) => {
  res.end('serve1')
}).listen(9000, () => {
  console.log('serve1 start');
})

http.createServer((req, res) => {
  res.end('serve2')
}).listen(9001, () => {
  console.log('serve2 start');
})

// 方式二
new http.Server((req, res) => {
  res.end('server3');
}).listen(9002, () => {
  console.log('server3 start');
})

/*
默认listen中的host是监听的0.0.0.0
*/
