<template>
  <div>子组件UserPosts <p>子组件路径：{{$route.path}}</p>
  </div>
</template>

<script>
export default {
  name: 'UserPosts',
}
</script>

<style scoped>
div {
  font-size: 30px;
  font-weight: 600;
  line-height: 2;
}
</style>
