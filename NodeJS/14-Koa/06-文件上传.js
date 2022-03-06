const Koa = require('koa')
const Router = require('koa-router')
const multer = require('koa-multer')
const path = require("path");

const app = new Koa()

const storage = multer.diskStorage({
  destination: (req, file, cb) => { // 存储地址
    cb(null, './uploads') // 需要先有目录
  },
  filename: (req, file, cb) => {
    // 拼接时间戳+原始文件后缀名
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  // dest: './uploads/',
  storage
})

const uploadRouter = new Router({prefix: '/upload'})
uploadRouter.post('/avatar', upload.single('file'), (ctx, next) => {
  console.log(ctx.req.file )
  ctx.response.body = 'Success'
})


app.use(uploadRouter.routes())
app.listen(8888, () => {
  console.log('http://localhost:8888')
})
