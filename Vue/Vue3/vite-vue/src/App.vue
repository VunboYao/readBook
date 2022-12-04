<script setup lang="ts">
import { ref } from 'vue'
import { showDialog } from './components/function-call'
import axios from 'axios'

const show = () => {
  showDialog({
    title: 'HelloTSX',
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: '取消',
    cancelButtonColor: 'red',
    confirmButtonText: '确认',
    confirmButtonColor: 'blue',
    beforeClose() {
      return new Promise((resolve) => {
        console.log('beforeClose')
        resolve(true)
      })
    },
  }).then((res) => {
    console.log(res, 'come')
  })
}

const close = () => {
  console.log('close')
}
const startX = ref(0)
const moveX = ref(0)
document.addEventListener('touchstart', (e) => {
  startX.value = e.touches[0].clientX
})
document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0]
  moveX.value = touch.clientX
})
axios.post('http://localhost:8888/', {
  aa: NaN,
}, {
  headers: {
    'Hello-X': '123',
  },
}).then((res) => {
  console.log(res, '>>')
})
</script>

<template>
  <div class="main">
    <a href="https://vitejs.dev" target="_blank">
      <img
        src="/vite.svg"
        class="logo"
        alt="Vite logo"
      >
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img
        src="./assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
      >
    </a>
    <button @click="show">
      showDialog
    </button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.main {
  height: 200vh;
}

.wrap-father {
  overflow: hidden;
}
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.4);
}
</style>
