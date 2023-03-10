const store = require('./store')
const {
  changeCount,
  changeName,
} = require('./store/action')

const unsubscribe = store.subscribe(() => {
  console.log('subscribe change: ', store.getState())
})

// 修改数据
store.dispatch(changeCount({ count: 999 }))
store.dispatch(changeName({ name: 'Yao2' }))

// unmount
unsubscribe()

store.dispatch(changeCount({ count: 10 }))
store.dispatch(changeCount({ count: 20 }))
store.dispatch(changeCount({ count: 30 }))
store.dispatch(changeCount({ count: 40 }))
