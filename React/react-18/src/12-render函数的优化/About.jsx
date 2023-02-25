import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class About extends PureComponent {
  static propTypes = {
    counter: PropTypes.number,
  }

  /* shouldComponentUpdate(nextProps) {
    if (this.props.counter !== nextProps.counter) {
      return true
    } else {
      return false
    }
  } */

  render() {
    console.log('About Render')
    return (
      <div>
        <h2>About Page: {this.props.counter}</h2>
      </div>
    )
  }
}

export default About
