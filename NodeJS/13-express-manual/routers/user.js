

const express = require('express')

const router = express.Router()


// TODO:app中已经注册了前缀
router.get('/', (req, res, next) => {
  res.json(['why', 'yyb', 'li'])
})

router.post('/', (req, res, next) => {
  res.json('create user success')
})

router.get('/:id', (req, res, next) => {
  res.json(`${req.params.id}的信息`)
})

module.exports = router