const arr = [1, 2, 3, 3, 2, 1, 1, 4, 4, 4, 5, 5, 6, 7, 1, 4, 6, 7, 3, 6, 8, 9, 8]
// const arr = [1, 1, 1, 2, 2, 2, 1, 1]
// 找出3次的集合
let obj = {}
let total = 0
arr.forEach((item) => {
  if (!obj[item]) {
    obj[item] = 1
  } else {
    obj[item]++
    if (obj[item] === 3) {
      total += item
    }
    console.log(obj, '>>>')
    if (obj[item] === 4) {
      console.log(total, 'total')
      total -= item
    }
  }
})
console.log(obj)
console.log(total)
/* Object.keys(obj).forEach((item) => {
  if (obj[item] === 3) {
    list.push(item)
  }
})
console.log(list) */
