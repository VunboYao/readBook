
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
// const userRouter = new Router({prefix: '/users'})
const userRouter = new Router()

userRouter.get('/', ctx => {
  ctx.res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })
/*   ctx.response.body = {
    params: ctx.request.params,
    query: ctx.request.query
  } */
  ctx.response.body = {}
  console.log('track');
})
userRouter.post('/', ctx => {
  ctx.res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })
/*   ctx.response.body = {
    params: ctx.request.params,
    query: ctx.request.query
  } */
  ctx.response.body = {}
  console.log('track');
})
app.use(userRouter.routes())

app.listen(8888, () => {
  console.log('http://localhost:8888')
})
