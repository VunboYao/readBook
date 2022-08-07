// 测试数据1
const testData1 = {
  a: 1,
  b: {
    c: 'test',
  },
}
// 期望结果1
// {
//   "a": "number",
//   "b": "object",
//   "b.c": "string"
// }

// 测试数据2
const testData2 = {
  x: {
    x1: 'aa',
    x2: [11, 22],
    x3: {
      m: {
        n: 123,
      },
    },
  },
  y: [
    {
      p: 1,
      q: 'aa',
    },
    {
      p: 3,
      q: 'bb',
    },
  ],
  z: true,
}
// 期望结果2
// {
//   "x": "object",
//   "x.x1": "string",
//   "x.x2": "array",
//   "x.x3": "object",
//   "x.x3.m": "object",
//   "x.x3.m.n": "number",
//   "y": "array",
//   "y.p": "number",
//   "y.q": "string",
//   "z": "boolean"
// }

// 答题区，可自行调整
/* const isType = (obj, type = '') => Object.prototype.toString.call(obj) === `[object ${type}]` */
function getType(obj) {
  const type = typeof obj
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, (match, t) => {
    return t.toLowerCase()
  })
}

function solution(target, parentKey = '', obj = {}) {
  let arr = Object.entries(target)
  arr.forEach(item => {
    let key = item[0]
    let value = item[1]
    let type = getType(value)
    let keyValue = parentKey ? `${parentKey}.${key}` : key
    obj[keyValue] = type
    if (type === 'object') {
      solution(value, keyValue, obj)
    }
    if (type === 'array') {
      value.forEach(item => solution(item, keyValue, obj))
    }
  })
  return obj
}


console.log('----------------- result1 -----------------')
result1 = solution(testData1)
console.log(result1)

console.log('----------------- result2 -----------------')
result2 = solution(testData2)
console.log(result2)

