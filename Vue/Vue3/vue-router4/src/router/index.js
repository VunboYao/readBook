import {createRouter, createWebHashHistory} from 'vue-router'
// import Home from "@/pages/Home"
// import About from "@/pages/About"
const routes = [
	{path: '/', redirect: '/home'},
	{
		path: '/home',
		name: 'home',
		component: () => import(/* webpackChunkName: "Home" */'@/pages/Home'),
		children: [
			{
				path: '',
				redirect: '/home/msg'
			},
			{
				path: 'product',
				component: () => import('@/pages/HomeProduct')
			},
			{
				path: 'msg',
				component: () => import('@/pages/HomeMessage')
			}
		],
		meta: {
			age: 20
		}
	},		// 魔法注释
	{
		path: '/about',
		name: 'about',
		component: () => import('@/pages/About')
	},
	{
		path: '/user/:username/id/:id',
		name: 'user',
		component: () => import('@/pages/User')
	},
	{
		path: '/:pathMatch(.*)*', // 最后加“*”,会被分割成数组
		component: () => import('@/pages/NotFound')
	}
]

export default createRouter({
	routes,
	history: createWebHashHistory()
})
