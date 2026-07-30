import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'
import { createContext, useCallback, useContext, useEffect, useEffectEvent, useId, useMemo, useReducer, useRef, useState } from 'react'


type CounterState = { count: number }
type CounterAction = { type: 'inc' } | { type: 'add'; payload: number } | { type: 'reset' }
function reducerFunc(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 }
    case 'add':
      return { count: state.count + action.payload }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}
const ThemeContext = createContext<{ theme: 'light' | 'dark' }>({ theme: 'light' })

/** 练习：对照 src/chapters/03-hooks-toggle.tsx */
export function Practice03Hooks() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)
  renderCount.current++

  const [counterState, counterDispatch] = useReducer(reducerFunc, { count: 0 })


  const inputRef = useRef<HTMLInputElement>(null)
  const [intervalTick, setIntervalTick] = useState(0)

  const setTick = useEffectEvent(() => {
    setIntervalTick(v => v + 1)
  })

  useEffect(() => {
    inputRef.current?.focus()
    const interval = setInterval(() => {
      setTick()
    }, 1000)
    console.log('interval', interval);
    return () => clearInterval(interval)
  }, [])
  

  const [items] = useState([
    { id: '1', ok: true, label: 'A' },
    { id: '2', ok: false, label: 'B' },
    { id: '3', ok: true, label: 'C' },
  ])
  const [on, toggle] = useToggle(false)
  const filtered = useMemo(() => items.filter((i) => i.ok), [items])

  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const fieldId = useId()
  
  return (
    <ThemeContext.Provider value={{ theme }}>
      <div className="chapter">
        <ChapterHeading
          id="03"
          title="Hooks 核心（练习）"
          doc="03-Hooks核心.md"
        />

        <DemoSection
          title="A. useState + 函数式更新"
          point="异步/连续更新用 setN(v => ...)，避免闭包陈旧值。"
        >
          <PracticeTodo
            checks={[
              'useState 计数按钮（函数式 +1）',
              '用 useRef 显示 renderCount（不触发渲染）',
            ]}
          />
          <button onClick={() => setCount(count + 1)}>useState: {count}</button>
          <p>renderCount(ref): {renderCount.current}</p>
        </DemoSection>

        <DemoSection
          title="B. useReducer"
          point="多分支状态迁移集中在 reducer；类似迷你 Redux。"
        >
          <PracticeTodo
            checks={[
              'reducer：inc / add(payload) / reset',
              '三个按钮分别 dispatch',
            ]}
          />
          <p>count = {counterState.count}</p>
          <button onClick={() => counterDispatch({ type: 'inc' })}>inc</button>
          <button onClick={() => counterDispatch({ type: 'add', payload: 10 })}>add 10</button>
          <button onClick={() => counterDispatch({ type: 'reset' })}>reset</button>
        </DemoSection>

        <DemoSection
          title="C. useRef + useEffect 清理"
          point="ref 拿 DOM；Effect 订阅外部系统并 cleanup。"
        >
          <PracticeTodo
            checks={[
              'input 挂载后 focus',
              'setInterval 每秒 tick，卸载时 clearInterval',
            ]}
          />
          <input type="text" ref={inputRef} />
          <p>interval tick: {intervalTick}</p>
        </DemoSection>

        <DemoSection
          title="D. useMemo + useCallback + 自定义 Hook"
          point="useMemo 缓存派生列表；useToggle 展示自定义 Hook。"
        >
          <PracticeTodo
            checks={[
              '实现 useToggle，页面展示 ON/OFF',
              'useMemo 过滤 ok===true 的 items',
            ]}
          />
          <p>on: {on ? 'ON' : 'OFF'}</p>
          <button onClick={toggle}>toggle</button>
          <p>filtered: {filtered.map((i) => i.label).join(', ')}</p>
        </DemoSection>

        <DemoSection
          title="E. useContext + useId"
          point="低频环境量用 Context；useId 关联 label/input。"
        >
          <PracticeTodo
            checks={[
              'ThemeContext + 切换 light/dark，子组件消费',
              'useId 绑定 label htmlFor 与 input id',
            ]}
          />
          <ToggleTheme /><button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>toggle theme</button>
        </DemoSection>
      </div>
    </ThemeContext.Provider>
  )
}

function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn((v) => !v), [])
  return [on, toggle] as [boolean, () => void]
}


function ToggleTheme() {
  const value = useContext(ThemeContext)
  return <div className={`theme-badge theme-${value.theme}`}>Current Theme: {value.theme}</div>
} 