import { createApp, ref } from 'vue'
import type { Component } from 'vue'
import Pop from '@/components/PopModal/Pop'
import type { ComponentInstance, DialogAction, PopOptions } from '@/components/PopModal/types'

// 组件实例
let instance: ComponentInstance | null
// 卸载组件方法
let unmount: () => void

// 实例初始化
function initInstance(options: PopOptions, resolve: (value: DialogAction) => void) {
  const Wrapper = {
    setup() {
      // 控制页面展示与实例销毁,调用时则默认展示页面
      const show = ref(true)

      // 父级组件定义的方法，传递给子组件去关闭页面的展示
      const close = (value: DialogAction) => {
        show.value = false

        // 关闭时，若实例存在，则销毁并清除实例
        if (!show.value && instance) {
          resolve(value)
          instance = null
          unmount()
        }
      }
      return () => {
        return <Pop
          imgSrc={options.imgSrc}
          show={show.value}
          close={close}
        />
      }
    },
  }

  // 赋值组件实例与销毁方法
  !({ instance, unmount } = mountComponent(Wrapper))
}

function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  document.body.appendChild(root)
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    },
  }
}

export default (options: PopOptions) => {
  // 组件调用处
  return new Promise((resolve) => {
    if (!instance) {
      // 创建实例，传入参数和resolve的回调方法
      initInstance(options, resolve)
    }
  })
}
