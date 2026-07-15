import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type CardProps = { name: string; children: React.ReactNode; accent?: boolean }
function Card({ name, children, accent }: CardProps) {
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
      <h4 style={{ margin: '0 0 8px' }}>Hello, {name}</h4>
      {children}
    </div>
  )
}

type ModalProps = { open: boolean
  onClose: () => void
  children: React.ReactNode }
function Modal({open, onClose, children}: ModalProps) {
  if (!open) return null
  return createPortal(
    <div
      className='modal-mask'
      onClick={onClose}
      role='presentation'
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          type='button'
          onClick={onClose}
        >Close</button>
      </div>
    </div>
  , document.body)
}

type Item = { id: string; title: string }

/** 练习：对照 src/chapters/02-list-form.tsx */
export function Practice02Jsx() {
  const [show, setShow] = useState<boolean>(true)
  const [items, setItems] = useState<Item[]>([
    { id: 'a', title: 'Alpha' },
    { id: 'b', title: 'Beta' },
    { id: 'c', title: 'Gamma' },
  ])
  function shuffle() {
    setItems((prevState) => [...prevState].sort(() => Math.random() - 0.5))
  }
  function onDelete() {
    setItems((prevState) => prevState.slice(1))
  }
  const [text, setText] = useState('')
  const uncontrolledRef = useRef<HTMLInputElement>(null)
  const [resetKey, setResetKey] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="chapter">
      <ChapterHeading
        id="02"
        title="JSX、组件与渲染（练习）"
        doc="02-JSX组件与渲染.md"
      />

      <DemoSection
        title="A. JSX：props / children / 条件"
        point="大写=组件；className/style 对象；children 即插槽；条件用三元或 &&。"
      >
        <PracticeTodo
          checks={[
            '写 Card 组件：接收 name、children、可选 accent',
            'checkbox 控制 accent / 条件渲染一段文案',
          ]}
        />
        <Card
          name="React19"
          accent={show}
        >
          <p>这段是 children（类似 Vue default slot）</p>
        </Card>
        <input
          type="checkbox"
          checked={show}
          onClick={() => setShow((s) => !s)}
        />{' '}
        accent 条件控制
        {show && <p>checkbox 控制 accent / 条件渲染一段文案</p>}
      </DemoSection>

      <DemoSection
        title="B. 列表 + 稳定 key"
        point="用业务 id 作 key。打乱/删除后，每行自己的本地输入应跟着 id 走。"
      >
        <PracticeTodo
          checks={[
            'items 含稳定 id；map 时 key=id',
            '每行带本地 input；提供「打乱」「删第一项」',
            '（可选）对比 key=index 的错位现象',
          ]}
        />
        <button onClick={shuffle}>打乱顺序</button>
        <button onClick={onDelete}>删除第一项</button>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              style={{ marginTop: 8 }}
            >
              {item.title} <input
                type="text"
                placeholder={item.id}
              />
            </li>
          ))}
        </ul>
      </DemoSection>

      <DemoSection
        title="C. 受控 vs 非受控"
        point="受控：value+onChange；非受控：defaultValue+ref 读取。"
      >
        <PracticeTodo
          checks={[
            '受控 input，旁路显示 state',
            '非受控 input + ref，按钮 alert 当前值',
          ]}
        />
        <label>
          <span>受控</span>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <p>state={text}</p>
        <label>
          <span>非受控</span>
          <input
            type="text"
            defaultValue="init"
            ref={uncontrolledRef}
          />
          <button onClick={() => alert(uncontrolledRef.current?.value)}>
            alert
          </button>
        </label>
      </DemoSection>

      <DemoSection
        title="D. key 重置组件 + Portal Modal"
        point="换 key 会卸载重建。Modal 用 createPortal 挂到 body。"
      >
        <PracticeTodo
          checks={[
            'DraftBox 本地 state；父级换 key 重置草稿',
            'createPortal Modal：点遮罩关闭，内容区 stopPropagation',
          ]}
        />
        <button
          type='button'
          onClick={() => setResetKey((k) => k + 1)}
        >
          resetKey
        </button>
        <DraftBox key={resetKey}/>
        <button onClick={() => setModalOpen(true)}>Open</button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <p>Modal content</p>
        </Modal>
      </DemoSection>
    </div>
  )
}

function DraftBox(){
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
