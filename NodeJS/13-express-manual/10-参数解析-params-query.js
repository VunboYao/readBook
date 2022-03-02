const express = require('express')

const app = express()

app.get('/home/:id/:name', (req, res) => {
  console.log('req.params :>> ', req.params) // TODO:获取参数
  res.end('success')
})


app.get('/login', (req, res) => {
  res.json(req.query)
})

app.listen(8888, () => {
  console.log(`http://localhost:8888`)
})  