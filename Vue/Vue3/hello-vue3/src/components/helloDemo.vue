<!--<template>
<div>HEllo DEMO</div>
</template>-->

<script>
import {h} from 'vue'
export default {
  name: "helloDemo",
  data() {
    return {}
  },
  render() {
    return h('div', null, [
        h('h2', null, 'hello demo'),
        this.$slots.default ? this.$slots.default('123123'): h('span', null, '我是默认的')
    ])
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
