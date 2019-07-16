const Router = require('koa-router');
const router = new Router();


router.post('/v1/:id/classic/latest', (ctx, next) => {
    const path = ctx.params;
    const query = ctx.request.query;
    const header = ctx.request.header;
    const body = ctx.request.body;

    ctx.body = {
        key: 'classic'
    }
    throw new Error('API Error');
})


module.exports = router
