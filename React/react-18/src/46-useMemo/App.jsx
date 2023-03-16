import { memo, useMemo, useState } from 'react'

/*
* 1.进行大量计算操作时，减少每次渲染时的重新计算
* 2.对子组件传递相同内容的对象时，使用useMemo进行性能的优化
* */

const HelloWorld = memo(() => {
  console.log('render: HelloWorld')
  return <h2>Hello World</h2>
})

const App = memo(() => {
  const [count, setCount] = useState(0)

  // 组件更新，重新计算
  // const result = calcNumTotal(50)

  // !1.不依赖任何值，不会触发reCalc
  const result = useMemo(() => {
    return calcNumTotal(50)
  }, [])

  /* !2.依赖 count */
  /* const result = useMemo(() => {
    return calcNumTotal(count * 2)
  }, [count]) */

  // !3.useMemo和useCallback对比
  /* function fn() {}
  const fn1 = useCallBack(fn, [])
  // 等价
  const fn2 = useMemo(() => fn, []) */

  /* !4 使用useMemo对子组件渲染优化，引用地址数据优化 */
  // const info = { name: 'yao', age: 18 } // 每次更新，都会是一个新的地址作为props传递给HelloWorld
  const info = useMemo(() => ({ name: 'yao', age: 18 }), []) // 数据真实的引用地址未变更

  return (
    <div>
      <h2>Hook useMemo: {result}-{count}</h2>
      <button onClick={() => { setCount(count + 1) }}>+1</button>

      <HelloWorld result={result} info={info}/>
    </div>
  )
})

function calcNumTotal(num) {
  console.log('reCalc...')

  let total = 0
  let i = 1
  while (i <= num) {
    total += i
    i++
  }
  return total
}

export default App
