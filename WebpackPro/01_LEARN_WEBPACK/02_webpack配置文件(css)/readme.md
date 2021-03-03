## Webpack默认打包

- 默认执行`webpack`指令可以打包，输出为`dist/main.js`
- 通过命令配置输出：`npx webpack --entry ./src/main.js --output-path ./build`

## Webpack配置文件

- 默认通过`webpack.config.js`配置文件进行打包

- 自定义打包文件：`webpack --config xxx.config.js`

  ```js
  // package.json
  "scripts": {
      "build": "webpack --config wk.config.js"
  }
  ```

## loader使用规则

- loader可以用于对**模块的源代码**进行转换
- 我们可以**将css文件也看成是一个模块**，我们是通过**import来加载这个模块**的
- 在加载这个模块时，**webpack其实并不知道如何对其进行加载**，我们必须制定对应的loader来完成这个功能
  - **内联方式**：使用较少，不方便管理
    - `import 'css-loader!../css/component.css';`
  - **CLI方式（webpack5中不再使用）**: `--module-bind`
  - 配置方式: `module.rules`中配置多个loader

## loader配置方式

- rules属性对应的值是一个数组： **`[Rule]`**

- 数组中存放的是一个个的Rule, Rule是一个对象，对象中可以设置多个属性

  - **test属性**： 用于对resource(资源)进行匹配，通过会设置成正则表达式
  - **use属性**：对应的值是一个数组：**`[UseEntry]`**
    -  `UseEntry`是一个对象，可以通过对象的属性来设置一些其他属性
      -  loader：必须有一个 loader属性，对应的值是一个字符串
      - options：可选的属性，值是一个字符串或者对象，值会被传入到loader中；

  - **loader属性**： Rule.use: [ { loader } ] 的简写

- `loader`解析规则：从右至左，从下到上

  ```js
  const path = require('path') // 内置path模块
  module.exports = {
    // 开始模式
    mode: 'development',
    // 入口
    entry: path.resolve(__dirname, './src/main'),
    // 出口
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          // 使用方式一： 单例使用，二的简写
          loader: 'css-loader',
        use: 'css-loader'
  
          // 使用方式二
         	use: [
            {
              loader: 'css-loader',
              options: {}
            }
          ]
          // 使用方式三： 二的简写
          use: ['style-loader', 'css-loader']
        }
      ]
    }
}
  
  ```

## less文件处理

```js
{
    test: /\.less$/i,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader' }
        ]
}
```

## 浏览器兼容性

通过`browserslist`工具，共享目标浏览器和Node.js版本的设置

- 如何配置`browserslist`呢？两种方案：
  - 方案一：在`package.json`中配置；
  - 方案二：单独的一个配置文件`.browserslistrc`文件；

- 方案一：`package.json`配置

  ```js
  "browserslist": [
      "last 2 version",
      "not dead",
      "> 0.2%"
  ]
  ```

- 方案二：`.browserslistrc`文件

  ```js
  last 2 version
  not dead
  > 0.2%
  ```
