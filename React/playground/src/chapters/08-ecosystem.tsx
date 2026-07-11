import { create } from 'zustand'
import { useForm } from 'react-hook-form'
import {
  MemoryRouter,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router'
import { ChapterHeading, DemoSection } from '../shared/demo'

type CartState = {
  items: { id: string; qty: number }[]
  add: (id: string) => void
  clear: () => void
}

const useCart = create<CartState>((set) => ({
  items: [],
  add: (id) =>
    set((s) => {
      const found = s.items.find((i) => i.id === id)
      if (found) {
        return {
          items: s.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i,
          ),
        }
      }
      return { items: [...s.items, { id, qty: 1 }] }
    }),
  clear: () => set({ items: [] }),
}))

function CartBadge() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))
  return <span className="badge">购物车 {count}</span>
}

function HomePage() {
  const add = useCart((s) => s.add)
  return (
    <div>
      <h4>首页</h4>
      <p>嵌套路由 index。点下面加入 Zustand 购物车（selector 只订 count）。</p>
      <button type="button" onClick={() => add('sku-react')}>
        加入 React 书
      </button>
      <button type="button" onClick={() => add('sku-vue')}>
        加入 Vue 书
      </button>
    </div>
  )
}

function UsersLayout() {
  return (
    <div>
      <h4>用户布局</h4>
      <p>
        <NavLink to="/users">列表</NavLink>
        {' · '}
        <NavLink to="/users/42?tab=profile">详情 42</NavLink>
      </p>
      <Outlet />
    </div>
  )
}

function UserList() {
  return (
    <ul>
      <li>
        <NavLink to="/users/1">user 1</NavLink>
      </li>
      <li>
        <NavLink to="/users/2">user 2</NavLink>
      </li>
    </ul>
  )
}

function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sp, setSp] = useSearchParams()
  const tab = sp.get('tab') ?? 'info'

  return (
    <div>
      <p>
        useParams id=<code>{id}</code> / tab=<code>{tab}</code>
      </p>
      <button
        type="button"
        onClick={() => setSp({ tab: tab === 'info' ? 'profile' : 'info' })}
      >
        切换 search tab
      </button>
      <button type="button" onClick={() => navigate(-1)}>
        navigate(-1)
      </button>
    </div>
  )
}

type LoginValues = { email: string; password: string }

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>()

  return (
    <form
      className="stack-form"
      onSubmit={handleSubmit((v) => alert(JSON.stringify(v)))}
    >
      <label>
        email
        <input {...register('email', { required: '必填' })} />
      </label>
      {errors.email && <span className="error">{errors.email.message}</span>}
      <label>
        password
        <input
          type="password"
          {...register('password', { minLength: { value: 6, message: '至少 6 位' } })}
        />
      </label>
      {errors.password && (
        <span className="error">{errors.password.message}</span>
      )}
      <button type="submit">RHF 提交</button>
    </form>
  )
}

function RouterDemo() {
  const clear = useCart((s) => s.clear)
  return (
    <MemoryRouter initialEntries={['/']}>
      <div className="mini-app">
        <nav className="mini-nav">
          <NavLink to="/" end>
            首页
          </NavLink>
          <NavLink to="/users">用户</NavLink>
          <NavLink to="/login">登录</NavLink>
          <CartBadge />
          <button type="button" onClick={clear}>
            清空购物车
          </button>
        </nav>
        <div className="mini-outlet">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersLayout />}>
              <Route index element={<UserList />} />
              <Route path=":id" element={<UserDetail />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </div>
    </MemoryRouter>
  )
}

/**
 * 08 · Router + Zustand + RHF 装进同一个迷你应用
 * 用 MemoryRouter，避免和 App 顶栏 hash 章节切换冲突。
 */
export function Chapter08Ecosystem() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="08"
        title="路由与状态生态"
        doc="08-路由与状态生态.md"
      />

      <DemoSection
        title="迷你应用：嵌套路由 + Zustand selector + RHF"
        point="MemoryRouter 隔离演示。NavLink / Outlet / params / search；购物车用 selector；登录页 RHF。"
      >
        <RouterDemo />
      </DemoSection>
    </div>
  )
}
