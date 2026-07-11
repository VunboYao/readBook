import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChapterHeading, DemoSection } from '../shared/demo'

type User = { id: string; name: string }

const DB: Record<string, User> = {
  u1: { id: 'u1', name: 'Alice' },
  u2: { id: 'u2', name: 'Bob' },
  u3: { id: 'u3', name: 'Carol' },
}

/** 模拟慢接口；支持 AbortSignal，便于演示竞态取消 */
function fetchUser(id: string, signal?: AbortSignal): Promise<User> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      const user = DB[id]
      if (!user) reject(new Error(`user ${id} not found`))
      else resolve({ ...user })
    }, 600)
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

function EffectFetchDemo() {
  const [id, setId] = useState('u1')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [log, setLog] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setLog((l) => [`Effect 请求 ${id} 开始`, ...l].slice(0, 6))
    fetchUser(id)
      .then((data) => {
        if (!cancelled) {
          setUser(data)
          setLog((l) => [`Effect 请求 ${id} 完成`, ...l].slice(0, 6))
        } else {
          setLog((l) => [`Effect 请求 ${id} 已忽略(cancelled)`, ...l].slice(0, 6))
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <div>
      <div className="row-actions">
        {(['u1', 'u2', 'u3'] as const).map((x) => (
          <button key={x} type="button" onClick={() => setId(x)}>
            加载 {x}
          </button>
        ))}
      </div>
      <p>
        {loading ? 'loading…' : null}
        {user ? ` → ${user.name} (${user.id})` : null}
      </p>
      <ol className="log-list">
        {log.map((line, i) => (
          <li key={`${line}-${i}`}>{line}</li>
        ))}
      </ol>
      <p className="demo-hint">
        快速连点不同 id：看「已忽略」——这就是竞态防护（cancelled 标志）。
      </p>
    </div>
  )
}

function QueryUserDemo() {
  const [id, setId] = useState('u1')
  const qc = useQueryClient()

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ['playground-user', id],
    queryFn: ({ signal }) => fetchUser(id, signal),
  })

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      await new Promise((r) => setTimeout(r, 400))
      DB[id] = { ...DB[id], name }
      return DB[id]
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['playground-user'] })
    },
  })

  return (
    <div>
      <div className="row-actions">
        {(['u1', 'u2', 'u3'] as const).map((x) => (
          <button key={x} type="button" onClick={() => setId(x)}>
            queryKey 含 {x}
          </button>
        ))}
      </div>
      {isPending && <p>pending…</p>}
      {isFetching && !isPending && <p>后台 refetch…</p>}
      {isError && <p className="error">{(error as Error).message}</p>}
      {data && (
        <p>
          Query 数据：{data.name}{' '}
          <button
            type="button"
            onClick={() => mutation.mutate(`${data.name}*`)}
            disabled={mutation.isPending}
          >
            mutation 改名并 invalidate
          </button>
        </p>
      )}
    </div>
  )
}

function ClockEffectDemo() {
  const [now, setNow] = useState(() => new Date().toLocaleTimeString())
  useEffect(() => {
    const id = window.setInterval(
      () => setNow(new Date().toLocaleTimeString()),
      1000,
    )
    return () => window.clearInterval(id)
  }, [])
  return <p>正确 Effect 示例（同步外部时钟）：{now}</p>
}

/**
 * 05 · Effect 正确用法 vs 手写请求 vs TanStack Query
 */
export function Chapter05EffectsQuery() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="05"
        title="副作用与数据获取"
        doc="05-副作用与数据获取.md"
      />

      <DemoSection
        title="A. Effect = 同步外部系统"
        point="定时器/订阅/DOM 插件才是 Effect 主场；不是「默认放请求」的地方。"
      >
        <ClockEffectDemo />
      </DemoSection>

      <DemoSection
        title="B. 反模式：Effect 里请求（能跑，需自管竞态）"
        point="快速切换 id 时用 cancelled 丢掉过期响应。生产更推荐 Query。"
      >
        <EffectFetchDemo />
      </DemoSection>

      <DemoSection
        title="C. TanStack Query（推荐）"
        point="queryKey 含参数；signal 自动取消；mutation 后 invalidate。"
      >
        <QueryUserDemo />
      </DemoSection>
    </div>
  )
}
