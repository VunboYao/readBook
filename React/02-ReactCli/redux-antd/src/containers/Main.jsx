import React, { Component } from 'react'
import { Space, Checkbox, Button, Row, Col } from 'antd'

import { connect } from 'react-redux'
import { update } from '../redux/action'

class Main extends Component {
  onChange = (e, id) => {
    const state = this.props.state
    state.map(item => {
      if (item.id === id) {
        item.done = !item.done
      }
      return item
    })
    this.props.update(state)
  }
  delete = (e, id) => {
    const state = this.props.state
    console.log(id)
    const newState = state.filter(item => item.id !== id)
    this.props.update(newState)
  }
  render() {
    return (
      <div>
        <Space direction='vertical' style={{ width: '100%' }}>
          {this.props.state.map(item => {
            return (
              <Row key={item.id} justify='center' className='li'>
                <Col span={1}>
                  <Checkbox
                    checked={item.done}
                    onChange={e => this.onChange(e, item.id)}
                  />
                </Col>
                <Col span={20}>
                  <span>{item.msg}</span>
                </Col>
                <Col span={3} style={{ textAlign: 'right' }}>
                  <Button
                    danger
                    type='primary'
                    onClick={e => this.delete(e, item.id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            )
          })}
        </Space>
      </div>
    )
  }
}

export default connect(state => ({ state }), {
  update,
})(Main)
