// 数据响应
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  const dep = new Dep()
  // 属性拦截
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        // 新数据如果是对象，进行拦截监听
        observe(newVal)
        val = newVal
        dep.notify()
      }
    },
  })
}

// 观察所有传入的属性
function observe(obj) {
  // 判断obj是对象
  if (typeof obj !== 'object' || obj === null) return obj
  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
}

// 代理
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(newVal) {
        vm.$data[key] = newVal
      },
    })
  })
}

class Vun {
  constructor(options) {
    // 0.保存选项
    this.$options = options
    this.$data = options.data
    this.$el = options.el
    // 1.响应式: 递归遍历data中所有的属性。进行数据拦截binding
    observe(this.$data)
    // 1.5 代理
    proxy(this)
    // 2.编译模板
    new Compile(this.$el, this)
  }
}

// 遍历模板树，解析其中的动态部分，初始化并获得更新函数
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    const dom = document.querySelector(el)
    this.compile(dom)
  }

  compile(el) {
    const childNodes = el.childNodes
    childNodes.forEach(node => {
      if (this.isElement(node)) {
        // element: 解析动态的指令，属性绑定，事件
        const attrs = node.attributes
        if (attrs.length > 0) {
          Array.from(attrs).forEach(attr => {
            // 判断是一个动态属性
            // 1.指令v-xx
            const attrName = attr.name
            const exp = attr.value
            if (this.isDir(attrName)) {
              const dir = attrName.slice(2)
              // 判断是否合法的指令。执行处理函数
              this[dir] && this[dir](node, exp)
            }
          })
        }
        // 递归
        if (node.childNodes.length > 0) {
          this.compile(node)
        }
      } else if (this.isInter(node)) {
        // console.log('编译文本', node.textContent)
        this.compileText(node)
      }
    })
  }

  // 处理所有动态的绑定 dir：指令的名称
  update(node, exp, dir) {
    // 1.初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])
    // 2.创建watcher实例，负责后续更新
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }

  // v-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  textUpdater(node, val) {
    node.textContent = val
  }

  // v-html
  html(node, exp) {
    this.update(node, exp, 'html')
  }
  htmlUpdater(node, val) {
    node.innerHTML = val
  }

  // parse {{}}
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  isDir(attrName) {
    return attrName.startsWith('v-')
  }
  isElement(node) {
    return node.nodeType === 1
  }

  isInter(node) {
    return node.nodeType === 3 && /{{(.*)}}/.test(node.textContent)
  }
}

// 负责具体节点的更新
class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updater = updater

    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }
  // 未来调用update
  update() {
    const val = this.vm[this.key]
    this.updater.call(this.vm, val)
  }
}

// Dep和响应式的属性key之间有一一对应的关系。通知watcher更新
class Dep {
  constructor() {
    this.deps = []
  }
  addDep(dep) {
    this.deps.push(dep)
  }
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}

/*
1.编译
2.遍历节点，判断是一个node元素，还是一个插值文本
3.node元素需判断是否包含子节点。递归遍历
4.插值文本，则需要编译其值翻译成对应的data数据
5.元素：解析动态的指令、属性绑定、事件
  1. 对attributes进行判断
  2. k-xxx指令判断
  3.
*/
