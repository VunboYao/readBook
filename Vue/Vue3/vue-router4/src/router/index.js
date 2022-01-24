import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/pages/Home"
import About from "@/pages/About"
const routes = [
	{path: '/', redirect: '/home'},
	{path: '/home', component: Home},
	{path: '/about', component: About},
]

export default createRouter({
	routes,
	history: createWebHistory()
})
