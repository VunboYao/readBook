const { ADD, CHANGE } = require('./constant')

const changeName = data => ({ type: ADD, data })
const changeCount = data => ({ type: CHANGE, data })

module.exports = {
  changeCount,
  changeName,
}
