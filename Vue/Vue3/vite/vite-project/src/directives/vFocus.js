import { nextTick } from 'vue'
export default {
  // 绑定属性之前
  created: (el, binding) => { },
  // 元素插入dom之前调用
  beforeMount(el, binding) {
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
