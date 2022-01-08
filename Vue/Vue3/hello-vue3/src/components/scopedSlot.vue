<template>
  <ul>
    <li v-for="(item,index) in items" :key="index">
      <slot :item="item" :another-data="index"></slot>
      <slot name="other" :content="innerData"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "scoped",
  data() {
    return {
      innerData: 'Hello VueSlot',
      items: ['Feed a cat', 'Buy milk']
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
