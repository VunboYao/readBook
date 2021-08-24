<template>
  <el-input
    v-bind="$attrs"
    v-on="$subListeners"
  />
</template>

<script>
export default {
  name: 'CounterFraud',
  inheritAttrs: false,
  computed: {
    $subListeners() {
      const vm = this
      return Object.assign({},
        this.$listeners,
        {
          change: function(ev) {
            console.log(`自定义事件=>`, ev)
            vm.$emit('change', ev)
          }
        }
      )
    }
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>

</style>
