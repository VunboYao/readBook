module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 0/off 关闭  1/warn 警告  2/error错误   输入数字
    'no-unused-vars': 0
  },
}
