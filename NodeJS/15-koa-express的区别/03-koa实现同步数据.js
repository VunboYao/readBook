const Koa = require('koa')

const app = new Koa()

const mid1 = (ctx, next) => {
  ctx.msg = 'aaa'
  next()
  ctx.response.body = ctx.msg
}


const mid2 = (ctx, next) => {
  ctx.msg += 'bbb'
  next()
}


const mid3 = (ctx, next) => {
  ctx.msg += 'ccc'
  next()
}

app.use(mid1)
app.use(mid2)
app.use(mid3)


app.listen(8888, () => {
  console.log('http://localhost:8888')
})