module.exports = {
  env: {
    es2021: true,
  },
  // Vue3 官方eslint3件套
  extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-recommended', 'plugin:vue/vue3-strongly-recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // off(0) warn(1) error(2)

    // 单行属性时，不换行
    "vue/first-attribute-linebreak": ['error', {
      "singleline": "beside"
    }],
    "semi": ["error", "never"],
    "arrow-parens": ["error", "always"], // 箭头函数必须括号
    "vue/comment-directive": "off", // 去掉html的检测
  },
}
