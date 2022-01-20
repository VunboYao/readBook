function createApp(root) {
	return {
		mount(selector) {
			const container = document.querySelector(selector)
			let isMounted = false
			let oldVNode
			watchEffect(function () {
				if (!isMounted) {
					oldVNode = root.render()
					mount(oldVNode, container)
					isMounted = true
				} else {
					const newVNode = root.render()
					console.log(oldVNode, newVNode)
					patch(oldVNode, newVNode)
					oldVNode = newVNode
				}
			})
		},
	}
}
