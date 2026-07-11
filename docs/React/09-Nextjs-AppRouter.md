# 09 · Next.js App Router

**一句话目标**：掌握 App Router 目录约定、Server/Client Component 边界、数据缓存与 Server Actions，并能和 Nuxt / Vite SPA 做选型。

## Vue ↔ React（全栈）对照

| Nuxt 3 | Next.js App Router |
|--------|-------------------|
| `pages/` / `app/` | `app/` |
| 默认服务端友好 | 默认 **Server Component** |
| `<ClientOnly>` | 文件顶 `"use client"` |
| `useFetch` / `useAsyncData` | server `fetch` / Server Actions |
| `middleware` | `middleware.ts` |
| `layouts` | `layout.tsx` 嵌套 |
| `nitro` server routes | Route Handlers `route.ts` |

## 目录约定

```text
app/
  layout.tsx          # 根布局
  page.tsx            # /
  loading.tsx         # 即时 loading UI
  error.tsx           # 错误边界（客户端）
  not-found.tsx
  users/
    page.tsx          # /users
    [id]/
      page.tsx        # /users/:id
  api/
    hello/
      route.ts        # Route Handler
```

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
```

## Server vs Client Component

| Server Component（默认） | Client Component（`"use client"`） |
|--------------------------|-------------------------------------|
| 可直接访 DB/密钥/文件系统 | 浏览器 API、事件、Hooks |
| 不进客户端 bundle（本身） | 会打进客户端 |
| 不能用 `useState`/`useEffect` | 可以 |
| 可传可序列化 props 给 Client | 可 import Server？否，反向：Server 里渲染 Client |

```tsx
// app/users/page.tsx — Server Component
async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    next: { revalidate: 60 }, // ISR 风格
  })
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()
  return (
    <ul>
      {users.map((u: { id: string; name: string }) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}
```

```tsx
// components/LikeButton.tsx
'use client'

import { useState } from 'react'

export function LikeButton() {
  const [n, setN] = useState(0)
  return <button type="button" onClick={() => setN((x) => x + 1)}>{n}</button>
}
```

**边界原则**：尽量 Server；只有交互叶子打 `"use client"`。

## fetch 缓存与 revalidate

```tsx
// 强制每次动态
fetch(url, { cache: 'no-store' })

// 缓存 N 秒
fetch(url, { next: { revalidate: 3600 } })

// 打标签，可按 tag 失效
fetch(url, { next: { tags: ['users'] } })
```

- Next 版本间缓存默认行为有过调整；进组先读该项目 Next 大版本文档与 `next.config`。
- 踩坑高频：以为每次请求都打到源站，实际命中 Full Route Cache / Data Cache。

## Server Actions

```tsx
// app/actions.ts
'use server'

export async function updateName(formData: FormData) {
  const name = String(formData.get('name') ?? '')
  // 写 DB…
  // revalidatePath('/profile') / revalidateTag('user')
}
```

```tsx
// 在 Server 或 Client 组件里
<form action={updateName}>
  <input name="name" />
  <button type="submit">保存</button>
</form>
```

- 与 04 章浏览器端 Actions Hooks 可组合；这里跑在服务端。
- 注意：输入校验、鉴权必须在 Action 内再做一遍。

## 中间件

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')
  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }
```

## 决策表：Next vs Vite SPA

| 选 Next | 选 Vite SPA |
|---------|-------------|
| SEO / 首屏 HTML 关键 | 纯后台、强登录后应用 |
| 要 RSC / Server Actions | 已有独立 BFF/Go API |
| 营销站 + 应用一体 | 部署只是静态 CDN |
| 团队已 Next 标准化 | 要最薄前端运行时 |

## 工作约定

- 数据默认在 Server Component 取；客户端互动用 Query 补。
- `"use client"` 尽量下沉到叶子，避免整页变 Client。
- 密钥只出现在 Server / Route Handler / Server Action。
- `loading.tsx` / `error.tsx` 按路由段补齐，提升体感。

## 踩坑

1. 在 Server Component 里用 `useState` → 报错。
2. 把函数/class 实例当 props 传给 Client → 不可序列化。
3. 水合不匹配：服务端 HTML 与客户端首屏不一致（随机数、`Date.now`、浏览器-only 分支）。
4. 缓存过猛 → 后台改了数据前台仍旧；记得 `revalidate`。

## 面试点 / 工作经验点

### Q1：RSC 和 CSR 数据流怎么讲？
**标签**：`面试` `原理`

**A**：RSC 在服务端跑，可直接拿数据，把渲染结果（Flight 协议）发给客户端，组件逻辑本身可不下发。CSR 是浏览器拉 JS 再取数渲染。混合：Server 壳 + Client 交互岛。

### Q2：什么是水合（hydration）？
**标签**：`面试` `原理`

**A**：服务端先出 HTML，客户端 JS 接管并绑事件。SSR/RSC 项目若服务端与客户端首绘文本不一致会报 hydration mismatch。

### Q3：Next 缓存有哪些坑？
**标签**：`工作经验` `面试`

**A**：误缓存用户私有数据；`revalidate` 不会导致立刻全球一致；开发态与生产表现不同。私有页面用动态渲染 / `no-store`；公开列表再 ISR。

### Q4：何时 Next、何时 Vite SPA？
**标签**：`面试` `工作经验`

**A**：见上文决策表。一句话：要 SEO/服务端能力/一体化全栈 → Next；要纯客户端后台 + 已有 API → Vite 往往更简单。

### Q5：和 Nuxt 对照怎么口述？
**标签**：`面试`

**A**：都是约定式全栈。Nuxt 更「Vue 电池齐全」；Next App Router 以 RSC 为默认，Client 边界用 `"use client"` 显式打开。middleware、layout、服务端取数心智可迁移。

### Q6：Server Actions 安全注意什么？
**标签**：`工作经验` `面试`

**A**：等价于公开 HTTP 端点。必须鉴权、校验、防 CSRF（框架有部分保护但仍要业务鉴权）、勿信任客户端字段。

### Q7：为什么说「Client 边界尽量下沉」？
**标签**：`工作经验` `原理`

**A**：`"use client"` 文件及其导入的依赖更容易进客户端包。边界放高，整棵子树都变客户端成本。交互放叶子，上面保持 Server。

### Q8：Route Handler 和 Server Action 怎么选？
**标签**：`工作经验`

**A**：要给第三方/多端复用的 HTTP API → Route Handler。从表单/组件内调用的变更 → Server Action 更顺手。二者都可。

## 自测题

1. 画一张 `/dashboard` 下 layout + page + client 按钮的边界图。
2. 说明 `revalidate: 60` 与 `cache: 'no-store'` 的选型。
3. 举一个会导致 hydration mismatch 的代码。
