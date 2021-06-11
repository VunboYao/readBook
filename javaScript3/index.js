{
  let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
  function bubbleSort(array) {
    const len = array.length
    if (len < 2) return array
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < i; j++) {
        if (array[j] > array[i]) {
          const temp = array[j]
          array[j] = array[i]
          array[i] = temp
        }
      }
    }
    return array
  }
  bubbleSort(a)
}

{
  let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
  function quickSort(array) {
    let quick = function (arr) {
      if (arr.length <= 1) return arr
      const index = Math.floor(len >> 1)
    }
  }
}


