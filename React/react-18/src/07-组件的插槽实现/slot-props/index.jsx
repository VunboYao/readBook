import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Index extends PureComponent {
  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props

    return (
      <div className={'nav-bar'}>
        <div className="left">{leftSlot}</div>
        <div className="center">{centerSlot}</div>
        <div className="right">{rightSlot}</div>
      </div>
    )
  }
}

Index.propTypes = {
  leftSlot: PropTypes.node,
  centerSlot: PropTypes.node,
  rightSlot: PropTypes.node,
}

export default Index
