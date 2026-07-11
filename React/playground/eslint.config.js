import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // 多个 JSX 属性时强制一行一个，并对齐缩进
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1 }],
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx-indent-props': ['error', 2],
    },
  },
]
