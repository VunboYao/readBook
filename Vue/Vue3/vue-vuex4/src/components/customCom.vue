<template>
  <div class="container">
    <input
    :value="title"
    @blur="handleReverse">
  </div>
</template>

<script>
export default {
  name: 'customCom',
  props: {
    title: String,
    titleModifiers: null
  },
  created() {
    console.log(this.titleModifiers); // {capitalize: true}
  },
  emits: ['update:title'],
  methods: {
    handleReverse(e) {
      let target = e.target.value
      let value = target.split('').reverse().join('')
      if (this.titleModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:title', value)
    }
  }
}
</script>

<style scoped>
.container {
  background: #09bb0c;
}
</style>
