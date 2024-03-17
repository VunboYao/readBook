import React, { Component } from 'react'
import { HasDefaultContext } from './context'

class OtherUseProvider extends Component {
  render() {
    return (
      <div>
          {/* 不在父级的provider中，只能获取默认数据 */}
          <HasDefaultContext.Consumer>
            {
              (value) => {
                return <h2>NoGrandPaData: default-{value.size}</h2>
              }
            }
          </HasDefaultContext.Consumer>
      </div>
    )
  }
}

export default OtherUseProvider
