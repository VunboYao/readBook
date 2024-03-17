const EventEmitter = require('events')

const emitter = new EventEmitter()

emitter.on('click', () => {
  console.log('on')
})
function foo() {
  console.log('on2')
}
emitter.on('click', foo) // on on2

emitter.emit('click')

emitter.off('click', foo)
emitter.emit('click') // on
