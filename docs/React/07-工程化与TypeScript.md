# 07 · 工程化与 TypeScript

**一句话目标**：用 Vite + React + TS 搭出现代 SPA；写好组件 Props/事件类型；对齐 Vue SFC 工程习惯。

## Vue ↔ React 对照

| Vue | React |
|-----|-------|
| `create-vue` / Vite | `npm create vite@latest` → React + TS |
| SFC：script+template+style | `tsx` + 独立 css/module |
| `vue-tsc` | `tsc -b` / `tsc --noEmit` |
| `defineProps<T>()` | `function Comp(props: Props)` |
| `import.meta.env` | 同 Vite |
| scoped CSS | CSS Modules / 约定式方案 |

## 脚手架

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app && npm i && npm run dev
```

常用依赖：

```bash
npm i react-router zustand @tanstack/react-query
npm i -D @types/react @types/react-dom
```

Vite 代理（对照旧 CRA `setupProxy`）：

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
})
```

## 组件 Props 类型

```tsx
type ButtonProps = {
  variant?: 'primary' | 'ghost'
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

// 推荐：直接标注 props，不必 React.FC
export function Button({
  variant = 'primary',
  disabled,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### 关于 `React.FC`

| 观点 | 说明 |
|------|------|
| 可不用 | 默认带 `children` 的历史行为已变；泛型组件更别扭 |
| 团队若统一用 | 跟项目走，别混用两套风格 |

## 事件与 DOM 类型

```tsx
function Field() {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value)
  }
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') e.currentTarget.blur()
  }
  return <input onChange={onChange} onKeyDown={onKeyDown} />
}
```

## 样式选型（一句话）

| 方案 | 何时 |
|------|------|
| CSS Modules | 默认稳妥，类名局部 |
| 全局 CSS / Sass | 布局、reset、设计 token |
| Tailwind | 团队已采用时 |
| CSS-in-JS | 强动态主题；注意 RSC 兼容性 |

```tsx
import styles from './Card.module.css'
export function Card() {
  return <div className={styles.root} />
}
```

## 环境变量

- 仅 `VITE_` 前缀暴露给客户端。
- 密钥只放服务端；别写进 `VITE_`。
- 类型：`src/vite-env.d.ts` 里扩 `ImportMetaEnv`。

## 工作约定

- `strict: true`；组件 props 显式类型；少用 `any`。
- 路径别名 `@/` 与 Vue 项目对齐，降低切换成本。
- 提交前：`tsc --noEmit` + lint +（有则）单测。
- 目录常见：`src/features/*`、`src/shared/*`、`src/app/*`。

## 踩坑

1. 默认导入 JSON/资源缺类型声明。
2. `children` 可选却不处理 `undefined`。
3. 把 Node 专用 API 写进客户端包。
4. 环境变量改完忘重启 dev server。

## 面试点 / 工作经验点

### Q1：为什么很多团队不用 `React.FC`？
**标签**：`面试` `工作经验`

**A**：显式 props 更清晰；泛型组件用 FC 别扭；历史 FC 自动 children 易误导。口述「函数声明 + Props 类型」即可。

### Q2：组件库如何导出类型？
**标签**：`工作经验`

**A**：导出 `ButtonProps` 等同名类型；`package.json` 的 `types`/`exports` 指到 `.d.ts`；避免只导出组件不导出 props。

### Q3：Vite 环境变量安全怎么讲？
**标签**：`面试` `工作经验`

**A**：打进客户端包的都能被看见。密钥走服务端或 BFF；`VITE_` 只放可公开配置（API base、feature flag）。

### Q4：和 Vue SFC 工程差异怎么口述？
**标签**：`面试`

**A**：Vue 单文件聚合模板样式逻辑；React 用 TSX + 外部样式，组合靠 JS。类型上 Vue 靠 `vue-tsc` 理解模板，React 靠 TS 理解 JSX。构建都可 Vite。

### Q5：如何给带 as 多态的组件做类型？
**标签**：`工作经验`

**A**：用多态 props（`as`）+ 条件类型，或参考 Radix/Headless UI 模式。中级项目可先固定 `button`/`a` 联合，不必上完整 polymorphic。

### Q6：CSS Modules vs scoped 的差异？
**标签**：`面试`

**A**：都是局部类名。Vue scoped 靠属性选择器；CSS Modules 编译成唯一类名。心智接近。

### Q7：进组如何快速摸清工程配置？
**标签**：`工作经验`

**A**：读 `package.json` scripts、`tsconfig`、`vite.config`/`next.config`、eslint、目录结构、CI。对照本系列 README 技术栈表打勾。

### Q8：路径别名踩过什么坑？
**标签**：`工作经验`

**A**：`tsconfig.paths` 与 Vite `resolve.alias` 必须同时配；只配一边会导致 IDE 与构建不一致。

## 自测题

1. 手写一个带 `className?` 合并的 `Button` Props。
2. 写出 Vite 代理 `/api` 的配置片段。
3. 说明为何不能把数据库密码放进 `VITE_`。
