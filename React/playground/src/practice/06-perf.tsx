import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

/** 练习：对照 src/chapters/06-perf.tsx */
export function Practice06Perf() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="06"
        title="性能与并发特性（练习）"
        doc="06-性能与并发特性.md"
      />

      <DemoSection
        title="A. memo + useCallback"
        point="父重渲染时，props 浅相等的 memo 子组件可跳过。回调必须引用稳定。"
      >
        <PracticeTodo
          checks={[
            'memo(Row)，行内显示自身 render 次数（useRef）',
            '父按钮只改 parentTick；onSelect 用 useCallback 保持稳定',
            '验证：点父按钮时各行 renders 不应狂涨',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="B. useDeferredValue / startTransition"
        point="大列表过滤时保输入跟手。"
      >
        <PracticeTodo
          checks={[
            '生成约 3000 条字符串列表',
            '一组：useDeferredValue 过滤并展示命中数',
            '一组：startTransition / useTransition 更新过滤词',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="C. 工程提示"
        point="先 Profiler 再优化；无脑 memo 有成本。"
      >
        <PracticeTodo
          checks={['用列表写下你自己的性能排查顺序（3～5 条即可）']}
        />
      </DemoSection>
    </div>
  )
}
