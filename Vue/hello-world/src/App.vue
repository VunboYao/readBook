<template>
  <div id="app">
    <div class="box">
      <router-view class="sidebar" name="sidebar" />
      <router-view class="main" name="main" />
    </div>
    <div class="options">
      <router-link class="link" :to="{ path: '/user/foobar/foo#100' }"
        >FOO</router-link
      >
      <router-link class="link" :to="{ path: '/user/foobar/bar' }"
        >BAR</router-link
      >
      <router-link class="link" to="/error">ERROR</router-link>
      <router-link class="link" to="/">Root</router-link>
      <router-link class="link" to="/user/subUser">subUser</router-link>
      <router-link class="link" to="/redirect">redirect</router-link>
    </div>
    <jsx-demo v-for="n in 4" :level="n" :key="n">我是标标题{{n}}</jsx-demo>
    <component-a />
    <el-button @click="show">show</el-button>
    <el-button @click="hide">hide</el-button>
    <el-button @click="showMsg">showMsg</el-button>
    <el-button @click="handleRouter">RouterMatched</el-button>
  </div>
</template>

<script>
import jsxDemo from './components/jsxDemo'
import {FilterData} from './plugin/FilterData/main'
const componentA = {
  name: "tplA",
  template: `<h2>Hello World</h2>`,
};

export default {
  name: "App",
  components: {
    componentA: componentA,
    jsxDemo
  },
  created() {
    this.faceTest()
  },
  methods: {
    handleRouter() {
      console.log('this.$route :>> ', this.$route);
    },
    showMsg() {
      const data = [{
        code: '1102'
      }, {
        code: '1009'
      }]
      FilterData({
        originData: data
      }, res => {
        console.log(res,'callback Data')
      })
    },
    hide() {
      this.$closeLoading();
    },
    show() {
      this.$showLoading();
    },
    faceTest() {
      console.log(1)
      // eslint-disable-next-line no-unused-vars
      let promise = new Promise((resolve, reject) => {
        console.log(2)
        this.$nextTick(() => {
          console.log(3)
          setTimeout(() => {
            console.log(4)
          },0)
          console.log(5)
          resolve()
        })
        setTimeout(() => {
          console.log(6)
        },1000)
        console.log(7)
      })
      console.log(8)
      promise.then(() => {
        console.log(9)
      })
      console.log(10)
    }
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  position: relative;
  width: 100%;
  height: 100vh;
  background: pink;
}
.options {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  display: flex;
}
.sidebar {
  width: 30vw;
  height: 60vh;
  background: skyblue;
}
.main {
  width: 60vw;
  height: 80vh;
  background: steelblue;
}
.el-button span {
  display: flex;
}
.link {
  padding: 8px 14px;
  border-radius: 4px;
  background: coral;
  text-decoration: none;
  margin: 0 20px;
}
.router-link-active {
  color: aliceblue;
  background: aqua;
}
</style>
