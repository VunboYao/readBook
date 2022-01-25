<template>
<div>Hello</div>
  <button @click="add(10)">+</button>
  <button @click="down(5)">-</button>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "Demo",
  methods: {
    ...mapMutations(['add', 'down'])
  }
}
</script>

<style scoped>

</style>
