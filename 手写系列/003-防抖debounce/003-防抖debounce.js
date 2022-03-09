/*
 * 防抖：避免频繁的触发某一个事件。等待时间范围内，当新的输入时，函数的触发会被频繁的推迟。
 *   搜索
 *   滚动
 *   缩放
 *   课堂问题拖堂
 *   回程技能
 * */

// ？获取返回值：回调方法 || Promise
{
	function debounce(fn, delay = 0, immediate = false) {
		// 1.定义一个定时器，保存上一次的定时器
		let timer = null
		let isInvoke = false
		// 2.真正执行的函数
		const _debounce = function (...args) {
			// 取消上一次的定时器
			if (timer) clearTimeout(timer)

			// 3.立即执行
			if (immediate && !isInvoke) {
				fn.apply(this, args)
				isInvoke = true
			} else {
				timer = setTimeout(() => {
					// 外部传入的函数
					fn.apply(this, args)
					isInvoke = false
					timer = null
				}, delay)
			}
		}

		// 4.取消功能
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
			// Promise
			return new Promise((res, rej) => {
				timeout = setTimeout(async () => {
					try {
						const result = await func.apply(this, args)
						res(result)
					} catch (e) {
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
