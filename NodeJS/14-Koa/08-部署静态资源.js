const Koa = require('koa')
const koaStatic = require('koa-static')
const app = new Koa()

app.use(koaStatic('./dist'))

app.listen(8888, () => {
  console.log('http://localhost:8888')
})