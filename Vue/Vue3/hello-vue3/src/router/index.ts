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
        meta: {
          black: ['Pinia02'],
        },
      },
      {
        path: 'pinia-02',
        name: 'Pinia02',
        component: () => import('@/views/Pinia-02.vue'),
      },
    ],
  },
]
export default createRouter({
  history: createWebHashHistory(),
  routes,
})
