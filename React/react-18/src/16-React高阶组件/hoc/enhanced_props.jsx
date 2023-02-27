import { PureComponent } from 'react'

export default function enhancedUserInfo(OriginComponent) {
  return class extends PureComponent {
    state = {
      userInfo: {
        name: 'VunboYao',
        age: 30,
      },
    }

    render() {
      /* 注入原始的 props信息和 新增强的 userInfo */
      return <OriginComponent {...this.props} {...this.state.userInfo}/>
    }
  }
}
