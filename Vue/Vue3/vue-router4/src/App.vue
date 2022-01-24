<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <router-link to="/home">Home</router-link>|
    <router-link to="/about" active-class="coder-yyb">About</router-link>|
    <router-link to="/user/Vunbo/id/001" active-class="coder-yyb">动态路由参数</router-link>|
    <router-link to="/123" active-class="coder-yyb">/:pathMatch(.*)</router-link>|
    <button @click="program">编程式跳转到About</button>
  </div>
  <router-view></router-view>
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
</style>
