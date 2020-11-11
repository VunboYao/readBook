import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import user from "../components/user"
import UserProfile from "../components/UserProfile"

export default new VueRouter({
  mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/user'
		},
		{
			path: 'user',
			name: 'User',
			component: user,
			children: [
				{
					path: 'profile',
					name: 'UserProfile',
					component: UserProfile
				}
			]
    }
	]
})
