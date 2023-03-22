/*
* 传入参数：(fn, delay=100) => Fn
* 返回参数：函数
*
* 即高阶函数，增加延迟执行功能
*
* 实现逻辑：
* 1.定时器延迟执行
* 2.闭包：定义一个timer记录定时器
* 3.第二次执行时，应该将第一次的定时器清空，重新设置一个定时器.【清除定时器后，需要手动执行timer=null释放，不会自动销毁】？？？
* 4.定时器完成，进行函数执行。清空数据
* 5.this的绑定
*   a.内部导出的函数不能是箭头函数，需要普通函数进行this的绑定
*   b.最终执行时，定时器中调用时需要是箭头函数来执行
*
* 6.扩展：参数的传递
* 7.扩展：中途退出、返回 => 取消事件功能
* 8.扩展：立即执行（部分场景，第一次需要立即执行）需要用一个变量记录是否立即执行过
* 9.扩展：如何获取返回值？也可以增加参数：回调函数来获取最终的返回值
* 10.扩展：如何最后一次立即执行（如何获取参数问题）
* */

function debounce(fn, delay=1000, immediate = false) {
  let timer = null
  // 8.是否已经立即执行过：针对首次需要立即执行场景
  let isInvoke = false

  // 10.参数存储：最后一次立即执行使用
  let argument

  // 函数不能是箭头函数，需要去绑定外层继承而来的this
  function _debounce(...args) {
    console.log(this,'>>>')
    argument = args
    // 清除机制
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    return new Promise(async (resolve, reject) => {
      // 9：如何获取返回值：存储fn的返回值
      let res = null

      try {
        /* 立即执行，非首次执行 */
        if (immediate && !isInvoke) {
          // 6: 参数的传递
          res = await fn.apply(this, args)

          // 记录已经立即执行过
          isInvoke = true
          return resolve(res)
        } else {
          // 2：定义一个定时器，返回函数的结果，定时器此处需要用到this，用箭头函数
          timer = setTimeout(async () => {
            res = await fn.apply(this, args)
            resolve(res)

            // 初始化机制
            timer = null
            isInvoke = false

          }, delay)
        }
      } catch(error) {
        reject(error)
      }
    })
  }

  // 取消：清除定时器，初始化相关数据
  _debounce.cancel = function() {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  // 直接执行：取消操作，立即执行.this绑定，不能箭头函数
  _debounce.flush = async function () {
    this.cancel()
    return fn.apply(this, argument)
  }

  return _debounce
}
