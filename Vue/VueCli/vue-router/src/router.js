import Vue from 'vue';
import VueRouter from 'vue-router';

import Foo from '@/components/Foo';
import Bar from '@/components/Bar';
import User from '@/components/User';
import Multiple from '@/components/Multiple';
import Any from '@/components/Any';
import AnyStart from '@/components/AnyStart';

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
      name: 'User',
      component: User,
      // meta: {requireAuth: true}
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
