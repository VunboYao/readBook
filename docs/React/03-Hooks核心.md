# 03 · Hooks 核心

**一句话目标**：掌握常用 Hooks 的职责边界与 Rules of Hooks，能用自定义 Hook 抽逻辑，并对齐 Vue Composition API。

**怎么读**：日常写代码看「速查」；遗忘重学 / 第一次对齐看「详解」。练习场：`React/playground` → `#03`（左练习 / 右答案）。

---

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

核心差异一句话：**Vue 改数据，框架找依赖；React 你声明下一帧 UI，组件函数重跑。**

---

## Rules of Hooks

1. 只在**函数组件顶层**或**自定义 Hook** 里调用。
2. 不要在 `if` / `for` / 嵌套函数里调用（顺序必须稳定）。
3. 名字以 `use` 开头，便于 lint。

---

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

---

## 详解（遗忘重学）

> 面向已熟练 Vue、Hooks 生疏的前端。先对齐心智，再按 Hook 逐个吃透。

### 0. 先对齐心智（比背 API 重要）

| | Vue 3 | React |
|--|-------|-------|
| 状态 | `ref` / `reactive`，改 `.value` 就更新 | `useState`，必须 `setXxx` 才能触发重渲染 |
| 组件函数 | `setup` 大致跑一次，响应式持续跟踪 | **每次 state 变 → 函数整段再跑一遍** |
| 派生值 | `computed` | 多数直接算；贵重才用 `useMemo` |
| 副作用 | `watch` / `onMounted` | `useEffect`（语义更窄，别当万能生命周期） |
| 抽逻辑 | `useXxx` 组合式函数 | 自定义 Hook `useXxx`（规则一样） |

### 1. Rules of Hooks 为什么必须遵守

每个组件 Fiber 上按调用顺序挂一条 Hook 链表。第 1 次渲染是 `useState → useEffect → useRef`，第 2 次也必须同一顺序。条件调用会导致「读错格子」——state 串台。

```tsx
// ❌ 错
if (cond) {
  const [x, setX] = useState(0)
}

// ✅ 对：Hook 总调用，内部 / 返回值再分支
const [x, setX] = useState(0)
if (cond) {
  // 用 x
}
```

工程上：开 `eslint-plugin-react-hooks`（`rules-of-hooks` + `exhaustive-deps`）。

### 2. useState —— 最常用的「ref」

```tsx
const [n, setN] = useState(0)

setN(1) // 直接写新值
setN((v) => v + 1) // 函数式：基于最新 state，避免闭包陈旧
```

**Vue 对照**：`const n = ref(0)` → `n.value++`；React 没有 `.value`，靠 `setN`。

**何时用函数式更新**：

- 连续点两次（批更新里读旧值会错）
- 定时器 / Promise / 事件回调里更新
- 下一状态只依赖上一状态

```tsx
// 可能错：闭包里的 n 可能是旧的
setTimeout(() => setN(n + 1), 1000)

// 对
setTimeout(() => setN((v) => v + 1), 1000)
```

对象 / 数组要**不可变更新**（别 `push` 完指望刷新）：

```tsx
setList((list) => [...list, item])
setUser((u) => ({ ...u, name: 'Ada' }))
```

### 3. useReducer —— 局部「迷你 Redux」

简单布尔 / 数字 → `useState`；多分支、下一状态强依赖上一状态、要集中测状态机 → `useReducer`。

```tsx
type State = { count: number }
type Action =
  | { type: 'inc' }
  | { type: 'add'; payload: number }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
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

function Demo() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return (
    <>
      <p>{state.count}</p>
      <button type="button" onClick={() => dispatch({ type: 'inc' })}>
        +1
      </button>
      <button type="button" onClick={() => dispatch({ type: 'add', payload: 5 })}>
        +5
      </button>
    </>
  )
}
```

**工程价值**：状态迁移集中、易测、可读；全局仍用 Zustand / RTK，不必用 reducer 扛全局。

### 4. useRef —— DOM + 「可变盒子」

```tsx
const inputRef = useRef<HTMLInputElement>(null)
const renderCount = useRef(0)

renderCount.current += 1 // 改 .current 不触发重渲染

useEffect(() => {
  inputRef.current?.focus()
}, [])

return <input ref={inputRef} />
```

| 用途 | 说明 |
|------|------|
| DOM 句柄 | 等同 Vue `ref="el"` / template ref |
| 定时器 id、外部库实例 | 跨渲染保存，不驱动 UI |
| 最新 props / 回调 | 避免 Effect 因回调变而反复重订 |

**坑**：该驱动界面的值却放进 `useRef` → 界面不更新。规则：**UI 用 `useState`，静默盒子用 `useRef`。**

### 5. useEffect ——「同步外部系统」，不是 onMounted 万能位

