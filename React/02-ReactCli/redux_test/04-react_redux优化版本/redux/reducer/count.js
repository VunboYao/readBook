// Count reducer

import {INCREMENT, DECREMENT} from '../constant'

// 初始化数据
const initState = 0

export default function Count(state = initState, actions) {
  // 获取操作类型与数据
  const {type, data} = actions
  switch (type) {
    case INCREMENT:
      return state + data
    case DECREMENT:
      return state - data
    default:
      return state
  }
}
