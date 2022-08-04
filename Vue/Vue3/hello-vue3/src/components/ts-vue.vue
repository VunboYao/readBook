<template>
  <div>
    Hello TS-Vue
    {{ count.toFixed(2) }}
  </div>
</template>

<script lang="ts">
// TS推导组件内的类型
import { defineComponent, ref } from "vue"
import type { PropType } from "vue"

interface Book {
  title: string
  author: string
  year: number
}
export default defineComponent({
  props: {
    name: { type: String, default: 'Hello' },
    msg: { type: Boolean, required: false },
    person: {
      type: Object as PropType<Book>,
      required: true,
    },
  },
  setup(props) {
    let count = ref(12)
    return {
      count,
    }
  },
  created() {
    console.log(this.name)
    console.log(this.id)
    console.log(this.person)
  },
})
</script>

<style lang="scss" scoped>
</style>
