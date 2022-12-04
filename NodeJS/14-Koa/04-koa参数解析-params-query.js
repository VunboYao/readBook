
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
// const userRouter = new Router({prefix: '/users'})
const userRouter = new Router()

app.use((ctx, next) => {
  ctx.set('access-control-allow-origin', '*')
})
userRouter.get('/', ctx => {
  ctx.res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf8',
    "access-control-allow-origin": "*",
    "Access-Control-Allow-Headers": 'Hello-X',
    "Access-Control-Allow-Methods": "GET,POST",
    "access-control-expose-headers": "x-demo-xxx,xixi-demo,X-demo-1",
    "X-demo-xxx": "123",
    "xixi-demo": 'xixi',
    "X-demo-1": "demo"
  })
/*   ctx.response.body = {
    params: ctx.request.params,
    query: ctx.request.query
  } */
  ctx.response.body = {}
  console.log('track');
})
userRouter.post('/', ctx => {
  ctx.response.writeHead(200, {
    'Content-Type': 'text/html;charset=utf8',
    "access-control-allow-origin": "*",
    "Access-Control-Allow-Headers": 'Hello-X',
    "Access-Control-Allow-Methods": "GET,POST",
    "access-control-expose-headers": "x-demo-xxx,xixi-demo,X-demo-1",
    "X-demo-xxx": "123",
    "xixi-demo": 'xixi',
    "X-demo-1": "demo"
  })
  ctx.response.header = {
    "access-control-allow-origin": "*",
  }
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
