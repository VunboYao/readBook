import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withRouter from '../hoc/withRouter'

class Category extends PureComponent {
  static propTypes = {
    router: PropTypes.object,
  }

  render() {
    const { params } = this.props.router

    return (
      <div>
        <h2>Category Page</h2>
        <h3>id: {params.id}</h3>
      </div>
    )
  }
}

export default withRouter(Category)
