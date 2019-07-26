import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import fastclick from 'fastclick'
import './common/stylus/index.styl'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png'),
})

fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
