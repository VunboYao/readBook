<script setup>
import { useAttrs, watchEffect, ref, reactive, onBeforeMount,onMounted, computed } from 'vue'

defineProps(['title'])
defineEmits(['enlarge'])
const count = ref(0)
let arrts = useAttrs()
function add() {
  console.log(arrts);
  count.value++
}
</script>
<script>
  export default {
    inheritAttrs: true
  }
</script>
<template>
  <div>
    <h1>setup</h1>
    <el-button
      v-bind="$attrs"
      @click="add"
    >
      Add-{{ count }}
    </el-button>
    <h2>{{ title }}</h2>
    <el-button @click="$emit('enlarge', 0.1)">
      enlarge
    </el-button>
    <span>{{ $attrs }}</span>
  </div>
</template>
<style scoped></style>
