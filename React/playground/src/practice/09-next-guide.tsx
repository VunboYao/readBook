import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

/** 练习：对照 src/chapters/09-next-guide.tsx（无法在 Vite 跑真 RSC） */
export function Practice09NextGuide() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="09"
        title="Next.js App Router（练习对照）"
        doc="09-Nextjs-AppRouter.md"
      />

      <DemoSection
        title="A. 为何本 playground 跑不了真 RSC"
        point="Vite SPA 没有 Next 服务端组件运行时。"
      >
        <PracticeTodo
          checks={[
            '写一段 create-next-app 启动命令与 app/ 关键目录树',
            '用自己的话说明：为何不能在本仓库直接跑 Server Component',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="B. Server 壳 + Client 岛（心智模拟）"
        point="只读数据下发 + 交互叶子 useState。"
      >
        <PracticeTodo
          checks={[
            'FakeServerUserList：只渲染可序列化 users（无 Hooks）',
            'LikeButton：useState 点赞（模拟 Client 岛）',
            '列表每项挂一个 LikeButton',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="C. 决策表（何时 Next / 何时 Vite）"
        point="SEO/RSC → Next；纯后台已有 API → Vite。"
      >
        <PracticeTodo checks={['自己画一张两列表格（至少 3 行场景）']} />
      </DemoSection>

      <DemoSection
        title="D. 缓存口令"
        point="私有数据用 no-store，避免误缓存。"
      >
        <PracticeTodo
          checks={[
            '列出 cache: no-store / revalidate / tags 三种写法及适用场景',
          ]}
        />
      </DemoSection>
    </div>
  )
}
