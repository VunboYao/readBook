import { useState } from 'react'
import { ChapterHeading, DemoSection } from '../shared/demo'

/**
 * 09 无法在 Vite SPA 里跑真正的 RSC / Server Actions。
 * 本页用「可运行的 Client 岛 + 对照说明」把文档边界讲清楚。
 */

function LikeButton({ initial }: { initial: number }) {
  const [n, setN] = useState(initial)
  return (
    <button
      type="button"
      onClick={() => setN((x) => x + 1)}
    >
      赞 {n}（Client 岛：有 useState）
    </button>
  )
}

/** 模拟「Server 下发的只读数据」——在真 Next 里会是 async Server Component */
function FakeServerUserList({
  users,
}: {
  users: { id: string; name: string }[]
}) {
  return (
    <div className="fake-rsc">
      <p className="demo-hint">
        模拟 Server Component 产出的 HTML：无 Hooks，只渲染可序列化数据。
      </p>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} <LikeButton initial={0} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Chapter09NextGuide() {
  const [users] = useState([
    { id: '1', name: 'Ada' },
    { id: '2', name: 'Linus' },
  ])

  return (
    <div className="chapter">
      <ChapterHeading
        id="09"
        title="Next.js App Router（对照指南）"
        doc="09-Nextjs-AppRouter.md"
      />

      <DemoSection
        title="A. 为何本 playground 跑不了真 RSC"
        point="Vite SPA 没有 Next 的服务端组件运行时。学 09 请另建 next 项目；这里只对照边界。"
      >
        <pre className="demo-pre">{`npx create-next-app@latest react-next-lab --typescript
cd react-next-lab && npm run dev

# 关键目录（对照文档）：
app/layout.tsx
app/page.tsx
app/users/page.tsx          # 默认可 async Server Component
components/LikeButton.tsx   # 文件顶 'use client'
middleware.ts`}</pre>
      </DemoSection>

      <DemoSection
        title="B. Server 壳 + Client 岛（心智可在此模拟）"
        point="数据在「服务端」算好再下发；交互叶子才 useState。真项目里 Server 文件不能用 Hooks。"
      >
        <FakeServerUserList users={users} />
      </DemoSection>

      <DemoSection
        title="C. 决策表（何时 Next / 何时 Vite）"
        point="与文档 09 一致：SEO/RSC/Server Actions → Next；纯后台已有 API → Vite 往往更简单。"
      >
        <table className="demo-table">
          <thead>
            <tr>
              <th>选 Next</th>
              <th>选 Vite SPA（本仓库）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SEO / 首屏 HTML</td>
              <td>强登录后的后台</td>
            </tr>
            <tr>
              <td>RSC / Server Actions</td>
              <td>已有独立 BFF（如 Go/Gin）</td>
            </tr>
            <tr>
              <td>营销站+应用一体</td>
              <td>静态 CDN 部署即可</td>
            </tr>
          </tbody>
        </table>
      </DemoSection>

      <DemoSection
        title="D. 缓存口令（进 Next 项目后验证）"
        point="fetch cache / revalidate / tags；私有数据用 no-store，避免误缓存用户页。"
      >
        <pre className="demo-pre">{`fetch(url, { cache: 'no-store' })
fetch(url, { next: { revalidate: 60 } })
fetch(url, { next: { tags: ['users'] } })`}</pre>
      </DemoSection>
    </div>
  )
}
