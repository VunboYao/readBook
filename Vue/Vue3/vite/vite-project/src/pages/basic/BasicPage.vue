<template>
  <div>
    <h1>origin</h1>
    {{ obj.foo }}
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  setup(props) {
    const obj = { foo: ref(12) }
    return {
      obj
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
