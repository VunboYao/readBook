<script setup>
import BasicPage from './pages/basic/BasicPage.vue'
import HelloWorld from './components/HelloWorld.vue'

import { reactive, ref, watch } from 'vue';
let postFontSize = ref(1)

function changeFont(font) {
  postFontSize.value += font
}
const age = ref(123)
setInterval(() => {
  age.value+=1
},1000)
watch(postFontSize, (newVal, oldVal) => {
  styleContainer.fontSize = newVal + 'em'
})
let styleContainer = reactive({
  fontSize: postFontSize.value + 'em'
})
function show() {
}
</script>

<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <div
    id="container"
    :style="styleContainer"
  >
    <HelloWorld
      class="left"
      title="Hello cold"
      name="yyb"
      :disabled="false"
      :age="age"
      @enlarge="changeFont"
      @click="show"
    />
    <BasicPage class="right" />
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
