
const Koa = require('koa')

const app = new Koa()

// 中间件注册
app.use((ctx, next) => {
  if (ctx.request.url === '/login') {
    if (ctx.request.method === 'GET') {
      ctx.response.body = 'Login Success'
    }
  } else {
    ctx.response.body = 'Hello Koa2'
  }
})


// TODO:没有提供下面的注册方式
// methods: app.get/post
// path: app.use('/home', () => {})
// 连续注册：app.use(() => {}, () => {})

app.listen(8888, () => {
  console.log('http://localhost:8888')
})