const h = (tag, props, children) => {
	// vnode-> js object => {}
	return {
		tag,
		props,
		children,
	}
}

const mount = (vnode, container) => {
	// vnode->element
	// 1.创建出真实的元素，并且在vnode上保留el
	const el = (vnode.el = document.createElement(vnode.tag))
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

const patch = (n1, n2) => {
	if (n1.tag !== n2.tag) {
		const n1ElParent = n1.el.parentElement
		n1ElParent.removeChild(n1.el)
		mount(n2, n1ElParent)
	} else {
		// 取出element对象，并且在n2中进行保存
		const el = (n2.el = n1.el)
		const oldProps = n1.props || {}
		const newProps = n2.props || {}

		// 1.添加新的属性
		for (let key in newProps) {
			const oldValue = oldProps[key]
			const newValue = newProps[key]
			if (newValue !== oldValue) {
				if (key.startsWith('on')) {
					el.addEventListener(key.slice(2).toLowerCase(), newValue)
				} else {
					el.setAttribute(key, newValue)
				}
			}
		}

		// 2.移除旧的属性
		for (let key in oldProps) {
			if (key.startsWith('on')) {
				const value = oldProps[key]
				el.removeEventListener(key.slice(2).toLowerCase(), value)
			}
			if (!(key in newProps)) {
				el.removeAttribute(key)
			}
		}

		const newChild = n2.children || []
		const oldChild = n1.children || []
		if (typeof newChild === 'string') {
			if (oldChild !== newChild) {
				el.textContent = newChild
			} else {
				el.innerHTML = newChild
			}
		} else {
			if (typeof oldChild === 'string') {
				el.innerHTML = ''
				newChild.forEach(item => {
					mount(item, el)
				})
			} else {
				let len1 = oldChild.length
				let len2 = newChild.length
				const commonLength = Math.min(len1, len2)
				for (let i = 0; i < commonLength; i++) {
					patch(oldChild[i], newChild[i])
				}

				if (len2 > len1) {
					newChild.slice(len1).forEach(item => {
						mount(item, el)
					})
				}

				if (len2 < len1) {
					oldChild.slice(len2).forEach(item => {
						el.removeChild(item.el)
					})
				}
			}
		}
	}
}

/*
1.处理children
  1.如果新节点是字符串，直接赋值。
      边界判断，如果旧的也是字符串，相等则不处理，不相等则直接更新
  2. 新的节点是数组，旧的是字符串时
      1.清空旧的
      2.遍历新的children将节点挂载到el上
  3. 都是数组
      1.获取最小长度。
        旧的长，则删除。
        新的长，则添加
      2. 遍历最小长度，进行patch
      3.如果新的大于旧的长度，切割，剩余的挂载到el上
      4.如果新的小于旧的长度，切割，移除
*/
