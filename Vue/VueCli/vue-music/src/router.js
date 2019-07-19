import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('components/recommend/recommend')
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import('components/singer/singer')
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import('components/rank/rank')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('components/search/search')
    },
  ]
})