import { createRouter, createWebHashHistory } from 'vue-router'
import HelloDemo from './HelloDemo'

const routes = [
  HelloDemo
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router