# 01 · 思维模型与 Vue 对照

**一句话目标**：把 Vue 的「可变响应式 + 精确更新」心智，换成 React 的「不可变状态 + 重渲染」心智，并建立 React 19 工作流总览。

## Vue ↔ React 对照

| 点 | Vue 3 | React |
|----|-------|-------|
| 声明式 UI | 模板 / JSX | JSX |
| 状态变更后 | Proxy 依赖收集，精确更新 | 触发组件函数再跑一遍（re-render） |
| 数据默认 | `ref`/`reactive` 可变 | state **不可原地改**，要 `setState` 新值 |
| 副作用 | `watch` / `watchEffect` | `useEffect`（语义不同，见 05） |
| 全局通信 | provide/inject、Pinia | Context、Zustand 等 |
| 组件边界 | SFC（script+template+style） | 函数组件 + 独立样式方案 |
| 编译优化 | 编译期静态提升、补丁标记 | 运行时 +（可选）React Compiler |

核心差异一句话：**Vue 改数据，框架帮你找谁更新；React 你声明「下一帧 UI」，框架再 diff 提交。**

## 最小心智模型

```tsx
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

function Counter() {
  const [count, setCount] = useState(0)
  // 每次 setCount → 本函数再执行一遍 → 返回新 JSX → React 提交 DOM
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      {count}
    </button>
  )
}

createRoot(document.getElementById('root')!).render(<Counter />)
```

对照 Vue：

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## React 19 工作流一页总览

| 能力 | 何时用 |
|------|--------|
| Hooks 组件 | SPA / Client Component 默认写法 |
| Actions + `useActionState` / `useFormStatus` / `useOptimistic` | 表单提交、乐观更新（见 04） |
| `use` | 在渲染中读 Promise / Context（配合 Suspense） |
| `ref` 作 prop | 不必再包 `forwardRef`（多数场景） |
| Document Metadata | 组件里直接写 `<title>` 等（库内支持） |
| Server Components | 主要在 Next App Router（见 09） |

## 工作约定

- **新项目默认函数组件 + Hooks**；类组件只读不写。
- **状态当不可变**：对象/数组用展开或不可变工具更新，勿 `arr.push` 后指望更新。
- **能下沉的状态下沉，能提升的才提升**；别一上来 Context / 全局 store。
- SPA 用 Vite；要 SSR/SEO/RSC 再上 Next（见 09 决策表）。

## 踩坑

1. 把 Vue 的「改 `.value` 就更新」搬到 React：改了对象属性却没 `setState` → 不刷新。
2. 在渲染路径里发请求 / 写 `localStorage` → 应用 Effect 或事件处理器（见 05）。
3. 拿旧笔记里的 `ReactDOM.render`：React 18+ 用 `createRoot`。
4. 以为 Virtual DOM = 一定更快：它是抽象与跨平台手段，不是银弹。

## 面试点 / 工作经验点

### Q1：React 和 Vue 最大的心智差异是什么？
**标签**：`面试` `原理`

**A**：都是声明式 UI。Vue 靠响应式系统追踪依赖，改数据后精确通知订阅者；React 靠「状态变更 → 组件函数重跑 → 协调（reconcile）→ 提交 DOM」。工程上 React 更强调不可变更新与渲染纯度；Vue 更接近「可变数据模型」。

### Q2：为什么 React 不自动追踪依赖（像 Vue Proxy）？
**标签**：`面试` `原理`

**A**：设计选择不同：React 把「何时重算 UI」交给显式 `setState` / props 变化，渲染函数应尽量纯。代价是要自己管依赖数组、避免闭包陈旧；收益是模型简单、易推理、易做并发渲染（可中断的工作单元）。

### Q3：Virtual DOM 还有价值吗？
**标签**：`面试` `原理`

**A**：价值在：用对象描述 UI、跨平台（RN 等）、把更新算成补丁。现代框架未必都靠 VDOM 才能快；谈性能要落到「少做无效工作」（状态粒度、memo、列表 key、Compiler），不要神话 VDOM。

### Q4：Fiber 用一句话怎么讲？
**标签**：`面试` `原理`

**A**：Fiber 是 React 的协调算法与工作单元结构，把更新拆成可中断的小任务，以便优先响应用户输入、支持并发特性（如 `startTransition`）。面试说到「可中断渲染 / 优先级」即可，不必背源码细节。

### Q5：什么是 setState 批处理（batching）？
**标签**：`面试` `工作经验`

**A**：同一事件处理器里多次 `setState`，React 会合并成一次重渲染。React 18+ 在 Promise、setTimeout、原生事件里也默认批处理。需要「基于上一次结果」时用函数式更新：`setCount(c => c + 1)`。

### Q6：单向数据流怎么跟面试官说？
**标签**：`面试`

**A**：数据从上到下（props），事件从下到上（回调）。子组件不直接改父 state，而是调父传来的 `onChange`。对应 Vue：也推荐单向；Vue 的 `v-model` 是语法糖，底层仍是 props + emit。

### Q7：进组后如何快速对齐「这个项目怎么写 React」？
**标签**：`工作经验`

**A**：先看：脚手架（Vite/Next）、状态方案（Zustand/Redux/Query）、路由、目录约定、是否有 React Compiler / Strict Mode。对照本系列 07–10 章清单扫一遍，比先啃完整官方文档更快。

### Q8：React 19 相对 18，工作里最先感知的变化？
**标签**：`工作经验` `面试`

**A**：Actions 相关 Hooks、表单友好；`ref` 作普通 prop；文档元数据；以及配合 Next 的 RSC 生态更成熟。纯 Vite SPA 日常仍以 Hooks + Query 为主，不必为了 19 硬上 Server Components。

## 自测题

1. 用两句话对比 Vue `ref` 与 React `useState` 的更新机制。
2. 为什么对象 `user.name = 'x'` 后界面可能不变？应怎么写？
3. 什么场景选 Vite SPA，什么场景选 Next？
