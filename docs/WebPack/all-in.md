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

# eslint大神配置

```npm
pnpm add -D eslint @antfu/eslint-config
```

## Config `.eslintrc`

```
{
  "extends": "@antfu"
}
```

```js
// package.json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

# Loaders

- **module.rules** 中配置多个 loader

- rules 属性对应的值是一个**数组** `[Rule]`

- 数组中存放的是一个个的 Rule，Rule 是一个对象，对象中可以设置多个属性

  - **test**属性：正则匹配
  - **use**属性：对应的值是一个数组：`【UseEntry】`
    - UseEntry是一个对象。包含以下属性
    - **loader**: 必须有一个loader属性，对应的值是一个字符串
    - **options**: 可选的属性，值是一个字符串或者对象，值会被传入loader中
  - **use**属性: `["loaderName"]`，**简写**
  - **loader**属性："loaderName"，**简写**

  ```js
    module: {
      rules: [
        {
          test: /\.css$/,
          // loader: 'css-loader', // 简写1：只有一个laoder时
          // use: ['style-loader', 'css-loader'], // 简写2:无需配置时的简写
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
          ],
        },
      ],
    }
  ```

  

## css-loader

转换css文件

- 内联方式：在引入的样式前加上使用的loader，使用！分割
  - `import "css-loader!../css/style.css"`
- CLI方式(webpack5不再使用)
- 配置方式

## style-loader

将 `css-loader` 的代码插入到 `style` 标签中

## less

`pnpm add less less-loader -D`

```json
{
    test: /\.less$/,
    use: [
        'style-loader',
        'css-loader',
        'less-loader',
    ],
}
```

## .browserslistrc

```text
> 0.5%
last 2 version
not dead
```

## postcss

`pnpm add postcss postcss-cli postcss-loader postcss-preset-env -D`

- `postcss-preset-env`： 插件，polyfill 处理

## file-loader

输出图片处理

## url-loader

limit：限制图片大小。转base64

outputPath: 文件名

name: "文件名**/**名称配置"

- 【ext】：扩展名
- 【name】：文件的名称
- 【hash】：文件的内容，32进制
- 【contentHash】:内容
- 【path】：文件相当于webpack配置文件的路径

# webpack5 Asset

- **asset/resource** 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现
- **asset/inline** 导出一个资源的 data URI。之前通过使用 url-loader 实现；
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现；
- **asset** 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源
  体积限制实现

```json
{
    test: /\.(png|jpe?g|gif|svg)$/i,
    // type: 'asset/resource', // ! === file-loader
    type: 'asset', // ! === url-loader
    // * config the filename
    generator: {
        filename: 'imgs/[name].[hash:6][ext]',
    },
    // * like url-loader limit
    parser: {
        dataUrlCondition: {
            maxSize: 10 * 1024,
        },
    },
}
```

