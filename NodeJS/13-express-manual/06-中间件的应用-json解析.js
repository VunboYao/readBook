const express = require('express')

const app = express()


// TODO:json解析
/* app.use((req, res, next) => {
  // TODO:根据content-type判断来解析不同的数据
  if (req.headers['content-type'] === 'application/json') {
    let info = null
    req.on('data', data => {
      // 获取数据
      info = JSON.parse(data.toString())
      req.body = info // 赋值到body上
    })

    req.on('end', () => {
      next()
    })
  } else {
    next()
  }
}) */

// TODO:内置方法
app.use(express.json())
// extended: true: 使用第三方库。qs   false: 使用内置的模块：querystring
app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.query())

app.post('/login', (req, res, next) => {
  console.log('req.body :>> ', req.body)
  res.end('Get Data')
})


app.post('/products', (req, res, next) => {
  console.log('req.body :>> ', req.body)
  res.end('Get Data2')
})

app.get('/login', (req, res, next) => {
  console.log('req.params :>> ', req.query)
  res.end('Welcome')
})


app.listen(8888, () => {
  console.log(`http://localhost:8888`)
})