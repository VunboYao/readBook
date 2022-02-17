/* 
输出格式：
html中使用: IIFE(immediately invoked Function Expression) vue.global.js
浏览器emModule使用: vue.esm-browser.js
webpack等模块化中使用时：优先选择package.json中的module，而不是main，vue.esm-bundler.js
服务端渲染：vue.cjs.js

app.config.errorHandler: 注册错误处理程序
*/

let handleError = null
export default {
  foo(fn) {
    callWithErrorHandling(fn)
  },
  registerErrorHandler(fn) {
    handleError = fn
  }
}

function callWithErrorHandling(fn) {
  try {
    fn
  } catch (e) {
    handleError(e)
  }
}