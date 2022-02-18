/* const title = {
  tag: 'h2', // 标签名称
  props: { // 标签属性
    onClick: handler
  },
  children: [ // 子节点
    {
      tag: 'span'
    }
  ]
} */

/* 
<h2 @click="handler"><span></span></h2>
*/

// TODO：JS对象描述UI与模版的不同之处？更加灵活
/* let level = 3
const title = {
  tag: `h${level}` // h3标签
} */

/* 
模版：穷举
<h1 v-if="level === 1"><h1>
<h2 v-else-if="level === 2"><h2>
<h3 v-else-if="level === 3"><h3>
<h4 v-else-if="level === 4"><h4>
<h5 v-else-if="level === 5"><h5>
<h6 v-else-if="level === 6"><h6>
*/

// TODO：渲染函数
/* import { h } from 'vue'
export default {
  render() {
    return h('h2', { onClick: handler }) // 虚拟DOM
  }
} */
// 等价
/* export default {
  render() {
    return {
      tag: 'h2',
      props: { onClick: handler }
    }
  }
} */


const vnode = {
  tag: 'h2', // 标签名称
  props: { // 标签属性
    onClick: () => alert('hello')
  },
  children: 'click me'
}

// TODO：渲染器
function renderer(vnode, container) {
  const el = document.createElement(vnode.tag)
  // 遍历props，将属性、事件添加到DOM元素上
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      // 如果以on开头，说明它是事件
      el.addEventListener(
        key.substr(2).toLowerCase(), // 事件名称 onClick ---> click
        vnode.props[key] // 事件处理函数
      )
    }
  }

  if (typeof vnode.children === 'string') {
    // 如果children是字符串，说明它是元素的文本子节点
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    // 递归调用renderer函数渲染子节点使用当前的el元素作为挂载点
    vnode.children.forEach(child => renderer(child, el))
  }

  // 将元素添加到挂载点下
  container.appendChild(el)
}
renderer(vnode, document.body)


