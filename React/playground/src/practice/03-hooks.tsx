import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

/** 练习：对照 src/chapters/03-hooks-toggle.tsx */
export function Practice03Hooks() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="03"
        title="Hooks 核心（练习）"
        doc="03-Hooks核心.md"
      />

      <DemoSection
        title="A. useState + 函数式更新"
        point="异步/连续更新用 setN(v => ...)，避免闭包陈旧值。"
      >
        <PracticeTodo
          checks={[
            'useState 计数按钮（函数式 +1）',
            '用 useRef 显示 renderCount（不触发渲染）',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="B. useReducer"
        point="多分支状态迁移集中在 reducer；类似迷你 Redux。"
      >
        <PracticeTodo
          checks={[
            'reducer：inc / add(payload) / reset',
            '三个按钮分别 dispatch',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="C. useRef + useEffect 清理"
        point="ref 拿 DOM；Effect 订阅外部系统并 cleanup。"
      >
        <PracticeTodo
          checks={[
            'input 挂载后 focus',
            'setInterval 每秒 tick，卸载时 clearInterval',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="D. useMemo + useCallback + 自定义 Hook"
        point="useMemo 缓存派生列表；useToggle 展示自定义 Hook。"
      >
        <PracticeTodo
          checks={[
            '实现 useToggle，页面展示 ON/OFF',
            'useMemo 过滤 ok===true 的 items',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="E. useContext + useId"
        point="低频环境量用 Context；useId 关联 label/input。"
      >
        <PracticeTodo
          checks={[
            'ThemeContext + 切换 light/dark，子组件消费',
            'useId 绑定 label htmlFor 与 input id',
          ]}
        />
      </DemoSection>
    </div>
  )
}
