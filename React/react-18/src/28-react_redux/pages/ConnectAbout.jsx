import { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actionAdd, actionSub } from '../store/actions'

class ConnectAbout extends PureComponent {
  static propTypes = {
    counter: PropTypes.number,
    ADD: PropTypes.func,
    SUB: PropTypes.func,
  }

  changeCounter(counter, flag = true) {
    const { ADD, SUB } = this.props
    flag ? ADD(counter) : SUB(counter)
  }

  render() {
    const { counter } = this.props
    return (
      <div>
        <h3>About Counter: {counter}</h3>
        <button onClick={() => this.changeCounter(1)}>+1</button>
        <button onClick={() => this.changeCounter(2)}>+2</button>
        <button onClick={() => this.changeCounter(3)}>+3</button>
        <button onClick={() => this.changeCounter(1, false)}>-1</button>
        <button onClick={() => this.changeCounter(2, false)}>-2</button>
        <button onClick={() => this.changeCounter(3, false)}>-3</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.CountReducer.counter,
})

const mapDispatchToProps = dispatch => ({
  ADD: counter => dispatch(actionAdd({ counter })),
  SUB: counter => dispatch(actionSub({ counter })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectAbout)
