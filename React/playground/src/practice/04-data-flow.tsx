import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'
import {
  createContext,
  useActionState,
  useContext,
  useOptimistic,
  useState,
} from 'react'
import * as React from 'react'
import { useFormStatus } from 'react-dom'

type User = { name: string }
const AuthContext = createContext<{ user: User | null } | null>(null)

function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be under AuthProvider')
  return ctx
}

function WhoAmI() {
  const { user } = useAuth()
  return <p>Context 用户：{user ? user.name : '未登录'}</p>
}

type Form = { email: string; agree: boolean }

function Signup() {
  const [form, setForm] = useState<Form>({ email: '', agree: false })
  const [submitted, setSubmitted] = useState<string | null>(null)

  function patch<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setSubmitted(JSON.stringify(form))
  }

  return (
    <form
      onSubmit={onSubmit}
      className='stack-form'
    >
      <label>
        email:
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
      {submitted && <pre className="demo-pre">{submitted}</pre>}
    </form>
  )
}

async function saveName(_prev: string,  formData: FormData) {
  const name = String(formData.get('name') ?? '')
  await new Promise((r) => setTimeout(r, 8000))
  if (!name.trim()) throw new Error('名字不能为空')
  return name
}

function SubmitBtn() {
  const {pending} = useFormStatus()
  return (
    <button
      type='submit'
      disabled={pending}
    >{pending ? '提交中...' : '保存昵称'}</button>
  )
}

/** 练习：对照 src/chapters/04-data-flow.tsx */
export function Practice04DataFlow() {
  const [keyword, setKeyword] = useState('')
  const [authUser, setAuthUser] = useState<User | null>({ name: 'Alice' })
  const [name, formAction] = useActionState(saveName, 'Neo')
  const [optimistic, setOptimistic] = useOptimistic(name)
  return (
    <div className="chapter">
      <ChapterHeading
        id="04"
        title="数据流与表单（练习）"
        doc="04-数据流与表单.md"
      />

      <DemoSection
        title="A. 状态提升"
        point="SearchInput 与 ResultList 共享 keyword → 提升到父组件。"
      >
        <PracticeTodo
          checks={[
            '父持有 keyword；SearchInput 只收 value/onChange',
            'ResultList 按 keyword 过滤展示',
          ]}
        />
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
        <PracticeTodo
          checks={[
            'AuthContext + useAuth（无 Provider 时 throw）',
            '登录/登出切换，子组件显示用户名',
          ]}
        />
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
        point="单一 form state + patch；字段多时再上 RHF。"
      >
        <PracticeTodo
          checks={[
            'email + agree 受控；patch 更新字段',
            '未同意或空 email 时禁用提交；提交展示 JSON',
          ]}
        />
        <Signup />
      </DemoSection>

      <DemoSection
        title="D. React 19 Actions + 乐观更新"
        point="useActionState / useFormStatus / useOptimistic。"
      >
        <PracticeTodo
          checks={[
            'async saveName Action（可 setTimeout 模拟）',
            'useOptimistic 先改显示；SubmitBtn 用 useFormStatus（从 react-dom 导入）',
          ]}
        />
        <p>
          真实值: <strong>{name}</strong> / 乐观显示: <strong>{optimistic}</strong>
        </p>
        <form
          action={async (fd)=> {
          setOptimistic(String(fd.get('name') ?? ''))
          await formAction(fd)
        }}
          className='stack-form'
        >
          <input
            type="text"
            name="name"
            defaultValue={name}
          />
          <SubmitBtn/>
        </form>
      </DemoSection>
    </div>
  )
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
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Please input keyword"
    />
  )
}

function ResultList({ keyword }: { keyword: string }) {
  const all = ['React', 'Vue', 'Vite', 'Redux', 'Zustand']
  const list = all.filter((x) =>
    x.toLowerCase().includes(keyword.toLowerCase()),
  )
  return (
    <ul>
      {list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
