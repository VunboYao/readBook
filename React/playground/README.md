# React Playground

对齐 [`docs/React`](../../docs/React/README.md) 的**完整可交互演示**（不是文档碎片粘贴）。

- **底座**：Vite + React 19 + TypeScript
- **已预装**：`react-router`、`zustand`、`@tanstack/react-query`、`react-hook-form`
- **章节**：`#01`–`#09` 顶栏切换；每章内用 `DemoSection` 分块标出技术点

## 启动

```bash
cd React/playground
npm install
npm run dev
```

## 章节 ↔ 文档 ↔ 演示重点

| Hash | 文件 | 文档 | 演示组装了什么 |
|------|------|------|----------------|
| `#01` | `01-counter.tsx` | 思维模型 | 重渲染次数、批处理、不可变 vs 原地改 |
| `#02` | `02-list-form.tsx` | JSX | children、key 错位实验、受控/非受控、Portal、key 重置 |
| `#03` | `03-hooks-toggle.tsx` | Hooks | state/reducer/ref/effect/memo/context/id/自定义 Hook |
| `#04` | `04-data-flow.tsx` | 数据流 | 状态提升、Context、受控表单、Actions+乐观更新 |
| `#05` | `05-effects-query.tsx` | 副作用 | 正确 Effect、Effect 请求竞态、TanStack Query |
| `#06` | `06-perf.tsx` | 性能 | memo 行渲染计数、deferred / transition 过滤 |
| `#07` | `07-engineering.tsx` | 工程 TS | Props 类型、事件类型、CSS Modules、env |
| `#08` | `08-ecosystem.tsx` | 生态 | MemoryRouter 迷你应用 + Zustand + RHF |
| `#09` | `09-next-guide.tsx` | Next | RSC 边界对照（真 Next 需另建项目） |

## 怎么自己加练习

1. 在 `src/chapters/` 新建或改现有文件，用 `ChapterHeading` + `DemoSection` 包起来。
2. 在 `App.tsx` 的 `chapters` 数组注册。
3. 保存后 HMR 刷新。

## 脚本

| 命令 | 作用 |
|------|------|
| `npm run dev` | 开发 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览构建产物 |
