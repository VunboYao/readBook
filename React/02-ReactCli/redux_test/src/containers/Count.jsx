import React, { PureComponent } from 'react'
import { increment } from '../redux/actions/Count'
import {connect} from 'react-redux'
class Count extends PureComponent {
  add = () => {
    this.props.increment(1)
  }
  render() {
    return (
      <>
        <h2>now total is {this.props.Count}</h2>
        <h3>i ma component Person. has {this.props.Person.length} info</h3>
        <button onClick={this.add}> + </button>
      </>
    )
  }
}

export default connect(
  state => ({...state}),
  {
    increment
  }
)(Count)
