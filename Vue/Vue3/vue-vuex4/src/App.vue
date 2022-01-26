<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <cus-com v-model:title.capitalize="reverseTitle.name" />
  <h2>reverse: {{reverseTitle.name}}</h2>
  <h2>{{age}}</h2>
  <button @click="change">change</button>
  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld3.vue'
import CusCom from './components/customCom.vue'
import { reactive, ref, toRef } from 'vue';


export default {
  name: 'App',
  components: {
    HelloWorld,
    CusCom
  },
  setup() {
    const reverseTitle = ref({name: 'some'})
    const state = reactive({
      name: 'why',
      age: 18
    })
    let age = toRef(state, 'age')
    const change = () => {
      state.age = 22
      // age.value = 'Hello'
    }
    return {
      age,
      change,
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
