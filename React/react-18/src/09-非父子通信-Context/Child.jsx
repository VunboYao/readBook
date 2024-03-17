import React, { PureComponent } from 'react'
// context class中使用
import GrandchildClass from './GrandchildClass'
// context func 中使用
import GrandchildFunc from './GrandchildFunc'

class Child extends PureComponent {
  render() {
    return (
      <div>
        <GrandchildClass/>
        <hr/>
        <GrandchildFunc/>
      </div>
    )
  }
}

Child.propTypes = {}

export default Child
