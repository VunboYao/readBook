const express = require('express')

const app = express()


app.get('/login', (req, res) => {

  res.status(303)
  res.json(req.query)
  // res.json(['abc', 'baa'])
})

app.listen(8888, () => {
  console.log(`http://localhost:8888`)
})  