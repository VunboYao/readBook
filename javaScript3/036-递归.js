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

function getType(obj) {
  const type = typeof obj
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, (match, t) => {
    return t.toLowerCase()
  })
}

function solution(value) {
  let obj = {}
  let recursion = (target, parentKey = '')  => {
    const keys = Object.keys(target)
    keys.forEach(k => {
      const val = target[k]
      const type = getType(val)
      if (!parentKey) {
        obj[k] = type
      } else {
        obj[`${parentKey}.${k}`] = type
      }
      if (type === 'object') {
        recursion(val, !parentKey ? k : `${parentKey}.${k}`)
      }
      if (type === 'array') {
        val.forEach(child => {
          if (typeof child === 'object') {
            recursion(child, k)
          }
        })
      }
    })
  }
  recursion(value)
  return obj
}


console.log('----------------- result1 -----------------')
result1 = solution(testData1)
console.log(result1)

console.log('----------------- result2 -----------------')
result2 = solution(testData2)
console.log(result2)

