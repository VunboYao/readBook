<template>
  <h2>Home</h2>
  <hr>
  <router-link to="/home/msg">Message</router-link>|
  <router-link to="/home/product">Product</router-link>
  <router-view></router-view>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {}
}
</script>

<style scoped>
.router-link-active {
  color: #d21321;
}
</style>
