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

| 参数属性                 | 类型     | 描述                                                         |
| ------------------------ | -------- | ------------------------------------------------------------ |
| data                     | Object   | 页面的初始数据                                               |
| onLoad(**Object query**) | function | 页面加载时触发。一个页面**只会调用一次**，可以获取路径中的**参数** |
| onShow()                 | function | 页面显示/切入前台时触发。                                    |
| onReady()                | function | 页面初次渲染完成时触发。一个页面**只会调用一次**。代表页面已经准备妥当。可以交互。对界面内容进行设置的 API 如[wx.setNavigationBarTitle](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html)，请在`onReady`之后进行 |
| onHide()                 | function | 页面隐藏/切入后台时触发。                                    |
|                          | function |                                                              |
|                          | function |                                                              |
|                          | function |                                                              |
|                          | function |                                                              |
|                          | function |                                                              |
|                          | function |                                                              |
|                          | function |                                                              |
| other                    | any      |                                                              |

## 场景值

- 对于小程序，可以在 `App` 的 `onLaunch` 和 `onShow`，或[wx.getLaunchOptionsSync](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html) 中获取上述场景值。
- 对于小游戏，可以在 [wx.getLaunchOptionsSync](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html) 和 [wx.onShow](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/(wx.onShow)) 中获取上述场景值