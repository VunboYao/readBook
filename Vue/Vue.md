# 风格指南

## 优先级A：必要的

- 组件名为多个单词
- 组件的`data`必须是一个函数

- Prop 定义应该尽量详细， 至少需要指定其类型
- `v-for`设置键值， 总是用`key`配合`v-for`

- 避免`v-if`和`v-for`用在一起
- 为组件样式设置作用域，`scoped`特性和 `CSS Modules`
- 私有属性名**`$_yourPluginName`**

## 优先级B：强烈推荐

- 组件化
- 单文件组件文件的大小写，推荐**单词大写开头**， 或者**始终是横线连接**

- 基础组件名，应用特定的前缀开头， 比如**`Base`, `App`，`V`**

- 单例组件名， 以**`The`**前缀命名， 以示其唯一性
- 紧密耦合的组件名，和父组件紧密耦合的子组件应该以父组件作为前缀命名

- 组件名应该是以高级别的（一般化描述）单词开头，以描述性的修饰词结尾

- 自闭合组件
- 在**单文件组件**和字符串模板中组件名应该总是**PascalCase的一一但是在DOM模板中总是kebab-case的**

- 完整单词的组件名
- Prop 名大小写， 使用 camelCase，而在模板和 **JSX** 中使用 kebab-case

- 多个特性的元素多行撰写
- **复杂的表达式则应该重构为计算属性或方法**

- 带引号的特性值
- 指令缩写， 用 **`:`** 表示 **`v-bind：`** 和用 **`@`** 表示 **`v-on:`** 应该要么都用，要么都不用

## 优先级C：推荐

- 元素特性的顺序

  1. 定义， `is`
  2. 列表渲染
  3. 条件渲染
  4. 渲染方式,   `v-pre / v-once`
  5. 全局感知， `id`
  6. 唯一的特性， `ref / key / slot`
  7. 双向绑定， `v-model`
  8. 其他特性 （所有普通的绑定或未绑定的特性）
  9. 事件， `v-on / @`
  10. 内容

  

# 基础语法

## 指令

- `v-once`，一次性的插值，内容不会再改变
- `v-html`, 输出html
- `v-bind`, 用于 HTML 特性， 简写**`:href`**
- `v-on`， 用户监听 DOM 事件， 简写**`@click`**
- `v-if`,  指令的表达式返回 truthy 值时被渲染， `v-else-if`, `v-else`

- `v-show`， 根据条件渲染， 简单的切换 CSS 属性 `display`
  - **`v-show`不支持`template`元素， 也不支持`v-else`**
- `v-for`， 列表渲染， **优先级高于`v-if`**
  - 渲染一个数组时，支持第二个参数`index`
  - 渲染一个对象时， 支持第二个参数 property 名称（键名），第三个参数`index`

## 列表渲染

### 数组更新检测

#### 变异方法

Vue 将被侦听的数组的变异方法进行了包裹， 所以它们也会触发视图更新

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

#### 替换数组

变异方法， 顾名思义， 会改变原始数组。**非变异方法**， 如 `filter()`, `concant()`和`slice()`，**总是返回一个新数组**。 当使用非变异方法时， 可用新数组替换旧数组

#### 显示过滤/排序后的结果

过滤或排序后的数组， 可以创建一个计算属性。

```js
<li v-for="n in evenNumbers">{{ n }}</li>
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

> 在计算属性不适用的情况下，可以使用方法

## 计算属性

**计算属性是基于它们的响应式依赖进行缓存的**，只在相关响应式依赖发生改变时才会重新求值。大量计算时的值可以缓存，如果不希望有缓存，用方法替代

### 计算属性的 setter

计算属性默认只有 getter, 需要时可以提供一个setter

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## Class 与 Style 绑定

### 绑定 HTML Class

#### 对象语法

```vue
<div v-bind:class="{ active: isActive }"></div>
// 可以在对象中传入更多属性来动态切换多个class
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>


// 绑定的数据对象不必内联定义在模板里
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}


// 也可以绑定一个返回对象的计算属性
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

#### 数组语法

