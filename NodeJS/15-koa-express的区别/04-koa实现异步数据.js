const Koa = require('koa')

const app = new Koa()

const mid1 = async (ctx, next) => {
  ctx.msg = 'aaa'
  await next()
  ctx.response.body = ctx.msg
}


const mid2 = async (ctx, next) => {
  ctx.msg += 'bbb'
  await next()
}


const mid3 = async (ctx, next) => {
  const res = await syncFn()
  ctx.msg += res
  // ctx.msg += 'ccc'
  // next()
}


app.use(mid1)
app.use(mid2)
app.use(mid3)


app.listen(8888, () => {
  console.log('http://localhost:8888')
})

function syncFn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('BBB')
    })
  })
}