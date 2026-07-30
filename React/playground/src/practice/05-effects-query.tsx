import { useEffect, useMemo, useRef, useState } from 'react'
import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

function EventVsEffectDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoEl = useRef<HTMLVideoElement>(null)
  const [draft, setDraft] = useState('')
  const [sent, setSent] = useState<string[]>([])
  useEffect(() => {
    if (!videoEl.current) return
    if (isPlaying) {
      videoEl.current.play()
    } else {
      videoEl.current.pause()
    }
  }, [isPlaying])
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSend()
    }
  }
  function onSend() {
    const text = draft.trim()
    if (!text) return
    setSent((list) => [text, ...list].slice(0, 5))
    setDraft('')
  }
  return (<>
    <button style={{width: '200px', marginBottom: 10}} onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
    <video
      ref={videoEl} loop
      playsInline muted
      style={{ width: '100%', maxWidth: 280 }} 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
    ></video>

    <div className="row-actions" style={{ marginTop: 12 }}>
      <input
        value={draft} onChange={e => setDraft(e.target.value)}
        placeholder="message draft" onKeyDown={e => handleKeyDown(e)}
      />
      <button onClick={onSend}>Send (event)</button>
      <ul>
        {
          sent.map((item, index) => (
            <li key={index} style={{ listStyle: 'none', marginBottom: 4 }}>
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  </>) 
}
function ClockEffectDemo() {
  const [now, setNow] = useState(() => new Date().toLocaleTimeString())
  useEffect(() => {
    const id = window.setInterval(
      () => setNow(new Date().toLocaleTimeString()),
      1000,
    )
    return () => window.clearInterval(id)
  }, [])
  return <p>正确 Effect 示例（同步外部时钟）：{now}</p>
}
/** 练习：对照 src/chapters/05-effects-query.tsx */
export function Practice05EffectsQuery() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const fullName = () => `${firstName} ${lastName}`

  const [items] = useState(['apple', 'banana', 'apricot', 'berry'])
  const [q, setQ] = useState('')
  const filtered = useMemo(() => items.filter(item => item.toLowerCase().includes(q.toLowerCase())), [items, q])
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
        <ClockEffectDemo/>
      </DemoSection>

      <DemoSection
        title="D. 可能不需要 Effect（≈ Vue computed）"
        point="派生值在渲染时算；别用 Effect + setState 同步。"
      >
        <PracticeTodo
          checks={[
            'first/last 输入，fullName 渲染时拼接（无 Effect）',
            '本地列表 + 关键词 filter，渲染时过滤（无 Effect）',
          ]}
        />
        <span>first</span><input type="text" onChange={e => setFirstName(e.target.value)} />
        <span>last</span><input type="text" onChange={e => setLastName(e.target.value)} />
        <p>fullName: {fullName()}</p>
        filter: <input type="text" onChange={e => setQ(e.target.value)} />
        <p>filtered: {filtered.join(', ')}</p>
      </DemoSection>

      <DemoSection
        title="E. 将事件从 Effect 分开"
        point="用户动作走事件；同步外部控件才走 Effect。"
      >
        <PracticeTodo
          checks={[
            '按钮切换 isPlaying；Effect 把 isPlaying 同步到 <video>',
            '草稿 input + 发送按钮；发送只在 onClick（禁止 Effect watch draft）',
          ]}
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
        <EventVsEffectDemo />
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
