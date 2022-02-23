<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import HelloWorld from 'comp/HelloWorld.vue'
import Basic from 'page/basic/BasicPage.vue'
</script>

<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <div id="container">
    <HelloWorld class="left" />
    <HelloWorld />
    <Basic class="right" />
  </div>
</template>

<style lang="scss">
#container {
  display: flex;
  .left,
  .right {
    width: 50%;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h2 {
  color: rgb(153, 106, 106);
}
</style>
