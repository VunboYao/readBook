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
          canAccess: ['hello', 'foo', 'bar'],
          funcList: [
            { name: 'foo', operation: 'click' },
            { name: 'bar', operation: 'blur' },
          ],
        },
      },
      {
        path: 'pinia-02',
        name: 'Pinia02',
        component: () => import('@/views/Pinia-02.vue'),
      },
      {
        path: 'async-validator',
        name: 'AsyncValidator',
        component: () => import('@/views/async-validator.vue'),
      },
      {
        path: 'element-form',
        name: 'ElementForm',
        component: () => import('@/views/element-form.vue'),
      },
      {
        path: 'date-fns',
        name: 'DateFns',
        component: () => import('@/views/date-fns.vue'),
      },
    ],
  },
]
export default createRouter({
  history: createWebHashHistory(),
  routes,
})
