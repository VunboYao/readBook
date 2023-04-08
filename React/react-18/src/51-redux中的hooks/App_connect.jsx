import { memo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNumber, subNumber } from './store/modules/counter'

const App = (props) => {
  // 函数式组件，使用props时，不能立即包裹在memo中
  const { counter, addNumber, subNumber } = props

  function numberHandle(num, isAdd = true) {
    if (isAdd) {
      addNumber(2)
    } else {
      subNumber(2)
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

export default connect(state => ({
  counter: state.counter.value,
}), {
  addNumber,
  subNumber,
})(memo(App))
