<script lang="ts" setup>
const number = reactive([1, 2, 3, 4, 5])
const handlePush = () => {
  number.push(6)
}
const handleUnshift = () => {
  number.unshift(number[0])
}
onBeforeUpdate(() => {
})
</script>

<template>
  <ul>
    <li
      v-for="item in number"
      :key="item"
    >
      <input type="text"><span>{{ item }}</span>
    </li>
  </ul>
  <el-button @click="handlePush">
    Push
  </el-button>
  <el-button @click="handleUnshift">
    unshift
  </el-button>
</template>

<style scoped lang="less">
</style>
