const resolveApp = require('./paths')

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolveApp('./dist')
  }
}


module.exports = config
