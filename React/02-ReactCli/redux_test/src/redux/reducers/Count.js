import {ADD_COUNT} from '../constant'

const initState = 1

export default function CountReducer(preState = initState, action) {
  const {type, data} = action
  console.log(type, data);
  switch (type) {
    case ADD_COUNT:
      return data + preState
    default:
      return preState
  }
}