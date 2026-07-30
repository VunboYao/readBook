import { useMemo, useState, type ComponentType } from 'react'
import { Chapter01Mindset } from './chapters/01-counter'
import { Chapter02Jsx } from './chapters/02-list-form'
import { Chapter03Hooks } from './chapters/03-hooks-toggle'
import { Chapter04DataFlow } from './chapters/04-data-flow'
import { Chapter05EffectsQuery } from './chapters/05-effects-query'
import { Chapter06Perf } from './chapters/06-perf'
import { Chapter07Engineering } from './chapters/07-engineering'
import { Chapter08Ecosystem } from './chapters/08-ecosystem'
import { Chapter09NextGuide } from './chapters/09-next-guide'
import { Practice01Mindset } from './practice/01-mindset'
import { Practice02Jsx } from './practice/02-jsx'
import { Practice03Hooks } from './practice/03-hooks'
import { Practice04DataFlow } from './practice/04-data-flow'
import { Practice05EffectsQuery } from './practice/05-effects-query'
import { Practice06Perf } from './practice/06-perf'
import { Practice07Engineering } from './practice/07-engineering'
import { Practice08Ecosystem } from './practice/08-ecosystem'
import { Practice09NextGuide } from './practice/09-next-guide'
import { Practice10Sandbox } from './practice/10-sandbox'
import './App.css'

type CompareChapter = {
  id: string
  label: string
  solo?: false
  practiceFile: string
  answerFile: string
  Practice: ComponentType
  Answer: ComponentType
}

type SoloChapter = {
  id: string
  label: string
  solo: true
  practiceFile: string
  Practice: ComponentType
}

const chapters: readonly (CompareChapter | SoloChapter)[] = [
  {
    id: '01',
    label: '01 思维',
    practiceFile: 'src/practice/01-mindset.tsx',
    answerFile: 'src/chapters/01-counter.tsx',
    Practice: Practice01Mindset,
    Answer: Chapter01Mindset,
  },
  {
    id: '02',
    label: '02 JSX',
    practiceFile: 'src/practice/02-jsx.tsx',
    answerFile: 'src/chapters/02-list-form.tsx',
    Practice: Practice02Jsx,
    Answer: Chapter02Jsx,
  },
  {
    id: '03',
    label: '03 Hooks',
    practiceFile: 'src/practice/03-hooks.tsx',
    answerFile: 'src/chapters/03-hooks-toggle.tsx',
    Practice: Practice03Hooks,
    Answer: Chapter03Hooks,
  },
  {
    id: '04',
    label: '04 数据流',
    practiceFile: 'src/practice/04-data-flow.tsx',
    answerFile: 'src/chapters/04-data-flow.tsx',
    Practice: Practice04DataFlow,
    Answer: Chapter04DataFlow,
  },
  {
    id: '05',
    label: '05 请求',
    practiceFile: 'src/practice/05-effects-query.tsx',
    answerFile: 'src/chapters/05-effects-query.tsx',
    Practice: Practice05EffectsQuery,
    Answer: Chapter05EffectsQuery,
  },
  {
    id: '06',
    label: '06 性能',
    practiceFile: 'src/practice/06-perf.tsx',
    answerFile: 'src/chapters/06-perf.tsx',
    Practice: Practice06Perf,
    Answer: Chapter06Perf,
  },
  {
    id: '07',
    label: '07 工程',
    practiceFile: 'src/practice/07-engineering.tsx',
    answerFile: 'src/chapters/07-engineering.tsx',
    Practice: Practice07Engineering,
    Answer: Chapter07Engineering,
  },
  {
    id: '08',
    label: '08 生态',
    practiceFile: 'src/practice/08-ecosystem.tsx',
    answerFile: 'src/chapters/08-ecosystem.tsx',
    Practice: Practice08Ecosystem,
    Answer: Chapter08Ecosystem,
  },
  {
    id: '09',
    label: '09 Next',
    practiceFile: 'src/practice/09-next-guide.tsx',
    answerFile: 'src/chapters/09-next-guide.tsx',
    Practice: Practice09NextGuide,
    Answer: Chapter09NextGuide,
  },
  {
    id: '10',
    label: '10 练习',
    solo: true,
    practiceFile: 'src/practice/10-sandbox.tsx',
    Practice: Practice10Sandbox,
  },
]

type ChapterId = (typeof chapters)[number]['id']

function readChapterFromHash(): ChapterId {
  const raw = window.location.hash.replace(/^#/, '').split('?')[0]
  if (chapters.some((c) => c.id === raw)) return raw as ChapterId
  return '01'
}

function ComparePanes({
  practiceFile,
  answerFile,
  Practice,
  Answer,
}: {
  practiceFile: string
  answerFile: string
  Practice: ComponentType
  Answer: ComponentType
}) {
  return (
    <div className="compare-grid">
      <section
        className="compare-pane compare-practice"
        aria-label="练习"
      >
        <header className="pane-header pane-header-practice">
          <h2>练习</h2>
          <code>{practiceFile}</code>
        </header>
        <div className="pane-body">
          <Practice />
        </div>
      </section>

      <section
        className="compare-pane compare-answer"
        aria-label="参考答案"
      >
        <header className="pane-header pane-header-answer">
          <h2>参考答案</h2>
          <code>{answerFile}</code>
        </header>
        <div className="pane-body">
          <Answer />
        </div>
      </section>
    </div>
  )
}

export default function App() {
  const [chapterId, setChapterId] = useState<ChapterId>(readChapterFromHash)

  const current = useMemo(
    () => chapters.find((c) => c.id === chapterId) ?? chapters[0],
    [chapterId],
  )

  const Practice = current.Practice

  function select(id: ChapterId) {
    setChapterId(id)
    window.location.hash = id
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Playground</h1>
        {current.solo ? (
          <p>
            自由练习：改 <code>{current.practiceFile}</code>
          </p>
        ) : (
          <p>
            <strong>左：练习</strong>（改 <code>src/practice/*</code>）· <strong>右：参考答案</strong>（
            <code>src/chapters/*</code>
            ，只读对照）。 先按左侧验收要点实现，再和右侧比对行为。
          </p>
        )}

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

      {current.solo ? (
        <section className="sandbox-solo" aria-label="自由练习">
          <div className="sandbox-solo-inner">
              <Practice />
          </div>
        </section>
      ) : (
        <ComparePanes
          practiceFile={current.practiceFile}
          answerFile={current.answerFile}
          Practice={current.Practice}
          Answer={current.Answer}
        />
      )}
    </div>
  )
}
