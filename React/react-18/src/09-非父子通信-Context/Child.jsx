import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// context class中使用
import GrandchildClass from './GrandchildClass'
// context func 中使用
import GrandchildFunc from './GrandchildFunc'

class Child extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
  }

  render() {
    // get props data
    const { name, age } = this.props
    return (
      <div>
        <h2>{name}-{age}</h2>
        <GrandchildClass/>
        <hr/>
        <GrandchildFunc/>
      </div>
    )
  }
}

Child.propTypes = {}

export default Child
