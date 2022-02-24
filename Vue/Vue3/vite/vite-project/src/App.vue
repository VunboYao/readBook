<script setup>
import BasicPage from './pages/basic/BasicPage.vue'
import HelloWorld from './components/HelloWorld.vue'
import SlotButton from './components/SlotButton.vue';
import { reactive, ref, unref, watch, provide, onMounted } from 'vue';
import {useMouse} from './hooks';
import {vFocus} from '@direct'
const input = ref(0)

</script>

<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <input
    v-model="input"
    v-focus="input"
    type="text"
  >
  <h2>{{ $translate('greetings.hello') }}</h2>
  <div id="container">
    <HelloWorld class="left" />
    <BasicPage class="right" />
    <!-- <SlotButton class="right">
      <template #header="{text}">
        {{ text }}
      </template>
      <template #default="slotProp">
        {{ slotProp.text }}
      </template>
      <template #footer="{text}">
        {{ text }}
      </template>
    </SlotButton> -->
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
