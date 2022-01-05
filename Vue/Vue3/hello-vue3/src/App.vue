<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!--Props模版内能够驼峰或者横线-->
  <h1>{{title}}</h1>
  <HelloWorld
      v-model:title.capitalize="title"
      @submit="submit"
  />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      title: 'Hello Vue3'
    }
  },
  methods: {
    submit(payload) {
      console.log(payload)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
