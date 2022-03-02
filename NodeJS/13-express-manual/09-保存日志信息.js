const express = require('express')
const fs = require('fs')
const morgan = require('morgan')

const app = express()

// 创建写入流
const writeStream = fs.createWriteStream('./logs/access.log', {
  flags: 'a+'
})
app.use(morgan('combined', { stream: writeStream }))

app.get('/home', (req, res) => {
  res.end('success')
})

app.listen(8888, () => {
  console.log(`http://localhost:8888`)
})  