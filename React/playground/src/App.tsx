import { useMemo, useState } from 'react'
import { Chapter01Mindset } from './chapters/01-counter'
import { Chapter02Jsx } from './chapters/02-list-form'
import { Chapter03Hooks } from './chapters/03-hooks-toggle'
import { Chapter04DataFlow } from './chapters/04-data-flow'
import { Chapter05EffectsQuery } from './chapters/05-effects-query'
import { Chapter06Perf } from './chapters/06-perf'
import { Chapter07Engineering } from './chapters/07-engineering'
import { Chapter08Ecosystem } from './chapters/08-ecosystem'
import { Chapter09NextGuide } from './chapters/09-next-guide'
import './App.css'

const chapters = [
  { id: '01', label: '01 思维', Comp: Chapter01Mindset },
  { id: '02', label: '02 JSX', Comp: Chapter02Jsx },
  { id: '03', label: '03 Hooks', Comp: Chapter03Hooks },
  { id: '04', label: '04 数据流', Comp: Chapter04DataFlow },
  { id: '05', label: '05 请求', Comp: Chapter05EffectsQuery },
  { id: '06', label: '06 性能', Comp: Chapter06Perf },
  { id: '07', label: '07 工程', Comp: Chapter07Engineering },
  { id: '08', label: '08 生态', Comp: Chapter08Ecosystem },
  { id: '09', label: '09 Next', Comp: Chapter09NextGuide },
] as const

type ChapterId = (typeof chapters)[number]['id']

function readChapterFromHash(): ChapterId {
  const raw = window.location.hash.replace(/^#/, '')
  if (chapters.some((c) => c.id === raw)) return raw as ChapterId
  return '01'
}

export default function App() {
  const [chapterId, setChapterId] = useState<ChapterId>(readChapterFromHash)

  const Active = useMemo(
    () => chapters.find((c) => c.id === chapterId)?.Comp ?? Chapter01Mindset,
    [chapterId],
  )

  function select(id: ChapterId) {
    setChapterId(id)
    window.location.hash = id
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Playground</h1>
        <p>
          每章是<strong>完整可交互演示</strong>，对照{' '}
          <code>docs/React/0x-*.md</code>。URL hash 如 <code>#05</code>。
        </p>
        <nav className="chapter-nav">
          {chapters.map((c) => (
            <button
              key={c.id}
              type="button"
              className={c.id === chapterId ? 'active' : undefined}
              onClick={() => select(c.id)}
            >
              {c.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Active />
      </main>
    </div>
  )
}
