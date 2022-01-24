<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <router-link to="/home" active-class="coder-yyb">Home</router-link>|
    <router-link to="/about" active-class="coder-yyb">About</router-link>
  </div>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.coder-yyb {
  color: blue;
}
</style>
