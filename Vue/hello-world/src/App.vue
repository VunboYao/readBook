<template>
  <div id="app">
    <div class="options">
      <el-button type="primary">
        <router-link :to="{path: '/user/foobar/foo' }">FOO</router-link>
      </el-button>
      <el-button type="warning">
        <router-link :to="{path: '/user/foobar/bar' }">BAR</router-link>
      </el-button>
      <el-button type="error">
        <router-link to="/error">ERROR</router-link>
      </el-button>
       <el-button type="error">
        <router-link to="/">Root</router-link>
      </el-button>
       <el-button type="error">
        <router-link to="/user/subUser">subUser</router-link>
      </el-button>
      <el-button type="error">
        <router-link to="/redirect">redirect</router-link>
      </el-button>
    </div>
   <div class="box">
    <router-view class="sidebar" name="sidebar" />
    <router-view class="main" name="main"/>
   </div>
  </div>
</template>

<script>
export default {
  name: "App",
  beforeRouteUpdate(to, from, next) {
    console.log('to :>> ', to);
    console.log('from :>> ', from);
    next()
  },
  methods: {},
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
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
  height: 60vh;
  background: steelblue;
}
</style>