```tsx
useEffect(() => {
  const id = setInterval(() => {
    setTick((t) => t + 1)
  }, 1000)
  return () => clearInterval(id) // cleanup：卸载或依赖变之前
}, []) // [] ≈ onMounted + onUnmounted（cleanup）
```

**语义对照（别死记生命周期）**：

| Vue | React（近似） |
|-----|----------------|
| `onMounted` + `onUnmounted` | `useEffect(fn, [])` + `return cleanup` |
| `watch(dep, fn)` | `useEffect(fn, [dep])` |
| `watchEffect` | 不完全等价；Effect 依赖要显式列 |

**默认用途**：订阅、定时器、非 React widget、和浏览器 / 第三方同步。  
**不要默认**：一挂载就在 Effect 里请求（数据获取见 [05](./05-副作用与数据获取.md) / TanStack Query）。

#### useLayoutEffect

- `useEffect`：绘制**后**异步跑（默认选这个）
- `useLayoutEffect`：DOM 更新后、绘制**前**同步跑

量尺寸、防闪烁用 layout；其余用 effect，避免阻塞绘制。

#### 闭包陈旧（高频坑）

```tsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(count) // 若 deps=[]，永远是初始 count
  }, 1000)
  return () => clearInterval(id)
}, []) // 漏了 count
```

解法任选：

1. 依赖写全：`[count]`（会重订 interval）
2. 函数式更新：`setCount((c) => c + 1)`
3. `useRef` 存最新值，interval 读 `ref.current`
4. 逻辑放到事件里读最新（能不用 Effect 就不用）

### 6. useMemo / useCallback —— 先正确，再谈缓存

```tsx
const filtered = useMemo(() => items.filter((i) => i.ok), [items])

const onSelect = useCallback((id: string) => {
  setSelected(id)
}, [])
```

| Hook | 缓存什么 |
|------|----------|
| `useMemo` | **计算结果**（值） |
| `useCallback` | **函数引用**（本质是 `useMemo(() => fn, deps)`） |

**值得用**：计算真贵；或要把稳定引用传给 `memo` 子组件。  
**别滥用**：普通派生直接算；有 React Compiler 时多数手写 memo 可减。memo 本身有依赖比较成本。

### 7. useContext —— provide / inject

```tsx
type Theme = 'light' | 'dark'
const ThemeContext = createContext<Theme>('light')

function useTheme() {
  return useContext(ThemeContext)
}

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  return (
    // React 19：可直接 <ThemeContext value={...}>
    // 旧写法：ThemeContext.Provider
    <ThemeContext value={theme}>
      <Child />
      <button
        type="button"
        onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      >
        切换
      </button>
    </ThemeContext>
  )
}
```

**约定**：主题 / 语言 / 当前用户等**低频**环境量用 Context；高频状态（输入、动画帧）用状态库或状态下沉，否则 Provider 一更新整棵消费树都重渲染。

### 8. useId —— SSR 友好的稳定 id

```tsx
const id = useId()
return (
  <>
    <label htmlFor={id}>昵称</label>
    <input id={id} />
  </>
)
```

别手写全局递增计数器（SSR / 多实例会撞）。`useId` 专治 label/input、aria 关联。

### 9. 自定义 Hook —— 抽有状态逻辑，不抽 UI

```tsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn((v) => !v), [])
  return [on, toggle] as const
}

const [on, toggle] = useToggle(false)
```

和 Vue 组合式函数同一套路：

- 要用别的 Hooks → 必须叫 `useXxx`，遵守 Rules
- 纯计算 / 无状态 → 普通函数即可
- 返回数据 + 回调，**JSX 留给组件**

业务里常见：`useUser`、`usePermission`、`useLocalStorage`，页面变薄。

自测题参考实现：

```tsx
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const raw = localStorage.getItem(key)
    return raw != null ? (JSON.parse(raw) as T) : initial
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
```

（生产可再加 SSR 判断、错误处理；思路是这个。）

### 10. 选型速查

| 场景 | 用 |
|------|-----|
| 简单 UI 状态 | `useState` |
| 多分支状态机 | `useReducer` |
| DOM / 定时器 / 最新值盒子 | `useRef` |
| 订阅外部系统 | `useEffect` + cleanup |
| 量 DOM / 防闪烁 | `useLayoutEffect` |
| 贵重派生 / 稳引用给 memo 子组件 | `useMemo` / `useCallback` |
| 跨层低频环境量 | `useContext` |
| 可访问性 id | `useId` |
| 复用有状态逻辑 | 自定义 `useXxx` |

### 11. 建议复习路径（1～2 小时）

1. 先扫「速查」，再精读本节详解。
2. 启动 playground：`cd React/playground && npm run dev`，打开 `#03`。
3. 左侧 `src/practice/03-hooks.tsx` 按 TODO 实现，对照右侧答案。
4. 做完下方自测三题，口头复述「面试点」。
5. 数据请求别停在 Effect——接着看 [05 · 副作用与数据获取](./05-副作用与数据获取.md)。

---

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
