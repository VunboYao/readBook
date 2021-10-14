<template>
  <el-button
    v-bind="$attrs"
    v-on="$listeners"
  >ShowButton</el-button>
</template>

<script>
export default {
  name: 'ComponTest',
  props: {
    foo: String
  },
  data() {
    return {
      demo: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('select-click', '5552')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
