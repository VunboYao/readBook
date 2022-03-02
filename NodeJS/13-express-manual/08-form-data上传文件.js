const express = require('express')
const path = require('path')

const multer = require('multer') // TODO:处理form-data数据，数据与文件

// 自定义存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => { // 存储地址
    cb(null, './uploads') // 需要先有目录
  },
  filename: (req, file, cb) => {
    // 拼接时间戳+原始文件后缀名
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

// TODO:不能用作全局中间件
const upload = multer({
  // dest: './uploads/' // 自动存到本地,无后缀，会自动创建目录
  storage
}) // TODO:处理上传文件，传入存储位置

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


 
// 处理form-data中的上传数据 upload.any()
app.post('/login', upload.any(), (req, res, next) => {
  console.log(req.body)
  res.end('success')
})

// 传入一个特定的中间件，key值，存储文件.upload.single|array
app.post('/upload', upload.single('yyb'), (req, res, next) => {
  console.log('req.file :>> ', req.file) // TODO:single=> file; array=>files
  res.end('ok')
})


app.listen(8888, () => {
  console.log('http://localhotst:8888')
})