<template>
  <div v-if="show">
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
name: 'Loading',
data() {
  return {
    msg: 'loading...',
    show: false
  }
}
}
</script>

<style scoped>
div {
  position: absolute;
  top: 0;
  left: 0;
  height: 90%;
  width: 100%;
  background: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
