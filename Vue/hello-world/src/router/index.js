import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import user from "../components/user"

export default new VueRouter({
  mode: 'history',
	routes: [
		{
			path: '/*',
			name: 'User',
			component: user,
		}
	]
})
