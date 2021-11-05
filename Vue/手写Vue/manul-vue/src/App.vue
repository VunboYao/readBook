<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/about/info">AboutInfo</router-link>
    </div>
    <p @click="$store.commit('add')">{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async{{$store.state.counter}}</p>
    <p>double: {{$store.getters.doubleState}}</p>
    <button @click="getValue">getValue</button>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    getValue() {
      console.log(this.$store.getters.doubleState)
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
