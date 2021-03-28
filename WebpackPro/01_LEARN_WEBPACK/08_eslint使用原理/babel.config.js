module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        /* targets: {
        "edge": "17",
        "firefox": "60",
        "chrome": "67",
        "safari": "11.1"
      } */
        // targets: 'last 2 version',
        // useBuiltIns: 'usage',
        /*
      false: 不用任何polyfill的代码
      usage: 代码中需要用哪些polyfill，就引用相关的api
      entry: 手动导入 'core-js/stable' 'regenerator-runtime/runtime'
      */
        // corejs: 3.9
      },
    ],
  ],
  plugins: [
    // 工具库使用，防止污染他人的代码
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        proposals: true,
      },
    ],
  ],
}
