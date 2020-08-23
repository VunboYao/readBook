import Vue from 'vue'
import App from './App.vue'

import router from './router'
import dicts from './dict'
Vue.config.productionTip = false
Vue.filter('demo', (val, dict) => {
  return dicts[dict][val]
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
