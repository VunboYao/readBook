import Vue from 'vue'
import App from './App.vue'
import {Button} from 'element-ui'
import Loading from './plugin/loading/index_plugin';
// Vue.component(Loading.name, Loading)
Vue.component(Button.name, Button)
Vue.use(Loading, {
  title: '皇帝不急太监急'
})
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
