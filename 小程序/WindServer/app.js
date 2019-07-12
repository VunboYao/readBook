const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/classic/latest', (ctx, next) => {
  ctx.body = {
    key: 'classic'
  }
})



app.use(router.routes())

app.listen(3000);
