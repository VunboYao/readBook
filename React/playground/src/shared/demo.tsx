import type { ReactNode } from 'react'

/** 演示区块：标题 + 技术点说明 + 可交互内容 */
export function DemoSection({
  title,
  point,
  children,
}: {
  title: string
  point: string
  children: ReactNode
}) {
  return (
    <section className="demo-section">
      <h3 className="demo-title">{title}</h3>
      <p className="demo-point">{point}</p>
      <div className="demo-body">{children}</div>
    </section>
  )
}

export function ChapterHeading({
  id,
  title,
  doc,
}: {
  id: string
  title: string
  doc: string
}) {
  return (
    <header className="chapter-heading">
      <h2>
        {id} · {title}
      </h2>
      <p className="chapter-doc">
        对照文档：<code>docs/React/{doc}</code>
      </p>
    </header>
  )
}
