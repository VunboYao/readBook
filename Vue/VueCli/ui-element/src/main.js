import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import uploader from 'vue-simple-uploader'


Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(uploader)

new Vue({
  render: h => h(App),
}).$mount('#app');
