# 03 · Hooks 核心

**一句话目标**：掌握常用 Hooks 的职责边界与 Rules of Hooks，能用自定义 Hook 抽逻辑，并对齐 Vue Composition API。

## Vue ↔ React 对照

| Vue Composition API | React Hooks |
|---------------------|-------------|
| `ref` / `reactive` | `useState` / `useReducer` |
| `computed` | 一般直接算；贵重计算用 `useMemo` |
| `watch` / `watchEffect` | `useEffect`（见 05，语义更窄） |
| `onMounted` / `onUnmounted` | `useEffect(() => { ...; return cleanup }, [])` |
| `provide` / `inject` | `createContext` + `useContext` |
| 模板 ref | `useRef` |
| 组合式函数 `useXxx` | 自定义 Hook `useXxx` |

## Rules of Hooks

1. 只在**函数组件顶层**或**自定义 Hook** 里调用。
2. 不要在 `if` / `for` / 嵌套函数里调用（顺序必须稳定）。
3. 名字以 `use` 开头，便于 lint。

## 常用 Hooks 速写

### useState / useReducer

```tsx
import { useState, useReducer } from 'react'

function Counter() {
  const [n, setN] = useState(0)
  // 函数式更新：避免闭包读到旧 n
  return <button onClick={() => setN((v) => v + 1)}>{n}</button>
}

type State = { count: number }
type Action = { type: 'inc' } | { type: 'add'; payload: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 }
    case 'add':
      return { count: state.count + action.payload }
    default:
      return state
  }
}

function WithReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return <button onClick={() => dispatch({ type: 'inc' })}>{state.count}</button>
}
```

- 简单值 → `useState`；多分支、下一状态强依赖上一状态 → `useReducer`。

### useRef

```tsx
import { useRef, useEffect } from 'react'

function TextBox() {
  const inputRef = useRef<HTMLInputElement>(null)
  const renderCount = useRef(0)
  renderCount.current += 1 // 改 ref 不触发重渲染

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return <input ref={inputRef} />
}
```

- DOM 句柄、定时器 id、保存「任意可变盒子」且**不想触发渲染**。

### useEffect / useLayoutEffect

```tsx
useEffect(() => {
  const id = setInterval(() => {}, 1000)
  return () => clearInterval(id) // 清理
}, [dep])

// 在浏览器绘制前同步跑：量 DOM、防闪烁；慎用
useLayoutEffect(() => {
  // 读 layout / 同步写 DOM
}, [])
```

- Effect = **同步外部系统**（订阅、定时器、非 React widget），不是「一挂载就请求」的默认位（见 05）。

### useMemo / useCallback

```tsx
const filtered = useMemo(() => items.filter((i) => i.ok), [items])
const onSelect = useCallback((id: string) => {
  setSelected(id)
}, [])
```

- 先保证正确；再为「昂贵计算」或「传给 memo 子组件的稳定引用」使用。
- 有 React Compiler 的项目，多数手写 memo 可减少。

### useContext

```tsx
import { createContext, useContext } from 'react'

type Theme = 'light' | 'dark'
const ThemeContext = createContext<Theme>('light')

function useTheme() {
  return useContext(ThemeContext)
}

function App() {
  return (
    <ThemeContext value="dark">
      <Child />
    </ThemeContext>
  )
}
```

- React 19 可用 `<ThemeContext value={...}>`；旧写法 `ThemeContext.Provider`。

### useId

```tsx
const id = useId()
return (
  <>
    <label htmlFor={id}>名</label>
    <input id={id} />
  </>
)
```

- SSR 友好的稳定 id，避免手写递增冲突。

## 自定义 Hook

```tsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn((v) => !v), [])
  return [on, toggle] as const
}
```

- 抽的是**有状态逻辑**，不是 UI；命名 `useXxx`；可组合多个 Hooks。

## 工作约定

- ESLint：`eslint-plugin-react-hooks`（`rules-of-hooks` + `exhaustive-deps`）必开。
- 业务逻辑优先自定义 Hook（`useUser`、`usePermission`），页面变薄。
- Context 放主题/语言/当前用户等**低频变更**；高频状态用状态库或下沉。

## 踩坑

1. Effect 依赖漏了 → 闭包陈旧；乱加依赖 → 死循环。
2. `useMemo(() => fn, [])` 记成 `useCallback`：前者缓存值，后者缓存函数。
3. 条件里调用 Hooks → 运行时错乱，lint 会拦。
4. 用 `useRef` 存该驱动 UI 的值 → 界面不更新；该用 `useState`。

## 面试点 / 工作经验点

### Q1：Hooks 为什么依赖调用顺序？（链表）
**标签**：`面试` `原理`

**A**：每个组件 Fiber 上按调用顺序挂一条 Hook 链表。每次渲染按同一顺序取第 n 个 Hook。条件调用会错位，导致 state 错乱。所以规则是「顶层、同序」。

### Q2：什么是闭包陈旧 state？怎么解？
**标签**：`面试` `工作经验`

**A**：异步回调 / Effect 捕获了某次渲染的 props/state。解法：函数式更新 `setX(x => ...)`；把值放进依赖；用 `useRef` 存最新值；或把逻辑改成「事件里读最新」。

### Q3：`useEffect` 和 `useLayoutEffect` 区别？
**标签**：`面试` `原理`

**A**：`useEffect` 在绘制后异步执行；`useLayoutEffect` 在 DOM 更新后、绘制前同步执行。量尺寸、防闪烁用 layout；其余默认 effect，避免阻塞绘制。

### Q4：为什么不能在条件里调用 Hooks？
**标签**：`面试`

**A**：破坏顺序稳定性。正确做法：Hook 总调用，在 Hook 内部或返回值处分支。

### Q5：自定义 Hook 和普通函数怎么分？
**标签**：`工作经验` `面试`

**A**：要用到其他 Hooks 或需要遵循 Hooks 规则 → 自定义 Hook。纯计算 / 无状态工具 → 普通函数。不要把 JSX 硬塞进 Hook（可返回数据 + 回调，UI 留给组件）。

### Q6：`useMemo` / `useCallback` 是银弹吗？
**标签**：`工作经验` `面试`

**A**：不是。有成本（比较依赖）。子树重、或要稳定引用喂给 `memo` 子组件时才有意义。优先：状态位置合理、拆组件、列表虚拟化；再考虑 memo 族。

### Q7：`useReducer` 相对 `useState` 的工程价值？
**标签**：`工作经验`

**A**：复杂状态迁移集中在 reducer，易测、易读。局部「迷你 Redux」即可；全局仍用 Zustand/RTK。

### Q8：`useRef` 除了 DOM 还能干什么？
**标签**：`面试` `工作经验`

**A**：存上一轮 props、定时器、最新回调（避免 Effect 重订）、与外部库的实例。改 `.current` 不触发渲染。

## 自测题

1. 写一个 `useLocalStorage(key, initial)`。
2. 解释：`setInterval` 里直接用 `count` 为何一直是 0，怎么改。
3. 什么情况下用 `useLayoutEffect`？
