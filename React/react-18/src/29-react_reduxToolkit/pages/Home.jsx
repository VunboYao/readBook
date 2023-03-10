import { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addNumber } from '../store/features/counter'

class Home extends PureComponent {
  render() {
    const { counter, addNumber } = this.props

    return (
      <div>
        <h3>Home Counter: {counter}</h3>
        <button onClick={() => addNumber(1)}>ADD +1</button>
        <button onClick={() => addNumber(2)}>ADD +2</button>
        <button onClick={() => addNumber(3)}>ADD +3</button>
      </div>
    )
  }
}

Home.propTypes = {
  counter: PropTypes.number,
  addNumber: PropTypes.func,
}

export default connect(state => ({
  counter: state.counter.value,
}), {
  addNumber,
})(Home)
