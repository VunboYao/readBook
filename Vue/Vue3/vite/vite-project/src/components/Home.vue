<template>
  <div>
    <h2>Home</h2>
    <el-button @click="patchOne">
      $patch
    </el-button>
  </div>
</template>

<script setup>
import { useStore } from '../stores/userInfo'
let store = useStore()
const patchOne = () => {
  store.$patch(state => {
    state.name='vunbo'
    state.count = 10
    state.age = 20
  })
}
</script>

<style lang="scss" scoped>

</style>