```vue
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

// 三元表达式
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

// 数组中使用对象
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

### 绑定内联样式

#### 对象语法

```vue
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

// 直接绑定一个样式对象
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

#### 数组语法

```vue
<div v-bind:style="[baseStyles, overridingStyles]"></div>
data: {
  baseStyles: {
     color: 'red'
  }
}
```

## 事件处理

###  内联处理器中的方法

有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法

### 事件修饰符

- **`.stop`**, 阻止单击事件继续传播
- **`.prevent`**, 阻止事件默认行为，如重载，跳转等
- **`.capture`**,  捕获阶段， 即元素自身触发的事件先在此处理，然后交友内部元素处理

- **`.self`**,  只有当 event.target 是当前元素自身时触发处理函数

- **`.once`**, 点击事件只会触发一次

- **`.passive`**, 告诉浏览器不阻止事件的默认行为， 对应`addEventListener`中的`.passive`， 滚动事件的默认行为（即滚动行为）将会立即触发，**不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略**

### 按键修饰符

```vue
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```

### 按键码

```vue
<input v-on:keyup.13="submit">
```

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

还可以通过全局**`config.keyCodes` **对象**自定义按键修饰符别名**

```vue
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

### 系统修饰键

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

### `.exact`修饰符

控制由精确的系统修饰符组合触发的事件

```vue
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

### 鼠标按钮修饰符

- `.left`
- `.right`
- `.middle`

## 表单输入绑定

> `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

`v-model` 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 `value` 属性和 `input` 事件；
- checkbox 和 radio 使用 `checked` 属性和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

### 复选框

- 单个复选框， 绑定到布尔值
- 多个复选框，绑定到一个数组

### 单选按钮

- 绑定到value

```vue
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>

new Vue({
  el: '#example-4',
  data: {
    picked: ''
  }
})
```

### 选择框

- 单选时，绑定到value

```vue
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>

new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

- 多选时（绑定一个数组）

```vue
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
new Vue({
  el: '#example-6',
  data: {
    selected: []
  }
})
```

### 值绑定

对于单选按钮，复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)

```vue
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

### 修饰符

- `.lazy`， 使用 `change` 事件进行同步
- `.number`， 自动将用户的输入值转为数值类型 `<input v-model.number="age" type="number">`
- `.trim`， 自动过滤用户输入的首尾空白字符

## 组件基础

### prop向子组件传递数据

```vue	
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```

### 单个根元素

组件的内容必须包裹在一个父元素内

### 监听子组件事件

子组件通过 `$emit方法` 并传入事件名称来触发事件，如果抛出值，可以第二个参数来传递这个值

### 在组件上使用 `v-model`

当用在组件上时，`v-model` 则会这样

```vue
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 `value` 特性绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

