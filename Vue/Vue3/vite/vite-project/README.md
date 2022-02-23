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
- 必须通过属性访问进行追踪，必须始终保持对该响应式对象的引用。**替换**，**解构**等都会失去响应性

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

#### 组件

- 推荐`PascalCase`命名
