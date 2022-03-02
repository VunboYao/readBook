const express = require('express')

const useRouter = require('./routers/user')

const app = express()

// TODO:与Koa2不同
app.use('/users', useRouter)

app.listen(8888, () => {
  console.log(`http://localhost:8888`)
}) 