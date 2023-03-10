import { PureComponent } from 'react'
import './style.css'
import PropTypes from 'prop-types'
import { connect } from './HOC'
import { addNumber, subNumber } from './store/features/counter'
import { asyncData } from './store/features/home'

class App extends PureComponent {
  static propTypes = {
    counter: PropTypes.number,
    asyncData: PropTypes.func,
    banners: PropTypes.array,
    recommends: PropTypes.array,
    addNumber: PropTypes.func,
    subNumber: PropTypes.func,
  }

  componentDidMount() {
    // !get async data dispatch the action of store
    this.props.asyncData()
  }

  render() {
    const { counter, banners, recommends, addNumber, subNumber } = this.props

    return (
      <div>
        <h2>App: {counter}</h2>
        <button onClick={() => addNumber()}>Add</button>
        <button onClick={() => subNumber()}>Sub</button>
        <h4>Banners</h4>
        <ul>
          {
            banners.map((item) => {
              return <li key={item.title}>{item.title}</li>
            })
          }
        </ul>
        <h4>Recommends</h4>
        <ul>
          {
            recommends.map((item) => {
              return <li key={item.title}>{item.title}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(state => ({
  counter: state.counter.value,
  banners: state.home.banners,
  recommends: state.home.recommends,
}), dispatch => ({
  asyncData() {
    dispatch(asyncData())
  },
  addNumber() {
    dispatch(addNumber(5))
  },
  subNumber() {
    dispatch(subNumber(5))
  },
}))(App)
