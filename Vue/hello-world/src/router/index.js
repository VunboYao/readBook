import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import user from "../components/user"

export default new VueRouter({
	routes: [
		{
			path: '/user/:id', component: user
		}
	]
})
