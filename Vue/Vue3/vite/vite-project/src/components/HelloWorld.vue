<script setup>
import { watchEffect, ref, reactive, onBeforeMount,onMounted, computed } from 'vue'

const count = ref(0)
function add() {
  count.value++
}
</script>

<template>
  <div>
    <h1>setup</h1>
    <el-button @click="add">
      Add-{{ count }}
    </el-button>
  </div>
</template>
<style scoped></style>
