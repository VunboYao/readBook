// 中间件打印日志需求
export default function log(store) {
  const next = store.dispatch
  function logAndDispatch(action) {
    console.log('current action: ', action)

    // 实际派发的dispatch，要用之前的dispatch
    next(action)

    console.log('result of dispatch: ', store.getState())
  }

  // monkey patch 串改现有代码，对整体执行逻辑进行修改
  store.dispatch = logAndDispatch
}
