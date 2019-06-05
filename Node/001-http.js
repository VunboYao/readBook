const http = require('http')


let server = http.createServer((req, res) => {

  console.log('aa');
  
  res.write('aaa')
  res.end()
}).listen(3000)
