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
        <a-button @click="goBack" type="danger">
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
        <a-button @click="goFoo">编程式路径Foo</a-button>
        <a-button @click="goError" type="danger">编程式Path与Params不能同时使用</a-button>
        <router-link :to="{name: 'Bar',query: {name: 'bar'}}">
          <a-button>:to声明式传参Bar</a-button>
        </router-link>
        <router-link :to="{name: 'Demo'}" replace>
          <a-button>Replace to Foo</a-button>
        </router-link>
        <a-button @click="goForward">Go(1)</a-button>
        <router-link :to="{name: 'UserHome', params: {id: 12,age: 12}, query: {hello: 'world'}}">
          <a-button>命名路由User</a-button>
        </router-link>
        <router-link to="/UserSettings/">
          <a-button>UserSettings</a-button>
        </router-link>
        <a-button type="danger" @click='onChangeView'>切换视图</a-button>
        <router-link to="/xxx">
          <a-button>重定向Foo</a-button>
        </router-link>
         <router-link to="/a">
          <a-button>别名Bar</a-button>
        </router-link>
        <router-link to="/user/A/">
          <a-button>Props传参</a-button>
        </router-link>
      </a-layout-header>

     <template v-if="changeView">
        <!-- CONTENT -->
      <a-layout-content>
        多视图Default
        <router-view class="viewOne"></router-view>
        多视图a
        <router-view class="viewTwo" name="a"></router-view>
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
     </template>
     <template v-else>
      <transition class="demo" name="fade">
         <router-view></router-view>
      </transition>
     </template>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      changeView: true,
    }
  },

  /* 路由参数时， 从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。
  不过，这也意味着组件的生命周期钩子不会再被调用。*/
  watch: {
    $route(to, from) {
      console.log(from, "watch监听来源路径...");
      console.log(to.params.id, "通过 watch 监听服用组件，路由参数变化");
    }
  },
  methods: {
    // 返回上一个页面
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    // 编程式跳转路径
    goFoo() {
      // 命名路由
      // this.$router.push({name: 'UserHome',params: {usreId: '123'}})
      // 带查询参数：
      this.$router.push({ path: "/Foo", query: { plan: "private" } });
    },
    goError() {
      // 错误
      // this.$router.push({path: '/Bar', params: {userId: '123'}});

      // name
      this.$router.push({ name: "Bar", params: { userId: "123" } }, () => {
        // console.log("跳转OK"); // 第二个可选参数，onComplete(), 第三个可选参数 onAbort()
      });

      // 完整路径
      const userId = "123";
      // this.$router.push({path: `/Bar/${userId}`});
    },
    goForward() {
      this.$router.go(1);
    },

    // 切换视图
    onChangeView() {
      this.changeView = !this.changeView;
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0);
}
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

.router-link-active {
  // 子路由存在时,也会高亮
  .ant-btn {
    background: #09bb07;
    color: #fff;
    border-color: #09bb07;
  }
}
.viewOne {
  width: 100%;
  background-color:aqua;
}
.viewTwo {
  width: 100%;
  background-color: pink;
}
</style>
