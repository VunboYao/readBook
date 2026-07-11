import { useState, type MouseEvent } from 'react'
import styles from './07-button.module.css'
import { ChapterHeading, DemoSection } from '../shared/demo'

type ButtonProps = {
  variant?: 'primary' | 'ghost'
  disabled?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  className?: string
}

/** 文档 07：显式 Props 类型，不用 React.FC */
function Button({
  variant = 'primary',
  disabled,
  onClick,
  children,
  className,
}: ButtonProps) {
  const cls = [
    styles.btn,
    variant === 'primary' ? styles.primary : styles.ghost,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={cls}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

/**
 * 07 · TS Props / 事件类型 / CSS Modules / env
 */
export function Chapter07Engineering() {
  const [log, setLog] = useState<string[]>([])

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLog((l) => [`change: ${e.target.value}`, ...l].slice(0, 5))
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setLog((l) => [`Enter → blur`, ...l].slice(0, 5))
      e.currentTarget.blur()
    }
  }

  return (
    <div className="chapter">
      <ChapterHeading
        id="07"
        title="工程化与 TypeScript"
        doc="07-工程化与TypeScript.md"
      />

      <DemoSection
        title="A. 组件 Props 类型（推荐写法）"
        point="function Button(props: ButtonProps)；不必 React.FC。variant 联合类型。"
      >
        <div className="row-actions">
          <Button onClick={() => setLog((l) => ['primary click', ...l])}>
            primary
          </Button>
          <Button
            variant="ghost"
            onClick={() => setLog((l) => ['ghost', ...l])}
          >
            ghost
          </Button>
          <Button disabled>disabled</Button>
        </div>
      </DemoSection>

      <DemoSection
        title="B. 事件类型"
        point="ChangeEvent / KeyboardEvent 带上元素泛型，e.target 才有正确类型。"
      >
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="输入后回车"
        />
        <ol className="log-list">
          {log.map((line, i) => (
            <li key={`${line}-${i}`}>{line}</li>
          ))}
        </ol>
      </DemoSection>

      <DemoSection
        title="C. CSS Modules + 环境变量"
        point="类名局部化（对照 Vue scoped）。仅 VITE_ 前缀进客户端。"
      >
        <p className={styles.hint}>这行用了 07-button.module.css</p>
        <pre className="demo-pre">
          {`MODE=${import.meta.env.MODE}
DEV=${String(import.meta.env.DEV)}
BASE_URL=${import.meta.env.BASE_URL}
// 自定义：在 .env 写 VITE_API_BASE=... 后用 import.meta.env.VITE_API_BASE`}
        </pre>
      </DemoSection>
    </div>
  )
}
