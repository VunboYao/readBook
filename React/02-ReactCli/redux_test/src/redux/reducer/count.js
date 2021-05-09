const initState = 0

export default function Count(state = initState, actions) {
  const {type, data} = actions
  switch (type) {
    case 'add':
      return state + data
    case 'down':
      return state - data
    default:
      return state
  }
}