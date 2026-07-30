import { memo, useCallback, useRef, useState } from 'react'
import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

type Item = {id: string, title: string}

const ALL = Array.from({length: 3000}, (_, i) => ({id: `item-${i}`, title: `Item ${i}`}))

const Row = memo(function ({item, onSelect, selected}: {item: Item, onSelect: (id: string) => void, selected: boolean}) {
  const renders = useRef(0)
  renders.current += 1
  return (
    <li>
      <button
        type="button" onClick={() => onSelect(item.id)}
        style={{ fontWeight: selected ? 700 : 400 }}
      >{item.title}</button>
      <small className="muted"> row-renders:{renders.current}</small>
    </li>
  )
})
function MemoListDemo() {
  const [items] = useState<Item[]>([
    { id: '1', title: '一行' },
    { id: '2', title: '二行' },
    { id: '3', title: '三行' },
  ])
  const [selected, setSelected] = useState<string | null>(null)
  const [parentTick, setParentTick] = useState(0)
  const onSelect = useCallback((id: string) => setSelected(id), [])
  return (
    <div>
        <p>
        父 tick={parentTick}{' '}
        <button
          type="button"
          onClick={() => setParentTick((t) => t + 1)}
        >
          父组件 setState（不改列表 props）
        </button>
      </p>
      <p className="demo-hint">
        Row 被 memo + 稳定 onSelect：父 tick 增加时，各行 renders 不应狂涨。
      </p>
      <ul>
        {items.map((item) => (
          <Row
            key={item.id}
            item={item}
            onSelect={onSelect}
            selected={selected === item.id}
          />
        ))}
      </ul>
      <p>selected: {selected ?? '无'}</p>
    </div>
  )
}

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
        <MemoListDemo />
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
