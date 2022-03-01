const express = require('express')

const app = express()

// 默认匹配第一个，调用next，后续的才会执行
app.use((req, res, next) => {
  console.log('Common MiddleWare')
  next()
})

// TODO：连续注册中间件，需要调用next，否则也不会执行
app.get('/home', (req, res, next) => {
  console.log('Home 1')
  next()
}, (req, res, next) => {
  console.log('Home 2')
  next()
}, (req, res, next) => {
  console.log('Home 3')
  res.end('Over')
})





app.listen(8888, () => {
  console.log(`http://localhost:8888`)
})