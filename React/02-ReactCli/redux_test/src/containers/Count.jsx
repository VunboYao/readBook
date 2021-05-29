import React, { PureComponent } from 'react'
import { Add } from '../redux/action'
import { connect } from 'react-redux'
class Count extends PureComponent {
  Add = params => {
    this.props.Add({ id: 111, name: 'yyb', age: 20 })
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>我是组件</h2>
        <ul>
          {this.props.Count.map((item, index) => {
            return (
              <li key={index}>
                {item.name}-{item.age}
              </li>
            )
          })}
        </ul>
        <button onClick={this.Add}>add</button>
      </div>
    )
  }
}

export default connect(
  state => {
    return { Count: state }
  },
  { Add }
)(Count)
