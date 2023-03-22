/*
 * 节流：触发的事件很多。按照固定的频率触发。
 *   监听滚动
 *   鼠标移动
 *   频繁点击
 *   技能冷却
 * */

{
	// ？获取返回值：回调方法 || Promise
  /*
  * leading: true 首次执行
  * trailing: false 最后一次是否执行
  * */
	function throttle(fn, wait, options = { leading: true, trailing: false }) {
		const { leading, trailing } = options
		// 1.上一次的开始时间
		let lastTime = 0
		let timer = null

		// 2.真正执行的函数
		const _throttle = function (...args) {
			// 2.1获取当时事件触发时的时间
			const nowTIme = new Date().getTime()
			// 3.第一次不立即执行
			if (!lastTime && !leading) lastTime = nowTIme

			// 2.2 计算剩余时间，触发函数
			const remainTime = wait - (nowTIme - lastTime)
			if (remainTime <= 0) {
				// 4.2 非最后一次需要执行。取消定时器
				if (timer) {
					clearTimeout(timer)
					timer = null
				}
				fn.apply(this, args)
				// 2.3保留上一次的触发时间
				lastTime = nowTIme
				// 4.1 处理中，防止定时器生成
				return
			}

			// 4.最后一次需要执行，增加一个定时器
			if (trailing && !timer) {
				timer = setTimeout(() => {
					fn.apply(this, args)
					timer = null
					// 4.3立即执行后时间处理
					lastTime = !leading ? 0 : new Date().getTime()
				}, remainTime)
			}

			// 5.取消功能
			_throttle.cancel = function () {
				if (timer) clearTimeout(timer)
				timer = null
				lastTime = 0
			}
		}
		return _throttle
	}
}

{ 
	const throttle = (func, wait = 0, execFirstCall) => {
		let timeout = null
		let args
		let firstCallTimestamp

		function throttled(...arg) {
			if (!firstCallTimestamp) firstCallTimestamp = new Date().getTime()
			if (!execFirstCall || !args) {
				args = arg
			}

			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}

			// Promise
			return new Promise(async (res, rej) => {
				if (new Date().getTime() - firstCallTimestamp >= wait) {
					try {
						const result = await func.apply(this, args)
						res(result)
					} catch (e) {
						rej(e)
					} finally {
						cancel()
					}
				} else {
					timeout = setTimeout(async () => {
						try {
							const result = await func.apply(this, args)
							res(result)
						} catch (e) {
							rej(e)
						} finally {
							cancel()
						}
					}, firstCallTimestamp + wait - new Date().getTime()) // 剩余时间 = 第一次时间 + wait - nowTime
				}
			})
		}
		function cancel() {
			clearTimeout(timeout)
			timeout = null
			args = null
			firstCallTimestamp = null
		}

		function flush() {
			cancel()
			return func.apply(this, args)
		}

		throttled.cancel = cancel
		throttled.flush = flush

		return throttled
	}
}
