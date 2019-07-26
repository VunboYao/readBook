// vue.config.js
const path = require('path');
const express = require('express')
const app = express();
const axios = require('axios');

app.get('/api/getDiscList', (req, res) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => {
    console.log(e)
  })
})


function resolve(dir) {
  return path.join(__dirname,dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.scss'],
    },
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
        .set('@',resolve('src'))
        .set('components',resolve('src/components'))
  },
  devServer: {
    before (app) {
      app.get('/api/getDiscList', (req, res) => {
        let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then(response => {
          res.json(response.data)
        }).catch(e => {
          console.log(e)
        })
      })
    }
  }
}
