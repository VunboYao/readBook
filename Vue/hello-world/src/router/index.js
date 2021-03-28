import Vue from 'vue'
import VueRouter from 'vue-router'
import E404 from '../components/404.vue'
Vue.use(VueRouter)

import user from "../components/user"
import SideBar from '../components/sidebar.vue'
import subUser from '../components/subUser.vue'
import Common from '../components/common.vue'

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        sidebar: SideBar,
        main: user
      }
    },
    {
      path: '/redirect',
      redirect: '/user/subUser'
    },
    {
      path: '/user',
      name: 'user',
      components: {
        sidebar: SideBar,
        main: user
      },
      children: [{
        path: 'subUser',
        name: 'subUser',
        component: subUser
      }, {
        path: 'foobar/:id',
        name: 'Common',
        component: Common,
        props: true
      }]
    },
    {
      path: '*',
      name: 'E404',
      components: {
        sidebar: SideBar,
        main: E404
      }
    }
  ],
  scrollBehavior() {
    return {
      x: 0, y: 0,
      behavior: 'smooth',
    }
  }
})
