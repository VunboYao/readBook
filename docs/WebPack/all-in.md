# git配置

- `npx husky install` 执行并安装
  - husky是一个git hook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、pre-push

- `npx husky add .husky/pre-commit "npm run lint"`
  - 添加一个hook
- `npm install commitizen -D`
- `npx commitizen init cz-conventional-changelog --save-dev --save-exact`
  - 配置 commit message 工具

# npx cz操作

- 第一步，

  | Type     | 作用                                                         |
  | -------- | ------------------------------------------------------------ |
  | feat     | 新增特性 (feature)                                           |
  | fix      | 修复 Bug(bug fix)                                            |
  | docs     | 修改文档 (documentation)                                     |
  | style    | 代码格式修改(white-space, formatting, missing semi colons, etc) |
  | refactor | 代码重构(refactor)                                           |
  | perf     | 改善性能(A code change that improves performance)            |
  | test     | 测试(when adding missing tests)                              |
  | build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
  | ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
  | chore    | 变更构建流程或辅助工具(比如更改测试环境)                     |
  | revert   | 代码回退                                                     |

