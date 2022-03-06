const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.response.body = 'Hello Koa2'
})

app.listen(8888, () => {
  console.log('http://localhost:8888')
})