const express = require('express')


const app = express()


app.post('/login', (req, res, next) => {
  // 用户名不存在，登陆失败
  const isLogin = false
  if (isLogin) {
    res.json('success')
  } else {
    /* res.status(400)
    res.json('not exists') */
    // TODO:传递一个错误给next
    next(new Error('username not exists'))
  }
})


app.post('/register', (req, res, next) => {
  const isExists = true
  if (!isExists) {
    res.json('success register')
  } else {
    /* res.status(400)
    res.json('username already exists') */
    next(new Error('username already exists'))
  }
})


// TODO:注册一个error捕获中间件
app.use((err, req, res, next) => {
  res.json({
    errCode: 400,
    error: err.message
  })
})

app.listen(8888, () => {
  console.log(`http://localhost:8888`)
}) 