```vue
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

现在 `v-model` 就应该可以在这个组件上完美地工作起来了：

```vue
<custom-input v-model="searchText"></custom-input>
```

## Prop类型

- 每个 prop 都有指定的值类型

- 可以传递静态类型的值或通过 `v-bind`动态赋值

- 如果传入一个对象的所有属性, 可以使用不带参数的`v-bind`(取代`v-bind:prop-name`).

  ```vue
  <blog-post v-bind="post"></blog-post>
  // 等价于
  <blog-post
    v-bind:id="post.id"
    v-bind:title="post.title"
  ></blog-post>
  ```

- **Prop验证**

  ```vue
  Vue.component('my-component', {
  	props: {
  		propA: Number, // 基础类型检查
  		propB: [String, Number], // 多个可能的类型
  		propC: {
  			type: String,
  			required: true, // 必填的字符串
  		},
  		propD: {
  			type: Number,
  			default: 100, // 带有默认值的数字
  		},
  		propE: {
  			type: Object,
  			default(){ // 对象或数组默认值必须从一个工厂函数获取
  				return {message: 'hello'}
  			}
  		},
  		propF: { // 自定义验证
  			validator(value){
  				....
  			}
  		}
  	}
  })
  ```

- 非 Prop 的特性, 一个非 prop 特性是指传向一个组件，但是该组件并没有相应 prop 定义的特性。会自动添加到元素上

- 禁用特性继承, 如果你**不**希望组件的根元素继承特性，你可以在组件的选项中设置 `inheritAttrs: false`

## 自定义事件

### 事件名

触发事件的事件名，必须使用 **`kebab-case`**事件名

### 自定义组件的 v-model

- 组件上的 `v-model`默认会利用名为 `value`的prop和名为`input`的事件。但是对于单选框和复选框， value会有不同的目的， `model`选项可以用来避免这样的冲突

  ```js
  Vue.component('base-checkbox', {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean
    },
    template: `
      <input
        type="checkbox"
        v-bind:checked="checked"
        v-on:change="$emit('change', $event.target.checked)"
      >
    `
  })
  
  <base-checkbox v-model="lovingVue"></base-checkbox>
  
  这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的属性将会被更新。
  ```

  > 注意你仍然需要在组件的 `props` 选项里声明 `checked` 这个 prop。

### 将原生事件绑定到组件

- `v-on` 的 `.native` 修饰符

  ```vue
  <base-input v-on:focus.native="onFocus"></base-input>
  ```

- 当 `<base-input>`组件做了重构， 外层是 `<label>`元素，则无效

- Vue 提供了一个 `$listeners` 属性，包含了作用在这个组件上的所有监听器

### .sync 修饰符

以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title`prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```vue
this.$emit('update:title', newTitle)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据属性。例如

```vue
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```

> 带有`.sync`修饰符的 `v-bind`不能和表达式一起使用，只能提供想要绑定的属性名， 类似`v-model`

## 插槽

- 如果一个组件中没有 `<slot>`元素， 则该组件起始标签和结束标签之间的任何内容都会被抛弃
- 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的

### 后备内容

有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。

### 具名插槽

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

一个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”。

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

现在 `<template>` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 `v-slot` 的 `<template>` 中的内容都会被视为默认插槽的内容。

注意 **v-slot 只能添加在一个 `<template> `上** 

### 作用域插槽

让插槽内容访问**子组件中**才有的数据

```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

绑定在 `<slot>` 元素上的特性被称为**插槽 prop**。现在在父级作用域中，我们可以给 `v-slot` 带一个值来定义我们提供的插槽 prop 的名字：

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

### 独占默认插槽的缩写语法

当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样就可以把`v-slot`直接用在组件上

```html
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>

// 这种写法还可以更简单。就像假定未指明的内容对应默认插槽一样，不带参数的 v-slot 被假定对应默认插槽：
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>

```

**注意默认插槽的缩写语法**不能**和具名插槽混用，因为它会导致作用域不明确**

### 具名插槽的缩写

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`, **该缩写只在其有参数的时候才可用**

## 动态组件 & 异步组件

### 动态组件上使用 keep-alive

## 处理边界情况

### 访问根实例

在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` 属性进行访问

### 访问父级组件实例

和 `$root` 类似，`$parent` 属性可以用来从一个子组件访问父组件的实例

### 访问子组件实例或子元素

可以通过 `ref` 特性为这个子组件赋予一个 ID 引用

```html
<base-input ref="usernameInput"></base-input>

// this.$refs.usernameInput
```

> `$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。

### 依赖注入

`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

在任何后代组件里，我们都可以使用 `inject` 选项来接收指定的我们想要添加在这个实例上的属性

```js
inject: ['getMap']
```

## 程序化的事件侦听器

- 通过 `$on(eventName, eventHandler)` 侦听一个事件
- 通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
- 通过 `$off(eventName, eventHandler)` 停止侦听一个事件

### 通过 `v-once`创建低开销的静态组件, 慎用

## 过渡 & 动画

### 单元素/组件的过渡

在以下情形中, 可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

### 过渡类名

在进入/离开的过渡中, 会有 6 个 class 切换

