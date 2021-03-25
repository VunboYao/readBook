import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)

import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


router.beforeEach((to, from, next) => {
  console.log('to :>> ', to);
  console.log('from :>> ', from);
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('to :>> beforeResolve', to);
  console.log('from :>> beforeResolve ', from);
  next()
})

router.afterEach((to, from) => {
  console.log('to :>> afterEach', to);
  console.log('from :>> afterEach', from);
})
