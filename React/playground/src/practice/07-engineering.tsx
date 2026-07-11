import { ChapterHeading, DemoSection, PracticeTodo } from '../shared/demo'

/** 练习：对照 src/chapters/07-engineering.tsx */
export function Practice07Engineering() {
  return (
    <div className="chapter">
      <ChapterHeading
        id="07"
        title="工程化与 TypeScript（练习）"
        doc="07-工程化与TypeScript.md"
      />

      <DemoSection
        title="A. 组件 Props 类型（推荐写法）"
        point="function Button(props: ButtonProps)；不必 React.FC。"
      >
        <PracticeTodo
          checks={[
            '定义 ButtonProps：variant primary|ghost、disabled、onClick、children',
            '实现 Button，页面放 primary / ghost / disabled 各一',
            '可用 CSS Modules（自建或参考 chapters/07-button.module.css）',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="B. 事件类型"
        point="ChangeEvent / KeyboardEvent 带上元素泛型。"
      >
        <PracticeTodo
          checks={[
            'input onChange: React.ChangeEvent<HTMLInputElement>',
            'Enter 时 blur，并往 log 列表推一条',
          ]}
        />
      </DemoSection>

      <DemoSection
        title="C. CSS Modules + 环境变量"
        point="仅 VITE_ 前缀进客户端。"
      >
        <PracticeTodo
          checks={[
            '展示 import.meta.env.MODE / DEV / BASE_URL',
            '注释说明如何加 VITE_API_BASE',
          ]}
        />
      </DemoSection>
    </div>
  )
}
