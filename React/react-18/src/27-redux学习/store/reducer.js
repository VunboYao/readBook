const { ADD, CHANGE } = require('./constant')

const initialState = {
  name: 'yao',
  count: 100,
}

/*
* reducer 纯函数
* 两个参数：
* 参数一：store 中目前保存的 state
* 参数二: 本次需要更新的 action(dispatch传入的action)
* 返回值：作为新的state
*  */
module.exports = function reducer(state = initialState, action) {
  const { type, data } = action

  switch (type) {
    case ADD:
      return { ...state, name: data.name }
    case CHANGE:
      return { ...state, count: data.count + state.count }
    default:
      return state
  }
}
