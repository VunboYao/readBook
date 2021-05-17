import React, { PureComponent } from 'react'
import { increment } from '../redux/actions/count'
import {connect} from 'react-redux'
class Count extends PureComponent {
  add = () => {
    const count = this.props.Count + 1
    this.props.increment(count)
  }
  render() {
    return (
      <>
        <h2>now total is {this.props.Count}</h2>
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