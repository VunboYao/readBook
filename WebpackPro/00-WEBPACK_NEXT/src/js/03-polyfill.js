const a = function (params) {
  return new Promise((resolve, reject) => {
  resolve('123')
})
}
a().then(res => {
  console.log(res, 'polyfill');
})
