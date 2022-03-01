const express = require('express')

const app = express()

const port = 8888

// 注册一个普通的中间件
app.use((req, res, next) => {
  console.log('普通的中间件')
  next() // TODO: 执行下一个匹配的，需要调用next
})

app.use((req, res, next) => {
  console.log('普通的中间件02')
  res.end('Hello World02') // TODO:返回必须在最后
})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
