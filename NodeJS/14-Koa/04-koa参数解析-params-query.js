
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const userRouter = new Router({prefix: '/users'})

userRouter.get('/:id', ctx => {
  console.log(ctx.request.params)
  console.log(ctx.request.query)
  ctx.response.body = 'Hello Koa-Router'
})
app.use(userRouter.routes())

/*app.use((ctx, next) => {
  console.log(ctx.request.url)
  console.log(ctx.request.query)
  console.log(ctx.request.params) // 无法直接拿到，需要配合router使用
  ctx.response.body = 'Hello World'
})*/

app.listen(8888, () => {
  console.log('http://localhost:8888')
})
