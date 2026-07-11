import {
  memo,
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react'
import { ChapterHeading, DemoSection } from '../shared/demo'

type Item = { id: string; title: string }

const ALL = Array.from({ length: 3000 }, (_, i) => `item-${String(i).padStart(4, '0')}`)

const Row = memo(function Row({
  item,
  onSelect,
  selected,
}: {
  item: Item
  onSelect: (id: string) => void
  selected: boolean
}) {
  const renders = useRef(0)
  renders.current += 1
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(item.id)}
        style={{ fontWeight: selected ? 700 : 400 }}
      >
        {item.title}
      </button>
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
        <button type="button" onClick={() => setParentTick((t) => t + 1)}>
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

function DeferredSearchDemo() {
  const [text, setText] = useState('')
  const deferred = useDeferredValue(text)
  const [isPending, startTransition] = useTransition()
  const [transitionQuery, setTransitionQuery] = useState('')

  const deferredResult = useMemo(
    () => ALL.filter((x) => x.includes(deferred)),
    [deferred],
  )

  const transitionResult = useMemo(
    () => ALL.filter((x) => x.includes(transitionQuery)),
    [transitionQuery],
  )

  return (
    <div className="stack-form">
      <label>
        useDeferredValue（输入紧急，列表可滞后）
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="过滤 3000 项"
        />
      </label>
      <p>
        即时 text=<code>{text}</code> / deferred=<code>{deferred}</code> /
        命中 {deferredResult.length}
      </p>
      <ul className="short-list">
        {deferredResult.slice(0, 8).map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      <label>
        startTransition（过滤标为过渡更新）
        <input
          defaultValue=""
          onChange={(e) => {
            const v = e.target.value
            startTransition(() => setTransitionQuery(v))
          }}
          placeholder="同样过滤"
        />
      </label>
      <p>
        {isPending ? 'pending… ' : ''}命中 {transitionResult.length}
      </p>
    </div>
  )
}

/**
 * 06 · memo / transition / deferred
 */
export function Chapter06Perf() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="06"
        title="性能与并发特性"
        doc="06-性能与并发特性.md"
      />

      <DemoSection
        title="A. memo + useCallback"
        point="父重渲染时，props 浅相等的 memo 子组件可跳过。回调必须引用稳定。"
      >
        <MemoListDemo />
      </DemoSection>

      <DemoSection
        title="B. useDeferredValue / startTransition"
        point="大列表过滤时保输入跟手：紧急更新先画，重计算可降优先级。"
      >
        <DeferredSearchDemo />
      </DemoSection>

      <DemoSection
        title="C. 工程提示"
        point="先 Profiler 再优化；无脑 memo 有成本。React Compiler 可减少手写 memo。"
      >
        <ul>
          <li>状态别抬太高</li>
          <li>长列表考虑虚拟化</li>
          <li>打开 DevTools → Profiler 录一次卡顿</li>
        </ul>
      </DemoSection>
    </div>
  )
}
