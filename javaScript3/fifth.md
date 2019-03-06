# 第20章 JSON

一种数据格式，不是一种编程语言。

## 语法

**JSON的语法可以表示以下三种类型的值**：
- 简单值：使用与 JavaScript 相同的语法，可以在 JSON 中表示字符串、数值、布尔值和 null 。但 JSON 不支持 JavaScript 中的特殊值 undefined 。
- 对象：对象作为一种复杂数据类型，表示的是一组无序的键值对儿。而每个键值对儿中的值可以是简单值，也可以是复杂数据类型的值。
- 数组：数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值也可以是任意类型——简单值、对象或数组。

### 简单值

JavaScript 字符串与 JSON 字符串的最大区别在于，JSON 字符串必须使用双引号（单引号会导致语法错误）。布尔值和 null 也是有效的 JSON 形式。

### 对象

- 对象的属性必须加双引号，这在 JSON 中是必需的。属性的值可以是简单值，也可以是复杂类型值
- 没有声明变量和末尾的分号

### 数组

- JSON 数组也没有变量和分号

### JSON对象

- stringify()，把 JavaScript 对象序列化为JSON字符串。
- parse()，把JSON字符串解析为原生JavaScript值。

```
let book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C.Za'
    ],
    edition: 3,
    year: 2011
};
let jsonText = JSON.stringify(book);

这个例子使用 JSON.stringify() 把一个 JavaScript 对象序列化为一个 JSON 字符串，然后将它保
存在变量 jsonText 中。默认情况下， JSON.stringify() 输出的 JSON 字符串不包含任何空格字符或
缩进，因此保存在 jsonText 中的字符串如下所示

// {"title":"Professional JavaScript","authors":["Nicholas C. Za"],"edition":3,"year":2011}


将 JSON 字符串直接传递给 JSON.parse() 就可以得到相应的 JavaScript 值。例如，使用下列代码
就可以创建与 book 类似的对象

let bookCopy = JSON.parse(jsonText);

注意，虽然 book 与 bookCopy 具有相同的属性，但它们是两个独立的、没有任何关系的对象。
```

> **在序列化 JavaScript 对象时，所有函数及原型成员都会被有意忽略，不体现在结果中。此外，值为 undefined 的任何属性也都会被跳过。结果中最终都是值为有效 JSON 数据类型的实例属性**

> **如果传给 JSON.parse() 的字符串不是有效的 JSON，该方法会抛出错误。**

### 序列化选项

 JSON.stringify() 除了要序列化的 JavaScript 对象外，还可以接收另外两个参数，这两个参数用于指定以不同的方式序列化 JavaScript 对象。第一个参数是个过滤器，可以是一个数组，也可以是一个函数；第二个参数是一个选项，表示是否在 JSON 字符串中保留缩进。单独或组合使用这两个参数，可以更全面深入地控制 JSON 的序列化。

1. **过滤结果**
- 如果过滤器参数是数组，那么 JSON.stringify() 的结果中将只包含数组中列出的属性。
- 如果第二个参数是函数，行为稍有不同。传入的函数接收两个参数，属性名和属性值。属性名只能是字符串，而在值并非键值对儿的值时，键名可以是空字符串。**如果函数返回了 undefined，那么相应的属性会被忽略。**

```
let book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C. Za'
    ],
    edition: 3,
    year: 2011
};

let jsonText = JSON.stringify(book,function (key, value) {
  switch (key) {
      case 'authors':
          return value.join(',')
      case 'year':
          return 5000
      case 'edition':
          return undefined;
      default:
          return value;
  }
})
console.log(jsonText); 
// {"title":"Professional JavaScript","authors":"Nicholas C. Za","year":5000} 
```

2. **字符串缩进**

JSON.stringify() 方法的第三个参数用于控制结果中的缩进和空白符。
- 如果这个参数是一个数值，那它表示的是每个级别缩进的空格数。最大缩进值10
- 如果缩进参数是一个字符串而非数值，则这个字符串将在JSON字符串中被用作缩进字符（不再使用空格）

3. **toJSON()方法**

可以给对象定义 toJSON() 方法，返回其自身的 JSON 数据格式。这个对象也将被序列化为一个简单的字符串而非对象。

```
let book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C. Za'
    ],
    edition: 3,
    year: 2011,
    toJSON: function () {
        return this.title;
    }
};
let json = JSON.stringify(book);
console.log(json); // "Professional JavaScript" 
```

toJSON() 可以作为函数过滤器的补充，因此理解序列化的内部顺序十分重要。假设把一个对象传入 JSON.stringify() ，序列化该对象的顺序如下
1. 如果存在 toJSON() 方法而且能通过它取得有效的值，则调用该方法。否则，返回对象本身。
2. 如果提供了第二个参数，应用这个函数过滤器。传入函数过滤器的值是第(1)步返回的值。
3. 对第(2)步返回的每个值进行相应的序列化
4. 如果提供了第三个参数，执行相应的格式化。








