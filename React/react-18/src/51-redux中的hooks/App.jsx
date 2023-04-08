import { memo } from 'react'
import PropTypes from 'prop-types'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { addNumber, changeMessage, subNumber } from './store/modules/counter'

// memo高阶组件包裹起来有对应的特点：只有props发生改变时，才会重新渲染
const Home = memo(() => {
  const { message } = useSelector(state => ({
    message: state.counter.message,
  // !shallowEqual, 优化性能， 当message未改变时，组件不更新
  }), shallowEqual)

  const dispatch = useDispatch()

  console.log('Home Render')

  return (
      <div>
        <h2>Home: {message}</h2>
        <button onClick={() => dispatch(changeMessage('React18'))}>changeMessage</button>
      </div>
  )
})

const App = () => {
  // 1.useSelector: 通过从回调函数中，获取state中的数据
  const { counter } = useSelector(state => ({ counter: state.counter.value }))

  // 2.获取store中的dispatch直接派发action
  const dispatch = useDispatch()

  function numberHandle(num, isAdd = true) {
    if (isAdd) {
      dispatch(addNumber(num))
    } else {
      dispatch(subNumber(num))
    }
  }

  console.log('App Render')

  return (
      <div>
        <h2>Count: {counter}</h2>
        <button onClick={() => numberHandle(2)}>Add2</button>
        <button onClick={() => numberHandle(2, false)}>Sub2</button>

        <Home/>
      </div>
  )
}

App.propTypes = {
  counter: PropTypes.number,
  addNumber: PropTypes.func,
  subNumber: PropTypes.func,
}

export default memo(App)
