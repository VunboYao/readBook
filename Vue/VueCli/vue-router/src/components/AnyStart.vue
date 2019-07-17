<template>
  <div>组件AnyStart
  <p>匹配任意demo-开头的路径：{{$route.path}}</p>
  <p>pathMatch参数：{{$route.params.pathMatch}}</p>
  </div>
</template>

<script>
export default {
  name: 'AnyStart'
}
</script>

<style scoped>
div {
  font-size: 20px;
  font-weight: 600;
  line-height: 2;
}
.error {
  font-size: 40rpx;
  color: #ff3b30;
}
</style>
