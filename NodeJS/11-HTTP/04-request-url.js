const http = require('http')
const url = require('url') // 解析url
const qs = require('querystring') // 针对query做处理的

http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url) // url.parse()
  console.log(pathname, query);

  const queryData = qs.parse(query) // qs.parse()
  console.log(queryData);

  if (pathname === '/login') {
    res.end('Welcome~!')
  } else if (pathname === '/users') {
    res.end('userList')
  } else {
    res.end('Error Msg')
  }
}).listen(8000, () => {
  console.log(`server is running in http://localhost:8000`);
})
