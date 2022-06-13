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
var solution = function(param, isDeep = false, parentKey = '', obj = {}) {
  for (const key in param) {
    const value = param[key] // value
    const type = getType(value)
    if (type === 'object') {
      if (!parentKey) {
        obj[key] = type
      } else {
        obj[`${parentKey}.${key}`] = type
      }
      const parK = parentKey ? `${parentKey}.${key}` : key
      solution(value, true, parK, obj)
    } else if (type === 'array') {
      if (!parentKey) {
        obj[key] = type
      } else {
        obj[`${parentKey}.${key}`] = type
      }
      for (let i = 0; i < value.length; i++) {
        if (getType(value[i]) === 'object') {
          solution(value[i], true, `${parentKey}.${key}`, obj)
        }
      }
    } else {
      if (isDeep) {
        if (!parentKey) {
          obj[key] = type
        } else {
          obj[`${parentKey}.${key}`] = type
        }
      } else {
        if (!parentKey) {
          obj[key] = type
        } else {
          obj[`${parentKey}.${key}`] = type
        }
      }
    }
  }
  return obj
}
function getType(val) {
  const type = typeof val
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(val).replace(/\[object (\S+)]$/, (match, $1) => {
    return $1.toLowerCase()
  })
}

console.log('----------------- result1 -----------------')
result1 = solution(testData1)
console.log(result1)

console.log('----------------- result2 -----------------')
result2 = solution(testData2)
console.log(result2)
