## JSON.parse

`JSON.parse` 方法用来解析 `JSON` 字符串，接收两个参数：第一个参数是需要解析处理的 `JSON` 字符串，第二个可选参数提供可选的 `reviver` 函数，接收 `Key，value` 作为参数。

```js
let c = JSON.parse('{"p": 5}', (k, v) => {
  if (k === '') return v
  return v * 2
})
console.log(c); // { p: 10 }
```

