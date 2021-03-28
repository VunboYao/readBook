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
  </div>
</template>

<script>
export default {
  name: "App",
  beforeRouteUpdate(to, from, next) {
    console.log("to :>> ", to);
    console.log("from :>> ", from);
    next();
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
  height: 200vh;
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
