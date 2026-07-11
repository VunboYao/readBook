import { useRef, useState } from 'react'
import { ChapterHeading, DemoSection } from '../shared/demo'

/**
 * 01 · 思维模型
 * 完整演示：不可变更新 vs 原地修改、函数式更新、批处理感知
 */
export function Chapter01Mindset() {
  const [user, setUser] = useState({ name: 'Neo', score: 0 })
  const [count, setCount] = useState(0)
  const renderRef = useRef(0)
  renderRef.current += 1

  return (
    <div className="chapter">
      <ChapterHeading
        id="01"
        title="思维模型与 Vue 对照"
        doc="01-思维模型与Vue对照.md"
      />

      <DemoSection
        title="A. 重渲染心智"
        point="每次 setState → 本组件函数再跑一遍（看 render 次数）。对应 Vue：改 ref 后精确更新依赖。"
      >
        <p>
          本组件已渲染 <strong>{renderRef.current}</strong> 次
        </p>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
        >
          count: {count}（函数式更新）
        </button>
        <button
          type="button"
          onClick={() => {
            setCount((c) => c + 1)
            setCount((c) => c + 1)
          }}
        >
          同事件里 +1 两次（批处理 → 只多一次渲染）
        </button>
      </DemoSection>

      <DemoSection
        title="B. 不可变更新（正确）"
        point="对象/数组必须返回新引用；勿 user.name = x 后指望刷新。"
      >
        <pre className="demo-pre">{JSON.stringify(user, null, 2)}</pre>
        <button
          type="button"
          onClick={() => setUser((u) => ({ ...u, score: u.score + 1 }))}
        >
          score +1（展开新对象）
        </button>
        <button
          type="button"
          onClick={() => setUser((u) => ({ ...u, name: u.name + '!' }))}
        >
          name 追加 !
        </button>
      </DemoSection>

      <DemoSection
        title="C. 原地修改（错误对照）"
        point="下面按钮改了对象字段但没换引用 → React 可能不刷新。点完看 score 是否变。"
      >
        <button
          type="button"
          onClick={() => {
            // 反模式：可变写法（Vue 习惯），React 下经常不触发更新
            user.score += 1
            setUser(user) // 同一引用
          }}
        >
          错误：user.score++ 后 setUser(user)
        </button>
        <p className="demo-hint">
          若分数不变：说明需要新对象。打开 React DevTools 看 state。
        </p>
      </DemoSection>
    </div>
  )
}
