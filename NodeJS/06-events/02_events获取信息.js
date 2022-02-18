const EventEmitter = require('events')
const { emit } = require('process')

const emitter = new EventEmitter()

emitter.on('click', () => {
	console.log('on')
})
function foo() {
	console.log('on2')
}
emitter.on('tap', foo) // on on2

// 获取注册列表
const eventslist = emitter.eventNames()
console.log('eventNames: ', eventslist)
// 获取监听器的数量
console.log('getMaxListeners: ', emitter.getMaxListeners())
// 获取监听某个事件的注册数量
console.log('listenerCount: ', emitter.listenerCount('click'))
console.log('listeners: ', emitter.listeners('click'))
emitter.prependListener('click', () => {
	console.log('prependListener 将监听事件放到最前')
})
// 只执行一次
emitter.once('click', () => {
	console.log('this: ', this)
	console.log('全局的arguments: ', arguments)
})
// 移除所有事件
// emitter.removeAllListeners()
emitter.emit('click')
// emitter.emit('click')
