module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // 0(off)关闭 1(warn)警告 2(error)错误
    'no-unused-vars': 'warn', // 未使用的变量
    'quote-props': 0, // 属性名称
    'comma-dangle': 2, // 最后一行逗号
    'semi': [2, 'never'], // 分号
    'quotes': ['error', 'single'], // 采用双引号。错误警告
    'linebreak-style': ['off', 'CRLF'],
    'no-console': ['error', {
      allow: ['warn', 'error'],
    }],
    'import/no-import-module-exports': 0, // 支持commonjs导入esModule
    // 'indent': 0, // 缩进检查关闭
  },
}
