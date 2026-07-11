import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChapterHeading, DemoSection } from '../shared/demo'

type Item = { id: string; title: string }

function Card({
  name,
  children,
  accent,
}: {
  name: string
  children?: React.ReactNode
  accent?: boolean
}) {
  return (
    <div
      className="box"
      style={{
        padding: 8,
        border: '1px solid #ddd',
        borderRadius: 6,
        background: accent ? '#eff6ff' : '#fafafa',
      }}
    >
      <h4 style={{ margin: '0 0 8px' }}>Hello {name}</h4>
      {children}
    </div>
  )
}

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  if (!open) return null
  return createPortal(
    <div
      className="modal-mask"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {children}
        <button
          type="button"
          onClick={onClose}
        >
          关闭
        </button>
      </div>
    </div>,
    document.body,
  )
}

/**
 * 02 · JSX / 列表 key / 受控·非受控 / Portal
 */
export function Chapter02Jsx() {
  const [items, setItems] = useState<Item[]>([
    { id: 'a', title: 'Alpha' },
    { id: 'b', title: 'Beta' },
    { id: 'c', title: 'Gamma' },
  ])
  const [text, setText] = useState('')
  const [show, setShow] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const uncontrolledRef = useRef<HTMLInputElement>(null)

  function shuffle() {
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5))
  }

  function removeFirst() {
    setItems((prev) => prev.slice(1))
  }

  return (
    <div className="chapter">
      <ChapterHeading
        id="02"
        title="JSX、组件与渲染"
        doc="02-JSX组件与渲染.md"
      />

      <DemoSection
        title="A. JSX：props / children / 条件"
        point="大写=组件；className/style 对象；children 即插槽；条件用三元或 &&。"
      >
        <Card
          name="React"
          accent={show}
        >
          <p>这段是 children（类似 Vue default slot）</p>
        </Card>
        <label>
          <input
            type="checkbox"
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
          />{' '}
          accent（条件样式）
        </label>
        {show ? <p>可见块（三元）</p> : null}
        {items.length > 0 && <p>列表非空（&&）</p>}
      </DemoSection>

      <DemoSection
        title="B. 列表 + 稳定 key"
        point="用业务 id 作 key。打乱/删除后，每行自己的本地输入应跟着 id 走，而不是错位。"
      >
        <div className="row-actions">
          <button
            type="button"
            onClick={shuffle}
          >
            打乱顺序
          </button>
          <button
            type="button"
            onClick={removeFirst}
          >
            删除第一项
          </button>
        </div>
        <ul className="key-list">
          {items.map((item) => (
            <li key={item.id}>
              <span className="item-id">{item.id}</span> {item.title}{' '}
              <input placeholder={`备注(${item.id})`} />
            </li>
          ))}
        </ul>
        <p className="demo-hint">
          对比实验：若改成 key=index，打乱后输入框内容会错位。
        </p>
      </DemoSection>

      <DemoSection
        title="C. 受控 vs 非受控"
        point="受控：value+onChange；非受控：defaultValue+ref 读取。"
      >
        <label>
          受控：
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <p>state = {JSON.stringify(text)}</p>
        <label>
          非受控：
          <input
            ref={uncontrolledRef}
            defaultValue="init"
          />
        </label>
        <button
          type="button"
          onClick={() =>
            alert(`非受控当前值: ${uncontrolledRef.current?.value ?? ''}`)
          }
        >
          读取非受控
        </button>
      </DemoSection>

      <DemoSection
        title="D. key 重置组件 + Portal Modal"
        point="换 key 会卸载重建（清空本地 state）。Modal 用 createPortal 挂到 body。"
      >
        <button
          type="button"
          onClick={() => setResetKey((k) => k + 1)}
        >
          重置下方草稿（换 key）
        </button>
        <DraftBox key={resetKey} />
        <button
          type="button"
          onClick={() => setModalOpen(true)}
        >
          打开 Portal Modal
        </button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <h4>Portal 弹层</h4>
          <p>DOM 在 document.body，事件沿 React 树冒泡。</p>
        </Modal>
      </DemoSection>
    </div>
  )
}

function DraftBox() {
  const [draft, setDraft] = useState('')
  return (
    <p>
      草稿（本地 state）：
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
    </p>
  )
}
