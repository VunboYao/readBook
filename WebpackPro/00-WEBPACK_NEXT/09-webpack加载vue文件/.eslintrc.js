module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "commonjs": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended", // npm install eslint-plugin-react eslint@7 --save-dev
    "airbnb-base", // airbnb
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    }, // 启用语言功能
  },
  "rules": { // off(0) 关闭 warn(1)：警告 error(2):错误
    "no-unused-vars": "warn", // 未使用的变量
    "quote-props": 0, // 属性名称
    "comma-dangle": 2, // 最后一行逗号
    "semi": 2, // 分号
    "no-console": "warn", // console.log警告
    "quotes": ["error", "double"], // 采用双引号。错误警告
    "linebreak-style": ["off", "CRLF"],
  },
  "settings": {
    react: {
      version: "detect",
    },
  },
};

/*
* 1.配置react 安装依赖：npm install eslint-plugin-react eslint@7 --save-dev
* 2.webstorm自动格式化
* 3.npx eslint src/xxx.js
*  */
