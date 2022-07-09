<template>
  <div>
    <p class="text">{{ id }}>>>>>>>I am test>>>>>>>></p>
    <p>i am new</p>
  </div>
</template>

<script>
export default {
  name: 'Common',
  props: ['id']
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  color: #fff;
  background: goldenrod;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  color: red;
}
</style>
