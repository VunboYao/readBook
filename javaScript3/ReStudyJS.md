# slice、substring、substr

## 参数是正数时

- 省略第二个参数，默认提取到字符串末尾
- `slice` 与 `substring` 第二个参数，表示提取结束的位置（该位置之前的会被提取出来):  `substr` 第二个参数表示返回的字符数

## 参数是负数时

- `slice`，将所有负值参数都当成字符串长度加上负参数值

- `substr`，将第一个负参数当成字符串长度加上该值，将第二个负参数值转换为0
- `substring`，将所有负参数值都转换为0。**会将较小的参数作为起点**

# 手写系列

## forEach

```js
Array.prototype.myForEach = function (fn) {
  for (let i = 0; i < this.length; i++) {
    fn(this[i], i, this)
  }
}
```

## FindIndex

```js
Array.prototype.myFindIndex = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      return i
    }
    if (this.length === (i + 1)) {
      return -1
    }
  }
}

// return只能在函数体内，如果return，则中断for循环
```

## 箭头函数

- 箭头函数中的`this`, 永远属于所属作用域的this,无法通过`call/apply/bind`来修改

