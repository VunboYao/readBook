const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  // TODO:设置状态码
  ctx.status = 200

  // TODO:设置内容
  // ctx.response.body = 'yyb'
  /* ctx.response.body = {
    name: 'yyb',
    age: 18,
    avatar_url: 'http://vunbo.com'
  } */
  ctx.response.body = ['hello', 'ok']

  // TODO: 内部执行了代理
  ctx.body = 'HelloKoa2'
})

app.listen(8888, () => {
  console.log('http://localhost:8888')
})