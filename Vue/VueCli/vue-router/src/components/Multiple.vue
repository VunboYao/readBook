<template>
  <div>组件Multiple
  <p>参数firstName是：{{$route.params.firstName}}</p>
  <p>参数lastName是：{{$route.params.lastName}}</p>
  </div>
</template>

<script>
export default {
  name: 'Multiple'
}
</script>

<style scoped>
div {
  font-size: 20px;
  font-weight: 600;
  line-height: 2;
}
</style>
