<template>
  <div>组件User <p>参数id是：{{$route.params.id}}</p>
  </div>
</template>

<script>
export default {
  name: 'User',
}
</script>

<style scoped>
div {
  font-size: 30px;
  font-weight: 600;
  line-height: 2;
}
</style>
