import { ADD_NUMBER, CHANGE_BANNERS, CHANGE_RECOMMENDS, SUB_NUMBER } from './constant'

const initialState = {
  counter: 100,

  banners: [],
  recommends: [],
}

export default function(state = initialState, action) {
  const { type, data } = action
  switch (type) {
    case ADD_NUMBER:
      // ! action 传递过来的 data 是一个对象
      return { ...state, counter: state.counter + data.counter }
    case SUB_NUMBER:
      return { ...state, counter: state.counter - data.counter }
    case CHANGE_BANNERS:
      return { ...state, banners: data.banners }
    case CHANGE_RECOMMENDS:
      return { ...state, recommends: data.recommends }
    default:
      return state
  }
}
