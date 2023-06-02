/*
1.命令式，更加关注过程，“理论上”可以做到极致优化
2.声明式，更加注重结果，减轻“心智负担”，一定的性能消耗

虚拟DOM的性能，声明式的更新性能消耗=Diff + 修改

*/

function Render(obj, root) {
  const el = document.createElement(obj.tag)
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children)
    el.appendChild(text)
  } else if (obj.children) {
    // 数组递归，使用 el 作为 root
    obj.children.forEach(child => Render(child, el))
  }
  // mount to root
  root.appendChild(el)
}

const obj = {
  tag: 'div',
  children: [
    { tag: 'span', children: 'hello world' }
  ]
}

Render(obj, document.body)
