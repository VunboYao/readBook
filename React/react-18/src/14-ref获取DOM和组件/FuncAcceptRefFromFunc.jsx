// !refs转发
import { forwardRef } from 'react'

const ClassAcceptRefFromFunc = forwardRef((props, ref) => {
  /*
  * 1.第二个参数 ref 只在使用 forwardRef时有效，常规函数和class组件不接受ref参数，且 props 中也不存在 ref
  * 2.Ref 转发不仅陷于 DOM 组件中，也可以转发 refs 到 class 组件实例中
  *  */
  return (
    <div>
      {/* ref转发 */}
      <h1 ref={ref}>Hello World</h1>
    </div>
  )
})

export default ClassAcceptRefFromFunc
