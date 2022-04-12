let CompilerUtil = {
  // 获取对象属性值
  getValue(vm, value) {
    // time.h => [time, h]
    return value.split('.').reduce((data, currentKey) => {
      // 第一次执行：data = $data, currentKey = time
      // 第二次执行：data = time, currentKey = h
      return data[currentKey.trim()]
    }, vm.$data)
  },
  getContent(vm, value) {
    // {{name}}-{{age}} => 姚某人-{{age}} => 姚某人-20
    // 匹配{{}}中的内容。惰性匹配。添加“？”
    const reg = /{{(.+?)}}/gi
    // TODO：替换内容. g全局匹配标识符。执行多次匹配
    return value.replace(reg, (...args) => {
      // 第一次执行 args[1] = name
      // 第二次执行 args[1] = age
      return this.getValue(vm, args[1])
    })
  },
  setValue(vm, attr, newValue) {
    // 针对time.h此类绑定的参数进行切割处理。
    attr.split('.').reduce((data, currentAttr, index, arr) => {
      // 如果是最后一个参数时，则进行数据赋值
      if (index === arr.length - 1) {
        data[currentAttr] = newValue
      }
      return data[currentAttr]
    }, vm.$data)
  },

  model: function(node, _value, vm) {
    // node.value = vm.$data[_value] // vm.$data[time.h]
    // TODO:第二步：第一次渲染的时候，给所有的属性添加观察者
    new Watcher(vm, _value, (newValue, oldValue) => {
      node.value = newValue
    })
    node.value = this.getValue(vm, _value)

    // TODO:视图驱动数据更新
    node.addEventListener('input', e => {
      const newValue = e.target.value
      this.setValue(vm, _value, newValue)
    })
  },
  html: function(node, _value, vm) {
    // TODO:第二步：第一次渲染的时候，给所有的属性添加观察者
    new Watcher(vm, _value, (newValue, oldValue) => {
      node.innerHTML = newValue
    })
    node.innerHTML = this.getValue(vm, _value)
  },
  text: function(node, _value, vm) {
    // TODO:第二步：第一次渲染的时候，给所有的属性添加观察者
    new Watcher(vm, _value, (newValue, oldValue) => {
      node.textContent = newValue
    })
    node.textContent = this.getValue(vm, _value)
  },
  for: function(node, _value, vm) {
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
  on: function (node, _value, vm, type) {
    // TODO: 监听节点，监听type类型的事件，从实例vm的事件$methods中查找该方法_value并执行
    // 通过call绑定其正确的this对象。vue的实例
    node.addEventListener(type, e => {
      vm.$methods[_value].call(vm, e)
    })
  },
  // 插值模板文本处理
  content: function(node, _value, vm) {
    let reg = /{{(.+?)}}/gi
    node.textContent = _value.replace(reg, (...args) => {
    // TODO:第二步：第一次渲染的时候，给所有的属性添加观察者
      new Watcher(vm, args[1], (newValue, oldValue) => {
        // node.textContent = newValue
        // TODO: 不能用赋值新值的方式。
        //  针对{{name}}-{{age}},如果只更新了name，则会导致：姚某人-20 => yyb。
        //  进行重新计算更新后的{{name}}-{{age}}.因此采用getContent(vm, _value)
        node.textContent = this.getContent(vm, _value)
      })
      return this.getValue(vm, args[1])
    })
  },
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
    // TODO：将数据代理到vue实例
    this.proxyData()
    // 计算属性实现
    this.$computed = options.computed
    this.computedToData()
    this.$methods = options.methods
    // 2.根据指定的区域和数据去编译渲染界面
    if (this.$el) {
      // 2.1 添加数据的get/set。监听数据的变化
      new Observer(this.$data)
      // 2.2 编译渲染界面
      new Compiler(this)
    }
  }

  proxyData() {
    for (let key in this.$data) {
      Object.defineProperty(this, key, {
        get() {
          // TODO: defineProperty方法中访问器属性中的this指向当前设置的对象
          return this.$data[key]
        }
      })
    }
  }
  computedToData() {
    for (let key in this.$computed) {
      Object.defineProperty(this.$data, key, {
        // TODO:计算属性，this要从实例获取
        get:()=> {
          return this.$computed[key].call(this)
        }
      })
    }
  }
  // 判断是否是一个元素
  isElement(node) {
    return node.nodeType === 1
  }
}

