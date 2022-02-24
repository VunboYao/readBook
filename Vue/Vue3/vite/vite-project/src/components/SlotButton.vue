
<template>
  <div>
    <header>
      <slot
        name="header"
        :text="1"
      />
    </header>
    <main>
      <slot :text="2" />
    </main>
    <footer>
      <slot
        name="footer"
        :text="3"
      />
    </footer>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
header {
  color: red;
}
main{
  color: green;
}
footer {
  color: blue
}
</style>
