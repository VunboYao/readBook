// 原生启动服务
{
  /* const http = require('http')

  const hostname = '127.0.0.1'
  const port = 3000

  const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World\n')
  })

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  })
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminate');
    })
  }) */
}
{
  const bar = () => console.log('bar');
  const baz = () => console.log('baz');
  const foo = () => {
    console.log('foo');
    setTimeout(() => {
      bar()
    }, 0);
    new Promise((res, rej) => {
      res('should be right after baz, before bar')
    }).then(resolve => console.log(resolve))
    baz()
  }

  foo()
}
