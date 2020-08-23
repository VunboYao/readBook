import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import user from "../components/user"
import demo from '../components/demo.vue'

export default new VueRouter({
  mode: 'history',
	routes: [
		{
			path: '/user/:id', component: user
    },
    {
      path: '/demo', component: demo
    }
	]
})
