import React, { PureComponent } from 'react'

export default class ComponentB extends PureComponent {
  state = {
    newParams: ''
  }

  handler = (params) => {
    this.setState({newParams: params})
  }

  componentDidMount() {
    window.MyEvent.on('someEvent', this.handler)
  }
  componentWillUnmount() {
    window.MyEvent.off('someEvent', this.handler)
  }
  render() {
    return (
      <>
        <h3>i am componentB</h3>
        <div>A组件传入的内容是[{this.state.newParams}]</div>
      </>
    )
  }
}
