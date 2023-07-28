const Koa = require('koa')
const app = new Koa()


app.use(ctx => {
  const isLogin = false
  if (!isLogin) {
    // TODO:暴露错误
    ctx.app.emit('error', -400, ctx)
  }
})

// TODO:捕获错误
app.on('error', (err, ctx) => {
  console.log(err, '>>>>');
  ctx.status = 401
  ctx.body = err.message
})

app.listen(8888, () => {
  console.log('http://localhost:8888')
})
