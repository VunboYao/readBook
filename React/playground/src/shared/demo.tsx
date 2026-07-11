import type { ReactNode } from 'react'

/** 演示区块：标题 + 技术点说明 + 可交互内容 */
type ChapterHeadingProps = {
  id: string
  title: string
  doc: string
}

export function ChapterHeading({ id, title, doc }: ChapterHeadingProps) {
  return (
    <header className="chapter-heading">
      <h2>
        {id} · {title}
      </h2>
      <p className="chapter-doc">
        对照文档: <code>docs/React/{doc}</code>
      </p>
    </header>
  )
}

type DemoSectionProps = {
  title: string
  point: string
  children: ReactNode
}

export function DemoSection({ title, point, children }: DemoSectionProps) {
  return (
    <section className="demo-section">
      <h3 className="demo-title">{title}</h3>
      <p className="demo-point">{point}</p>
      <div className="demo-body">{children}</div>
    </section>
  )
}

/** 练习占位：验收清单，不含实现 */
export function PracticeTodo({ checks }: { checks: string[] }) {
  return (
    <div className="practice-todo">
      <p className="practice-todo-label">在此实现 · 验收要点</p>
      <ul>
        {checks.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
