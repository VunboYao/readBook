
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const multer = require('koa-multer')
const app = new Koa()

const upload = multer() // 解析的数据对象放到原生的req对象中




app.use(bodyParser()) // 解析json 与 urlencoded
app.use(upload.any()) // 解析formData

app.use((ctx, next) => {
  console.log(ctx.request.body) // 无法直接解析json数据,通过koa-bodyparser处理
  console.log(ctx.req.body) // 解析formData
  ctx.response.body = 'Hello World'
})

app.listen(8888, () => {
  console.log('http://localhost:8888')
})
