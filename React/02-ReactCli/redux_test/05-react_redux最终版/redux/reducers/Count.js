import { INCREMENT, DECREMENT } from '../constant'
const initState = 0 // 声明初始化数据

/* TODO: 纯函数，不能改写preState */
export default function CountReducer(preState=initState, action) {
  const {type, data} = action
  switch (type) {
    case INCREMENT:
      return preState + data
    case DECREMENT:
      return preState - data
    default:
      return preState
  }
}
