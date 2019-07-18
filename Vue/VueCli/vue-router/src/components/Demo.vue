<template>
  <div>组件Demo
    <p>当前路径：{{$route.path}}</p>
  </div>
</template>

<script>
export default {
  name: 'Demo'
}
</script>

<style>
div {
  font-size: 20px;
  font-weight: 600;
  line-height: 2;
}
</style>
