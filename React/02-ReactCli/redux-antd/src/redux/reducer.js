import { ADD_TASK, UPDATE_TASK } from './constant'

const initState = [
  { id: '001', msg: 'study some good technology', done: false },
  { id: '002', msg: '吃饭，睡觉，打豆豆', done: true },
  { id: '003', msg: '好好学习，天天向上', done: false },
]
export default function Reducer(preState = initState, action) {
  const {type, data} = action
  switch (type) {
    case ADD_TASK:
      return [data, ...preState]
    case UPDATE_TASK:
      return [...data]
    default:
      return preState
  }
}
