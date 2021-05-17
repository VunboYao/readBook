import {ADD_PERSON} from '../constant';

const initState = [
  { id: '001', msg: 'i love your' },
  { id: '002', msg: 'i love react' },
  { id: '003', msg: 'i love IT' }
]

export default function PersonReducer(preState=initState, action){
  const {type, data} = action
  switch (type) {
    case ADD_PERSON:
      return [data, ...preState]
    default:
      return preState
  }
}