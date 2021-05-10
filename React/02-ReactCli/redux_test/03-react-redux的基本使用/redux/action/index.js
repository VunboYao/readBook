// Action操作
import {INCREMENT, DECREMENT} from '../constant'

export const createIncrementAction = data => ({ type: INCREMENT, data }) // 加
export const createDecrementAction = data => ({ type: DECREMENT, data }) // 减
// 异步Action
export const createIncrementAsyncAction = (data, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(createIncrementAction(data))
    }, time);
  }
}
