import Vue from 'vue'
import VueRouter from './vun-router'
import Home from '../views/Home.vue'
import subAbout from '../views/subAbout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '/about/info',
        name: 'subAbout',
        component: subAbout,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
