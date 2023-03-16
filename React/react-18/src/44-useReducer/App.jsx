import { memo, useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'add_number':
      return { ...state, count: state.count + action.num }
    case 'sub_number':
      return { ...state, count: state.count - action.num }
  }
}

const App = memo(() => {
  // const [count, setCount] = useState(0)

  // !当state的数据较为复杂时，可以通过useReducer来统一处理
  const [state, dispatch] = useReducer(reducer, { count: 0, friends: [], user: {} })

  return (
    <div>
      <h2>Hook: {state.count}</h2>
     {/* <button onClick={() => { setCount(count + 1) }}>+1</button>
      <button onClick={() => { setCount(count - 1) }}>-1</button> */}

      <button onClick={() => { dispatch({ type: 'increment' }) }}>+1</button>
      <button onClick={() => { dispatch({ type: 'decrement' }) }}>-1</button>
      <button onClick={() => { dispatch({ type: 'add_number', num: 5 }) }}>+5</button>
      <button onClick={() => { dispatch({ type: 'sub_number', num: 6 }) }}>-6</button>

    </div>
  )
})

export default App
