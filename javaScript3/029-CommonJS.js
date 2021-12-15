/*
源码实现：
module.exports = {}
exports = module.exports
*/
/**/
let name = 'yyb'
let age = '12'

setTimeout(() => {
  name = 'yao'
}, 2000)
export {
  name, age
}
