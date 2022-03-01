const express = require('express')

const app = express()

// 默认匹配第一个，调用next，后续的才会执行
app.use((req, res, next) => {
  console.log('Common MiddleWare')
  next()
})

app.get('/home', (req, res, next) => {
  console.log('path and method Home Middleware')
  // res.end('Hello Get Home')
})

app.post('/login', (req, res, next) => {
  console.log('path and method Home Middleware2')
  res.end('Hello Get Home2')
})




app.listen(8888, () => {
  console.log(`http://localhost:8888`)
})