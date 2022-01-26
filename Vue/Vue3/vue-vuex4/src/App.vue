<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <cus-com v-model:title.capitalize="reverseTitle" />
  <h2>reverse: {{reverseTitle}}</h2>
  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld3.vue'
import CusCom from './components/customCom.vue'
import { ref } from 'vue';


export default {
  name: 'App',
  components: {
    HelloWorld,
    CusCom
  },
  setup() {
    const title = ref('Hello World')
    const reverseTitle = ref('some')
    return {
      title,
      reverseTitle
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
