{
  // TODO:定时器延迟执行原理
  function debounce(fn, delay = 0, immediate = false) {
    let timer = null
    let isInvoke = false

    const _debounce = function (...args) {
      if (timer) clearTimeout(timer)
      if (immediate && !isInvoke) {
        fn.apply(this, args)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          fn.apply(this, args)
          isInvoke = false
          timer = null
        }, delay)
      }
    }
    _debounce.cancel = function () {
      if (timer) clearTimeout(timer)
      timer = null
      isInvoke = false
    }

    return _debounce
  }
}

{
  const debounce = (func, wait = 0) => {
    let timeout = null
    let args
    function debounced(...arg) {
      args = arg
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      return new Promise((res, rej) => {
        timeout = setTimeout(async () => {
          try {
            const result = await func.apply(this, args)
            res(result)
          } catch(e) {
            rej(e)
          }
        }, wait)
      })
    }

    function cancel() {
      clearTimeout(timeout)
      timeout = null
    }

    function flush() {
      cancel()
      return func.apply(this, args)
    }

    debounced.cancel = cancel
    debounced.flush = flush

    return debounced
  }
}
