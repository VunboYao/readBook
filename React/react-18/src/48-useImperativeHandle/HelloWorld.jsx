import { forwardRef, memo, useImperativeHandle, useRef } from 'react'

const HelloWorld = memo(forwardRef((props, ref) => {
  const inputRef = useRef()

  /* 固定暴露哪些操作给外部组件使用 */
  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus()
      },
      setValue(value) {
        inputRef.current.value = value
      },
    }
  })

  return (
    <div>
      <input type="text" ref={inputRef}/>
    </div>
  )
}))

export default HelloWorld
