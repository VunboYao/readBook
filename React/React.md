# 注意点

## 区分js表达式与js语句(代码)

1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
   - a
   - a+b
   - demo(1)
   - arr.map()
   - Function test (){}
2.  语句（代码）
   - if（）{}
   - for（）{}
   - switch（）{}

# 组件

## 函数式组件

- this指向undefined.默认指向严格模式
- 需要 return 虚拟dom
- 注册组册时，需要首字母大写，同时自闭合