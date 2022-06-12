import { createRouter, createWebHashHistory } from 'vue-router'
import HelloDemo from './HelloDemo'

const routes = [
  {
    path: '/key',
    name: 'VKeyDemo',
    component: () => import('@view/vKeyDemo.vue'),
  },
  HelloDemo
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
