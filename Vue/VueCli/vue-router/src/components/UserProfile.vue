<template>
  <div>子组件UserProfile <p>子组件路径：{{$route.path}}</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
}
</script>

<style scoped>
div {
  font-size: 30px;
  font-weight: 600;
  line-height: 2;
}
</style>
