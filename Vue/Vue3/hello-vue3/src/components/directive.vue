<template>
  <!--    <input type="text" ref="input">-->
  <input
    ref="input"
    v-yyb.lazy="'hello'"
    type="text"
  >
  <h2 v-formatTime="'YYYY/MM/DD'">
    {{ timestamp }}
  </h2>
</template>

<script>
// import {onMounted, ref} from "vue"
import { getCurrentInstance } from "vue"
import dayjs from 'dayjs'
import { onMounted } from "vue"
export default {
  name: "Directive",
  directives: {
    yyb: {
      mounted(el, binding) {
        console.log(el, binding)
        console.log(binding.modifiers)
      },
    },
    formatTime: (el, binding) => {
      console.log('directive mounted=>>>>>>>>>>>>>>>>>')
      let value = parseInt(el.textContent)
      if (el.textContent.length === 10) {
        value = value * 1000
      }
      let flag = binding.value
      if (!flag) {
        el.textContent = dayjs(value).format('YYYY-MM-DD')
      } else {
        el.textContent = dayjs(value).format(flag)
      }
    },
  },
  setup() {
    onMounted(() => {
      const instance = getCurrentInstance()
      console.log(instance.appContext.config.globalProperties)
      console.log('parent mounted>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    })
    const timestamp = 1624452193
    return {
      timestamp,
    }
  },
  /*setup() {
    const input = ref(null)
    onMounted(() => {
      input.value.focus()
    })
    return {
      input
    }
  }*/
}
</script>

<style scoped lang="scss">

</style>
