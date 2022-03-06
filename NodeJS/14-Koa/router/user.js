const Router = require('koa-router')

const router = new Router({ prefix: '/users' })

router.get('/', (ctx, next) => {
  ctx.response.body = 'Get UserList'
})


router.post('/', (ctx, next) => {
  ctx.response.body = 'Post UserList'
})


module.exports = router
