import Vue from 'vue'
import VueRouter from 'vue-router'
import E404 from '../components/404.vue'
Vue.use(VueRouter)

import user from "../components/user"
import SideBar from '../components/sidebar.vue'
import tempRouter from './yyb-router'

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
    tempRouter,
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
