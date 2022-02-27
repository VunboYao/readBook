# Vue 3 + Vite

## Vite

- resolve.extensions：官方不建议忽略.vue

## Vue3

### 基础

- 可注册多个应用实例
- 真值(truthy)问题：在布尔值上下文中，转换后的真值。所有的值都是真值，除非被定义为假值（即除 `false`，`0`，`-0`，`0n`，`""`，`null`，`undefined`和`NaN`以外皆为真值。
- **Vue 中空字符串`”“` (即 \<button disabled="">)，也会视为 disabled**
- 动态绑定多个值 `v-bind="objectOfAttrs"`
- 动态参数的限制：期望是一个字符串, 或者是`null`，特殊值`null`意味着显示移除该绑定
- 动态参数语法的限制:空格和引号不合法，建议使用**计算属性**,同时避免在名称中使用大写字母
- 响应式代理：对同一个对象调用`reactive()`会总是返回同样的代理，而对代理调用`reactive()`则会返回它自己

#### `reactive()`的局限性

- 仅对对象类型有效。对`string`,`number`,和`boolean`无效
- **必须通过属性访问进行追踪**，必须始终保持对该响应式对象的引用。**替换**，**解构**等都会失去响应性

#### `ref()`,装载任何值类型.

- 解决`reactive()`的问题。 内部通过 `value` 来控制着响应式。当值为对象类型时，会用`reactive（）`自动转换它的`.value`
- 在模板中自动解套。
  - **嵌套的会解套**
  - 数组中不会自动解套

#### v-for

- **优先级 v-if 比 v-for 高**
- `v-for="({message}, index) in items"`，变量名支持解构
- `key`绑定的值期望是一个基础类型的值。字符串或 number 类型

#### v-model

底层实现：

- `input` 和 `textarea`，使用 value 和 input 事件
- `checkbox`和 `radio` 使用 checked 和 change 事件
- `select`使用 value 和 change

取值时：

- `select`,`checkbox`，`radio`等使用`value`取值
- `checkbox`中可用`true-value`，`false-value`自定义其他值

#### watch

watch 第一个参数类型

- 单个 ref
- 监听对象是`reactive`时，会隐式地创建一个深层监听器。所有属性变更时都会被触发
- getter 函数 `watch(() => x.value + y.value, xxx)`

**watchEffect()**

- 立即执行一遍回调函数，如果产生了副作用，会自动分析响应源

- 后置刷新，以便在监听回调中能够访问的 DOM 是被 Vue 更新之后的

  - 指明：`flush: 'post'`
  - 后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()

- 停止定时器：异步创建的并不会自定停止。

  - 手动停止。调用 watch 和 watchEffect 返回的函数

- 实践：异步监听元素的挂载
  ```js
  // ref：$refs.input未挂载时是null
  watchEffect(() => {
  	if (input.value) {
  		input.value.focus()
  	} else {
  		// 此时还未挂载，或此元素已经被卸载（例如经过 v-if 控制）
  	}
  })
  ```

#### ref 模板

- 需要一个 ref,必须和模板名相同. `const input = ref(null)`
- 初次渲染是 null
- v-for 中 ref，`const itemRefs = ref([])`
- 组件上的 ref
  - 选项式 API 或者没有使用`<script setup>`，被引用的组件实例和该子组件的`this`完全一致
  - 使用了`<script setup>`的组件默认是私有的，父组件无法通过 ref 访问。除非子组件通过`defineExpose`显示暴露

### 组件

- 推荐`PascalCase`命名
- 元素位置限制：如`ul, ol, table, select`等。可以通过`is`来解决。

#### prop

- 单向数据流。
  - 若要更改数据，新定义一个局部数据属性，从 props 上取值即可
  - 重新定义一个计算属性
- 对于数组/对象类型的 prop,**仍然可以**更改，但不建议。应该抛出一个事件来通知父组件改变
- 事件校验：所有抛出事件可以使用对象形式来描述。返回布尔值来表示事件是否合法

#### 自定义 v-model

- `modelValue`与`update:modelValue`
- 通过`computed`计算属性，给出`getter`和`setter`，`get`方法返回`modelValue`属性，而`set`方法抛出相应事件

```vue
<!-- CustomInput.vue -->
<script setup>
	import { computed } from 'vue'

	const props = defineProps(['modelValue'])
	const emit = defineEmits(['update:modelValue'])

	const value = computed({
		get() {
			return props.modelValue
		},
		set(value) {
			emit('update:modelValue', value)
		},
	})
</script>

<template>
	<input v-model="value" />
</template>
```

#### v-model 的参数

- 默认情况下，`v-model`在组件上都是使用`modelValue`作为 prop, 以`update:modelValue`作为对应的事件。可以通过给`v-model`指定一个参数来更改这些名字

