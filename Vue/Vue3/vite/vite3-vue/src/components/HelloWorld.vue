<script setup lang="ts">
import { ref } from 'vue'
import CustomDiv from './CustomDiv.vue';
const vLimit = {
  mounted: (el, binding) => {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        let timer = setTimeout(() => {
          el.disabled = false
          clearTimeout(timer)
        }, 2000);
      }
    })
  }
}

const customDivClick = (demo, $event) => {
  console.log('自定义点击top', demo, $event);
}
const show = () => {
  console.log('you clicked button!!!');
}

const originClick = () => {
  console.log('原生点击');
}

const innerClick = () => {
  console.log('自定义点击, middle');
}
</script>

<template>
<CustomDiv @click="originClick" class="top" @my-click="customDivClick('用户传入的参数', $event)">
    <h1>Top</h1>
    <CustomDiv @myClick="innerClick" class="inner">
      <h2>middle</h2>
    </CustomDiv>
    <button @click="show" v-limit>Button</button>
</CustomDiv>
</template>

<style scoped>
button:hover,button:active {
  border: none;
}
div {
  user-select: none;
}

.top {
  width: 500px;
  height: 500px;
  background-color: skyblue;
}
.inner {
  width: 200px;
  height: 200px;
  background-color: slateblue;
}
</style>
