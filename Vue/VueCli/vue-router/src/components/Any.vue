<template>
  <div>组件Any
  <p>匹配任意路径：{{$route.path}}</p>
  <p>pathMatch参数：{{$route.params.pathMatch}}</p>
  <p class="error">404</p>
  </div>
</template>

<script>
export default {
  name: 'Any'
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
