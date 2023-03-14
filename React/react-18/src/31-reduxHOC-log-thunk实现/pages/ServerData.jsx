import { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actionAge, actionAsync } from '../store/actions'

class ServerData extends PureComponent {
  static propTypes = {
    counter: PropTypes.number,
    age: PropTypes.number,
    banners: PropTypes.array,
    recommends: PropTypes.array,
    actionAsync: PropTypes.func,
    actionAge: PropTypes.func,
  }

  componentDidMount() {
    this.props.actionAsync()
  }

  render() {
    const { counter, recommends, banners, actionAge, age } = this.props
    return (
      <div>
        <h3>SeverData Counter: {counter}</h3>
        <button onClick={() => actionAge(10)}>AgePlus: {age}</button>
        <h4>Banners Data</h4>
        <ul>
          {
            banners.map((item, index) => {
              return <li key={index}>{item.title}</li>
            })
          }
        </ul>

        <h4>Recommends Data</h4>
        <ol>
          {
            recommends.map((item, index) => {
              return <li key={index}>{item.title}</li>
            })
          }
        </ol>
      </div>
    )
  }
}

export default connect(
  state => ({
    counter: state.CountReducer.counter,
    banners: state.CountReducer.banners,
    recommends: state.CountReducer.recommends,
    age: state.InfoReducer.age,
  }),
  {
    actionAsync,
    actionAge,
  })(ServerData)
