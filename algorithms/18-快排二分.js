let arr = [2, 9, 33, 56, 12, 32, 15, 11, 100, 87, 45]

// 二分
// O(n * log(n))
function quickSort(arr) {
  let len = arr.length
  // 终止条件
  if (len < 2) {
    return arr
  }
  let flag = arr[0]
  let left = []
  let right = []
  for (let i = 1; i < len; i++) {
    if (arr[i] > flag) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  // 递归比对
  return quickSort(left).concat(flag, quickSort(right))
}
// console.log(quickSort(arr));

// 原地快排
function quick1(arr, start, end) {
  let init = start
  let flag = arr[init]
  start++
  while (start <= end) {
    // 判断右边比flag大
    while (arr[end] > flag) {
      end--
    }
    // 左边比flag小
    while (arr[start] < flag) {
      start++
    }
    if (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]]
      start++
      end--
    }
  }
  console.log(init, start, end);
  [arr[init], arr[start - 1]] = [arr[start - 1], arr[init]]
  return start
}
function quickSort1(arr, start, end) {
  if (start < end) {
    let index = quick1(arr, start, end) // 标识位的值
    console.log(index);
    quickSort1(arr, start, index - 1)
    quickSort1(arr, index, end)
  }
  return arr
}

console.log('原地快排', quickSort1(arr, 0, arr.length - 1));
