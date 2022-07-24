<template>
  <ul>
    <li v-for="(item,index) in items" :key="index">
      <slot :item="item" :another-data="index" />
      <slot name="other" :content="innerData" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "Scoped",
  data() {
    return {
      innerData: 'Hello VueSlot',
      items: ['Feed a cat', 'Buy milk'],
    }
  },
  methods: {},
}
</script>

<style scoped lang="scss">

</style>
