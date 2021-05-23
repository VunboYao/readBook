import React, { PureComponent } from 'react'
export default class Detail extends PureComponent {
  render() {
    console.log('this.props :>> ', this.props);
    const {id, msg} = this.props.location.state || {}
    return (
      <div>
        <h2>编号: {id}</h2>
        <h2>新闻：{msg}</h2>
      </div>
    )
  }
}
