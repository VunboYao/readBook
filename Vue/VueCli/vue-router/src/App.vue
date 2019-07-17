<template>
  <div id="app">
    <a-layout>
      <!-- HEADER -->
      <a-layout-header>
        <router-link to="/foo">
          <a-button>Go To Foo</a-button>
        </router-link>
        <router-link to="/bar">
          <a-button>Go To Bar</a-button>
        </router-link>
        <a-button
          @click="goBack"
          type="danger">
          <a-icon type="left" />Go Back
          </a-button>
         <router-link to="/user/A/">
          <a-button>带参数的路由A</a-button>
        </router-link>
         <router-link to="/user/B/">
          <a-button>带参数的路由B</a-button>
        </router-link>
         <router-link to="/multiple/Vunbo/post/Yao">
          <a-button>带多参数的路由</a-button>
        </router-link>
        <router-link to="/xxx/yyy/xxx">
          <a-button>404</a-button>
        </router-link>
        <router-link to="/demo-x/12">
          <a-button>以demo-开头的</a-button>
        </router-link>
      </a-layout-header>

      <!-- CONTENT -->
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>

      <!-- FOOTER -->
      <a-layout-footer>
        <div class="footer-content">当前路由参数</div>
        <div class="item">
          <p class="item-title">路径path：</p>
          <p class="item-content">{{$route.path}}</p>
        </div>
         <div class="item">
          <p class="item-title">全路径fullPath：</p>
          <p class="item-content">{{$route.fullPath}}</p>
        </div>
         <div class="item">
          <p class="item-title">当前组件名name：</p>
          <p class="item-content">{{$route.name}}</p>
        </div>
         <div class="item">
          <p class="item-title">查询参数query：</p>
          <p class="item-content">{{$route.query}}</p>
        </div>
         <div class="item">
          <p class="item-title">路径中参数params：</p>
          <p class="item-content">{{$route.params}}</p>
        </div>
         <div class="item">
          <p class="item-title">meta：</p>
          <p class="item-content">{{$route.meta}}</p>
        </div>
         <div class="item">
          <p class="item-title">hash：</p>
          <p class="item-content">{{$route.hash}}</p>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: "app",

  /* 路由参数时， 从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。
  不过，这也意味着组件的生命周期钩子不会再被调用。*/
  watch: {
    '$route'(to, from) {
      console.log(to.params.id,'通过 watch 监听服用组件，路由参数变化');
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
};
</script>

<style lang="scss">
#app {
  text-align: center;
}
.ant-layout {
  width: 100%;
}
.ant-layout-header {
  width: 100%;
  height: auto;
  background: #108ee9;
  .ant-btn {
    margin: 0 20px;
  }
}
.ant-layout-content {
  width: 100%;
  min-height: 100px;
  .page {
    font-size: 30px;
    color: #ccc;
  }
}

.ant-layout-footer {
  padding: 0;
  background-color: #576b95;
  font-size: 20px;
  color: #ccc;
  .footer-content {
    margin-bottom: 1em;
  }
  .item {
    display: flex;
    justify-content: center;
    width: 100%;
    > p {
      width: 50%;
      &:first-child {
        text-align: right;
      }
      &:last-child {
        text-align: left;
      }
    }
  }
  p {
    margin: 0;
  }
}


.router-link-active { // 子路由存在时,也会高亮
  .ant-btn {
    background: #09bb07;
    color: #fff;
    border-color: #09bb07;
  }
}
</style>
