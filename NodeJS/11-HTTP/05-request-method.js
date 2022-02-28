const http = require('http')
const url = require('url') // 解析url
const qs = require('querystring') // 针对query做处理的

http.createServer((req, res) => {

  const { pathname } = url.parse(req.url)
  if (pathname === '/login') {
    if (req.method === 'POST') {
      req.setEncoding('utf-8') // 设置编码格式
      req.on('data', data => {
        // console.log(data.toString());
        console.log(JSON.parse(data), typeof data); //  req.setEncoding('utf-8')配合。但是类型是string。可以用JSON。parse解析
      })

      res.end('login page')
    }
  }


}).listen(8000, () => {
  console.log(`server is running in http://localhost:8000`);
})
