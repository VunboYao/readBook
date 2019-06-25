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

## 修饰符

- `.prevent`修饰符， 告诉`v-on`指令对于触发的事件调用`event.preventDefault()`

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



# 注意事项

- 不要在选项属性上或回调上使用**箭头函数**， 因为箭头函数没有`this`