import React, { PureComponent } from 'react'
import './index.css'

export default class A extends PureComponent {
  state = {
    name: 'Yao',
  }

  onChange = () => {
    this.setState({name: 'Vunbo'})
  }

  /* shouldComponentUpdate(nextProp, nextState) {
    console.log(nextProp, nextState, 'parent')
    return !(nextState.name === this.state.name)
  } */

  render() {
    console.log('render-parent')
    const { name } = this.state
    return (
      <div className='parent'>
        <h2>我是父组件，我的名字是{name}</h2>
        <button onClick={this.onChange}>change</button>
        <B name={name} />
      </div>
    )
  }
}

class B extends PureComponent {
  /* shouldComponentUpdate(nextProp, nextState) {
    console.log(nextProp, nextState, 'child')
    return !(nextProp.name === this.props.name)
  } */

  render() {
    console.log('render-child')
    return (
      <div className='son'>
        <h2>我是子组件，我的父亲是{this.props.name}</h2>
      </div>
    )
  }
}
