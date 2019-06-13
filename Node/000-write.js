<<<<<<< HEAD
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
readline.question(`What's your name?`, (name) => {
  console.log(`Hi ${name}!`)
  readline.close()
})
=======
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
>>>>>>> 965c1401b62abad55c323c63baaf6a400e9b3940
