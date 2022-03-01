const http = require('http')


/* http.get('http://localhost:9999', res => {
  // 监听返回
  res.on('data', data => {
    console.log('data', data.toString())
  })
  // 监听结束
  res.on('end', () => {
    console.log('over');
  })
}) */


const req = http.request({
  method: 'post',
  hostname: 'localhost',
  port: 9999,
}, res => {
  // 监听返回
  res.on('data', data => {
    console.log('data', data.toString())
  })
  // 监听结束
  res.on('end', () => {
    console.log('over');
  })
})
req.end()
