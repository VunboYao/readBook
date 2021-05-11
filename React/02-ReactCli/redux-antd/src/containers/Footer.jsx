import React, { Component } from 'react'
import { Checkbox, Button, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { update } from '../redux/action'
class Footer extends Component {
  onChange = e => {
    const bool = e.target.checked
    const state = this.props.state
    state.map(item => {
      item.done = bool
      return item
    })
    this.props.update(state)
  }
  clearAll = () => {
    const state = this.props.state
    const selects = state.filter(item => !item.done)
    this.props.update(selects)
  }
  render() {
    const state = this.props.state
    const select = state.filter(item => item.done)
    return (
      <div>
        <Row>
          <Col span={1}>
            <Checkbox
              checked={state.length > 0 && state.length === select.length}
              onChange={this.onChange}
            />
          </Col>
          <Col span={10}>
            <span>
              已选择 {select.length} / 总数量 {state.length}
            </span>
          </Col>
          <Col span={10}>
            <Button type='primary' onClick={this.clearAll}>
              清空已选择
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => ({ state }), {
  update,
})(Footer)
