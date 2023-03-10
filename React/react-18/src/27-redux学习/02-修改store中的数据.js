const store = require('./store')
const {
  changeName,
  changeCount,
} = require('./store/action')

// 1.getState获取数据的默认方式
console.log(store.getState())

// 2.修改store中的数据：action
store.dispatch(changeName({ name: 'Vunbo' }))
console.log(store.getState())

// 3.此处传入的数据是一个对象，需要注意，在reducer中获取数据是，需要从对象中获取
store.dispatch(changeCount({ count: 101 }))
console.log(store.getState())
