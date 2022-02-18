// TODO:组件的本质
const MyComponent = function () {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('hello')
    },
    children: 'click me'
  }
}
// TODO: 组件也可以是一个对象
const MyComponent2 = {
  render() {
    return {
      tag: 'div',
      props: {
        onClick: () => alert('hello2')
      },
      children: 'click me'
    }
  }
}

const vnode = {
  tag: MyComponent2,
}

renderer(vnode, document.body)
function renderer(vnode, container) {
  if (typeof vnode.tag === 'string') {
    // 说明vnode描述的是标签元素
    mountElement(vnode, container)
  } else if (typeof vnode.tag === 'function') {
    // 说明vnode描述的是组件
    mountComponent(vnode, container)
  } else if (typeof vnode.tag === 'object') {
    // 如果是对象,说明 vnode 描述的是组件
    mountComponent(vnode, container)
  }
}

function mountComponent(vnode, container) {
  if (typeof vnode.tag === 'function') {
    // 调用组件函数，获取组件要渲染的内容（虚拟DOM)
    var subtree = vnode.tag()
  } else {
    var subtree = vnode.tag.render()
  }

  // 递归地调用 renderer 渲染 subtree
  renderer(subtree, container)
}

function mountElement(vnode, container) {
  const el = document.createElement(vnode.tag)
  // 1.遍历props，将属性、事件添加到DOM元素上
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      // 如果以on开头，说明它是事件
      el.addEventListener(
        key.substr(2).toLowerCase(), // 事件名称 onClick ---> click
        vnode.props[key] // 事件处理函数
      )
    }
  }

  // 2.渲染子元素
  if (typeof vnode.children === 'string') {
    // 如果children是字符串，说明它是元素的文本子节点
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    // 递归调用renderer函数渲染子节点使用当前的el元素作为挂载点
    vnode.children.forEach(child => renderer(child, el))
  }

  // 3.将元素添加到挂载点下
  container.appendChild(el)
}