```vue
<MyComponent v-model:title="bookTitle" />
```

- 在这个例子中，子组件应该有一个`title`prop，并在变更时向父组件发射`update:title`事件

#### v-model 修饰符

- 可以通过`modelModifiers`prop 在组件内访问到父组件传入的 v-model 修饰符
- 对于有参数的同时又有修饰符的`v-model`绑定，生成的 prop 名将是`arg + 'Modifiers'`。

```vue
<MyComponent v-model:title.capitalize="myText" />

// 对应的声明如下 const props = defineProps(['title', 'titleModifiers']) defineEmits(['update:title]) console.log(props.titleModifiers) // { capitalize: true }
```

#### 属性透传

- `inheritAttrs: false`，关闭自动继承 attribute
- 如果使用了`<script setup>`，需要一个额外的`script`来书写这个选项说明
- 子组件可以通过`$attrs`访问
  - 包含了除组件的`props`和`emits`属性外的所有其他 attribute
  - 没有参数的`v-bind`会将一个对象的所有属性都作为 attribute 应用到目标元素上
  - 所有透传属性绑定到内部的元素：`inheritAttrs: false`和使用`v-bind=$attrs`
- 多根节点没有自动 attribute 透传行为.可通过`$attrs`现实绑定
- `<script setup>` 中可以通过 `useAttrs()`来访问所有透传属性，否则在`setup（）`上下文对象中。 $attrs不是响应式的，可以在`onUpdated()`中结合最新的 `$attrs`执行副作用.**但总是反应为最新透传的 attribute**

#### 插槽

- 插槽声明：`<slot name="head">默认内容</slot>`
- 插槽使用：`<template #head>父级调用</template>`
- 默认插槽：如果同时有具名和默认插槽，没有`template`的将默认绑定到`default`插槽
- 支持动态插槽
- 作用域获取：`<template #head={propName}>{{propName}}</template>`

#### 依赖注入

- provide(key, value): 依赖供给
- inject(key)：依赖注入。**如果注入进来的值就是一个 ref，不会自动解套。使得注入的组件保持了和供给者的响应性链接**
  - 注入的默认值：`const value = inject(key, string | () =>{})`
- 变更统一在 `provider`，变更方法也一起下发。可用`readonly`包裹防止变更
- 大型应用，key 值建议使用 Symbol()。建议一个单独的文件中导出这些注入名 Symbol

#### 异步组件

defineAsyncComponent: 返回一个 Promise 的加载函数。

```js
import { defineAsyncComponent } from 'vue'
const ProvideTest = defineAsyncComponent(() => {
	return new Promise(resolve => {
		resolve(import('./../../components/ProvideTest.vue'))
	})
})
```

### 可组合函数

#### 返回值

- 推荐始终从可组合函数中返回一个包含 ref 的对象，在对象解构时可以保持响应性

#### 使用限制

- 若要在使用 `await` 之后还可以调用可组合函数，只能在 `<script setup>`里。

#### vs 混入

混入的缺点：

- 不清晰的属性来源
- 名称空间冲突
- 隐式的多个混入间交互

### 自定义指令

- 组件：主要关注构建视图区块
- 可组合函数：关注有状态的逻辑
- 自定义指令：封装可重用的对底层 DOM 访问逻辑

- 在`<script setup>`中，以`v`开头的`camelCase`格式的变量，会被用作一个自定义指令
- 如果不使用`<script setup>`，可以通过`directives`选项注册。
- 或者全局注册`app.directive('focus', {...})`

- Hook Arguments
  - el: 指令所绑定的元素
  - binding:
    - value: 指令的值
    - oldValue: `beforeUpdate`,`updated`中可用
    - arg: 指令参数
    - modifiers: 指令修饰符
    - instance: 使用指令的组件实例
    - dir: 指令定义对象
  - vnode: vNode
  - prevNode: `beforeUpdate`,`updated`中可用

> Note: 除了`el`外，应该将这些参数都视为只读的，并一律不更改。若需要在不同的钩子间共享信息，推荐方法是通过元素的`dataset`attribute

#### 指令简写

简写 `mounted`和`updated`行为

```js
;<div v-color='color'></div>

app.directive('color', (el, binding) => {
	// mounted和 updated 时调用
	el.styole.color = binding.value
})
```

#### 对象字面量

指令如果需要多个值，可用传递一个 JavaScript 对象字面量

#### 组件上使用

- 组件上使用自定义指令时，始终应用于组件的根节点。
- 指令不可以通过`v-bind="$attrs"`来传递给一个不同的元素
- 不推荐在组件上使用自定义指令。

### 过渡元素

