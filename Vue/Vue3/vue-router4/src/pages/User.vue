<template>
<!--<h2>User: {{this.$route.params.id}}</h2>-->
<h2>User: {{params}}-{{id}}</h2>
</template>

<script>
import {useRoute} from 'vue-router'
export default {
  name: "User",
  data() {
    return {}
  },
 setup() {
   let route = useRoute()
   return {
     id: route.params.id,
     params: route.params.username // username与router里定义的动态名称一致
   }
 }
}
</script>

<style scoped lang="scss">

</style>