// 1.编译器
class Compiler {
  constructor(vm) {
    // 0.保存实例，方便后续使用
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
      //todo:注意点：只要将元素添加到了文档碎片中，那么这个元素就会自动从网页上消失
      fragment.appendChild(node)
      node = app.firstChild
    }
    // 3.返回存储了所有元素的文档碎片对象
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
        // TODO:处理子元素（后代）(递归)
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
      // 解析node上的所有属性。获取属性name、value=> name=v-model  value=name
      // v-on:click="myFun": name=v-on:click /value=myFun
      const { name, value } = attr
      // 判断‘v-’开头的指令
      if (name.startsWith('v-')) {
        // TODO：通过':'分割获取directiveName=v-on，directiveType=click
        const [directiveName, directiveType] = name.split(':')
        // 对以上的类型进行分割，v-model / v-html / v-text / v-on
        const [, directive] = directiveName.split('-') // [v, model]
        // 将指令中的value值，通过匹配的directive，去Vue实例中data里的更换数据
        CompilerUtil[directive](node, value, this.vm, directiveType)
      }
    })
  }
  buildText(node) {
    // {{}} 正则判断
    const content = node.textContent
    // TODO：此处正则可以不需要转义
    const reg = /{{(.+?)}}/gi
    if (reg.test(content)) {
      CompilerUtil['content'](node, content, this.vm)
    }
  }
}

// 2.监听数据
class Observer {
  // 将需要监听的对象传递给Observer这个类
  // 快速给传入的对象的所有属性添加get/set方法
  constructor(data) {
    this.observer(data)
  }
  observer(obj) {
    if (obj && getType(obj) === 'object') {
      // 遍历取出传入对象的所有属性，给遍历到的属性都增加set/get方法
      for (let key in obj) {
        this.defineReactive(obj, key, obj[key])
      }
    }
  }
  // obj：需要操作的对象
  // attr： 属性
  // value： 需要新增get/set属性方法的值
  defineReactive(obj, attr, value) {
    // 监听对象中的对象
    this.observer(value)
    // TODO：第三步，将当前属性的所有观察者对象都放到当前属性的发布订阅对象中管理起来
    // 创建属于当前属性的发布订阅对象
    const dep = new Dep()
    Object.defineProperty(obj, attr, {
      get() {
        // 订阅
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: newValue => {
        console.warn(`UPDATE-UI:`, newValue)
        if (value !== newValue) {
          // 设置对象时，监听
          this.observer(newValue)
          value = newValue
          // 发布通知
          dep.notify()
        }
      },
    })
  }
}

function getType(obj) {
  const type = typeof obj
  if (type !== 'object') return type
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)]$/, (match, $1) => {
    return $1.toLocaleLowerCase()
  })
}

// TODO：数据变化之后更新UI界面，发布订阅模式
// TODO：定义一个观察者类，再定义一个发布订阅类，然后再通过发布订阅的类来管理观察者类

// 发布订阅
class Dep {
  constructor() {
    // 该数组用于管理某个属性所有的观察者对象
    this.subs = []
  }

  // 订阅观察的方法
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 发布订阅的方法
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

// 观察者
class Watcher {
  // vue实例，属性，回调函数
  constructor(vm, attr, cb) {
    this.vm = vm
    this.attr = attr
    this.cb = cb
    // 获取旧值
    this.oldValue = this.getOldValue()
  }
  getOldValue() {
    Dep.target = this
    const oldValue = CompilerUtil.getValue(this.vm, this.attr)
    Dep.target = null
    return oldValue
  }
  // 定义一个更新的方法，用于判断新值和旧值是否相同
  update() {
    const newValue = CompilerUtil.getValue(this.vm, this.attr)
    if (this.oldValue !== newValue) {
      this.cb(newValue, this.oldValue)
    }
  }
}
