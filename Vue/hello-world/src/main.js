import Vue from 'vue'
import App from './App.vue'
import {Button} from 'element-ui'
Vue.component(Button.name, Button)

import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
