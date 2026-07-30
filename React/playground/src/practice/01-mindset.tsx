import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'
import { useRef, useState } from 'react'

/** 练习：对照 src/chapters/01-counter.tsx */
export function Practice01Mindset() {
  const [count, setCount] = useState(0)
  const renderRef = useRef(0)
  renderRef.current += 1
  const [user, setUser] = useState({ name: 'react', score: 0 })
  console.log('render times');
  
  return (
    <div className="chapter">
      <ChapterHeading
        id="01"
        title="思维模型与 Vue 对照（练习）"
        doc="01-思维模型与Vue对照.md"
      />

      <DemoSection
        title="A. 重渲染心智"
        point="每次 setState → 本组件函数再跑一遍（看 render 次数）。对应 Vue：改 ref 后精确更新依赖。"
      >
        <PracticeTodo
          checks={[
            '用 useRef 记录并展示渲染次数（改 ref 不触发渲染）',
            '按钮：函数式更新 count +1',
            '按钮：同事件里连续 +1 两次，观察批处理只多一次渲染',
          ]}
        />
        <p>
          本组件已渲染 <strong>{renderRef.current}</strong> 次
        </p>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
        >
          count: {count} (函数式更新)
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
        <PracticeTodo
          checks={[
            'state：{ name, score }，用 JSON 展示',
            '按钮：展开新对象 score +1',
            '按钮：展开新对象 name 追加 !',
          ]}
        />
        <pre className="demo-pre">{JSON.stringify(user, null, 2)}</pre>
        <button
          type="button"
          onClick={() => setUser((u) => ({ ...u, score: u.score + 1 }))}
        >
          展开新对象 score +1
        </button>
        <button
          type="button"
          onClick={() => setUser((u) => ({ ...u, name: u.name + '!' }))}
        >
          name + !
        </button>
      </DemoSection>

      <DemoSection
        title="C. 原地修改（错误对照）"
        point="下面按钮改了对象字段但没换引用 → React 可能不刷新。"
      >
        <PracticeTodo
          checks={[
            '故意写反模式：user.score++ 后 setUser(user)（同一引用）',
            '对比 B：说明为何界面可能不变',
          ]}
        />
        <button
          type="button"
          onClick={() => {
            // 反模式：可变写法（Vue 习惯），React 下经常不触发更新
            setUser({...user, score: user.score + 1}) // 同一引用
          }}
        >{user.score}
          错误：user.score++ 后 setUser(user)
        </button>
        <p className="demo-hint">
          若分数不变：说明需要新对象。打开 React DevTools 看 state。
        </p>
      </DemoSection>
    </div>
  )
}
