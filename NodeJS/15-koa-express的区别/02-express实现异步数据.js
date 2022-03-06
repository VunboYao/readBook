const express = require('express')

const app = express()

const mid1 = (req, res, next) => {
  req.msg = 'aaa'
  next()
  res.end(req.msg)
}

const mid2 = (req, res, next) => {
  req.msg += 'bbb'
  next()
}

const mid3 = (req, res, next) => {
  // req.msg += 'ccc'
  syncFn().then(result => {
    res.msg += result
  })
}

function syncFn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('BBB')
    })
  })
}

app.use(mid1, mid2, mid3, (req, res, next) => {
  // res.end(req.msg)
})

app.listen(8000)