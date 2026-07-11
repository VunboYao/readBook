import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

/** 练习：对照 src/chapters/08-ecosystem.tsx */
export function Practice08Ecosystem() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="08"
        title="路由与状态生态（练习）"
        doc="08-路由与状态生态.md"
      />

      <DemoSection
        title="迷你应用：嵌套路由 + Zustand selector + RHF"
        point="用 MemoryRouter，避免和顶栏 hash 章节切换冲突。"
      >
        <PracticeTodo
          checks={[
            'Zustand：购物车 add/clear；Badge 用 selector 只订总数量',
            'MemoryRouter：/ 、/users（layout+index+:id）、/login',
            'UserDetail：useParams + useSearchParams + navigate(-1)',
            'Login：react-hook-form 校验 email 必填、password 最少 6 位',
            'NavLink 高亮；整体可在本区块内导航',
          ]}
        />
      </DemoSection>
    </div>
  )
}
