import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: 'pinia-01',
        name: 'Pinia01',
        component: () => import('@/views/Pinia-01.vue'),
      },
    ],
  },
]
export default createRouter({
  history: createWebHashHistory(),
  routes,
})
