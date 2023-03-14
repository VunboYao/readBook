// 异步dispatch的实现
export default function thunk(store) {
  const next = store.dispatch

  function dispatchFn(action) {
    if (typeof action === 'function') {
      // 当内部继续触发一个func的dispatch时，用新的dispatch继续执行
      action(store.dispatch, store.getState)
    } else {
      next(action)
    }
  }

  store.dispatch = dispatchFn
}
