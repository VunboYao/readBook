import React, { Component } from 'react'
import { Button, Steps } from 'antd'
import 'antd/dist/antd.less'

const { Step } = Steps


export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Hello React</h2>
        <Button type='primary'>Primary Button</Button>
        <Button type='danger'>Primary Button</Button>
        <Steps current={1}>
          <Step title='Finished' description='This is a description.' />
          <Step title='In Progress' subTitle='Left 00:00:08' description='This is a description.' />
          <Step title='Waiting' description='This is a description.' />
        </Steps>
      </div>
    )
  }
}
