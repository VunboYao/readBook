// install()方法 或者 一个函数
export { default as translateSource } from './translateSource'
export default {
  install(app, options) {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
    // 通过provide为插件用户提供一些内容
    app.provide('i18n', options)
    /*
    组件中使用
    <script setup>
    import { inject } from 'vue'

    const i18n = inject('i18n')

    console.log(i18n.greetings.hello)
    </script>
    */
  }
}
