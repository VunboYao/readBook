<template>
<div v-if="visible">
    <h2
        style="margin: 20px;"
        v-for="(item, index) in originData"
        :key="index"
        @click="toggleSelect(item, index)"
    >{{item}}</h2>
  <el-button @click="confirm">handleConfirm</el-button>
</div>
</template>

<script>
  export default {
    name: 'FilterData',
    data() {
      return {
        visible: false,
        originData: [],
        nowData: []
      }
    },
    methods: {
      confirm() {
        this.nowData = this.originData.filter(item => {
          return item.checked
        })
        this.resolve(this.nowData)
        this.close()
      },
      toggleSelect(item) {
        item.checked = !item.checked
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
