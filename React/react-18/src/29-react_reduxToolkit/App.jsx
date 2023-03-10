import { PureComponent } from 'react'
import './style.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import About from './pages/About'
import Home from './pages/Home'
import { asyncData } from './store/features/home'

class App extends PureComponent {
  static propTypes = {
    counter: PropTypes.number,
    asyncData: PropTypes.func,
  }

  componentDidMount() {
    // !get async data dispatch the action of store
    this.props.asyncData()
  }

  render() {
    const { counter } = this.props

    return (
      <div>
        <h2>App: {counter}</h2>
        <div className="pages">
          <Home/>
          <About/>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  counter: state.counter.value,
}), {
  asyncData,
})(App)
