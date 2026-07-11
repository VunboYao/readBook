import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

/** 练习：对照 src/chapters/02-list-form.tsx */
export function Practice02Jsx() {
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
      </DemoSection>
    </div>
  )
}
