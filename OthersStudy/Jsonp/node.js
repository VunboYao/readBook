let obj = {}
let song = '发如雪'
obj.singer = '周杰伦';

Object.defineProperty(obj, 'music', {
  // value: '七里香',
  configurable: true,
  // writable: true,
  enumerable: true,
  get() {
    return song;
  },
  set(val) {
    song = val;
  }
})

// console.log(obj) // ;
// delete obj.music;
// console.log(obj) // ;
// obj.music = '听妈妈的话';
// console.log(obj) // ;

for (let key in obj) {
  // console.log(key);
}
// console.log(obj.music);
obj.music = '夜曲';
// console.log(obj.music);

function Mvvm(options = {}) {
  this.$options = options;
  let data = this._data = this.$options.data;
  observe(data);

  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    })
  }

  new Compile(options.el, this);
}

function Compile(el, vm) {
  vm.$el = document.querySelector(el);
  let fragment = document.createDocumentFragment();
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child);
  }
  function replace(frag) {
    Array.from(frag.childNodes).forEach(node => {
      let txt = node.textContent;
      let reg = /\{\{(.*?)\}\}/g;
      if (node.nodeType === 1) {  // 元素节点
        let nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组
        Array.from(nodeAttr).forEach(attr => {
          let name = attr.name;   // v-model  type
          let exp = attr.value;   // c        text
          if (name.includes('v-')) {
            node.value = vm[exp];   // this.c 为 2
          }
          // 监听变化
          new Watcher(vm, exp, function (newVal) {
            node.value = newVal;   // 当watcher触发时会自动将内容放进输入框中
          });

          node.addEventListener('input', e => {
            let newVal = e.target.value;
            // 相当于给this.c赋了一个新值
            // 而值的改变会调用set，set中又会调用notify，notify中调用watcher的update方法实现了更新
            vm[exp] = newVal;
          });
        });

      if (node.nodeType === 3 && reg.test(txt)) {
        let arr = RegExp.$1.split('.');
        let val = vm;
        arr.forEach(key => {
          val = val[key]
        })
        node.textContent = txt.replace(reg, val).trim()
        new Watcher(vm, RegExp.$1, newVal => {
          node.textContent = txt.replace(reg,newVal).trim();
        })
      }
      if (node.childNodes && node.childNodes.length) {
        replace(node);
      }
    });
  }
  replace(fragment);
  vm.$el.appendChild(fragment);
}


function Observer(data) {
  let dep = new Dep();
  for (let key in data) {
    let val = data[key];
    observe(val);
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        observe(newVal)
        dep.notify()
      }
    })
  }
}

function observe(data) {
  if (!data || typeof data !== 'object') return;
  return new Observer(data);
}

function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

function Watcher(vm,exp,fn) {
  this.fn = fn;
  this.vm = vm;
  this.exp = exp;
  Dep.target = this;
  let arr = exp.split('.')
  let val = vm;
  arr.forEach(key => {
    val = val[key]
  })
  Dep.target = null;
}
Watcher.prototype.update = function () {
  let arr = this.exp.split('.')
  let val = this.vm;
  arr.forEach(key => {
    val = val[key]
  })
  this.fn(val)
}
let watcher = new Watcher(() => console.log(111))
let dep = new Dep()
dep.addSub(watcher);
dep.addSub(watcher)
dep.notify()
