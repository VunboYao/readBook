module.exports = {
  root: true, // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  parserOptions: {
    ecmaVersion: 11, // 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本
    sourceType: 'module' //  设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
  },
  // 继承规则
  extends: [
    'standard'
  ],
  // 扩展或覆盖规则
  rules: {
    /*
    * "off" 或 0 - 关闭规则
    * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    * */
    semi: ['error', 'never'], // 禁止使用分号
    indent: ['error', 2],
    'no-console': [
      'error', {
        allow: ['warn', 'error']
      }
    ],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always'
    }],
    quotes: ['error', 'single'] // 单引号
  },
  env: { // 环境定义
    browser: true,
    node: true,
    es6: true // 启用除了 modules 以外的所有 ECMAScript 6 特性
  }
}
