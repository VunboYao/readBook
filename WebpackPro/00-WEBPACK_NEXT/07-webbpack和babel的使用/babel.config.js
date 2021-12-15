module.exports = {
  presets: [
    ['@babel/preset-env', {
      // targets: "chrome 88",
      useBuiltIns: 'usage',// entry需要导入相应的包，包大。满足browserslist
      corejs: 3.19 // 需要单独安装core-js@3
    }],
    ['@babel/preset-react'] // 配置react，需要安装的插件
  ],
  plugins: [
      ['@babel/plugin-transform-runtime', {
        corejs: 3 // 需要安装 @babel/runtime-corejs3 -S
      }]
  ]
}


/*
* @babel/core
* @babel/preset-env
* babel-loader
*
* @babel/polyfill
*
* 新版：7.4:regenerator-runtime + core-js
* entry:
* 对应入口引入相应文件：
* import "core-js/stable";
* import "regenerator-runtime/runtime";
*
*
* useBuiltIns: 全局。
* @babel/plugin-transform-runtime -D 局部运行时。（插件用）
* */
