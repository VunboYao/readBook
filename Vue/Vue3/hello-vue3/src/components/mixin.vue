<template>
  <h1>Mixin</h1>
  <div>{{ msg }}</div>
  <div>{{ msg2 }}</div>
</template>

<script>
import mixin from "@/components/demoMixin"

export default {
  name: "Mixin",
  mixins: [mixin],
  data() {
    return {
      msg: '123',
    }
  },
  methods: {},
}
</script>

<style scoped lang="scss">

</style>
