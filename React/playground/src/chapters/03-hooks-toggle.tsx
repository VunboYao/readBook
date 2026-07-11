import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { ChapterHeading, DemoSection } from '../shared/demo'

type CounterState = { count: number }
type CounterAction =
  | { type: 'inc' }
  | { type: 'add'; payload: number }
  | { type: 'reset' }

function counterReducer(state: CounterState, action: CounterAction): CounterState {
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

type Theme = 'light' | 'dark'
const ThemeContext = createContext<Theme>('light')

function useTheme() {
  return useContext(ThemeContext)
}

function ThemedBadge() {
  const theme = useTheme()
  return (
    <span className={`theme-badge theme-${theme}`}>当前主题：{theme}</span>
  )
}

function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn((v) => !v), [])
  return [on, toggle] as const
}

/**
 * 03 · Hooks 全家桶装进一个可交互页
 */
export function Chapter03Hooks() {
  const [n, setN] = useState(0)
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })
  const inputRef = useRef<HTMLInputElement>(null)
  const renderCount = useRef(0)
  renderCount.current += 1
  const [tick, setTick] = useState(0)
  const [items] = useState([
    { id: '1', ok: true, label: 'A' },
    { id: '2', ok: false, label: 'B' },
    { id: '3', ok: true, label: 'C' },
  ])
  const [theme, setTheme] = useState<Theme>('light')
  const [on, toggle] = useToggle(false)
  const fieldId = useId()

  const filtered = useMemo(() => items.filter((i) => i.ok), [items])

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="chapter">
      <ChapterHeading id="03" title="Hooks 核心" doc="03-Hooks核心.md" />

      <DemoSection
        title="A. useState + 函数式更新"
        point="异步/连续更新用 setN(v => ...)，避免闭包陈旧值。"
      >
        <button type="button" onClick={() => setN((v) => v + 1)}>
          useState: {n}
        </button>
        <p className="demo-hint">renderCount(ref)={renderCount.current}（改 ref 不触发渲染）</p>
      </DemoSection>

      <DemoSection
        title="B. useReducer"
        point="多分支状态迁移集中在 reducer；类似迷你 Redux。"
      >
        <p>count = {state.count}</p>
        <button type="button" onClick={() => dispatch({ type: 'inc' })}>
          inc
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'add', payload: 5 })}
        >
          +5
        </button>
        <button type="button" onClick={() => dispatch({ type: 'reset' })}>
          reset
        </button>
      </DemoSection>

      <DemoSection
        title="C. useRef + useEffect 清理"
        point="ref 拿 DOM；Effect 订阅外部系统并 cleanup。下方 tick 每秒 +1。"
      >
        <input ref={inputRef} placeholder="挂载后自动 focus" />
        <p>interval tick: {tick}</p>
      </DemoSection>

      <DemoSection
        title="D. useMemo + useCallback + 自定义 Hook"
        point="useMemo 缓存派生列表；useToggle 展示自定义 Hook 组合。"
      >
        <p>filtered ok items: {filtered.map((i) => i.label).join(', ')}</p>
        <p>toggle: {on ? 'ON' : 'OFF'}</p>
        <button type="button" onClick={toggle}>
          useToggle
        </button>
      </DemoSection>

      <DemoSection
        title="E. useContext + useId"
        point="低频环境量用 Context；useId 生成 SSR 友好的 label/input 关联 id。"
      >
        <ThemeContext value={theme}>
          <ThemedBadge />
          <button
            type="button"
            onClick={() =>
              setTheme((t) => (t === 'light' ? 'dark' : 'light'))
            }
          >
            切换主题
          </button>
        </ThemeContext>
        <div style={{ marginTop: 12 }}>
          <label htmlFor={fieldId}>昵称</label>{' '}
          <input id={fieldId} placeholder={`id=${fieldId}`} />
        </div>
      </DemoSection>
    </div>
  )
}
