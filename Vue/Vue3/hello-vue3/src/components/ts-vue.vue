<template>
  <div>
    Hello TS-Vue
    {{ count.toFixed(2) }}
  </div>
</template>

<script lang="ts">
// TS推导组件内的类型
import { defineComponent, ref } from "vue"
export default defineComponent({
  props: {
    name: { type: String, default: 'Hello' },
    msg: { type: Boolean, required: true },
  },
  setup(props) {
    let count = ref(12)
    return {
      count,
    }
  },
  created() {
    console.log(this.name)
  },
})
</script>

<style lang="scss" scoped>

</style>
