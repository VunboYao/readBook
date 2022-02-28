/*
1. 任务队列个数不同
浏览器事件环有2个事件队列（宏任务与微任务）
NodeJS事件环有6个事件队列
2. 微任务队列不同
浏览器事件环中有专门存储微任务的队列
NodeJS事件环中没有专门存储微任务的队列
3. 微任务执行时机不同
浏览器事件环中每执行完一个宏任务都会去清空微任务队列
NodeJS事件环中只有同步代码执行完毕和其他队列之间切换的时候会去清空微任务队列
4. 微任务优先级不同
浏览器事件环中如果多个微任务同时满足执行条件，采用先进先出
NodeJS事件环中如果多个微任务同时满足执行条件，会按照优先级执行
*/

/*
NodeJS中的任务队列
timers             执行setTimeout() 和 setInterval() 中到期的 callback
pending callbacks  执行系统操作的回调， 如： TCP, UDP通信的错误callback
idle,prepare       只在内部使用
poll               执行与 I/O 相关的回调。（除了close回调，定时器回调和setImmediate（）之外，几乎所有回调都执行
check              执行 setImmediate的callback
close              执行close事件的callback, 例如socket.on('close', ()=>{})
*/


// 同步代码 => 微任务队列 => 宏任务队列 => 微任务队列 => 宏任务队列
// 微任务队列 process.nextTick 优先级比 promise 高
/*
setTimeout(() => {
    console.log('setTimeout1');
    Promise.resolve().then(() => {
        console.log('Promise1');
    })
    process.nextTick(() => {
        console.log('nextTick1');
    })
})
console.log('start');
setTimeout(() => {
    console.log('setTimeout2');
    Promise.resolve().then(() => {
        console.log('Promise2');
    })
    process.nextTick(() => {
        console.log('nextTick2');
    })
})
console.log('end');
*/
// 先执行同步代码  start  end
// 微任务代码
// 宏任务 s1
// 微任务 n1 p1
// 宏任务 s2
// 微任务 n2 p2

// 以下代码输出的结果是随机的。在NodeJS中指定的延迟时间是有一定的误差的，所以导致了输出结果的问题
setTimeout(() => {
  console.log('setTimeout');
})
setImmediate(() => {
  console.log('setImmediate');
})

// 面试题
const path = require('path')
const fs = require('fs')

fs.readFile(path.join(__dirname, '07-core.js'), () => {
  setTimeout(() => {
    console.log('setTimeout');
  })
  setImmediate(() => {
    console.log('setImmediate');
  })
})
// 先 setImmediate 后 setTimeout.因为 readFile在 poll 事件环中， 再执行 check， 最后 timers
