# 小程序快捷键

- ctrl  + p, 快速打开文件
- ctrl + e, 最近打开的文件
- ctrl + b, 编译

# 文件类型

- .wxss === css
- .wxml === html
- .js
- .json === 配置文件 

## 文件介绍

- **app.json**, 全局配置,  包括导航条，tab栏，下拉刷新，上拉加载等， **必须**
- **project.config.json**， 工具配置
- **page.json**， 页面配置, **必须**
- `sitemap` 的索引提示是默认开启的，如需要关闭 `sitemap` 的索引提示，可在小程序项目配置文件 `project.config.json` 的 `setting` 中配置字段 `checkSiteMap` 为 `false`

## WXSS 样式

- **提供了全局的样式和局部样式**。可以写一个`app.wxss`作为全局样式， 作用于当前小程序的所有页面。

# 文件路径

- 组件的使用时, 可以使用**绝对路径**
- ES6 module 中 **import时,必须使用相对路径**

# 宿主环境

## 渲染层和逻辑层

- WXML 模板和 WXSS 样式工作在渲染层
- JS 脚本工作在逻辑层

## 程序与页面

- 小程序启动之后，在 `app.js` 定义的 `App` 实例的 `onLaunch` 回调会被执行
- 页面由 `index.wxml`与 `index.js`中的`data`渲染出最终的结构， 渲染完界面之后，页面实例就会收到一个`onLoad`的回调。可以在此回调中处理逻辑。

- 宿主环境提供了**`App()`**构造器来注册一个程序App, App实例是单例对象， 在其他JS脚本中可以通过`getApp（）`来获取程序实例

  ```javascript
  const app = getApp();
  ```

- App 构造器接受一个 Object 参数

  | 参数属性 | 类型     | 描述                                                         |
  | -------- | -------- | ------------------------------------------------------------ |
  | onLaunch | Function | 当小程序初始化完成时，会触发 onLaunch**(options)**（全局只触发一次） |
  | onShow   | Function | 当小程序启动，或从后台进入前台显示，会触发 onShow**(options)** |
  | onHide   | Function | 当小程序从前台进入后台，会触发 onHide                        |
  | onError  | Function | 当小程序发生脚本错误，或者 API 调用失败时，会触发 onError 并带上错误信息 |
  | other    | any      | 可以添加任意的函数或数据到 Object 参数中，在App实例回调用 this 可以访问 |

- **一个页面中， WXML和JS文件是必须存在的， JSON和WXSS文件是可选的**

## 页面构造器Page()

| 参数属性            | 类型     | 描述                                                         |
| ------------------- | -------- | ------------------------------------------------------------ |
| data                | Object   | 页面的初始数据                                               |
| onLoad(**Options**) | function | 页面加载时触发。一个页面**只会调用一次**，可以获取路径中的**参数** |
| onShow()            | function | 页面显示/切入前台时触发。                                    |
| onReady()           | function | 页面初次渲染完成时触发。一个页面**只会调用一次**。代表页面已经准备妥当。可以交互。对界面内容进行设置的 API 如[wx.setNavigationBarTitle](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html)，请在`onReady`之后进行 |
| onHide()            | function | 页面隐藏/切入后台时触发。                                    |
| onUnload()          | function | 页面卸载时触发。                                             |

## 场景值

- 对于小程序，可以在 `App` 的 `onLaunch` 和 `onShow`，或[wx.getLaunchOptionsSync](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html) 中获取场景值。
- 对于小游戏，可以在 [wx.getLaunchOptionsSync](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html) 和 [wx.onShow](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/(wx.onShow)) 中获取场景值

# 模块化

- 可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过 [`module.exports`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/module.html) 或者 `exports`才能对外暴露接口。

- 使用 `require` 将公共代码引入

  ```javascript
  // common.js
  function sayHello(name) {
    console.log(`Hello ${name} !`)
  }
  function sayGoodbye(name) {
    console.log(`Goodbye ${name} !`)
  }
  
  module.exports.sayHello = sayHello
  exports.sayGoodbye = sayGoodbye
  
  // require
  var common = require('common.js')
  Page({
    helloMINA: function() {
      common.sayHello('MINA')
    },
    goodbyeMINA: function() {
      common.sayGoodbye('MINA')
    }
  })
  
  ```

- ES6 方式导入导出， **`export {}`**， **`import {} from  ''`**

# 模板

WXML提供模板（template），可以在模板中定义代码片段，然后在不同的地方调用。

