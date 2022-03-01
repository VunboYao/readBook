const express = require('express')

const app = express()

// TODO:路径匹配中间件
app.use('/home', (req, res, next) => {
  console.log('home middleware')
  // res.end('Home Middleware')
  next() // TODO:匹配后边的会执行.如果没有调用next，后续的匹配不会执行
})
app.use('/home', (req, res, next) => {
  console.log('home middleware2')
  res.end('Home Middleware2')
})


app.listen(8888, () => {
  console.log(`http://localhost:8888`)
})