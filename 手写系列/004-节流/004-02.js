/*
leading: 第一次是否立即执行
trailing: 最后一次是否执行
*/
function throttle(fn, wait = 200, options = { leading: true, trailing: false }) {
  const { leading, trailing } = options

  // 事件触发的时间
  let start_time = 0
  // 上一次事件执行的时间
  let last_time = 0
  let timer

  function _throttle(...args) {
    // 定时器清理
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    // 事件触发的时间
    start_time = new Date().getTime()

    return new Promise( (resolve, reject) => {
      // !没有上一次的执行时间，第一次是否根据配置立即执行
      if (!last_time && leading) {
        try {
          const result =  fn.apply(this, args)
          resolve(result)
          // 更新上一次事件的执行时间
          last_time = start_time
        } catch(error) {
          reject(error)
        }
      } else {
        try {
          // !本次在上一次事件执行后，多久后才可以执行
          let duration = start_time - last_time
          console.log(duration);

          // 超出时间限制，可以执行
          if (duration >= wait) {
            const result = fn.apply(this, args)
            resolve(result)
            // 更新上一次事件的执行时间
            last_time = start_time
          } else {
            // !如果最后一次需要执行
            if (trailing) {
              // 更改定时器，延迟执行
              timer = setTimeout( () => {
                const result = fn.apply(this, args)
                resolve(result)

                // 更新上一次事件的执行时间
                last_time = start_time

                // 记录剩余定时器时间
              }, wait - duration)
            }
          }
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  _throttle.cancel = () => {
    clearTimeout(timer)
    timer = null
    // 事件触发的时间
    start_time = 0
    // 上一次事件执行的时间
    last_time = 0
  }

  return _throttle
}

