import { ADD_NUM } from './constant'

export default function CountReducer(initState = 0, action) {
  const { type, data } = action
  console.log(action, 'actions')
  switch (type) {
    case ADD_NUM:
      return [data, ...initState]
    default:
      return initState
  }
}
