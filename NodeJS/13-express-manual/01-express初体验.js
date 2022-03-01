const express = require('express')

// TODO: express其实是一个函数：createApplication
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/', (req, res) => {
  res.send('Hello Post')
})

app.post('/login', (req, res) => {
  res.send('Welcome!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})
