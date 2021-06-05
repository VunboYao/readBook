function foo() {
  bar.apply(this, arguments)
}
function bar(a, b, c) {
  const d = Array.from(arguments)
  console.log(d);
}
foo(1, 2, 3) // 1 2 3
