<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--Props模版内能够驼峰或者横线-->
    <h1>{{ title }}</h1>
    <HelloWorld
        v-model:title.capitalize="title"
        @submit="submit"
        v-bind="obj"
    />
    <TodoButton>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>

      <template v-slot:footer>
        <h1>Here's some contact info</h1>
      </template>

      <template v-slot:default>
        <p>A paragraph for the main content</p>
      </template>
    </TodoButton>
    <!--默认插槽作用域的缩写-->
    <ScopedSlot v-slot="{item, anotherData: index}">
      <h2>{{ item }}-{{ index + 1 }}</h2>
    </ScopedSlot>
    <!--多作用域插槽的使用需要明确template-->
    <ScopedSlot>
      <template v-slot="{item, anotherData: index}">
        <h2>{{ item }}-{{ index + 1 }}</h2>
      </template>
      <template v-slot:other="{content, item ='placeholder'}">
        <h1>{{ content }}</h1>
        <h2>i am {{ item }}</h2>
      </template>
    </ScopedSlot>
    <!--动态插槽-->
    <TodoButton>
      <template v-slot:[dynamicSlotName]>
        <h1>Here might be a page title</h1>
      </template>
    </TodoButton>
    <!--插槽简写-->
    <TodoButton>
      <template #header>
        <h1>Here might be a page title</h1>
      </template>

      <template #footer>
        <h1>Here's some contact info</h1>
      </template>

      <template v-slot:default>
        <p>A paragraph for the main content</p>
      </template>
    </TodoButton>
    <ScopedSlot #default="{item}">
      <h2>{{ item }}</h2>
    </ScopedSlot>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TodoButton from './components/slot'
import ScopedSlot from "@/components/scopedSlot"

export default {
  name: 'App',
  components: {
    HelloWorld,
    TodoButton,
    ScopedSlot
  },
  data() {
    return {
      title: 'Hello Vue3',
      obj: {
        name: 'yyb',
        age: 20
      }
    }
  },
  created() {
    console.log(this.dynamicSlotName)
  },
  computed: {
    dynamicSlotName() {
      return Math.random() * 10 > 5 ? 'header' : 'footer'
    }
  },
  methods: {
    submit(payload) {
      console.log(payload)
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
