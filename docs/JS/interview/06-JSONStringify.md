## JSON.parse

`JSON.parse` 方法用来解析 `JSON` 字符串，接收两个参数：第一个参数是需要解析处理的 `JSON` 字符串，第二个可选参数提供可选的 `reviver` 函数，接收 `Key，value` 作为参数。

```js
let c = JSON.parse('{"p": 5}', (k, v) => {
  if (k === '') return v
  return v * 2
})
console.log(c); // { p: 10 }
```

## JSON.stringify

`JSON.stringify` 方法是将一个 `JavaScript` 对象或值转换为 `JSON`字符串，默认该方法其实有三个参数：第一个参数是必选，后面两个是可选参数非必选。第一个参数传入的是要转换的对象；第二个是一个 `replacer` 函数，比如指定的 `replacer` 是数组，则可选择性地仅处理包含数组指定的属性；第三个参数用来控制结果字符串里面的间距

```js
JSON.stringify({ x: 1, y: 2 });
// "{"x":1,"y":2}"
JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] })
// "{"x":[10,null,null,null]}"

// 第二个参数
function replacer(key, value) {
  if (typeof value === 'string') {
    return undefined
  }
  return value
}

let foo = { foundation: 'Mozilla', model: 'box', week: 4, transport: 'car', month: 7 }
let jsonString = JSON.stringify(foo, replacer)
console.log(jsonString); // {"week":4,"month":7}

// 第三个参数
let c = JSON.stringify({ a: 2 }, null, ' ')
console.log(c);
/*
{
 "a": 2
}
*/
let c2 = JSON.stringify({ a: 2 }, null, '')
console.log(c2) // {"a":2}
```

![JSON.stringify](.\stringify.png)

## 代码实现

```JS
function jsonStringify(data) {
  let type = typeof data
  if (type !== 'object') {
    let result = data
    //data 可能是基础数据类型的情况在这里处理
    if (Number.isNaN(data) || data === Infinity) {
      //NaN 和 Infinity 序列化返回 "null"
      result = 'null'
    } else if (type === 'function' || type === 'undefined' || type === 'symbol') {
      // 由于 function 序列化返回 undefined，因此和 undefined、symbol 一起处理
      return undefined
    } else if (type === 'string') {
      result = '"' + data + '"'
    }
    return String(result)
  } else if (type === 'object') {
    if (data === null) {
      return 'null'
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      return jsonStringify(data.toJSON())
    } else if (data instanceof Array) {
      let result = []
      //如果是数组，那么数组里面的每一项类型又有可能是多样的
      data.forEach((item, index) => {
        if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
          result[item] = 'null'
        } else {
          result[index] = jsonStringify(item)
        }
      })
      result = '[' + result + ']'
      return result.replace(/'/g, '"')
    } else if (data instanceof RegExp) {
      // 正则类型判断
      return "{}"
    } else {
      // 处理普通对象
      let result = []
      console.log(Object.keys(data))
      Object.keys(data).forEach((item, index) => {
        if (typeof item !== 'symbol') {
          //key 如果是 symbol 对象，忽略
          if (data[item] !== undefined && typeof data[item] !== 'function' && typeof data[item] !== 'symbol') {
            //键值如果是 undefined、function、symbol 为属性值，忽略
            result.push('"' + item + '"' + ':' + jsonStringify(data[item]))
          }
        }
      })
      return ('{' + result + '}').replace(/'/g, '"')
    }
  }
}
```

**注意点：**

- 由于 `function` 返回 `'null'`, 并且 `typeof function` 能直接返回精确的判断，所以在整体逻辑处理基础数据类型的时候， 会随着 `undefined`, `symbol` 直接处理

-  `typeof null` 的时候返回`'object'`，故 `null`的判断逻辑整体在处理引用数据类型的逻辑里面
- 关于引用数据类型中的数组，由于数组的每一项的数据类型又有很多的可能性，故在处理数组过程中又将 `undefined，symbol，function` 作为数组其中一项的情况做了特殊处理

- 同样在最后处理普通对象的时候，key （键值）也存在和数组一样的问题，故又需要再针对上面这几种情况`（undefined，symbol，function）`做特殊处理

- **循环引用未做处理**

```JS
let obj = {
    name: 'jack',
    age: 18,
    attr: ['coding', 123],
    date: new Date(),
    uni: Symbol(2),
    sayHi: function() {
        console.log("hi")
    },
    info: {
        sister: 'lily',
        age: 16,
        regexp: /1/,
        intro: {
            money: undefined,
            job: null
        }
    }
}
console.log(jsonStringify(obj) === JSON.stringify(obj)); // true
```

