const h = (tag, props, children) => {
	// vnode-> js object => {}
	return {
		tag,
		props,
		children
	}
}

const mount = (vnode, container) => {
	// vnode->element
	// 1.创建出真实的元素，并且在vnode上保留el
	const el = vnode.el = document.createElement(vnode.tag)
	// 2.处理props
	let props = vnode.props
	if (props) {
		for (const key in props) {
			const value = props[key]
			// 事件监听的判断
			if (key.startsWith('on')) {
				el.addEventListener(key.slice(2).toLowerCase(), value)
			} else {
				el.setAttribute(key, value)
			}
		}
	}
	// 3.children
	let child = vnode.children
	if (child) {
		if (typeof child === 'string') {
			el.textContent = child
		} else {
			child.forEach(item => {
				mount(item, el)
			})
		}
	}

	// 4.挂载到container上
	container.appendChild(el)
}
