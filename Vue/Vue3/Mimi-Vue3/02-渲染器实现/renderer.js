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
			console.log(oldValue, newValue);
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
      if (!(key in newProps)) {
        if (key.startsWith('on')) {
          const value = oldProps[key]
          el.removeEventListener(key.slice(2).toLowerCase(), value)
        } else {
          el.removeAttribute(key)
        }
      }
    }
  }
}