## 定义模板

- 使用`name`属性, 作为模板的名字. 然后在 `<template/>`内定义代码片段

  ```javascript
  <template name="msgItem">
    <view>
      <text> {{index}}: {{msg}} </text>
      <text> Time: {{time}} </text>
    </view>
  </template>
  ```

## 使用模板

- 使用 `is` 属性, 声明需要使用的模板, 然后将数据所需要的`data`传入

  ```javascript
  <template is="msgItem" data="{{...item}}"
  ```

# WXSS 样式导入

- `@import "common.wxss";` **分号结束**, **相对路径**

# WXS 模块

- 编写在 `wxml`文件中的`<wxs>`标签内, 或以 `.wxs`为后缀名的文件内
- 每一个`.wxs`文件和`<wxs>`标签都是一个**单独的模块**
- 每个模块都是**独立的作用域**, 只能通过 **`module.exports`**导出.
  - `module.exports = {} || module.exports.msg = 'some msg'`
- module.exports = {} , **key:value 同名时，不可省略简写**
  
- **引用模块**: `<wxs>`标签

  - `module`, String, 当前`<wxs>`标签的模块名. **必填字段**
  - `src`, String, 引用**.wxs**文件的**相对路径**. 仅当本标签为**单闭合标签**或**标签的内容为空**时有效

  - `<wxs src="./../../module/comm.wxs" module="tool"></wxs>`

- **module**属性
  - module 属性是当前 `<wxs>` 标签的模块名。在单个 wxml 文件内，建议其值唯一。
  - module 属性值的命名必须符合下面两个规则：
    - 首字符必须是：字母（a-zA-Z），下划线（_）
    - 剩余字符可以是：字母（a-zA-Z），下划线（_）， 数字（0-9）

```javascript
<wxs module="foo">
var some_msg = "hello world";
module.exports = {
  msg : some_msg,
}
</wxs>
<view> {{foo.msg}} </view>
```

- **require函数**
  - 在`.wxs`模块中引用其他 `wxs` 文件模块，可以使用 `require` 函数。
  - 只能引用 `.wxs` 文件模块，且必须使用**相对路径**。

# 事件

## 事件绑定和冒泡

- 在**非原生组件**中, `bind`和`catch`后可以紧跟一个冒号, 其含义不变,如`bind:tap`, `catch:touchstart`
- `bind`事件绑定不会阻止冒泡事件向上冒泡
- `catch`事件绑定可以阻止冒泡事件向上冒泡



## 事件的捕获阶段

- 捕获阶段位于冒泡阶段之前, 且在捕获中, 事件到达节点的顺序与冒泡阶段恰好相反.

- `capture-bind`, 捕获事件
- `capture-catch`, 中断捕获阶段和取消冒泡阶段

## dataset

- 在组件节点中可以附加一些自定义数据, 自定义数据以`data-`开头, 多个单词以`-`连接

- 连字符写法会转换成驼峰写法, 而大写字符会自动转成小写字符

  ```javascript
  data-element-type ，最终会呈现为 event.currentTarget.dataset.elementType
  data-elementType ，最终会呈现为 event.currentTarget.dataset.elementtype 
  ```

## mark

- `mark`可以用于承载一些自定义数据(类似于`dataset`)

- 当事件触发时, 事件冒泡上所有的`mask`会被合并, 并返回给事件回调函数

  ```javascript
  <view mark:myMark="last" bindtap="bindViewTap">
    <button mark:anotherMark="leaf" bindtap="bindButtonTap">按钮</button>
  </view>
  
  Page({
    bindViewTap: function(e) {
      e.mark.myMark === "last" // true
      e.mark.anotherMark === "leaf" // true
    }
  })
  ```

`mark` 和 `dataset` 很相似，主要区别在于： `mark` 会包含从触发事件的节点到根节点上所有的 `mark:` 属性值；而 `dataset` 仅包含一个节点的 `data-` 属性值。

- 如果存在同名的 `mark` ，父节点的 `mark` 会被子节点覆盖
- 在自定义组件中接收事件时， `mark` 不包含自定义组件外的节点的 `mark`

- 不同于 `dataset` ，节点的 `mark` 不会做连字符和大小写转换

# 语法

- `wx:for`语法中, ``wx:key` 的值以两种形式提供
  - **字符串**，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
  - 保留**关键字 `*this` 代表在 for 循环中的 item 本身**，这种表示需要 item 本身是一个唯一的字符串或者数字
  - **无大括号**

