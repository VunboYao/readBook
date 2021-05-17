import { ADD_PERSON } from '../constant'

const initState = [{ id: '001', name: 'vunbo', age: 28 }]
export default function PersonReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case ADD_PERSON:
      return [data, ...preState]
    default:
      return preState
  }
}
