// vue.config.js

const path = require('path');

function resolve(dir) {
  return path.join(__dirname,dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.scss'],
    },
  },
  chainWebpack: config => {
    config.resolve.alias
        .set('@',resolve('src'))
        .set('components',resolve('src/components'))
  }
}
