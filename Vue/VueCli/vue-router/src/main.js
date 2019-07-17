import Vue from 'vue'
import App from './App.vue'
import Router from './router'

import {
  Button,
  Layout,
  Icon
} from 'ant-design-vue';
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);

// 全局css
import './common/index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: Router,
}).$mount('#app')
