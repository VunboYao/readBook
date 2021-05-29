# Vue-Router

## 导航守卫

### 全局前置守卫

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

### 全局解析守卫

导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**

```js
router.beforeResolve((to, from, next) => {
   // ...
})
```

### 全局后置钩子

**不会接受 `next` 函数也不会改变导航本身**

```js
router.afterEach((to, from) => {
  // ...
})
```

### 路由独享的守卫

这些守卫与全局前置守卫的方法参数是一样的。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件内守卫

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

## 完整的导航解析流程

1. 导航被触发
2. 是失活组件上调用`beforeRouteLeave`守卫。**组件内**
3. 调用全局的 `beforeEach` 守卫。 **全局前置守卫**
4. **在复用的组件里** 调用 `beforeRouteUpdate` 守卫。 *复用的组件*
5. 路由配置里调用 `beforeEnter` **路由独享**
6. 解析异步路由组件
7. 在被激活的组件里调用 `beforeRouteEnter` **组件路由被确认前**
8. 调用全局的 `beforeResolve` 守卫 **全局解析**
9. 导航被确认
10. 调用全局的 `afterEach` 钩子 **全局后置**
11. 触发 DOM 更新
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入

## 过渡动效

**过度模式**

- `in-out`： 新元素进行过渡，完成之后当前元素离开
- `out-in`： 当前元素先进行过渡，完成之后新元素过渡离开

```html
<transition name="fade" mode="out-in">
    <router-view></router-view>
</transition>

<style>
.fade-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}
</style>
```

