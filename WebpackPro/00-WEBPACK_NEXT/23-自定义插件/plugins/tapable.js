/*
* Hook
* 	sync:同步
* 	async: 异步
bail：当有返回值时，就不会执行后续的事件触发了；
Loop：当返回值为true，就会反复执行该事件，当返回值为undefined或者不返回内容，就退出事件；
Waterfall：当返回值不为undefined时，会将这次返回的结果作为下次事件的第一个参数；
Parallel：并行，会同时执行次事件处理回调结束，才执行下一次事件处理回调；
Series：串行，会等待上一是异步的Hook；
* */
const {
	SyncHook,
	SyncBailHook,
	SyncLoopHook,
	SyncWaterfallHook,
	AsyncSeriesHook,
		AsyncParallelHook
} = require('tapable')

let counter = 0
class Tapable {
	constructor(options) {
		this.hooks = {
			// SyncHook: new SyncHook(['name', 'age']), // 常规Hook
			// SyncHook: new SyncBailHook(['name', 'age']), // 当有返回值时，就不会继续执行事件触发
			// SyncHook: new SyncLoopHook(['name', 'age']), // 当返回值为true，就会反复执行该事件
			// SyncHook: new SyncWaterfallHook(['name', 'age']) // 当返回值不为undefined时，会将这次返回的结果作为下次事件的第一个参数

			// AsyncHook: new AsyncSeriesHook(['name', 'age']), // 串行
			AsyncHook: new AsyncParallelHook(['name', 'age']), // 并行

		}

		// 1.同步Hook调用方法
		/*this.hooks.SyncHook.tap('event1', (name, age) => {
			console.log('event1', name, age)
		})

		this.hooks.SyncHook.tap('event2', (name, age) => {
			console.log('event2', name, age)
		})*/

		//2 .异步Hook调用方法
		/*this.hooks.AsyncHook.tapAsync('event1', (name, age, callback) => {
			setTimeout(() => {
				console.log('event1', name, age)
				callback()
			}, 2000)
		})

		this.hooks.AsyncHook.tapAsync('event2', (name, age, callback) => {
			setTimeout(() => {
				console.log('event2', name, age)
				callback()
			}, 2000)
		})*/

		// 3. tapPromise调用方式
		this.hooks.AsyncHook.tapPromise('event', (name, age) => {
			return new Promise((resolve => {
				setTimeout(() => {
					console.log('event1', name, age)
					resolve()
				}, 2000)
			}))
		})

		this.hooks.AsyncHook.tapPromise('event', (name, age) => {
			return new Promise((resolve => {
				setTimeout(() => {
					console.log('event2', name, age)
					resolve()
				}, 2000)
			}))
		})
	}

	emit() {
		// 1.同步的
		// this.hooks.SyncHook.call('yyb', 20)
		// this.hooks.SyncHook.call('yyb', 30)

		// 2.异步的
		/*this.hooks.AsyncHook.callAsync('yyb-async', 30, () => {
			console.log('第一次事件执行完成')
		})*/

		// 3.promise
		this.hooks.AsyncHook.promise('yyb', 20).then(() => {
			console.log('事件监听完成')
		})
	}
}

new Tapable().emit()
