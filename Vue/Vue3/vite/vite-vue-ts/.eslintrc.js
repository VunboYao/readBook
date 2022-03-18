module.exports = {
  root: true,
  env: {
    es2021: true
  },
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint'],
  // Vue3 官方eslint3件套
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    './.eslintrc-auto-import.json',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // 'prettier/prettier': 'error',
    // off(0) warn(1) error(2)
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1
        },
        multiline: {
          max: 1
        }
      }
    ],
    // 单行属性时，不换行
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'beside'
      }
    ],
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'always'], // 箭头函数必须括号
    'vue/comment-directive': 'off', // 去掉html的检测
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off']
  }
}