- `v-enter`: 定义进入过渡的开始状态. 插入之前生效, **元素被插入之后的下一帧移除**
- `v-enter-active`:  定义进入过渡生效时的状态. **在过渡/动画完成之后移除** 定义进入过渡的**过程时间, 延迟和曲线函数**
- `v-enter-to`: 定义进入过渡的结束状态.在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除) **在过渡/动画完成之后移除**
- `v-leave`: 定义离开过渡的开始状态. **在离开过渡被触发时立刻生效，下一帧被移除**
- `v-leave-avtive`: 定义离开过渡生效时的状态。在离开过渡被触发时立刻生效，**在过渡/动画完成之后移除。**定义进入过渡的**过程时间, 延迟和曲线函数**
- `v-leave-to`: 定义离开过渡的结束状态.在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

如果你使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`

### 自定义过渡的类名

结合第三方 CSS 动画库, Animate.css 结合使用

- `enter-class`

- `enter-active-class`

- `enter-to-class` (2.1.8+)

- `leave-class`

- `leave-active-class`

- `leave-to-class` (2.1.8+)

  ```html
  <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
  
  <div id="example-3">
    <button @click="show = !show">
      Toggle render
    </button>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <p v-if="show">hello</p>
    </transition>
  </div>
  ```

### 同时使用过渡和动画

使用 `type` 特性并设置 `animation` 或 `transition` 来明确声明你需要 Vue 监听的类型。

### 显性的过渡持续时间

```html
<transition :duration="1000">...</transition>

<!-- 定制进入和移出的持续时间 -->
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### JavaScript 钩子

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

> 当只用 JavaScript 过渡的时候，**在 enter 和 leave 中必须使用 done 进行回调**。否则，它们将被同步调用，过渡会立即完成。

> 推荐对于仅使用 JavaScript 过渡的元素添加 `v-bind:css="false"`，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

### 初始渲染的过渡

可以通过 `appear` 特性设置节点在初始渲染的过渡

```html
<transition appear>
  <!-- ... -->
</transition>
```

### 多个元素的过渡

当有**相同标签名**的元素切换时，需要通过 `key` 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，**给在 `<transition>` 组件中的多个元素设置 key 是一个更好的实践。**

### 过渡模式

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。

- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

### 多个组件的过渡

动态组件

## 列表过渡

使用 `<transition-group>` 组件

