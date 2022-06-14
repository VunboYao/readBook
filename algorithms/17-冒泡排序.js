let arr = [2, 9, 33, 56, 12, 32, 15, 11, 100, 87, 45]

// 1.API 默认
let sortFun = arr.sort((a, b) => a - b)
// console.log(sortFun);

// 2.冒泡
// 复杂度： O(n^2)
function bubbleSort(arr) {
  // 每一个和右边的比较，如果大则交换位置，否则不动
  let len = arr.length - 1
  for (let i = 0; i < len; i++) {
    // 最终只需要比对到倒数第二个
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // let temp = arr[j]
        // arr[j] = arr[j + 1]
        // arr[j + 1] = temp
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
console.log(bubbleSort(arr));
