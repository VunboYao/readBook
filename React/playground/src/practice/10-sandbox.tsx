import { useState } from 'react'
import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type User = { id: string; name: string }

/** 可变「假后端」；mutation 可直接改它 */
export const DB: Record<string, User> = {
  u1: { id: 'u1', name: 'Alice' },
  u2: { id: 'u2', name: 'Bob' },
  u3: { id: 'u3', name: 'Carol' },
}

/** 慢接口 + AbortSignal；queryFn 里请传 ({ signal }) => fetchUser(id, signal) */
export function fetchUser(id: string, signal?: AbortSignal): Promise<User> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      const user = DB[id]
      if (!user) reject(new Error(`user ${id} not found`))
      else resolve({ ...user })
    }, 600)
    signal?.addEventListener('abort', () => {
      console.log('abort', id)
      window.clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

/**
 * 在此实现：
 * - useQuery({ queryKey: ['sandbox-user', id], queryFn: ({ signal }) => fetchUser(id, signal) })
 * - useMutation 改名 + invalidateQueries
 * 对照：src/chapters/05-effects-query.tsx → QueryUserDemo
 */
function QuerySandbox() {
  const [id, setId] = useState('u1')

  return (
    <div>
      <div className="row-actions">
        {(['u1', 'u2', 'u3'] as const).map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => setId(x)}
          >
            {x}
          </button>
        ))}
      </div>

      {/* TODO: pending / error / data / 改名按钮 */}
      <p className="demo-hint">当前 id：{id}</p>
      <UserCard id={id} />
      <RenameUser id={id} currentName={DB[id].name} />
    </div>
  )
}

function UserCard({id}: {id: string}){
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ['user', id],
    queryFn: ({ signal }) => fetchUser(id, signal),
  })
  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  return (
    <p>
      {data.name}
      {isFetching ? <span>Fetching...</span> : null}
    </p>
  )
}

function RenameUser({id, currentName}: {id: string, currentName: string}) {
  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name }),
      })
      if (!res.ok) throw new Error('Failed to rename user')
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user', id] })
    }
  })

  return (
    <button disabled={mutation.isPending} onClick={() => mutation.mutate(currentName + '')}>{mutation.isPending ? 'Renaming...' : 'Rename'}</button>
  )
}

/** 自由练习：TanStack Query */
export function Practice10Sandbox() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="10"
        title="Sandbox · TanStack Query"
        doc="05-副作用与数据获取.md"
      />

      <DemoSection
        title="跟练清单"
        point="main 已挂 QueryClientProvider；全局 staleTime=30s、retry=1（见 shared/query-client.ts）。"
      >
        <PracticeTodo
          checks={[
            "useQuery：queryKey ['sandbox-user', id]，queryFn 接 signal",
            '按钮切 u1/u2/u3；展示 pending / error / data；可区分 isFetching',
            'useMutation 改 DB[id].name；onSuccess → invalidateQueries',
            '快速连点换 id：旧请求应被 abort（不必手写 cancelled）',
            '同 id 在 30s 内再切回来：应先出缓存（往往无 isPending）',
          ]}
        />
        <QuerySandbox />
      </DemoSection>
    </div>
  )
}
