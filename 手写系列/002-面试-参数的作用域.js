var x = 0

// 当函数的参数有默认值时，会形成一个新的作用域。这个作用域用于保存参数的值
function foo(x, y = function () {
  x = 3;
  console.log(x)
}) {
  console.log(x) // 此时取参数中的x。默认undefined
  var x = 2
  y() // 参数的作用域，x赋值为3
  console.log(x) // 取函数内的变量x
}

foo()
console.log(x) // 取最外层变量