- 不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 `tag` 特性更换为其他元素。
- [过渡模式](https://cn.vuejs.org/v2/guide/transitions.html#过渡模式)不可用，因为我们不再相互切换特有的元素。
- 内部元素 **总是需要** 提供唯一的 `key` 属性值。

### 列表的进入/离开过渡

[官方实例](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E7%9A%84%E8%BF%9B%E5%85%A5-%E7%A6%BB%E5%BC%80%E8%BF%87%E6%B8%A1)

### 列表的排序过渡

### 列表的交错过渡

## 可复用的过渡

过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件，你需要做的就是将 `<transition>` 或者 `<transition-group>` 作为根组件，然后将任何子组件放置在其中就可以了

### 动态过渡

通过`name`特性来绑定动态值

# 可复用性 & 组合

## 混入

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

### 选项合并

- 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。冲突时以**组件数据优先**
- 同名钩子函数将合并为一个数组, 都将被调用. 混入对象的钩子将在组件自身钩子之前调用
- 值为对象的属性, 如 `methods`, `components` 和 `directives`, 将被合并为同一个对象. 两个对象键名冲突时, 取组件对象的键值对.

### 自定义选项合并策略

自定义选项以自定义逻辑合并

```js
Vue.config.optionMergeStrategies.myOption = fuction(toVal, formVal){
    // 返回合并的值
}
```

对于多数值为对象的选项，可以使用与 `methods` 相同的合并策略

```js
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```

## 自定义指令

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// 注册局部指令
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

### 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`: 只调用一次, 指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用

### 钩子函数参数

- `el`: 指令所绑定的元素, 可以用来直接操作DOM
- `binding`: 一个对象,包含以下属性:
  - `name`: 指令名, 不包括 `v-` 前缀
  - `value`: 指令的绑定值, 例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

> 除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。

### 动态指令参数

指令的参数可以是动态的。例如，在 `v-mydirective:[argument]="value"` 中，`argument` 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。

### 函数简写

在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子

```js
Vue.directive('color', (el, binding) => {
    el.style.color = binding.value
})
```

### 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
Vue.directive('demo', (el,binding) => {
    console.log(binding.value.color); // => 'white'
    console.log(binding.value.text); // => 'hello!'
})
```

## 渲染函数 & JSX

### 虚拟 DOM

Vue 通过建立一个**虚拟 DOM** 来追踪自己要如何改变真实 DOM

```js
return createElement('h1', this.blogTitle)
```

`createElement` 到底会返回什么呢？其实不是一个*实际的* DOM 元素。它更准确的名字可能是 `createNodeDescription`，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“**VNode**”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

**`createElement`参数**

```js
// @returns {VNode}
createElement(
    // {String | Object | Function}
    // 一个 HTML 标签名, 组件选项对象, 或者 resolve 了上述任何一种的一个 async 函数.必填项
    'div',
    
    // {Object}
    // 一个与模板中属性对应的数据对象.可选
    {},
    
    // {String | Array}
    // 子级虚拟节点(VNodes), 由 `createElement()` 构建而成, 也可以使用字符串来生成"文本虚拟节点". 可选
    [
        "some text",
        createElement('h2', 'one news'),
        createElement(MyComponent, {
            props: {
                shomeProp: 'footer'
            }
        })
    ]
)
```

### 约束

VNode 必须唯一

# 插件

## 使用插件

通用全局方法 `Vue.use()` 使用插件. 需要在调用 `new Vue()` 启动应用之前完成.

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```

## 过滤器

过滤器可以用在两个地方: **双花括号插值和`v-bind`表达式**, 过滤器应该被添加在 JavaScript 表达式的尾部, 由"管道" 符号指示

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

局部过滤器:

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

全局过滤器

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

**当全局过滤器和局部过滤器重名时，会采用局部过滤器。**

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，`capitalize` 过滤器函数将会收到 `message` 的值作为第一个参数。

```js
{{ message | filterA }}
```

过滤器可以串联：

```js
{{ message | filterA | filterB }}
```

过滤器是 JavaScript 函数，因此可以**接收参数**：

```html
{{ message | filterA('arg1', arg2) }}
```

这里，`filterA` 被定义为接收三个参数的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数

# 注意事项

- 不要在选项属性上或回调上使用**箭头函数**， 因为箭头函数没有`this`
- 用`key`管理可复用的元素，使其独立唯一

## Vue **不能**检测以下数组的变动

- 根据索引直接设置一个数组项，`vm.items[indexOfItem] = newValue`

- 修改数组的长度，`vm.items.lenght = newLength`

  ```js
  var vm = new Vue({
    data: {
      items: ['a', 'b', 'c']
    }
  })
  vm.items[1] = 'x' // 不是响应性的
  vm.items.length = 2 // 不是响应性的
  ```

 **解决方式**

- 第一类：实现和 `vm.items[indexOfItem] = newValue` 相同的效果

  ```js
  // Vue.set
  Vue.set(vm.items, indexOfItem, newValue)
  ```

  ```js
  // Array.prototype.splice
  vm.items.splice(indexOfItem, 1, newValue)
  ```

  也可以使用 **`vm.$set`** 实例方法，该方法是全局方法 `Vue.set` 的一个别名

  ```vue
  vm.$set(vm.items, indexOfItem, newValue)
  ```

- 第二类：可以使用 `splice`

  ```js
  vm.items.splice(newLength)
  ```

## Vue不能检测对象的添加或删除

```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

**解决方式**

对于已经创建的实例，Vue 不允许动态添加跟级别的响应式属性。但是可以用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式属性。

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

添加新的 age 属性到 userProfile

```js
Vue.set(vm.userProfile, 'age', 27)
```

还可以使用**`vm.$set`**实例方法，它是全局`Vue.set`的别名

```js
vm.$set(vm.userProfile, 'age', 27)
```

**为已有对象赋值多个属性**

```js
vm.userProfile = Object.assing({}, vm.userProfile, {
    age: 28,
    favoriteColor: 'Vue Green'
})
```

## 解析 DOM 模板时的注意事项

> 有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。

- **is** 特性

```vue
<table>
  <tr is="blog-post-row"></tr>
</table>
```

