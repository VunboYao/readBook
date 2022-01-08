<template>
<div class="container">
  <header style="color: blue">
    <slot name="header"></slot>
  </header>
  <main style="color: orange">
    <slot></slot>
  </main>
  <footer style="color: brown">
    <slot name="footer"></slot>
  </footer>
</div>
</template>

<script>
export default {
  name: "slot",
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
