import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

/** 练习：对照 src/chapters/04-data-flow.tsx */
export function Practice04DataFlow() {
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
      </DemoSection>
    </div>
  )
}
