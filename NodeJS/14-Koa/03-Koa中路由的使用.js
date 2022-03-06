
const Koa = require('koa')

const userRouter = require('./router/user')

const app = new Koa()

// 中间件注册
app.use((ctx, next) => {
  // ctx.response.body = 'Hello Koa2'
  next() // TODO：此处如果不调用next(),后续代码不会执行
})

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(8888, () => {
  console.log('http://localhost:8888')
})
