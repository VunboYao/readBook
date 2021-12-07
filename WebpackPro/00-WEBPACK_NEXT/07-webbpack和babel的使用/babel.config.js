module.exports = {
  presets: [
    ['@babel/preset-env', {
      // targets: "chrome 88",
      useBuiltIns: 'usage',// entry需要导入相应的包，包大
      corejs: 3.19 // 需要单独安装core-js@3
    }],
    ['@babel/preset-react'] // 配置react，需要安装的插件
  ]
}
