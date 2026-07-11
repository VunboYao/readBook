# React 速通教程（Vue 经验者 / 工作向）

面向已熟练 Vue2/Vue3、学过 React 但语法生疏的前端。目标：用对照式笔记快速对齐 **约 3 年 React 工程经验** 的知识密度，能直接上手工作项目，并能口述核心原理。

官方文档（[react.dev/learn](https://zh-hans.react.dev/learn)）适合细读；本系列刻意压缩叙事，强调 **对照表 + 最小代码 + 工作约定 + 面试点**。

## 推荐技术栈

| 层 | 选型 |
|----|------|
| 运行时 | React **19.2.x** + `react-dom` |
| 语言 | TypeScript |
| SPA 脚手架 | Vite + `@vitejs/plugin-react` |
| 路由 | React Router 7 |
| 客户端状态 | Zustand（主推）；Redux Toolkit（读旧项目） |
| 服务端状态 | TanStack Query |
| 表单 | React Hook Form |
| 全栈/SSR | Next.js 15 App Router |

## 本地练习场

跑文档代码用 Vite SPA（不要用 CRA）：

- 项目：[`React/playground`](../../React/playground/README.md)
- 启动：`cd React/playground && npm install && npm run dev`
- **左右对照**：左「练习」写 `src/practice/*`（DemoSection 壳 + 验收 TODO）；右「参考答案」为 `src/chapters/*` 完整实现，无需来回切换
- 章节 `#01`…`#09`；窄屏上下堆叠
- 09（真 RSC/Server Actions）仍需另建 Next 项目；playground 内是边界对照页

## 怎么读

- **日常写代码**：跟正文理解概念，再到练习场对应章节动手验证
- **面试 / 深挖**：每章末尾 `## 面试点 / 工作经验点` + [第 10 章索引](./10-工作上手清单与面试索引.md)
- **顺序**：`01 → 06`（核心）→ `07 → 08`（工程生态）→ `09`（Next）→ `10`（清单与补遗）

### 节奏建议

| 节奏 | 内容 |
|------|------|
| 3 天突击 | Day1: 01–04；Day2: 05–07；Day3: 08–10 |
| 7 天扎实 | 每天 1–2 章，章末面试点口头复述一遍 |

## 目录

1. [思维模型与 Vue 对照](./01-思维模型与Vue对照.md)
2. [JSX、组件与渲染](./02-JSX组件与渲染.md)
3. [Hooks 核心](./03-Hooks核心.md)
4. [数据流与表单](./04-数据流与表单.md)
5. [副作用与数据获取](./05-副作用与数据获取.md)
6. [性能与并发特性](./06-性能与并发特性.md)
7. [工程化与 TypeScript](./07-工程化与TypeScript.md)
8. [路由与状态生态](./08-路由与状态生态.md)
9. [Next.js App Router](./09-Nextjs-AppRouter.md)
10. [工作上手清单与面试索引](./10-工作上手清单与面试索引.md)

## 章末「面试点 / 工作经验点」怎么用

每章（01–09）固定结构：

```text
Q：一句话问题
A：3–8 行口述答案（原理 + 工程判断）
标签：面试 / 工作经验 / 原理
```

- 正文管「会写」；章末管「讲得清、怎么选」
- 第 10 章做跨章索引 + 补遗（Error Boundary、Suspense、Legacy 只读等）

## 与旧笔记的关系

| 文件 | 状态 |
|------|------|
| [React.md](./React.md) | **历史笔记**（偏 class / CRA），不作为主线 |
| [React复习记录点.md](./React复习记录点.md) | **历史问答**，有效题已改写进各章面试点 |
| [react脚手架配置代理.md](./react脚手架配置代理.md) | 历史 CRA 代理笔记；新项目用 Vite `server.proxy` |

主线请只读本 README 目录下的 `01`–`10`。
