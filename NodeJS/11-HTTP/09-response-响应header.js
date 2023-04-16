const Http = require('http')

// create server
const server = Http.createServer(async (req, res) => {
  const origin = req.headers.origin

  if (origin) {
    res.setHeader('Vary', 'Origin')
  }
  // TODO: 1.设置返回header
  // res.setHeader('Content-Type', 'application/json;charset=utf8')
  // TODO: 2.writeHead一起写入
  res.writeHead(200, {
    'Content-Type': 'application/json;text/html;charset=utf8',
    // 允许的跨域请求站点，等同于*
    "access-control-allow-origin": req.headers.origin || "*",
    // 允许客户端请求时，携带cookie
    "access-control-allow-Credentials": true,
    // 允许客户端请求时，携带的请求头
    "access-control-allow-headers": "X-Test-Cors,content-type",
    "access-control-expose-headers": "x-demo-xxx,xixi-demo,X-demo-1",
    "X-demo-xxx": "123",
    // 设置cookie
    "Set-Cookie": ['name=vunbo', 'age=26'],
    "xixi-demo": 'xixi',
    "X-demo-1": "demo"
  })

  /* const resData = {
    foo: '123',
    bar: {
      arr: [1, 2, 3],
      info: {
        name: 'yao',
        age: 23
      }
    }
  } */
  const resData = ['Emma', 'Ben', 'Jack', 'Anna', 'June']
  await sleep(500)
  res.end(JSON.stringify(resData)) // 相当于res.write 和 res.close
})

server.listen(9999, () => {
  console.log('server listening in port 9999', `http://localhost:9999`);
})

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
/*
nodemon，实施监听服务器的修改
*/
