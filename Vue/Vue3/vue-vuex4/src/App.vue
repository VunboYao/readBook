<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld />
  <Mutations/>
</template>

<script>
import HelloWorld from './components/03-mapState_useState'
import Mutations from './components/04-mutations'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Mutations
  },
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
