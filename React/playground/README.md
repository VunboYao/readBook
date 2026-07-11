# React Playground

对齐 [`docs/React`](../../docs/React/README.md)：**左右对照**——左练习、右参考答案。

- **底座**：Vite + React 19 + TypeScript
- **已预装**：`react-router`、`zustand`、`@tanstack/react-query`、`react-hook-form`
- **布局**：同一章节并排显示；改左侧文件即可，右侧随时比对行为

## 启动

```bash
cd React/playground
npm install
npm run dev
```

## 练习怎么用

1. 打开页面：左侧黄头「练习」，右侧绿头「参考答案」。
2. 选章节（或 hash `#03`），按左侧黄色验收要点在 `src/practice/*` 实现。
3. 保存后 HMR 刷新左侧；直接和右侧答案交互效果比对。
4. 建议先自己写，再看右侧实现细节；窄屏会上下堆叠。

| 侧            | 目录                         |
| ------------- | ---------------------------- |
| 左 · 练习     | `src/practice/0x-*.tsx`      |
| 右 · 参考答案 | `src/chapters/*`（只读对照） |

## 章节对照表

| Hash  | 练习文件                        | 参考答案                        | 文档主题           |
| ----- | ------------------------------- | ------------------------------- | ------------------ |
| `#01` | `practice/01-mindset.tsx`       | `chapters/01-counter.tsx`       | 思维模型           |
| `#02` | `practice/02-jsx.tsx`           | `chapters/02-list-form.tsx`     | JSX                |
| `#03` | `practice/03-hooks.tsx`         | `chapters/03-hooks-toggle.tsx`  | Hooks              |
| `#04` | `practice/04-data-flow.tsx`     | `chapters/04-data-flow.tsx`     | 数据流             |
| `#05` | `practice/05-effects-query.tsx` | `chapters/05-effects-query.tsx` | 副作用/Query       |
| `#06` | `practice/06-perf.tsx`          | `chapters/06-perf.tsx`          | 性能               |
| `#07` | `practice/07-engineering.tsx`   | `chapters/07-engineering.tsx`   | 工程 TS            |
| `#08` | `practice/08-ecosystem.tsx`     | `chapters/08-ecosystem.tsx`     | Router/Zustand/RHF |
| `#09` | `practice/09-next-guide.tsx`    | `chapters/09-next-guide.tsx`    | Next 对照          |

## 脚本

| 命令              | 作用                |
| ----------------- | ------------------- |
| `npm run dev`     | 开发                |
| `npm run build`   | 类型检查 + 生产构建 |
| `npm run preview` | 预览构建产物        |
