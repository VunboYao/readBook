<template>
  <div>组件User <p>参数id是：{{$route.params.id}}</p>
     <a-layout>
       <a-layout-header>
         <router-link to="profile">
           <a-button>UserProfile</a-button>
         </router-link>
          <router-link to="posts">
           <a-button>UserPosts</a-button>
         </router-link>
       </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'User',
}
</script>

<style lang="scss" scoped>
div {
  font-size: 30px;
  font-weight: 600;
  line-height: 2;
}
.ant-layout {
  width: 100%;
}
.ant-layout-header {
  width: 80%;
  margin-left: 10%;
  height: auto;
  background: #4da7e7;
  .ant-btn {
    margin: 0 20px;
  }
}
.router-link-exact-active { // 独立
  .ant-btn {
    background: #7ec77d;
    color: #fff;
    border-color: #7ec77d;
  }
}
.ant-layout-content {
  width: 80%;
  margin-left: 10%;
  min-height: 100px;
  background: #dedede;
  .page {
    font-size: 30px;
    color: #ccc;
  }
}
</style>
