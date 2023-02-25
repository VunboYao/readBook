import { memo } from 'react'
import PropType from 'prop-types'

/*
* 1.仅检查 props 变更，如果内部有 useState, useReducer, useContext Hook,依旧会重新渲染
* 2.默认浅层，如果想要控制此对比过程，请自定义比较函数。通过第二个参数传入来实现
* 2.1 (prevProps, nextProps) 传入一致返回 true, 否则返回 false. 与shouldComponentUpdate的返回值相反
*
*  */
function FuncMemo(props) {
  console.log('FuncMemo render')
  return (
    <div>
      Hello FuncMemo: {props.memo}
    </div>
  )
}

FuncMemo.propTypes = {
  memo: PropType.string,
}

export default memo(FuncMemo)
