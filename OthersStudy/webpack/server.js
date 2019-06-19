let express = require('express');
let app = express()
const webpack = require('webpack');

// 中间件
const middle = require('webpack-dev-middleware');
const config = require('./webpack.config');

// 编译后的文件
let compiler = webpack(config)
app.use(middle(compiler))

app.get('/user', (req, res) => {
  res.json('VunboYao1');
})

app.listen(3000)