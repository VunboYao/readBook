<template>
  <div class="container">
    <header style="color: blue">
      <slot name="header" />
    </header>
    <main style="color: orange">
      <slot />
    </main>
    <footer style="color: brown">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: "SlotDemo",
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">

</style>
