module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    parser: "@typescript-eslint/parser",
  },
  rules: {
    /*
    “off”/0 关闭规则
    “warn”/1 警告
    "error"/2 错误
    */
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    // 关闭分号
    "semi": ["error", "never"],

    // 禁止多个空格
    "no-multi-spaces": ["error", {
      "ignoreEOLComments": false,
    }],

    // 一致的缩进
    "indent": ["error", 2],

    // 禁止行尾空格
    "no-trailing-spaces": ["error"],

    // 箭头函数必须括号
    'arrow-parens': ['error', 'always'],

    // 数组必须使用空格
    "array-bracket-spacing": ["error", "never", {
      "singleValue": false,
      "objectsInArrays": false,
      "arraysInArrays": false,
    }],

    // 大括号风格，默认 左括号紧跟变量名称后。 https://cn.eslint.org/docs/rules/brace-style
    "brace-style": ["error"],

    // 逗号前禁止空格，逗号后一个空格
    "comma-spacing": ["error"],

    // 关键字后必须有空格
    "keyword-spacing": "error",

    // 属性换行
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 2,
        },
        // multiline: {
        //   max: 1,
        // },
      },
    ],

    // 禁止多行空行
    "no-multiple-empty-lines": ["error", {
      max: 1,
      maxEOF: 1,
    }],

    // 禁止属性前有空白，如：foo[ bar ]
    "no-whitespace-before-property": "error",

    // 变量声明建议用const
    "prefer-const": "off",

    // 对象大括号中属性空格格式化
    "object-curly-spacing": ["error", "always"],

    // 操作符后空格
    "space-infix-ops": ["error", { "int32Hint": false }],

    // 字符串中用模版占位符
    "no-template-curly-in-string": "error",

    // 禁止出现空函数
    "no-empty-function": ["error"],

    // 大括号控制
    "curly": ["error"],

    // async函数内必须有await
    "require-await": "off",

    // 禁止变量声明覆盖
    "no-shadow": "off",

    // 推荐使用解构获取数据
    "prefer-destructuring": ["off", {
      "array": false, // 数组不推荐
      "object": true, //对象解构
    }, {
      "enforceForRenamedProperties": false,
    }],

    // 不允许初始化为 undefined
    "no-undef-init": "error",

    // 禁止将 undefined 作为标识符
    "no-undefined": "warn",

    // 禁止在变量定义之前使用
    "no-use-before-define": "off",

    // 强制在代码块中开括号和比括号后有空格
    "block-spacing": ["error", "always"],

    // 对象、数组末尾逗号.换行的最后一个元素添加逗号
    "comma-dangle": ["error", 'always-multiline'],

    // 逗号风格
    "comma-style": "error", // 默认在数组元素，对象属性，变量声明之后

    // 计算属性空格控制
    "computed-property-spacing": "error", // 默认never，禁止使用空格

    // 要求文件末尾保留一行空行
    "eol-last": "error",

    // 禁止函数调用时有空格
    "func-call-spacing": "off",

    // 禁用标识符，可指定禁止使用的变量标识符
    "id-blacklist": ["error"],

    // 函数内的参数禁止换行
    "function-paren-newline": ["error", "never"],

    // 禁止在箭头函数体之前出现换行
    "implicit-arrow-linebreak": "error",

    // 禁止对象key和value之间的空格
    "key-spacing": "error",

    // 驼峰命名
    "camelcase": "off",

    // require语句禁止变量声明方式
    "@typescript-eslint/no-var-requires": "off",

    // 明确模块名称导出
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // props必须有默认属性值
    "vue/require-valid-default-prop": "off",

    // 组件名称多单词
    "vue/multi-word-component-names": "off",

    // TypeScript配置
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: 'none', // 'none' or 'semi' or 'comma'
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi', // 'semi' or 'comma'
        requireLast: false,
      },
    }],

    "vue/no-setup-props-destructure": [0, 'error'],
  },
}
