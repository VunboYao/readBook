let arr = [1, [2, [3, 4, 5]]]
function flatten(arr) {
  let str = JSON.stringify(arr)
  str = str.replace(/(\[|\])/g, '')
  str = '[' + str + ']'
  return JSON.parse(str)
}
console.log(flatten(arr)) // [ 1, 2, 3, 4, 5 ]
// set
// find
// includes
