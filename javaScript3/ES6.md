# 变量
- var
    - 可以重复声明
    - 无法限制修改
    - 没有块级作用域
- let: 不能重复声明, 变量可以修改,块级作用域
- const: 不能重复声明,常量不能修改,块级作用域

# 箭头函数
- 只有一个参数时括号可以省略
- 只有一个 return 时, 大括号可以省略

# 函数
- 参数扩展/数组展开  ...
- 默认参数

# 解构赋值
- 左右两边结构必须一样
- 右边必须是合法的语句
- 声明和复制不能分开(必须一句话里完成)

# 数组
- map 映射-------------一个对一个
- reduce 汇总----------一堆算出来一个
    - 参数: prev, cur, index, arr
- filter --------------过滤器
- forEach--------------迭代
- includes-------------包含
- keys/values/entries

## for/in 与 for/of

方式|数组|json    
---|---|---
for/in|下标key|key
for/of|值value|error

- for/of 专用于数组
- keys/values/entries实体

```
let arr = [123,4,23,11]
for (let i of arr.entries()) {
    console.log(i);
} 
```


# 字符串
- startsWith('http')----------以http开头
- endsWith('.txt')------------以txt结尾的
- 模板字符串   

# 面向对象
- class 关键字,构造器和类分开
- class 里面直接加方法

## 继承
- extends
- super 超类,代表父类构造函数

# JSON
- JSON 对象
    - JSON.stringify
    - JSON.parse
- 简写
    - 名字跟值( key 和 value )一样的,写一个就行
    - 方法: show: function(){...}, 写为 show(){}

# Promise
- new Promise(function(resolve, reject){})
- 一次读一堆数据请求
    
# generator 生成器

```
function *show() {
    alert('a')
    yield;
    alert('b')
}
let genObj = show(); // Generator 对象
genObj.next()
genObj.next() 
```

- 逻辑性    
    
# 新增幂
- 3**8-------3的8次方


