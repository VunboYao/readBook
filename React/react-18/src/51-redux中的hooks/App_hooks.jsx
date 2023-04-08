import { memo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addNumber, subNumber } from './store/modules/counter'

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

  return (
      <div>
        <h2>Count: {counter}</h2>
        <button onClick={() => numberHandle(2)}>Add2</button>
        <button onClick={() => numberHandle(2, false)}>Sub2</button>
      </div>
  )
}

App.propTypes = {
  counter: PropTypes.number,
  addNumber: PropTypes.func,
  subNumber: PropTypes.func,
}

export default memo(App)
