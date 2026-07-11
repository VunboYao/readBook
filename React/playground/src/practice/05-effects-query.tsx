import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

/** 练习：对照 src/chapters/05-effects-query.tsx */
export function Practice05EffectsQuery() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="05"
        title="副作用与数据获取（练习）"
        doc="05-副作用与数据获取.md"
      />

      <DemoSection
        title="A. Effect = 同步外部系统"
        point="定时器/订阅才是 Effect 主场；不是默认放请求的地方。"
      >
        <PracticeTodo
          checks={['useEffect 驱动本地时钟每秒更新', 'cleanup 清除 interval']}
        />
      </DemoSection>

      <DemoSection
        title="B. 反模式：Effect 里请求（能跑，需自管竞态）"
        point="快速切换 id 时用 cancelled 丢掉过期响应。"
      >
        <PracticeTodo
          checks={[
            '模拟慢请求 fetchUser(id)；按钮切换 u1/u2/u3',
            'Effect 内 cancelled 标志防竞态；可打日志「已忽略」',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="C. TanStack Query（推荐）"
        point="queryKey 含参数；signal 取消；mutation 后 invalidate。（main 已挂 Provider）"
      >
        <PracticeTodo
          checks={[
            "useQuery({ queryKey: ['playground-user', id], queryFn })",
            'useMutation 改名 + invalidateQueries',
            '展示 pending / error / data',
          ]}
        />
      </DemoSection>
    </div>
  )
}
