import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Home extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
  }

  /* shouldComponentUpdate(nextProps) {
    const { message } = this.props
    if (message !== nextProps.message) {
      return true
    } else {
      return false
    }
  } */

  render() {
    console.log('Home render')

    const { message } = this.props

    return (
      <div>
        <h2>HomePage: {message}</h2>
      </div>
    )
  }
}

export default Home
