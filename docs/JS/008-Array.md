## 创建数组

- `new Array()` 同 `Array()`
  - **如果传入的是数值，则会创建一个长度为制定数值的数组**
- 数组字面量。**与对象一样，在使用数组字面量表示法创建数组不会调用 Array 构造函数**

## 数组空位

  ES6 新增的方法和迭代器与早期 ECMAScript 版本中存在的方法行为不同。ES6 新增方法普遍将这些空位当成存在的元素，只不过值为 undefined
  ES6 之前的方法则会忽略这个空位，但具体的行为也会因方法而异：

- `map()` 会跳过空位置
- `join()` 视空位置为空字符串

    ```js
    const nameArr = [1, , , 3]
    let a = nameArr.join('-')
    console.log(a)
    ```

## 检测数组

- `value instanceof Array`
- `Array.isArray(value)`
- `Object.prototype.toString.call([]) // "[object Array]"`

## 数组特性

- 如果设置的索引超过数组最大的索引，则**数组会自动扩展到该索引值加1**
- 通过修改`length`属性，可以从数组末尾删除或添加元素
- 如果将 length 设置为大于数组元素数的值，则新添加的元素都将以 `undefined` 填充

## 转换方法

- `valueOf()`, 返回数组本身
- `toString()`, 返回数组中每个值得等效字符串拼接而成的一个逗号分隔的字符串
- `toLocaleString()`
  - 可能返回跟 `toString()` 和 `valueOf()` 相同的结果，但也不一定
  - 为了得到最终的字符串，会调用数组每个值的 `toLocaleString()` 方法
- `join()`，不传入任何参数，或者`undefined`, 则仍然使用逗号作为分隔符
- **如果数组中某一项是 `null` 或 `undefined` ，则在 `join() 、 toLocaleString() 、toString()` 和 `valueOf()` 返回的结果中会以空字符串表示。**

## 数组方法

|      操作类型       |             执行方法              |                  返回值                   | **是否改变原数组** |
| :-----------------: | :-------------------------------: | :---------------------------------------: | :----------------: |
|        推入         |               push                |            **数组的最新长度**             |         是         |
|        弹出         |                pop                |              返回被删除的项               |         是         |
|   删除数组第一项    |               shift               |              返回被删除的项               |         是         |
| 数组开头添加任意值  |              unshift              |            **数组的最新长度**             |         是         |
|      反向排列       |              reverse              |         返回调用它们的数组的引用          |         是         |
|      排序方法       |               sort                |         返回调用它们的数组的引用          |         是         |
|        拼接         |              concat               |                  新数组                   |       **否**       |
|      截取数组       |               slice               |                  新数组                   |       **否**       |
|        删除         |    splice(deleteIndex, number)    |               被删除的元素                |         是         |
|        插入         |  splice(start, 0, value1,value2)  |               被删除的元素                |         是         |
|        替换         | splice(start, delnum, insertVals) |               被删除的元素                |         是         |
|      正向查找       |              indexOf              |               元素的位置/-1               |       **否**       |
|      反向查找       |            lastIndexOf            |               元素的位置/-1               |       **否**       |
| 正向包含查找**ES7** |             includes              |                  布尔值                   |       **否**       |
|      查找元素       |               find                |             第一个匹配的元素              |       **否**       |
|   查早元素的索引    |             findIndex             |           第一个匹配元素的索引            |       **否**       |
| 遍历每一项满足条件  |               every               |      每一项返回 `true`，则返回`true`      |       **否**       |
|      过滤数组       |              filter               |    函数返回`true`的项组成的**新数组**     |       **否**       |
|  加工数组中的对象   |              forEach              |                 无返回值                  |       **否**       |
|    数据映射加工     |                map                |                  新数组                   |       **否**       |
|   某一项满足条件    |               some                | 有一项函数返回 true ，则这个方法返回 true |       **否**       |
|     归并、求和      |              reduce               |                    和                     |       **否**       |
|      反向归并       |            reduceRight            |                    和                     |       **否**       |

## ES6新增方法

- `from()`, 将类数组结构转换为数组实例

    ```js
    const nameArr = Array.from('yao')
    console.log(nameArr); // [ 'y', 'a', 'o' ]
    ```
  - 可接收第二个可选的映射函数参数，执行类似`map()`操作。还可接收第三个参数，用于指定映射函数中的`this`的值（箭头函数中不适用）。

    ```js
    const nameArr = Array.from(
      [1, 2, 3],
      function (params) {
        return params * this.init
      },
      { init: 2 }
    )
    console.log(nameArr) // [ 2, 4, 6 ]
    ```

- `of()`, 将一组参数转换为数组实例.

  - 这个方法用于替代在ES6之前常用的`Array.prototype.slice.call(arguments)`

- `keys()`, 返回数组索引的迭代器。可通过 `Array.from()`直接转换为数组实例

- `values()`, 返回数组元素的迭代器。可通过 `Array.from()`直接转换为数组实例

- `entries()`, 返回索引/值对的迭代器。可通过 `Array.from()`直接转换为数组实例

- `fill(value, [start], [end])`, 向数组中插入全部或部分相同的值。
  - 开始索引用于指定开始填充的位置。可选。如果不提供结束索引，则一直填充到数组末尾

  - 负值索引从数组末尾开始计算; 也可以将负索引想象成数组长度加上它得到的一个正索引

  - ```JS
      const arr = [1,2,3,4,5]
      const arr2 = arr.fill(3, 0, 3) // [ 3, 3, 3, 4, 5 ]
      ```

  - `array.fill(value, start?:number, end?:number)`

- `copyWithin()`, 按照指定范围浅复制数组中的部分内容, 插入到指定索引开始的位置

  - ```JS
        const array = [1,2,3,4,5]
        const array2 = array.copyWithin(0, 3)
        console.log(array2); // [ 4, 5, 3, 4, 5 ]
        ```

  - `array.copyWithin(target, startIndex, [endIndex])`
