new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa')
  },1000)
}).then(res => {
  console.log(res, 'first')
  return res + '1111'
}).then(res => {
  console.log(res, 'second')
  return res + '222'
}).then(res => {
  console.log(res, 'third')
})
