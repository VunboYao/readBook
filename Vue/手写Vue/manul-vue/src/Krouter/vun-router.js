let Vue
class VunRouter{
	constructor(options) {
		// 保存选项
		this.$options = options

		const initial = window.location.hash.slice(1) || '/'
		Vue.util.defineReactive(this, 'current', initial)

		window.addEventListener('hashchange', this.onhashchange.bind(this))
	}
	onhashchange() {
		this.current = window.location.hash.slice(1)
	}
}

VunRouter.install = function (_Vue) {
	Vue = _Vue

	/*挂载$router*/
	Vue.mixin({
		beforeCreate() {
			// 只有根组件拥有router选项
			if (this.$options.router) {
				Vue.prototype.$router = this.$options.router
			}
		}
	})

	/*默认组件注册*/
	Vue.component('router-link', {
		props: {
			to: {
				type: String,
				require: true
			}
		},
		render(h) {
			return h('a', {
				attrs: {
					href: `#${this.to}`
				}
			}, this.$slots.default)
		}
	})

	/*视图组件注册*/
	Vue.component('router-view', {
		render(h) {
			let component = null
			console.log(this.$router)
			const route = this.$router.$options.routes.find(route => route.path === this.$router.current)
			if (route) component = route.component
			return h(component)
		}
	})

}


export default VunRouter
