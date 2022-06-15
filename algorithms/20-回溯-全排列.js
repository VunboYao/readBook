// 全排列
// 1，2，3这三个数字，打印全部的排列情况

// [1]
// [1,2] 收集
// [1]
// [2]
// [2, 1] 收集

let arr = [1, 2]
function backtrack(list, temp, nums) {
  // 1.终止条件
  if (temp.length === nums.length) return list.push([...temp])

  for (let i = 0; i < nums.length; i++) {
    // 找到一个不在 temp 里的数字
    if (temp.includes(nums[i])) {
      continue
    }
    temp.push(nums[i])
    backtrack(list, temp, nums)
    temp.pop()
  }
}

let permute = function (nums) {
  let list = []
  backtrack(list, [], nums)
  return list
}
console.log(permute(arr));
