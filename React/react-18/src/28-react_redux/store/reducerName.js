import { CHANGE_AGE } from './constant'

const initState = {
  name: 'Yao',
  age: 20,
}

export default function(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case CHANGE_AGE:
      return { ...state, age: state.age + data }
    default:
      return state
  }
}
