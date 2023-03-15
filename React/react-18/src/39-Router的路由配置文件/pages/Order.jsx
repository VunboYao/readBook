import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withRouter from '../hoc/withRouter'

class Order extends PureComponent {
  static propTypes = {
    router: PropTypes.object,
  }

  render() {
    const { query } = this.props.router

    return (
      <div>
        <h2>Order Page</h2>
        <h3>name: {query.name}, age: {query.age}</h3>
      </div>
    )
  }
}

export default withRouter(Order)
