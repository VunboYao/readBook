import Vue from 'vue';
import VueRouter from 'vue-router';

import Foo from '@/components/Foo';
import Bar from '@/components/Bar';
import User from '@/components/User';
import Multiple from '@/components/Multiple';
import Any from '@/components/Any';
import AnyStart from '@/components/AnyStart';
import UserProfile from '@/components/UserProfile';
import UserPosts from '@/components/UserPosts';
import UserHome from '@/components/UserHome';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/foo',
      name: 'Foo',
      component: Foo,
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar
    },
    {
      path: '/user/:id', // 动态路由参数
      component: User,
      // meta: {requireAuth: true},
      children: [   // 二级路由
        {
          path: 'profile',
          name: 'UserProfile',
          component: UserProfile
        },
        {
          path: 'posts',
          name: 'UserPosts',
          component: UserPosts
        },
        {
          path: '',    // 空路由,默认页面
          name: 'UserHome',
          component: UserHome,
        }
      ]
    },
    {
      path: `/multiple/:firstName/post/:lastName`, // 多路由参数
      name: 'Multiple',
      component: Multiple,
    },
    {
      path: `/demo-*`, // 匹配任意以demo-开头的路径
      name: 'AnyStart',
      component: AnyStart,
    },
    {
      path: `*`,    // 任意路径，404， 放最后
      name: 'Any',
      component: Any
    }
  ]
})
