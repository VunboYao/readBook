import {INCREMENT, DECREMENT} from '../constant'
const initState = 0

export default function Count(state = initState, actions) {
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
