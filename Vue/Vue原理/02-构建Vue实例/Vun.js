let CompilerUtil = {
  getValue(vm, value) {
    // time.h => [time, h]
    return value.split('.').reduce((data, currentKey) => {
      // 第一次执行：data = $data, currentKey = time
      // 第二次执行：data = time, currentKey = h
      return data[currentKey.trim()]
    }, vm.$data)
  },

  getContent(vm, value){
    // {{name}}-{{age}} => 姚某人-{{age}} => 姚某人-20
    // 匹配{{}}中的内容。惰性匹配。添加“？”
    const reg = /\{\{(.+?)\}\}/gi
    // 替换内容
    return value.replace(reg, (...args) => {
      // 第一次执行 args[1] = name
      // 第二次执行 args[1] = age
      return this.getValue(vm, args[1])
    })
  },

  getType(obj) {
    const type = typeof obj
    if (type !== 'object') {
      return type
    }
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, (match, $1) => $1.toLocaleLowerCase())
  },

  model: function (node, _value, vm) {
    // node.value = vm.$data[_value] // vm.$data[time.h]
    node.value = this.getValue(vm, _value)
  },
  html: function (node, _value, vm) {
    node.innerHtml = this.getValue(vm, _value)
  },

  text: function (node, _value, vm) {
    node.textContent = this.getValue(vm, _value)
  },

  for: function (node, _value, vm) {
    if (/in(.+)/gi.test(_value)) {
      const originData = this.getValue(vm, RegExp.$1.trim())
      const fragment = document.createDocumentFragment()
      let tagName = node.tagName
      originData.forEach(data => {
        const tag = document.createElement(tagName)
        tag.textContent = data
        fragment.appendChild(tag)
      })
      node.parentNode.replaceChild(fragment, node)
    }
  },

  content: function (node, _value, vm) {
    let val = this.getContent(vm, _value)
    node.textContent = val
  }
}

class Vun {
  constructor(options) {
    // 1.保存创建时候传递过来的数据
    if (this.isElement(options.el)) {
      this.$el = options.el
    } else {
      this.$el = document.querySelector(options.el)
    }
    this.$data = options.data
    // 2.根据指定的区域和数据去编译渲染界面
    if (this.$el) {
      new Compiler(this)
    }
  }

  // 判断是否是一个元素
  isElement(node) {
    return node.nodeType === 1
  }
}

// 编译器
class Compiler {
  constructor(vm) {
    this.vm = vm
    // 1.将网页上的元素放到内存中
    let fragment = this.node2fragment(this.vm.$el)
    // 2.利用指定的数据编译内存中的元素
    this.buildTemplate(fragment)
    // 3.将编译好的内容，重新渲染回网页上
    this.vm.$el.appendChild(fragment)
  }

  node2fragment(app) {
    // 1.创建一个空的文档碎片对象
    const fragment = document.createDocumentFragment()
    // 2.遍历循环取到每一个元素
    let node = app.firstChild
    while (node) {
      // 注意点：只要将元素添加到了文档碎片中，那么这个元素就会自动从网页上消失
      fragment.appendChild(node)
      node = app.firstChild
    }
    return fragment
  }
  buildTemplate(fragment) {
    const nodeList = Array.from(fragment.childNodes)
    nodeList.forEach(node => {
      // 判断当前遍历到的节点是一个元素还是一个文本
      // 如果是一个元素，需要判断有没有一个v-model属性
      // 如果是一个文本，需要判断有没有{{}}的内容
      if (this.vm.isElement(node)) {
        // 是一个元素
        this.buildElement(node)
        // 处理子元素（后代）(递归)
        this.buildTemplate(node)
      } else {
        // 不是一个元素
        this.buildText(node)
      }
    })
  }
  buildElement(node) {
    const attrs = [...node.attributes]
    attrs.forEach(attr => {
      const { name, value } = attr
      if (name.startsWith('v-')) {
        // v-model / v-html / v-text
        const [, directive] = name.split('-') // [v, model]
        // 将指令中的value值，通过匹配的directive，去Vue实例中data里的更换数据
        CompilerUtil[directive](node, value, this.vm)
      }
    })
  }
  buildText(node) {
    // {{}} 正则判断
    const context = node.textContent
    const reg = /\{\{(.+?)\}\}/gi
    if (reg.test(context)) {
      CompilerUtil['content'](node, context, this.vm)
    }
  }
}
