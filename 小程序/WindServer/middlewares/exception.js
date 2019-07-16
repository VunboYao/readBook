const catchError = async(ctx, next) => {
    try{
        await next()
    } catch(error) {
        ctx.body = 'server has some error...'
    }
}

module.exports = catchError
