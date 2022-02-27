export default {
  // 绑定属性之前
  created: (el, binding) => { },
  // 元素插入dom之前调用
  beforeMount(el, binding) {
    console.log('自定义指令即将挂载', binding.value)
    el.dataset.oldValue = binding.value
  },
  // 元素挂载之后
  mounted: el => {
    el.focus()
  },
  beforeUpdate(el, binding) { },
  updated(el, binding) { },
  beforeUnmount() { },
  unmounted() { }
}
