<template>
<div>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <router-link to="/home">Home</router-link>|
    <router-link to="/about" active-class="coder-yyb">About</router-link>|
    <router-link to="/user/vunbo/id/123" active-class="coder-yyb">动态路由参数</router-link>|
    <router-link to="/123" active-class="coder-yyb">/:pathMatch(.*)</router-link>|
    <button @click="program">编程式跳转到About</button>|
    <router-link to="/home" v-slot="{navigate}" custom>
      <button @click="navigate">slot自定义link</button>
      <span @click="navigate">navigate</span>
    </router-link>|
    <router-link to="/category">Category</router-link>
  </div>
<!--  <router-view></router-view>-->
  <router-view v-slot="{Component}">
    <transition name="yyb" mode="out-in">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
  name: 'App',
  components: {
  },
  setup() {
    const router = useRouter()
    const program = () => {
      router.push({
        path: '/about',
        query: {
          name: 'path不能和params一起用。如果提供了 path，params 会被忽略'
        }
      })
    }
    return {
      program
    }
  }
}
</script>

<style>
.router-link-active {
  color: green;
}
.coder-yyb {
  color: blue;
}
.yyb-enter-from {
  transform: translateX(30px);
}
.yyb-leave-from {
  transform: translateX(0);
}
.yyb-leave-to {
  transform: translateX(30px);
}
.yyb-enter-to {
  transform: translateX(0);
}
.yyb-enter-active,
.yyb-leave-active {
  transition: all 0.5s ease;
}
</style>
