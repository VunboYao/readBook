import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SubCounter extends Component {
  static propTypes = {
    changeClick: PropTypes.func,
  }

  down(count) {
    const { changeClick } = this.props
    changeClick(-count)
  }

  render() {
    return (
      <div>
        <button onClick={() => this.down(1)}>Down-1</button>
        <button onClick={() => this.down(3)}>Down-3</button>
        <button onClick={() => this.down(5)}>Down-5</button>
      </div>
    )
  }
}

export default SubCounter
