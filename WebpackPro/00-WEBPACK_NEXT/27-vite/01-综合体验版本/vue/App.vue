<template>
  <h1>{{msg}}</h1>
</template>

<script>
import {ref} from 'vue';
export default {
  setup() {
    const msg = ref('Hello Vue3')
    return {
      msg 
    }
  }
}
</script>

<style scoped>
h1 {
  color: chocolate;
}
</style>
