import {
  createContext,
  useActionState,
  useContext,
  useOptimistic,
  useState,
  type FormEvent,
} from 'react'
import { useFormStatus } from 'react-dom'
import { ChapterHeading, DemoSection } from '../shared/demo'

type User = { name: string }

const AuthContext = createContext<{ user: User | null } | null>(null)

function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be under AuthProvider')
  return ctx
}

function SearchInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="搜索关键词"
    />
  )
}

function ResultList({ keyword }: { keyword: string }) {
  const all = ['React', 'Vue', 'Vite', 'Redux', 'Zustand']
  const list = all.filter((x) =>
    x.toLowerCase().includes(keyword.trim().toLowerCase()),
  )
  return (
    <ul>
      {list.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  )
}

function WhoAmI() {
  const { user } = useAuth()
  return <p>Context 用户：{user ? user.name : '未登录'}</p>
}

type FormState = { email: string; agree: boolean }

function SubmitBtn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
    >
      {pending ? '提交中…' : '保存昵称'}
    </button>
  )
}

async function saveName(_prev: string, formData: FormData) {
  const name = String(formData.get('name') ?? '')
  await new Promise((r) => setTimeout(r, 800))
  if (!name.trim()) throw new Error('名字不能为空')
  return name
}

/**
 * 04 · 状态提升 / Context / 受控表单 / Actions+乐观更新
 */
export function Chapter04DataFlow() {
  const [keyword, setKeyword] = useState('')
  const [authUser, setAuthUser] = useState<User | null>({ name: 'Alice' })
  const [form, setForm] = useState<FormState>({ email: '', agree: false })
  const [submitted, setSubmitted] = useState<string | null>(null)

  const [name, formAction] = useActionState(saveName, 'Neo')
  const [optimistic, setOptimistic] = useOptimistic(name)

  function patch<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSignup(e: FormEvent) {
    e.preventDefault()
    setSubmitted(JSON.stringify(form))
  }

  return (
    <div className="chapter">
      <ChapterHeading
        id="04"
        title="数据流与表单"
        doc="04-数据流与表单.md"
      />

      <DemoSection
        title="A. 状态提升"
        point="SearchInput 与 ResultList 共享 keyword → 提升到父组件，子组件只收 props+回调。"
      >
        <SearchInput
          value={keyword}
          onChange={setKeyword}
        />
        <ResultList keyword={keyword} />
      </DemoSection>

      <DemoSection
        title="B. Context（低频会话）"
        point="适合当前用户/主题；不适合每个按键都变的输入。"
      >
        <AuthContext value={{ user: authUser }}>
          <WhoAmI />
          <button
            type="button"
            onClick={() => setAuthUser((u) => (u ? null : { name: 'Alice' }))}
          >
            {authUser ? '登出' : '登录'}
          </button>
        </AuthContext>
      </DemoSection>

      <DemoSection
        title="C. 受控多字段表单"
        point="单一 form state + patch；校验/禁用提交清晰。字段多时改用 RHF（08）。"
      >
        <form
          onSubmit={onSignup}
          className="stack-form"
        >
          <label>
            email
            <input
              value={form.email}
              onChange={(e) => patch('email', e.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => patch('agree', e.target.checked)}
            />{' '}
            同意条款
          </label>
          <button
            type="submit"
            disabled={!form.agree || !form.email}
          >
            提交
          </button>
        </form>
        {submitted && <pre className="demo-pre">{submitted}</pre>}
      </DemoSection>

      <DemoSection
        title="D. React 19 Actions + 乐观更新"
        point="useActionState / useFormStatus / useOptimistic：提交中状态与先改 UI 再等结果。"
      >
        <p>
          真实值：<strong>{name}</strong> / 乐观显示：
          <strong>{optimistic}</strong>
        </p>
        <form
          action={async (fd) => {
            setOptimistic(String(fd.get('name') ?? ''))
            await formAction(fd)
          }}
          className="stack-form"
        >
          <input
            name="name"
            defaultValue={name}
          />
          <SubmitBtn />
        </form>
      </DemoSection>
    </div>
  )
}
