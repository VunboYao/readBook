const express = require('express')

const multer = require('multer') // TODO:处理form-data数据
const upload = multer()

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(upload.any())

app.post('/login', (req, res, next) => {
  console.log(req.body)
  res.end('success')
})

app.listen(8888, () => {
  console.log('http://localhotst:8888')
})