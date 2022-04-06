function getValue() {
  let el = document.querySelector('input')
  console.log(el.value); // !获取当前值
  console.log(el.getAttribute('value')); // !获取初始值
  console.log(el.type); // !浏览器的默认校验为 text <input value="foo" />
}
