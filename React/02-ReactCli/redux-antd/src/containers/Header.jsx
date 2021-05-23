import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add } from '../redux/action'
import { nanoid } from 'nanoid'
import { Input } from 'antd'

const { Search } = Input

class Header extends Component {
  onSearch = value => {
    const obj = { id: nanoid(), msg: value, done: false }
    this.props.add(obj)
    this.searchNode.state.value = ''
  }
  render() {
    return (
      <Search
        ref={c => this.searchNode = c}
        allowClear
        placeholder='input search text'
        onSearch={this.onSearch}
        enterButton
      />
    )
  }
}

export default connect(state => ({ state }), { add })(Header)