- mode: 常用 `out-in`

### KeepAlive

- `include`和`exclude` 控制是否需要缓存组件。这两个 prop 的值都是一个以**英文逗号分隔的字符串、一个正则表达式，或是包含这两个类型的一个数组。**
- 最大缓存实例。`max`,超出后访问次数最少的缓存实例将被销毁
- 缓存实例生命周期。`onActivated()`和`onDeactivated`两个生命周期函数
  - onActivated(): **首次加载、每次从缓存中重新被插回 DOM 时调用**
  - onDeactivated()：**在 DOM 上移除、进入缓存，以及组件卸载时调用**

### Teleport 传送门

- 指定目标 `to` 期望接收到一个 CSS 选择器字符串或者一个真实的 DOM 节点。
- `disabled` prop 可根据情况禁用
- 同一个目标上多个传送门，以追加的顺序顺次排列。

```vue
<template>
	<button @click="open = true">打开Model</button>
	<Teleport to="body">
		<div v-if="open" class="modal">
			<p>Hello, this is model</p>
			<button @click="open = false">Close</button>
		</div>
	</Teleport>
</template>
```

### Suspense

异步组件加载时，统一定制 loading 提示

## 状态管理 Pinia

### VS Vuex3.X/4.X

- `mutations`不再存在，原配合 devTools 不再是一个问题
- TS 支持更好，不再需要创建自定义的包装 Module
- 直接调用函数即可
- 不需要动态的引入 store，默认自动化
- 不需要嵌套的模块化，同时支持模块间的循环依赖
- 没有命名模块了。由于扁平化的设计，所有的 store 都可以称为命名的

### 安装 pinia

```js
import { createPinia } from 'pinia'
app.use(createPinia())
```

### 定义 Store

```js
import { defineStore } from 'pinia'

// 第一个参数是唯一id
export const useStore = defineStore('userInfo', {
	// other options
})
```

**注意**：store 是一个用`reactive`包裹的对象，不能**解构**

- 可以通过 `computed()`给出一个属性，保持其响应性
- `const doubleValue = computed(() => store.doubleCount)`

**为了实现可以解构获取数据**

- 当仅仅使用 state,不需要调用任何 action 时，可以使用`storeToRefs`

### state

以下实例基于此 Store

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
	// 建议使用箭头函数
	state: () => {
		return {
			// 所有属性自动拥有类型推断
			counter: 0,
			name: 'vunbo',
			isAdmin: true,
		}
	},
})
```

#### 访问 state

默认可以直接修改与访问

```js
const store = useStore()

store.counter++
```

#### 重置 state

通过调用 store 上的 `$reset()`方法，可以重置状态为初始值

`store.$reset()`

#### 使用 setup()

OptionsAPI 中使用`setup()`

```js
// store 注册
import { defineStore } from 'pinia'

const useCounterStore = defineStore('counterStore', {
  state: () => ({ counter: 0 })
})
```

```js
import { useCounterStore } from './stores/counterStore'

export default {
	setup() {
		const counterStore = useCounterStore()

		return { counterStore }
	},
	computed: {
		tripleCounter() {
			return this.counterStore.counter * 3
		},
	},
}
```

- 依旧支持`mapState`

#### 无setup

- 提供`mapWritableState`可修改 state
- `setup`中支持`store.$patch({}) || store.$patch(state => {})`修改
- `mapWritableState`除非替换整个数组，否则数组类数据无需使用此方法

#### 变更state

- `store.counter++`，直接调用

- 通过方法`$patch`，允许同时传入`state`中的多个变更。支持**对象和函数**

  ```js
  // 对象
  store.$patch({
    counter: store.counter + 1,
    name: 'Abalam',
  })
  
  // 函数
  cartStore.$patch((state) => {
    state.items.push({ name: 'shoes', quantity: 1 })
    state.hasChanged = true
  })
  ```

#### 替换state

```js
// 设置一个新对象(不是整体替换,数据新增)
store.$state = { counter: 666, name: 'Vunbo}
```
  
### getters

- 接收state作为第一个参数，建议使用箭头函数
- 在TS中使用时，明确注明返回值时，无法使用箭头函数。可以通过this访问数据
- 访问其他store的getters，可以通过直接引入使用
- optionsAPI中可以依旧引用mapState

### actions

- 同组件中的`methods`相同
- 支持async
- optionsAPI中可以使用`mapActions`
- 监听actions，通过`const unsubscribe = store.$onAction()`
	- 调用返回值，可移除监听
	- 回调函数操作action本身之前执行
	- `after`在resolve之后执行
	- `onError`在报错后执行
	- 传入第二个参数true，可在组件卸载后依旧保持这个监听

## 测试 Vitest

