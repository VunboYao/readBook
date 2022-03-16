<template>
  <div>
    <HelloWorld :msg="msg" />
    <input
      v-model="msg"
      v-focus="msg"
    >
  </div>
</template>

<script setup>
let msg = ref('Hello Vue3')
</script>

<style lang="scss" scoped>

</style>
