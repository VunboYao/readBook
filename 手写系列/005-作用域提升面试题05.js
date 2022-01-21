function foo() {
	var a = (b = 100)
	/*
  等价于： b = 100   var a  = 100
    没有var 声明的 变量，自动赋值到全局
    FEC中VO中包含 a
    全局GO中包含  b
  */
}
foo()
console.log(a)
console.log(b)
