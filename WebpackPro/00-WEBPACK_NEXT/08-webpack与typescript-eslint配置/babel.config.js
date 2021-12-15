module.exports = {
  presets: [
    ["@babel/preset-env", {
      useBuiltIns: "usage", // entry需要导入相应的包，包大
      corejs: 3.19,
    }],
    ["@babel/preset-react"], // 配置react
    ["@babel/preset-typescript"], // 配置typescript
  ],
};
