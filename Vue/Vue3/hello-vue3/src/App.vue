<template>
  <div id="app">
    <h1>ts-Vue3.0</h1>
    <tsVue />
    <hr>
    <h1>TS_Setup3.2</h1>
    <tsSetupVue :bar="barValue" @update="onUpdate" />
    <hr>
    <Directive />
    <hr>
    <JSXDemo />
    <hr>
    <render />
    <hr>
    <SetupDemo
      :title="title2"
    />
    <hr>
    <MixinCom />
    <ExtendsHome />
    <hr>
    <!--Props模版内能够驼峰或者横线-->
    <h1>{{ title }}</h1>
    <HelloWorld
      v-bind="obj"
      @submit="submit"
    />
    <hr>
    <TodoButton>
      <template #header>
        <h1>Here might be a page title</h1>
      </template>

      <template #footer>
        <h1>Here's some contact info</h1>
      </template>

      <template #default>
        <p>A paragraph for the main content</p>
      </template>
    </TodoButton>
    <!--默认插槽作用域的缩写-->
    <ScopedSlot v-slot="{item, anotherData: index}">
      <h2>{{ item }}-{{ index + 1 }}</h2>
    </ScopedSlot>
    <!--多作用域插槽的使用需要明确template-->
    <ScopedSlot>
      <template #default="{item, anotherData: index}">
        <h2>{{ item }}-{{ index + 1 }}</h2>
      </template>
      <template #other="{content, item ='placeholder'}">
        <h1>{{ content }}</h1>
        <h2>i am {{ item }}</h2>
      </template>
    </ScopedSlot>
    <!--动态插槽-->
    <TodoButton>
      <template #[dynamicSlotName]>
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

      <template #default>
        <p>A paragraph for the main content</p>
      </template>
    </TodoButton>
    <ScopedSlot v-slot="{item}">
      <h2>{{ item }}</h2>
    </ScopedSlot>
    <hr>
    <AnimationDemo />
    <hr>
    <button @click="ChangeTitle">
      ChangeTitle
    </button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TodoButton from './components/slot'
import ScopedSlot from "@/components/scopedSlot"
import AnimationDemo from '@/components/animation.vue'
import SetupDemo from "@/components/setup"
import MixinCom from '@/components/mixin'
import home from "@/components/extends/home"
import render from "@/components/render"
import JSXDemo from "@/components/JSXDemo"
import directive from "@/components/directive"
import { ref } from 'vue'
import tsSetupVue from './components/ts-setup.vue'
import tsVue from './components/ts-vue.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    TodoButton,
    ScopedSlot,
    AnimationDemo,
    SetupDemo,
    MixinCom,
    ExtendsHome: home,
    render,
    JSXDemo,
    Directive: directive,
    tsSetupVue,
    tsVue,
  },
  provide() {
    console.log(this)
    return {
      len: this.title,
    }
  },
  setup(props) {
    const count = ref(0)
    let barValue = ref(200)
    console.log('ref, props :>> ', count, props)
    return { barValue }
  },
  data() {
    return {
      title2: 'Hello Vue3 CompositionAPI',
      title: 'hello',
      obj: {
        name: 'yyb',
        age: 20,
      },
    }
  },
  computed: {
    dynamicSlotName() {
      return Math.random() * 10 > 5 ? 'header' : 'footer'
    },
  },
  created() {
    console.log(this.dynamicSlotName)
    setTimeout(() => {
      this.barValue = 300
    }, 2000)
  },
  methods: {
    onUpdate(demo) {
      console.log(demo, '.hello')
    },
    changeTitle() {
      console.log(this)
      console.log(this.title)
      this.title += '1'
      console.log(this.title)
    },
    submit(payload) {
      console.log(payload)
    },
  },
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
