# 02 · JSX、组件与渲染

**一句话目标**：用 JSX 熟练表达 UI；掌握 props/children、列表 key、受控输入、事件与 Portal，并对齐 Vue 模板习惯。

## Vue ↔ React 对照

| Vue | React |
|-----|-------|
| 模板 + 指令 | JSX（JS 表达式） |
| `v-if` / `v-show` | `&&` / 三元；无内置 `v-show`（用 style/class） |
| `v-for` + `:key` | `array.map` + `key` |
| `v-bind:class` / `:style` | `className` / `style={{}}` |
| `v-model` | 受控：`value` + `onChange` |
| `@click` | `onClick`（驼峰） |
| `$slots` / `<slot>` | `props.children` / 具名用 props 传节点 |
| `Teleport` | `createPortal` |
| 组件名 | **必须大写开头**，否则当 DOM 标签 |

## JSX 规则速查

```tsx
function Hello({ name, children }: { name: string; children?: React.ReactNode }) {
  const ok = true
  return (
    <div className="box" style={{ padding: 8 }}>
      {/* 注释必须包在 {} 里 */}
      <h1>Hello {name}</h1>
      {ok ? <p>可见</p> : null}
      {children}
    </div>
  )
}
```

- `{}` 里放**表达式**，不能直接放 `if/for` 语句（可 IIFE 或提到外面）。
- 布尔属性：`<input disabled />`；动态：`disabled={isDisabled}`。
- 多个根：用 `<>...</>` Fragment，或数组。

## 列表与 key

```tsx
type Item = { id: string; title: string }

function List({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
```

- key 用**稳定业务 id**，不要用 index（除非静态只读列表且永不重排）。
- key 变了 ≈ React 认为是新节点 → 状态重置（可故意用来「重置组件」）。

## 受控 vs 非受控（对照 v-model）

```tsx
import { useState, useRef } from 'react'

// 受控：React 是唯一数据源（表单主推）
function Controlled() {
  const [text, setText] = useState('')
  return <input value={text} onChange={(e) => setText(e.target.value)} />
}

// 非受控：读 DOM（文件上传、对接非 React 插件时）
function Uncontrolled() {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <button type="button" onClick={() => console.log(ref.current?.value)}>
      读
      <input ref={ref} defaultValue="init" />
    </button>
  )
}
```

## 事件与 Portal

```tsx
import { createPortal } from 'react-dom'

function Modal({ open, onClose, children }: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  if (!open) return null
  return createPortal(
    <div className="mask" onClick={onClose} role="presentation">
      <div className="dialog" onClick={(e) => e.stopPropagation()} role="dialog">
        {children}
      </div>
    </div>,
    document.body,
  )
}
```

- 事件是**合成事件**（跨浏览器包装）；多数情况像原生一样用。
- 需要原生捕获/第三方库时，用 `ref` + `addEventListener`，并在 Effect 里清理。

## 工作约定

- 展示组件：纯 props → UI；容器组件：拉数据 / 拼状态再往下传。
- 条件渲染优先可读的早退：`if (!data) return <Empty />`。
- 弹层、抽屉统一 Portal 到 `body`，避免 `overflow: hidden` 裁剪。
- React 19：`ref` 可直接当 prop 传给函数组件，多数场景无需 `forwardRef`。

## 踩坑

1. `class` / `for` 要写成 `className` / `htmlFor`。
2. `style={{ marginTop: 8 }}` 是对象；写成字符串是 HTML 习惯，JSX 里不推荐。
3. `items.map` 忘记 `key` 或用 index 导致输入框错乱。
4. `onClick={fn()}` 写成立即调用 → 渲染就执行；应 `onClick={fn}` 或 `() => fn(id)`。
5. 用 `&&` 时左侧为 `0` 会渲染出 `0`：`count > 0 && <Badge />`。

## 面试点 / 工作经验点

### Q1：key 的真实作用是什么？
**标签**：`面试` `原理`

**A**：在同级 diff 时标识「是不是同一个节点」。稳定 key 让 React 复用 DOM 与组件状态；错误 key（如 index）在插入/删除/排序时会导致状态错位。工作中列表项有本地 state（展开、输入）时尤其要命。

### Q2：React diff 是粗粒度的吗？
**标签**：`面试` `原理`

**A**：同层比较、类型不同则拆旧建新、通过 key 对齐列表。不做跨层移动的完整树匹配。所以结构稳定、key 正确比「手写极致 diff」更重要。

### Q3：合成事件和原生事件有什么区别？
**标签**：`面试` `原理`

**A**：React 在根上委托监听，回调收到的是合成事件对象（现多与原生对齐）。注意：`e.stopPropagation()` 在合成体系与原生混用时可能不符合直觉；第三方非 React DOM 优先原生监听。

### Q4：为什么组件名必须大写？
**标签**：`面试`

**A**：JSX 约定：小写当作内置 HTML/SVG 标签；大写当作组件（函数/类）。`<hello />` 不会跑你的组件。

### Q5：`children` 是什么？
**标签**：`面试` `工作经验`

**A**：就是一个常规 prop，表示标签中间的内容，类型常为 `React.ReactNode`。具名插槽用额外 props（如 `title={<h1/>}`）或复合组件模式，没有 Vue `<slot name>` 语法。

### Q6：受控和非受控怎么选型？
**标签**：`工作经验` `面试`

**A**：默认受控，校验、禁用提交、联动清晰。非受控适合：简单表单一次读取、文件 input、封装遗留 DOM 组件。混用时不要同一字段既 `value` 又靠 DOM 偷偷改。

### Q7：如何故意「重置」一块 UI 状态？
**标签**：`工作经验`

**A**：给组件换 `key`（如 `key={userId}`）。用户切换时本地表单 state 跟着丢弃重建。比手动 `setState` 清一堆字段更干净。

### Q8：Fragment 和数组返回有何注意？
**标签**：`面试`

**A**：`<>` 不产生 DOM 节点；列表里每个子项仍要有 key。返回数组时每个元素需要 key。

## 自测题

1. 把一段带 `v-if` / `v-for` / `v-model` 的 Vue 模板改成 JSX。
2. 解释：列表用 index 作 key，删除中间项后输入框内容错乱的原因。
3. Modal 为什么常用 Portal？
