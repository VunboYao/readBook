import { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { subNumber } from '../store/features/counter'

class About extends PureComponent {
  static propTypes = {
    counter: PropTypes.number,
    banners: PropTypes.array,
    recommends: PropTypes.array,
    subNumber: PropTypes.func,
  }

  render() {
    const { counter, banners, recommends, subNumber } = this.props

    return (
      <div>
        <h3>About Counter: {counter}</h3>
        <button onClick={() => subNumber(1)}>-1</button>
        <button onClick={() => subNumber(2)}>-2</button>
        <button onClick={() => subNumber(3)}>-3</button>
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
}), {
  subNumber,
})(About)
