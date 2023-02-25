import { PureComponent, forwardRef } from 'react'

class ClassAcceptRefFromFunc extends PureComponent {
  // !error,错误，这里真实ref赋值时用的是回调形式
  // textRef = createRef()

  textRef = null

  getText() {
    // !回调方式获取 ref
    console.log('类组件接收refs转发：', this.textRef)
  }

  render() {
    return (
      /* !这里是回调形式，不是createRef方式 */
      <div ref={el => this.textRef = el}>I am OK</div>
    )
  }
}

// refs转发给class组件
const AcceptClassRef = forwardRef((props, ref) => {
  return <ClassAcceptRefFromFunc ref={ref}/>
})

export default AcceptClassRef
